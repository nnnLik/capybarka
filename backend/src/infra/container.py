import functools
from functools import lru_cache
from typing import TypeVar, Type, Callable

import punq
from punq import Scope
from fastapi import Depends, Request
from sqlalchemy.ext.asyncio import create_async_engine

from config import settings
from config.settings import CapybarkaSettings
from domain.services import LoginService
from infra.daos.user import UserDAO
from infra.database.database import DatabaseConnectionManager
# from infra.message_brokers import IMessageBroker
# from infra.message_brokers.kafka import KafkaMessageBroker

T = TypeVar('T')


def Service(t: Type[T]) -> Callable[[], T]:
    def resolver(t: Type[T], request: Request) -> T:
        return request.app.state.ioc_container.resolve(t)

    return Depends(functools.partial(resolver, t))


@lru_cache(1)
def get_container() -> punq.Container:
    return _initialize_container()


def _initialize_container() -> punq.Container:
    container = punq.Container()

    container.register(CapybarkaSettings, instance=settings)

    def build_database_connection_manager() -> DatabaseConnectionManager:
        _settings: CapybarkaSettings = container.resolve(CapybarkaSettings)
        return DatabaseConnectionManager(
            engine=create_async_engine(
                _settings.postgres.DATABASE_DSN,
                echo=_settings.postgres.ECHO,
            )
        )

    def build_user_dao() -> UserDAO:
        db_connection: DatabaseConnectionManager = container.resolve(DatabaseConnectionManager)
        return UserDAO(_db_manager=db_connection)

    def build_login_service() -> LoginService:
        return LoginService(
            _user_dao=UserDAO(
                _db_manager=build_database_connection_manager()
            ),
        )


    # container.register(IMessageBroker, KafkaMessageBroker)

    container.register(DatabaseConnectionManager, build_database_connection_manager, scope=Scope.singleton)
    container.register(UserDAO, build_user_dao)
    container.register(LoginService, factory=build_login_service)

    return container
