from aiokafka import AIOKafkaProducer, AIOKafkaConsumer
from dataclasses import dataclass, field


@dataclass
class KafkaFactory:
    bootstrap_servers: str
    topic: str
    group_id: str | None = None

    security_protocol: str = "PLAINTEXT"
    sasl_mechanism: str | None = None
    sasl_plain_username: str | None = None
    sasl_plain_password: str | None = None

    _producer: AIOKafkaProducer | None = field(default=None, init=False, repr=False)
    _consumer: AIOKafkaConsumer | None = field(default=None, init=False, repr=False)

    def _get_conn_creds(self) -> dict[str, str]:
        return {
            'security_protocol': self.security_protocol,
            'sasl_mechanism': self.sasl_mechanism,
            'sasl_plain_username': self.sasl_plain_username,
            'sasl_plain_password': self.sasl_plain_password,
        }

    async def get_producer(self) -> AIOKafkaProducer:
        if not self._producer:
            self._producer = AIOKafkaProducer(
                bootstrap_servers=self.bootstrap_servers,
                **self._get_conn_creds(),
            )
            await self._producer.start()
        return self._producer

    async def get_consumer(self) -> AIOKafkaConsumer:
        if not self.group_id:
            raise ValueError("group_id is required to create a consumer.")

        if not self._consumer:
            self._consumer = AIOKafkaConsumer(
                self.topic,
                bootstrap_servers=self.bootstrap_servers,
                group_id=self.group_id,
                **self._get_conn_creds(),
            )
            await self._consumer.start()

        return self._consumer

    async def _close_producer(self) -> None:
        await self._producer.stop()
        self._producer = None

    async def _close_consumer(self) -> None:
        await self._consumer.stop()
        self._consumer = None

    async def close(self):
        if self._producer:
            await self._close_producer()
        if self._consumer:
            await self._close_consumer()
