// --- AI Model File Path (DO NOT DELETE) ---
// FilePath: tools > release > tag-manager.class.mjs
// Updated: 2026-07-15
// --- END AI MODEL FILE PATH ---

import fs from 'node:fs';
import path from 'node:path';
import { ExecModule } from '../utils/exec-sync.util.mjs';

export class TagManager {
  constructor({ projectRoot, lib, dryRun = false }) {
    if (!projectRoot) {
      throw new Error('projectRoot is required');
    }

    if (!lib) {
      throw new Error('Library is required');
    }

    this.projectRoot = projectRoot;
    this.packageName = lib.packageName;
    this.packagePath = lib.packageRoot;
    this.dryRun = dryRun;
  }

  run() {
    if (!this.dryRun) {
      this.precheck();
    }

    const { libName, version, tag } = this.getTagDetails();

    console.info(`Starting tag release for ${this.packageName}`);

    if (this.dryRun) {
      console.info('\n\n⚠️  Running in DRY RUN mode\n');
    } else {
      console.info('');
    }

    this.createTag(tag, libName, version);
    this.pushTag(tag);

    if (this.dryRun) {
      console.info('\nTag release dry-run complete');
    } else {
      console.info('\nTag release complete');
    }
  }

  exec(command) {
    console.info(`\n${command}`);

    if (this.dryRun) {
      console.info('⚠️  [dry-run] command not executed');
      return;
    }

    ExecModule.exec(command, {
      stdio: 'inherit'
    });
  }

  getTagDetails() {
    const packageJsonPath = path.join(this.packagePath, 'package.json');
    const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

    if (!pkg.version) {
      throw new Error(`Missing version in ${packageJsonPath}`);
    }

    const libName = this.packageName.split('/').pop();

    return {
      libName,
      version: pkg.version,
      tag: `${libName}@${pkg.version}`
    };
  }

  createTag(tag, libName, version) {
    console.info('\nCreating tag...');
    const command = `git tag -a ${tag} -m "${libName} ${version}"`;

    if (this.dryRun) {
      console.info(`\n${command}`);
      return;
    }

    this.exec(command);
  }

  pushTag(tag) {
    console.info('\nPushing tag...');
    const command = `git push origin ${tag} --no-verify`;
    if (this.dryRun) {
      console.info(`\n${command}`);
      return;
    }

    this.exec(command);
  }

  precheck() {
    console.info('\nChecking for uncommitted changes...');

    try {
      ExecModule.exec('git diff --quiet');
    } catch {
      throw new Error(
        'Uncommitted changes detected. Please commit or stash before tagging.'
      );
    }
  }
}
