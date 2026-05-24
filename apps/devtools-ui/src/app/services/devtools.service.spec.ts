import { Injectable, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { withArrayPushMergeBehavior } from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { EventBus, EventBusContract } from '@sdux-vault/devtools';
import { DEVTOOLS_LOGGING_KEY_CONSTANT, EventShape } from '@sdux-vault/shared';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { InsightService } from '../services/insight/insight.service';
import { DevtoolsService } from './devtools.service';

describe('Service: Devtools', () => {
  const key = DEVTOOLS_LOGGING_KEY_CONSTANT;
  let service: DevtoolsService;
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
          DevtoolsService,
          { key, initialState: [], insights: {} as any },
          [withArrayPushMergeBehavior]
        ),
        DevtoolsService
      ]
    });

    service = TestBed.inject(DevtoolsService);
  });

  describe('pipeline', () => {
    it('should create successfully', () => {
      expect(service.events()).toEqual([]);
    });

    it('should record incoming events from the event bus', async () => {
      await flushVaultPipeline();

      const base: EventShape = Object({
        id: '1',
        cell: 'cell',
        behaviorKey: 'behavior-key',
        type: 'set',
        timestamp: Date.now(),
        state: { value: { id: 1 } }
      });

      bus.nextPipeline(base);
      await flushVaultPipeline();
      await flushVaultPipeline();
      await flushVaultPipeline();
      await flushVaultPipeline();

      let allEvents = service.events();
      expect(allEvents).toEqual([]);
      expect(service.totalEvents()).toBe(0);

      service.clearEvents();
      allEvents = service.events();
      expect(service.totalEvents()).toBe(0);
      expect(allEvents.length).toBe(0);
    });
  });
});
