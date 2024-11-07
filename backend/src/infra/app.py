from contextlib import asynccontextmanager

from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from config import settings
from infra.container import get_container

from infra.views import router


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield


def setup_application(app: FastAPI) -> None:
    app.include_router(router)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.app.ALLOW_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.state.ioc_container = get_container()


def create_application() -> FastAPI:
    app = FastAPI(
        lifespan=lifespan,
    )

    setup_application(app)
    return app
