import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    minify: 'esbuild', // Minifies both JS and CSS files automatically
    cssCodeSplit: true, // Splits CSS into small chunks so it isn't render-blocking
  }
})