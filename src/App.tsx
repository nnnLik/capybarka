import { Component, lazy, onMount } from "solid-js";
import { Route, Routes } from "@solidjs/router";
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
      <Routes>
        <Route
          path="/"
          component={lazy(() => import("./pages/AuthPage/AuthPage"))}
        />
        <Route path="/home" component={lazy(() => import("./pages/HomePage/HomePage"))} />
        <Route path="*" component={lazy(() => import("./pages/NotFoundPage/NotFoundPage"))} />
      </Routes>
    </>
  );
};

export default App;
