from django.urls import path
from .views import handleTournament, getTournament

urlpatterns = [
	path('handle-tournament', handleTournament),
	path('tournament/<id:pk>', getTournament),
]