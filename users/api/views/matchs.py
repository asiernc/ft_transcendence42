from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from api.serializer import MatchSerializer
from api.models import Match, User

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_matches(request):
	matches = Match.objects.all()
	serializer = MatchSerializer(matches, many=True)
	return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_matches_by_username(request, username):
	try:
		user = User.objects.get(username=username)
	except User.DoesNotExist:
		return Response({'detail': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
	matches = Match.objects.filter(player1=user) | Match.objects.filter(player2=user)
	serializer = MatchSerializer(matches, many=True)
	return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_match(request):
    serializer = MatchSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)