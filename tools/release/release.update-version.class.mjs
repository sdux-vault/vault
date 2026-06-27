// --- AI Model File Path (DO NOT DELETE) ---
// FilePath: tools > release > release.update-version.class.mjs
// Updated: 2026-03-25
// --- END AI MODEL FILE PATH ---

import fs from 'node:fs';
import path from 'node:path';
import semver from 'semver';

export class ReleaseUpdateVersion {
  constructor({
    packageRoot,
    versionFile,
    graph,
    getVersionForLib,
    dryRun = false
  }) {
    if (!packageRoot) {
      throw new Error('packageRoot is required');
    }

    this.packageRoot = packageRoot;
    this.versionFile = versionFile;
    this.graph = graph;
    this.getVersionForLib = getVersionForLib;
    this.dryRun = dryRun;
  }

  run() {
    const version = this.getVersion();

    this.syncDependencies();

    if (!this.versionFile) {
      console.info('\nNo version file provided → skipping sync');
      return;
    }

    this.updateVersionFile(version);
  }

  syncDependencies() {
    if (!this.graph || !this.getVersionForLib) {
      console.info('\nNo dependency graph provided → skipping dependency sync');
      return;
    }

    const packageJsonPath = path.join(this.packageRoot, 'package.json');

    const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

    const depSections = ['dependencies', 'peerDependencies', 'devDependencies'];
    let changed = false;

    console.info('\nSyncing dependencies...');

    for (const section of depSections) {
      const deps = pkg[section] || {};

      for (const dep of Object.keys(deps)) {
        if (!this.graph.libraries[dep]) continue;

        const targetVersion = this.getVersionForLib(dep);
        const currentVersion = deps[dep];
        const resolvedTarget = `^${targetVersion}`;

        if (
          !targetVersion ||
          currentVersion === resolvedTarget ||
          semver.satisfies(targetVersion, currentVersion)
        )
          continue;

        if (this.dryRun) {
          console.info(
            `⚠️  [dry-run] would update ${dep} (${currentVersion} → ${resolvedTarget})`
          );
          continue;
        }

        deps[dep] = resolvedTarget;
        changed = true;

        console.info(`Updated ${dep} → ${resolvedTarget}`);
      }
    }

    if (!changed) {
      console.info('Dependencies already up to date');
      return;
    }

    if (!this.dryRun) {
      fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2) + '\n');
    }
  }

  getVersion() {
    const packageJsonPath = path.join(this.packageRoot, 'package.json');

    if (!fs.existsSync(packageJsonPath)) {
      throw new Error(`package.json not found at ${packageJsonPath}`);
    }

    const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

    return pkg.version;
  }

  updateVersionFile(version) {
    const versionFilePath = this.versionFile;

    if (!fs.existsSync(versionFilePath)) {
      throw new Error(`version file not found: ${versionFilePath}`);
    }

    console.info('\nSyncing version file...');

    const content = fs.readFileSync(versionFilePath, 'utf-8');

    const updated = content.replace(
      /const\s+\w+_VERSION\s*=\s*['"`].*?['"`];/,
      (match) => match.replace(/['"`].*?['"`]/, `'${version}'`)
    );

    if (content === updated) {
      console.info('Version already up to date');
      return;
    }

    if (this.dryRun) {
      console.info(`⚠️  [dry-run] would update version to ${version}`);
      return;
    }

    fs.writeFileSync(versionFilePath, updated);

    console.info(`Updated version file → ${version}`);
  }
}
