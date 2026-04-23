import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ZMIEŃ 'aroma-sklep' na dokładną nazwę Twojego repozytorium na GitHubie!
export default defineConfig({
  plugins: [react()],
  base: '/Aroma/', 
})