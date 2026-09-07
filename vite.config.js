import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  // Base path para GitHub Pages: cambiá 'rescoldo' si el repo tiene otro nombre
  base: '/rescoldo/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'Rescoldo',
        short_name: 'Rescoldo',
        description: 'Visor de chats de WhatsApp — local, privado, sin cuenta.',
        theme_color: '#F4A259',
        background_color: '#111B21',
        display: 'standalone',
        orientation: 'any',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  test: {
    // Configuración de Vitest dentro del mismo archivo de Vite
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.js']
  }
})
