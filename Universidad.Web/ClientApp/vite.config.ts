import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../wwwroot',  // build va a wwwroot de ASP.NET
    emptyOutDir: true
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5231'  // proxy a ASP.NET en dev
    }
  }
})