import { Component } from "solid-js";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface DefaultImageProps {
  fallback_text: string;
  uri?: string | undefined;
  class?: string | undefined;
}

const DefaultImage: Component<DefaultImageProps> = ({ uri, fallback_text, class: className }) => {
  return (
    <Avatar class={className}>
      <AvatarImage src={uri} />
      <AvatarFallback class="bg-blue-100">
        {fallback_text.slice(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};

export default DefaultImage;
