from fastapi import APIRouter
from fastapi.websockets import WebSocket

from infra.repositories.connections import ConnectionRepository

ws_event_handler_router = APIRouter()


@ws_event_handler_router.websocket('/event_handler/{user_id}')
async def ws_entrypoint(ws: WebSocket, user_id: int) -> None:
    await connection_repository.connect(
        ws=WebSocket,
        user_id=user_id,
    )
