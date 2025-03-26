import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  envDir: './environment',
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 10000,
    strictPort: true,
    // Add Render.com domain to allowed hosts
    allowedHosts: ['github-candidate-search-yu0k.onrender.com']
  },
  preview: {
    host: '0.0.0.0',
    port: 10000,
    strictPort: true
  }
});
