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
    def post(self, request):
        file_path = request.data.get("file_path")
        if not file_path:
            return Response({"error": "File path is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            baseline = Baseline.objects.get(path=file_path)
        except Baseline.DoesNotExist:
            return Response({"error": "Baseline for the specified file path does not exist"}, status=status.HTTP_404_NOT_FOUND)

        scan = Scan.objects.create(status="Scanning initiated")
        scan_results = []

        path = baseline.path
        algorithm = baseline.algorithm
        expected_hash = baseline.hash_value

        if not os.path.isfile(path):
            scan_results.append({
                "path": path,
                "status": "File not found"
            })
            scan.status = "File not found"
        else:
            hash_object = hashlib.new(algorithm)
            try:
                with open(path, 'rb') as f:
                    while chunk := f.read(8192):
                        hash_object.update(chunk)
                actual_hash = hash_object.hexdigest()
            except IOError:
                scan_results.append({
                    "path": path,
                    "status": "Error reading file"
                })
                scan.status = "Error reading file"
            else:
                if actual_hash == expected_hash:
                    status_message = "File unchanged"
                else:
                    status_message = "File altered"

                scan_results.append({
                    "path": path,
                    "status": status_message,
                    "expected_hash": expected_hash,
                    "actual_hash": actual_hash
                })
                scan.status = status_message

        scan.save()

        return Response({"message": "Scan completed", "results": scan_results}, status=status.HTTP_200_OK)
    
class ScanStatusView(APIView):
   class ScanStatusView(APIView):
    def get(self, request):
        scan_id = request.query_params.get('scan_id')
        try:
            if scan_id:
                scan = Scan.objects.get(id=scan_id)
            else:
                scan = Scan.objects.latest('created_at')
            serializer = ScanSerializer(scan)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Scan.DoesNotExist:
            return Response({"error": "No scans found"}, status=status.HTTP_404_NOT_FOUND)
        
class BaselineView(APIView):
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    permission_classes = [IsAuthenticated]

    def post(self, request):
        paths = request.data.get("paths", [])
        algorithm = request.data.get("algorithm", "sha256")
        uploaded_files = request.FILES.getlist("files", [])

        # Save uploaded files and add their paths
        for uploaded_file in uploaded_files:
            try:
                with NamedTemporaryFile(delete=False, dir=gettempdir(), suffix=f"_{uploaded_file.name}") as temp_file:
                    for chunk in uploaded_file.chunks():
                        temp_file.write(chunk)
                    paths.append(temp_file.name)
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
                hash_object = hashlib.new(algorithm)
                with open(path, 'rb') as f:
                    while chunk := f.read(8192):
                        hash_object.update(chunk)
                hash_value = hash_object.hexdigest()

                baseline = Baseline.objects.create(
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