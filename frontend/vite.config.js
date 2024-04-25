import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({

  plugins: [react()],
  server: {
    port: 3000 // Change this to a different port if 3000 is already in use
  },
  proxy: {
    '/api': {
      target: 'http://localhost:3000', // Your target port
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, '') // Remove /api from the path
    }
  }
})



