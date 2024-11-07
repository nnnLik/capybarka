from dataclasses import dataclass, field

from domain.values.base import BaseValueObject
from domain.exceptions.message import EmptyTextException, TextTooLongException


@dataclass(frozen=True)
class Text(BaseValueObject):
    max_lenght: int = field(default=255, kw_only=True)

    def validate(self):
        if not self.value:
            raise EmptyTextException()

        if len(self.value) > self.max_lenght:
            raise TextTooLongException(self.value)

    def as_generic_type(self):
        return str(self.value)
