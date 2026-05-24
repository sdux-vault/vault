import {
  ControllerClassContext,
  ControllerMessageTypes,
  setVaultLogLevel
} from '@sdux-vault/shared';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { WithThrottleControllerOptions } from './options/with-throttle-controller.options';
import { withThrottleController } from './with-throttle.controller';

describe('Controller: withThrottle', () => {
  let controller: any;
  let warnSpy: jasmine.Spy;
  let debugSpy: jasmine.Spy;
  let nowSpy: jasmine.Spy;
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

    nowSpy = spyOn(Date, 'now');

    controller = new withThrottleController('throttle-key', {
      controllerConfig: {
        millisecondThrottle: 1_000
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
    expect(controller.key).toBe('throttle-key');
    expect(controller.type).toBe('policy');
    expect(controller.critical).toBeFalse();
  });

  it('should expose correct static decorator metadata', () => {
    expect(withThrottleController.type).toBe('policy');
    expect(withThrottleController.critical).toBeFalse();
    expect(withThrottleController.key).toBe(
      'SDUX::Controller::Policy::Throttle'
    );
    expect(withThrottleController.wantsConfig).toBeTrue();
    expect(withThrottleController.configKey).toBe('withThrottle');
    expect(typeof withThrottleController.extensionFluent).toBe('function');
    expect(typeof withThrottleController.installFluentApi).toBe('function');
  });

  // ---------------------------------------------------------------------------
  // THROTTLE BEHAVIOR
  // ---------------------------------------------------------------------------

  it('should allow the first Attempt and open throttle window', async () => {
    nowSpy.and.returnValue(0);

    controller
      .handleMessage({
        type: ControllerMessageTypes.Attempt,
        traceId: 't1'
      })
      .subscribe((v: any) => output.push(v));

    await flushVaultPipeline();

    expect(output).toEqual(['abstain']);
  });

  it('should Abort attempts inside the throttle window', async () => {
    nowSpy.and.returnValue(0);

    controller
      .handleMessage({
        type: ControllerMessageTypes.Attempt,
        traceId: 't1'
      })
      .subscribe((v: any) => output.push(v));

    await flushVaultPipeline();

    nowSpy.and.returnValue(250);

    controller
      .handleMessage({
        type: ControllerMessageTypes.Attempt,
        traceId: 't2'
      })
      .subscribe((v: any) => output.push(v));

    await flushVaultPipeline();

    expect(output).toEqual(['abstain', 'abort']);
  });

  it('should continue aborting until the window expires', async () => {
    nowSpy.and.returnValue(0);

    controller
      .handleMessage({ type: ControllerMessageTypes.Attempt, traceId: 't1' })
      .subscribe((v: any) => output.push(v));

    await flushVaultPipeline();

    nowSpy.and.returnValue(500);

    controller
      .handleMessage({ type: ControllerMessageTypes.Attempt, traceId: 't2' })
      .subscribe((v: any) => output.push(v));

    await flushVaultPipeline();

    nowSpy.and.returnValue(750);

    controller
      .handleMessage({ type: ControllerMessageTypes.Attempt, traceId: 't3' })
      .subscribe((v: any) => output.push(v));

    await flushVaultPipeline();

    expect(output).toEqual(['abstain', 'abort', 'abort']);
  });

  it('should allow a new Attempt once the window expires', async () => {
    nowSpy.and.returnValue(0);

    controller
      .handleMessage({ type: ControllerMessageTypes.Attempt, traceId: 't1' })
      .subscribe((v: any) => output.push(v));

    await flushVaultPipeline();

    nowSpy.and.returnValue(1000);

    controller
      .handleMessage({ type: ControllerMessageTypes.Attempt, traceId: 't2' })
      .subscribe((v: any) => output.push(v));

    await flushVaultPipeline();

    expect(output).toEqual(['abstain', 'abstain']);
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

  it('should abstain on Fail message', async () => {
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

  it('reset() should clear throttle window and log warning', async () => {
    nowSpy.and.returnValue(0);

    controller
      .handleMessage({ type: ControllerMessageTypes.Attempt, traceId: 't1' })
      .subscribe();

    controller.reset();
    await flushVaultPipeline();

    nowSpy.and.returnValue(10);

    controller
      .handleMessage({ type: ControllerMessageTypes.Attempt, traceId: 't2' })
      .subscribe((v: any) => output.push(v));

    await flushVaultPipeline();

    expect(output).toEqual(['abstain']);
    expect(warnSpy).toHaveBeenCalledWith('[vault]', 'throttle-key reset');
  });

  it('destroy() should clear throttle window and log warning', async () => {
    nowSpy.and.returnValue(0);

    controller
      .handleMessage({ type: ControllerMessageTypes.Attempt, traceId: 't1' })
      .subscribe();

    controller.destroy();
    await flushVaultPipeline();

    nowSpy.and.returnValue(10);

    controller
      .handleMessage({ type: ControllerMessageTypes.Attempt, traceId: 't2' })
      .subscribe((v: any) => output.push(v));

    await flushVaultPipeline();

    expect(output).toEqual(['abstain']);
    expect(warnSpy).toHaveBeenCalledWith('[vault]', 'throttle-key destroy');
  });

  describe('fluent api: installFluentApi()', () => {
    let cell: any;
    let controllerConfigs: Map<any, unknown>;

    beforeEach(() => {
      controllerConfigs = new Map();

      cell = {
        key: 'cell-key'
      };

      // install fluent api
      withThrottleController.installFluentApi(cell, controllerConfigs);
    });

    it('should install withThrottle on the cell', () => {
      expect(typeof cell.withThrottle).toBe('function');
    });

    it('should store options in controllerConfigs under WithCache key', () => {
      const options = {
        idKey: 'id',
        fetch: jasmine.createSpy('fetch')
      };

      cell.withThrottle(options);

      expect(controllerConfigs.has('withThrottle')).toBeTrue();
      expect(controllerConfigs.get('withThrottle')).toBe(options);
    });

    it('should return the cell to allow fluent chaining', () => {
      const options = {
        idKey: 'id',
        fetch: jasmine.createSpy('fetch')
      };

      const result = cell.withThrottle(options);

      expect(result).toBe(cell);
    });

    it('should overwrite previous cache config when called again', () => {
      const options1 = {
        idKey: 'id',
        fetch: jasmine.createSpy('fetch1')
      };

      const options2 = {
        idKey: 'uuid',
        fetch: jasmine.createSpy('fetch2')
      };

      cell.withThrottle(options1);
      cell.withThrottle(options2);

      expect(controllerConfigs.get('withThrottle')).toBe(options2);
    });
  });

  describe('without config', () => {
    it('should throw if options are missing', () => {
      expect(
        () => new withThrottleController<any>('behavior-key', {} as any)
      ).toThrowError(
        '[vault] Throttle controller requires a throttle in millisecond (>=0). A millisecondThrottle of "undefined" is not valid.'
      );
    });

    it('should throw if millisecondThrottle option is not added', () => {
      expect(
        () =>
          new withThrottleController<any>('behavior-key', {
            controllerConfig: {}
          } as ControllerClassContext)
      ).toThrowError(
        '[vault] Throttle controller requires a throttle in millisecond (>=0). A millisecondThrottle of "undefined" is not valid.'
      );
    });

    it('should throw if millisecondThrottle option is not added', () => {
      expect(
        () =>
          new withThrottleController<any>('behavior-key', {
            controllerConfig: {
              millisecondThrottle: -1
            } as WithThrottleControllerOptions
          } as ControllerClassContext)
      ).toThrowError(
        '[vault] Throttle controller requires a throttle in millisecond (>=0). A millisecondThrottle of "-1" is not valid.'
      );
    });
  });
});
