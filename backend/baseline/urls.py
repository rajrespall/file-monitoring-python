from django.urls import path
from .views import BaselineView, ConfigView, ScanView, BaselineScanView

urlpatterns = [
    path('baseline', BaselineView.as_view(), name='baseline'),
    path('config', ConfigView.as_view(), name='config'),
    path('scan', ScanView.as_view(),name='scan'),
    path('baseline/<int:baseline_id>/scan', BaselineScanView.as_view(), name='baseline_scan')
]

