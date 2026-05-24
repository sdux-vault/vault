#!/usr/bin/env node
// --- AI Model FILE PATH (DO NOT DELETE) ---
// FilePath: tools > release > release.update-version.mjs
// Updated: 2026-04-15
// --- END AI MODEL FILE PATH ---

import fs from 'node:fs';
import path from 'node:path';
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

try {
  const raw = fs.readFileSync(configPath, 'utf-8');
  const config = JSON.parse(raw);

  if (!config.projectRoot) {
    throw new Error('Missing "projectRoot" in .release/config.json');
  }
} catch (err) {
  console.error('❌ Failed to load .release/config.json');
  console.error(err);
  process.exit(1);
}

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

const updater = new ReleaseUpdateVersion({
  packageRoot,
  versionFile: resolvedVersionFile,
  dryRun
});

updater.run();
