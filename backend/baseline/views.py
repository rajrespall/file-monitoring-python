import os
import hashlib
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.permissions import IsAuthenticated
from .models import Baseline, Config, Scan
from .serializers import BaselineSerializer, ConfigSerializer, ScanSerializer
from tempfile import NamedTemporaryFile, gettempdir
from django.conf import settings

class ScanView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            # Get user's config
            config = Config.objects.get(user=request.user)
            if not config.path:
                return Response({"error": "Base path not configured"}, status=status.HTTP_400_BAD_REQUEST)

            # Create new scan record
            scan = Scan.objects.create(user=request.user, status="Scanning initiated")
            scan_results = []

            # Get all baselines for user
            baselines = Baseline.objects.filter(user=request.user)
            if not baselines.exists():
                return Response({"error": "No baselines found"}, status=status.HTTP_404_NOT_FOUND)

            for baseline in baselines:
                # Combine config path with baseline filename
                full_path = os.path.join(config.path, baseline.original_filename)

                result = {
                    "id": baseline.id,
                    "filename": baseline.original_filename,
                    "status": "unchanged",
                    "expected_hash": baseline.hash_value
                }

                if not os.path.isfile(full_path):
                    result["status"] = "missing"
                    result["current_hash"] = None
                else:
                    # Calculate current hash
                    with open(full_path, 'rb') as f:
                        current_hash = hashlib.new(baseline.algorithm)
                        for chunk in iter(lambda: f.read(4096), b''):
                            current_hash.update(chunk)
                        result["current_hash"] = current_hash.hexdigest()
                        
                        if result["current_hash"] != baseline.hash_value:
                            result["status"] = "modified"

                scan_results.append(result)

            # Update scan with results
            scan.results = scan_results
            scan.status = "Completed"
            scan.save()

            return Response({
                "scan_id": scan.id,
                "status": scan.status,
                "results": scan_results
            }, status=status.HTTP_200_OK)

        except Config.DoesNotExist:
            return Response({"error": "User configuration not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def get(self, request):
        try:
            # Get latest scan for user
            latest_scan = Scan.objects.filter(user=request.user).order_by('-created_at').first()
            
            if not latest_scan:
                return Response({"error": "No scans found"}, status=status.HTTP_404_NOT_FOUND)
                
            serializer = ScanSerializer(latest_scan)
            return Response(serializer.data, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response(
                {"error": str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
class BaselineScanView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, baseline_id):
        try:
            # Get user's config
            config = Config.objects.get(user=request.user)
            if not config.path:
                return Response({"error": "Base path not configured"}, 
                             status=status.HTTP_400_BAD_REQUEST)

            # Get specific baseline
            baseline = Baseline.objects.get(id=baseline_id, user=request.user)
            
            # Create new scan record
            scan = Scan.objects.create(user=request.user, status="Scanning initiated")
            
            # Combine config path with baseline filename
            full_path = os.path.join(config.path, baseline.original_filename)

            result = {
                "filename": baseline.original_filename,
                "status": "unchanged",
                "expected_hash": baseline.hash_value,
                "current_hash": None
            }

            if not os.path.isfile(full_path):
                result["status"] = "missing"
            else:
                # Calculate current hash
                with open(full_path, 'rb') as f:
                    current_hash = hashlib.new(baseline.algorithm)
                    for chunk in iter(lambda: f.read(4096), b''):
                        current_hash.update(chunk)
                    result["current_hash"] = current_hash.hexdigest()
                    
                    if result["current_hash"] != baseline.hash_value:
                        result["status"] = "modified"

            # Update scan with single result
            scan.results = [result]
            scan.status = "Completed" 
            scan.save()

            return Response({
                "scan_id": scan.id,
                "baseline_id": baseline_id,
                "status": scan.status,
                "results": scan.results
            }, status=status.HTTP_200_OK)

        except Config.DoesNotExist:
            return Response({"error": "User configuration not found"}, 
                          status=status.HTTP_404_NOT_FOUND)
        except Baseline.DoesNotExist:
            return Response({"error": "Baseline not found"}, 
                          status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, 
                          status=status.HTTP_500_INTERNAL_SERVER_ERROR)
      
class BaselineView(APIView):
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    permission_classes = [IsAuthenticated]

    def post(self, request):
        paths = request.data.get("paths", [])
        try:
            config = Config.objects.get(user=request.user)  # Assuming HashingConfig is your model
            algorithm = config.algorithm if config else "sha256"  # Default to sha256
        except Config.DoesNotExist:
        # If user doesn't have config, use default
            algorithm = "sha256"
            print(f"No config found for user {request.user}, using default algorithm")
        except Exception as e:
            print(f"Error fetching algorithm config: {e}")
            algorithm = "sha256"  # Fallback default
        uploaded_files = request.FILES.getlist("files", [])
        file_mappings = {}

        for uploaded_file in uploaded_files:
            try:
                with NamedTemporaryFile(delete=False, dir=gettempdir(), suffix=f"_{uploaded_file.name}") as temp_file:
                    for chunk in uploaded_file.chunks():
                        temp_file.write(chunk)
                    paths.append(temp_file.name)
                    file_mappings[temp_file.name] = uploaded_file.name
                print(f"File saved at: {temp_file.name}")
            except Exception as e:
                print(f"Error saving file {uploaded_file.name}: {e}")
                return Response({"error": f"Failed to save uploaded file {uploaded_file.name}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        print(f"Paths after saving files: {paths}")

        # Validate algorithm
        if algorithm not in ['md5', 'sha256']:
            return Response({"error": "Invalid algorithm. Choose 'md5' or 'sha256'."}, status=status.HTTP_400_BAD_REQUEST)

        created_baselines = []
        for path in paths:
            if not os.path.isfile(path):
                print(f"Invalid path: {path}")
                continue

            try:
                original_name = file_mappings.get(path, path)
                hash_object = hashlib.new(algorithm)
                with open(path, 'rb') as f:
                    while chunk := f.read(8192):
                        hash_object.update(chunk)
                hash_value = hash_object.hexdigest()

                baseline = Baseline.objects.create(
                    original_filename=original_name,
                    user=request.user,
                    path=path,
                    hash_value=hash_value,
                    algorithm=algorithm
                )
                created_baselines.append(baseline)
            except Exception as e:
                print(f"Error processing file {path}: {e}")
                continue

        serializer = BaselineSerializer(created_baselines, many=True)
        return Response({"created_baselines": serializer.data}, status=status.HTTP_201_CREATED)
    
    def get(self, request):
        baselines = Baseline.objects.filter(user=request.user)
        serializer = BaselineSerializer(baselines, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def delete(self, request):
        baseline_id = request.data.get('baseline_id')
        if not baseline_id:
            return Response({"error": "Baseline ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            baseline = Baseline.objects.get(id=baseline_id, user=request.user)
            baseline.delete()
            return Response({"message": "Success delete"}, status=status.HTTP_200_OK)
        except Baseline.DoesNotExist:
            return Response({"error": "Baseline not found"}, status=status.HTTP_404_NOT_FOUND)
        
class ConfigView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        config, created = Config.objects.get_or_create(user=request.user)
        serializer = ConfigSerializer(config)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request):
        config, created = Config.objects.get_or_create(user=request.user)
        serializer = ConfigSerializer(config, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Configuration updated", "config": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)