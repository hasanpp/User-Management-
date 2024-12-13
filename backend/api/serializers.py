from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note,UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['id', 'user', 'profile_picture',]

class UserSerializer(serializers.ModelSerializer):
    profile_picture = serializers.ImageField(required=False)
    
    class Meta:
        model = User
        fields = ["id","username","email", "profile_picture","password","is_active", "is_staff"]
        extra_kwargs = {"password": {"write_only": True, "required": False}}
        
    def create(self, validate_data):
        password = validate_data.pop("password")
        user = User.objects.create_user(**validate_data)
        user.set_password(password)
        user.save()
        return user
    
    def update(self, instance, validated_data):
        if "password" in validated_data:
            instance.set_password(validated_data.pop("password"))
        return super().update(instance, validated_data)
    

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id","title","content", "created_at", "author"]
        extra_kwargs = {"author":{"read_only": True}}
        
        
        