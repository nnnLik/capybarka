from domain.services import LoginService

from infra.daos import UserDAO
from infra.repositories import UserRepo


def build_login_service() -> LoginService:
    return LoginService(
        _user_dao=UserDAO(
            _user_repo=UserRepo(),
        ),
    )
