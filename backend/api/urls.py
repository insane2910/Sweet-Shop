from rest_framework.routers import DefaultRouter
from .views import SweetViewSet, RegisterView
from django.urls import path, include


router = DefaultRouter()
router.register(r'sweets', SweetViewSet, basename='sweet')

urlpatterns = [
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('', include(router.urls)),
]



