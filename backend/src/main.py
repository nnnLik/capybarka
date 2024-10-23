from sanic import Sanic
from sanic_ext import Extend

from mayim.extension import SanicMayimExtension

from config import settings

app = Sanic.get_app('Capybarka')
Extend.register(
    SanicMayimExtension(
        executors=[],
        dsn=settings.postgres.DATABASE_DSN,
    )
)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=settings.app.HOST,
        port=settings.app.PORT,
        workers=settings.app.WORKERS,
        reload=settings.app.RELOAD,
    )