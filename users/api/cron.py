from django.utils import timezone
from .models import User
import random
from datetime import timedelta
from django.core.mail import send_mail
from django.conf import settings

def check_expired_otps():
    users = User.objects.filter(otp_expire__lte=timezone.now())
    for user in users:
        otp_random_code = random.randint(000000,999999)
        user.otp = str(otp_random_code)
        user.otp_expire = timezone.now() + timedelta(minutes=5)
        user.save()
        send_mail(
			'New OTP Verification',
			f'Your new OTP code is {otp_random_code}',
			settings.EMAIL_HOST_USER,
			[user.email],
			fail_silently=False,
		)