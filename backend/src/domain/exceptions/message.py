from dataclasses import dataclass

from domain.exceptions.base import ApplicationException


@dataclass(eq=False)
class TextTooLongException(ApplicationException):
    text: str

    @property
    def message(self):
        return f'Text is too long: "{self.text[:255]}..."'


@dataclass(eq=False)
class EmptyTextException(ApplicationException):
    @property
    def message(self):
        return 'Text cannot be empty'
