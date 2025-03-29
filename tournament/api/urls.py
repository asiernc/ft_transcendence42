from django.urls import path
from .views import handleTournament, getTournament, addMatchToTournament

urlpatterns = [
	path('handle-tournament', handleTournament),
	path('tournament/<int:pk>', getTournament),
	path('add-match', addMatchToTournament),
]