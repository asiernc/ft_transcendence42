from rest_framework import serializers
from .models import User, Match, Tournament
from PIL import Image
import imghdr

class UserSerializer(serializers.ModelSerializer):
	avatar_field = serializers.ImageField(required=False)
	
	class Meta:
		model = User
		fields = [ 'username', 'email', 'password', 'avatar_field', 'otp', 'otp_expire', 'online_status' ]
		extra_kwargs = {
			'password': {'write_only': True},
		}

	def validate_avatar_field(self, value):
		try:
			image = Image.open(value)
			image.verify()
		except (IOError, SyntaxError) as e:
			raise serializers.ValidationError("Invalid image file")

		value.seek(0)
		first_bytes = value.read(10)

		# Diccionario de firmas de archivos
		magic_numbers = {
			"jpeg": [b"\xFF\xD8\xFF"],
			"png": [b"\x89\x50\x4E\x47\x0D\x0A\x1A\x0A"],
			"gif": [b"\x47\x49\x46\x38\x39\x61", b"\x47\x49\x46\x38\x37\x61"]
		}
		mime_type = imghdr.what(value)
		if mime_type not in magic_numbers:
			raise serializers.ValidationError("Unsupported image type")

		valid_signature = any(first_bytes.startswith(sig) for sig in magic_numbers[mime_type])
		if not valid_signature:
			raise serializers.ValidationError("File extension does not match its content")

		value.seek(0)
		first_500_bytes = value.read(500)
		if b'<script>' in first_500_bytes or b'<?php' in first_500_bytes:
			raise serializers.ValidationError("Invalid image file (possible malicious content)")

		value.seek(0)
		if value.size > 2*1024*1024:
			raise serializers.ValidationError("Image file too large ( > 2mb )")
		
		return value

	def create(self, validated_data):
		validated_data.pop('password_check', None)
		password = validated_data.pop('password', None)
		instance = self.Meta.model(**validated_data)
		if password is not None:
			instance.set_password(password)
		instance.save()
		return instance

	# def update(self, instance, validated_data):
	#     validated_data.pop('password_check', None)
	#     password = validated_data.pop('password', None)
	#     if password is not None:
	#         instance.set_password(password)
	#     for attr, value in validated_data.items():
	#         setattr(instance, attr, value)
	#     instance.save()
	#     return instance


# class MatchSerializer(serializers.ModelSerializer):
# 	player1_username = serializers.SerializerMethodField()
# 	player2_username = serializers.SerializerMethodField()
# 	winner_username = serializers.SerializerMethodField()
# 	tourname_name = serializers.SerializerMethodField()

# 	class Meta:
# 		model = Match
# 		fields = [
# 			'player1_id', 'player1_username',
# 			'player2_id', 'player2_username',
# 			'winner_id', 'winner_username',
# 			'score_player1', 'score_player2',
# 			'played_at', 'tournament_id', 'tournament_name'
# 		]
	
# 	def get_player1_username(self, obj):
# 		return obj.player1.username

# 	def get_player2_username(self, obj):
# 		return obj.player2.username

# 	def get_winner_username(self, obj):
# 		return obj.winner.username if obj.winner else None