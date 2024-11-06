from functools import lru_cache

import punq
from punq import Scope

from config import settings
from config.settings import CapybarkaSettings
from infra.daos.connections_dao import ConnectionsDAO, IConnectionsDAO
from infra.message_brokers import IMessageBroker
from infra.message_brokers.kafka import KafkaMessageBroker
from infra.repositories.connections import (
    IUserConnectionRepository,
    IChannelRepository,
    InMemoryUserConnectionRepository,
    InMemoryChannelUserRepository,
)

@lru_cache(1)
def get_container() -> punq.Container:
    return _initialize_container()


def _initialize_container() -> punq.Container:
    container = punq.Container()

    container.register(CapybarkaSettings, instance=settings)

    container.register(IMessageBroker, KafkaMessageBroker)

    container.register(IUserConnectionRepository, InMemoryUserConnectionRepository, scope=Scope.singleton)
    container.register(IChannelRepository, InMemoryChannelUserRepository, scope=Scope.singleton)

    container.register(IConnectionsDAO, ConnectionsDAO)

    return container
