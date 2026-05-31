import { NgZone, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { InsightService } from './insight.service';

describe('InsightService', () => {
  let service: InsightService;
  let originalConnect: any;

  beforeEach(() => {
    originalConnect = chrome?.runtime?.connect;
    if (chrome?.runtime) {
      (chrome.runtime as any).connect = undefined;
    }
    delete (globalThis as any).sdux;
  });

  afterEach(() => {
    if (chrome?.runtime) {
      (chrome.runtime as any).connect = originalConnect;
    }
    delete (globalThis as any).sdux;
  });

  describe('without Chrome extension', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [InsightService, provideZonelessChangeDetection()]
      });
      service = TestBed.inject(InsightService);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should set isChromeExtension to false', () => {
      expect(service.isChromeExtension).toBeFalse();
    });

    it('should return EventBus pipeline$ when not in Chrome extension', () => {
      const obs = service.pipeline$();
      expect(obs).toBeDefined();
      expect(obs.subscribe).toBeDefined();
    });

    it('should support listenPipeline with a callback', () => {
      const spy = jasmine.createSpy('hook');
      const cleanup = service.listenPipeline(spy);
      expect(cleanup).toBeDefined();
      cleanup();
    });

    it('should initialize vaultConfig as null', () => {
      expect(service.vaultConfig()).toBeNull();
    });

    describe('refreshLocalConfig', () => {
      it('should do nothing when globalThis.sdux is undefined', () => {
        service.refreshLocalConfig();
        expect(service.vaultConfig()).toBeNull();
      });

      it('should read versions from globalThis.sdux', () => {
        (globalThis as any).sdux = {
          versions: { '@sdux-vault/test': '1.0.0' }
        };

        service.refreshLocalConfig();

        expect(service.vaultConfig()?.versions).toEqual({
          '@sdux-vault/test': '1.0.0'
        });
      });

      it('should read registry from globalThis.sdux.getRegistry', () => {
        const mockBehavior = {
          key: 'SDUX::Behavior::Core::Value',
          type: 'coreState'
        };
        const mockController = {
          key: 'SDUX::Controller::Policy::CoreAbstain',
          type: 'coreAbstain'
        };
        const mockCell = {
          key: 'test-cell',
          behaviorsRegistered: true,
          controllersRegistered: true,
          fluentApis: {
            filters: 0,
            reducers: 0,
            beforeTaps: 0,
            afterTaps: 0,
            interceptors: 0,
            operators: 0,
            emitStateCallbacks: 0,
            errorCallbacks: 0
          },
          behaviors: new Map([['b1', mockBehavior]]),
          controllers: new Map([['c1', mockController]])
        };

        (globalThis as any).sdux = {
          versions: {},
          getRegistry: () => new Map([['test-cell', mockCell]])
        };

        service.refreshLocalConfig();

        const config = service.vaultConfig();
        expect(config?.registry?.length).toBe(1);
        expect(config?.registry?.[0].key).toBe('test-cell');
        expect(config?.registry?.[0].behaviors.length).toBe(1);
        expect(config?.registry?.[0].controllers.length).toBe(1);
      });

      it('should handle registry with no behaviors or controllers maps', () => {
        const mockCell = {
          key: 'empty-cell',
          behaviorsRegistered: false,
          controllersRegistered: false
        };

        (globalThis as any).sdux = {
          versions: {},
          getRegistry: () => new Map([['empty-cell', mockCell]])
        };

        service.refreshLocalConfig();

        const config = service.vaultConfig();
        expect(config?.registry?.[0].behaviors).toEqual([]);
        expect(config?.registry?.[0].controllers).toEqual([]);
        expect(config?.registry?.[0].fluentApis).toBeNull();
      });

      it('should handle getRegistry returning null', () => {
        (globalThis as any).sdux = {
          versions: { '@test/pkg': '2.0.0' },
          getRegistry: () => null
        };

        service.refreshLocalConfig();

        const config = service.vaultConfig();
        expect(config?.versions).toEqual({ '@test/pkg': '2.0.0' });
        expect(config?.registry).toBeNull();
      });

      it('should handle getRegistry throwing an error', () => {
        (globalThis as any).sdux = {
          versions: { '@test/pkg': '3.0.0' },
          getRegistry: () => {
            throw new Error('Registry unavailable');
          }
        };

        service.refreshLocalConfig();

        const config = service.vaultConfig();
        expect(config?.versions).toEqual({ '@test/pkg': '3.0.0' });
        expect(config?.registry).toBeNull();
      });

      it('should merge config preserving existing versions', () => {
        (globalThis as any).sdux = {
          versions: { '@sdux-vault/a': '1.0.0' }
        };
        service.refreshLocalConfig();

        (globalThis as any).sdux = {
          versions: { '@sdux-vault/b': '2.0.0' }
        };
        service.refreshLocalConfig();

        const config = service.vaultConfig();
        expect(config?.versions).toEqual({
          '@sdux-vault/a': '1.0.0',
          '@sdux-vault/b': '2.0.0'
        });
      });

      it('should handle sdux with no versions', () => {
        (globalThis as any).sdux = {};

        service.refreshLocalConfig();

        const config = service.vaultConfig();
        expect(config?.versions).toEqual({});
      });
    });
  });

  describe('with Chrome extension', () => {
    let mockPort: any;
    let messageListener: any;
    let disconnectListener: any;

    beforeEach(() => {
      mockPort = {
        onMessage: {
          addListener: (cb: any) => {
            messageListener = cb;
          }
        },
        onDisconnect: {
          addListener: (cb: any) => {
            disconnectListener = cb;
          }
        }
      };

      (chrome.runtime as any).connect = jasmine
        .createSpy('connect')
        .and.returnValue(mockPort);

      TestBed.configureTestingModule({
        providers: [InsightService, provideZonelessChangeDetection()]
      });
      service = TestBed.inject(InsightService);
    });

    it('should set isChromeExtension to true', () => {
      expect(service.isChromeExtension).toBeTrue();
    });

    it('should connect a port on construction', () => {
      expect((globalThis as any).chrome.runtime.connect).toHaveBeenCalledWith({
        name: 'vault-devtools'
      });
    });

    it('should return chromePipeline$ when in Chrome extension', () => {
      const obs = service.pipeline$();
      expect(obs).toBeDefined();
    });

    it('should emit pipeline events from port messages', (done) => {
      const mockEvent = { id: 1, type: 'stage', cell: 'alpha' };

      service.pipeline$().subscribe((event: any) => {
        expect(event).toEqual(mockEvent);
        done();
      });

      const zone = TestBed.inject(NgZone);
      zone.run(() => {
        messageListener({
          type: 'VAULT_PIPELINE_EVENT',
          event: mockEvent
        });
      });
    });

    it('should update vaultConfig from VAULT_CONFIG messages', () => {
      const zone = TestBed.inject(NgZone);
      zone.run(() => {
        messageListener({
          type: 'VAULT_CONFIG',
          config: {
            versions: { '@sdux-vault/test': '1.0.0' },
            registry: null
          }
        });
      });

      expect(service.vaultConfig()?.versions).toEqual({
        '@sdux-vault/test': '1.0.0'
      });
    });

    it('should ignore messages with no type', () => {
      messageListener({});
      messageListener({ event: {} });
      expect(service.vaultConfig()).toBeNull();
    });

    it('should warn on unhandled message types', () => {
      const warnSpy = spyOn(console, 'warn');

      messageListener({ type: 'UNKNOWN_TYPE' });

      expect(warnSpy).toHaveBeenCalledWith(
        '[Vault DevTools] Unhandled message type: "UNKNOWN_TYPE"'
      );
    });

    it('should schedule reconnection on disconnect', () => {
      jasmine.clock().install();

      (globalThis as any).chrome.runtime.connect.and.returnValue(mockPort);

      disconnectListener();

      jasmine.clock().tick(InsightService.RECONNECT_DELAY_MS + 1);

      expect((globalThis as any).chrome.runtime.connect).toHaveBeenCalledTimes(
        2
      );

      jasmine.clock().uninstall();
    });

    it('should clear existing reconnect timer before scheduling new one', () => {
      jasmine.clock().install();

      disconnectListener();
      disconnectListener();

      jasmine.clock().tick(InsightService.RECONNECT_DELAY_MS + 1);

      expect((globalThis as any).chrome.runtime.connect).toHaveBeenCalledTimes(
        2
      );

      jasmine.clock().uninstall();
    });
  });
});
