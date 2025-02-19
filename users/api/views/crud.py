from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from api.models import User
from api.serializer import UserSerializer
from django.core.mail import send_mail
from django.conf import settings
from PIL import Image
import imghdr
from ..utils.image_validator import validate_image
import os

#get all users
@api_view(['GET'])
@permission_classes([AllowAny])
def getUsers(request):
	users = User.objects.all()
	serializer = UserSerializer(users, many=True)
	return Response(serializer.data)

#get user by id
@api_view(['GET'])
@permission_classes([AllowAny])
def getUser(request, pk):
	try:
		user = User.objects.get(id=pk)
	except User.DoesNotExist:
		return Response({'detail': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
	serializer = UserSerializer(user, many=False, context={'request': request})
	return Response(serializer.data)

#create user
@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
	serializer = UserSerializer(data=request.data)
	if serializer.is_valid():
		serializer.save()
		return Response(serializer.data, status=status.HTTP_201_CREATED)
	return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#post image
@api_view(['POST', 'PUT'])
@permission_classes([IsAuthenticated])
def handle_avatar(request):
	if 'avatar' not in request.FILES:
		return Response({'error': 'No file uploaded.'}, status=status.HTTP_400_BAD_REQUEST)

	avatar = request.FILES['avatar']
	try:
		validate_image(avatar)
	except (IOError, SyntaxError) as e:
		return Response({'error': str(e) }, status=status.HTTP_400_BAD_REQUEST)
	
	user = request.user
	
	old_avatar = user.avatar_field if request.method == 'PUT' else None

	user.avatar_field = avatar
	user.save()

	if old_avatar and os.path.exists(old_avatar.path):
		try:
			print({f'Old avatar removed: {old_avatar.path}'})
			os.remove(old_avatar.path)
		except Exception as e:
			print({f'Failed to remove old avatar: {str(e)}'})
	message = 'Avatar uploaded successfully.' if request.method == 'POST' else 'Avatar updated successfully.'
	return Response({'detail': message}, status=status.HTTP_200_OK)


#update user
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUser(request, username):	
	try:
		user = User.objects.get(username=username)
	except User.DoesNotExist:
		return Response({'detail': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
	{'username':'asier'}
	# intra user
	if user.intra_user:
		protected_fields = ['username', 'email', 'password']
		request_data = request.data
		for field in protected_fields:
			if field in request_data:
				return Response(
					{'error': f'Field "{field}" is protected for 42 intra users.'},
					status=status.HTTP_403_FORBIDDEN
					)
	else:
		request_data = request.data

	old_email = user.email
	serializer = UserSerializer(instance=user, data=request.data, partial=True)
	if serializer.is_valid():
		user = serializer.save()
		if not user.intra_user and old_email != user.email:
			send_mail(
			subject='Your Email Has Been Updated',
			message=f'''
Hello {user.username},

We wanted to let you know that your email has been successfully updated on our platform.

New email: {user.email}

If you did not request this change, please contact our support team immediately.

Best regards,
The Support Team
				''',
			from_email=settings.EMAIL_HOST_USER,
			recipient_list=[user.email],
			fail_silently=False,
		)
		return Response(serializer.data)
	return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#delete user
@api_view(['DELETE'])
@permission_classes([AllowAny])
def deleteUser(request, pk):
	try:
		user = User.objects.get(id=pk)
	except User.DoesNotExist:
		return Response({'detail': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
	user.delete()
	return Response({'detail': 'User deleted.'}, status=status.HTTP_204_NO_CONTENT)
