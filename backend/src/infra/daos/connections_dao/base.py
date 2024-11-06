from abc import ABC, abstractmethod
from dataclasses import dataclass


@dataclass
class IConnectionsDAO(ABC):
    @abstractmethod
    async def broadcast(
        self,
        channel_id: int,
        message: str,
    ) -> None:
        ...
