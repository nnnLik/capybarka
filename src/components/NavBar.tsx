import { useLocation, Link } from "@solidjs/router";
import { Component, Show } from "solid-js";
import { Menubar, MenubarMenu } from "./ui/menubar";
import { AiOutlineHome } from "solid-icons/ai";
import { WiDaySunny } from "solid-icons/wi";
import { FaRegularMoon } from "solid-icons/fa";
import { useColorMode } from "@kobalte/core";
import { TbDeviceLaptop } from "solid-icons/tb";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const NavBar: Component = () => {
  const location = useLocation();
  const { setColorMode } = useColorMode();

  return (
    <>
      <Show when={location.pathname !== "/"}>
        <Menubar class="flex justify-between items-center rounded-b-lg shadow-lg">
          <MenubarMenu>
            <Link href="/home" class="flex justify-center items-center pl-80">
              <AiOutlineHome />
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger
                as={Button<"button">}
                variant="ghost"
                size="sm"
                class="w-9 px-0"
              >
                <WiDaySunny class="size-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <FaRegularMoon class="absolute size-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span class="sr-only">Toggle theme</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onSelect={() => setColorMode("light")}>
                  <WiDaySunny class="mr-2 size-4" />
                  <span>Light</span>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setColorMode("dark")}>
                  <FaRegularMoon class="mr-2 size-4" />
                  <span>Dark</span>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setColorMode("system")}>
                  <TbDeviceLaptop class="mr-2 size-4" />
                  <span>System</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </MenubarMenu>
        </Menubar>
      </Show>
    </>
  );
};

export default NavBar;
