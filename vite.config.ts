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

export default defineConfig({
  base: '/',
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    // Disable hashing for production files
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name][extname]',
        chunkFileNames: 'assets/[name].js',
        entryFileNames: 'assets/[name].js',
      }
    }
  },
  plugins: [
    react(),
    ...(viteImagemin
      ? [
          viteImagemin({
            gifsicle: { optimizationLevel: 7 },
            optipng: { optimizationLevel: 7 },
            mozjpeg: { quality: 80 },
            pngquant: { quality: [0.8, 0.9], speed: 4 },
            svgo: {
              plugins: [
                { name: 'removeViewBox', active: false },
                { name: 'removeEmptyAttrs', active: false }
              ]
            }
          })
        ]
      : []),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true
    })
  ]
});