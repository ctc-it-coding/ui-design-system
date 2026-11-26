import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

// Library build: ESM, tree-shakeable, React/clsx/tailwind-merge kept external.
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        'icons/index': resolve(__dirname, 'src/icons/index.ts'),
        'tokens/index': resolve(__dirname, 'src/tokens/index.ts'),
        'marketing/index': resolve(__dirname, 'src/marketing/index.ts'),
        'templates/index': resolve(__dirname, 'src/templates/index.ts'),
        'templates/email/render': resolve(__dirname, 'src/templates/email/render.ts'),
        'pages/index': resolve(__dirname, 'src/pages/index.ts'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react-dom/server', 'react/jsx-runtime', 'clsx', 'tailwind-merge'],
      output: { preserveModules: true, preserveModulesRoot: 'src', entryFileNames: '[name].js' },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
