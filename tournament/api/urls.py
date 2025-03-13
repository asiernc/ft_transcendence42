from django.urls import path
from .views import createTournament

urlpatterns = [
	path('create-tournament', createTournament),
	
]