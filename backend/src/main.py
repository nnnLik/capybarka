from fastapi import FastAPI

from config import settings

from infra.app import create_application

app: FastAPI = create_application()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=settings.app.HOST,
        port=settings.app.PORT,
        workers=settings.app.WORKERS,
        reload=settings.app.RELOAD,
        log_level='debug',
        access_log=True,
    )
