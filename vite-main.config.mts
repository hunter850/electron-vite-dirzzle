import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { builtinModules } from "module";
import path from "path";
import type { UserConfigExport } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    /*------------------------------- config -----------------------------------*/
    const config: UserConfigExport = {
        root: path.resolve(__dirname, "./src/main"),
        plugins: [
            viteStaticCopy({
                targets: [
                    {
                        src: "./drizzle/migrations",
                        dest: "drizzle",
                    },
                ],
            }),
        ],
        build: {
            rollupOptions: {
                preserveEntrySignatures: "strict",
                input: {
                    main: path.resolve(__dirname, "./src/main/index.ts"),
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
                    preserveModules: true,
                    preserveModulesRoot: "src/main",
                },
            },
            outDir: path.resolve(__dirname, "./dist/main"),
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
