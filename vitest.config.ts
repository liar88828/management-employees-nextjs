import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { fileURLToPath } from "node:url";
// https://vitejs.dev/config/

export default defineConfig( {
    base: "/",
    plugins: [
        react(),
        tsconfigPaths(),
    ],
    // resolve: {
    //     alias: [
    //         { find: "@", replacement: resolve(__dirname, "./src") } ]
    // },
    test: {
        setupFiles: [ './vitest.setup.ts' ],
        globals: true,
        environment: 'jsdom',
        coverage: { provider: "istanbul" },

        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url))
            //     '@/': new URL('./src/', import.meta.url).pathname,
        },
    },
} )