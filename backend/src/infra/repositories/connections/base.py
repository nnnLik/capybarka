from abc import ABC, abstractmethod
from dataclasses import dataclass
from uuid import UUID

from fastapi.websockets import WebSocket


@dataclass
class BaseUserConnectionRepository(ABC):
    @abstractmethod
    async def connect(
        self,
        ws: WebSocket,
        user_id: int,
    ) -> None:
        ...

    @abstractmethod
    async def disconnect(self, user_id: int,) -> None:
        ...

    @abstractmethod
    async def get_user_connection(
        self,
        user_id: int,
    ) -> WebSocket | None:
        ...


@dataclass
class BaseChannelRepository(ABC):
    @abstractmethod
    async def add_user(self, channel_id: int, user_id: int,) -> None:
        ...

    @abstractmethod
    async def remove_user(self, channel_id: int, user_id: int,) -> None:
        ...

    @abstractmethod
    async def get_users_ids(self, channel_id: int,) -> list[int]:
        ...
