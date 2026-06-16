import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => ({
  // Use repository subpath for production builds so GitHub Pages serves assets correctly
  // Local dev keeps root path for `vite` dev server
  base: mode === 'production' ? '/Portfolio/' : '/',
}))