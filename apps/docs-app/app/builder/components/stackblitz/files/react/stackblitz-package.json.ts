export const REACT_PACKAGE_JSON_FILE = {
  name: 'SDuX Pipeline Builder React Demo',
  version: '1.0.0',
  private: true,
  type: 'module',
  scripts: {
    start: 'vite',
    dev: 'vite',
    build: 'tsc && vite build',
    preview: 'vite preview'
  },
  dependencies: {
    '@sdux-vault/react': 'latest',
    react: '^19.1.0',
    'react-dom': '^19.1.0',
    rxjs: '~7.8.0'
  },
  devDependencies: {
    '@types/react': '^19.1.2',
    '@types/react-dom': '^19.1.2',
    '@vitejs/plugin-react': '^4.4.1',
    typescript: '~5.9.2',
    vite: '^6.3.3'
  }
};
