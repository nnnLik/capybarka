from abc import ABC
from dataclasses import Field
from uuid import UUID, uuid4

from pydantic import BaseModel


class BaseEvent(BaseModel, ABC):
    event_id: UUID = Field(default_factory=uuid4, kw_only=True)
