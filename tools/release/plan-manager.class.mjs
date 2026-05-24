// --- AI Model File Path (DO NOT DELETE) ---
// FilePath: tools > release > plan-manager.class.mjs
// Updated: 2026-04-15
// --- END AI MODEL FILE PATH ---

import fs from 'node:fs';

export class PlanManager {
  constructor({ graph, projectRoot, libraries = {} } = {}) {
    if (!graph?.levels || !graph?.libraries) {
      throw new Error('A valid dependency graph is required');
    }

    this.graph = graph;
    this.libraries = libraries;
    this.levels = graph.levels;
    this.librariesGraph = graph.libraries;
  }

  /* -----------------------------------------------------------
   * MAIN
   * --------------------------------------------------------- */

  run() {
    console.info('\nBuilding release plan...\n');

    const details = this.resolveReleaseCandidates();
    const ordered = this.orderByLevels(details.toRelease);

    this.printPlan(ordered, details);

    return ordered;
  }

  /* -----------------------------------------------------------
   * PACKAGE HELPERS
   * --------------------------------------------------------- */

  getLibraryConfig(lib) {
    return this.libraries[lib] || null;
  }

  getPackageJson(lib) {
    const config = this.getLibraryConfig(lib);

    if (!config?.packageRoot) {
      throw new Error(`Missing packageRoot for ${lib}`);
    }

    const pkgPath = `${config.packageRoot}/package.json`;

    if (!fs.existsSync(pkgPath)) return null;

    return JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
  }

  getVersionForLib(lib) {
    const pkg = this.getPackageJson(lib);
    return pkg?.version || null;
  }

  /* -----------------------------------------------------------
   * CORE LOGIC (FULL GRAPH SCAN)
   * --------------------------------------------------------- */

  resolveReleaseCandidates() {
    const toRelease = new Set();
    const reasons = {};
    const details = {};

    const packageCache = {};
    const versions = {};

    for (const lib of Object.keys(this.libraries)) {
      const pkg = this.getPackageJson(lib);

      if (!pkg) {
        throw new Error(`Could not resolve package.json for ${lib}`);
      }

      if (!pkg.version) {
        throw new Error(`Missing version in package.json for ${lib}`);
      }

      packageCache[lib] = pkg;
      versions[lib] = pkg.version;
    }

    for (const lib of Object.keys(this.librariesGraph)) {
      const pkg = packageCache[lib];

      if (!pkg) {
        throw new Error(`Missing package cache for ${lib}`);
      }

      const deps = pkg.dependencies || {};
      const peerDeps = pkg.peerDependencies || {};
      const devDeps = pkg.devDependencies || {};

      const allDeps = { ...deps, ...peerDeps, ...devDeps };

      for (const dep of Object.keys(allDeps)) {
        if (!this.librariesGraph[dep]) continue;

        const expectedVersion = versions[dep];
        const actualVersion = allDeps[dep];

        if (!expectedVersion) {
          throw new Error(`Missing expected version for ${dep}`);
        }
        if (actualVersion === expectedVersion) continue;

        toRelease.add(lib);

        if (!reasons[lib]) reasons[lib] = [];
        if (!details[lib]) {
          details[lib] = {
            packageVersion: pkg.version || null,
            mismatches: []
          };
        }

        reasons[lib].push(
          `${dep} version mismatch (${actualVersion} → ${expectedVersion})`
        );

        details[lib].mismatches.push({
          dependency: dep,
          actualVersion,
          expectedVersion
        });
      }
    }

    const cascaded = this.cascadeDependents(toRelease, reasons, details);

    return {
      toRelease: cascaded,
      reasons,
      details
    };
  }

  /* -----------------------------------------------------------
   * CASCADE (DEPENDENTS)
   * --------------------------------------------------------- */

  cascadeDependents(initialSet, reasons, details) {
    const result = new Set(initialSet);

    const visit = (lib) => {
      const node = this.librariesGraph[lib];
      if (!node) return;

      for (const dependent of node.dependents || []) {
        if (!result.has(dependent)) {
          result.add(dependent);

          if (!reasons[dependent]) reasons[dependent] = [];
          reasons[dependent].push(`Dependent of ${lib}`);

          if (!details[dependent]) {
            const pkg = this.getPackageJson(dependent);

            details[dependent] = {
              packageVersion: pkg?.version || null,
              mismatches: []
            };
          }

          visit(dependent);
        }
      }
    };

    for (const lib of initialSet) {
      visit(lib);
    }

    return result;
  }

  /* -----------------------------------------------------------
   * ORDERING (CRITICAL)
   * --------------------------------------------------------- */

  orderByLevels(affectedSet) {
    const ordered = [];

    for (const level of this.levels) {
      const group = level.filter((lib) => affectedSet.has(lib));

      if (group.length > 0) {
        ordered.push(group);
      }
    }

    return ordered;
  }

  /* -----------------------------------------------------------
   * OUTPUT
   * --------------------------------------------------------- */

  printPlan(orderedLevels, resolved = {}) {
    const { reasons = {}, details = {} } = resolved;

    if (orderedLevels.length === 0) {
      console.info('No libraries require release.\n');
      return;
    }

    console.info('Release Plan (cascading):\n');

    orderedLevels.forEach((level, index) => {
      console.info(`Level ${index}:`);

      level.forEach((lib) => {
        const info = details[lib];
        const versionLabel = info?.packageVersion
          ? ` [${info.packageVersion}]`
          : '';

        console.info(`  - ${lib}${versionLabel}`);
        reasons[lib]?.forEach((reason) => {
          console.info(`\t ${reason}`);
        });
      });

      console.info('');
    });

    console.info('✔ Plan complete\n');
  }
}
