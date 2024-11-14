from django.urls import path
from .views import BaselineView, ConfigView, ScanView, ScanStatusView

urlpatterns = [
    path('baseline', BaselineView.as_view(), name='baseline'),
    path('config', ConfigView.as_view(), name='config'),
    path('scan', ScanView.as_view(),name='scan'),
    path('scan/status', ScanStatusView.as_view(), name='scan_status')
    
]

