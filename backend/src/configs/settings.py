from pydantic import Field

from esmerald.conf.enums import EnvironmentType
from esmerald.conf.global_settings import EsmeraldAPISettings


class AppSettings(EsmeraldAPISettings):
    app_name: str = "Capybarka"
    title: str = "Capybarka"
    environment: str = Field(default=EnvironmentType.PRODUCTION)
    timezone: str = Field(default='Europe/Minsk')

    debug: bool
    secret_key: str

    allowed_hosts: list[str]
    allow_origins: list[str]
    enable_sync_handlers: bool
    enable_openapi: bool
    docs_url: str = Field(default="/docs/swagger")

    port: int = Field(default=8001)
    host: str = Field(default='0.0.0.0')

