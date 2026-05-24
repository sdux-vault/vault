import fs from 'node:fs';
import { PlanManager } from '../plan-manager.class.mjs';

describe('PlanManager', () => {
  let manager;
  let consoleInfo;

  const libraries = {
    shared: { packageRoot: '/repo/libs/shared' },
    devtools: { packageRoot: '/repo/libs/devtools' },
    engine: { packageRoot: '/repo/libs/engine' },
    core: { packageRoot: '/repo/libs/core' }
  };

  const graph = {
    levels: [['shared'], ['devtools'], ['engine'], ['core']],
    libraries: {
      shared: { dependents: ['devtools', 'engine', 'core'] },
      devtools: { dependents: ['engine'] },
      engine: { dependents: ['core'] },
      core: { dependents: [] }
    }
  };

  beforeEach(() => {
    consoleInfo = [];

    spyOn(console, 'info').and.callFake((msg) => {
      consoleInfo.push(msg.replace(/\n/g, ''));
    });

    spyOn(fs, 'existsSync').and.returnValue(true);

    spyOn(fs, 'readFileSync').and.callFake((file) => {
      if (file.includes('shared')) {
        return JSON.stringify({ version: '1.0.0' });
      }

      if (file.includes('devtools')) {
        return JSON.stringify({
          version: '1.0.0',
          dependencies: { shared: '0.9.0' }
        });
      }

      if (file.includes('engine')) {
        return JSON.stringify({
          version: '1.0.0',
          dependencies: { devtools: '1.0.0' }
        });
      }

      if (file.includes('core')) {
        return JSON.stringify({
          version: '1.0.0',
          dependencies: { shared: '1.0.0' }
        });
      }

      return '{}';
    });

    manager = new PlanManager({
      graph,
      projectRoot: '/repo',
      libraries: structuredClone(libraries)
    });
  });

  /* -----------------------------------------------------------
   * CONSTRUCTOR
   * --------------------------------------------------------- */

  it('throws if graph is invalid', () => {
    expect(() => {
      new PlanManager({});
    }).toThrowError();
  });

  /* -----------------------------------------------------------
   * PACKAGE JSON
   * --------------------------------------------------------- */

  it('reads package.json using normalized packageRoot', () => {
    const pkg = manager.getPackageJson('shared');

    expect(pkg).toEqual({ version: '1.0.0' });
  });

  it('returns null when package.json missing', () => {
    fs.existsSync.and.returnValue(false);

    const result = manager.getPackageJson('shared');

    expect(result).toEqual(null);
  });

  it('throws when packageRoot missing', () => {
    manager.libraries.shared = {};

    expect(() => manager.getPackageJson('shared')).toThrowError();
  });

  /* -----------------------------------------------------------
   * RESOLVE RELEASE CANDIDATES
   * --------------------------------------------------------- */

  it('detects version mismatches correctly', () => {
    const { toRelease, reasons, details } = manager.resolveReleaseCandidates();

    expect(Array.from(toRelease)).toEqual(['devtools', 'engine', 'core']);

    expect(reasons.devtools).toEqual([
      'shared version mismatch (0.9.0 → 1.0.0)'
    ]);

    expect(details.devtools).toEqual({
      packageVersion: '1.0.0',
      mismatches: [
        {
          dependency: 'shared',
          actualVersion: '0.9.0',
          expectedVersion: '1.0.0'
        }
      ]
    });
  });

  it('throws when package.json cannot be resolved', () => {
    spyOn(manager, 'getPackageJson').and.returnValue(null);

    expect(() => manager.resolveReleaseCandidates()).toThrowError();
  });

  it('throws when version missing', () => {
    fs.readFileSync.and.returnValue(JSON.stringify({}));

    expect(() => manager.resolveReleaseCandidates()).toThrowError();
  });

  it('throws when expected version missing', () => {
    manager.libraries = { devtools: libraries.devtools };

    expect(() => manager.resolveReleaseCandidates()).toThrowError();
  });

  it('detects version mismatches in peerDependencies', () => {
    fs.readFileSync.and.callFake((file) => {
      if (file.includes('shared')) {
        return JSON.stringify({ version: '1.0.0' });
      }

      if (file.includes('devtools')) {
        return JSON.stringify({
          version: '1.0.0',
          peerDependencies: { shared: '0.9.0' }
        });
      }

      if (file.includes('engine')) {
        return JSON.stringify({
          version: '1.0.0',
          dependencies: { devtools: '1.0.0' }
        });
      }

      if (file.includes('core')) {
        return JSON.stringify({
          version: '1.0.0',
          dependencies: { shared: '1.0.0' }
        });
      }

      return '{}';
    });

    manager = new PlanManager({
      graph,
      projectRoot: '/repo',
      libraries: structuredClone(libraries)
    });

    const { toRelease, reasons } = manager.resolveReleaseCandidates();

    expect(Array.from(toRelease)).toEqual(['devtools', 'engine', 'core']);

    expect(reasons.devtools).toEqual([
      'shared version mismatch (0.9.0 → 1.0.0)'
    ]);
  });

  it('detects version mismatches in devDependencies', () => {
    fs.readFileSync.and.callFake((file) => {
      if (file.includes('shared')) {
        return JSON.stringify({ version: '1.0.0' });
      }

      if (file.includes('devtools')) {
        return JSON.stringify({
          version: '1.0.0',
          devDependencies: { shared: '0.8.0' }
        });
      }

      if (file.includes('engine')) {
        return JSON.stringify({
          version: '1.0.0',
          dependencies: { devtools: '1.0.0' }
        });
      }

      if (file.includes('core')) {
        return JSON.stringify({
          version: '1.0.0',
          dependencies: { shared: '1.0.0' }
        });
      }

      return '{}';
    });

    manager = new PlanManager({
      graph,
      projectRoot: '/repo',
      libraries: structuredClone(libraries)
    });

    const { toRelease, reasons } = manager.resolveReleaseCandidates();

    expect(Array.from(toRelease)).toEqual(['devtools', 'engine', 'core']);

    expect(reasons.devtools).toEqual([
      'shared version mismatch (0.8.0 → 1.0.0)'
    ]);
  });

  /* -----------------------------------------------------------
   * CASCADE
   * --------------------------------------------------------- */

  it('cascades dependents correctly', () => {
    const { toRelease } = manager.resolveReleaseCandidates();

    expect(Array.from(toRelease)).toEqual(['devtools', 'engine', 'core']);
  });

  /* -----------------------------------------------------------
   * ORDERING
   * --------------------------------------------------------- */

  it('orders libraries by levels', () => {
    const ordered = manager.orderByLevels(
      new Set(['devtools', 'engine', 'core'])
    );

    expect(ordered).toEqual([['devtools'], ['engine'], ['core']]);
  });

  /* -----------------------------------------------------------
   * PRINT PLAN
   * --------------------------------------------------------- */

  it('prints full plan with versions and reasons', () => {
    const resolved = manager.resolveReleaseCandidates();
    const ordered = manager.orderByLevels(resolved.toRelease);

    manager.printPlan(ordered, resolved);

    expect(consoleInfo).toEqual([
      'Release Plan (cascading):',
      'Level 0:',
      '  - devtools [1.0.0]',
      '\t shared version mismatch (0.9.0 → 1.0.0)',
      '',
      'Level 1:',
      '  - engine [1.0.0]',
      '\t Dependent of devtools',
      '',
      'Level 2:',
      '  - core [1.0.0]',
      '\t Dependent of engine',
      '',
      '✔ Plan complete'
    ]);
  });

  it('prints empty plan correctly', () => {
    manager.printPlan([]);

    expect(consoleInfo).toEqual(['No libraries require release.']);
  });

  /* -----------------------------------------------------------
   * RUN
   * --------------------------------------------------------- */

  it('runs full plan flow', () => {
    const result = manager.run();

    expect(result).toEqual([['devtools'], ['engine'], ['core']]);

    expect(consoleInfo).toEqual([
      'Building release plan...',
      'Release Plan (cascading):',
      'Level 0:',
      '  - devtools [1.0.0]',
      '\t shared version mismatch (0.9.0 → 1.0.0)',
      '',
      'Level 1:',
      '  - engine [1.0.0]',
      '\t Dependent of devtools',
      '',
      'Level 2:',
      '  - core [1.0.0]',
      '\t Dependent of engine',
      '',
      '✔ Plan complete'
    ]);
  });
});
