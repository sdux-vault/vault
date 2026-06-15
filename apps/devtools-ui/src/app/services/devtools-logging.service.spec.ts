import { Injectable, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { withArrayPushMergeBehavior } from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { EventBus, EventBusContract } from '@sdux-vault/devtools';
import { vaultSettled } from '@sdux-vault/engine';
import { DEVTOOLS_LOGGING_KEY_CONSTANT, EventShape } from '@sdux-vault/shared';
import { InsightService } from '../services/insight/insight.service';
import { DevtoolsLoggingService } from './devtools-logging.service';

describe('Service: Devtools Logging', () => {
  const key = DEVTOOLS_LOGGING_KEY_CONSTANT;
  let service: DevtoolsLoggingService;
  let bus: EventBusContract;

  @Injectable()
  class MockInsightService {
    constructor(private bus: EventBusContract) {}

    pipeline$() {
      return this.bus.pipeline$(); // chrome stream mocked
    }

    listenPipeline() {
      return this.bus.pipeline$(); // local stream mocked
    }
  }

  beforeEach(() => {
    bus = EventBus();

    TestBed.configureTestingModule({
      providers: [
        provideVaultTesting(),

        provideZonelessChangeDetection(),
        {
          provide: InsightService,
          useFactory: () => new MockInsightService(bus)
        },
        provideFeatureCell(
          DevtoolsLoggingService,
          { key, initialState: [], insights: {} as any },
          [withArrayPushMergeBehavior]
        ),
        DevtoolsLoggingService
      ]
    });

    service = TestBed.inject(DevtoolsLoggingService);
  });

  describe('pipeline', () => {
    it('should create successfully', () => {
      expect(service.events()).toEqual([]);
    });

    it('should record incoming events from the event bus', async () => {
      const base: EventShape = Object({
        id: '1',
        cell: 'cell',
        behaviorKey: 'behavior-key',
        type: 'set',
        timestamp: Date.now(),
        state: { value: { id: 1 } }
      });

      bus.nextPipeline(base);
      await vaultSettled(key);

      let allEvents = service.events();
      expect(allEvents).toEqual([
        Object({
          id: '1',
          cell: 'cell',
          behaviorKey: 'behavior-key',
          type: 'set',
          timestamp: jasmine.any(Number),
          state: Object({ value: Object({ id: 1 }) })
        })
      ]);
      expect(service.totalEvents()).toBe(1);

      service.clearEvents();
      allEvents = service.events();
      expect(service.totalEvents()).toBe(0);
      expect(allEvents.length).toBe(0);
    });
  });
});
