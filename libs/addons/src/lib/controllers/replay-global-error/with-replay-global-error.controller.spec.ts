import {
  ControllerMessageTypes,
  createVaultError,
  setVaultLogLevel,
  VaultPrivateErrorService,
  VaultPrivateErrorServiceContract
} from '@sdux-vault/shared';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { withReplayGlobalErrorController } from './with-replay-global-error.controller';

describe('Controller: withReplayGlobalError', () => {
  let controller: any;
  let warnSpy: any;
  let debugSpy: any;
  let privateErrorService: VaultPrivateErrorServiceContract;
  const testOutput: any = [];

  beforeAll(() => {
    warnSpy = spyOn(console, 'warn');
    debugSpy = spyOn(console, 'debug');
  });

  beforeEach(() => {
    warnSpy.calls.reset();
    debugSpy.calls.reset();
    testOutput.length = 0;

    setVaultLogLevel('debug');

    privateErrorService = VaultPrivateErrorService();

    controller = new withReplayGlobalErrorController('pause-key', {
      requestRevote: () => {
        testOutput.push('request revote');
      }
    } as any);
  });

  afterEach(() => {
    privateErrorService.clear();
    controller.destroy();
    setVaultLogLevel('off');
  });

  // ---------------------------------------------------------------------------
  // METADATA
  // ---------------------------------------------------------------------------
  it('should have correct metadata', () => {
    expect(controller.type).toBe('replayGlobalError');
    expect(controller.critical).toBeFalse();
    expect(controller.key).toBe('pause-key');
  });

  it('should have correct static decorator metadata', () => {
    expect(withReplayGlobalErrorController.type).toBe('replayGlobalError');
    expect(withReplayGlobalErrorController.critical).toBeFalse();
    expect(withReplayGlobalErrorController.key).toBe(
      'SDUX::Controller::Policy::ReplayGlobalError'
    );
  });

  // ---------------------------------------------------------------------------
  // PIPELINE controller
  // ---------------------------------------------------------------------------

  describe('Attempt', () => {
    it('should return abstain for an Attempt message type without an error', async () => {
      const mockMessage = Object({
        traceId: 'trace-id',
        type: ControllerMessageTypes.Attempt
      });
      controller.handleMessage(mockMessage).subscribe({
        next: (result: any) => {
          testOutput.push(result);
        },
        error: (error: Error) => {
          testOutput.push(error.message);
        }
      });

      await flushVaultPipeline();

      expect(testOutput).toEqual(['abstain']);
    });

    it('should returns deny for an Attempt message type with an error', async () => {
      privateErrorService.setError(
        createVaultError('an error is active', 'cell key')
      );

      const mockMessage = Object({
        traceId: 'trace-id',
        type: ControllerMessageTypes.Attempt
      });
      controller.handleMessage(mockMessage).subscribe({
        next: (result: any) => {
          testOutput.push(result);
        },
        error: (error: Error) => {
          testOutput.push(error.message);
        }
      });

      await flushVaultPipeline();

      expect(testOutput).toEqual(['request revote', 'deny']);

      privateErrorService.clear();

      mockMessage.traceId = 'new-trace-id';
      controller.handleMessage(mockMessage).subscribe({
        next: (result: any) => {
          testOutput.push(result);
        },
        error: (error: Error) => {
          testOutput.push(error.message);
        }
      });

      await flushVaultPipeline();

      expect(testOutput).toEqual([
        'request revote',
        'deny',
        'request revote',
        'abstain'
      ]);
    });
  });

  it('should returns abstain for an Fail message type', async () => {
    const mockMessage = Object({
      traceId: 'trace-id',
      type: ControllerMessageTypes.Failure
    });
    controller.handleMessage(mockMessage).subscribe({
      next: (result: any) => {
        testOutput.push(result);
      },
      error: (error: Error) => {
        testOutput.push(error.message);
      }
    });

    await flushVaultPipeline();

    expect(testOutput).toEqual(['abstain']);
  });

  it('should returns abstain for a finalize message type', async () => {
    const mockMessage = Object({
      traceId: 'trace-id',
      type: ControllerMessageTypes.Finalize
    });
    controller.handleMessage(mockMessage).subscribe({
      next: (result: any) => {
        testOutput.push(result);
      },
      error: (error: Error) => {
        testOutput.push(error.message);
      }
    });

    await flushVaultPipeline();

    expect(testOutput).toEqual(['abstain']);
  });

  it('should returns abstain for an Success message type', async () => {
    const mockMessage = Object({
      traceId: 'trace-id',
      type: ControllerMessageTypes.Success
    });
    controller.handleMessage(mockMessage).subscribe({
      next: (result: any) => {
        testOutput.push(result);
      },
      error: (error: Error) => {
        testOutput.push(error.message);
      }
    });

    await flushVaultPipeline();

    expect(testOutput).toEqual(['abstain']);
  });

  it('should returns abstain for an default message type', async () => {
    const mockMessage = Object({
      traceId: 'trace-id',
      type: 'vote'
    });
    controller.handleMessage(mockMessage).subscribe({
      next: (result: any) => {
        testOutput.push(result);
      },
      error: (error: Error) => {
        testOutput.push(error.message);
      }
    });

    await flushVaultPipeline();

    expect(testOutput).toEqual(['abstain']);
  });

  // ---------------------------------------------------------------------------
  // DESTROY / RESET (NO-OPS)
  // ---------------------------------------------------------------------------
  it('destroy() should log a diagnostic warning but perform no action', async () => {
    controller.destroy();
    await flushVaultPipeline();

    expect(warnSpy).toHaveBeenCalledWith('[vault]', 'pause-key - destroy');
    expect(debugSpy).toHaveBeenCalledWith(
      '[vault]',
      '[VaultPrivateErrorService] returning existing singleton instance'
    );
  });

  it('reset() should log a diagnostic warning but perform no action', async () => {
    controller.reset();
    await flushVaultPipeline();

    expect(warnSpy).toHaveBeenCalledWith('[vault]', 'pause-key - reset "noop"');
    expect(debugSpy).toHaveBeenCalledWith(
      '[vault]',
      '[VaultPrivateErrorService] returning existing singleton instance'
    );
  });
});
