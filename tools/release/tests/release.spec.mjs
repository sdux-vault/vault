import fs from 'node:fs';
import readline from 'node:readline';
import { ExecModule } from '../../utils/exec-sync.util.mjs';
import { PlanManager } from '../plan-manager.class.mjs';
import { ReleaseManager } from '../release-manager.class.mjs';
import { Release } from '../release.class.mjs';
import { TagManager } from '../tag-manager.class.mjs';

describe('CLI: release.class (normalized)', () => {
  let execCalls;
  let consoleInfo;
  let consoleError;
  let answers;
  let planRun;
  let releaseRun;
  let tagRun;

  beforeEach(() => {
    execCalls = [];
    consoleInfo = [];
    consoleError = [];
    answers = [];
    planRun = [];
    releaseRun = [];
    tagRun = [];

    spyOn(ExecModule, 'exec').and.callFake((cmd) => {
      execCalls.push(cmd);
    });

    spyOn(console, 'info').and.callFake((msg) => {
      consoleInfo.push(msg.replace(/\n/g, ''));
    });

    spyOn(console, 'error').and.callFake((msg) => {
      consoleError.push(msg.replace(/\n/g, ''));
    });

    spyOn(PlanManager.prototype, 'run').and.callFake(function (opts) {
      planRun.push({ instance: this, audit: opts?.audit ?? false });
    });

    spyOn(ReleaseManager.prototype, 'run').and.callFake(function () {
      releaseRun.push(this);
    });

    spyOn(TagManager.prototype, 'run').and.callFake(function () {
      tagRun.push(this);
    });

    spyOn(readline, 'createInterface').and.callFake(() => {
      return {
        question: (prompt, cb) => cb(answers.shift()),
        close: () => {}
      };
    });

    spyOn(fs, 'readFileSync').and.callFake((file) => {
      return JSON.stringify({ version: '1.2.3' });
    });
  });

  const LIBS = {
    shared: {
      packageName: '@sdux-vault/shared',
      packageRoot: '/repo/libs/shared',
      distRoot: '/repo/dist/shared',
      versionFile: '/repo/libs/shared/version.ts'
    },
    engine: {
      packageName: '@sdux-vault/engine',
      packageRoot: '/engine',
      distRoot: '/engine/dist',
      versionFile: '/engine/version.ts',
      isEngine: true
    }
  };

  const GRAPH = {
    levels: [['shared']],
    libraries: {
      shared: { dependencies: [], dependents: [] }
    }
  };

  it('runs clear command', async () => {
    const r = new Release({
      projectRoot: '/repo',
      args: ['--type=patch', '--lib=shared', '--dry', '--mode=release'],
      libraries: LIBS
    });

    await r.run();

    expect(execCalls).toEqual(['clear']);
  });

  /* -----------------------------------------------------------
   * PARSING
   * --------------------------------------------------------- */

  it('parses all args forms', () => {
    const r = new Release({
      projectRoot: '/repo',
      args: ['--type=patch', '--lib=shared', '--dry', '--mode=release'],
      libraries: LIBS
    });

    expect(r.type).toEqual('patch');
    expect(r.libKey).toEqual('shared');
    expect(r.dryRun).toEqual(true);
    expect(r.mode).toEqual('release');
  });

  it('parses spaced args', () => {
    const r = new Release({
      projectRoot: '/repo',
      args: ['--type', 'minor', '--mode', 'analyze'],
      libraries: LIBS
    });

    expect(r.type).toEqual('minor');
    expect(r.mode).toEqual('analyze');
  });

  it('prompts for tag release mode', async () => {
    answers = ['4'];

    const r = new Release({
      projectRoot: '/repo',
      args: [],
      libraries: LIBS
    });

    const mode = await r.askForMode();

    expect(mode).toEqual('tag');
    expect(consoleInfo).toEqual([
      'Select mode:',
      '  1) Analyze (no changes, report only)',
      '  2) Analyze with Audit (no changes, full dependency health report)',
      '  3) Release (publish + update dependencies)',
      '  4) Tag Release (Git Admin Only)'
    ]);
  });

  /* -----------------------------------------------------------
   * ANALYZE MODE
   * --------------------------------------------------------- */

  it('runs plan manager in analyze mode', async () => {
    const r = new Release({
      projectRoot: '/repo',
      args: ['--mode=analyze'],
      libraries: LIBS,
      dependencyGraph: GRAPH
    });

    await r.run();

    expect(planRun.length).toEqual(1);
    expect(planRun[0].audit).toEqual(false);
    expect(releaseRun.length).toEqual(0);
  });

  it('fails analyze without graph', async () => {
    spyOn(process, 'exit').and.callFake(() => {
      throw new Error('exit');
    });

    const r = new Release({
      projectRoot: '/repo',
      args: ['--mode=analyze'],
      libraries: LIBS
    });

    await expectAsync(r.run()).toBeRejected();

    expect(consoleError).toEqual(['❌ Missing or invalid dependency graph']);
  });

  /* -----------------------------------------------------------
   * RELEASE MODE
   * --------------------------------------------------------- */

  it('runs release manager with args only', async () => {
    const r = new Release({
      projectRoot: '/repo',
      args: ['--mode=release', '--lib=shared', '--type=patch', '--dry'],
      libraries: LIBS,
      dependencyGraph: GRAPH
    });

    await r.run();

    expect(releaseRun.length).toEqual(1);
    expect(planRun.length).toEqual(0);

    const manager = releaseRun[0];

    expect(manager.packageName).toEqual('@sdux-vault/shared');
    expect(manager.type).toEqual('patch');
    expect(manager.dryRun).toEqual(true);
  });

  it('prompts full interactive release flow - live', async () => {
    answers = ['release', '2', '1', 'patch'];

    const r = new Release({
      projectRoot: '/repo',
      args: [],
      libraries: LIBS,
      dependencyGraph: GRAPH
    });

    await r.run();

    expect(releaseRun.length).toEqual(1);

    expect(consoleInfo).toEqual([
      'Select mode:',
      '  1) Analyze (no changes, report only)',
      '  2) Analyze with Audit (no changes, full dependency health report)',
      '  3) Release (publish + update dependencies)',
      '  4) Tag Release (Git Admin Only)',
      'Run mode:',
      '  1) Dry run (no files will be written)',
      '  2) Real run (updates version, writes + commit)',
      'Select library:',
      '  1) shared',
      'Select release type:',
      '  1) patch  (bug fixes)',
      '  2) minor  (new features)',
      '  3) major  (breaking changes)'
    ]);
  });

  it('prompts full interactive release flow - dryrun', async () => {
    answers = ['release', '1', '1', 'patch'];

    const r = new Release({
      projectRoot: '/repo',
      args: [],
      libraries: LIBS,
      dependencyGraph: GRAPH
    });

    await r.run();

    expect(releaseRun.length).toEqual(1);

    expect(consoleInfo).toEqual([
      'Select mode:',
      '  1) Analyze (no changes, report only)',
      '  2) Analyze with Audit (no changes, full dependency health report)',
      '  3) Release (publish + update dependencies)',
      '  4) Tag Release (Git Admin Only)',
      'Run mode:',
      '  1) Dry run (no files will be written)',
      '  2) Real run (updates version, writes + commit)',
      'Select library:',
      '  1) shared',
      'Select release type:',
      '  1) patch  (bug fixes)',
      '  2) minor  (new features)',
      '  3) major  (breaking changes)'
    ]);
  });

  /* -----------------------------------------------------------
   * TAG MODE
   * --------------------------------------------------------- */

  it('runs tag manager with args only', async () => {
    const r = new Release({
      projectRoot: '/repo',
      args: ['--mode=tag', '--lib=shared', '--dry'],
      libraries: LIBS,
      dependencyGraph: GRAPH
    });

    await r.run();

    expect(tagRun.length).toEqual(1);
    expect(releaseRun.length).toEqual(0);
    expect(planRun.length).toEqual(0);

    const manager = tagRun[0];

    expect(manager.projectRoot).toEqual('/repo');
    expect(manager.packageName).toEqual('@sdux-vault/shared');
    expect(manager.packagePath).toEqual('/repo/libs/shared');
    expect(manager.dryRun).toEqual(true);
    expect(r.type).toBeUndefined();
  });

  it('prompts for a live tag without prompting for a release type', async () => {
    answers = ['tag', '2', '1'];

    const r = new Release({
      projectRoot: '/repo',
      args: [],
      libraries: LIBS,
      dependencyGraph: GRAPH
    });

    await r.run();

    expect(tagRun.length).toEqual(1);
    expect(releaseRun.length).toEqual(0);
    expect(planRun.length).toEqual(0);
    expect(tagRun[0].dryRun).toEqual(false);
    expect(r.type).toBeUndefined();
    expect(answers).toEqual([]);

    expect(consoleInfo).toEqual([
      'Select mode:',
      '  1) Analyze (no changes, report only)',
      '  2) Analyze with Audit (no changes, full dependency health report)',
      '  3) Release (publish + update dependencies)',
      '  4) Tag Release (Git Admin Only)',
      'Run mode:',
      '  1) Dry run (no files will be written)',
      '  2) Real run (updates version, writes + commit)',
      'Select library:',
      '  1) shared'
    ]);
  });

  it('runs plan manager in audit mode', async () => {
    const r = new Release({
      projectRoot: '/repo',
      args: ['--mode=audit'],
      libraries: LIBS,
      dependencyGraph: GRAPH
    });

    await r.run();

    expect(planRun.length).toEqual(1);
    expect(planRun[0].audit).toEqual(true);
    expect(releaseRun.length).toEqual(0);
  });

  it('prompts interactive audit flow', async () => {
    answers = ['audit'];

    const r = new Release({
      projectRoot: '/repo',
      args: [],
      libraries: LIBS,
      dependencyGraph: GRAPH
    });

    await r.run();

    expect(planRun.length).toEqual(1);
    expect(planRun[0].audit).toEqual(true);
  });

  it('fails audit without graph', async () => {
    spyOn(process, 'exit').and.callFake(() => {
      throw new Error('exit');
    });

    const r = new Release({
      projectRoot: '/repo',
      args: ['--mode=audit'],
      libraries: LIBS
    });

    await expectAsync(r.run()).toBeRejected();

    expect(consoleError).toEqual(['❌ Missing or invalid dependency graph']);
  });

  it('filters engine libraries correctly', async () => {
    answers = ['release', '1', '1', 'patch'];

    const r = new Release({
      projectRoot: '/repo',
      args: [],
      libraries: LIBS,
      dependencyGraph: GRAPH,
      loadEngine: true
    });

    await r.run();

    expect(consoleInfo).toEqual([
      'Select mode:',
      '  1) Analyze (no changes, report only)',
      '  2) Analyze with Audit (no changes, full dependency health report)',
      '  3) Release (publish + update dependencies)',
      '  4) Tag Release (Git Admin Only)',
      'Run mode:',
      '  1) Dry run (no files will be written)',
      '  2) Real run (updates version, writes + commit)',
      'Select library:',
      '  1) engine',
      'Select release type:',
      '  1) patch  (bug fixes)',
      '  2) minor  (new features)',
      '  3) major  (breaking changes)'
    ]);
  });

  /* -----------------------------------------------------------
   * VALIDATION
   * --------------------------------------------------------- */

  it('fails invalid library', async () => {
    spyOn(process, 'exit').and.callFake(() => {
      throw new Error('exit');
    });

    const r = new Release({
      projectRoot: '/repo',
      args: ['--mode=release', '--lib=bad', '--type=patch', '--dry'],
      libraries: LIBS,
      dependencyGraph: GRAPH
    });

    await expectAsync(r.run()).toBeRejected();

    expect(consoleError).toEqual(['❌ Unknown library "bad"']);
  });

  it('fails invalid type', async () => {
    spyOn(process, 'exit').and.callFake(() => {
      throw new Error('exit');
    });

    const r = new Release({
      projectRoot: '/repo',
      args: ['--mode=release', '--lib=shared', '--type=bad', '--dry'],
      libraries: LIBS,
      dependencyGraph: GRAPH
    });

    await expectAsync(r.run()).toBeRejected();

    expect(consoleError).toEqual(['❌ Invalid release type "bad"']);
  });

  it('fails invalid mode selection', async () => {
    spyOn(process, 'exit').and.callFake(() => {
      throw new Error('exit');
    });

    answers = ['invalid'];

    const r = new Release({
      projectRoot: '/repo',
      args: [],
      libraries: LIBS
    });

    await expectAsync(r.run()).toBeRejected();

    expect(consoleError).toEqual(['❌ Invalid mode selection']);
  });

  it('fails invalid dry run selection', async () => {
    spyOn(process, 'exit').and.callFake(() => {
      throw new Error('exit');
    });

    answers = ['release', 'invalid'];

    const r = new Release({
      projectRoot: '/repo',
      args: [],
      libraries: LIBS
    });

    await expectAsync(r.run()).toBeRejected();

    expect(consoleError).toEqual(['❌ Invalid Run mode selection']);
  });

  it('fails invalid library selection', async () => {
    spyOn(process, 'exit').and.callFake(() => {
      throw new Error('exit');
    });

    answers = ['release', '1', 'invalid'];

    const r = new Release({
      projectRoot: '/repo',
      args: [],
      libraries: LIBS
    });

    await expectAsync(r.run()).toBeRejected();

    expect(consoleError).toEqual(['❌ Invalid library selection']);
  });

  it('fails invalid type selection', async () => {
    spyOn(process, 'exit').and.callFake(() => {
      throw new Error('exit');
    });

    answers = ['release', '1', '1', 'invalid'];

    const r = new Release({
      projectRoot: '/repo',
      args: [],
      libraries: LIBS
    });

    await expectAsync(r.run()).toBeRejected();

    expect(consoleError).toEqual(['❌ Invalid type selection']);
  });

  /* -----------------------------------------------------------
   * VERSION RESOLVER
   * --------------------------------------------------------- */

  it('resolves version from normalized packageRoot', async () => {
    const r = new Release({
      projectRoot: '/repo',
      args: ['--mode=release', '--lib=shared', '--type=patch', '--live'],
      libraries: LIBS,
      dependencyGraph: GRAPH
    });

    await r.run();

    expect(releaseRun.length).toEqual(1);
    const manager = releaseRun[0];
    expect(manager.planManager).toBeDefined();
  });
});
