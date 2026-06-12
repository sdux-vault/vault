import { provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { DevtoolsAggregateService } from '../../services/devtools-aggregate.service';
import { DevtoolsLoggingService } from '../../services/devtools-logging.service';
import type { TraceExecutionShape } from '../../shared/shapes/trace';
import { TraceExecutionStatuses } from '../../shared/shapes/trace';
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
          provide: ActivatedRoute,
          useValue: {
            snapshot: { queryParamMap: convertToParamMap({}) }
          }
        },
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

    it('should return status-error for failed traces', () => {
      expect(component.statusClass(mockTraces[1])).toBe('status-error');
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

  describe('query param cell filter', () => {
    it('should auto-select cell from query param', async () => {
      const route = TestBed.inject(ActivatedRoute);
      (route.snapshot as any).queryParamMap = convertToParamMap({
        cell: 'vault::todos::cell'
      });

      const f = TestBed.createComponent(TraceDetailViewComponent);
      f.detectChanges();

      expect(f.componentInstance.selectedCell()).toBe('vault::todos::cell');
      expect(f.componentInstance.filteredTraces().length).toBe(1);
    });
  });

  describe('waterfallStages', () => {
    it('should return stages sorted by startedAt', () => {
      const trace: TraceExecutionShape = {
        ...mockTraces[0],
        metrics: {
          ...mockTraces[0].metrics,
          stages: [
            {
              name: 'effect',
              behaviorKey: 'addTodo',
              startedAt: 1003,
              finishedAt: 1004,
              duration: 1,
              type: 'stage'
            },
            {
              name: 'reducer',
              behaviorKey: 'addTodo',
              startedAt: 1001,
              finishedAt: 1003,
              duration: 2,
              type: 'stage'
            }
          ]
        }
      } as TraceExecutionShape;

      const stages = component.waterfallStages(trace);
      expect(stages[0].name).toBe('reducer');
      expect(stages[1].name).toBe('effect');
    });

    it('should insert synthetic revote-delay entries', () => {
      const trace: TraceExecutionShape = {
        ...mockTraces[0],
        events: [
          {
            name: 'conductor:notification:deny',
            timestamp: 1002,
            traceId: 'trace-1',
            id: 'deny-1'
          } as any,
          {
            name: 'lifecycle:notification:revote',
            timestamp: 1005,
            traceId: 'trace-1',
            id: 'revote-1'
          } as any
        ],
        metrics: {
          ...mockTraces[0].metrics,
          stages: []
        }
      } as TraceExecutionShape;

      const stages = component.waterfallStages(trace);
      const revote = stages.find((s) => s.name === 'revote-delay');
      expect(revote).toBeTruthy();
      expect(revote!.duration).toBe(3);
      expect(revote!.startedAt).toBe(1002);
      expect(revote!.finishedAt).toBe(1005);
    });

    it('should place attempt stages at the end', () => {
      const trace: TraceExecutionShape = {
        ...mockTraces[0],
        metrics: {
          ...mockTraces[0].metrics,
          stages: [
            {
              name: 'attempt',
              behaviorKey: 'addTodo',
              startedAt: 1000,
              finishedAt: 1005,
              duration: 5,
              type: 'conductor'
            },
            {
              name: 'reducer',
              behaviorKey: 'addTodo',
              startedAt: 1001,
              finishedAt: 1003,
              duration: 2,
              type: 'stage'
            }
          ]
        }
      } as TraceExecutionShape;

      const stages = component.waterfallStages(trace);
      expect(stages[stages.length - 1].name).toBe('attempt');
    });
  });

  describe('isRevoteDelay', () => {
    it('should return true for revote-delay stages', () => {
      expect(
        component.isRevoteDelay({
          name: 'revote-delay',
          behaviorKey: 'vault-conductor',
          startedAt: 0,
          finishedAt: 0,
          duration: 0,
          type: 'lifecycle' as any
        })
      ).toBeTrue();
    });

    it('should return false for regular stages', () => {
      expect(
        component.isRevoteDelay(mockTraces[0].metrics.stages[0])
      ).toBeFalse();
    });
  });

  describe('isSlowOnRight', () => {
    it('should return true when bar ends in left half', () => {
      const stage = {
        name: 'reducer',
        behaviorKey: 'addTodo',
        startedAt: 1000,
        finishedAt: 1001,
        duration: 1,
        type: 'stage' as const
      };
      const trace = {
        ...mockTraces[0],
        startedAt: 1000,
        finishedAt: 1010,
        metrics: { ...mockTraces[0].metrics, duration: 10 }
      } as TraceExecutionShape;

      expect(component.isSlowOnRight(trace, stage)).toBeTrue();
    });

    it('should return false when bar extends past midpoint', () => {
      const stage = {
        name: 'reducer',
        behaviorKey: 'addTodo',
        startedAt: 1000,
        finishedAt: 1008,
        duration: 8,
        type: 'stage' as const
      };
      const trace = {
        ...mockTraces[0],
        startedAt: 1000,
        finishedAt: 1010,
        metrics: { ...mockTraces[0].metrics, duration: 10 }
      } as TraceExecutionShape;

      expect(component.isSlowOnRight(trace, stage)).toBeFalse();
    });
  });

  describe('eventDisplayName', () => {
    it('should format 3-part event names as type + stage', () => {
      expect(
        component.eventDisplayName({ name: 'stage:end:reducer' } as any)
      ).toBe('stage reducer');
    });

    it('should return original name for short event names', () => {
      expect(component.eventDisplayName({ name: 'simple' } as any)).toBe(
        'simple'
      );
    });

    it('should join remaining parts with colon for 4+ parts', () => {
      expect(component.eventDisplayName({ name: 'stage:end:a:b' } as any)).toBe(
        'stage a:b'
      );
    });
  });

  describe('selectStageEvent with startEventId', () => {
    it('should prefer startEventId over fallback matching', () => {
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
            id: 'evt-start'
          } as any
        ]
      };
      const stage = {
        ...mockTraces[0].metrics.stages[0],
        startEventId: 'evt-start'
      };
      component.selectStageEvent(trace, stage);
      expect(component.selectedEvent()?.id).toBe('evt-start');
    });
  });

  describe('hasPayload edge cases', () => {
    it('should return false for null payload', () => {
      expect(component.hasPayload({ payload: null } as any)).toBeFalse();
    });
  });

  describe('hasError edge cases', () => {
    it('should return false for null error', () => {
      expect(component.hasError({ error: null } as any)).toBeFalse();
    });
  });

  describe('isLicensed', () => {
    it('should reflect the registry license state', () => {
      expect(component.isLicensed()).toBeDefined();
    });
  });

  describe('ngOnInit with no cell query param', () => {
    it('should not change selectedCell when no param', () => {
      expect(component.selectedCell()).toBe('all');
    });
  });

  describe('stats computed details', () => {
    it('should compute success, denied, aborted, orphaned counts', () => {
      mockTracesSignal.set([
        {
          ...mockTraces[0],
          traceId: 't-success',
          metrics: {
            ...mockTraces[0].metrics,
            status: TraceExecutionStatuses.Success
          }
        },
        {
          ...mockTraces[0],
          traceId: 't-denied',
          metrics: {
            ...mockTraces[0].metrics,
            status: TraceExecutionStatuses.Denied
          }
        },
        {
          ...mockTraces[0],
          traceId: 't-aborted',
          metrics: {
            ...mockTraces[0].metrics,
            status: TraceExecutionStatuses.Aborted
          }
        },
        {
          ...mockTraces[0],
          traceId: 't-orphaned',
          metrics: {
            ...mockTraces[0].metrics,
            status: TraceExecutionStatuses.Orphaned
          }
        }
      ]);
      fixture.detectChanges();

      const stats = component.stats();
      expect(stats.success).toBe(1);
      expect(stats.denied).toBe(1);
      expect(stats.aborted).toBe(1);
      expect(stats.orphaned).toBe(1);
      expect(stats.total).toBe(4);
    });
  });

  describe('timelineWidth edge cases', () => {
    it('should use startedAt when finishedAt is falsy', () => {
      const trace = {
        ...mockTraces[0],
        startedAt: 1000,
        finishedAt: 0 as any
      };
      const width = component.timelineWidth(trace);
      expect(width).toBe(0.5);
    });

    it('should enforce minimum width of 0.5', () => {
      mockTracesSignal.set([
        { ...mockTraces[0], startedAt: 0, finishedAt: 10000 }
      ]);
      fixture.detectChanges();
      const trace = { ...mockTraces[0], startedAt: 0, finishedAt: 1 };
      const width = component.timelineWidth(trace);
      expect(width).toBeGreaterThanOrEqual(0.5);
    });
  });

  describe('waterfallStages tiebreaker', () => {
    it('should break ties by event index when startedAt is equal', () => {
      const trace: TraceExecutionShape = {
        ...mockTraces[0],
        events: [
          { id: 'first', name: 'stage:start:reducer', timestamp: 1001 } as any,
          { id: 'second', name: 'stage:start:effect', timestamp: 1001 } as any
        ],
        metrics: {
          ...mockTraces[0].metrics,
          stages: [
            {
              name: 'effect',
              behaviorKey: 'bk',
              startedAt: 1001,
              finishedAt: 1005,
              duration: 4,
              type: 'stage',
              startEventId: 'second'
            },
            {
              name: 'reducer',
              behaviorKey: 'bk',
              startedAt: 1001,
              finishedAt: 1004,
              duration: 3,
              type: 'stage',
              startEventId: 'first'
            }
          ] as any[]
        }
      };

      const stages = component.waterfallStages(trace);
      expect(stages[0].name).toBe('reducer');
      expect(stages[1].name).toBe('effect');
    });
  });

  describe('selectStageEvent fallback matching', () => {
    it('should fall back to timestamp/behaviorKey/boundary match when no startEventId', () => {
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
            id: 'evt-fallback'
          } as any
        ]
      };
      const stage = {
        name: 'reducer',
        behaviorKey: 'addTodo',
        startedAt: 1001,
        finishedAt: 1004,
        duration: 3,
        type: 'stage'
      };
      component.selectStageEvent(trace, stage as any);
      expect(component.selectedEvent()?.id).toBe('evt-fallback');
    });

    it('should not select when startEventId does not match any event', () => {
      const trace = {
        ...mockTraces[0],
        events: [
          {
            name: 'stage:start:reducer',
            timestamp: 1001,
            id: 'evt-1',
            behaviorKey: 'addTodo',
            boundary: 'start'
          } as any
        ]
      };
      const stage = {
        name: 'reducer',
        behaviorKey: 'addTodo',
        startedAt: 1001,
        finishedAt: 1004,
        duration: 3,
        type: 'stage',
        startEventId: 'nonexistent'
      };
      component.selectStageEvent(trace, stage as any);
      // Falls through startEventId check, then tries fallback match
      expect(component.selectedEvent()?.id).toBe('evt-1');
    });
  });

  describe('stageCounts with duplicates', () => {
    it('should count multiple occurrences of same stage name', () => {
      const trace = {
        ...mockTraces[0],
        metrics: {
          ...mockTraces[0].metrics,
          stages: [
            {
              name: 'reducer',
              behaviorKey: 'a',
              startedAt: 0,
              finishedAt: 1,
              duration: 1,
              type: 'stage'
            },
            {
              name: 'reducer',
              behaviorKey: 'b',
              startedAt: 1,
              finishedAt: 2,
              duration: 1,
              type: 'stage'
            },
            {
              name: 'effect',
              behaviorKey: 'a',
              startedAt: 2,
              finishedAt: 3,
              duration: 1,
              type: 'stage'
            }
          ] as any[]
        }
      } as TraceExecutionShape;
      const counts = component.stageCounts(trace);
      expect(counts).toEqual([
        { name: 'reducer', count: 2 },
        { name: 'effect', count: 1 }
      ]);
    });
  });

  describe('waterfallStages edge cases', () => {
    it('should ignore revote event without preceding deny', () => {
      const trace: TraceExecutionShape = {
        ...mockTraces[0],
        events: [
          {
            name: 'lifecycle:notification:revote',
            timestamp: 1005,
            traceId: 'trace-1',
            id: 'revote-orphan'
          } as any
        ],
        metrics: { ...mockTraces[0].metrics, stages: [] }
      };

      const stages = component.waterfallStages(trace);
      expect(stages.find((s) => s.name === 'revote-delay')).toBeUndefined();
    });

    it('should ignore deny without following revote', () => {
      const trace: TraceExecutionShape = {
        ...mockTraces[0],
        events: [
          {
            name: 'conductor:notification:deny',
            timestamp: 1002,
            traceId: 'trace-1',
            id: 'deny-orphan'
          } as any
        ],
        metrics: { ...mockTraces[0].metrics, stages: [] }
      };

      const stages = component.waterfallStages(trace);
      expect(stages.find((s) => s.name === 'revote-delay')).toBeUndefined();
    });

    it('should handle stages with no startEventId in tiebreaker', () => {
      const trace: TraceExecutionShape = {
        ...mockTraces[0],
        events: [],
        metrics: {
          ...mockTraces[0].metrics,
          stages: [
            {
              name: 'effect',
              behaviorKey: 'bk',
              startedAt: 1001,
              finishedAt: 1005,
              duration: 4,
              type: 'stage'
            },
            {
              name: 'reducer',
              behaviorKey: 'bk',
              startedAt: 1001,
              finishedAt: 1004,
              duration: 3,
              type: 'stage'
            }
          ]
        }
      } as TraceExecutionShape;

      const stages = component.waterfallStages(trace);
      expect(stages.length).toBe(2);
    });
  });

  describe('eventDisplayName with 2-part name', () => {
    it('should return original name for 2-part event names', () => {
      expect(component.eventDisplayName({ name: 'stage:end' } as any)).toBe(
        'stage:end'
      );
    });
  });

  describe('waterfallWidth minimum clamp', () => {
    it('should clamp very small widths to 0.5', () => {
      const stage = {
        name: 'reducer',
        behaviorKey: 'addTodo',
        startedAt: 1000,
        finishedAt: 1000,
        duration: 0,
        type: 'stage' as const
      };
      const trace = {
        ...mockTraces[0],
        startedAt: 1000,
        finishedAt: 1100,
        metrics: { ...mockTraces[0].metrics, duration: 100 }
      } as TraceExecutionShape;

      expect(component.waterfallWidth(trace, stage)).toBe(0.5);
    });
  });

  describe('hasState with undefined state', () => {
    it('should return false when state is undefined', () => {
      expect(component.hasState({} as any)).toBeFalse();
    });
  });
});
