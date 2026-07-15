// --- AI Model File Path (DO NOT DELETE) ---
// FilePath: tools > release > release.class.mjs
// Updated: 2026-03-25
// --- END AI MODEL FILE PATH ---

import readline from 'node:readline';
import { PlanManager } from './plan-manager.class.mjs';
import { ReleaseManager } from './release-manager.class.mjs';
import { TagManager } from './tag-manager.class.mjs';
import { ExecModule } from '../utils/exec-sync.util.mjs';

const VALID_TYPES = ['patch', 'minor', 'major'];

export class Release {
  constructor({ projectRoot, args, libraries, dependencyGraph, loadEngine }) {
    this.projectRoot = projectRoot;
    this.args = args;
    this.dependencyGraph = dependencyGraph;
    this.loadEngine = loadEngine;

    this.mode = this.parseMode(args);
    this.type = this.parseType(args);
    this.libKey = this.parseLib(args);
    this.dryRun = this.parseDryrun(args);

    this.LIBRARIES = libraries;
  }

  /* -----------------------------------------------------------
   * PARSING
   * --------------------------------------------------------- */

  parseType(args) {
    const typeArg = args.find((arg) => arg.startsWith('--type='));
    if (typeArg) return typeArg.split('=')[1];

    const typeIndex = args.indexOf('--type');
    if (typeIndex !== -1 && args[typeIndex + 1]) {
      return args[typeIndex + 1];
    }

    return undefined;
  }

  parseLib(args) {
    return args.find((arg) => arg.startsWith('--lib='))?.split('=')[1];
  }

  parseDryrun(args) {
    if (args.includes('--dry')) return true;
    if (args.includes('--live')) return false;
    return undefined;
  }

  parseMode(args) {
    const modeArg = args.find((arg) => arg.startsWith('--mode='));
    if (modeArg) return modeArg.split('=')[1];

    const modeIndex = args.indexOf('--mode');
    if (modeIndex !== -1 && args[modeIndex + 1]) {
      return args[modeIndex + 1];
    }

    return undefined;
  }

  async askForMode() {
    return new Promise((resolve) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

      console.info('\nSelect mode:\n');
      console.info('  1) Analyze (no changes, report only)');
      console.info(
        '  2) Analyze with Audit (no changes, full dependency health report)'
      );
      console.info('  3) Release (publish + update dependencies)');
      console.info('  4) Tag Release (Git Admin Only)\n');

      rl.question('Enter choice (1, 2, 3, or 4): ', (answer) => {
        rl.close();

        const normalized = answer.trim().toLowerCase();

        if (normalized === '1' || normalized === 'analyze') {
          return resolve('analyze');
        }

        if (normalized === '2' || normalized === 'audit') {
          return resolve('audit');
        }

        if (normalized === '3' || normalized === 'release') {
          return resolve('release');
        }

        if (
          normalized === '4' ||
          normalized === 'tag' ||
          normalized === 'tag release' ||
          normalized === 'tag-release'
        ) {
          return resolve('tag');
        }

        console.error('\n❌ Invalid mode selection');
        process.exit(1);
      });
    });
  }

  async askForDryRun() {
    return new Promise((resolve) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

      console.info('\nRun mode:\n');
      console.info('  1) Dry run (no files will be written)');
      console.info('  2) Real run (updates version, writes + commit)\n');

      rl.question('Enter choice (1 or 2): ', (answer) => {
        rl.close();

        const normalized = answer.trim().toLowerCase();

        if (normalized === '1' || normalized === 'dry') return resolve(true);
        if (normalized === '2' || normalized === 'real') return resolve(false);

        console.error('\n❌ Invalid Run mode selection');
        process.exit(1);
      });
    });
  }

  /* -----------------------------------------------------------
   * PROMPTS
   * --------------------------------------------------------- */

  async askForType() {
    return new Promise((resolve) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

      console.info('\nSelect release type:\n');
      console.info('  1) patch  (bug fixes)');
      console.info('  2) minor  (new features)');
      console.info('  3) major  (breaking changes)\n');

      rl.question('Enter choice (1, 2, 3) or name: ', (answer) => {
        rl.close();

        const normalized = answer.trim().toLowerCase();

        if (normalized === '1' || normalized === 'patch')
          return resolve('patch');
        if (normalized === '2' || normalized === 'minor')
          return resolve('minor');
        if (normalized === '3' || normalized === 'major')
          return resolve('major');

        console.error('\n❌ Invalid type selection');
        process.exit(1);
      });
    });
  }

  async askForLibrary() {
    return new Promise((resolve) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

      const allKeys = Object.keys(this.LIBRARIES);

      console.info('\nSelect library:\n');

      let libraries;
      if (this.loadEngine) {
        libraries = allKeys.filter((key) => this.LIBRARIES[key].isEngine);
      } else {
        libraries = allKeys.filter((key) => !this.LIBRARIES[key].isEngine);
      }

      libraries.forEach((key, i) => {
        console.info(`  ${i + 1}) ${key}`);
      });

      const filteredKeys = Object.keys(libraries);

      rl.question('\nEnter choice or name: ', (answer) => {
        rl.close();

        const normalized = answer.trim().toLowerCase();

        const index = parseInt(normalized, 10);
        if (!isNaN(index) && filteredKeys[index - 1]) {
          return resolve(libraries[index - 1]);
        }

        if (libraries[normalized]) {
          return resolve(normalized);
        }

        console.error('\n❌ Invalid library selection');
        process.exit(1);
      });
    });
  }

  /* -----------------------------------------------------------
   * MAIN
   * --------------------------------------------------------- */

  async run() {
    ExecModule.exec('clear', {
      stdio: 'inherit'
    });
    // ALWAYS confirm dry run first (safety gate)
    if (!this.mode) {
      this.mode = await this.askForMode();
    }

    if (this.mode === 'analyze' || this.mode === 'audit') {
      if (!this.dependencyGraph?.levels || !this.dependencyGraph?.libraries) {
        console.error('\n❌ Missing or invalid dependency graph\n');
        process.exit(1);
      }

      const isAudit = this.mode === 'audit';
      const label = isAudit ? 'AUDIT' : 'ANALYZE';

      console.info(`\nRunning in ${label} mode (no changes will be made)\n`);
      const manager = new PlanManager({
        graph: this.dependencyGraph,
        projectRoot: this.projectRoot,
        libraries: this.LIBRARIES
      });

      manager.run({ audit: isAudit });
    } else {
      if (this.dryRun === undefined) {
        this.dryRun = await this.askForDryRun();
      }

      if (!this.libKey) {
        this.libKey = await this.askForLibrary();
      }

      const lib = this.LIBRARIES[this.libKey];

      if (!lib) {
        console.error(`\n❌ Unknown library "${this.libKey}"\n`);
        process.exit(1);
      }

      if (this.mode === 'tag') {
        const manager = new TagManager({
          projectRoot: this.projectRoot,
          lib,
          dryRun: this.dryRun
        });

        manager.run();
        return;
      }

      if (!this.type) {
        this.type = await this.askForType();
      }

      if (!VALID_TYPES.includes(this.type)) {
        console.error(`\n❌ Invalid release type "${this.type}"`);
        process.exit(1);
      }

      const manager = new ReleaseManager({
        projectRoot: this.projectRoot,
        lib,
        type: this.type,
        dryRun: this.dryRun,
        dependencyGraph: this.dependencyGraph,
        libraries: this.LIBRARIES
      });

      manager.run();
    }
  }
}
