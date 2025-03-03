from django.urls import re_path
from .consumers import FriendConsumer

# ws://localhost:8000/ws/friends/{username}/
# re_path('ws/friends/<username>/', FriendConsumer.as_asgi()),

websocket_urlpatters = [
	re_path(r"ws/friends/(?P<username>[\w-]+)/$", FriendConsumer.as_asgi()),
]