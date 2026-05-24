import { setVaultLogLevel } from '@sdux-vault/shared';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { withCoreBeforeTapBehavior } from './with-core-before-tap.behavior';

describe('Behavior: withBeforeTap', () => {
  let ctx: any;
  let behavior: any;

  beforeEach(() => {
    setVaultLogLevel('warn');

    ctx = {
      state: 'the state'
    };

    behavior = new withCoreBeforeTapBehavior('before-tap-key', {} as any);
  });

  afterEach(() => {
    setVaultLogLevel('off');
  });

  it('should have default properties', () => {
    expect(behavior.critical).toBeTrue();
    expect(behavior.type).toBe('coreBeforeTap');
    expect(behavior.key).toBe('before-tap-key');
  });

  it('should construct via factory and expose correct static metadata', () => {
    expect(withCoreBeforeTapBehavior.critical).toBeTrue();
    expect(withCoreBeforeTapBehavior.type).toBe('coreBeforeTap');
    expect(withCoreBeforeTapBehavior.key).toBe(
      'SDUX::Behavior::Core::BeforeTap'
    );
    expect((withCoreBeforeTapBehavior as any).wantsConfig).toBeFalse();
    expect((withCoreBeforeTapBehavior as any).needsLicense).toBeFalse();
    expect((withCoreBeforeTapBehavior as any).configKey).toBeUndefined();
    expect(
      (typeof withCoreBeforeTapBehavior as any).installFluentApi
    ).toBeUndefined();
  });

  it('should call executeTap when applyBeforeTap is invoked', () => {
    let state: any;
    behavior.applyBeforeTap(ctx, (tapState: any) => {
      state = tapState;
    });

    expect(state).toEqual(Object({ state: 'the state' }));
  });

  it('should throw tap errors', () => {
    const badTap = () => {
      throw new Error('Tap failed');
    };

    expect(() => behavior.applyBeforeTap(ctx, badTap)).toThrowError(
      'Tap failed'
    );
  });

  it('should throw an error without a function)', () => {
    expect(() => behavior.applyBeforeTap(ctx, undefined)).toThrowError(
      'tap is not a function'
    );
  });

  it('should valid destroy is noop', async () => {
    spyOn(console, 'warn');
    behavior.destroy();
    await flushVaultPipeline();
    // eslint-disable-next-line
    expect(console.warn).toHaveBeenCalledWith(
      '[vault]',
      'before-tap-key - destroy "noop"'
    );
  });

  it('should valid reset is noop', async () => {
    spyOn(console, 'warn');
    behavior.reset();
    await flushVaultPipeline();
    // eslint-disable-next-line
    expect(console.warn).toHaveBeenCalledWith(
      '[vault]',
      'before-tap-key - reset "noop"'
    );
  });
});
