import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { setVaultLogLevel } from '../../../utils';
import { AbstractErrorTransformBehavior } from './with-error-transform.abstract';

class ExtendedErrorTransformClass extends AbstractErrorTransformBehavior<any> {
  override critical = true;

  constructor(key: any, behaviorCtx: any) {
    super(key, behaviorCtx);
  }

  async transformError(): Promise<void> {}
}

describe('Behavior: AbstractError', () => {
  let behavior: AbstractErrorTransformBehavior<any>;
  let warnSpy: any;

  beforeEach(() => {
    warnSpy = spyOn(console, 'warn');

    setVaultLogLevel('warn');

    behavior = new ExtendedErrorTransformClass('behavior key', {} as any);
  });

  afterEach(() => {
    setVaultLogLevel('off');
  });

  // ---------------------------------------------------------------------------
  // METADATA
  // ---------------------------------------------------------------------------

  it('should have correct default metadata', () => {
    expect(behavior.critical).toBeTrue();
    expect(behavior.type).toBe('errorTransform');
    expect(behavior.key).toBe('behavior key');
  });

  // ---------------------------------------------------------------------------
  // handleError BEHAVIOR
  // ---------------------------------------------------------------------------

  it('should return VAULT_NOOP', async () => {
    expect(
      await behavior.transformError('boom' as any, '' as any, '' as any)
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
