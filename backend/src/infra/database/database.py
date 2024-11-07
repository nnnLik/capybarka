from contextlib import asynccontextmanager
from dataclasses import dataclass, field

from sqlalchemy.ext.asyncio import async_sessionmaker, AsyncEngine, AsyncSession


@dataclass
class DatabaseConnectionManager:
    engine: AsyncEngine = field(kw_only=True)

    _session_factory: async_sessionmaker = field(init=False)

    def __post_init__(self) -> None:
        self._session_factory = async_sessionmaker(
            bind=self.engine,
            autoflush=False,
            autocommit=False,
            expire_on_commit=False,
            class_=AsyncSession,
        )

    @asynccontextmanager
    async def get_session(self) -> AsyncSession:
        async with self._session_factory() as session:
            yield session
