from django.urls import path
from .views.test import test_api


urlpatterns = [
    path('test/', test_api, name='test_api'),
    # crud de user, refreshtokens, login42
    #path('refresh-tokens/', refresh_tokens_secure, name='refresh-tokens'), #/api/refreshTokens
]