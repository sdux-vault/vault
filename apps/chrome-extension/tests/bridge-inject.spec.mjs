import { loadScript } from './chrome-mock.mjs';

const BRIDGE_KEY = Symbol.for('__vault_devtools_bridge__');

describe('Chrome Extension: bridge-inject.js', () => {
  let postMessageCalls;
  let originalPostMessage;
  let eventListeners;
  let originalAddEventListener;

  beforeEach(() => {
    delete globalThis[BRIDGE_KEY];
    delete globalThis.sdux;
    postMessageCalls = [];
    eventListeners = {};

    // bridge-inject.js uses `window` which doesn't exist in Node
    if (!globalThis.window) globalThis.window = globalThis;

    originalPostMessage = globalThis.postMessage;
    globalThis.postMessage = (...args) => postMessageCalls.push(args);

    originalAddEventListener = globalThis.addEventListener;
    globalThis.addEventListener = (type, fn) => {
      if (!eventListeners[type]) eventListeners[type] = [];
      eventListeners[type].push(fn);
    };

    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
    delete globalThis[BRIDGE_KEY];
    delete globalThis.sdux;
    globalThis.postMessage = originalPostMessage;
    globalThis.addEventListener = originalAddEventListener;
  });

  function createMockMonitor() {
    return {
      activateGlobalInsights: jasmine.createSpy('activateGlobalInsights')
    };
  }

  function createMockBus() {
    let subscriber;
    const unsubscribeSpy = jasmine.createSpy('unsubscribe');
    return {
      pipeline$: jasmine.createSpy('pipeline$').and.callFake(() => ({
        subscribe(fn) {
          subscriber = fn;
          return { unsubscribe: unsubscribeSpy };
        }
      })),
      _emit(event) {
        subscriber?.(event);
      },
      _unsubscribeSpy: unsubscribeSpy
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

      expect(globalThis[BRIDGE_KEY]).toBe(true);
    });

    it('should use a non-enumerable property to prevent fingerprinting', () => {
      globalThis.sdux = {
        vaultMonitorInstance: createMockMonitor(),
        vaultEventBus: createMockBus()
      };
      spyOn(console, 'warn');

      loadScript('bridge/bridge-inject.js');

      const descriptor = Object.getOwnPropertyDescriptor(
        globalThis,
        BRIDGE_KEY
      );
      expect(descriptor.enumerable).toBe(false);
      expect(descriptor.writable).toBe(false);
    });

    it('should not re-execute when already injected', () => {
      // Use configurable: true so afterEach cleanup works
      Object.defineProperty(globalThis, BRIDGE_KEY, {
        value: true,
        writable: false,
        enumerable: false,
        configurable: true
      });
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

      const pipelineMsg = postMessageCalls.find(
        (c) => c[0].type === 'VAULT_PIPELINE_EVENT'
      );
      expect(pipelineMsg).toBeDefined();
      expect(pipelineMsg[0]).toEqual({
        source: 'vault-devtools',
        type: 'VAULT_PIPELINE_EVENT',
        event
      });
      expect(pipelineMsg[1]).toBe('*');
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

  describe('subscription cleanup', () => {
    it('should unsubscribe pipeline on beforeunload', () => {
      const monitor = createMockMonitor();
      const bus = createMockBus();
      globalThis.sdux = { vaultMonitorInstance: monitor, vaultEventBus: bus };
      spyOn(console, 'warn');

      loadScript('bridge/bridge-inject.js');

      expect(bus._unsubscribeSpy).not.toHaveBeenCalled();

      // Trigger beforeunload
      const listeners = eventListeners['beforeunload'] || [];
      listeners.forEach((fn) => fn());

      expect(bus._unsubscribeSpy).toHaveBeenCalled();
    });

    it('should register a beforeunload listener', () => {
      const monitor = createMockMonitor();
      const bus = createMockBus();
      globalThis.sdux = { vaultMonitorInstance: monitor, vaultEventBus: bus };
      spyOn(console, 'warn');

      loadScript('bridge/bridge-inject.js');

      expect(eventListeners['beforeunload']?.length).toBe(1);
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
