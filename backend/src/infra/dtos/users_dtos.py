from pydantic import BaseModel


class UserDTO(BaseModel):
    id: int
    email: str
    username: str
    password: str
    avatar: str | None


class UserReadDTO(BaseModel):
    id: int
    email: str
    username: str
    avatar: str | None
