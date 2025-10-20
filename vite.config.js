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
  base:
    process.env.NODE_ENV === 'production'
      ? '/web-engineering-ilv-1st-playground'
      : '/',
});
