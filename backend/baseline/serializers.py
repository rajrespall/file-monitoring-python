from rest_framework import serializers
from .models import Baseline, Config, Scan

class BaselineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Baseline
        fields = ['id', 'user','original_filename', 'path', 'hash_value', 'algorithm']
        
class ConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = Config
        fields = ['user', 'path', 'algorithm', 'scan_frequency']
        
    def validate_algorithm(self,value):
        allowed_algorithms = ['md5','sha256']
        if value not in allowed_algorithms:
            raise serializers.ValidationError(f"Algorithm {value} is not allowed")
        return value
    
    def validate_scan_frequency(self,value):
        allowed_frequencies = ['daily','weekly','monthly']
        if value not in allowed_frequencies:
            raise serializers.ValidationError(f"Frequency {value} is not allowed")
        return value
    
class ScanResultSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    filename = serializers.CharField()
    status = serializers.CharField()
    expected_hash = serializers.CharField()
    current_hash = serializers.CharField(allow_null=True)

class ScanSerializer(serializers.ModelSerializer):
    results = ScanResultSerializer(many=True, read_only=True)
    
    class Meta:
        model = Scan
        fields = ['id', 'status', 'created_at', 'results']