from typing import Annotated

import punq
from fastapi import APIRouter, Depends
from fastapi.websockets import WebSocket

from infra.container import get_container

ws_event_handler_router = APIRouter()


@ws_event_handler_router.websocket('/event_handler/{user_id}')
async def ws_entrypoint(
    ws: WebSocket,
    user_id: int,
    container: Annotated[punq.Container, Depends(get_container)],
) -> None:
    # container.resolve()
    ...
