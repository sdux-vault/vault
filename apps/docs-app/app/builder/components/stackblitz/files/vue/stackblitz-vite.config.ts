export const VUE_VITE_CONFIG_FILE = `
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [vue()]
});
`.trim();
