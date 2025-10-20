// vite.config.js
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';
  const repoName = 'Web-Engineering-ILV-1st-Playground';

  return {
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
    base: isGitHubPages ? `/${repoName}/` : '/',
  };
});
