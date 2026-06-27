import fs from 'node:fs';
import { ExecModule } from '../../utils/exec-sync.util.mjs';
import { ReleaseManager } from '../release-manager.class.mjs';
import { ReleaseUpdateVersion } from '../release.update-version.class.mjs';

describe('CLI: release-manager', () => {
  let execCalls;
  let consoleInfo;
  let readFileSyncFiles;
  let readdirSyncFiles;
  let existsSyncValue;
  let writeFileSyncCalls;

  beforeEach(() => {
    execCalls = [];
    consoleInfo = [];
    writeFileSyncCalls = [];

    readFileSyncFiles = [JSON.stringify({ version: '1.2.3' })];

    readdirSyncFiles = ['package.json', 'README.md', 'index.js', 'LICENSE'];

    existsSyncValue = true;

    spyOn(process, 'cwd').and.returnValue('/repo');

    spyOn(console, 'info').and.callFake((msg) => {
      consoleInfo.push(msg.replace(/\n/g, ''));
    });

    spyOn(ExecModule, 'exec').and.callFake((cmd) => {
      execCalls.push(cmd);
    });

    spyOn(fs, 'readFileSync').and.callFake(() => {
      return readFileSyncFiles.shift();
    });

    spyOn(fs, 'readdirSync').and.returnValue(readdirSyncFiles);
    spyOn(fs, 'existsSync').and.returnValue(existsSyncValue);

    spyOn(fs, 'writeFileSync').and.callFake((file, content) => {
      writeFileSyncCalls.push({ file, content });
    });

    spyOn(ReleaseUpdateVersion.prototype, 'run').and.callFake(() => {});
  });

  const LIB = {
    packageName: '@sdux-vault/shared',
    packageRoot: '/repo/libs/shared',
    distRoot: '/repo/dist/shared',
    versionFile: '/repo/libs/shared/version.ts',
    buildCommand: 'npm run build:shared',
    licenses: ['mit']
  };

  const LIBS = {
    shared: {
      packageName: '@sdux-vault/shared',
      packageRoot: '/repo/libs/shared',
      distRoot: '/repo/dist/shared',
      versionFile: '/repo/libs/shared/version.ts'
    }
  };

  const GRAPH = {
    levels: [['shared']],
    libraries: {}
  };

  /* -----------------------------------------------------------
   * CONSTRUCTOR
   * --------------------------------------------------------- */

  it('throws if projectRoot missing', () => {
    expect(() => {
      new ReleaseManager({
        lib: LIB,
        type: 'patch'
      });
    }).toThrowError('projectRoot is required');
  });

  it('throws if type missing', () => {
    expect(() => {
      new ReleaseManager({
        projectRoot: '/repo',
        lib: LIB
      });
    }).toThrowError('Release type is required (patch | minor | major)');
  });

  it('throws if type invalid', () => {
    expect(() => {
      new ReleaseManager({
        projectRoot: '/repo',
        lib: LIB,
        type: 'bad'
      });
    }).toThrowError(
      'Invalid release type "bad". Must be one of: patch, minor, major'
    );
  });

  it('uses normalized paths', () => {
    const manager = new ReleaseManager({
      projectRoot: '/repo',
      lib: LIB,
      type: 'patch'
    });

    expect(manager.packagePath).toEqual('/repo/libs/shared');
    expect(manager.distPath).toEqual('/repo/dist/shared');
    expect(manager.versionFile).toEqual('/repo/libs/shared/version.ts');
  });

  /* -----------------------------------------------------------
   * FULL RUN
   * --------------------------------------------------------- */

  it('runs full release pipeline with normalized paths', () => {
    const manager = new ReleaseManager({
      projectRoot: '/repo',
      lib: LIB,
      type: 'patch',
      dependencyGraph: GRAPH,
      libraries: LIBS
    });

    manager.run();

    expect(execCalls).toEqual([
      'git diff --quiet',
      'npm run clean',
      'npm run build:shared',
      'npm run build:devtools',
      'npm run build:core',
      'npm run build:addons',
      'npm run build:angular',
      'npm run verify',
      'git add libs/shared/package.json libs/shared/version.ts',
      'git commit -m "chore(shared): release version bump"',
      'git tag shared@1.2.4',
      'git push --no-verify --follow-tags --set-upstream origin $(git branch --show-current)',
      'npm run build:shared',
      'cd /repo/dist/shared && npm pack'
    ]);
  });

  /* -----------------------------------------------------------
   * DRY RUN
   * --------------------------------------------------------- */

  it('skips execution in dry run', () => {
    const manager = new ReleaseManager({
      projectRoot: '/repo',
      lib: LIB,
      type: 'patch',
      dryRun: true,
      dependencyGraph: GRAPH,
      libraries: LIBS
    });

    manager.run();

    expect(consoleInfo).toEqual([
      'Starting release for @sdux-vault/shared',
      '⚠️  Running in DRY RUN mode',
      'Cleaning workspace...',
      'npm run clean',
      '⚠️  [dry-run] command not executed',
      'Building build:shared build:devtools build:core build:addons build:angular...',
      'npm run build:shared',
      'npm run build:devtools',
      'npm run build:core',
      'npm run build:addons',
      'npm run build:angular',
      'Verifying code quality...',
      'npm run verify',
      '⚠️  [dry-run] command not executed',
      'Bumping version (patch)...',
      '⚠️  [dry-run] would bump version to 1.2.4',
      'Bumping package version (patch)...',
      'git add libs/shared/package.json libs/shared/version.ts',
      '⚠️  [dry-run] command not executed',
      'git commit -m "chore(shared): release version bump"',
      '⚠️  [dry-run] command not executed',
      'git tag shared@1.2.4',
      '⚠️  [dry-run] command not executed',
      'Pushing changes + tags...',
      'git push --no-verify --follow-tags --set-upstream origin $(git branch --show-current)',
      '⚠️  [dry-run] command not executed',
      'Building @sdux-vault/shared...',
      'npm run build:shared',
      'Applying licenses...',
      '⚠️  [dry-run] writes LICENSE (mit)',
      'LICENSE written (mit)',
      'Inspecting build output...',
      'Build output looks good',
      'Creating tarball...',
      'cd /repo/dist/shared && npm pack',
      'Dry-run complete'
    ]);

    expect(
      writeFileSyncCalls.find((c) => c.file.endsWith('package.json'))
    ).toBeUndefined();
  });

  /* -----------------------------------------------------------
   * INSPECT
   * --------------------------------------------------------- */

  it('throws if dist missing', () => {
    fs.existsSync.and.callFake((p) => {
      return p !== '/repo/dist/shared';
    });

    const manager = new ReleaseManager({
      projectRoot: '/repo',
      lib: LIB,
      type: 'patch'
    });

    expect(() => manager.inspect()).toThrowError(
      'dist path not found: /repo/dist/shared'
    );
  });

  it('throws if required file missing', () => {
    fs.readdirSync.and.callFake(() => ['package.json']);

    const manager = new ReleaseManager({
      projectRoot: '/repo',
      lib: LIB,
      type: 'patch'
    });

    expect(() => manager.inspect()).toThrowError(
      'Missing required file: README.md'
    );
  });

  it('throws if no JS output', () => {
    fs.readdirSync.and.callFake(() => ['package.json', 'README.md', 'LICENSE']);

    const manager = new ReleaseManager({
      projectRoot: '/repo',
      lib: LIB,
      type: 'patch'
    });

    expect(() => manager.inspect()).toThrowError(
      'No compiled output found (missing JS bundles)'
    );
  });

  it('passes inspect', () => {
    const manager = new ReleaseManager({
      projectRoot: '/repo',
      lib: LIB,
      type: 'patch'
    });

    manager.inspect();

    expect(consoleInfo).toEqual([
      'Inspecting build output...',
      'Build output looks good'
    ]);
  });

  /* -----------------------------------------------------------
   * LICENSES
   * --------------------------------------------------------- */

  it('writes license file', () => {
    const manager = new ReleaseManager({
      projectRoot: '/repo',
      lib: LIB,
      type: 'patch'
    });

    manager.applyLicenses();

    expect(writeFileSyncCalls.length).toEqual(1);
    expect(writeFileSyncCalls[0].file).toEqual('/repo/dist/shared/LICENSE');
  });

  it('skips license when none configured', () => {
    const manager = new ReleaseManager({
      projectRoot: '/repo',
      lib: { ...LIB, licenses: [] },
      type: 'patch'
    });

    manager.applyLicenses();

    expect(consoleInfo).toEqual([
      'Applying licenses...',
      'No licenses configured → skipping'
    ]);
  });

  /* -----------------------------------------------------------
   * ENGINE SKIP
   * --------------------------------------------------------- */

  it('skips dependency build for engine', () => {
    const manager = new ReleaseManager({
      projectRoot: '/repo',
      lib: { ...LIB, isEngine: true },
      type: 'patch'
    });

    manager.buildDependencies();

    expect(execCalls).toEqual([]);
  });
});
