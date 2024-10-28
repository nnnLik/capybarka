from dataclasses import dataclass, field
from typing import MutableMapping

from fastapi.websockets import WebSocket

from infra.repositories.connections import BaseUserConnectionRepository, BaseChannelRepository


@dataclass
class InMemoryUserConnectionRepository(BaseUserConnectionRepository):
    _connections: MutableMapping[int, WebSocket | None] = field(default_factory=dict)

    async def connect(
        self,
        ws: WebSocket,
        user_id: int,
    ) -> None:
        await ws.accept()
        self._connections[user_id] = ws

    async def disconnect(
        self,
        user_id: int,
    ) -> None:
        ws = self._connections.get(user_id)
        if ws:
            await ws.close()
            del self._connections[user_id]

    async def get_user_connection(
        self,
        user_id: int,
    ) -> WebSocket | None:
        return self._connections.get(user_id)


@dataclass
class InMemoryServerUserRepository(BaseChannelRepository):
    _channels: MutableMapping[int, set[int]] = field(default_factory=dict)

    async def add_user(self, channel_id: int, user_id: int) -> None:
        if channel_id not in self._channels:
            self._channels[channel_id] = set()

        if user_id not in self._channels[channel_id]:
            self._channels[channel_id].add(user_id)

    async def remove_user(self, channel_id: int, user_id: int) -> None:
        if channel_id in self._channels and user_id in self._channels[channel_id]:
            self._channels[channel_id].remove(user_id)
            if not self._channels[channel_id]:
                del self._channels[channel_id]

    async def get_users_ids(self, channel_id: int) -> set[int]:
        return self._channels.get(channel_id, set())
