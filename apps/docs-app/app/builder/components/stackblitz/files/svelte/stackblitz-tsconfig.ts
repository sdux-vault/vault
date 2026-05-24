export const SVELTE_TSCONFIG_FILE = {
  compilerOptions: {
    target: 'ES2022',
    module: 'ESNext',
    moduleResolution: 'bundler',
    strict: true,
    noImplicitReturns: true,
    forceConsistentCasingInFileNames: true,
    noFallthroughCasesInSwitch: true,
    skipLibCheck: true,
    isolatedModules: true,
    esModuleInterop: true,
    verbatimModuleSyntax: true
  },
  include: ['src', 'vite.config.ts']
};
