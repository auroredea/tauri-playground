import {defineConfig} from "vite";
import tailwindcss from '@tailwindcss/vite';

// @ts-expect-error process is a Node.js global
const host = process.env.TAURI_DEV_HOST;
const debug = process.env.TAURI_ENV_DEBUG;

export default defineConfig(async () => ({
    plugins: [
        tailwindcss(),
    ],
    clearScreen: false,
    server: {
        port: 1420,
        strictPort: true,
        host: host || false,
        hmr: host
            ? {
                protocol: "ws",
                host,
                port: 1421,
            }
            : undefined,
        watch: {
            // 3. tell vite to ignore watching `src-tauri`
            ignored: ["**/src-tauri/**"],
        },
        build: {
            sourcemap: debug ? "inline" : false,
            minify: debug ? false : "esbuild",
        }
    },
}));
