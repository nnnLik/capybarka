from dataclasses import dataclass
from datetime import datetime

from domain.events.base import IEvent


@dataclass(frozen=True, slots=True)
class NewMessageReceived(IEvent):
    content: str
    channel_id: int
    user_id: int
    created_at: datetime


@dataclass(frozen=True, slots=True)
class UserConnectedToChannel(IEvent):
    channel_id: int
    user_id: int


@dataclass(frozen=True, slots=True)
class UserDisconnectedFromChannel(IEvent):
    channel_id: int
    user_id: int
