import fs from 'node:fs';
import { ExecModule } from '../../utils/exec-sync.util.mjs';
import { TagManager } from '../tag-manager.class.mjs';

describe('CLI: tag-manager', () => {
  let consoleInfo;
  let execCalls;

  const LIB = {
    packageName: '@sdux-vault/shared',
    packageRoot: '/repo/libs/shared'
  };

  beforeEach(() => {
    consoleInfo = [];
    execCalls = [];

    spyOn(console, 'info').and.callFake((message) => {
      consoleInfo.push(message.replace(/\n/g, ''));
    });

    spyOn(ExecModule, 'exec').and.callFake((command) => {
      execCalls.push(command);
    });

    spyOn(fs, 'readFileSync').and.returnValue(
      JSON.stringify({ version: '1.2.3' })
    );
  });

  /* -----------------------------------------------------------
   * CONSTRUCTOR
   * --------------------------------------------------------- */

  it('throws if projectRoot is missing', () => {
    expect(() => {
      new TagManager({ lib: LIB });
    }).toThrowError('projectRoot is required');
  });

  it('throws if library is missing', () => {
    expect(() => {
      new TagManager({ projectRoot: '/repo' });
    }).toThrowError('Library is required');
  });

  it('uses the normalized library paths and defaults to a live run', () => {
    const manager = new TagManager({
      projectRoot: '/repo',
      lib: LIB
    });

    expect(manager.projectRoot).toEqual('/repo');
    expect(manager.packageName).toEqual('@sdux-vault/shared');
    expect(manager.packagePath).toEqual('/repo/libs/shared');
    expect(manager.dryRun).toBeFalse();
  });

  /* -----------------------------------------------------------
   * FULL RUN
   * --------------------------------------------------------- */

  it('creates and pushes one annotated tag during a live run', () => {
    const manager = new TagManager({
      projectRoot: '/repo',
      lib: LIB
    });

    manager.run();

    expect(fs.readFileSync).toHaveBeenCalledOnceWith(
      '/repo/libs/shared/package.json',
      'utf-8'
    );
    expect(execCalls).toEqual([
      'git diff --quiet',
      'git tag -a shared@1.2.3 -m "shared 1.2.3"',
      'git push origin shared@1.2.3 --no-verify'
    ]);
    expect(consoleInfo).toEqual([
      'Checking for uncommitted changes...',
      'Starting tag release for @sdux-vault/shared',
      '',
      'Creating tag...',
      'git tag -a shared@1.2.3 -m "shared 1.2.3"',
      'Pushing tag...',
      'git push origin shared@1.2.3 --no-verify',
      'Tag release complete'
    ]);
  });

  /* -----------------------------------------------------------
   * DRY RUN
   * --------------------------------------------------------- */

  it('prints the tag command without creating or pushing the tag in dry run', () => {
    const manager = new TagManager({
      projectRoot: '/repo',
      lib: LIB,
      dryRun: true
    });

    manager.run();

    expect(execCalls).toEqual([]);
    expect(consoleInfo).toEqual([
      'Starting tag release for @sdux-vault/shared',
      '⚠️  Running in DRY RUN mode',
      'Creating tag...',
      'git tag -a shared@1.2.3 -m "shared 1.2.3"',
      'Pushing tag...',
      'git push origin shared@1.2.3 --no-verify',
      'Tag release dry-run complete'
    ]);
  });

  it('does not execute commands passed directly to exec in dry run', () => {
    const manager = new TagManager({
      projectRoot: '/repo',
      lib: LIB,
      dryRun: true
    });

    manager.exec('git status');

    expect(execCalls).toEqual([]);
    expect(consoleInfo).toEqual([
      'git status',
      '⚠️  [dry-run] command not executed'
    ]);
  });

  /* -----------------------------------------------------------
   * TAG DETAILS
   * --------------------------------------------------------- */

  it('throws if the package version is missing', () => {
    fs.readFileSync.and.returnValue(JSON.stringify({}));

    const manager = new TagManager({
      projectRoot: '/repo',
      lib: LIB
    });

    expect(() => manager.getTagDetails()).toThrowError(
      'Missing version in /repo/libs/shared/package.json'
    );
  });

  /* -----------------------------------------------------------
   * PRECHECK
   * --------------------------------------------------------- */

  it('throws if uncommitted changes are detected', () => {
    ExecModule.exec.and.throwError('git diff failed');

    const manager = new TagManager({
      projectRoot: '/repo',
      lib: LIB
    });

    expect(() => manager.precheck()).toThrowError(
      'Uncommitted changes detected. Please commit or stash before tagging.'
    );
  });
});
