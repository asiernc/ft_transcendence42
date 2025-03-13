from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from api.models import User, Friends
from api.serializer import MatchSerializer, TournamentSerializer
from django.conf import settings
import os

@api_view(['POST'])
@permission_classes([AllowAny])
def createTournament(request):
	serializer = TournamentSerializer(data=request.data)
	if serializer.is_valid():
		serializer.save()
		return Response(serializer.data, status=status.HTTP_201_CREATED)
	return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)