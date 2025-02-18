from django.db import models
from django.contrib.auth.models import AbstractUser

# db table name = users_user
class User(AbstractUser):
	email = models.EmailField(max_length=75, unique=True, null=False)
	password = models.CharField(max_length=255, null=False)
	otp = models.CharField(max_length=6, blank=True, null=True)
	otp_expire = models.DateTimeField(blank=True, null=True)
	avatar_field = models.ImageField(upload_to='images/', null=True, blank=True)
	avatar_42_url = models.URLField(max_length=255, null=True, blank=True)
	online_status = models.BooleanField(default=False)
	intra_user = models.BooleanField(default=False)

# class Friends(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='friends')
#     friend = models.ForeignKey(User, on_delete=models.CASCADE, related_name='friend of')
	
#     class Meta:
#         unique_together = ('user', 'friend')

class Tournament(models.Model):
	name = models.CharField(max_length=55, null=False)
	#description = models.TextField(null=True, blank=True)
	start_date = models.DateTimeField(auto_now_add=True)
	winner = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='tournament_wins', null=True, blank=True)
	players = models.ManyToManyField(User, related_name='players')

class Match(models.Model):
    player1 = models.ForeignKey(User, on_delete=models.CASCADE, related_name='matches_as_player1')
    player2 = models.ForeignKey(User, on_delete=models.CASCADE, related_name='matches_as_player2')
    winner = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='match_wins', null=True, blank=True)
    score_player1 = models.IntegerField()
    score_player2 = models.IntegerField()
    played_at = models.DateTimeField(auto_now_add=True)
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE, related_name='matches', null=True, blank=True)










# def record_match(request):
# 		player1_username= request.data.get('player1')
# 		player2_username=request.data.get('player2')
# 		winner_username = request.data.get('winner')
# 		tournament_id = request.data.get('tournament_id')
# 		try:
# 			player1 = PongUser.objects.get(username=player1_username)
# 			player2 = PongUser.objects.get(username=player2_username)
# 			winner = PongUser.objects.get(username=winner_username)
# 		except PongUser.DoesNotExist:
# 			return Response({'detail': 'One or both users not found'}, status=status.HTTP_400_BAD_REQUEST)

# 		match_data = {
#             'player1': player1.id,
#             'player2': player2.id,
#             'player1_score': request.data.get('player1_score'),
#         	'player2_score': request.data.get('player2_score'),
# 			'winner': winner.id,
#         	'tournament_id': tournament_id
#         }

