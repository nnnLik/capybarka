from abc import ABC, abstractmethod
from dataclasses import dataclass

from infra.dtos import UserDTO


@dataclass
class IUserDAO(ABC):
    @abstractmethod
    async def get_user_by_email(self, email: str) -> UserDTO | None:
        ...
