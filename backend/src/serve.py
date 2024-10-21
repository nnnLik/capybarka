#!/usr/bin/env python
import os

import uvicorn

from esmerald.conf import settings

from main import app

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        port=settings.port,
        host=settings.host,
        reload=True,
        lifespan="on",
        log_level="debug",
    )