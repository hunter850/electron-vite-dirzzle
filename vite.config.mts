import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import type { UserConfigExport, ServerOptions } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    /*------------------------------- variables -----------------------------------*/
    const env = loadEnv(mode, process.cwd(), "");
    /*------------------------------- server -----------------------------------*/
    const server: ServerOptions = {
        open: false,
    };
    if (env.PORT) {
        server.port = parseInt(env.PORT);
    }
    /*------------------------------- config -----------------------------------*/
    const config: UserConfigExport = {
        plugins: [react()],
        server,
        root: path.resolve(__dirname, "./src/renderer"),
        base: "./",
        build: {
            rollupOptions: {
                input: {
                    renderer: path.resolve(__dirname, "./src/renderer/index.html"),
                },
            },
            outDir: path.resolve(__dirname, "./dist"),
            emptyOutDir: false,
        },
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src/renderer/src"),
                "~": path.resolve(__dirname, "./src"),
            },
        },
    };
    return config;
});
