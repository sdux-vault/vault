export const VUE_PACKAGE_JSON_FILE = {
  name: 'SDuX Pipeline Builder Vue Demo',
  version: '0.0.1',
  private: true,
  type: 'module',
  scripts: {
    start: 'vite',
    dev: 'vite',
    build: 'vue-tsc && vite build',
    preview: 'vite preview'
  },
  dependencies: {
    '@sdux-vault/core': 'latest',
    vue: '^3.5.13',
    rxjs: '~7.8.0'
  },
  devDependencies: {
    '@vitejs/plugin-vue': '^5.2.3',
    typescript: '~5.9.2',
    vite: '^6.3.3',
    'vue-tsc': '^2.2.8'
  }
};
