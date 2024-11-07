from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, declared_attr, MappedAsDataclass


class IModel(MappedAsDataclass, DeclarativeBase):
    __abstract__ = True

    @classmethod
    @declared_attr.directive
    def __tablename__(cls) -> str:
        return f"capy__{cls.__name__.lower()}"

    id: Mapped[int] = mapped_column(primary_key=True)
