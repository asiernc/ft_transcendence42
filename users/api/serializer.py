from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
	password_check = serializers.CharField(write_only=True)
	
	class Meta:
		model = User
		fields = [ 'username', 'email', 'password', 'password_check', 'avatar_field', 'otp', 'otp_expire', 'online_status' ]
		extra_kwargs = {
			'password': {'write_only': True},
			'password_check': {'write_only': True}
		}

	def validate(self, data):
		password = data.get('password')
		password_check = data.get('password_check')
		if password != password_check:
			raise serializers.ValidationError("Passwords do not match.")
		return data

	def create(self, validated_data):
		validated_data.pop('password_check', None)
		password = validated_data.pop('password', None)
		instance = self.Meta.model(**validated_data)
		if password is not None:
			instance.set_password(password)
		instance.save()
		return instance
