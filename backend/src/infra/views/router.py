from fastapi import APIRouter

from infra.views.auth import auth_router
from infra.views.ws_event_handler import ws_event_handler_router

router = APIRouter(prefix='/api')

router.include_router(auth_router, prefix='/auth')
router.include_router(ws_event_handler_router, prefix='/events')
