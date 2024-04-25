import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { config } from "dotenv";
import path from 'path'
 
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    env: {
      ...config({ path: ".env" }).parsed,
    },
  },
  resolve: {
    alias: {
      '@/': path.resolve(__dirname, '/')
    },
  },
})