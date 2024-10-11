import { useLocation, Link } from "@solidjs/router";
import { Component, Show } from "solid-js";
import { Menubar, MenubarMenu } from "./ui/menubar";
import { AiOutlineHome } from "solid-icons/ai";

const NavBar: Component = () => {
  const location = useLocation();

  return (
    <Menubar class="flex justify-between items-center rounded-b-lg shadow-lg">
      <Show when={location.pathname !== "/"}>
        <MenubarMenu>
          <Link href="/home" class="flex justify-center items-center mx-auto">
            <AiOutlineHome />
          </Link>
        </MenubarMenu>
      </Show>
    </Menubar>
  );
};

export default NavBar;
