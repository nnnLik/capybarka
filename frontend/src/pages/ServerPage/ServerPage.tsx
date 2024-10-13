import { useParams } from "@solidjs/router";
import { invoke } from "@tauri-apps/api/core";
import { Component, createSignal, For, onMount, Show } from "solid-js";
import { Grid, Col } from "../../components/ui/grid";
import { Card } from "../../components/ui/card";
import { AiOutlineSend } from "solid-icons/ai";
import { Button } from "../../components/ui/button";
import Message from "../../components/Message";
import DefaultImage from "../../components/DefaultImage";

const ServerPage: Component = () => {
  const params = useParams();
  const [serverId, _setServerId] = createSignal<number>(
    Number(params.serverId)
  );
  const [serverDetailDTO, setServerDetailDTO] =
    createSignal<UserServerDetailDTO | null>(null);
  const [loading, setLoading] = createSignal<boolean>(true); // TODO: change
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

  const mock_members = [
    {
      id: 1,
      username: "test user 1",
      email: "test@gmail.com",
      avatar_uri: "https://github.com/sek-consulting.png",
      created_at: "2024-12-12 12:12:12",
    },
    {
      id: 2,
      username: "test user 2",
      email: "test@gmail.com",
      avatar_uri: "https://github.com/sek-consulting.png",
      created_at: "2024-12-12 12:12:12",
    },
    {
      id: 3,
      username: "test user 3",
      email: "test@gmail.com",
      avatar_uri: "https://github.com/sek-consulting.png",
      created_at: "2024-12-12 12:12:12",
    },
  ];
  const mock_msgs = [
    {
      id: 1,
      user_id: 1,
      server_id: 1,
      content: "Ну привет, кис.",
      created_at: "2024-12-12 12:12:12",
    },
    {
      id: 2,
      user_id: 2,
      server_id: 1,
      content: "Боже, это снова ты...",
      created_at: "2024-12-12 12:12:12",
    },
  ];

  return (
    <div class="container mx-auto p-4 h-screen">
      <Grid cols={3} class="gap-4 h-80">
        <Col span={2}>
          <Card class="flex flex-col border border-gray-300 rounded-lg p-4 h-full">
            <div class="flex-1 overflow-y-auto">
              <div class="flex flex-col">
                <Show when={!loading()} fallback={<p>Loading...</p>}>
                  {/* TODO: add real shit */}
                  <For each={mock_msgs}>
                    {(message_dto) => {
                      const member = mock_members.find(
                        (member) => member.id === message_dto.user_id
                      );

                      if (member) {
                        return (
                          <Message
                            avatar={member.avatar_uri}
                            username={member.username}
                            content={message_dto.content}
                            created_at={message_dto.created_at}
                            // TODO: ???
                            // isUserMessage={true} 
                          />
                        );
                      }
                    }}
                  </For>
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
              <Button class="ml-2" type="button" onClick={handleSendMessage}>
                <AiOutlineSend />
              </Button>
            </div>
          </Card>
        </Col>

        <Col span={1}>
          <Card class="border border-gray-300 rounded-lg p-4 h-full">
            <h3 class="text-gray-500 text-sm mb-2 text-center">Members</h3>
            <Show when={!loading()} fallback={<p>Loading...</p>}>
              {/* TODO: EBATI mocki */}
              <For each={mock_members}>
                {(member) => (
                  <Card
                    class="flex items-center mb-2 h-12 shadow-lg transition duration-300 hover:bg-gray-100 hover:scale-95"
                    key={member.id}
                  >
                    <DefaultImage
                      uri={member.avatar_uri}
                      fallback_text={member.username.slice(0, 2).toUpperCase()}
                      class="ml-2 mr-2 size-7"
                    />
                    <span>{member.username}</span>
                    {/* TODO: online status */}
                  </Card>
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
