/**
 * Vite config: React + Tailwind 4. Build uses manualChunks to split vendor bundles
 * (React, GSAP) for better caching. Three.js removed — hero is SVG-based.
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-gsap': ['gsap', '@gsap/react'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
});
