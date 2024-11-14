import os
import hashlib
from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from .models import Baseline, Config, Scan
from .serializers import BaselineSerializer, ConfigSerializer, ScanSerializer

class ScanView(APIView):
    def post(self,request):
        scan = Scan.objects.create(status="Scanning initiated")
        return Response({"message": "Scan initiated", "scan_id": scan.id}, status=status.HTTP_201_CREATED)
    
class ScanStatusView(APIView):
    def get(self,request):
        try:
            scan = Scan.objects.latest('created_at')
            serializer = ScanSerializer(scan)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Scan.DoesNotExist:
            return Response({"error": "No scans found"}, status=status.HTTP_404_NOT_FOUND)
class BaselineView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [IsAuthenticated]

    def post(self, request):
        paths = request.data.get("paths", [])
        algorithm = request.data.get("algorithm", "sha256")
        uploaded_files = request.FILES.getlist("files", [])
        
        if algorithm not in ['md5', 'sha256']:
            return Response({"error": "Invalid algorithm. Choose 'md5' or 'sha256'."}, status=status.HTTP_400_BAD_REQUEST)
    
        created_baselines = []
        for path in paths:
            if not os.path.isfile(path):
                return Response({"error": f"Path {path} is not a file"}, status=status.HTTP_400_BAD_REQUEST)
                                  
            hash_object = hashlib.new(algorithm)
            
            try:
                with open(path, 'rb') as f:
                    while chunk := f.read(8192):
                        hash_object.update(chunk)
                hash_value = hash_object.hexdigest()
            except IOError:
                return Response({"error": f"Error reading file {path}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
            baseline, created = Baseline.objects.update_or_create(
                path=path,
                defaults={"hash_value": hash_value, "algorithm": algorithm}
            )
            created_baselines.append(baseline)
        
        # For File Upload
        for uploaded_file in uploaded_files:
            hash_object = hashlib.new(algorithm)
            
            try:
                for chunk in uploaded_file.chunks():
                    hash_object.update(chunk)
                hash_value = hash_object.hexdigest()
            except IOError:
                return Response({"error": f"Error reading uploaded file {uploaded_file.name}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
            baseline, created = Baseline.objects.update_or_create(
                path=uploaded_file.name,
                defaults={"hash_value": hash_value, "algorithm": algorithm}
            )
            created_baselines.append(baseline)
                
        serializer = BaselineSerializer(created_baselines, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def get(self, request):
        baselines = Baseline.objects.all()
        serializer = BaselineSerializer(baselines, many=True)
        return Response(serializer.data)

    def delete(self, request):
        paths = request.data.get("paths", [])
        uploaded_files = request.FILES.getlist("files", [])
        
        for uploaded_file in uploaded_files:
            paths.append(uploaded_file.name)
            
        deleted_count, _ = Baseline.objects.filter(path__in=paths).delete()
        
        if deleted_count == 0:
            return Response({"message": "No baselines found for specified paths"}, status=status.HTTP_404_NOT_FOUND)
        
        return Response({"message": f"Deleted {deleted_count} baselines"}, status=status.HTTP_200_OK)
        
class ConfigView(APIView):
    def get(self, request):
        config, created = Config.objects.get_or_create(id=1)
        serializer = ConfigSerializer(config)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request):
        config, created = Config.objects.get_or_create(id=1)
        serializer = ConfigSerializer(config, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Configuration updated", "config": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
