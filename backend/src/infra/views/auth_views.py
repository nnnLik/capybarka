from typing import Annotated

from pydantic import BaseModel

from fastapi import Depends, HTTPException, status, APIRouter
from fastapi.security import OAuth2PasswordRequestForm

from domain.services import get_login_service, LoginService

auth_router = APIRouter()


class Token(BaseModel):
    access_token: str
    token_type: str


@auth_router.post("/token", response_model=Token, status_code=200)
async def login(
    auth_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    service: Annotated[LoginService, Depends(get_login_service)],
) -> Token:
    try:
        token = await service.execute(auth_data.username, auth_data.password)
    except (service.UserDoesNotRegistered, service.InvalidUserPassword):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return Token(access_token=token, token_type="bearer")
