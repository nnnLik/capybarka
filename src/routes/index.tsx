import App from "../App.tsx";
import { Router } from "@solidjs/router";
import { Component } from "solid-js";

const Routers: Component = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default Routers;
