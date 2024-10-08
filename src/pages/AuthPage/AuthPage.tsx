import { invoke } from "@tauri-apps/api/core";
import { Component, createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";

const AuthPage: Component = () => {
  const navigate = useNavigate();
  const [email, setEmail] = createSignal<string>("");
  const [password, setPassword] = createSignal<string>("");
  const [status, setStatus] = createSignal<string | null>(null);

  const handleLogin = async () => {
    try {
      await invoke<AuthResponse>("login", { email: email(), password: password() })
        .then(response => {
            localStorage.setItem("u_id", response.u_id.toString());
            localStorage.setItem("u_name", response.u_name);
            localStorage.setItem("u_email", response.u_email);
            localStorage.setItem("access", response.access);
            setStatus("Login successful");
            navigate('/home');
        })
        .catch(err_msg => {
            console.log("Login failed. Exc " + err_msg);
            setStatus("Login failed")
        });
    } catch (error) {
      setStatus(`Error: ${error}`);
    }
  };

  return (
    <main class="container">
      <h1>Login</h1>
      <div class="inputs">
        <input
          type="email"
          placeholder="Email"
          value={email()}
          onInput={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password()}
          onInput={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="button" onClick={handleLogin}>Login</button>
      <div>{status()}</div>
    </main>
  );
};

export default AuthPage;
