from django.utils.deprecation import MiddlewareMixin
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from rest_framework import status
from rest_framework.renderers import JSONRenderer

class VerifyUserMiddleware(MiddlewareMixin):
    def process_view(self, request, view_func, view_args, view_kwargs):
        print("Middleware process_view called")
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']

            if auth_header.startswith('Bearer '):
                jwt_authenticator = JWTAuthentication()
                try:
                    user, validated_token = jwt_authenticator.authenticate(request)

                    if 'username' in view_kwargs:
                        username = view_kwargs['username']
                        print(f'user fetch {user.username} \nuser for fetching {username}.')
                        
                        if user is None or user.username != username:
                            raise AuthenticationFailed('Invalid token or user mismatch.')
                except AuthenticationFailed as e:
                    response = Response(
                        {'error': str(e)},
                        status=status.HTTP_401_UNAUTHORIZED
                    )
                    response.accepted_renderer = JSONRenderer()
                    response.accepted_media_type = 'application/json'
                    response.renderer_context = {}
                    return response
            else:
                response = Response(
                    {'error': 'Authentication token required'},
                    status=status.HTTP_401_UNAUTHORIZED
                )
                response.accepted_renderer = JSONRenderer()
                response.accepted_media_type = 'application/json'
                response.renderer_context = {}
                return response
        return None