import { DevMode, EventShape } from '@sdux-vault/shared';
import { take } from 'rxjs';
import { EventBusContract } from '../interfaces/event-bus.contract';
import { EventBus } from './event-bus';

describe('Utils: EventBus)', () => {
  let bus: EventBusContract;

  describe('dev mode', () => {
    beforeEach(() => {
      DevMode.setDevMode(true);
      bus = EventBus();
    });

    it('should validate the chrome plug-in hook', () => {
      expect(window.sdux?.vaultEventBus).toBeTruthy();
    });

    it('should emit an event with a generated ID', () => {
      const inputEvent: EventShape = {
        cell: 'vault-1',
        type: 'init',
        timestamp: Date.now(),
        state: { isLoading: false, value: [], error: null, hasValue: true }
      } as any;

      let event;

      bus
        .pipeline$()
        .pipe(take(1))
        .subscribe((result: any) => {
          event = result;
        });

      bus.nextPipeline(inputEvent);

      expect(event).toEqual(
        Object({
          cell: 'vault-1',
          type: 'init',
          timestamp: jasmine.any(Number),
          state: Object({
            isLoading: false,
            value: [],
            error: null,
            hasValue: true
          })
        })
      );
    });

    it('should generate unique IDs for multiple events', () => {
      const events: any = [];
      const total = 3;

      bus
        .pipeline$()
        .pipe(take(total))
        .subscribe((event) => {
          events.push(event);
        });

      for (let i = 0; i < total; i++) {
        bus.nextPipeline({
          cell: `vault-${i}`,
          type: 'patch',
          timestamp: Date.now(),
          state: { isLoading: false, value: i, error: null, hasValue: true }
        } as any);
      }

      expect(events).toEqual([
        Object({
          cell: 'vault-0',
          type: 'patch',
          timestamp: jasmine.any(Number),
          state: Object({
            isLoading: false,
            value: 0,
            error: null,
            hasValue: true
          })
        }),
        Object({
          cell: 'vault-1',
          type: 'patch',
          timestamp: jasmine.any(Number),
          state: Object({
            isLoading: false,
            value: 1,
            error: null,
            hasValue: true
          })
        }),
        Object({
          cell: 'vault-2',
          type: 'patch',
          timestamp: jasmine.any(Number),
          state: Object({
            isLoading: false,
            value: 2,
            error: null,
            hasValue: true
          })
        })
      ]);
    });

    it('should not emit and empty event', () => {
      let emitted = false;
      bus
        .pipeline$()
        .pipe(take(1))
        .subscribe(() => (emitted = true));

      bus.nextPipeline(undefined as any);
      bus.nextPipeline(null as any);

      expect(emitted).toBeFalse();
    });
  });

  describe('production mode - false', () => {
    beforeEach(() => {
      DevMode.setDevMode(false);
      bus = EventBus();
    });

    it('should not emit anything when isDevMode() returns false', () => {
      const inputEvent: EventShape = {
        cell: 'vault2',
        type: 'dispose',
        timestamp: Date.now(),
        state: {
          isLoading: true,
          value: [],
          error: null,
          hasValue: () => false
        }
      } as any;

      let emitted = false;
      bus
        .pipeline$()
        .pipe(take(1))
        .subscribe(() => (emitted = true));

      bus.nextPipeline(inputEvent);

      expect(emitted).toBeFalse();
    });
  });

  describe('production mode - undefined', () => {
    beforeEach(() => {
      DevMode.setDevMode(undefined as any);
      bus = EventBus();
    });

    it('should not emit when event is null or undefined', () => {
      let emitted = false;
      const inputEvent: EventShape = {
        cell: 'vault2',
        type: 'dispose',
        timestamp: Date.now(),
        state: { isLoading: true, value: [], error: null, hasValue: false }
      } as any;
      bus
        .pipeline$()
        .pipe(take(1))
        .subscribe(() => (emitted = true));

      bus.nextPipeline(inputEvent);

      expect(emitted).toBeFalse();
    });
  });
});
