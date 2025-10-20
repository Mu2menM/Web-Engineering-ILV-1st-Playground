import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    open: true,
  },
  publicDir: 'media',
  // Important: Base path for GitHub Pages
  base:
    process.env.NODE_ENV === 'production'
      ? '/Web-Engineering-ILV-1st-Playground/'
      : '/',
});
