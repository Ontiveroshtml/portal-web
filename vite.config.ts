import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

const root = fileURLToPath(new URL('.', import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5174,
  },
  build: {
    // Multi-page: /checkout-a-medida es una página aparte (no hay router en
    // el portal), armada como su propio index.html para que sirva como
    // archivo estático real (dist/checkout-a-medida/index.html) sin depender
    // de que el servidor tenga rewrites tipo SPA configurados.
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        checkoutAMedida: resolve(root, 'checkout-a-medida/index.html'),
      },
    },
  },
})
