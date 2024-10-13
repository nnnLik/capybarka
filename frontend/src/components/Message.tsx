import { Component } from "solid-js";
import { Grid, Col } from "./ui/grid";
import { Card } from "./ui/card";
import DefaultImage from "./DefaultImage";

interface MessageProps {
  avatar?: string;
  username: string;
  content: string;
  created_at: string;
  isUserMessage?: boolean;
}

const Message: Component<MessageProps> = ({
  avatar,
  username,
  content,
  created_at,
  isUserMessage = false,
}) => {
  return (
    <Card class={`p-1 my-1 h-auto ${isUserMessage ? "bg-blue-100" : "bg-white"} shadow-sm`}>
      <Grid cols={5}>
        <Col span={1} class="flex justify-center items-start pr-4 pt-1">
          <DefaultImage
            uri={avatar}
            fallback_text={username.slice(0, 2).toUpperCase()}
          />
        </Col>

        <Col span={4} class="flex flex-col">
          <div class="flex justify-between items-center">
            <span class="font-bold">{username}</span>

            <span class="text-gray-500 text-sm">
              {new Date(created_at).toLocaleString()}
            </span>
          </div>

          <div class="mt-1 text-sm">{content}</div>
        </Col>
      </Grid>
    </Card>
  );
};

export default Message;
