export const REACT_TSCONFIG_FILE = {
  compilerOptions: {
    target: 'ES2022',
    module: 'ESNext',
    moduleResolution: 'bundler',
    jsx: 'react-jsx',
    strict: true,
    noImplicitReturns: true,
    forceConsistentCasingInFileNames: true,
    noFallthroughCasesInSwitch: true,
    skipLibCheck: true,
    isolatedModules: true,
    esModuleInterop: true
  },
  include: ['src', 'vite.config.ts']
};
