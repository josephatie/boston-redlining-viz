import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Redirect bare imports of react-map-gl to its ESM build
      'react-map-gl': 'react-map-gl/dist/esm'
    }
  }
})
