from django.shortcuts import render

# Create your views here.
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer, UserProfileSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser

class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer
    parser_classes = (MultiPartParser, FormParser, JSONParser)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
        })
    
    def put(self, request, *args, **kwargs):
        user = request.user
        serializer = self.get_serializer(instance=user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        updated_user = serializer.save()

        # Handle profile image 
        profile = updated_user.userprofile
        if 'profile_image' in request.FILES:
            profile.image = request.FILES['profile_image']
            profile.save()

        profile_serializer = UserProfileSerializer(profile)
        return Response({
            "user": UserSerializer(updated_user, context=self.get_serializer_context()).data,
            "profile": profile_serializer.data
        })
    
class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            "token": token.key,
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
        })
    
class LogoutAPI(generics.GenericAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        # Delete the user's auth token
        request.user.auth_token.delete()
        return Response(
            {"message": "Successfully logged out"}, 
            status=status.HTTP_200_OK
        )
    
    