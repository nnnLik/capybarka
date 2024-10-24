from fastapi import FastAPI

from mayim.extension import StarletteMayimExtension

from config import settings

from infra.repo import UserRepo
from infra.views import router


def setup_application(app: FastAPI) -> None:
    mayim_ext = StarletteMayimExtension(
        executors=[UserRepo,],
        dsn=settings.postgres.DATABASE_DSN,
    )
    mayim_ext.init_app(app)
    app.include_router(router)


def create_application() -> FastAPI:
    app = FastAPI()

    setup_application(app)
    return app
