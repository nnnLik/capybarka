from dataclasses import dataclass

from sqlalchemy import select
from sqlalchemy.exc import NoResultFound

from infra.daos.user import IUserDAO, UserDoesNotExist
from infra.database import DatabaseConnectionManager
from infra.database.models import User
from infra.dtos import UserDTO


@dataclass
class UserDAO(IUserDAO):
    _db_manager: DatabaseConnectionManager

    async def get_user_by_email(self, email: str) -> UserDTO:
        try:
            async with self._db_manager.get_session() as session:
                query = await session.execute(select(User).filter(User.email == email))
                user: UserDTO = query.scalar_one()
        except NoResultFound:
            raise UserDoesNotExist
        return user
