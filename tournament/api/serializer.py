from rest_framework import serializers
from .models import User, Match, Tournament

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ['id', 'username', 'email', 'avatar_field', 'avatar_42_url', 'online_status', 'intra_user']

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

		if player1 == player2 and player1_username != 'local' and player1_username != 'AI':
			raise serializers.ValidationError("Player 1 and Player 2 must be different.")

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


class TournamentSerializer(serializers.ModelSerializer):
	winner = UserSerializer(read_only=True)
	#players = UserSerializer(many=True, read_only=True)
	matches_json = serializers.JSONField()
	players_alias = serializers.JSONField()

	class Meta:
		model = Tournament
		fields = ['id', 'name', 'start_date', 'winner', 'match', 'matches_json', 'players_alias']
	
	def create(self, validated_data):
		#players_data = validated_data.pop('players')
		tournament = Tournament.objects.create(**validated_data)
		# for username in players_data:
		# 	try:
		# 		player = User.objects.get(username=username)
		# 	except User.DoesNotExist:
		# 		raise serializers.ValidationError((f"Player with username {username} does not exist."))
		# 	tournament.players.add(player)
		return tournament
	
	#def update(self, validated_data):
