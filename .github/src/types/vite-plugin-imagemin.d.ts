declare module 'vite-plugin-imagemin' {
  import type { Plugin } from 'vite';
  const viteImagemin: (options: unknown) => Plugin;
  export default viteImagemin;
}


