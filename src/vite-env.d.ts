/// <reference types="vite/client" />
/// <reference types="vite/client" />

declare module 'vite-plugin-imagemin' {
  import type { Plugin } from 'vite';
  
  interface ImageminOptions {
    gifsicle?: {
      optimizationLevel?: number;
      interlaced?: boolean;
    };
    optipng?: {
      optimizationLevel?: number;
    };
    mozjpeg?: {
      quality?: number;
      progressive?: boolean;
    };
    pngquant?: {
      quality?: [number, number];
      speed?: number;
    };
    svgo?: {
      plugins?: Array<{
        name: string;
        active: boolean;
      }>;
    };
    webp?: {
      quality?: number;
    };
  }
  
  export default function viteImagemin(options?: ImageminOptions): Plugin;
}