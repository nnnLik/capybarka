from mayim import PostgresExecutor, query
from mayim.exception import RecordNotFound

from infra.dtos import UserDTO


class UserRepo(PostgresExecutor):
    @query("SELECT * FROM account WHERE id = $1")
    async def get_user_by_user_id(self, id: int) -> UserDTO | None:
        try:
            return await self.execute(self.get_query().text, params={"id": id})
        except RecordNotFound:
            return None

    async def get_user_by_user_email(self, email: str) -> UserDTO | None:
        return await self.execute(
            "SELECT * FROM account WHERE email = $email",
            params={"email": email},
            model=UserDTO,
            allow_none=True,
        )

    @query("""
        INSERT INTO account (email, username, password) 
        VALUES ($email, $username, $password)
        RETURNING (id, email, username, avatar)
    """)
    async def create_user(self, id: int) -> UserDTO:
        ...
