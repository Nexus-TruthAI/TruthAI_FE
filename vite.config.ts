import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': {
        target: 'https://api.truthai.shop',
        changeOrigin: true,
        secure: false,
      },
      '/llm-answer': {
        target: 'https://api.truthai.shop',
        changeOrigin: true,
        secure: false,
      },
      '/prompt': {
        target: 'https://api.truthai.shop',
        changeOrigin: true,
        secure: false,
      },
      '/folder': {
        target: 'https://api.truthai.shop',
        changeOrigin: true,
        secure: false,
      },
      '/persona': {
        target: 'https://api.truthai.shop',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
