from django.urls import path
from .views import BaselineView, ConfigView

urlpatterns = [
    path('baseline', BaselineView.as_view(), name='baseline'),
    path('config', ConfigView.as_view(), name='config'),
]

