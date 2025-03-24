from rest_framework import serializers
from .models import User, Match, Tournament
from PIL import Image
import imghdr
from .utils.image_validator import validate_image
import re # for regex analysis

class UserSerializer(serializers.ModelSerializer):
	avatar_field = serializers.ImageField(required=False)
	password_check = serializers.CharField(write_only=True, required=True)
	class Meta:
		model = User
		fields = [ 'username', 'email', 'password', 'password_check', 'avatar_field', 'avatar_42_url', 'otp', 'otp_expire', 'online_status', 'first_name', 'intra_user' ]

		extra_kwargs = {
			'password': {'write_only': True, 'required': False},
		}

	def validate_password(self, value):
		if len(value) < 6:
			raise serializers.ValidationError("Password must be at least 6 characters long.")
		if not re.search(r'[A-Z]', value):
			raise serializers.ValidationError("Password must contain at least one uppercase letter.")
		if not re.search(r'[a-z]', value):
			raise serializers.ValidationError("Password must contain at least one lowercase letter.")
		if not re.search(r'[0-9]', value):
			raise serializers.ValidationError("Password must contain at least one digit.")
		return value
	
	def validate_username(self, value):
		if self.instance:
			if User.objects.filter(username=value).exclude(id=self.instance.id).exists():
				raise serializers.ValidationError("Username or email already in use")
		else:
			if User.objects.filter(username=value).exists():
				raise serializers.ValidationError("Username or email already in use")
		return value

	def validate_email(self, value):
		if self.instance:
			if User.objects.filter(email=value).exclude(id=self.instance.id).exists():
				raise serializers.ValidationError("Email or email already in use")
		else:
			if User.objects.filter(email=value).exists():
				raise serializers.ValidationError("Email or email already in use")
		return value

	def validate_avatar_field(self, value):
		validate_image(value)
		return value

	def validate(self, data):
		password = data.get('password')
		password_check = data.get('password_check')
		if password and password != password_check:
			raise serializers.ValidationError({"password error": "Passwords mismatch."})
		return data

	def create(self, validated_data):
		# se quita password del validated data, seguridad
		password = validated_data.pop('password', None)
		# se crea una instancia con los demas datos validades
		instance = self.Meta.model(**validated_data)
		if password is not None:
			instance.set_password(password)
		instance.save()
		return instance

	def update(self, instance, validated_data):
		password = validated_data.pop('password', None)

		for attr, value in validated_data.items():
			setattr(instance, attr, value)

		if password:
			instance.set_password(password)

		instance.save()
		return instance

class MatchSerializer(serializers.ModelSerializer):
	player1_username = serializers.CharField(write_only=True)
	player2_username = serializers.CharField(write_only=True)
	winner_username = serializers.CharField(write_only=True, required=False, allow_null=True)
	tournament_id= serializers.IntegerField(required=False, allow_null=True)
	player1_username_read = serializers.CharField(source='player1.username', read_only=True)
	player2_username_read = serializers.CharField(source='player2.username', read_only=True)
	winner_username_read = serializers.CharField(source='winner.username', read_only=True, allow_null=True)

	class Meta:
		model = Match
		fields = [
			'player1_username', 'player2_username', 'winner_username',
			'score_player1', 'score_player2', 'played_at', 'tournament_id',
			'player1_username_read', 'player2_username_read', 'winner_username_read'
		]

	def get_tournament_name(self, obj):
		return obj.tournament.name if obj.tournament else None

	def validate(self, data):
		player1_username = data.get('player1_username')
		player2_username = data.get('player2_username')
		winner_username = data.get('winner_username')
		tournament_id = data.get('tournament_id')

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

		if tournament_id:
			try:
				tournament = Tournament.objects.get(id=tournament_id)
			except Tournament.DoesNotExist:
				raise serializers.ValidationError(f"Tournament with id {tournament_id} does not exist.")
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
		return super().create(validated_data)


class FriendSerializer(serializers.ModelSerializer):
	class Meta:
		fields = '__all__'

