import punq

from infra.message_brokers import BaseMessageBroker
from infra.message_brokers.kafka import KafkaMessageBroker


def get_container() -> punq.Container:
    container = punq.Container()

    container.register(BaseMessageBroker, KafkaMessageBroker)
    container.register(ConnectionRepository)

    return container
