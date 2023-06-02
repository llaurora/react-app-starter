import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { createHtmlPlugin } from "vite-plugin-html";
import { resolve } from "node:path";
import loadCssModulePlugin from "vite-plugin-load-css-module";
import { viteMockServe } from "vite-plugin-mock";
import "dotenv/config";
import { ROOT_URL } from "./src/constants";

const { PORT = 8080, PROXY } = process.env;

export default defineConfig({
    base: ROOT_URL,
    mode: "development",
    plugins: [
        react(),
        viteMockServe({
            mockPath: "mock/vite",
        }),
        loadCssModulePlugin({
            include: (id: string) => id.endsWith("scss") && !id.includes("node_modules"),
        }),
        createHtmlPlugin({
            entry: "/src/index.tsx",
            template: "index.html",
        }),
    ],
    resolve: {
        alias: {
            "@": resolve(__dirname, "src"),
        },
    },
    server: {
        port: Number(PORT),
        proxy: {
            "/api": {
                target: PROXY,
                changeOrigin: true,
            },
        },
    },
    css: {
        modules: {
            generateScopedName: "[path][name]__[local]",
        },
        preprocessorOptions: {
            scss: {
                additionalData: `@import "${resolve(__dirname, "src/assets/styles/variables.scss")}";@import "${resolve(
                    __dirname,
                    "src/assets/styles/mixins.scss",
                )}";`,
            },
        },
    },
});
