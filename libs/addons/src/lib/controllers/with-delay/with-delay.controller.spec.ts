import {
  ControllerClassContext,
  ControllerMessageTypes,
  setVaultLogLevel
} from '@sdux-vault/shared';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { WithDelayControllerOptions } from './options/with-delay-controller.options';
import { withDelayController } from './with-delay.controller';

describe('Controller: withDelay', () => {
  let controller: any;
  let warnSpy: jasmine.Spy;
  let debugSpy: jasmine.Spy;
  let nowSpy: jasmine.Spy;
  const output: any[] = [];

  beforeAll(() => {
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date());
    warnSpy = spyOn(console, 'warn');
    debugSpy = spyOn(console, 'debug');
  });

  afterAll(() => {
    jasmine.clock().uninstall();
  });

  beforeEach(() => {
    warnSpy.calls.reset();
    debugSpy.calls.reset();
    output.length = 0;

    setVaultLogLevel('debug');

    nowSpy = spyOn(Date, 'now');

    controller = new withDelayController('delay-key', {
      controllerConfig: {
        millisecondDelay: 1_000
      }
    } as any);
  });

  afterEach(() => {
    controller.destroy();
    nowSpy.and.callThrough();
    setVaultLogLevel('off');
  });

  // ---------------------------------------------------------------------------
  // METADATA
  // ---------------------------------------------------------------------------

  it('should expose correct instance metadata', () => {
    expect(controller.key).toBe('delay-key');
    expect(controller.type).toBe('policy');
    expect(controller.critical).toBeFalse();
  });

  it('should expose correct static decorator metadata', () => {
    expect(withDelayController.type).toBe('policy');
    expect(withDelayController.critical).toBeFalse();
    expect(withDelayController.key).toBe('SDUX::Controller::Policy::Delay');
    expect(withDelayController.wantsConfig).toBeTrue();
    expect(withDelayController.configKey).toBe('withDelay');
    expect(typeof withDelayController.extensionFluent).toBe('function');
  });

  // ---------------------------------------------------------------------------
  // DELAY BEHAVIOR
  // ---------------------------------------------------------------------------

  it('should deny the first Attempt', async () => {
    nowSpy.and.returnValue(0);

    controller
      .handleMessage({
        type: ControllerMessageTypes.Attempt,
        traceId: 't1'
      })
      .subscribe((v: any) => output.push(v));

    await flushVaultPipeline();

    expect(output).toEqual(['deny']);
  });

  it('should deny every Attempt regardless of timing', async () => {
    nowSpy.and.returnValue(0);

    controller
      .handleMessage({ type: ControllerMessageTypes.Attempt, traceId: 't1' })
      .subscribe((v: any) => output.push(v));

    await flushVaultPipeline();

    nowSpy.and.returnValue(250);

    controller
      .handleMessage({ type: ControllerMessageTypes.Attempt, traceId: 't2' })
      .subscribe((v: any) => output.push(v));

    await flushVaultPipeline();

    nowSpy.and.returnValue(500);

    controller
      .handleMessage({ type: ControllerMessageTypes.Attempt, traceId: 't3' })
      .subscribe((v: any) => output.push(v));

    await flushVaultPipeline();

    expect(output).toEqual(['deny', 'deny', 'deny']);
  });

  it('should never abort Attempts', async () => {
    nowSpy.and.returnValue(0);

    controller
      .handleMessage({ type: ControllerMessageTypes.Attempt, traceId: 't1' })
      .subscribe((v: any) => output.push(v));

    await flushVaultPipeline();

    expect(output).not.toContain('abort');
  });

  // ---------------------------------------------------------------------------
  // NON-ATTEMPT MESSAGES
  // ---------------------------------------------------------------------------

  it('should abstain on Success message', async () => {
    controller
      .handleMessage({ type: ControllerMessageTypes.Success, traceId: 'x' })
      .subscribe((v: any) => output.push(v));

    await flushVaultPipeline();

    expect(output).toEqual(['abstain']);
  });

  it('should abstain on Failure message', async () => {
    controller
      .handleMessage({ type: ControllerMessageTypes.Failure, traceId: 'x' })
      .subscribe((v: any) => output.push(v));

    await flushVaultPipeline();

    expect(output).toEqual(['abstain']);
  });

  it('should abstain on Finalize message', async () => {
    controller
      .handleMessage({ type: ControllerMessageTypes.Finalize, traceId: 'x' })
      .subscribe((v: any) => output.push(v));

    await flushVaultPipeline();

    expect(output).toEqual(['abstain']);
  });

  it('should abstain on unknown message type', async () => {
    controller
      .handleMessage({ type: 'unknown', traceId: 'x' } as any)
      .subscribe((v: any) => output.push(v));

    await flushVaultPipeline();

    expect(output).toEqual(['abstain']);
  });

  // ---------------------------------------------------------------------------
  // RESET / DESTROY
  // ---------------------------------------------------------------------------

  it('reset() should log warning', async () => {
    controller.reset();
    await flushVaultPipeline();

    expect(warnSpy).toHaveBeenCalledWith('[vault]', 'delay-key reset');
  });

  it('destroy() should log warning', async () => {
    controller.destroy();
    await flushVaultPipeline();

    expect(warnSpy).toHaveBeenCalledWith('[vault]', 'delay-key destroy');
  });

  // ---------------------------------------------------------------------------
  // FLUENT API
  // ---------------------------------------------------------------------------

  describe('fluent api: installFluentApi()', () => {
    let cell: any;
    let controllerConfigs: Map<string, unknown>;

    beforeEach(() => {
      controllerConfigs = new Map();

      cell = {
        key: 'cell-key'
      };

      withDelayController.installFluentApi(cell, controllerConfigs);
    });

    it('should install withDelay on the cell', () => {
      expect(typeof cell.withDelay).toBe('function');
    });

    it('should store options in controllerConfigs under withDelay key', () => {
      const options = { millisecondDelay: 500 };

      cell.withDelay(options);

      expect(controllerConfigs.has('withDelay')).toBeTrue();
      expect(controllerConfigs.get('withDelay')).toBe(options);
    });

    it('should return the cell for fluent chaining', () => {
      const options = { millisecondDelay: 500 };

      const result = cell.withDelay(options);

      expect(result).toBe(cell);
    });

    it('should overwrite previous delay config when called again', () => {
      const options1 = { millisecondDelay: 100 };
      const options2 = { millisecondDelay: 250 };

      cell.withDelay(options1);
      cell.withDelay(options2);

      expect(controllerConfigs.get('withDelay')).toBe(options2);
    });

    it('should request revote when delay expires', async () => {
      const revotes: string[] = [];

      controller = new withDelayController('delay-key', {
        controllerConfig: { millisecondDelay: 1000 },
        requestRevote: (traceId: string) => revotes.push(traceId)
      } as any);

      nowSpy.and.returnValue(0);

      controller
        .handleMessage({
          type: ControllerMessageTypes.Attempt,
          traceId: 't1'
        })
        .subscribe();

      await flushVaultPipeline();

      nowSpy.and.returnValue(1000);
      jasmine.clock().tick(1000);

      expect(revotes).toEqual(['t1']);
    });

    it('should not request revote before delay expires', async () => {
      const revotes: string[] = [];

      controller = new withDelayController('delay-key', {
        controllerConfig: { millisecondDelay: 1000 },
        requestRevote: (traceId: string) => revotes.push(traceId)
      } as any);

      nowSpy.and.returnValue(0);

      controller
        .handleMessage({
          type: ControllerMessageTypes.Attempt,
          traceId: 't1'
        })
        .subscribe();

      await flushVaultPipeline();

      nowSpy.and.returnValue(999);
      jasmine.clock().tick(999);

      expect(revotes).toEqual([]);
    });

    it('should request revote for all expired traces', async () => {
      const revotes: string[] = [];

      controller = new withDelayController('delay-key', {
        controllerConfig: { millisecondDelay: 500 },
        requestRevote: (traceId: string) => revotes.push(traceId)
      } as any);

      nowSpy.and.returnValue(0);

      controller
        .handleMessage({ type: ControllerMessageTypes.Attempt, traceId: 't1' })
        .subscribe();
      controller
        .handleMessage({ type: ControllerMessageTypes.Attempt, traceId: 't2' })
        .subscribe();

      await flushVaultPipeline();

      nowSpy.and.returnValue(500);
      jasmine.clock().tick(500);

      expect(revotes.sort()).toEqual(['t1', 't2']);
    });

    it('should abstain after delay expires on subsequent attempt', async () => {
      nowSpy.and.returnValue(0);

      controller
        .handleMessage({
          type: ControllerMessageTypes.Attempt,
          traceId: 't1'
        })
        .subscribe((v: any) => output.push(v));

      await flushVaultPipeline();

      expect(output).toEqual(['deny']);

      nowSpy.and.returnValue(1000);

      controller
        .handleMessage({
          type: ControllerMessageTypes.Attempt,
          traceId: 't1'
        })
        .subscribe((v: any) => output.push(v));

      await flushVaultPipeline();

      expect(output).toEqual(['deny', 'abstain']);
    });

    it('reset should clear pending timers and prevent revote', async () => {
      const revotes: string[] = [];

      controller = new withDelayController('delay-key', {
        controllerConfig: { millisecondDelay: 1000 },
        requestRevote: (traceId: string) => revotes.push(traceId)
      } as any);

      nowSpy.and.returnValue(0);

      controller
        .handleMessage({
          type: ControllerMessageTypes.Attempt,
          traceId: 't1'
        })
        .subscribe();

      await flushVaultPipeline();

      controller.reset();

      nowSpy.and.returnValue(1000);
      jasmine.clock().tick(1000);

      expect(revotes).toEqual([]);
    });

    it('should immediately abstain when delay is zero', async () => {
      controller = new withDelayController('delay-key', {
        controllerConfig: { millisecondDelay: 0 }
      } as any);

      nowSpy.and.returnValue(0);

      controller
        .handleMessage({
          type: ControllerMessageTypes.Attempt,
          traceId: 't1'
        })
        .subscribe((v: any) => output.push(v));

      await flushVaultPipeline();

      controller
        .handleMessage({
          type: ControllerMessageTypes.Attempt,
          traceId: 't1'
        })
        .subscribe((v: any) => output.push(v));

      await flushVaultPipeline();

      expect(output).toEqual(['deny', 'abstain']);
    });

    it('should deny again when trace is seen before and not yet expired', async () => {
      // Arrange
      nowSpy.and.returnValue(0);

      // First attempt: queues the trace
      controller
        .handleMessage({ type: ControllerMessageTypes.Attempt, traceId: 't1' })
        .subscribe((v: any) => output.push(v));

      await flushVaultPipeline();

      // Act — time advances, but NOT past emitAt (1000)
      nowSpy.and.returnValue(500);

      controller
        .handleMessage({ type: ControllerMessageTypes.Attempt, traceId: 't1' })
        .subscribe((v: any) => output.push(v));

      await flushVaultPipeline();

      // Assert — second call is still Deny
      expect(output).toEqual(['deny', 'deny']);

      // Optional but valuable: verify debug branch was hit
      expect(debugSpy).toHaveBeenCalledWith(
        '[vault]',
        'delay-key DENY — trace t1 not ready (now=500, emitAt=1000)'
      );
    });
  });

  // ---------------------------------------------------------------------------
  // CONFIG VALIDATION
  // ---------------------------------------------------------------------------

  describe('without config', () => {
    it('should throw if options are missing', () => {
      expect(
        () => new withDelayController<any>('delay-key', {} as any)
      ).toThrowError(
        '[vault] Delay controller requires a delay in milliseconds (>=0). Received "undefined".'
      );
    });

    it('should throw if millisecondDelay is missing', () => {
      expect(
        () =>
          new withDelayController<any>('delay-key', {
            controllerConfig: {}
          } as ControllerClassContext)
      ).toThrowError(
        '[vault] Delay controller requires a delay in milliseconds (>=0). Received "undefined".'
      );
    });

    it('should throw if millisecondDelay is negative', () => {
      expect(
        () =>
          new withDelayController<any>('delay-key', {
            controllerConfig: {
              millisecondDelay: -1
            } as WithDelayControllerOptions
          } as ControllerClassContext)
      ).toThrowError(
        '[vault] Delay controller requires a delay in milliseconds (>=0). Received "-1".'
      );
    });
  });
});
