from dataclasses import dataclass

from infra.repositories.connections import InMemoryUserConnectionRepository, InMemoryServerUserRepository


@dataclass
class ConnectionDAO:
    _connection_repo: InMemoryUserConnectionRepository
    _channel_repo: InMemoryServerUserRepository

    async def broadcast(self, channel_id: int, message: str) -> None:
        user_ids = await self._channel_repo.get_users_ids(channel_id)

        for user_id in user_ids:
            ws = await self._connection_repo.get_user_connection(user_id)

            if ws:
                await ws.send_text(message)  # TODO: bytes?
