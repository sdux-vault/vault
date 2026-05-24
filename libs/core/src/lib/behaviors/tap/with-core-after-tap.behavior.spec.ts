import { setVaultLogLevel } from '@sdux-vault/shared';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { withCoreAfterTapBehavior } from './with-core-after-tap.behavior';

describe('Behavior: withAfterTap', () => {
  let ctx: any;
  let behavior: any;

  beforeEach(() => {
    setVaultLogLevel('warn');

    ctx = {
      state: 'the state'
    };

    behavior = new withCoreAfterTapBehavior('after-tap-key', {} as any);
  });

  afterEach(() => {
    setVaultLogLevel('off');
  });

  it('should have default properties', () => {
    expect(behavior.critical).toBeTrue();
    expect(behavior.type).toBe('coreAfterTap');
    expect(behavior.key).toBe('after-tap-key');
  });

  it('should construct via factory and expose correct static metadata', () => {
    expect(withCoreAfterTapBehavior.critical).toBeTrue();
    expect(withCoreAfterTapBehavior.type).toBe('coreAfterTap');
    expect(withCoreAfterTapBehavior.key).toBe('SDUX::Behavior::Core::AfterTap');
    expect((withCoreAfterTapBehavior as any).wantsConfig).toBeFalse();
    expect((withCoreAfterTapBehavior as any).needsLicense).toBeFalse();
    expect((withCoreAfterTapBehavior as any).configKey).toBeUndefined();
    expect(
      (typeof withCoreAfterTapBehavior as any).installFluentApi
    ).toBeUndefined();
  });

  it('should call executeTap when applyAfterTap is invoked', () => {
    let state: any;
    behavior.applyAfterTap(ctx, (tapState: any) => {
      state = tapState;
    });

    expect(state).toEqual(Object({ state: 'the state' }));
  });

  it('should throw tap errors', () => {
    const badTap = () => {
      throw new Error('Tap failed');
    };

    expect(() => behavior.applyAfterTap(ctx, badTap)).toThrowError(
      'Tap failed'
    );
  });

  it('should throw an error without a function)', () => {
    expect(() => behavior.applyAfterTap(ctx, undefined)).toThrowError(
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
      'after-tap-key - destroy "noop"'
    );
  });

  it('should valid reset is noop', async () => {
    spyOn(console, 'warn');
    behavior.reset();
    await flushVaultPipeline();
    // eslint-disable-next-line
    expect(console.warn).toHaveBeenCalledWith(
      '[vault]',
      'after-tap-key - reset "noop"'
    );
  });
});
