#!/usr/bin/env node
// --- AI Model FILE PATH (DO NOT DELETE) ---
// FilePath: tools > release > release.update-version.mjs
// Updated: 2026-04-15
// --- END AI MODEL FILE PATH ---

import fs from 'node:fs';
import path from 'node:path';
import { PlanManager } from './plan-manager.class.mjs';
import { ReleaseUpdateVersion } from './release.update-version.class.mjs';

/* -----------------------------------------------------------
 * ARGS
 * --------------------------------------------------------- */

const args = process.argv.slice(2);

const versionFile =
  process.env.VERSION_FILE ||
  args.find((a) => a.startsWith('--version-file='))?.split('=')[1];

const dryRun = args.includes('--dry');

const packageRootArg =
  process.env.PACKAGE_ROOT ||
  args.find((a) => a.startsWith('--package-root='))?.split('=')[1];

/* -----------------------------------------------------------
 * CONFIG RESOLUTION
 * --------------------------------------------------------- */

const CWD = process.cwd();
const configPath = path.join(CWD, '.release', 'config.json');

let config;

try {
  const raw = fs.readFileSync(configPath, 'utf-8');
  config = JSON.parse(raw);

  if (!config.projectRoot) {
    throw new Error('Missing "projectRoot" in .release/config.json');
  }
} catch (err) {
  console.error('❌ Failed to load .release/config.json');
  console.error(err);
  process.exit(1);
}

const projectRoot = path.resolve(CWD, config.projectRoot);
const engineRoot = config.engineRoot
  ? path.resolve(CWD, config.engineRoot)
  : null;

/* -----------------------------------------------------------
 * DEPENDENCY GRAPH
 * --------------------------------------------------------- */

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

/* -----------------------------------------------------------
 * LIBRARIES CONFIG
 * --------------------------------------------------------- */

const LIBRARIES = {
  '@sdux-vault/addons': {
    packageName: '@sdux-vault/addons',
    packagePath: 'libs/addons',
    versionFile: 'src/lib/version/version.register.ts'
  },

  '@sdux-vault/core': {
    packageName: '@sdux-vault/core',
    packagePath: 'libs/core',
    versionFile: 'src/lib/version/version.register.ts'
  },

  '@sdux-vault/angular': {
    packageName: '@sdux-vault/core-extensions/angular',
    packagePath: 'libs/core-extensions/angular',
    versionFile: 'src/lib/version/version.register.ts'
  },

  '@sdux-vault/devtools': {
    packageName: '@sdux-vault/devtools',
    packagePath: 'libs/devtools/tooling',
    versionFile: 'src/lib/version/version.register.ts'
  },

  '@sdux-vault/shared': {
    packageName: '@sdux-vault/shared',
    packagePath: 'libs/shared',
    versionFile: 'src/lib/version/version.register.ts'
  }
};

const ENGINE_LIBRARY = {
  '@sdux-vault/engine': {
    packageName: '@sdux-vault/engine',
    packagePath: 'lib',
    versionFile: 'src/version/version.register.ts',
    isEngine: true
  }
};

function normalizeLibraries(libraries) {
  const normalized = {};

  for (const [key, lib] of Object.entries(libraries)) {
    const root = lib.isEngine && engineRoot ? engineRoot : projectRoot;

    normalized[key] = {
      ...lib,
      root,
      packageRoot: path.join(root, lib.packagePath)
    };
  }

  return normalized;
}

const ALL_LIBRARIES = normalizeLibraries({ ...LIBRARIES, ...ENGINE_LIBRARY });

/* -----------------------------------------------------------
 * PACKAGE ROOT RESOLUTION
 * --------------------------------------------------------- */

if (!packageRootArg) {
  console.error('❌ Missing package root');
  process.exit(1);
}

const packageRoot = path.resolve(CWD, packageRootArg);

const resolvedVersionFile = versionFile
  ? path.resolve(packageRoot, versionFile)
  : null;

/* -----------------------------------------------------------
 * RUN
 * --------------------------------------------------------- */

const planManager = new PlanManager({
  graph: dependencyGraph,
  projectRoot,
  libraries: ALL_LIBRARIES
});

const updater = new ReleaseUpdateVersion({
  packageRoot,
  versionFile: resolvedVersionFile,
  graph: dependencyGraph,
  getVersionForLib: planManager.getVersionForLib.bind(planManager),
  dryRun
});

updater.run();
