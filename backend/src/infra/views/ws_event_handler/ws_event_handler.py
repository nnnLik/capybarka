from typing import Annotated

from fastapi import APIRouter
from fastapi.websockets import WebSocket

from domain.services.connections_manager import ConnectionsManager, IConnectionsManager
from infra.container import Service

ws_event_handler_router = APIRouter()


@ws_event_handler_router.websocket('/event_handler/{user_id}')
async def ws_entrypoint(
    ws: WebSocket,
    user_id: int,
    connections_manager: Annotated[IConnectionsManager, Service(ConnectionsManager)],
) -> None:
    await connections_manager.setup_connection_with_user(
        user_id=user_id,
        ws=ws,
    )

