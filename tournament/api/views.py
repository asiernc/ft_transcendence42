from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from api.models import User, Friends, Tournament
from api.serializer import MatchSerializer, TournamentSerializer
from django.conf import settings
import os

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getTournament(request, pk):
    try:
        tournament = Tournament.objects.get(id=pk)
        serializer = TournamentSerializer(tournament)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Tournament.DoesNotExist:
        return Response({'error': 'Tournament not found'}, status=status.HTTP_400_NOT_FOUND)


@api_view(['POST', 'PUT'])
@permission_classes([IsAuthenticated])
def handleTournament(request):
	if request.method == 'POST':
		serializer = TournamentSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
	elif request.method == 'PUT':
		tournament_id = request.data.get('tournament_id')
		try:
			tournament = Tournament.objects.get(id=tournament_id)
		except Tournament.DoesNotExist:
			return Response({'error': 'Tournament not found'}, status=status.HTTP_404_NOT_FOUND)
		#match_key = f"match{tournament.match + 1}"
		tournament.matches_json[f"match{tournament.match + 1}"]['winner'] = request.data.get("winner")
		#tournament.matches_json[f'match{tournament.match + 1}'].winner = request.winner
		#tournament.matches_json[f'match{tournament.match + 1}'] = request.new_match
		tournament.match += 1

		serializer = TournamentSerializer(tournament, data=request.data, partial=True)

		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_200_OK)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

