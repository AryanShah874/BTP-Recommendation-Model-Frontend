import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'https://btp-recommendation-model-backend.vercel.app',
      changeOrigin: true,
      secure: false
    }
  }
})
