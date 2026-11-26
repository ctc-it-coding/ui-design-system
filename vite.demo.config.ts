import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Component showcase (all Figma pages): `npm run dev`
export default defineConfig({
  root: 'demo',
  plugins: [react(), tailwindcss()],
  build: { outDir: '../dist-demo', emptyOutDir: true },
});
