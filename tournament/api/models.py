from django.db import models
from django.contrib.auth.models import AbstractUser

# db table name = users_user
class User(AbstractUser):
	email = models.EmailField(max_length=75, unique=True, null=False)
	password = models.CharField(max_length=255, null=False)
	otp = models.CharField(max_length=6, blank=True, null=True)
	otp_expire = models.DateTimeField(blank=True, null=True)
	avatar_field = models.ImageField(upload_to='images/', null=True, blank=True)
	avatar_42_url = models.URLField(null=True, blank=True)
	online_status = models.BooleanField(default=False)
	intra_user = models.BooleanField(default=False)
	class Meta:
		db_table = 'user_users'

class Friends(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='friends')
    friend = models.ForeignKey(User, on_delete=models.CASCADE, related_name='friend_of')
	
    class Meta:
        unique_together = ('user', 'friend')

class Tournament(models.Model):
	name = models.CharField(max_length=55, null=False)
	start_date = models.DateTimeField(auto_now_add=True)
	winner = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='tournament_wins', null=True, blank=True)
	match = models.IntegerField(default=0)
	matches_json = models.JSONField(default=dict)
	players_alias = models.JSONField(default=dict)
	class Meta:
		db_table = 'tournament_users'

class Match(models.Model):
	player1 = models.ForeignKey(User, on_delete=models.CASCADE, related_name='matches_as_player1')
	player2 = models.ForeignKey(User, on_delete=models.CASCADE, related_name='matches_as_player2')
	winner = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='match_wins', null=True, blank=True)
	score_player1 = models.IntegerField()
	score_player2 = models.IntegerField()
	played_at = models.DateTimeField(auto_now_add=True)
	tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE, related_name='match_set', null=True, blank=True)
	class Meta:
		db_table = 'match_users'
