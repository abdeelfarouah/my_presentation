import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// SEO generation hook
function generateSEOFiles() {
  try {
    // Import SEO utilities dynamically
    import('./src/utils/seo.ts').then(({ generateSitemap, generateRobotsTxt }) => {
      const sitemap = generateSitemap();
      const robots = generateRobotsTxt();
      
      fs.writeFileSync(path.join(__dirname, 'dist/sitemap.xml'), sitemap);
      fs.writeFileSync(path.join(__dirname, 'dist/robots.txt'), robots);
      
      console.log('✅ SEO files updated automatically!');
    }).catch(err => console.error('❌ SEO generation error:', err));
  } catch (error) {
    console.error('❌ SEO files error:', error);
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  base: '/', // Set this to your repository name if deploying to GitHub Pages or a subdirectory
  plugins: [
    TanStackRouterVite(),
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
    }),
    {
      name: 'seo-generator',
      writeBundle() {
        generateSEOFiles();
      }
    }
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
          vendor: ['react', 'react-dom', '@tanstack/react-router']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false
      }
    }
  }
});