import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

console.log('VITE_API_URL:', process.env.VITE_API_URL);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL),
  }
})
