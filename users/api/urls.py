from django.urls import path
from .views.test import test_api
from .views.crud import (
	createUser,
	getUser,
	getUsers,
	updateUser,
	deleteUser,
)


urlpatterns = [
    path('test/', test_api, name='test_api'),
    path('create', createUser), #/api/create || ¿? /api/crud/createUser 
    path('get/<int:pk>', getUser), #/api/get/<str:pk>
    path('get', getUsers), #/api/get
    path('update/<int:pk>', updateUser), #/api/update/<str:pk>
    path('delete/<int:pk>', deleteUser), #/api/delete/<str:pk>
    
    # crud de user, refreshtokens, login42
    #path('refresh-tokens/', refresh_tokens_secure, name='refresh-tokens'), #/api/refreshTokens
]