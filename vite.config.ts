import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    fileParallelism: false,
    maxConcurrency: 1,
    testTimeout: 60000,
    hookTimeout: 60000,
  },
})
