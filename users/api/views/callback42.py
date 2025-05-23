import requests
from django.shortcuts import redirect
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from api.models import User

@api_view(['POST'])
@permission_classes([AllowAny])
def callback42(request):
	try:
		state = request.data.get('state')
		code = request.data.get('code')
		if not code or not state:
			return Response(
				{'error': 'Invalid request.'}, status=status.HTTP_400_BAD_REQUEST)

		# configuracion de la peticion post al endpoint de token de 42
		token_url = "https://api.intra.42.fr/oauth/token"
		token_data = {
			'grant_type': 'authorization_code',
			'client_id': settings.FT_CLIENT_ID,
			'client_secret': settings.FT_CLIENT_SECRET,
			'code': code,
			'state': state,
			'redirect_uri': settings.FT_REDIRECT_URI,
		}
		#peticion post al endpoint de token de 42 para obtener el token de acceso
		try:
			token_response = requests.post(token_url, data=token_data)
			token_response.raise_for_status()
			token_json = token_response.json()
		except requests.exceptions.RequestException as e:
			return Response({'error': f'Failed to obtain access token: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)

		if 'access_token' not in token_json:
			return Response({'error': 'Invalid request.'}, status=status.HTTP_400_BAD_REQUEST)

		# gettting user info
		access_token = token_json['access_token']
		user_info_url = "https://api.intra.42.fr/v2/me"
		# para cada una de las peticiones a la api de 42 se debe enviar el token de acceso en el header
		user_info_headers = {
			'Authorization': f'Bearer {access_token}',
		}

		try:
			user_info_response = requests.get(user_info_url, headers=user_info_headers)
			user_info_response.raise_for_status()
			user_info_json = user_info_response.json()

		except requests.exceptions.RequestException as e:
			return Response({'error': f'Failed to obtain user information: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)

		try:
			USERNAME_INTRA_PREFIX = "_"
			user, created = User.objects.get_or_create(username=USERNAME_INTRA_PREFIX + user_info_json['login'])
			if created:
				user.email = user_info_json['email']
				user.first_name = user_info_json['first_name']
				user.last_name = user_info_json['last_name']
				user.intra_user = True
				user.avatar_42_url = user_info_json['image']['link']
				user.save()
			else:
				user.email = user_info_json['email']
				user.first_name = user_info_json['first_name']
				user.last_name = user_info_json['last_name']
				user.intra_user = True
				user.avatar_42_url = user_info_json['image']['link']
				user.save()
		except Exception as e:
			return Response({'error': f'Failed to save user: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

		refreshtoken = RefreshToken.for_user(user)
		access_token = str(refreshtoken.access_token)

		response = Response({
			'access_token': access_token,
			'refresh_token': str(refreshtoken),
			'username': user.username,
			'name': user.first_name,
			'last_name': user.last_name,
			'email': user.email,
			'user_img': user.avatar_42_url,
		}, status=status.HTTP_200_OK)

		response.set_cookie(key='access_token', value=access_token)
		response.set_cookie(key='refresh_token', value=str(refreshtoken))
		return response
	except Exception as e:
		print('Unexpected error:', str(e))
		return Response(
			{'error': f'An unexpected error occurred: {str(e)}'},
			status=status.HTTP_500_INTERNAL_SERVER_ERROR
		)
