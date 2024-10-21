from esmerald import Include, Gateway
from esmerald.routing.handlers import get
from esmerald.requests import Request
from esmerald.responses import Response

@get()
async def home(request: Request) -> Response:
    return Response("Hello, world!")


route_patterns = [
    Gateway('/', handler=home, name='home')
]