export const SVELTE_PACKAGE_JSON_FILE = {
  name: 'SDuX Pipeline Builder Svelte Demo',
  version: '0.0.1',
  private: true,
  type: 'module',
  scripts: {
    start: 'vite',
    dev: 'vite',
    build: 'vite build',
    preview: 'vite preview'
  },
  dependencies: {
    '@sdux-vault/core': 'latest',
    svelte: '^5.28.2',
    rxjs: '~7.8.0'
  },
  devDependencies: {
    '@sveltejs/vite-plugin-svelte': '^5.0.3',
    typescript: '~5.9.2',
    vite: '^6.3.3'
  }
};
