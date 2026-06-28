import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['clubrgo-favicon.svg', 'icon-192.png', 'icon-512.png'],
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,woff2}'],
        // Don't precache the heavy lazy 3-D (Spline) chunks — they load on demand
        // only when a scene is enabled; keep the offline shell lean.
        globIgnores: ['**/react-spline-*.js', '**/physics-*.js', '**/process-*.js', '**/navmesh-*.js', '**/opentype-*.js', '**/gaussian-splat*.js', '**/boolean-*.js', '**/howler-*.js'],
        navigateFallback: '/index.html',
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/assets/'),
            handler: 'CacheFirst',
            options: { cacheName: 'clubrgo-images', expiration: { maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 * 30 } },
          },
        ],
      },
      manifest: {
        name: 'ClubrGO — the scorekeeper for your club',
        short_name: 'ClubrGO',
        description: 'The transparent scorekeeper & live club leaderboard for Fantasy, Last Longer & Squares.',
        start_url: '/aurora',
        scope: '/',
        display: 'standalone',
        background_color: '#070D0A',
        theme_color: '#070D0A',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
