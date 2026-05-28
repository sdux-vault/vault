import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EventBus, EventBusContract } from '@sdux-vault/devtools';
import { DevMode, EventShape } from '@sdux-vault/shared';
import { take } from 'rxjs';
import { InsightService } from './insight.service';

describe('Service: NgVaultInsightService - Pipeline', () => {
  let bus: EventBusContract;
  const received: EventShape[] = [];
  let hook: InsightService;

  describe('Angular Application', () => {
    beforeEach(() => {
      DevMode.setDevMode(true);
      TestBed.configureTestingModule({
        providers: [provideZonelessChangeDetection()]
      });
      bus = EventBus();
      hook = TestBed.inject(InsightService);
    });

    describe('listen', () => {
      it('should subscribe and receive events', (done) => {
        const stop = hook.listenPipeline((event: any) => {
          received.push(event);
          stop(); // unsubscribe after first event
          expect(received.length).toBe(1);
          done();
        });

        bus.nextPipeline({
          cell: 'debug-test',
          type: 'init',
          timestamp: Date.now(),
          state: { isLoading: false, value: [], error: null, hasValue: true }
        } as any);

        TestBed.tick();
      });

      it('should subscribe and receive events', (done) => {
        hook
          .pipeline$()
          .pipe(take(1))
          .subscribe((event: any) => {
            received.push(event);
            expect(received.length).toBe(2);
            done();
          });

        bus.nextPipeline({
          cell: 'debug-test',
          type: 'init',
          timestamp: Date.now(),
          state: { isLoading: false, value: [], error: null, hasValue: true }
        } as any);
      });
    });
  });

  describe('chrome runtime port handling', () => {
    let originalRuntime: any;
    let portListeners: any[];
    let disconnectListeners: any[];

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [InsightService, provideZonelessChangeDetection()]
      });

      originalRuntime = (globalThis as any).chrome?.runtime;
      portListeners = [];
      disconnectListeners = [];

      // Patch runtime to include connect API
      (globalThis as any).chrome = {
        ...(globalThis as any).chrome,
        runtime: {
          connect(_connectInfo: any) {
            return {
              name: _connectInfo?.name ?? '',
              onMessage: {
                addListener(fn: any) {
                  portListeners.push(fn);
                }
              },
              onDisconnect: {
                addListener(fn: any) {
                  disconnectListeners.push(fn);
                }
              },
              postMessage() {}
            };
          }
        }
      };

      // Recreate service AFTER chrome is mocked
      hook = TestBed.inject(InsightService);
    });

    afterEach(() => {
      // Restore whatever runtime existed originally
      if (originalRuntime) {
        (globalThis as any).chrome.runtime = originalRuntime;
      }
    });

    it('should emit events when receiving VAULT_PIPELINE_EVENT messages', (done) => {
      const mockEvent: EventShape = {
        cell: 'chrome-test',
        type: 'stage:start',
        timestamp: Date.now(),
        state: { isLoading: false, value: 'abc', error: null, hasValue: true }
      } as any;

      hook.pipeline$().subscribe((e) => {
        expect(e.cell).toBe('chrome-test');
        expect((e as any)?.state?.['value']).toBe('abc');
        done();
      });

      const listener = portListeners[0];

      expect(typeof listener).toBe('function');

      listener({ type: 'VAULT_PIPELINE_EVENT', event: mockEvent });
    });

    it('should ignore non-VAULT_PIPELINE_EVENT messages', (done) => {
      const received: EventShape[] = [];

      hook.pipeline$().subscribe((e) => received.push(e as any));

      const listener = portListeners[0];

      listener({ type: 'OTHER_EVENT', foo: 123 });

      setTimeout(() => {
        expect(received.length).toBe(0);
        done();
      }, 0);
    });

    it('should ignore a message without a type', (done) => {
      const received: EventShape[] = [];

      hook.pipeline$().subscribe((e) => received.push(e as any));

      const listener = portListeners[0];

      listener({ foo: 123 });

      setTimeout(() => {
        expect(received.length).toBe(0);
        done();
      }, 0);
    });

    it('should clear the port reference on disconnect', () => {
      expect(disconnectListeners.length).toBe(1);

      // Trigger disconnect callback
      disconnectListeners[0]();

      // Service should still be functional (isChromeExtension stays true)
      expect(hook.isChromeExtension).toBe(true);
    });
  });
});
