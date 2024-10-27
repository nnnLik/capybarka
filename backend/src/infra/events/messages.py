from infra.events.base import BaseEvent


class NewMessageReceivedEvent(BaseEvent):
    message_text: str
    message_oid: str
    chat_id: int
