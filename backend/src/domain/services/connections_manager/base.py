from abc import ABC, abstractmethod
from dataclasses import dataclass

from fastapi.websockets import WebSocket


@dataclass
class IConnectionsManager(ABC):
    @abstractmethod
    async def setup_connection_with_user(
        self,
        ws: WebSocket,
        user_id: int,
    ) -> None:
        ...

    @abstractmethod
    async def remove_user_connection(
        self,
        user_id: int,
    ) -> None:
        ...

    @abstractmethod
    async def add_user_to_channel(
        self,
        channel_id: int,
        user_id: int,
    ) -> None:
        ...

    @abstractmethod
    async def remove_user_from_channel(
        self,
        channel_id: int,
        user_id: int,
    ) -> None:
        ...

    @abstractmethod
    async def broadcast(
        self,
        channel_id: int,
        message: str,
    ) -> None:
        ...
