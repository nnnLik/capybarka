#!/usr/bin/env python
import os
import sys
from pathlib import Path

from esmerald import Esmerald, Include


def build_path():
    SITE_ROOT = os.path.dirname(os.path.realpath(__file__))

    if SITE_ROOT not in sys.path:
        sys.path.append(SITE_ROOT)
        sys.path.append(os.path.join(SITE_ROOT, "apps"))


def get_application():
    build_path()

    app = Esmerald(
        routes=[Include(namespace="urls")],
    )
    return app


app = get_application()