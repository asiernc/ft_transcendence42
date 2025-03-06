from django.urls import path
from .views.crud import (
	register_user,
	getUser,
	getUsers,
	updateUser,
	handle_avatar,
	deleteUser,
	add_friend,
	)
from .views.login import UserLoginView, verify_otp, verify_credentials, logout
from .views.refresh_tokens import refresh_tokens
from .views.login42 import login42
from .views.callback42 import callback42
from .views.matchs import (create_match,
    get_matches,
    get_matches_by_username,
    )
from .views.profile import getProfile

urlpatterns = [
	path('get/<int:pk>', getUser), #/api/get/<str:pk>
	path('get', getUsers), #/api/get
	path('register', register_user), #/api/register || ¿? /api/crud/createUser
	path('avatar', handle_avatar), #/api/upload-avatar
	path('login', UserLoginView.as_view()), #/api/login
	path('verify-otp', verify_otp), #/api/verify-otp
	path('refresh-tokens', refresh_tokens), #/api/generate-or-refresh-jwt
	path('login42/', login42), #/api/login42
	path('callback42/', callback42), #/api/callback42
	path('verify-credentials', verify_credentials), #/api/verify-credentials
	path('add-friend', add_friend),
	path('update/<str:username>', updateUser), #/api/update/<str:pk>
	path('create-match', create_match), #api/create-match
	path('get-matchs', get_matches),
	path('get-matchs/<str:username>', get_matches_by_username),
	path('logout', logout), #/api/logout
	path('delete/<int:pk>', deleteUser),
	path('profile/<str:username>', getProfile)
]