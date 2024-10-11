import { useParams } from "@solidjs/router";
import { invoke } from "@tauri-apps/api/core";
import { Component, createSignal, For, onMount, Show } from "solid-js";
import { Grid, Col } from "../../components/ui/grid";
import { Card } from "../../components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { AiOutlineSend } from "solid-icons/ai";
import { Button } from "../../components/ui/button";
import Message from "../../components/Message";

const ServerPage: Component = () => {
  const params = useParams();
  const [serverId, _setServerId] = createSignal<number>(
    Number(params.serverId)
  );
  const [serverDetailDTO, setServerDetailDTO] =
    createSignal<UserServerDetailDTO | null>(null);
  const [loading, setLoading] = createSignal<boolean>(true);
  const [message, setMessage] = createSignal<string>("");

  const fetchServerInfo = async () => {
    await invoke<UserServerDetailDTO>("get_server_info_by_id", {
      id: serverId(),
    })
      .then((response) => setServerDetailDTO(response))
      .catch((error) => console.error("Error fetching server info:", error))
      .finally(() => setLoading(false));
  };

  const handleSendMessage = () => {
    if (message()) {
      console.log("Message sent:", message());
      setMessage("");
    }
  };

  onMount(() => {
    fetchServerInfo();
  });

  return (
    <div class="container mx-auto p-4 h-screen">
      <Grid cols={3} class="gap-4 h-80">
        <Col span={2}>
          <Card class="flex flex-col border border-gray-300 rounded-lg p-4 h-full">
            <div class="flex-1 overflow-y-auto">
              <div class="flex flex-col">
                <Show when={!loading()} fallback={<p>Loading...</p>}>
                  {/* <Message id={} />
                  <Message /> */}
                  {/* <For each={serverDetailDTO()?.messages || []}>
                    {(message) => <div class="mb-2">{message}</div>}
                  </For> */}
                </Show>
              </div>
            </div>

            <div class="flex items-center mt-4">
              <input
                type="text"
                class="flex-1 border border-gray-300 rounded-lg p-2"
                placeholder="Введите сообщение..."
                value={message()}
                onInput={(e) => setMessage(e.currentTarget.value)}
              />
              {/* <Button type="button" onClick={handleSendMessage}>
              <AiOutlineSend />
              </Button> */}
              <button
                class="ml-2 bg-blue-500 text-white rounded-lg p-2"
                onClick={handleSendMessage}
              >
                <AiOutlineSend />
              </button>
            </div>
          </Card>
        </Col>

        <Col span={1}>
          <Card class="border border-gray-300 rounded-lg p-4 h-full">
            <h3 class="font-bold text-lg mb-4">Участники</h3>
            <Show when={loading()} fallback={<p>Загрузка участников...</p>}>
              <For each={serverDetailDTO()?.members}>
                {(member) => (
                  <div class="flex items-center mb-2" key={member.id}>
                    <Avatar class="mr-2">
                      <Show
                        when={member.avatar}
                        fallback={
                          <AvatarFallback>
                            {member.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        }
                      >
                        <AvatarImage src={member.avatar} />
                      </Show>
                    </Avatar>
                    <span>{member.name}</span>
                  </div>
                )}
              </For>
            </Show>
          </Card>
        </Col>
      </Grid>
    </div>
  );
};

export default ServerPage;
