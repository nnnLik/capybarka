import { Component, lazy, onMount } from "solid-js";
import { Route, Routes } from "@solidjs/router";
import NavBar from "./components/NavBar";
import './App.css'

const App: Component = () => {
  // TODO: uncomment
  // TODO: достать пользователя и замаунтить и во все компоненты внизу передать что-то по типу UserDTO
  // onMount(() => {
  //   window.addEventListener("contextmenu", (e) => {
  //     e.preventDefault();
  //   });
  // });

  // const is_user_data_valid = async () => {
  //   if (userId() && userName() && userAva() && userEmail() && accessToken()) {
  //     console.log("Invalid user data. Move to auth page");
  //     localStorage.clear();
  //     navigate("/");
  //   }
  // };

  // createEffect(() => {
  //   is_user_data_valid();
  // });

  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          component={lazy(() => import("./pages/AuthPage/AuthPage"))}
        />
        <Route path="/home" component={lazy(() => import("./pages/HomePage/HomePage"))} />
        <Route path="/server/:serverId" component={lazy(() => import("./pages/ServerPage/ServerPage"))} />
        <Route path="*" component={lazy(() => import("./pages/NotFoundPage/NotFoundPage"))} />
      </Routes>
    </>
  );
};

export default App;
