import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { setVaultLogLevel } from '../../../utils';
import { AbstractErrorCallbackBehavior } from './with-error-callback.abstract';

class ExtendedErrorCallbackClass extends AbstractErrorCallbackBehavior<any> {
  override critical = true;
  constructor(key: any, behaviorCtx: any) {
    super(key, behaviorCtx);
  }

  async callbackError(): Promise<void> {}
}

describe('Behavior: AbstractError', () => {
  let behavior: AbstractErrorCallbackBehavior<any>;
  let warnSpy: any;

  beforeEach(() => {
    warnSpy = spyOn(console, 'warn');

    setVaultLogLevel('warn');

    behavior = new ExtendedErrorCallbackClass('behavior key', {} as any);
  });

  afterEach(() => {
    setVaultLogLevel('off');
  });

  // ---------------------------------------------------------------------------
  // METADATA
  // ---------------------------------------------------------------------------

  it('should have correct default metadata', () => {
    expect(behavior.critical).toBeTrue();
    expect(behavior.type).toBe('coreErrorCallback');
    expect(behavior.key).toBe('behavior key');
  });

  // ---------------------------------------------------------------------------
  // handleError BEHAVIOR
  // ---------------------------------------------------------------------------

  it('should return VAULT_NOOP', async () => {
    expect(
      await behavior.callbackError('boom' as any, '' as any, '' as any)
    ).toBeUndefined();
  });

  // ---------------------------------------------------------------------------
  // LIFECYCLE HOOKS
  // ---------------------------------------------------------------------------

  it('should validate destroy is noop', async () => {
    behavior.destroy();
    await flushVaultPipeline();

    expect(warnSpy).toHaveBeenCalledWith(
      '[vault]',
      'behavior key - destroy "noop"'
    );
  });

  it('should validate reset is noop', async () => {
    behavior.reset();
    await flushVaultPipeline();

    expect(warnSpy).toHaveBeenCalledWith(
      '[vault]',
      'behavior key - reset "noop"'
    );
  });
});
