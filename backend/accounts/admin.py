from django.contrib import admin

# Register your models here.
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.admin import TokenAdmin

# We'll customize the Token admin to show more useful information
TokenAdmin.raw_id_fields = ('user',)