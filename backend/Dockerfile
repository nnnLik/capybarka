ARG PYTHON_IMAGE=python:3.12.7-slim

FROM $PYTHON_IMAGE AS base

ENV PYTHONOPTIMIZE=2 \
    PYTHONUNBUFFERED=1 \
    PIPENV_VENV_IN_PROJECT=1 \
    PYSETUP_PATH="/opt/p" \
    VENV_PATH="/opt/p/.venv" \
    APP_PATH="/opt/app/src" \
    PYTHONPATH="/opt/app/src" \
    POETRY_VIRTUALENVS_IN_PROJECT=true

RUN apt-get update && \
    pip install poetry==1.8.4 && \
    rm -rf /var/lib/apt/lists/*

WORKDIR $PYSETUP_PATH

FROM base AS builder

COPY pyproject.toml poetry.lock $PYSETUP_PATH/
RUN poetry install --only main --sync
ENV PATH="$VENV_PATH/bin:$PATH"

FROM builder AS dev

RUN apt-get update && apt-get install -y --no-install-recommends \
    curl vim htop && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

RUN poetry install --with dev --sync

COPY --from=builder $VENV_PATH $VENV_PATH
COPY ./src/ ${APP_PATH}

WORKDIR ${APP_PATH}

FROM base AS prod

COPY --from=builder $VENV_PATH $VENV_PATH
COPY ./src/ ${APP_PATH}

ENV PATH="$VENV_PATH/bin:$PATH"

WORKDIR ${APP_PATH}
