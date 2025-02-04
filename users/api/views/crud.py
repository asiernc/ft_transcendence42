from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from api.models import User
from api.serializer import UserSerializer

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

#update user
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUser(request, pk):
	try:
		user = User.objects.get(id=pk)
	except User.DoesNotExist:
		return Response({'detail': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
	serializer = UserSerializer(instance=user, data=request.data)
	if serializer.is_valid():
		serializer.save()
		return Response(serializer.data)
	return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#delete user
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteUser(request, pk):
	try:
		user = User.objects.get(id=pk)
	except User.DoesNotExist:
		return Response({'detail': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
	user.delete()
	return Response({'detail': 'User deleted.'}, status=status.HTTP_204_NO_CONTENT)
