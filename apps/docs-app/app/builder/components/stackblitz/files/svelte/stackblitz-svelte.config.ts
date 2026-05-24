export const SVELTE_CONFIG_FILE = `
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  preprocess: vitePreprocess()
};
`.trim();
