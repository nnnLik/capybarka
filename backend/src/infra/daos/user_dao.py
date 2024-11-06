from dataclasses import dataclass, field
from typing import Annotated

from infra.dtos import UserDTO
from infra.repositories import UserRepo


@dataclass
class UserDAO:
    class UserDoesNotExist(Exception):
        pass

    _user_repo: Annotated[UserRepo, field()]

    async def get_user_by_email(self, email: str) -> UserDTO:
        user_dto = await self._user_repo.get_user_by_user_email(email)

        if not user_dto:
            raise self.UserDoesNotExist

        return user_dto
