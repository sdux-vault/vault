import fs from 'node:fs';
import { ReleaseUpdateVersion } from '../release.update-version.class.mjs';

describe('CLI: release.update-version', () => {
  let updater;
  let consoleInfo;
  let readFileSyncFiles;
  let writeFileSyncCalls;
  let existsSyncValues;

  beforeEach(() => {
    consoleInfo = [];
    readFileSyncFiles = [];
    writeFileSyncCalls = [];
    existsSyncValues = [];

    spyOn(console, 'info').and.callFake((msg) => {
      consoleInfo.push(msg.replace(/\n/g, ''));
    });

    spyOn(fs, 'existsSync').and.callFake(() => existsSyncValues.shift());
    spyOn(fs, 'readFileSync').and.callFake(() => readFileSyncFiles.shift());
    spyOn(fs, 'writeFileSync').and.callFake((file, content) => {
      writeFileSyncCalls.push({ file, content });
    });

    updater = new ReleaseUpdateVersion({
      packageRoot: '/repo',
      versionFile: '/repo/version.ts'
    });
  });

  /* -----------------------------------------------------------
   * CONSTRUCTOR
   * --------------------------------------------------------- */

  it('throws if packageRoot missing', () => {
    expect(() => {
      new ReleaseUpdateVersion({});
    }).toThrowError('packageRoot is required');
  });

  /* -----------------------------------------------------------
   * getVersion()
   * --------------------------------------------------------- */

  it('returns version from package.json using normalized path', () => {
    existsSyncValues = [true];
    readFileSyncFiles = [JSON.stringify({ version: '1.2.3' })];

    const version = updater.getVersion();

    expect(version).toEqual('1.2.3');
  });

  it('throws if package.json missing', () => {
    existsSyncValues = [false];

    expect(() => updater.getVersion()).toThrowError(
      'package.json not found at /repo/package.json'
    );
  });

  /* -----------------------------------------------------------
   * syncDependencies()
   * --------------------------------------------------------- */

  it('skips when graph missing', () => {
    updater = new ReleaseUpdateVersion({
      packageRoot: '/repo'
    });

    updater.syncDependencies();

    expect(consoleInfo).toEqual([
      'No dependency graph provided → skipping dependency sync'
    ]);
  });

  it('updates dependency when mismatch exists', () => {
    updater = new ReleaseUpdateVersion({
      packageRoot: '/repo',
      graph: {
        libraries: {
          shared: {}
        }
      },
      getVersionForLib: () => '2.0.0'
    });

    readFileSyncFiles = [
      JSON.stringify({
        dependencies: {
          shared: '1.0.0'
        }
      })
    ];

    updater.syncDependencies();

    expect(consoleInfo).toEqual([
      'Syncing dependencies...',
      'Updated shared → ^2.0.0'
    ]);

    expect(writeFileSyncCalls.length).toEqual(1);

    const written = JSON.parse(writeFileSyncCalls[0].content);
    expect(written.dependencies.shared).toEqual('^2.0.0');
  });

  it('skips update when versions match', () => {
    updater = new ReleaseUpdateVersion({
      packageRoot: '/repo',
      graph: {
        libraries: {
          shared: {}
        }
      },
      getVersionForLib: () => '1.0.0'
    });

    readFileSyncFiles = [
      JSON.stringify({
        dependencies: {
          shared: '^1.0.0'
        }
      })
    ];

    updater.syncDependencies();

    expect(consoleInfo).toEqual([
      'Syncing dependencies...',
      'Dependencies already up to date'
    ]);

    expect(writeFileSyncCalls).toEqual([]);
  });

  it('skips update when existing range already satisfies target version', () => {
    updater = new ReleaseUpdateVersion({
      packageRoot: '/repo',
      graph: {
        libraries: {
          shared: {}
        }
      },
      getVersionForLib: () => '1.0.1'
    });

    readFileSyncFiles = [
      JSON.stringify({
        dependencies: {
          shared: '^1.0.0'
        }
      })
    ];

    updater.syncDependencies();

    expect(consoleInfo).toEqual([
      'Syncing dependencies...',
      'Dependencies already up to date'
    ]);

    expect(writeFileSyncCalls).toEqual([]);
  });

  it('ignores dependencies not in graph', () => {
    updater = new ReleaseUpdateVersion({
      packageRoot: '/repo',
      graph: {
        libraries: {}
      },
      getVersionForLib: () => '2.0.0'
    });

    readFileSyncFiles = [
      JSON.stringify({
        dependencies: {
          random: '1.0.0'
        }
      })
    ];

    updater.syncDependencies();

    expect(consoleInfo).toEqual([
      'Syncing dependencies...',
      'Dependencies already up to date'
    ]);

    expect(writeFileSyncCalls).toEqual([]);
  });

  it('dry-run does not write dependencies', () => {
    updater = new ReleaseUpdateVersion({
      packageRoot: '/repo',
      graph: {
        libraries: {
          shared: {}
        }
      },
      getVersionForLib: () => '2.0.0',
      dryRun: true
    });

    readFileSyncFiles = [
      JSON.stringify({
        dependencies: {
          shared: '1.0.0'
        }
      })
    ];

    updater.syncDependencies();

    expect(consoleInfo).toEqual([
      'Syncing dependencies...',
      '⚠️  [dry-run] would update shared (1.0.0 → ^2.0.0)',
      'Dependencies already up to date'
    ]);

    expect(writeFileSyncCalls).toEqual([]);
  });

  it('updates peerDependencies when mismatch exists', () => {
    updater = new ReleaseUpdateVersion({
      packageRoot: '/repo',
      graph: {
        libraries: {
          shared: {}
        }
      },
      getVersionForLib: () => '2.0.0'
    });

    readFileSyncFiles = [
      JSON.stringify({
        peerDependencies: {
          shared: '1.0.0'
        }
      })
    ];

    updater.syncDependencies();

    expect(consoleInfo).toEqual([
      'Syncing dependencies...',
      'Updated shared → ^2.0.0'
    ]);

    expect(writeFileSyncCalls.length).toEqual(1);

    const written = JSON.parse(writeFileSyncCalls[0].content);
    expect(written.peerDependencies.shared).toEqual('^2.0.0');
  });

  it('updates devDependencies when mismatch exists', () => {
    updater = new ReleaseUpdateVersion({
      packageRoot: '/repo',
      graph: {
        libraries: {
          shared: {}
        }
      },
      getVersionForLib: () => '2.0.0'
    });

    readFileSyncFiles = [
      JSON.stringify({
        devDependencies: {
          shared: '1.0.0'
        }
      })
    ];

    updater.syncDependencies();

    expect(consoleInfo).toEqual([
      'Syncing dependencies...',
      'Updated shared → ^2.0.0'
    ]);

    expect(writeFileSyncCalls.length).toEqual(1);

    const written = JSON.parse(writeFileSyncCalls[0].content);
    expect(written.devDependencies.shared).toEqual('^2.0.0');
  });

  it('updates all dependency sections when mismatches exist', () => {
    updater = new ReleaseUpdateVersion({
      packageRoot: '/repo',
      graph: {
        libraries: {
          shared: {},
          devtools: {}
        }
      },
      getVersionForLib: () => '2.0.0'
    });

    readFileSyncFiles = [
      JSON.stringify({
        dependencies: {
          shared: '1.0.0'
        },
        peerDependencies: {
          shared: '1.0.0'
        },
        devDependencies: {
          devtools: '1.0.0'
        }
      })
    ];

    updater.syncDependencies();

    expect(consoleInfo).toEqual([
      'Syncing dependencies...',
      'Updated shared → ^2.0.0',
      'Updated shared → ^2.0.0',
      'Updated devtools → ^2.0.0'
    ]);

    expect(writeFileSyncCalls.length).toEqual(1);

    const written = JSON.parse(writeFileSyncCalls[0].content);
    expect(written.dependencies.shared).toEqual('^2.0.0');
    expect(written.peerDependencies.shared).toEqual('^2.0.0');
    expect(written.devDependencies.devtools).toEqual('^2.0.0');
  });

  /* -----------------------------------------------------------
   * updateVersionFile()
   * --------------------------------------------------------- */

  it('throws if version file missing', () => {
    existsSyncValues = [false];

    expect(() => updater.updateVersionFile('1.0.0')).toThrowError(
      'version file not found: /repo/version.ts'
    );
  });

  it('updates version file when changed', () => {
    existsSyncValues = [true];
    readFileSyncFiles = [`const SDUX_VERSION = '1.0.0';`];

    updater.updateVersionFile('2.0.0');

    expect(consoleInfo).toEqual([
      'Syncing version file...',
      'Updated version file → 2.0.0'
    ]);

    expect(writeFileSyncCalls.length).toEqual(1);
    expect(writeFileSyncCalls[0].content).toEqual(
      `const SDUX_VERSION = '2.0.0';`
    );
  });

  it('skips when version already correct', () => {
    existsSyncValues = [true];
    readFileSyncFiles = [`const SDUX_VERSION = '1.2.3';`];

    updater.updateVersionFile('1.2.3');

    expect(consoleInfo).toEqual([
      'Syncing version file...',
      'Version already up to date'
    ]);

    expect(writeFileSyncCalls).toEqual([]);
  });

  it('supports different variable names', () => {
    existsSyncValues = [true];
    readFileSyncFiles = [`const ANY_VERSION = '0.0.1';`];

    updater.updateVersionFile('5.5.5');

    expect(writeFileSyncCalls[0].content).toEqual(
      `const ANY_VERSION = '5.5.5';`
    );
  });

  it('supports double quotes', () => {
    existsSyncValues = [true];
    readFileSyncFiles = [`const SDUX_VERSION = "1.0.0";`];

    updater.updateVersionFile('3.3.3');

    expect(writeFileSyncCalls[0].content).toEqual(
      `const SDUX_VERSION = '3.3.3';`
    );
  });

  it('dry-run skips writing version file', () => {
    updater = new ReleaseUpdateVersion({
      packageRoot: '/repo',
      versionFile: '/repo/version.ts',
      dryRun: true
    });

    existsSyncValues = [true];
    readFileSyncFiles = [`const SDUX_VERSION = '1.0.0';`];

    updater.updateVersionFile('4.0.0');

    expect(consoleInfo).toEqual([
      'Syncing version file...',
      '⚠️  [dry-run] would update version to 4.0.0'
    ]);

    expect(writeFileSyncCalls).toEqual([]);
  });

  /* -----------------------------------------------------------
   * RUN()
   * --------------------------------------------------------- */

  it('skips version sync when versionFile missing', () => {
    updater = new ReleaseUpdateVersion({
      packageRoot: '/repo'
    });

    existsSyncValues = [true];
    readFileSyncFiles = [JSON.stringify({ version: '1.2.3' })];

    updater.run();

    expect(consoleInfo).toEqual([
      'No dependency graph provided → skipping dependency sync',
      'No version file provided → skipping sync'
    ]);
  });

  it('runs full flow with dependencies and version update', () => {
    updater = new ReleaseUpdateVersion({
      packageRoot: '/repo',
      versionFile: '/repo/version.ts',
      graph: {
        libraries: {
          shared: {}
        }
      },
      getVersionForLib: () => '2.0.0'
    });

    existsSyncValues = [true, true];
    readFileSyncFiles = [
      JSON.stringify({ version: '1.2.3' }),
      JSON.stringify({
        dependencies: {
          shared: '1.0.0'
        }
      }),
      `const SDUX_VERSION = '1.0.0';`
    ];

    updater.run();

    expect(consoleInfo).toEqual([
      'Syncing dependencies...',
      'Updated shared → ^2.0.0',
      'Syncing version file...',
      'Updated version file → 1.2.3'
    ]);

    expect(writeFileSyncCalls.length).toEqual(2);

    const pkg = JSON.parse(writeFileSyncCalls[0].content);
    expect(pkg.dependencies.shared).toEqual('^2.0.0');

    expect(writeFileSyncCalls[1].content).toEqual(
      `const SDUX_VERSION = '1.2.3';`
    );
  });
});
