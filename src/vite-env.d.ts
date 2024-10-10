/// <reference types="vite/client" />
import path from "path"

import solid from "@vitejs/plugin-solid"
import { defineConfig } from "vite"

export default defineConfig({
    plugins: [solid()],
    resolve: {
        alias: {
            "~": path.resolve(__dirname, "./src")
        }
    }
})
