import { useParams } from "@solidjs/router";
import { invoke } from "@tauri-apps/api/core";
import { Component, createSignal, onMount } from "solid-js";

const ServerPage: Component = () => {
    const params = useParams();
    const [serverId, _setServerId] = createSignal<number>(Number(params.serverId));
    const [serverDetailDTO, setServerDetailDTO] = createSignal<UserServerDetailDTO | null>(null);
    const [loading, setLoading] = createSignal<boolean>(true);

    const fetchServerInfo = async () => {
        await invoke<UserServerDetailDTO>("get_server_info_by_id", {id: Number(serverId())})
          .then((response) => setServerDetailDTO(response))
          .catch((error) => console.error("Error fetching server info:", error))
          .finally(() => setLoading(false));
      };

    onMount(() => {
        fetchServerInfo();
    });

    return (
        <div>
            <h1>Server Detail</h1>
            <p>Server ID: {serverId()}</p>
        </div>
    );
}

export default ServerPage;
