from datetime import timedelta, datetime

import jwt
from passlib.context import CryptContext

from fastapi.security import OAuth2PasswordBearer

from config import settings
from infra.daos import UserDAO
from infra.repo import UserRepo


class LoginService:
    class UserDoesNotRegistered(Exception):
        pass

    class InvalidUserPassword(Exception):
        pass

    _pwd_context = CryptContext(schemes=["bcrypt", "sha256_crypt"], deprecated="auto")
    _oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

    def __init__(self, user_dao: UserDAO) -> None:
        self._user_dao = user_dao

    def _verify_password(
        self,
        plain_password: str,
        hashed_password: str,
    ) -> bool:
        return self._pwd_context.verify(plain_password, hashed_password)

    def _create_access_token(self, email: str) -> str:
        expire = datetime.now() + timedelta(minutes=settings.app.ACCESS_TOKEN_EXPIRE_MINUTES)

        to_encode = {
            "sub": email,
            "exp": expire
        }

        return jwt.encode(
            to_encode,
            settings.app.SECRET_KEY,
            algorithm=settings.app.AUTH_ALGORITHM,
        )

    async def execute(self, email: str, password: str) -> str:
        try:
            user = await self._user_dao.get_user_by_email(email)
        except self._user_dao.UserDoesNotExist:
            raise self.UserDoesNotRegistered

        if not self._verify_password(password, user.password):
            raise self.InvalidUserPassword

        access_token = self._create_access_token(email=email)
        return access_token


def get_login_service() -> LoginService:
    return LoginService(
        user_dao=UserDAO(
            user_repo=UserRepo(),
        ),
    )
