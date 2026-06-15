import {
  BehaviorClassContext,
  BehaviorTypes,
  setVaultLogLevel
} from '@sdux-vault/shared';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { withCoreErrorBehavior } from './with-core-error.behavior';

describe('Behavior: withCoreError', () => {
  let behavior: withCoreErrorBehavior<any>;

  beforeEach(() => {
    spyOn(console, 'warn');
    spyOn(console, 'error');

    setVaultLogLevel('warn');
    const ctx = {} as unknown as BehaviorClassContext;
    behavior = new withCoreErrorBehavior('behavior key', ctx);
  });

  afterEach(() => {
    setVaultLogLevel('off');
  });

  // ------------------------------------------------------------------------------------------
  // METADATA TESTS
  // ------------------------------------------------------------------------------------------

  it('should have correct default metadata', () => {
    expect(behavior.critical).toBeTrue();
    expect(behavior.type).toBe(BehaviorTypes.CoreError);
    expect(behavior.key).toBe('behavior key');
  });

  it('should have correct default metadata', () => {
    expect(withCoreErrorBehavior.critical).toBeTrue();
    expect(withCoreErrorBehavior.type).toBe(BehaviorTypes.CoreError);
    expect(withCoreErrorBehavior.key).toBe('SDUX::Behavior::Core::Error');
  });

  // ------------------------------------------------------------------------------------------
  // HANDLE ERROR TESTS
  // ------------------------------------------------------------------------------------------

  it('should return a ResourceStateError when handling a simple string error', () => {
    expect(
      behavior.handleError(new Error('this is the error'), 'featureCellKey')
    ).toEqual(
      Object({
        message: 'this is the error',
        featureCellKey: 'featureCellKey',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number)
      })
    );
  });

  it('should always return a fresh ResourceStateError object', () => {
    const err = 'x';
    const result1 = behavior.handleError(err, 'featureCellKey');
    const result2 = behavior.handleError(err, 'featureCellKey');

    // Should not reuse references
    expect(result1).not.toBe(result2);

    // But they will be identical in value (timestamp may differ by a ms)
    expect(result1).toEqual(
      jasmine.objectContaining({
        ...result2,
        timestamp: jasmine.any(Number)
      })
    );
  });

  // ------------------------------------------------------------------------------------------
  // LIFE-CYCLE TESTS
  // ------------------------------------------------------------------------------------------

  it('should validate destroy is noop', async () => {
    behavior.destroy();
    await flushVaultPipeline();

    // eslint-disable-next-line
    expect(console.warn).toHaveBeenCalledWith(
      '[vault]',
      'behavior key - destroy "noop"'
    );
  });

  it('should validate reset is noop', async () => {
    behavior.reset();
    await flushVaultPipeline();

    // eslint-disable-next-line
    expect(console.warn).toHaveBeenCalledWith(
      '[vault]',
      'behavior key - reset "noop"'
    );
  });
});
