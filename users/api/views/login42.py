import random
import string
from django.shortcuts import redirect
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

def generate_state():
	return ''.join(random.choices(string.ascii_uppercase + string.digits, k=16))

@api_view(['GET'])
@permission_classes([AllowAny])
def login42(request):
	state = generate_state()
	request.session["oauth_state"] = state
	
	url = (
		"https://api.intra.42.fr/oauth/authorize"
		f"?client_id={settings.FT_CLIENT_ID}"
		f"&redirect_uri={settings.FT_REDIRECT_URI}"
		f"&response_type=code"
		f"&scope=public"
		f"&state={state}"
	)
	return redirect(url)