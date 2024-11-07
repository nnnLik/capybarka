from dataclasses import dataclass

from fastapi.websockets import WebSocket

from infra.daos.connections import IUsersConnectionsDAO, IChannelDAO
from domain.services.connections_manager import IConnectionsManager


@dataclass
class ConnectionsManager(IConnectionsManager):
    _users_connections_dao: IUsersConnectionsDAO
    _channel_dao: IChannelDAO

    async def setup_connection_with_user(
        self,
        ws: WebSocket,
        user_id: int,
    ) -> None:
        await self._users_connections_dao.connect(
            ws=ws,
            user_id=user_id
        )

    async def remove_user_connection(
        self,
        user_id: int,
    ) -> None:
        await self._users_connections_dao.disconnect(user_id)

    async def add_user_to_channel(
        self,
        channel_id: int,
        user_id: int,
    ) -> None:
        await self._channel_dao.add_user(
            channel_id=channel_id,
            user_id=user_id,
        )

    async def remove_user_from_channel(
        self,
        channel_id: int,
        user_id: int,
    ) -> None:
        await self._channel_dao.remove_user(
            channel_id=channel_id,
            user_id=user_id,
        )

    async def broadcast(
        self,
        channel_id: int,
        message: str,
    ) -> None:
        users_ids = await self._channel_dao.get_users_ids(channel_id)

        for user_id in users_ids:
            if ws := await self._users_connections_dao.get_user_connection(user_id):
                await ws.send_text(message)
