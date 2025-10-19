// vite.config.js
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode`
  const env = loadEnv(mode, process.cwd(), '');

  return {
    root: '.',
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: mode === 'development',
      minify: mode === 'production' ? 'esbuild' : false,
      rollupOptions: {
        input: {
          main: './index.html',
        },
        output: {
          assetFileNames: (assetInfo) => {
            let extType = assetInfo.name.split('.').at(1);
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
              extType = 'img';
            }
            return `assets/${extType}/[name]-[hash][extname]`;
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
        },
      },
      emptyOutDir: true,
    },
    server: {
      port: 3000,
      open: true,
    },
    publicDir: 'media',
    resolve: {
      alias: {
        '@': '/src',
        '~': '/',
      },
    },
    optimizeDeps: {
      include: ['js/**/*.ts'],
    },
    // Environment-specific configurations
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV || mode),
    },
  };
});
