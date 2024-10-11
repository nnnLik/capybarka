import { createSignal, Show, For, Component, createEffect } from "solid-js";
import { invoke } from "@tauri-apps/api/core";
import { Link, useNavigate } from "@solidjs/router";
import { Col, Grid } from "../../components/ui/grid";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "../../components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";

const HomePage: Component = () => {
  const navigate = useNavigate();
  const [userId] = createSignal(localStorage.getItem("u_id"));
  const [userName] = createSignal(localStorage.getItem("u_name"));
  const [userAva] = createSignal(localStorage.getItem("u_avatar"));
  const [userEmail] = createSignal(localStorage.getItem("u_email"));
  const [accessToken] = createSignal(localStorage.getItem("access"));
  const [servers, setServers] = createSignal<UserServersDTO | null>(null);
  const [loading, setLoading] = createSignal(true);

  const fetchServers = async () => {
    await invoke<UserServersDTO>("get_user_servers", {
      uId: Number(userId()),
      accessToken: accessToken(),
    })
      .then((response) => setServers(response))
      .catch((error) => console.error("Error fetching servers:", error))
      .finally(() => setLoading(false));
  };

  const is_user_data_valid = async () => {
    if (userId() && userName() && userAva() && userEmail() && accessToken()) {
      console.log("Invalid user data. Move to auth page");
      localStorage.clear();
      navigate("/");
    }
  };

  createEffect(() => {
    fetchServers();
    is_user_data_valid();
  });

  return (
    <main class="container mx-auto p-4 h-screen">
      <Grid cols={3} class="gap-4">
        <Col class="col-span-1">
          <Card class="p-4 w-full h-80 flex flex-col items-center justify-between shadow-xl">
            <div class="flex flex-col items-center">
              <Avatar class="size-32 shadow-lg transition duration-300 hover:bg-blue-300 hover:scale-90">
                <Show
                  when={userAva()}
                  fallback={
                    <AvatarFallback class="bg-blue-100 transition duration-300 hover:bg-blue-300 hover:scale-90">
                      {userName()?.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  }
                >
                  <AvatarImage src={userAva()} />
                </Show>
              </Avatar>
              <h2 class="font-bold mt-4">{userName()}</h2>
              <p class="text-slate-700 dark:text-slate-500">{userEmail()}</p>
            </div>
          </Card>
        </Col>

        <Col class="col-span-2">
          <Card class="p-4 h-80 shadow-xl">
            <div class="overflow-y-auto">
              <Show when={!loading()} fallback={<p>Загрузка серверов...</p>}>
                <For each={servers()?.result}>
                  {(server) => (
                    <Card class="my-2 p-2.5 shadow-lg transition duration-300 hover:bg-gray-100 hover:scale-95">
                      <Link
                        href={`/server/${server.id.toString()}`}
                        class="flex items-center justify-between"
                      >
                        <div class="flex items-center">
                          <Avatar class="shadow-lg w-8 h-8 mr-2">
                            <Show
                              when={server.image}
                              fallback={
                                <AvatarFallback class="bg-blue-100">
                                  {server.name.slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                              }
                            >
                              <AvatarImage src={server.image} />
                            </Show>
                          </Avatar>
                          <b class="text-lg">{server.name}</b>
                        </div>

                        <CardDescription class="text-right text-slate-500">
                          {server.count_of_online_members}/
                          {server.count_of_members}
                        </CardDescription>
                      </Link>
                    </Card>
                  )}
                </For>
              </Show>
            </div>
          </Card>
        </Col>
      </Grid>
    </main>
  );
};

export default HomePage;
