import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/sitemap.xml': {
        target: 'http://localhost',
        changeOrigin: true,
        rewrite: () => '/calchub/backend/api/sitemap?format=xml',
      },
      '/api': {
        target: 'http://localhost',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/calchub/backend/api'),
      },
    },
  },
})
