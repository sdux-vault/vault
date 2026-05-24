import {
  BehaviorClassContext,
  setVaultLogLevel,
  VAULT_STOP,
  VaultPrivateErrorService,
  VaultPrivateErrorServiceContract
} from '@sdux-vault/shared';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { withGlobalErrorPauseBehavior } from './with-global-error-pause.behavior';

describe('Behavior: withGlobalErrorPause', () => {
  let behavior: any;
  let errorService: VaultPrivateErrorServiceContract;
  let warnSpy: any;

  beforeEach(() => {
    warnSpy = spyOn(console, 'warn');
    setVaultLogLevel('warn');

    errorService = VaultPrivateErrorService();

    behavior = new withGlobalErrorPauseBehavior(
      'pause-key',
      {} as BehaviorClassContext
    );
  });

  afterEach(() => {
    setVaultLogLevel('off');
  });

  // ---------------------------------------------------------------------------
  // METADATA
  // ---------------------------------------------------------------------------
  it('should have correct metadata', () => {
    expect(behavior.type).toBe('interceptor');
    expect(behavior.critical).toBeFalse();
    expect(behavior.key).toBe('pause-key');
  });

  it('should have default decorator properties', () => {
    expect(withGlobalErrorPauseBehavior.critical).toBeFalse();
    expect(withGlobalErrorPauseBehavior.type).toBe('interceptor');
    expect(withGlobalErrorPauseBehavior.key).toBe(
      'SDUX::Behavior::Interceptor::GlobalErrorPause'
    );
    expect((withGlobalErrorPauseBehavior as any).wantsConfig).toBeFalse();
    expect((withGlobalErrorPauseBehavior as any).configKey).toBeUndefined();
    expect(typeof (withGlobalErrorPauseBehavior as any).installFluentApi).toBe(
      'undefined'
    );
  });

  // ---------------------------------------------------------------------------
  // PIPELINE BEHAVIOR
  // ---------------------------------------------------------------------------
  it('should allow incoming state when global error is null', async () => {
    errorService.clear(); // ensure no error
    const ctx = { incoming: { id: 1 } } as any;

    const result = await behavior.applyInterceptor(ctx);

    expect(result).toEqual({ id: 1 });
  });

  it('should block incoming state when global error exists', async () => {
    errorService.setError({ message: 'boom', timestamp: Date.now() } as any);
    await flushVaultPipeline();

    const ctx = { incoming: { id: 1 } } as any;

    const result = await behavior.applyInterceptor(ctx);

    expect(result).toBe(VAULT_STOP);
  });

  it('should return VAULT_GLOBAL_ERROR_PAUSED only while error is active', async () => {
    const ctx = { incoming: 'hello' } as any;

    errorService.setError({ message: 'fail', timestamp: Date.now() } as any);
    await flushVaultPipeline();

    const r1 = await behavior.applyInterceptor(ctx);
    expect(r1).toBe(VAULT_STOP);

    errorService.clear();
    await flushVaultPipeline();
    const r2 = await behavior.applyInterceptor(ctx);
    expect(r2).toBe('hello');
  });

  // ---------------------------------------------------------------------------
  // DESTROY / RESET (NO-OPS)
  // ---------------------------------------------------------------------------
  it('destroy() should log a diagnostic warning but perform no action', async () => {
    behavior.destroy();
    await flushVaultPipeline();

    expect(warnSpy).toHaveBeenCalledWith(
      '[vault]',
      'pause-key - destroy "noop"'
    );
  });

  it('reset() should log a diagnostic warning but perform no action', async () => {
    behavior.reset();
    await flushVaultPipeline();

    expect(warnSpy).toHaveBeenCalledWith('[vault]', 'pause-key - reset "noop"');
  });
});
