import { Component, lazy, onMount } from "solid-js";
import { Route, Routes } from "@solidjs/router";
import NavBar from "./components/NavBar/NavBar";
import './App.css'

const App: Component = () => {
  // TODO: uncomment
  // onMount(() => {
  //   window.addEventListener("contextmenu", (e) => {
  //     e.preventDefault();
  //   });
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
