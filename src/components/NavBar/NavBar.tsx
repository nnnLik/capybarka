import { useLocation, Link } from "@solidjs/router";
import { Component, Show } from "solid-js";
import "./NavBar.module.css";

const NavBar: Component = () => {
  const location = useLocation();

  return (
    <nav class="navbar">
      <div class="navbar-content">
        <Show when={location.pathname !== "/"}>
          <h1 className="navbar-title">Your App Title</h1>
          <Show when={location.pathname !== "/home"}>
            <Link href="/home" class="back-button">
              &#8592;
            </Link>
          </Show>
          <Link href="/home" class="home-button">
            🏠
          </Link>
        </Show>
      </div>
    </nav>
  );
};

export default NavBar;
