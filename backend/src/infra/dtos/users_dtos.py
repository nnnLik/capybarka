from dataclasses import dataclass
from datetime import datetime


@dataclass(frozen=True)
class UserDTO:
    id: int
    email: str
    username: str
    password: str
    avatar: str | None
    created_at: datetime


@dataclass(frozen=True)
class UserReadDTO:
    id: int
    email: str
    username: str
    avatar: str | None
    created_at: datetime
