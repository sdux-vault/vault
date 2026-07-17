export const SVELTE_PACKAGE_JSON_FILE = {
  name: 'SDuX Svelte Pipeline Builder Demo',
  version: '2.0.0',
  private: true,
  type: 'module',
  scripts: {
    start: 'vite',
    dev: 'vite',
    build: 'vite build',
    preview: 'vite preview'
  },
  dependencies: {
    '@sdux-vault/svelte': 'latest',
    svelte: '^5.28.2',
    rxjs: '~7.8.0'
  },
  devDependencies: {
    '@sveltejs/vite-plugin-svelte': '^5.0.3',
    typescript: '~5.9.2',
    vite: '^6.3.3'
  }
};
