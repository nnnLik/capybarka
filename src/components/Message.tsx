import { Component } from "solid-js";
import DefaultImage from "./DefaultImage";

interface MessageProps {
  avatar: string | null;
  username: string;
  content: string;
  created_at: string;
}

const Message: Component<MessageProps> = ({
  avatar,
  username,
  content,
  created_at,
}) => {
  return (
    <div class="border border-gray-300 rounded-lg p-2 mb-2 shadow-sm">
      <div class="text-sm text-gray-500">
        <DefaultImage uri={avatar as string | undefined} fallback_text={username} />
        <span>{username}</span>
        <span class="mx-2">|</span>
        <span>{new Date(created_at).toLocaleString()}</span>
      </div>
      <div class="mt-1">{content}</div>
    </div>
  );
};

export default Message;
