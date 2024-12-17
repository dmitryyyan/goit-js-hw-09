import { defineConfig } from 'vite';
import fg from 'fast-glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import path from 'path';

export default defineConfig(({ command }) => {
  // Перевірка значення командної опції
  const isServe = command === 'serve';

  return {
    define: {
      [isServe ? 'global' : '_global']: {},
    },
    root: 'src',
    build: {
      sourcemap: true,
      rollupOptions: {
        input: fg.sync('./src/*.html').map(file => path.resolve(file)),
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          entryFileNames: '[name].[hash].js',
        },
      },
      outDir: '../dist',
    },
    plugins: [injectHTML(), FullReload(['./src/**/*.html', './src/**/*.js'])],
  };
});
