from abc import ABC
from dataclasses import field, dataclass
from uuid import UUID, uuid4


@dataclass
class IEvent(ABC):
    event_id: UUID = field(default_factory=uuid4, kw_only=True)
