// import { useNavigate } from "@solidjs/router";
import { invoke } from "@tauri-apps/api/core";
import { createSignal } from "solid-js";
import { RouterEnum } from "../constants";
import { useNavigate } from "@solidjs/router";

interface AuthResponse {
    access: string,
    u_id: number,
    u_name: string,
    u_email: string,
}

const AuthPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = createSignal<string>("");
  const [password, setPassword] = createSignal<string>("");
  const [status, setStatus] = createSignal<string | null>(null);

  const handleLogin = async () => {
    try {
      const authResponse = await invoke<AuthResponse>("login", { email: email(), password: password() });
      console.log(authResponse);
      
      if (authResponse) {
        localStorage.setItem("u_id", authResponse.u_id.toString());
        localStorage.setItem("u_name", authResponse.u_name);
        localStorage.setItem("u_email", authResponse.u_email);
        localStorage.setItem("access", authResponse.access);
        setStatus("Login successful");
        navigate(RouterEnum.HOME);
      } else {
        setStatus("Login failed");
      }
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
