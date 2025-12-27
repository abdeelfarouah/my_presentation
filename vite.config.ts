import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/', // Set this to your repository name if deploying to GitHub Pages or a subdirectory
  plugins: [
    react(),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 10240, // Seuil de compression (10KB)
      deleteOriginFile: false
    }),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 10240,
      deleteOriginFile: false
    })
  ],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    chunkSizeWarningLimit: 1000,
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});