export const SVELTE_VITE_CONFIG_FILE = `
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [svelte()]
});
`.trim();
