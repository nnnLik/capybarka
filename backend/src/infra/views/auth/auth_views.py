from dataclasses import dataclass
from typing import Annotated

from fastapi import Depends, HTTPException, status, APIRouter
from fastapi.security import OAuth2PasswordRequestForm

from domain.services import LoginService
from infra.container import Service

auth_router = APIRouter()

@dataclass(frozen=True)
class Token:
    access_token: str
    token_type: str


@auth_router.post("/token", response_model=Token, status_code=200)
async def login(
    auth_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    login_service: Annotated[LoginService, Service(LoginService)],
) -> Token:
    try:
        token = await login_service.execute(
            email=auth_data.username,
            password=auth_data.password,
        )
    except (login_service.UserDoesNotRegistered, login_service.InvalidUserPassword):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return Token(access_token=token, token_type="bearer")
