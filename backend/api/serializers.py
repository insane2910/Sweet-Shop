from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Sweet

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    role = serializers.ChoiceField(choices=[("user", "User"), ("admin", "Admin")], write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'role')

    def create(self, validated_data):
        role = validated_data.pop('role')
        user = User(
            username=validated_data['username'],
            email=validated_data.get('email', '')
        )
        user.set_password(validated_data['password'])
        # set is_staff=True if admin
        if role == "admin":
            user.is_staff = True
        user.save()
        return user


class SweetSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)

    class Meta:
        model = Sweet
        fields = ['id', 'name', 'category', 'price', 'quantity', 'description', 'image', 'created_at']
        read_only_fields = ['created_at']

    def to_representation(self, instance):
        """Ensure absolute URL for images"""
        rep = super().to_representation(instance)
        request = self.context.get('request')
        if instance.image and request:
            rep['image'] = request.build_absolute_uri(instance.image.url)
        return rep
