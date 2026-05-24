#!/usr/bin/env node
// --- AI Model File Path (DO NOT DELETE) ---
// FilePath: tools > release > release.mjs
// Updated: 2026-03-25
// --- END AI MODEL FILE PATH ---

import fs from 'node:fs';
import path from 'node:path';
import { Release } from './release.class.mjs';

const args = process.argv.slice(2);
// Resolve where command is run from
const CWD = process.cwd();

// Load .release/config.json from current working directory
const configPath = path.join(CWD, '.release', 'config.json');

let projectRoot;
let loadEngine = false;
let config;

try {
  const raw = fs.readFileSync(configPath, 'utf-8');
  config = JSON.parse(raw);

  if (!config.projectRoot) {
    throw new Error('Missing "projectRoot" in .release/config.json');
  }

  projectRoot = path.resolve(CWD, config.projectRoot);
  loadEngine = config.loadEngine || false;
} catch (err) {
  console.error('❌ Failed to load .release/config.json');
  console.error(err);
  process.exit(1);
}

// ---------------------------------------------
// 📦 Load dependency graph
// ---------------------------------------------
const dependencyGraphPath = path.join(
  projectRoot,
  '.release',
  'dependency-graph.json'
);

let dependencyGraph;

try {
  const raw = fs.readFileSync(dependencyGraphPath, 'utf-8');
  dependencyGraph = JSON.parse(raw);
} catch (err) {
  console.error('❌ Failed to load dependency graph');
  console.error(err);
  process.exit(1);
}

// ---------------------------------------------
// 📦 Libraries config
// ---------------------------------------------
const LIBRARIES = {
  '@sdux-vault/addons': {
    packageName: '@sdux-vault/addons',
    packagePath: 'libs/addons',
    distPath: 'dist/addons',
    versionFile: 'src/lib/version/version.register.ts',
    buildCommand: 'npm run build:addons',
    licenses: ['mit', 'community', 'commercial']
  },

  '@sdux-vault/core': {
    packageName: '@sdux-vault/core',
    packagePath: 'libs/core',
    distPath: 'dist/core',
    versionFile: 'src/lib/version/version.register.ts',
    buildCommand: 'npm run build:core',
    licenses: ['mit', 'community', 'commercial']
  },

  '@sdux-vault/angular': {
    packageName: '@sdux-vault/core-extensions/angular',
    packagePath: 'libs/core-extensions/angular',
    distPath: 'dist/core-extensions/angular',
    versionFile: 'src/lib/version/version.register.ts',
    buildCommand: 'npm run build:angular',
    licenses: ['mit']
  },

  '@sdux-vault/devtools': {
    packageName: '@sdux-vault/devtools',
    packagePath: 'libs/devtools/tooling',
    distPath: 'dist/devtools/tooling',
    versionFile: 'src/lib/version/version.register.ts',
    buildCommand: 'npm run build:devtools',
    licenses: ['mit']
  },

  '@sdux-vault/shared': {
    packageName: '@sdux-vault/shared',
    packagePath: 'libs/shared',
    distPath: 'dist/shared',
    versionFile: 'src/lib/version/version.register.ts',
    buildCommand: 'npm run build:shared',
    licenses: ['mit']
  }
  /*
  'dev-tools-ui': {
    packageName: '@sdux-vault/dev-tools-ui',
    packagePath: 'libs/dev-tools-ui',
    distPath: 'dist/dev-tools-ui',
    versionFile: null,
    buildCommand: 'npm run build:dev-tools-ui',
    licenses: ['mit']
  },

  'web-components': {
    packageName: '@sdux-vault/web-components',
    packagePath: 'libs/web-components',
    distPath: 'dist/web-components',
    versionFile: null,
    buildCommand: 'npm run build:web-components',
    licenses: ['mit']
  },
  */

  /* --------------------------------------------------
   * VAULT (DUAL LICENSE)
   * -------------------------------------------------- */
  /*
  vault: {
    packageName: '@sdux-vault/vault',
    packagePath: 'libs/vault',
    distPath: 'dist/vault',
    versionFile: null,
    buildCommand: 'npm run build:vault',
    licenses: ['community', 'commercial']
  },

  persist: {
    packageName: '@sdux-vault/persist',
    packagePath: 'libs/persist',
    distPath: 'dist/persist',
    versionFile: null,
    buildCommand: 'npm run build:persist',
    licenses: ['community', 'commercial']
  },

  encrypt: {
    packageName: '@sdux-vault/encrypt',
    packagePath: 'libs/encrypt',
    distPath: 'dist/encrypt',
    versionFile: null,
    buildCommand: 'npm run build:encrypt',
    licenses: ['community', 'commercial']
  }
    */
};

const ENGINE_LIBRARY = {
  '@sdux-vault/engine': {
    packageName: '@sdux-vault/engine',
    packagePath: 'lib',
    distPath: 'dist/engine',
    versionFile: 'src/version/version.register.ts',
    buildCommand: 'npm run build:engine',
    licenses: ['commercial'],
    isEngine: true
  }
};

function normalizeLibraries(libraries, projectRoot, engineRoot) {
  const normalized = {};

  for (const [key, lib] of Object.entries(libraries)) {
    const root = lib.isEngine ? path.resolve(engineRoot) : projectRoot;

    normalized[key] = {
      ...lib,
      root,
      packageRoot: path.join(root, lib.packagePath),
      distRoot: path.join(root, lib.distPath),
      versionFile: lib.versionFile
        ? path.join(root, lib.packagePath, lib.versionFile)
        : null
    };
  }

  return normalized;
}

// ---------------------------------------------
// Initialize Release
// ---------------------------------------------
const ALL_LIBRARIES = normalizeLibraries(
  { ...LIBRARIES, ...ENGINE_LIBRARY },
  projectRoot,
  config.engineRoot
);

const release = new Release({
  projectRoot,
  libraries: ALL_LIBRARIES,
  dependencyGraph,
  loadEngine,
  args
});

await release.run();
