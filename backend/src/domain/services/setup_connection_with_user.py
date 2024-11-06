from dataclasses import dataclass

from fastapi.websockets import WebSocket

from infra.daos.connections_dao import ConnectionsDAO


@dataclass
class SetupConnectionWithUserService:
    _connections_dao: ConnectionsDAO

    async def execute(
        self,
        ws: WebSocket,
        user_id: int,
    ) -> None:
        await self._connections_dao.setup_user_connection(
            ws=ws,
            user_id=user_id
        )
