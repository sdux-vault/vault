import {
  ControllerClassContext,
  ControllerMessageTypes,
  setVaultLogLevel
} from '@sdux-vault/shared';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { withMaxFailuresController } from './with-max-failure.controller';

describe('Controller: withMaxFailures (attempt-gated abort)', () => {
  let controller: any;
  let warnSpy: jasmine.Spy;
  let debugSpy: jasmine.Spy;
  const output: any[] = [];

  beforeAll(() => {
    warnSpy = spyOn(console, 'warn');
    debugSpy = spyOn(console, 'debug');
  });

  beforeEach(() => {
    warnSpy.calls.reset();
    debugSpy.calls.reset();
    output.length = 0;

    setVaultLogLevel('debug');

    controller = new withMaxFailuresController('maxfail-key', {
      controllerConfig: {
        maxFailures: 3
      }
    } as any);
  });

  afterEach(() => {
    setVaultLogLevel('off');
  });

  // ---------------------------------------------------------------------------
  // METADATA
  // ---------------------------------------------------------------------------

  it('should expose correct instance metadata', () => {
    expect(controller.key).toBe('maxfail-key');
    expect(controller.type).toBe('error');
    expect(controller.critical).toBeFalse();
  });

  it('should expose correct static decorator metadata', () => {
    expect(withMaxFailuresController.type).toBe('error');
    expect(withMaxFailuresController.critical).toBeFalse();
    expect(withMaxFailuresController.key).toBe(
      'SDUX::Controller::Policy::MaxFailures'
    );
    expect(withMaxFailuresController.wantsConfig).toBeTrue();
    expect(withMaxFailuresController.configKey).toBe('withMaxFailures');
    expect(typeof withMaxFailuresController.extensionFluent).toBe('function');
    expect(typeof withMaxFailuresController.installFluentApi).toBe('function');
  });

  // ---------------------------------------------------------------------------
  // CORE BEHAVIOR
  // ---------------------------------------------------------------------------

  it('should abstain on Attempt when no failures recorded', async () => {
    controller
      .handleMessage({ type: ControllerMessageTypes.Attempt, traceId: 't1' })
      .subscribe((v: any) => output.push(v));

    await flushVaultPipeline();

    expect(output).toEqual(['abstain']);
  });

  it('should record Failure and emit no vote', async () => {
    controller
      .handleMessage({ type: ControllerMessageTypes.Failure, traceId: 't1' })
      .subscribe((v: any) => output.push(v));

    await flushVaultPipeline();

    // Failure path returns of() (void) -> no emissions
    expect(output).toEqual([]);
  });

  it('should abstain on Attempt when failures are below maxFailures', async () => {
    controller
      .handleMessage({ type: ControllerMessageTypes.Failure, traceId: 't1' })
      .subscribe();
    controller
      .handleMessage({ type: ControllerMessageTypes.Failure, traceId: 't1' })
      .subscribe();

    await flushVaultPipeline();

    controller
      .handleMessage({ type: ControllerMessageTypes.Attempt, traceId: 't1' })
      .subscribe((v: any) => output.push(v));

    await flushVaultPipeline();

    expect(output).toEqual(['abstain']);
  });

  it('should abort on Attempt once failures meet maxFailures and then clear the counter', async () => {
    controller
      .handleMessage({ type: ControllerMessageTypes.Failure, traceId: 't1' })
      .subscribe();
    controller
      .handleMessage({ type: ControllerMessageTypes.Failure, traceId: 't1' })
      .subscribe();
    controller
      .handleMessage({ type: ControllerMessageTypes.Failure, traceId: 't1' })
      .subscribe();

    await flushVaultPipeline();

    controller
      .handleMessage({ type: ControllerMessageTypes.Attempt, traceId: 't1' })
      .subscribe((v: any) => output.push(v));

    await flushVaultPipeline();

    expect(output).toEqual(['abort']);

    // counter should be cleared after abort, so next Attempt should abstain
    output.length = 0;
    controller
      .handleMessage({ type: ControllerMessageTypes.Attempt, traceId: 't1' })
      .subscribe((v: any) => output.push(v));

    await flushVaultPipeline();

    expect(output).toEqual(['abstain']);
  });

  it('should reset failure count when a new trace arrives', async () => {
    // Accumulate failures on trace 'a'
    controller
      .handleMessage({ type: ControllerMessageTypes.Failure, traceId: 'a' })
      .subscribe(); // a=1
    controller
      .handleMessage({ type: ControllerMessageTypes.Failure, traceId: 'a' })
      .subscribe(); // a=2

    await flushVaultPipeline();

    // Switch to trace 'b' — counter must reset
    controller
      .handleMessage({ type: ControllerMessageTypes.Attempt, traceId: 'b' })
      .subscribe((v: any) => output.push(['b', v]));

    await flushVaultPipeline();

    // Trace 'b' should start fresh (abstain, not abort)
    expect(output).toEqual([['b', 'abstain']]);
  });

  it('should allow (abstain) for Success, Finalize, and unknown message types', async () => {
    controller
      .handleMessage({ type: ControllerMessageTypes.Success, traceId: 'x' })
      .subscribe((v: any) => output.push(v));

    controller
      .handleMessage({ type: ControllerMessageTypes.Finalize, traceId: 'x' })
      .subscribe((v: any) => output.push(v));

    controller
      .handleMessage({ type: 'unknown' as any, traceId: 'x' })
      .subscribe((v: any) => output.push(v));

    await flushVaultPipeline();

    expect(output).toEqual(['abstain', 'abstain', 'abstain']);
  });

  // ---------------------------------------------------------------------------
  // RESET / DESTROY
  // ---------------------------------------------------------------------------

  it('reset() should clear failure counts and log warning', async () => {
    controller
      .handleMessage({ type: ControllerMessageTypes.Failure, traceId: 't1' })
      .subscribe();
    controller
      .handleMessage({ type: ControllerMessageTypes.Failure, traceId: 't1' })
      .subscribe();

    await flushVaultPipeline();

    controller.reset();
    await flushVaultPipeline();

    controller
      .handleMessage({ type: ControllerMessageTypes.Attempt, traceId: 't1' })
      .subscribe((v: any) => output.push(v));

    await flushVaultPipeline();

    expect(output).toEqual(['abstain']);
    expect(warnSpy).toHaveBeenCalledWith('[vault]', 'maxfail-key reset');
  });

  it('destroy() should clear failure counts and log warning', async () => {
    controller
      .handleMessage({ type: ControllerMessageTypes.Failure, traceId: 't1' })
      .subscribe();
    controller
      .handleMessage({ type: ControllerMessageTypes.Failure, traceId: 't1' })
      .subscribe();
    controller
      .handleMessage({ type: ControllerMessageTypes.Failure, traceId: 't1' })
      .subscribe();

    await flushVaultPipeline();

    controller.destroy();
    await flushVaultPipeline();

    controller
      .handleMessage({ type: ControllerMessageTypes.Attempt, traceId: 't1' })
      .subscribe((v: any) => output.push(v));

    await flushVaultPipeline();

    expect(output).toEqual(['abstain']);
    expect(warnSpy).toHaveBeenCalledWith('[vault]', 'maxfail-key destroy');
  });

  // ---------------------------------------------------------------------------
  // FLUENT API
  // ---------------------------------------------------------------------------

  describe('fluent api: installFluentApi()', () => {
    let cell: any;
    let controllerConfigs: Map<string, unknown>;

    beforeEach(() => {
      controllerConfigs = new Map();
      cell = { key: 'cell-key' };

      withMaxFailuresController.installFluentApi(cell, controllerConfigs);
    });

    it('should install withMaxFailures on the cell', () => {
      expect(typeof cell.withMaxFailures).toBe('function');
    });

    it('should store options in controllerConfigs under withMaxFailures key', () => {
      const options = { maxFailures: 5 };

      cell.withMaxFailures(options);

      expect(controllerConfigs.has('withMaxFailures')).toBeTrue();
      expect(controllerConfigs.get('withMaxFailures')).toBe(options);
    });

    it('should return the cell for fluent chaining', () => {
      const options = { maxFailures: 2 };

      const result = cell.withMaxFailures(options);

      expect(result).toBe(cell);
    });

    it('should overwrite previous config when called again', () => {
      const options1 = { maxFailures: 2 };
      const options2 = { maxFailures: 4 };

      cell.withMaxFailures(options1);
      cell.withMaxFailures(options2);

      expect(controllerConfigs.get('withMaxFailures')).toBe(options2);
    });
  });

  // ---------------------------------------------------------------------------
  // CONFIG VALIDATION
  // ---------------------------------------------------------------------------

  describe('without config', () => {
    it('should throw if options are missing', () => {
      expect(
        () => new withMaxFailuresController<any>('key', {} as any)
      ).toThrowError(
        '[vault] MaxFailures controller requires a positive integer maxFailures. Received "undefined".'
      );
    });

    it('should throw if maxFailures is missing', () => {
      expect(
        () =>
          new withMaxFailuresController<any>('key', {
            controllerConfig: {}
          } as ControllerClassContext)
      ).toThrowError(
        '[vault] MaxFailures controller requires a positive integer maxFailures. Received "undefined".'
      );
    });

    it('should throw if maxFailures is zero', () => {
      expect(
        () =>
          new withMaxFailuresController<any>('key', {
            controllerConfig: { maxFailures: 0 }
          } as ControllerClassContext)
      ).toThrowError(
        '[vault] MaxFailures controller requires a positive integer maxFailures. Received "0".'
      );
    });

    it('should throw if maxFailures is negative', () => {
      expect(
        () =>
          new withMaxFailuresController<any>('key', {
            controllerConfig: { maxFailures: -1 }
          } as ControllerClassContext)
      ).toThrowError(
        '[vault] MaxFailures controller requires a positive integer maxFailures. Received "-1".'
      );
    });

    it('should throw if maxFailures is not an integer', () => {
      expect(
        () =>
          new withMaxFailuresController<any>('key', {
            controllerConfig: { maxFailures: 1.5 }
          } as ControllerClassContext)
      ).toThrowError(
        '[vault] MaxFailures controller requires a positive integer maxFailures. Received "1.5".'
      );
    });
  });
});
