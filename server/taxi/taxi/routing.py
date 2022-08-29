from django.urls import path # new
from channels.routing import ProtocolTypeRouter, URLRouter,get_default_application # changed
from trips.consumers import TaxiConsumer
from django.core.asgi import get_asgi_application
from channels.http import AsgiHandler
from .middleware import TokenAuthMiddlewareStack


application = ProtocolTypeRouter({
    'http': get_asgi_application(),
    'websocket': TokenAuthMiddlewareStack(
        URLRouter([
            path('taxi/', TaxiConsumer.as_asgi()),
        ])
    ),
})
