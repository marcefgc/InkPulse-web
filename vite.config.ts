import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Base explícito con el nombre del repositorio en GitHub Pages.
  // Si cambias el nombre del repo, actualiza este valor.
  base: '/InkPulse-web/',
})
