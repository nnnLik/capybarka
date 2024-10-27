from fastapi import APIRouter

from infra.views.auth_views import auth_router

router = APIRouter(prefix='/api')

router.include_router(auth_router, prefix='/auth')
