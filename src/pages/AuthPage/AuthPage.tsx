import { invoke } from "@tauri-apps/api/core";
import { Component, createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { Button } from "../../components/ui/button.tsx";
import { TextField, TextFieldInput } from "../../components/ui/text-field";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../../components/ui/card.tsx";

const AuthPage: Component = () => {
  const navigate = useNavigate();
  const [email, setEmail] = createSignal<string>("");
  const [password, setPassword] = createSignal<string>("");
  const [status, setStatus] = createSignal<string | null>(null);

  const handleLogin = async () => {
    try {
      await invoke<AuthResponse>("login", {
        email: email(),
        password: password(),
      })
        .then((response) => {
          const avatar = response.u_avatar;

          localStorage.setItem("u_id", response.u_id.toString());
          localStorage.setItem("u_name", response.u_name);
          localStorage.setItem("u_email", response.u_email);
          localStorage.setItem("access", response.access);

          if (avatar) {
            localStorage.setItem("u_avatar", response.u_avatar);
          }

          setStatus("Login successful");
          navigate("/home");
        })
        .catch((err_msg) => {
          console.log("Login failed. Exc " + err_msg);
          setStatus("Login failed");
        });
    } catch (error) {
      setStatus(`Error: ${error}`);
    }
  };

  return (
    <main class="container">
      <Card class="mt-14 mr-40 ml-40 flex flex-col items-center shadow-xl">
        <CardHeader><b>Login</b></CardHeader>
        <CardContent>
          <TextField class="p-2">
            <TextFieldInput
              class="my-2"
              type="email"
              placeholder="Email"
              value={email()}
              onInput={(e) => setEmail(e.target.value)}
            />
            <TextFieldInput
              type="password"
              placeholder="Password"
              value={password()}
              onInput={(e) => setPassword(e.target.value)}
            />
          </TextField>
        </CardContent>

        <CardFooter>
          <Button type="button" onClick={handleLogin}>
            Login
          </Button>
        </CardFooter>
      </Card>
      <div>{status()}</div>
    </main>
  );
};

export default AuthPage;
