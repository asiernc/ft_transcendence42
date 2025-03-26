from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status, generics
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.utils import timezone
from datetime import timedelta
import random
from api.models import User
from django.core.mail import send_mail
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

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
		user.otp_expire = timezone.now() + timedelta(minutes=5)
		user.save()
		
		send_mail(
			subject='🔐 Secure Login Verification',
			message=f'''
	Hello {user.username},

	A login attempt was made to your account. To complete the login, please enter the following OTP code:

	🔢 OTP Code: {otp_random_code}

	This code is valid for the next 5 minutes. If you did not request this login, please reset your password immediately.

	Best regards,  
	The Security Team
				''',
			from_email=settings.EMAIL_HOST_USER,
			recipient_list=[user.email],
			fail_silently=False,
		)
		
		return Response({'detail': 'OTP code sent successfully.', 'username': username}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([AllowAny])
def verifyOtp(request):
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

	logger.info(f"Username == {username}")

	response = Response({
		'refresh': str(refresh),
		'access': str(refresh.access_token)
	}, status=status.HTTP_200_OK)

	response.set_cookie(key='access_token', value=access_token)
	response.set_cookie(key='refresh_token', value=refresh_token)
	return response

@api_view(['POST'])
@permission_classes([AllowAny])
def resendOtp(request):
	username = request.data.get('username')
	
	try:
		user = User.objects.get(username=username)
	except User.DoesNotExist:
		return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
	
	if user.otp_expire is not None and user.otp_expire > timezone.now():
		return Response(
			{'detail': 'OTP code is still valid, please use the previous code.'},
			status=status.HTTP_200_OK
		)
	otp_random_code = random.randint(100000, 999999)
	user.otp = str(otp_random_code)
	user.otp_expire = timezone.now() + timedelta(minutes=5)
	user.save()
	
	send_mail(
		subject='🔐 Secure Login Verification',
		message=f'''
Hello {user.username},

A login attempt was made to your account. To complete the login, please enter the following OTP code:

🔢 OTP Code: {otp_random_code}

This code is valid for the next 5 minutes. If you did not request this login, please reset your password immediately.

Best regards,  
The Security Team
			''',
		from_email=settings.EMAIL_HOST_USER,
		recipient_list=[user.email],
		fail_silently=False,
	)
	
	return Response({'detail': 'OTP code sent successfully.', 'username': username}, status=status.HTTP_200_OK)




@api_view(['POST'])
@permission_classes([IsAuthenticated])
def verifyCredentials(request):
	username = request.data.get('username')
	password = request.data.get('password')

	user = authenticate(request, username=username, password=password)
	if user is None:
		raise Response({'detail': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)
	return Response({'detail': 'Credentials are valid.'}, status=status.HTTP_200_OK)


#logout view
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
	response = Response({'detail': 'Successfully logged out.'}, status=status.HTTP_200_OK)
	response.delete_cookie('access_token')
	response.delete_cookie('refresh_token')
	return response