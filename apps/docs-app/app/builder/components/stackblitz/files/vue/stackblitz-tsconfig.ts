export const VUE_TSCONFIG_FILE = {
  compilerOptions: {
    target: 'ES2022',
    module: 'ESNext',
    moduleResolution: 'bundler',
    jsx: 'preserve',
    strict: true,
    noImplicitReturns: true,
    forceConsistentCasingInFileNames: true,
    noFallthroughCasesInSwitch: true,
    skipLibCheck: true,
    isolatedModules: true,
    esModuleInterop: true
  },
  include: ['src/**/*.ts', 'src/**/*.vue', 'vite.config.ts']
};
