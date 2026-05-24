export const REACT_VITE_CONFIG_FILE = `
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()]
});
`.trim();
