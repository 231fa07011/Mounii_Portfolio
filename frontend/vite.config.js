import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => ({
  // Use repository subpath only for production builds so local dev runs at '/'
  base: mode === 'production' ? '/Mounii_Portfolio/' : '/',
}))