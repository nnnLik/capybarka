import { invoke } from "@tauri-apps/api/core";
import { createSignal, createEffect, Show, For, Component } from "solid-js";
import { Link } from "@solidjs/router";
import { Col, Grid } from "../../components/ui/grid"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "../../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"

const HomePage: Component = () => {
  const [userId, _setUserId] = createSignal<string | null>(localStorage.getItem("u_id"));
  const [userName, _setUserName] = createSignal<string | null>(localStorage.getItem("u_name"));
  const [userAva, _setAva] = createSignal<string | null>(localStorage.getItem("u_avatar"));
  const [userEmail, _setUserEmail] = createSignal<string | null>(localStorage.getItem("u_email"));
  const [accessToken, _setAccessToken] = createSignal<string | null>(localStorage.getItem("access"));
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

  const is_user_data_valid = async () => {
      if (userId() && userName() && userAva() && userEmail() && accessToken()) {}
  }

  createEffect(() => {
    fetchServers();
  });

  return (
    <main class="container">
      {/*<h1>!!!!!</h1>*/}
      <Card>
        <CardHeader>
          <Avatar>
            <Show when={}>

            </Show>
            <AvatarImage src={"https://github.com/sek-consulting.png"} />
            <AvatarFallback>EK</AvatarFallback>
          </Avatar>
        </CardHeader>
        <Grid cols={2} colsMd={2} class="w-full gap-2">
            {/*<CardTitle>Card Title</CardTitle>*/}
            {/*<CardDescription>Card Description</CardDescription>*/}
            {/*<Col span={1} spanMd={2}>*/}
            {/*  <Card>*/}

            {/*    <CardContent>*/}
            {/*      <p>Card Content</p>*/}
            {/*    </CardContent>*/}
            {/*    <CardFooter>*/}
            {/*      <p>Card Footer</p>*/}
            {/*    </CardFooter>*/}
            {/*  </Card>*/}
            {/*</Col>*/}
        </Grid>
      </Card>

      {/*<h1></h1>*/}
      {/*<div>*/}
      {/*  <img src="https://via.placeholder.com/100" alt="avatar" />*/}
      {/*  <h2>{userName()}</h2>*/}
      {/*  <p>{userEmail()}</p>*/}
      {/*  <h3>App version: 1.0.0</h3>*/}
      {/*</div>*/}
      {/*<div>*/}
      {/*  <h3>Server List</h3>*/}
      {/*  <Show when={!loading()} fallback={<p>Loading servers...</p>}>*/}
      {/*    <For each={servers()?.result}>*/}
      {/*      {(server) => (*/}
      {/*        <div>*/}
      {/*          <Link href={`/server/${server.id.toString()}`}>*/}
      {/*            <p>*/}
      {/*              {server.id} - {server.name}*/}
      {/*            </p>*/}
      {/*          </Link>*/}
      {/*        </div>*/}
      {/*      )}*/}
      {/*    </For>*/}
      {/*  </Show>*/}
      {/*</div>*/}
    </main>
  );
};

export default HomePage;
