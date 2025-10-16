import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import * as viteImageminModule from 'vite-plugin-imagemin';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

function resolveImageminFactory(): ((options: Record<string, unknown>) => Plugin) | null {
  const maybeEsm = (viteImageminModule as unknown as { default?: unknown })?.default ?? (viteImageminModule as unknown);
  const maybeCjs = (() => {
    try {
      const mod = require('vite-plugin-imagemin');
      return mod?.default ?? mod;
    } catch {
      return null;
    }
  })();

  const candidate = maybeEsm ?? maybeCjs;
  if (typeof candidate === 'function') return candidate as (options: Record<string, unknown>) => Plugin;
  if (candidate && typeof candidate === 'object') {
    const fn = Object.values(candidate).find((v) => typeof v === 'function');
    if (fn) return fn as (options: Record<string, unknown>) => Plugin;
  }
  return null;
}

const viteImagemin = resolveImageminFactory();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),

    // Add imagemin only if a compatible factory is found
    ...(viteImagemin
      ? [
          viteImagemin({
            gifsicle: { optimizationLevel: 7 },
            optipng: { optimizationLevel: 7 },
            mozjpeg: { quality: 75 },
            pngquant: { quality: [0.6, 0.8] },
            svgo: {
              plugins: [
                { name: 'removeViewBox', active: false },
                { name: 'removeEmptyAttrs', active: false },
              ],
            },
          }),
        ]
      : []),

    visualizer({
      open: true,           // ouvre automatiquement le rapport après build
      filename: 'dist/stats.html',
      template: 'treemap', // options : 'treemap', 'sunburst', 'network'
    }),
  ],

  optimizeDeps: {
    exclude: ['lucide-react'], // Évite la pré-optimisation de cette lib
  },

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false,
      },
    },
  },

  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
        },
      },
    },
  },
});
