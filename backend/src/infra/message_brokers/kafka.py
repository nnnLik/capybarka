from dataclasses import dataclass
from typing import AsyncIterator

import orjson
from aiokafka import AIOKafkaProducer, AIOKafkaConsumer, ConsumerRecord

from infra.message_brokers import BaseMessageBroker


@dataclass
class KafkaMessageBroker(BaseMessageBroker):
    _producer: AIOKafkaProducer
    _consumer: AIOKafkaConsumer

    async def send_message(self, key: bytes, topic: str, value: bytes) -> None:
        await self._producer.send(
            topic=topic,
            key=key,
            value=value,
        )

    async def start_consuming(self, topic: str) -> AsyncIterator[dict]:
        self._consumer.subscribe(topics=[topic])

        message: ConsumerRecord
        async for message in self._consumer:
            yield orjson.loads(message.value)

    async def stop_consuming(self) -> None:
        self._consumer.unsubscribe()

    async def close(self) -> None:
        await self._consumer.stop()
        await self._producer.stop()

    async def start(self) -> None:
        await self._consumer.start()
        await self._consumer.start()
