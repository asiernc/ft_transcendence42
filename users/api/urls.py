from django.urls import path
from .views.test import test_api
from .views.crud import (
	register_user,
	getUser,
	getUsers,
	updateUser,
	deleteUser,
)
from .views.login import UserLoginView, verify_otp
from .views.refresh_tokens import refresh_tokens


urlpatterns = [
	path('test/', test_api, name='test_api'),
	path('register', register_user), #/api/register || ¿? /api/crud/createUser 
	path('get/<int:pk>', getUser), #/api/get/<str:pk>
	path('get', getUsers), #/api/get
	path('update/<int:pk>', updateUser), #/api/update/<str:pk>
	path('delete/<int:pk>', deleteUser), #/api/delete/<str:pk>
	path('login', UserLoginView.as_view()), #/api/login
	path('verify-otp', verify_otp), #/api/verify-otp
	path('refresh-tokens', refresh_tokens), #/api/generate-or-refresh-jwt

	
	# crud de user, refreshtokens, login42
	#path('refresh-tokens/', refresh_tokens_secure, name='refresh-tokens'), #/api/refreshTokens
]