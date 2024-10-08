import { createEffect, createSignal } from "solid-js";

const HomePage = () => {
  const [userName, setUserName] = createSignal<string>(localStorage.getItem("u_name") || "Unknown");
  const [userEmail, setUserEmail] = createSignal<string>(localStorage.getItem("u_email") || "Unknown");

  const servers = [
    { id: 1, name: "Server 1", status: "Online" },
    { id: 2, name: "Server 2", status: "Offline" },
    { id: 3, name: "Server 3", status: "Online" },
  ];

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
        <ul>
          {servers.map(server => (
            <li key={server.id}>
              {server.name} - {server.status}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default HomePage;
