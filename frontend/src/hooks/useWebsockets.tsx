import { createSignal, onCleanup } from "solid-js";
import WebSocket from "@tauri-apps/plugin-websocket";


const useWebSocket = (url: string) => {
  const [socket, setSocket] = createSignal<WebSocket | null>(null);
  const [isConnected, setIsConnected] = createSignal<boolean>(false);

  // Подключаемся к серверу через WebSocket
  const connect = async () => {
    try {
      const ws = await WebSocket.connect(url);

      // ws.addListener('open', () => {
      //   setIsConnected(true);
      //   console.log("WebSocket connected");
      // });

      // ws.addListener('close', () => {
      //   setIsConnected(false);
      //   console.log("WebSocket disconnected");
      // });

      // ws.addListener('error', (error) => {
      //   console.error("WebSocket error", error);
      //   setIsConnected(false);
      // });

      // ws.addListener('message', (message) => {
      //   console.log("Message received from server", message);
      //   // Обработка сообщений от сервера
      // });

      setSocket(ws);

    } catch (error) {
      console.error("Failed to connect WebSocket:", error);
    }
  };

  // Отправляем сообщение на сервер
  const sendMessage = async (message: string) => {
    if (isConnected() && socket()) {
      await socket()?.send(message);
    } else {
      console.error("WebSocket is not connected");
    }
  };

  // Очищаем WebSocket при завершении компонента
  onCleanup(() => {
    if (socket()) {
      socket()?.close();
    }
  });

  return {
    connect,
    sendMessage,
    isConnected,
  };
};

export default useWebSocket;
