import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import dotPlugin from './vite-plugin-dot.js';

export default defineConfig({
  root: 'playground',
  plugins: [dotPlugin()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        quietDeps: true,
        silenceDeprecations: ['import', 'global-builtin'],
      },
    },
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'src/entry.js'),
      name: 'Copenhagen',
      formats: ['es', 'umd'],
      fileName: (format) => `copenhagen.${format}.js`,
    },
    rollupOptions: {
      output: { assetFileNames: (info) => info.name === 'style.css' ? 'copenhagen.css' : '[name][extname]' },
    },
  },
});
