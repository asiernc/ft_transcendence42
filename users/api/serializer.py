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
			'password': {'write_only': True, 'required': False}, #false for update
		}
	
	def validate_username(self, value):	
		if User.objects.filter(username=value).exclude(id=self.instance.id).exists():
			raise serializers.ValidationError("Username already in use")
		return value

	def validate_email(self, value):
		if User.objects.filter(email=value).exclude(id=self.instance.id).exists():
			raise serializers.ValidationError("Email already in use")
		return value

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
		# se quita password del validated data, seguridad
		password = validated_data.pop('password', None)
		# se crea una instancia con los demas datos validades
		instance = self.Meta.model(**validated_data)
		if password is not None:
			instance.set_password(password)
		# se hashea la constraseña
		instance.save()
		return instance

	def update(self, instance, validated_data):
		password = validated_data.pop('password', None)

		for attr, value in validated_data.items():
			setattr(instance, attr, value)

		if password:
			instance.set_password(password)

		instance.save()
		return

class MatchSerializer(serializers.ModelSerializer):
	player1_username = serializers.CharField(write_only=True)
	player2_username = serializers.CharField(write_only=True)
	winner_username = serializers.CharField(write_only=True, required=False, allow_null=True)
	tournament_name = serializers.SerializerMethodField()
	player1_username_read = serializers.CharField(source='player1.username', read_only=True)
	player2_username_read = serializers.CharField(source='player2.username', read_only=True)
	winner_username_read = serializers.CharField(source='winner.username', read_only=True, allow_null=True)

	class Meta:
		model = Match
		fields = [
			'player1_username', 'player2_username', 'winner_username',
			'score_player1', 'score_player2', 'played_at', 'tournament_name',
			'player1_username_read', 'player2_username_read', 'winner_username_read'
		]

	def get_tournament_name(self, obj):
		return obj.tournament.name if obj.tournament else None

	def validate(self, data):
		player1_username = data.get('player1_username')
		player2_username = data.get('player2_username')
		winner_username = data.get('winner_username')
		tournament_name = data.get('tournament_name')

		try:
			player1 = User.objects.get(username=player1_username)
		except User.DoesNotExist:
			raise serializers.ValidationError(f"Player 1 with username {player1_username} does not exist.")

		try:
			player2 = User.objects.get(username=player2_username)
		except User.DoesNotExist:
			raise serializers.ValidationError(f"Player 2 with username {player2_username} does not exist.")

		if winner_username:
			try:
				winner = User.objects.get(username=winner_username)
			except User.DoesNotExist:
				raise serializers.ValidationError(f"Winner with username {winner_username} does not exist.")
		else:
			winner = None

		if tournament_name:
			try:
				tournament = Tournament.objects.get(name=tournament_name)
			except Tournament.DoesNotExist:
				raise serializers.ValidationError(f"Tournament with {tournament_name} does not exist.")
		else:
			tournament = None

		data['player1'] = player1
		data['player2'] = player2
		data['winner'] = winner
		data['tournament'] = tournament

		return data

	def create(self, validated_data):
		validated_data.pop('player1_username')
		validated_data.pop('player2_username')
		validated_data.pop('winner_username', None)
		validated_data.pop('tournament_name', None)
		return super().create(validated_data)

