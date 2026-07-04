import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [react(), tailwindcss()],
	test: {
		environment: 'jsdom',
		// Node 26 exposes an experimental (non-functional) localStorage global.
		// vitest's populateGlobal() skips keys already in globalThis, so jsdom's
		// real localStorage is never installed. The setup file patches it in.
		setupFiles: ['./src/test-setup.ts'],
	}
})
