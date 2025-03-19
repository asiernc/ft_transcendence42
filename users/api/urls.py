from django.urls import path
from .views.crud import (
	registerUser,
	getUser,
	getUsers,
	updateUser,
	handleAvatar,
	deleteUser,
	addFriend,
	deleteFriend
	)
from .views.login import UserLoginView, verifyOtp, verifyCredentials, logout
from .views.refresh_tokens import refresh_tokens
from .views.login42 import login42
from .views.callback42 import callback42
from .views.matchs import (createMatch,
    getMatches,
    getMatchesByUsername,
    )
from .views.profile import (getProfile, getLeaderboard)

urlpatterns = [
	path('get/<int:pk>', getUser), #/api/get/<str:pk>
	path('get', getUsers), #/api/get
	path('register', registerUser), #/api/register || ¿? /api/crud/createUser
	path('avatar', handleAvatar), #/api/upload-avatar
	path('login', UserLoginView.as_view()), #/api/login
	path('verify-otp', verifyOtp), #/api/verify-otp
	path('refresh-tokens', refresh_tokens), #/api/generate-or-refresh-jwt
	path('login42/', login42), #/api/login42
	path('callback42/', callback42), #/api/callback42
	path('verify-credentials', verifyCredentials), #/api/verify-credentials
	path('add-friend', addFriend),
	path('delete-friend', deleteFriend),
	path('update/<str:username>', updateUser), #/api/update/<str:pk>
	path('create-match', createMatch), #api/create-match
	path('get-matchs', getMatches),
	path('get-matchs/<str:username>', getMatchesByUsername),
	path('logout', logout), #/api/logout
	path('delete/<int:pk>', deleteUser),
	path('profile/<str:username>', getProfile),
	path('leaderboard', getLeaderboard),
]