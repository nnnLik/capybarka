from dataclasses import dataclass

from fastapi.websockets import WebSocket

from infra.daos.connections_dao import IConnectionsDAO
from infra.repositories.connections import InMemoryUserConnectionRepository, InMemoryChannelUserRepository


@dataclass
class ConnectionsDAO(IConnectionsDAO):
    _user_connection_repo: InMemoryUserConnectionRepository
    _channel_repo: InMemoryChannelUserRepository

    async def broadcast(self, channel_id: int, message: str) -> None:
        user_ids = await self._channel_repo.get_users_ids(channel_id)

        for user_id in user_ids:
            ws = await self._user_connection_repo.get_user_connection(user_id)

            if ws:
                await ws.send_text(message)  # TODO: bytes?

    async def setup_user_connection(
        self,
        ws: WebSocket,
        user_id: int,
    ) -> None:
        await self._user_connection_repo.connect(
            ws=ws,
            user_id=user_id,
        )
