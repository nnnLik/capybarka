from fastapi import APIRouter

from infra.views.auth import auth_router

router = APIRouter(prefix='/api')

router.include_router(auth_router, prefix='/auth')
