from dataclasses import dataclass


@dataclass(frozen=True)
class UserDAOException(Exception):
    ...


@dataclass(frozen=True)
class UserDoesNotExist(UserDAOException):
    pass
