from infra.dtos import UserDTO
from infra.repositories import UserRepo


class UserDAO:
    class UserDoesNotExist(Exception):
        pass

    def __init__(
        self,
        user_repo: UserRepo,
    ) -> None:
        self._user_repo = user_repo

    async def get_user_by_email(self, email: str) -> UserDTO:
        user_dto = await self._user_repo.get_user_by_user_email(email)

        if not user_dto:
            raise self.UserDoesNotExist

        return user_dto
