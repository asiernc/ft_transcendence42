from django.urls import path
from .views.crud import (
	registerUser, getUser, getUsers,
	updateUser, handleAvatar, deleteUser,
	addFriend, deleteFriend
	)
from .views.login import (UserLoginView, verifyOtp,
    verifyCredentials, logout, resendOtp)
from .views.refresh_tokens import refresh_tokens
from .views.login42 import login42
from .views.callback42 import callback42
from .views.matchs import (createMatch,
    getMatches, getMatchesByUsername, get_wallet_key )
from .views.profile import (getProfile, getLeaderboard)

urlpatterns = [
	path('get/<int:pk>', getUser),
	path('get', getUsers), 
	path('register', registerUser), 
	path('avatar', handleAvatar),
	path('login', UserLoginView.as_view()),
	path('verify-otp', verifyOtp), 
	path('resend-otp', resendOtp),
	path('refresh-tokens', refresh_tokens),
	path('login42/', login42),
	path('callback42/', callback42),
	path('verify-credentials', verifyCredentials),
	path('add-friend', addFriend),
	path('delete-friend', deleteFriend),
	path('update/<str:username>', updateUser),
	path('create-match', createMatch),
	path('get-matchs', getMatches),
	path('get-matchs/<str:username>', getMatchesByUsername),
	path('logout', logout),
	path('delete/<int:pk>', deleteUser),
	path('profile/<str:username>', getProfile),
	path('leaderboard', getLeaderboard),
	path('get-wallet-key', get_wallet_key),
]