import { invoke } from "@tauri-apps/api/core";
import { createSignal, createEffect, Show, For, Component } from "solid-js";
import { Link } from "@solidjs/router";

const HomePage: Component = () => {
  const [userId, _setUserId] = createSignal<string>(
    localStorage.getItem("u_id") || "Unknown"
  );
  const [userName, _setUserName] = createSignal<string>(
    localStorage.getItem("u_name") || "Unknown"
  );
  const [userEmail, _setUserEmail] = createSignal<string>(
    localStorage.getItem("u_email") || "Unknown"
  );
  const [accessToken, _setAcessToken] = createSignal<string>(
    localStorage.getItem("access") || "Unknown"
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
    <main class="container">
      <h1>Home Page</h1>
      <div>
        <img src="https://via.placeholder.com/100" alt="avatar" />
        <h2>{userName()}</h2>
        <p>{userEmail()}</p>
        <h3>App version: 1.0.0</h3>
      </div>
      <div>
        <h3>Server List</h3>
        <Show when={!loading()} fallback={<p>Loading servers...</p>}>
          <For each={servers()?.result}>
            {(server) => (
              <div>
                <Link href={`/server/${server.id.toString()}`}>
                  <p>
                    {server.id} - {server.name}
                  </p>
                </Link>
              </div>
            )}
          </For>
        </Show>
      </div>
    </main>
  );
};

export default HomePage;
