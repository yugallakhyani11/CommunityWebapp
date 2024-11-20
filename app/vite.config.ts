import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { optimizeDeps } from 'vite'
import {VitePWA} from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5173
  },
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      strategies: "generateSW",
      devOptions: {
        enabled: true
      },
      manifest: {
        "name": "Care2Share",
        "short_name": "Care2Share",
        "start_url": "./",
        "display": "standalone",
        "background_color": "#fff",
        "description": "Online feed sharing application",
        "theme_color": "#ffffff",
        "icons": [
          {
            "src": "public/images/pwa-64x64.png",
            "sizes": "64x64",
            "type": "image/png"
          },
          {
            "src": "public/images/pwa-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "public/images/pwa-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
          },
          {
            "src": "public/images/maskable-icon-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
          }
        ]
        },
        workbox: {
          runtimeCaching: [
            {
              urlPattern: ({ url }) => {
              return url.pathname.includes('images')
              },
              handler: 'CacheFirst',
              method: 'GET',
              options: {
              cacheName: 'static-assets',
              expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24
              },
              cacheableResponse: {
              statuses: [0, 200]
              },
              }
              }
          ]
          }

    })
  ],
  optimizeDeps: {
    include: ['@emotion/react', '@emotion/styled', '@mui/material/Tooltip'],
  },
})
