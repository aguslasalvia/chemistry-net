import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    tsconfigPaths: true
  },
  build: {
    outDir: '../wwwroot',  // build va a wwwroot de ASP.NET
    emptyOutDir: true
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5050'  // proxy a ASP.NET en dev
    }
  }
})