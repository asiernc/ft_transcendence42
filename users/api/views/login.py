from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status, generics
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from django.utils import timezone
from datetime import timedelta
import random
from api.models import User
from django.core.mail import send_mail
from django.conf import settings

class UserLoginView(generics.GenericAPIView):
	permission_classes = [AllowAny]

	def post(self, request):
		username = request.data.get('username')
		password = request.data.get('password')

		user = authenticate(request, username=username, password=password)
		if user is None:
			raise AuthenticationFailed('User not found.')

		otp_random_code = random.randint(100000, 999999)
		user.otp = str(otp_random_code)
		user.otp_expire = timezone.now() + timedelta(minutes=15)
		user.save()
		
		send_mail(
			'OTP Verification',
			f'Your OTP code is {otp_random_code}',
			settings.EMAIL_HOST_USER,
			[user.email],
			fail_silently=False,
		)
		
		return Response({'detail': 'OTP code sent successfully.'}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([AllowAny])
def verify_otp(request):
	username = request.data.get('username')
	otp_code = request.data.get('otp_code')
	
	try:
		user = User.objects.get(username=username)
	except User.DoesNotExist:
		return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

	# veir
	if user.otp is None or user.otp_expire is None or user.otp != otp_code or timezone.now() > user.otp_expire:
		return Response({'error': 'Invalid or expired OTP code.'}, status=status.HTTP_400_BAD_REQUEST)

	refresh = RefreshToken.for_user(user)
	access_token = str(refresh.access_token)
	refresh_token = str(refresh)

	user.otp = None
	user.otp_expire = None
	user.save()

	response = Response({
		'refresh': str(refresh),
		'access': str(refresh.access_token)
	}, status=status.HTTP_200_OK)

	response.set_cookie(key='access_token', value=access_token, httponly=True)
	response.set_cookie(key='refresh_token', value=refresh_token, httponly=True)
	return response
