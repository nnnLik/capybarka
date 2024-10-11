import { createSignal, Show, For, Component, createEffect } from "solid-js";
import { invoke } from "@tauri-apps/api/core";
import { Link } from "@solidjs/router";
import { Col, Grid } from "../../components/ui/grid";
import { Card, CardDescription } from "../../components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import DefaultImage from "../../components/DefaultImage";

const HomePage: Component = () => {
  const [userId] = createSignal<string | null>(localStorage.getItem("u_id"));
  const [userName] = createSignal<string | null>(
    localStorage.getItem("u_name")
  );
  const [userAva] = createSignal<string | null>(
    localStorage.getItem("u_avatar")
  );
  const [userEmail] = createSignal<string | null>(
    localStorage.getItem("u_email")
  );
  const [accessToken] = createSignal<string | null>(
    localStorage.getItem("access")
  );
  const [servers, setServers] = createSignal<UserServersDTO | null>(null);
  const [loading, setLoading] = createSignal<boolean>(true);

  const fetchServers = async () => {
    await invoke<UserServersDTO>("get_user_servers", {
      uId: Number(userId()),
      accessToken: accessToken(),
    })
      .then((response) => setServers(response))
      .catch((error) => console.error("Error fetching servers:", error))
      .finally(() => setLoading(false));
  };

  createEffect(() => {
    fetchServers();
  });

  return (
    <main class="container mx-auto p-4 h-screen">
      <Grid cols={3} class="gap-4">
        <Col class="col-span-1">
          <Card class="p-4 w-full h-80 flex flex-col items-center justify-between shadow-xl">
            <div class="flex flex-col items-center">
              <DefaultImage
                uri={userAva() as string | undefined}
                fallback_text={userName()?.slice(0, 2).toUpperCase() as string}
                class="size-32 shadow-lg transition duration-300 hover:bg-blue-300 hover:scale-90"
              />

              <h2 class="font-bold mt-4">{userName()}</h2>
              <p class="text-slate-700 dark:text-slate-500">{userEmail()}</p>
            </div>
          </Card>
        </Col>

        <Col class="col-span-2">
          <Card class="p-4 h-80 shadow-xl">
            <div class="overflow-y-auto">
              <Show when={!loading()} fallback={<p>Loading...</p>}>
                <For each={servers()?.result}>
                  {(server) => (
                    <Card class="my-2 p-2.5 shadow-lg transition duration-300 hover:bg-gray-100 hover:scale-95">
                      <Link
                        href={`/server/${server.id.toString()}`}
                        class="flex items-center justify-between"
                      >
                        <div class="flex items-center">
                          <DefaultImage
                            uri={server.image as string | undefined}
                            fallback_text={server.name}
                            class="shadow-lg w-8 h-8 mr-2"
                          />
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
