from functools import lru_cache
from multiprocessing import cpu_count

from pydantic import Field
from pydantic_settings import BaseSettings


class MongoDBSettings(BaseSettings):
    MONGO_DSN: str = Field(default='mongodb://aligator:aligator@mongo.aligator.docker:27017')
    MONGO_DATABASE_NAME: str = Field(default='aligator')


class PostgresSettings(BaseSettings):
    DB_HOST: str = Field(default="capybarka.postgres.docker")
    DB_PORT: int = Field(default=5432)
    DB_NAME: str = Field(default="capybarka")
    DB_USER: str = Field(default="capybarka")
    DB_PASSWORD: str = Field(default="capybarka")

    @property
    def DATABASE_DSN(self) -> str:
        return f"postgres://{self.DB_USER}:{self.DB_PASSWORD}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"


class KafkaSettings(BaseSettings):
    KAFKA_URL: str = Field(default='')
    KAFKA_SSL_CA: str = Field(default='')
    KAFKA_USER: str = Field(default='')
    KAFKA_PASSWORD: str = Field(default='')
    KAFKA_DELIVERY_TIMEOUT_MS: int = Field(default=1000 * 60 * 2)
    MESSAGE_MAX_BYTES: int = Field(default=1024 * 1024 * 20)


class ApplicationSettings(BaseSettings):
    ENVIRONMENT: str = Field(default='dev', description='dev/test/prod')
    TIME_ZONE: str = Field(default='Europe/Minsk')

    SECRET_KEY: str = Field(default='samldsjdnawjdnaskjdnaweiudniwedniawu')
    AUTH_ALGORITHM: str = Field(default="HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = Field(default=1 * 60 * 24)

    HOST: str = Field(default='0.0.0.0')
    PORT: int = Field(default=8080)

    WORKERS: int = Field(default=cpu_count() * 2 - 1 if ENVIRONMENT == "prod" else 1)
    RELOAD: bool = Field(default=True)


class CapybarkaSettings(BaseSettings):
    mongodb: MongoDBSettings = MongoDBSettings()
    postgres: PostgresSettings = PostgresSettings()
    kafka: KafkaSettings = KafkaSettings()
    app: ApplicationSettings = ApplicationSettings()


@lru_cache
def get_settings() -> CapybarkaSettings:
    return CapybarkaSettings()
