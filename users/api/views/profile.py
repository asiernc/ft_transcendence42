from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from api.models import User, Friends, Match
from api.serializer import UserSerializer, MatchSerializer #FriendsSerializer
from django.conf import settings
import os
from django.db.models import Q

#get info for profile page
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getProfile(request, username):
	try:
		user = User.objects.get(username=username)
		friends = Friends.objects.filter(Q(user=user) | Q(friend=user))
		matches = Match.objects.filter(Q(player1=user) | Q(player2=user))

		user_serializer = UserSerializer(user)
		friends_serializer = UserSerializer([friend.user if friend.user != user else friend.friend for friend in friends], many=True)
		matches_serializer = MatchSerializer(matches, many=True)

		return Response({
			'user': user_serializer.data,
			'friends': friends_serializer.data,
			'matches': matches_serializer.data
		}, status=status.HTTP_200_OK)
	except User.DoesNotExist:
		return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
	except Exception as e:
		return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)