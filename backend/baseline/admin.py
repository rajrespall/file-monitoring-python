from django.contrib import admin
from .models import Baseline, Config, Scan

# Register your models here.
@admin.register(Baseline)
class BaselineAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'original_filename', 'hash_value', 'algorithm')
    list_filter = ('user', 'algorithm')
    search_fields = ('original_filename', 'hash_value')

@admin.register(Config)
class ConfigAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'path', 'algorithm')
    list_filter = ('algorithm',)
    search_fields = ('user__username', 'path')

@admin.register(Scan)
class ScanAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('user__username',)