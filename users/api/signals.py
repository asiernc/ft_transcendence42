from django.db.models.signals import post_migrate
from django.dispatch import receiver
from .models import User

@receiver(post_migrate)
def create_default_users(sender, **kwargs):
	User.objects.get_or_create(
		username='localhost',
		defaults={'password': 'localhost_password', 'email': 'localhost@gmail.com'}
		)
	
	User.objects.get_or_create(
		username='ia',
		defaults={'password': 'ia_password', 'email': 'ia@gmail.com'}
		)
	
	