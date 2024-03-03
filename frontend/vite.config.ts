import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        "name": "Your App Name",
        "short_name": "App",
        "icons": [
          {
            "src": "logo.png",
            "sizes": "64x64",
            "type": "image/png"
          },
          {
            "src": "logo-splash.png",
            "sizes": "512x512",
            "type": "image/png"
          }
        ],
        "start_url": "/",
        "display": "standalone",
        "background_color": "#ffffff",
        "theme_color": "#000000",
      }
    }),
  ],
});
