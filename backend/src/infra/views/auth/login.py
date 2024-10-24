import hmac
from datetime import timedelta, datetime

import hashlib

from jose import jwt

from pydantic import BaseModel

from fastapi import APIRouter, HTTPException
from starlette import status

from infra.repo import UserRepo

login_router = APIRouter()


class AuthResponse(BaseModel):
    access: str


class AuthRequest(BaseModel):
    email: str
    password: str


SECRET_KEY = "your_secret_key"
SALT = b"your_salt"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 1 * 60 * 24


def hash_password(password: str) -> str:
    return hashlib.pbkdf2_hmac(
        'sha256',
        password.encode('utf-8'),
        SALT,
        100000
    ).hex()


def verify_password(plain_password: str, hashed_password: str) -> bool:
    print(hash_password(plain_password))
    return hmac.compare_digest(
        hash_password(plain_password), hashed_password
    )


def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    to_encode = data.copy()
    expire = datetime.now() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


@login_router.post('/login', response_model=AuthResponse, status_code=201)
async def login(auth_data: AuthRequest) -> AuthResponse | None:
    user_repo = UserRepo()
    user = await user_repo.get_user_by_user_email(auth_data.email)

    if not user or not verify_password(auth_data.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(data={"sub": user.email})
    return AuthResponse(access=access_token)
