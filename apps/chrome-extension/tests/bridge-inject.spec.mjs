import { loadScript } from './chrome-mock.mjs';

describe('Chrome Extension: bridge-inject.js', () => {
  let postMessageCalls;
  let originalPostMessage;

  beforeEach(() => {
    delete globalThis.__vaultDevtoolsBridgeInjected;
    delete globalThis.sdux;
    postMessageCalls = [];

    // bridge-inject.js uses `window` which doesn't exist in Node
    if (!globalThis.window) globalThis.window = globalThis;

    originalPostMessage = globalThis.postMessage;
    globalThis.postMessage = (...args) => postMessageCalls.push(args);

    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
    delete globalThis.__vaultDevtoolsBridgeInjected;
    delete globalThis.sdux;
    globalThis.postMessage = originalPostMessage;
  });

  function createMockMonitor() {
    return {
      activateGlobalInsights: jasmine.createSpy('activateGlobalInsights')
    };
  }

  function createMockBus() {
    let subscriber;
    return {
      pipeline$: jasmine.createSpy('pipeline$').and.callFake(() => ({
        subscribe(fn) {
          subscriber = fn;
        }
      })),
      _emit(event) {
        subscriber?.(event);
      }
    };
  }

  describe('injection guard', () => {
    it('should set the injection guard on first load', () => {
      globalThis.sdux = {
        vaultMonitorInstance: createMockMonitor(),
        vaultEventBus: createMockBus()
      };
      spyOn(console, 'warn');

      loadScript('bridge/bridge-inject.js');

      expect(globalThis.__vaultDevtoolsBridgeInjected).toBe(true);
    });

    it('should not re-execute when already injected', () => {
      globalThis.__vaultDevtoolsBridgeInjected = true;
      const monitor = createMockMonitor();
      globalThis.sdux = {
        vaultMonitorInstance: monitor,
        vaultEventBus: createMockBus()
      };

      loadScript('bridge/bridge-inject.js');

      expect(monitor.activateGlobalInsights).not.toHaveBeenCalled();
    });
  });

  describe('vault detection', () => {
    it('should activate global insights when vault is immediately available', () => {
      const monitor = createMockMonitor();
      const bus = createMockBus();
      globalThis.sdux = { vaultMonitorInstance: monitor, vaultEventBus: bus };
      spyOn(console, 'warn');

      loadScript('bridge/bridge-inject.js');

      expect(monitor.activateGlobalInsights).toHaveBeenCalledWith({
        id: 'dev-tools',
        wantsState: true,
        wantsPayload: true,
        wantsErrors: true,
        wantsQueue: true
      });
    });

    it('should subscribe to pipeline events', () => {
      const monitor = createMockMonitor();
      const bus = createMockBus();
      globalThis.sdux = { vaultMonitorInstance: monitor, vaultEventBus: bus };
      spyOn(console, 'warn');

      loadScript('bridge/bridge-inject.js');

      expect(bus.pipeline$).toHaveBeenCalled();
    });

    it('should forward pipeline events via postMessage', () => {
      const monitor = createMockMonitor();
      const bus = createMockBus();
      globalThis.sdux = { vaultMonitorInstance: monitor, vaultEventBus: bus };
      spyOn(console, 'warn');

      loadScript('bridge/bridge-inject.js');

      const event = { cell: 'test', type: 'stage:start', timestamp: 123 };
      bus._emit(event);

      expect(postMessageCalls.length).toBe(1);
      expect(postMessageCalls[0][0]).toEqual({
        source: 'vault-devtools',
        type: 'VAULT_PIPELINE_EVENT',
        event
      });
      expect(postMessageCalls[0][1]).toBe('*');
    });

    it('should retry when vault globals are not yet available', () => {
      spyOn(console, 'warn');

      loadScript('bridge/bridge-inject.js');

      expect(console.warn).toHaveBeenCalled();

      // Make vault available before second retry
      const monitor = createMockMonitor();
      const bus = createMockBus();
      globalThis.sdux = { vaultMonitorInstance: monitor, vaultEventBus: bus };

      // Advance past first retry (500ms * 2 = 1000ms)
      jasmine.clock().tick(1100);

      expect(monitor.activateGlobalInsights).toHaveBeenCalled();
    });

    it('should log error after max retries without vault', () => {
      spyOn(console, 'error');
      spyOn(console, 'warn');

      loadScript('bridge/bridge-inject.js');

      // Tick past all retries
      jasmine.clock().tick(1100);
      jasmine.clock().tick(1600);

      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('error resilience', () => {
    it('should handle activateGlobalInsights throwing', () => {
      spyOn(console, 'error');
      spyOn(console, 'warn');
      const monitor = {
        activateGlobalInsights: jasmine
          .createSpy('activateGlobalInsights')
          .and.throwError('insights failed')
      };
      const bus = createMockBus();
      globalThis.sdux = { vaultMonitorInstance: monitor, vaultEventBus: bus };

      loadScript('bridge/bridge-inject.js');

      expect(console.error).toHaveBeenCalledWith(
        '[Vault DevTools] Failed to enable insights:',
        jasmine.any(Error)
      );
      expect(bus.pipeline$).toHaveBeenCalled();
    });
  });
});
