import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => ({
  // Use repository subpath only for production builds so local dev runs at '/'
  // Use relative base in production so Pages serves identical output to local
  base: mode === 'production' ? './' : '/',
}))