import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from .models import User
import logging

logger = logging.getLogger(__name__)

class FriendConsumer(AsyncWebsocketConsumer):
	async def connect(self):
		self.username = self.scope['url_route']['kwargs']['username']
		logger.info(f'USERNAME IS {self.username}\n\n\n\n\n')
		self.group_name = f'friends_{self.username}'

		await self.accept()

		await self.update_online_status(True)
	
	async def disconnect(self, close_code):
		await self.update_online_status(False)

	@database_sync_to_async
	def update_online_status(self, status):
		user = User.objects.get(username=self.username)
		user.online_status = status
		user.save()

	