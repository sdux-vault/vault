// --- AI Model File Path (DO NOT DELETE) ---
// FilePath: tools > release > release.class.mjs
// Updated: 2026-03-24
// --- END AI MODEL FILE PATH ---

import fs from 'node:fs';
import path from 'node:path';
import { ExecModule } from '../utils/exec-sync.util.mjs';
import { LicenseUtil } from '../utils/license.util.mjs';
import { PlanManager } from './plan-manager.class.mjs';
import { ReleaseUpdateVersion } from './release.update-version.class.mjs';

const VALID_VERSION_TYPES = ['patch', 'minor', 'major'];

export class ReleaseManager {
  constructor({
    projectRoot,
    lib,
    type,
    dryRun = false,
    dependencyGraph,
    libraries
  }) {
    if (!projectRoot) {
      throw new Error('projectRoot is required');
    }

    this.projectRoot = projectRoot;
    this.lib = lib;

    this.dependencyGraph = dependencyGraph;
    this.libraries = libraries;

    // Create PlanManager for version resolution
    if (dependencyGraph && libraries) {
      this.planManager = new PlanManager({
        graph: dependencyGraph,
        projectRoot,
        libraries
      });
    }

    this.packageName = lib.packageName;
    this.packagePath = lib.packageRoot;
    this.distPath = lib.distRoot;
    this.versionFile = lib.versionFile;

    if (!type) {
      throw new Error('Release type is required (patch | minor | major)');
    }

    if (!VALID_VERSION_TYPES.includes(type)) {
      throw new Error(
        `Invalid release type "${type}". Must be one of: ${VALID_VERSION_TYPES.join(', ')}`
      );
    }

    this.type = type;
    this.dryRun = dryRun;
  }

  run() {
    if (!this.dryRun) {
      this.precheck();
    }
    console.info(`Starting release for ${this.packageName}`);

    if (this.dryRun) {
      console.info('⚠️  Running in DRY RUN mode\n');
    } else {
      console.info('');
    }

    this.clean();
    this.buildDependencies();
    this.verify();
    this.version();
    this.push();
    this.build();
    this.applyLicenses();
    this.inspect();
    this.pack();

    if (this.dryRun) {
      console.info('\nDry-run complete');
    } else {
      console.info('\nRelease complete');
    }
  }

  exec(command, ignoreDryRun = false) {
    console.info(`\n${command}`);

    if (this.dryRun && !ignoreDryRun) {
      console.info('⚠️  [dry-run] command not executed');
      return;
    }
    ExecModule.exec(command, {
      stdio: 'inherit'
    });
  }

  clean() {
    console.info('\nCleaning workspace...');
    this.exec('npm run clean');
  }

  verify() {
    console.info('\nVerifying code quality...');
    this.exec('npm run verify');
  }

  packageVersion() {
    console.info(`\nBumping package version (${this.type})...`);

    const releaseUpdateVersion = new ReleaseUpdateVersion({
      packageRoot: this.packagePath,
      versionFile: this.lib.versionFile,
      graph: this.dependencyGraph,
      getVersionForLib: this.planManager?.getVersionForLib.bind(
        this.planManager
      ),
      dryRun: this.dryRun
    });

    releaseUpdateVersion.run();

    return this.versionFile;
  }

  version() {
    console.info(`\nBumping version (${this.type})...`);

    const pkgPath = this.packagePath;

    // bump version (preserves prerelease suffix like -beta, -rc, etc.)
    const pkgJsonPath = path.join(pkgPath, 'package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'));
    const [semver, suffix] = pkg.version.split('-', 2);
    const [major, minor, patch] = semver.split('.').map(Number);

    const bumped =
      this.type === 'major'
        ? `${major + 1}.0.0`
        : this.type === 'minor'
          ? `${major}.${minor + 1}.0`
          : `${major}.${minor}.${patch + 1}`;

    pkg.version = suffix ? `${bumped}-${suffix}` : bumped;
    fs.writeFileSync(pkgJsonPath, JSON.stringify(pkg, null, 2) + '\n');

    const versionReleasePath = this.packageVersion();

    // normalize for git add (relative to repo root)
    const repoRoot = process.cwd();

    const relativePkgPath = path.relative(repoRoot, `${pkgPath}/package.json`);

    const relativeVersionPath = path.relative(repoRoot, versionReleasePath);

    this.exec(`git add ${relativePkgPath} ${relativeVersionPath}`);

    // commit (dynamic name)
    const libName = this.packageName.split('/').pop();

    this.exec(`git commit -m "chore(${libName}): release version bump"`);

    // tag
    this.exec(`git tag ${libName}@${pkg.version}`);
  }

  push() {
    console.info('\nPushing changes + tags...');
    this.exec('HUSKY=0 git push --follow-tags');
  }

  buildDependencies() {
    if (this.lib.isEngine) return;
    const dependencies = [
      'build:shared',
      'build:devtools',
      'build:core',
      'build:addons',
      'build:angular'
    ];

    console.info(`\nBuilding ${dependencies.join(' ')}...`);
    for (let depencency of dependencies) {
      this.exec(`npm run ${depencency}`, true);
    }
  }

  build() {
    console.info(`\nBuilding ${this.packageName}...`);
    this.exec(this.lib.buildCommand, true);
  }

  inspect() {
    console.info('\nInspecting build output...');

    if (!fs.existsSync(this.distPath)) {
      throw new Error(`dist path not found: ${this.distPath}`);
    }

    const files = fs.readdirSync(this.distPath, { recursive: true });

    // Required metadata
    const required = ['package.json', 'README.md', 'LICENSE'];

    for (const file of required) {
      if (!files.includes(file)) {
        throw new Error(`Missing required file: ${file}`);
      }
    }
    // Ensure compiled output exists
    const hasCode = files.some(
      (file) =>
        file.endsWith('.js') || file.endsWith('.mjs') || file.endsWith('.cjs')
    );

    if (!hasCode) {
      throw new Error('No compiled output found (missing JS bundles)');
    }

    console.info('Build output looks good');
  }

  precheck() {
    console.info('\nChecking for uncommitted changes...');

    try {
      ExecModule.exec('git diff --quiet');
    } catch {
      throw new Error(
        'Uncommitted changes detected. Please commit or stash before releasing.'
      );
    }
  }

  pack() {
    console.info('\nCreating tarball...');
    this.exec(`cd ${this.distPath} && npm pack`, true);
  }

  applyLicenses() {
    console.info('\nApplying licenses...');

    const licenseTypes = this.lib.licenses;

    if (!licenseTypes || licenseTypes.length === 0) {
      console.info('No licenses configured → skipping');
      return;
    }

    const licensePath = path.join(this.distPath, 'LICENSE');

    // build combined license content
    const licenseContent = licenseTypes
      .map((type) => {
        try {
          return LicenseUtil.load(type);
        } catch (err) {
          throw new Error(`Failed to load license "${type}": ${err.message}`);
        }
      })
      .join('\n\n---\n\n');

    if (this.dryRun) {
      console.info(`⚠️  [dry-run] writes LICENSE (${licenseTypes.join(', ')})`);
    }

    fs.writeFileSync(licensePath, licenseContent, 'utf-8');

    console.info(`LICENSE written (${licenseTypes.join(', ')})`);
  }
}
