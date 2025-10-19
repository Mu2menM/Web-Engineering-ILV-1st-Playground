export const buildConfig = {
  // Development build settings
  development: {
    sourcemap: true,
    minify: false,
    assetsInlineLimit: 4096,
  },

  // Production build settings
  production: {
    sourcemap: false,
    minify: 'esbuild',
    assetsInlineLimit: 8192,
  },

  // Common settings
  common: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
  },
};
