from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth import authenticate, get_user_model

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')
        User = get_user_model()

        # Check if input is email
        if '@' in username:
            try:
                user = User.objects.get(email=username)
                username = user.username  # Get username for authentication
            except User.DoesNotExist:
                raise serializers.ValidationError('No user found with this email.')

        user = authenticate(username=username, password=password)
        if not user:
            raise serializers.ValidationError('Invalid credentials.')
        if not user.is_active:
            raise serializers.ValidationError('User account is disabled.')
            
        return user