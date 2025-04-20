import { defineConfig } from "vite";
import { builtinModules } from "module";
import path from "path";
import type { UserConfigExport } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    /*------------------------------- config -----------------------------------*/
    const config: UserConfigExport = {
        root: path.resolve(__dirname, "./src/preload"),
        build: {
            rollupOptions: {
                input: {
                    main: path.resolve(__dirname, "./src/preload/index.ts"),
                },
                external: [
                    "electron",
                    "@libsql/client",
                    "better-sqlite3",
                    ...builtinModules,
                    ...builtinModules.map((module) => `node:${module}`),
                ],
                output: {
                    entryFileNames: (chunkInfo) => {
                        if (chunkInfo.isEntry) {
                            return "index.js";
                        } else {
                            return "[name].js";
                        }
                    },
                    chunkFileNames: "[name]-[hash:8].js",
                    assetFileNames: "assets/[name]-[hash:8][extname]",
                    format: "cjs",
                },
            },
            outDir: path.resolve(__dirname, "./dist/preload"),
            minify: mode === "development" ? false : "esbuild",
            copyPublicDir: false,
            emptyOutDir: false,
        },
        resolve: {
            alias: {
                "#": path.resolve(__dirname, "./src/main"),
                "~": path.resolve(__dirname, "./src"),
            },
        },
    };
    return config;
});
