from dataclasses import dataclass, field

from pydantic import BaseModel

from infra.event_bus.kafka_factory import KafkaFactory, ClientTypeEnum


@dataclass
class KafkaProducer:
    _kafka_factory: KafkaFactory = field(default=KafkaFactory.get_kafka_client(client_type=ClientTypeEnum.PRODUCER))


    async def send_message(self, topic: str, message: BaseModel):
        if not self._producer:
            raise RuntimeError("Producer is not connected. Call 'connect_producer' first.")

        # Сериализация модели в байты
        message_bytes = message.json().encode('utf-8')
        await self._producer.send_and_wait(topic, message_bytes)