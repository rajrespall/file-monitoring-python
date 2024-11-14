from django.db import models

# Create your models here.
class Baseline(models.Model):
    path = models.CharField(max_length=255, unique=True)
    hash_value = models.CharField(max_length=64)
    algorithm = models.CharField(max_length=10)
    
    def __str__(self):
        return f"{self.path} - {self.hash_value}"
    
    
class Config(models.Model):
    id = models.AutoField(primary_key=True)
    algorithm = models.CharField(max_length=10, default='sha256')
    scan_frequency = models.CharField(max_length=20, default='daily')
    
    def __str__(self):
        return f"Config(algorithm={self.algorithm},scan_frequence={self.scan_frequency})"
    
class Scan(models.Model):
    status = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Scan(status={self.status},created_at={self.created_at})"

