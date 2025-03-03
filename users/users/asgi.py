"""
ASGI config for users project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/asgi/
"""

import os
import logging
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from channels.security.websocket import AllowedHostsOriginValidator
import django


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'users.settings')
django.setup()

# si importo antes de configurar django me da error. 
import api.routing

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
logger.info("Starting ASGI application")

application = ProtocolTypeRouter({
	'http': get_asgi_application(),
	"websocket": AllowedHostsOriginValidator(
		AuthMiddlewareStack(
        	URLRouter(api.routing.websocket_urlpatters
			)  # Rutas WebSocket
    	)
	),
})
