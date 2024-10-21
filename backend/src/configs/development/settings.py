from pydantic import Field

from esmerald.conf.enums import EnvironmentType
from esmerald.conf.global_settings import EsmeraldAPISettings


class AppSettings(EsmeraldAPISettings):
    app_name: str = "Capybarka"
    title: str = "Capybarka"
    environment: str = Field(default=EnvironmentType.DEVELOPMENT)
    timezone: str = Field(default='Europe/Minsk')

    debug: bool = Field(default=True)
    secret_key: str = Field(default='as,p[d,aspomdasmdasmopkidm]')

    allowed_hosts: list[str] | None = Field(default=["*"])
    allow_origins: list[str] | None = Field(default=None)
    enable_sync_handlers: bool = Field(default=True)
    enable_openapi: bool = Field(default=True)
    docs_url: str = Field(default="/docs/swagger")

    port: int = Field(default=8001)
    host: str = Field(default='0.0.0.0')
