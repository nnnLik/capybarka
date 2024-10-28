from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware
from mayim.extension import StarletteMayimExtension


from config import settings

from infra.repositories import UserRepo
from infra.views import router


def setup_application(app: FastAPI) -> None:
    mayim_ext = StarletteMayimExtension(
        executors=[UserRepo,],
        dsn=settings.postgres.DATABASE_DSN,
    )
    mayim_ext.init_app(app)

    app.include_router(router)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.app.ALLOW_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


def create_application() -> FastAPI:
    app = FastAPI()

    setup_application(app)
    return app
