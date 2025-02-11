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
	

# class Friends(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='friends')
#     friend = models.ForeignKey(User, on_delete=models.CASCADE, related_name='friend of')
	
#     class Meta:
#         unique_together = ('user', 'friend')

# class Match(models.Model):
#     player1_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='player1')
#     player2_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='player2')
#     winner_id = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='winner')
#     score_player1 = models.IntegerField()
#     score_player2 = models.IntegerField()
#     played_at = models.DateTimeField(auto_now_add=True)
#     tournament_id = models.ForeignKey('Tournament', on_delete=models.CASCADE, related_name='tournament_id')
	

# class Tournament(models.Model):
# 	name = models.CharField(max_length=50, null=False)
# 	description = models.TextField(null=True, blank=True)
# 	start_date = models.DateTimeField(auto_now_add=True)
# 	winner = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='winner')
# 	players = models.ManyToManyField(User, related_name='players')

