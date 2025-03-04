import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from .models import User, Friends
import logging

logger = logging.getLogger(__name__)

class FriendConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.username = self.scope['url_route']['kwargs']['username']
        self.group_name = f'friends_{self.username}'

        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()
        await self.update_online_status(True)
        await self.notify_friends("online")

    async def disconnect(self, close_code):
        await self.update_online_status(False)
        await self.notify_friends("offline")
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        message_type = data.get("type", "")
        
        if message_type == "direct_message":
            await self.send_direct_message(data)
    
    async def send_direct_message(self, data):
        recipient_id = data["recipient_id"]
        message = data["message"]

        await self.channel_layer.group_send(
            f'friends_{recipient_id}',
            {
                "type": "receive_message",
                "message": message,
                "from": self.username,
            }
        )
    
    async def receive_message(self, event):
        await self.send(text_data=json.dumps({
            "type": "message",
            "from": event["from"],
            "message": event["message"],
        }))

    @database_sync_to_async
    def update_online_status(self, status):
        user = User.objects.get(username=self.username)
        user.online_status = status
        user.save()

    @database_sync_to_async
    def get_friends(self):
        user = User.objects.get(username=self.username)
        friendships = Friends.objects.filter(user1=user) | Friends.objects.filter(user2=user)
        return [friendship.user1.username if friendship.user2 == user else friendship.user2.username for friendship in friendships]
    
    async def notify_friends(self, status):
        friends = await self.get_friends()
        for friend in friends:
            await self.channel_layer.group_send(
                f'friends_{friend}',
                {
                    "type": "friend_status",
                    "message": f'{self.username} is {status}',
                }
            )
    
    async def friend_status(self, event):
        await self.send(text_data=json.dumps({
            "type": "status",
            "message": event["message"],
        }))