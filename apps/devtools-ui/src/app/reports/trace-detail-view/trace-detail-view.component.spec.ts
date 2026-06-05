import { provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DevtoolsAggregateService } from '../../services/devtools-aggregate.service';
import { DevtoolsLoggingService } from '../../services/devtools-logging.service';
import type { TraceExecutionShape } from '../../shapes/trace';
import { TraceExecutionStatuses } from '../../shapes/trace';
import { TraceDetailViewComponent } from './trace-detail-view.component';

describe('Component: TraceDetailView', () => {
  let fixture: ComponentFixture<TraceDetailViewComponent>;
  let component: TraceDetailViewComponent;

  const mockTraces: TraceExecutionShape[] = [
    {
      traceId: 'trace-1',
      cellKey: 'vault::todos::cell',
      startedAt: 1000,
      finishedAt: 1005,
      events: [
        {
          name: 'conductor:start:dispatch',
          timestamp: 1000,
          traceId: 'trace-1',
          cell: 'vault::todos::cell',
          type: 'conductor',
          behaviorKey: 'addTodo',
          payload: { text: 'hello' }
        } as any,
        {
          name: 'stage:end:reducer',
          timestamp: 1003,
          traceId: 'trace-1',
          cell: 'vault::todos::cell',
          type: 'stage',
          behaviorKey: 'addTodo',
          state: {
            isLoading: false,
            error: null,
            hasValue: true,
            value: [{ id: 1 }]
          }
        } as any,
        {
          name: 'conductor:end:attempt',
          timestamp: 1005,
          traceId: 'trace-1',
          cell: 'vault::todos::cell',
          type: 'conductor',
          behaviorKey: 'addTodo'
        } as any
      ],
      metrics: {
        duration: 5,
        eventCount: 3,
        status: TraceExecutionStatuses.Success,
        slowestStage: { name: 'reducer', duration: 3 },
        fastestStage: { name: 'reducer', duration: 3 },
        stages: [
          {
            name: 'reducer',
            behaviorKey: 'addTodo',
            startedAt: 1001,
            finishedAt: 1004,
            duration: 3,
            type: 'stage'
          }
        ],
        hadRevote: false,
        controllerVoteCount: 1,
        usedLicensedFeatures: false
      }
    },
    {
      traceId: 'trace-2',
      cellKey: 'vault::auth::cell',
      startedAt: 2000,
      finishedAt: 2010,
      events: [
        {
          name: 'conductor:start:dispatch',
          timestamp: 2000,
          traceId: 'trace-2',
          cell: 'vault::auth::cell',
          type: 'conductor',
          behaviorKey: 'login'
        } as any,
        {
          name: 'lifecycle:notification:failure',
          timestamp: 2010,
          traceId: 'trace-2',
          cell: 'vault::auth::cell',
          type: 'lifecycle',
          behaviorKey: 'login',
          error: 'timeout'
        } as any
      ],
      metrics: {
        duration: 10,
        eventCount: 2,
        status: TraceExecutionStatuses.Failed,
        slowestStage: { name: 'none', duration: 0 },
        fastestStage: { name: 'none', duration: 0 },
        stages: [],
        hadRevote: false,
        controllerVoteCount: 0,
        usedLicensedFeatures: false
      }
    }
  ];

  const mockTracesByCellKey = new Map([
    ['vault::todos::cell', [mockTraces[0]]],
    ['vault::auth::cell', [mockTraces[1]]]
  ]);

  let mockTracesSignal: ReturnType<typeof signal<TraceExecutionShape[]>>;

  beforeEach(async () => {
    mockTracesSignal = signal(mockTraces);
    const aggregateMock = {
      traces: mockTracesSignal,
      tracesByCellKey: signal(mockTracesByCellKey)
    };

    await TestBed.configureTestingModule({
      imports: [TraceDetailViewComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: DevtoolsAggregateService, useValue: aggregateMock },
        {
          provide: DevtoolsLoggingService,
          useValue: jasmine.createSpyObj('DevtoolsLoggingService', [
            'clearEvents'
          ])
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TraceDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display all traces when no cell selected', () => {
    expect(component.filteredTraces().length).toBe(2);
  });

  it('should filter traces by selected cell', () => {
    component.selectCell('vault::todos::cell');

    expect(component.filteredTraces().length).toBe(1);
    expect(component.filteredTraces()[0].traceId).toBe('trace-1');
  });

  it('should show all traces when cell filter set to all', () => {
    component.selectCell('vault::todos::cell');
    component.selectCell('all');

    expect(component.filteredTraces().length).toBe(2);
  });

  it('should toggle trace expansion', () => {
    component.toggleTrace('trace-1');
    expect(component.expandedTraceId()).toBe('trace-1');

    component.toggleTrace('trace-1');
    expect(component.expandedTraceId()).toBeNull();
  });

  it('should collapse on cell filter change', () => {
    component.toggleTrace('trace-1');
    component.selectCell('vault::auth::cell');

    expect(component.expandedTraceId()).toBeNull();
  });

  it('should return correct status labels', () => {
    expect(component.statusLabel(mockTraces[0])).toBe('✓');
    expect(component.statusLabel(mockTraces[1])).toBe('✗');
  });

  it('should compute deltaMs from previous event', () => {
    const delta = component.deltaMs(mockTraces[0], mockTraces[0].events[1], 1);
    expect(delta).toBe('3.0');

    const firstDelta = component.deltaMs(
      mockTraces[0],
      mockTraces[0].events[0],
      0
    );
    expect(firstDelta).toBe('0.0');
  });

  it('should compute elapsedMs from trace start', () => {
    const elapsed = component.elapsedMs(mockTraces[0], mockTraces[0].events[1]);
    expect(elapsed).toBe('3.0');
  });

  it('should detect state presence', () => {
    expect(component.hasState(mockTraces[0].events[1])).toBeTrue();
    expect(component.hasState(mockTraces[0].events[0])).toBeFalse();
    expect(
      component.hasState({
        state: { isLoading: false, error: null, hasValue: false }
      } as any)
    ).toBeFalse();
  });

  it('should detect payload presence', () => {
    expect(component.hasPayload(mockTraces[0].events[0])).toBeTrue();
    expect(component.hasPayload(mockTraces[0].events[2])).toBeFalse();
  });

  it('should detect error presence', () => {
    expect(component.hasError(mockTraces[1].events[1])).toBeTrue();
    expect(component.hasError(mockTraces[0].events[0])).toBeFalse();
  });

  it('should list cell keys sorted', () => {
    expect(component.cellKeys()).toEqual([
      'vault::auth::cell',
      'vault::todos::cell'
    ]);
  });

  it('should compute summary stats', () => {
    const stats = component.stats();
    expect(stats.total).toBe(2);
    expect(stats.errors).toBe(1);
    expect(stats.orphaned).toBe(0);
    expect(stats.avgDuration).toBe(7.5);
  });

  it('should compute timeline left and width percentages', () => {
    const left = component.timelineLeft(mockTraces[0]);
    expect(left).toBe(0);

    const width = component.timelineWidth(mockTraces[0]);
    expect(width).toBeGreaterThan(0);
  });

  it('should compute waterfall positions for stages', () => {
    const stage = mockTraces[0].metrics.stages[0];
    const left = component.waterfallLeft(mockTraces[0], stage);
    const width = component.waterfallWidth(mockTraces[0], stage);

    expect(left).toBeGreaterThanOrEqual(0);
    expect(width).toBeGreaterThan(0);
  });

  it('should identify slowest stage only when multiple stages exist', () => {
    const stage = mockTraces[0].metrics.stages[0];
    expect(component.isSlowestStage(mockTraces[0], stage)).toBeFalse();
  });

  describe('statusClass', () => {
    it('should return status-success for successful traces', () => {
      expect(component.statusClass(mockTraces[0])).toBe('status-success');
    });

    it('should return status-failed for failed traces', () => {
      expect(component.statusClass(mockTraces[1])).toBe('status-failed');
    });

    it('should return status-denied for denied traces', () => {
      const denied = {
        ...mockTraces[0],
        metrics: {
          ...mockTraces[0].metrics,
          status: TraceExecutionStatuses.Denied
        }
      };
      expect(component.statusClass(denied)).toBe('status-denied');
    });

    it('should return status-orphaned for orphaned traces', () => {
      const orphaned = {
        ...mockTraces[0],
        metrics: {
          ...mockTraces[0].metrics,
          status: TraceExecutionStatuses.Orphaned
        }
      };
      expect(component.statusClass(orphaned)).toBe('status-orphaned');
    });

    it('should return status-aborted for aborted traces', () => {
      const aborted = {
        ...mockTraces[0],
        metrics: {
          ...mockTraces[0].metrics,
          status: TraceExecutionStatuses.Aborted
        }
      };
      expect(component.statusClass(aborted)).toBe('status-aborted');
    });

    it('should return empty string for unknown status', () => {
      const unknown = {
        ...mockTraces[0],
        metrics: { ...mockTraces[0].metrics, status: 'unknown' as any }
      };
      expect(component.statusClass(unknown)).toBe('');
    });
  });

  describe('statusLabel edge cases', () => {
    it('should return ⊘ for denied traces', () => {
      const denied = {
        ...mockTraces[0],
        metrics: {
          ...mockTraces[0].metrics,
          status: TraceExecutionStatuses.Denied
        }
      };
      expect(component.statusLabel(denied)).toBe('⊘');
    });

    it('should return ⚠ for orphaned traces', () => {
      const orphaned = {
        ...mockTraces[0],
        metrics: {
          ...mockTraces[0].metrics,
          status: TraceExecutionStatuses.Orphaned
        }
      };
      expect(component.statusLabel(orphaned)).toBe('⚠');
    });

    it('should return ↺ for aborted traces', () => {
      const aborted = {
        ...mockTraces[0],
        metrics: {
          ...mockTraces[0].metrics,
          status: TraceExecutionStatuses.Aborted
        }
      };
      expect(component.statusLabel(aborted)).toBe('↺');
    });

    it('should return ? for unknown status', () => {
      const unknown = {
        ...mockTraces[0],
        metrics: { ...mockTraces[0].metrics, status: 'unknown' as any }
      };
      expect(component.statusLabel(unknown)).toBe('?');
    });
  });

  describe('expandedTraceCellKey', () => {
    it('should return null when no trace is expanded', () => {
      expect(component.expandedTraceCellKey()).toBeNull();
    });

    it('should return the cellKey of the expanded trace', () => {
      component.toggleTrace('trace-1');
      expect(component.expandedTraceCellKey()).toBe('vault::todos::cell');
    });

    it('should return null when expanded trace is not in filtered list', () => {
      component.toggleTrace('nonexistent');
      expect(component.expandedTraceCellKey()).toBeNull();
    });
  });

  describe('eventBehaviorKey', () => {
    it('should return the behaviorKey from an event', () => {
      expect(component.eventBehaviorKey(mockTraces[0].events[0])).toBe(
        'addTodo'
      );
    });

    it('should return empty string when behaviorKey is undefined', () => {
      expect(component.eventBehaviorKey({} as any)).toBe('');
    });
  });

  describe('stageCounts', () => {
    it('should compute stage name occurrence counts', () => {
      const counts = component.stageCounts(mockTraces[0]);
      expect(counts).toEqual([{ name: 'reducer', count: 1 }]);
    });

    it('should return empty array when no stages exist', () => {
      expect(component.stageCounts(mockTraces[1])).toEqual([]);
    });
  });

  describe('selectEvent', () => {
    it('should set the selected event', () => {
      const event = { ...mockTraces[0].events[0], id: 'e1' } as any;
      component.selectEvent(event);
      expect(component.selectedEvent()).toBe(event);
    });

    it('should deselect when same event is selected again', () => {
      const event = { ...mockTraces[0].events[0], id: 'e1' } as any;
      component.selectEvent(event);
      component.selectEvent(event);
      expect(component.selectedEvent()).toBeNull();
    });

    it('should switch to a different event', () => {
      const event1 = { ...mockTraces[0].events[0], id: 'e1' } as any;
      const event2 = { ...mockTraces[0].events[1], id: 'e2' } as any;
      component.selectEvent(event1);
      component.selectEvent(event2);
      expect(component.selectedEvent()).toBe(event2);
    });
  });

  describe('closeEventDetail', () => {
    it('should set selectedEvent to null', () => {
      component.selectEvent(mockTraces[0].events[0]);
      component.closeEventDetail();
      expect(component.selectedEvent()).toBeNull();
    });
  });

  describe('selectStageEvent', () => {
    it('should select the matching start event for a stage', () => {
      const trace = {
        ...mockTraces[0],
        events: [
          {
            name: 'stage:start:reducer',
            timestamp: 1001,
            traceId: 'trace-1',
            cell: 'vault::todos::cell',
            type: 'stage',
            behaviorKey: 'addTodo',
            boundary: 'start',
            id: 'evt-1'
          } as any,
          {
            name: 'stage:end:reducer',
            timestamp: 1004,
            traceId: 'trace-1',
            cell: 'vault::todos::cell',
            type: 'stage',
            behaviorKey: 'addTodo',
            boundary: 'end',
            id: 'evt-2'
          } as any
        ]
      };
      const stage = mockTraces[0].metrics.stages[0];
      component.selectStageEvent(trace, stage);
      expect(component.selectedEvent()?.id).toBe('evt-1');
    });

    it('should not select when no matching start event exists', () => {
      component.selectStageEvent(mockTraces[1], {
        name: 'resolver',
        behaviorKey: 'missing',
        startedAt: 9999,
        finishedAt: 9999,
        duration: 0,
        type: 'stage'
      } as any);
      expect(component.selectedEvent()).toBeNull();
    });
  });

  describe('waterfallLeft with zero duration', () => {
    it('should return 0 when trace duration is 0', () => {
      const zeroDuration = {
        ...mockTraces[0],
        metrics: { ...mockTraces[0].metrics, duration: 0 }
      };
      expect(
        component.waterfallLeft(zeroDuration, mockTraces[0].metrics.stages[0])
      ).toBe(0);
    });
  });

  describe('waterfallWidth with zero duration', () => {
    it('should return 100 when trace duration is 0', () => {
      const zeroDuration = {
        ...mockTraces[0],
        metrics: { ...mockTraces[0].metrics, duration: 0 }
      };
      expect(
        component.waterfallWidth(zeroDuration, mockTraces[0].metrics.stages[0])
      ).toBe(100);
    });
  });

  describe('timeWindow edge cases', () => {
    it('should return default window when no traces match filter', () => {
      component.selectCell('nonexistent-cell');
      const window = component.timeWindow();
      expect(window).toEqual({ min: 0, max: 1 });
    });

    it('should compute stats with zero avgDuration when no traces match', () => {
      component.selectCell('nonexistent-cell');
      const stats = component.stats();
      expect(stats.avgDuration).toBe(0);
    });

    it('should fall back to startedAt when finishedAt is falsy', () => {
      mockTracesSignal.set([
        {
          ...mockTraces[0],
          startedAt: 5000,
          finishedAt: undefined as any
        }
      ]);
      fixture.detectChanges();

      const window = component.timeWindow();
      expect(window.max).toBe(5001);
    });

    it('should use span fallback of 1 when all timestamps are identical', () => {
      mockTracesSignal.set([
        {
          ...mockTraces[0],
          startedAt: 5000,
          finishedAt: 5000
        }
      ]);
      fixture.detectChanges();

      const window = component.timeWindow();
      expect(window).toEqual({ min: 5000, max: 5001 });
    });
  });

  describe('isSlowestStage with multiple stages', () => {
    it('should return true when the stage matches the slowest', () => {
      const multiStageTrace = {
        ...mockTraces[0],
        metrics: {
          ...mockTraces[0].metrics,
          stages: [
            {
              name: 'filter',
              behaviorKey: 'addTodo',
              startedAt: 1001,
              finishedAt: 1002,
              duration: 1,
              type: 'stage'
            },
            {
              name: 'reducer',
              behaviorKey: 'addTodo',
              startedAt: 1002,
              finishedAt: 1005,
              duration: 3,
              type: 'stage'
            }
          ],
          slowestStage: { name: 'reducer', duration: 3 }
        }
      } as TraceExecutionShape;

      expect(
        component.isSlowestStage(
          multiStageTrace,
          multiStageTrace.metrics.stages[1]
        )
      ).toBeTrue();
      expect(
        component.isSlowestStage(
          multiStageTrace,
          multiStageTrace.metrics.stages[0]
        )
      ).toBeFalse();
    });
  });
});
