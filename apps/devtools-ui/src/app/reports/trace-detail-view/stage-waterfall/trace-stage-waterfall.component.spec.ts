import { provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DevtoolsRegistryService } from '../../../services/registry/devtools-registry.service';
import type { TraceExecutionShape } from '../../../shapes/trace';
import { TraceExecutionStatuses } from '../../../shapes/trace';
import type { StageMetricShape } from '../../../shapes/trace/stage-metric.shape';
import { TraceStageWaterfallComponent } from './trace-stage-waterfall.component';

describe('Component: TraceStageWaterfall', () => {
  let fixture: ComponentFixture<TraceStageWaterfallComponent>;
  let component: TraceStageWaterfallComponent;

  const mockTrace: TraceExecutionShape = {
    traceId: 'trace-1',
    cellKey: 'vault::todos::cell',
    startedAt: 1000,
    finishedAt: 1020,
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
      } as any,
      {
        name: 'stage:start:effect',
        timestamp: 1005,
        traceId: 'trace-1',
        cell: 'vault::todos::cell',
        type: 'stage',
        behaviorKey: 'addTodo',
        boundary: 'start',
        id: 'evt-3'
      } as any,
      {
        name: 'stage:end:effect',
        timestamp: 1015,
        traceId: 'trace-1',
        cell: 'vault::todos::cell',
        type: 'stage',
        behaviorKey: 'addTodo',
        boundary: 'end',
        id: 'evt-4'
      } as any
    ],
    metrics: {
      duration: 20,
      eventCount: 4,
      status: TraceExecutionStatuses.Success,
      slowestStage: { name: 'effect', duration: 10 },
      fastestStage: { name: 'reducer', duration: 3 },
      stages: [
        {
          name: 'reducer',
          behaviorKey: 'addTodo',
          startedAt: 1001,
          finishedAt: 1004,
          duration: 3,
          type: 'stage',
          startEventId: 'evt-1'
        },
        {
          name: 'effect',
          behaviorKey: 'addTodo',
          startedAt: 1005,
          finishedAt: 1015,
          duration: 10,
          type: 'stage',
          startEventId: 'evt-3'
        }
      ],
      hadRevote: false,
      controllerVoteCount: 1,
      usedLicensedFeatures: false
    }
  };

  const mockIsLicensed = signal(true);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TraceStageWaterfallComponent],
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: DevtoolsRegistryService,
          useValue: { isLicensed: mockIsLicensed }
        }
      ]
    }).compileComponents();
    mockIsLicensed.set(true);

    fixture = TestBed.createComponent(TraceStageWaterfallComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('trace', mockTrace);
    fixture.detectChanges();
  });

  describe('waterfallStages', () => {
    it('should return stages sorted by startedAt', () => {
      const stages = component.waterfallStages();
      expect(stages.length).toBe(2);
      expect(stages[0].name).toBe('reducer');
      expect(stages[1].name).toBe('effect');
    });

    it('should place attempt stages at the end', () => {
      const traceWithAttempt = {
        ...mockTrace,
        metrics: {
          ...mockTrace.metrics,
          stages: [
            ...mockTrace.metrics.stages,
            {
              name: 'attempt',
              behaviorKey: 'addTodo',
              startedAt: 1000,
              finishedAt: 1020,
              duration: 20,
              type: 'controller' as const
            }
          ]
        }
      };
      fixture.componentRef.setInput('trace', traceWithAttempt);
      fixture.detectChanges();
      const stages = component.waterfallStages();
      expect(stages[stages.length - 1].name).toBe('attempt');
    });

    it('should include synthetic revote-delay entries', () => {
      const traceWithRevote = {
        ...mockTrace,
        events: [
          ...mockTrace.events,
          {
            name: 'conductor:notification:deny',
            timestamp: 1016,
            traceId: 'trace-1',
            cell: 'vault::todos::cell',
            type: 'conductor',
            behaviorKey: 'addTodo',
            id: 'evt-deny'
          } as any,
          {
            name: 'lifecycle:notification:revote',
            timestamp: 1018,
            traceId: 'trace-1',
            cell: 'vault::todos::cell',
            type: 'lifecycle',
            behaviorKey: 'addTodo',
            id: 'evt-revote'
          } as any
        ]
      };
      fixture.componentRef.setInput('trace', traceWithRevote);
      fixture.detectChanges();
      const stages = component.waterfallStages();
      const revote = stages.find((s) => s.name === 'revote-delay');
      expect(revote).toBeTruthy();
      expect(revote!.duration).toBe(2);
    });
  });

  describe('isRevoteDelay', () => {
    it('should return true for revote-delay stages', () => {
      expect(
        component.isRevoteDelay({ name: 'revote-delay' } as StageMetricShape)
      ).toBeTrue();
    });

    it('should return false for regular stages', () => {
      expect(
        component.isRevoteDelay({ name: 'reducer' } as StageMetricShape)
      ).toBeFalse();
    });
  });

  describe('waterfallLeft', () => {
    it('should compute left offset percentage', () => {
      const left = component.waterfallLeft(mockTrace.metrics.stages[0]);
      expect(left).toBe(((1001 - 1000) / 20) * 100);
    });

    it('should return 0 when duration is 0', () => {
      const zeroDuration = {
        ...mockTrace,
        metrics: { ...mockTrace.metrics, duration: 0 }
      };
      fixture.componentRef.setInput('trace', zeroDuration);
      fixture.detectChanges();
      expect(component.waterfallLeft(mockTrace.metrics.stages[0])).toBe(0);
    });
  });

  describe('waterfallWidth', () => {
    it('should compute width percentage', () => {
      const width = component.waterfallWidth(mockTrace.metrics.stages[0]);
      expect(width).toBe((3 / 20) * 100);
    });

    it('should enforce minimum width of 0.5', () => {
      const zeroStage = {
        ...mockTrace.metrics.stages[0],
        duration: 0
      };
      expect(component.waterfallWidth(zeroStage)).toBe(0.5);
    });

    it('should return 100 when duration is 0', () => {
      const zeroDuration = {
        ...mockTrace,
        metrics: { ...mockTrace.metrics, duration: 0 }
      };
      fixture.componentRef.setInput('trace', zeroDuration);
      fixture.detectChanges();
      expect(component.waterfallWidth(mockTrace.metrics.stages[0])).toBe(100);
    });
  });

  describe('isSlowestStage', () => {
    it('should return true for the slowest stage when multiple exist', () => {
      expect(component.isSlowestStage(mockTrace.metrics.stages[1])).toBeTrue();
    });

    it('should return false for non-slowest stages', () => {
      expect(component.isSlowestStage(mockTrace.metrics.stages[0])).toBeFalse();
    });

    it('should return false when only one stage exists', () => {
      const singleStage = {
        ...mockTrace,
        metrics: {
          ...mockTrace.metrics,
          stages: [mockTrace.metrics.stages[0]]
        }
      };
      fixture.componentRef.setInput('trace', singleStage);
      fixture.detectChanges();
      expect(
        component.isSlowestStage(singleStage.metrics.stages[0])
      ).toBeFalse();
    });
  });

  describe('isSlowOnRight', () => {
    it('should return true when bar ends in the left half', () => {
      expect(component.isSlowOnRight(mockTrace.metrics.stages[0])).toBeTrue();
    });

    it('should return false when bar ends past the midpoint', () => {
      const lateStage: StageMetricShape = {
        name: 'effect',
        behaviorKey: 'addTodo',
        startedAt: 1005,
        finishedAt: 1015,
        duration: 10,
        type: 'stage'
      };
      expect(component.isSlowOnRight(lateStage)).toBeFalse();
    });
  });

  describe('selectStageEvent', () => {
    it('should emit the event matching startEventId', () => {
      spyOn(component.stageSelected, 'emit');
      component.selectStageEvent(mockTrace.metrics.stages[0]);
      expect(component.stageSelected.emit).toHaveBeenCalledWith(
        mockTrace.events[0]
      );
    });

    it('should fall back to timestamp/boundary matching', () => {
      spyOn(component.stageSelected, 'emit');
      const stageWithoutId = { ...mockTrace.metrics.stages[0] };
      delete (stageWithoutId as any).startEventId;
      component.selectStageEvent(stageWithoutId);
      expect(component.stageSelected.emit).toHaveBeenCalledWith(
        mockTrace.events[0]
      );
    });

    it('should not emit when no matching event found', () => {
      spyOn(component.stageSelected, 'emit');
      component.selectStageEvent({
        name: 'nonexistent',
        behaviorKey: 'missing',
        startedAt: 9999,
        finishedAt: 9999,
        duration: 0,
        type: 'stage'
      } as StageMetricShape);
      expect(component.stageSelected.emit).not.toHaveBeenCalled();
    });
  });

  describe('isLicensed', () => {
    it('should reflect the registry license state', () => {
      expect(component.isLicensed()).toBeTrue();

      mockIsLicensed.set(false);
      expect(component.isLicensed()).toBeFalse();
    });
  });

  describe('waterfallStages tiebreaker', () => {
    it('should break ties by event index when startedAt is equal', () => {
      const tieTrace: TraceExecutionShape = {
        ...mockTrace,
        events: [
          { id: 'first', name: 'stage:start:reducer', timestamp: 1001 } as any,
          { id: 'second', name: 'stage:start:effect', timestamp: 1001 } as any
        ],
        metrics: {
          ...mockTrace.metrics,
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
          ]
        }
      };

      fixture.componentRef.setInput('trace', tieTrace);
      fixture.detectChanges();

      const stages = component.waterfallStages();
      expect(stages[0].name).toBe('reducer');
      expect(stages[1].name).toBe('effect');
    });
  });

  describe('template rendering', () => {
    it('should show upsell notice when not licensed', () => {
      mockIsLicensed.set(false);
      fixture.detectChanges();
      const upsell = fixture.nativeElement.querySelector('sdux-upsell-notice');
      expect(upsell).toBeTruthy();
      expect(
        fixture.nativeElement.querySelector('.waterfall-section')
      ).toBeNull();
    });

    it('should show empty message when no stages exist', () => {
      const noStages = {
        ...mockTrace,
        metrics: { ...mockTrace.metrics, stages: [] }
      };
      fixture.componentRef.setInput('trace', noStages);
      fixture.detectChanges();
      const empty = fixture.nativeElement.querySelector('.pipeline-empty');
      expect(empty).toBeTruthy();
      expect(empty.textContent).toContain('No stage data');
    });

    it('should render waterfall rows', () => {
      const rows = fixture.nativeElement.querySelectorAll('.waterfall-row');
      expect(rows.length).toBe(2);
    });

    it('should render slow label on the right for slowest stage in left half', () => {
      // effect stage ends past 50%, so slow label is on left
      // reducer is not slowest, so we need a trace where slowest is in left half
      const leftSlowTrace = {
        ...mockTrace,
        metrics: {
          ...mockTrace.metrics,
          stages: [
            {
              name: 'reducer',
              behaviorKey: 'addTodo',
              startedAt: 1000,
              finishedAt: 1002,
              duration: 2,
              type: 'stage',
              startEventId: 'evt-1'
            },
            {
              name: 'effect',
              behaviorKey: 'addTodo',
              startedAt: 1000,
              finishedAt: 1001,
              duration: 1,
              type: 'stage',
              startEventId: 'evt-3'
            }
          ],
          slowestStage: { name: 'reducer', duration: 2 }
        }
      };
      fixture.componentRef.setInput('trace', leftSlowTrace);
      fixture.detectChanges();
      const rightLabel = fixture.nativeElement.querySelector(
        '.waterfall-slow-right'
      );
      expect(rightLabel).toBeTruthy();
      expect(rightLabel.textContent).toContain('← slow');
    });

    it('should render slow label on the left for slowest stage past midpoint', () => {
      const rightSlowTrace = {
        ...mockTrace,
        metrics: {
          ...mockTrace.metrics,
          stages: [
            {
              name: 'reducer',
              behaviorKey: 'addTodo',
              startedAt: 1001,
              finishedAt: 1004,
              duration: 3,
              type: 'stage',
              startEventId: 'evt-1'
            },
            {
              name: 'effect',
              behaviorKey: 'addTodo',
              startedAt: 1005,
              finishedAt: 1015,
              duration: 10,
              type: 'stage',
              startEventId: 'evt-3'
            }
          ],
          slowestStage: { name: 'effect', duration: 10 }
        }
      };
      fixture.componentRef.setInput('trace', rightSlowTrace);
      fixture.detectChanges();
      const leftLabel = fixture.nativeElement.querySelector(
        '.waterfall-slow-left'
      );
      expect(leftLabel).toBeTruthy();
      expect(leftLabel.textContent).toContain('slow →');
    });

    it('should apply waterfall-row-revote class for revote-delay stages', () => {
      const traceWithRevote = {
        ...mockTrace,
        events: [
          ...mockTrace.events,
          {
            name: 'conductor:notification:deny',
            timestamp: 1016,
            traceId: 'trace-1',
            id: 'evt-deny'
          } as any,
          {
            name: 'lifecycle:notification:revote',
            timestamp: 1018,
            traceId: 'trace-1',
            id: 'evt-revote'
          } as any
        ]
      };
      fixture.componentRef.setInput('trace', traceWithRevote);
      fixture.detectChanges();
      const revoteRow = fixture.nativeElement.querySelector(
        '.waterfall-row-revote'
      );
      expect(revoteRow).toBeTruthy();
    });

    it('should apply waterfall-bar-revote class for revote-delay bars', () => {
      const traceWithRevote = {
        ...mockTrace,
        events: [
          ...mockTrace.events,
          {
            name: 'conductor:notification:deny',
            timestamp: 1016,
            traceId: 'trace-1',
            id: 'evt-deny'
          } as any,
          {
            name: 'lifecycle:notification:revote',
            timestamp: 1018,
            traceId: 'trace-1',
            id: 'evt-revote'
          } as any
        ]
      };
      fixture.componentRef.setInput('trace', traceWithRevote);
      fixture.detectChanges();
      const revoteBar = fixture.nativeElement.querySelector(
        '.waterfall-bar-revote'
      );
      expect(revoteBar).toBeTruthy();
    });

    it('should emit stageSelected on keydown.enter', () => {
      spyOn(component.stageSelected, 'emit');
      const row = fixture.nativeElement.querySelector('.waterfall-row');
      row.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
      );
      fixture.detectChanges();
      expect(component.stageSelected.emit).toHaveBeenCalled();
    });

    it('should emit stageSelected on click', () => {
      spyOn(component.stageSelected, 'emit');
      const row = fixture.nativeElement.querySelector('.waterfall-row');
      row.click();
      expect(component.stageSelected.emit).toHaveBeenCalled();
    });

    it('should apply waterfall-bar-slow class for slowest stage', () => {
      const bar = fixture.nativeElement.querySelector('.waterfall-bar-slow');
      expect(bar).toBeTruthy();
    });

    it('should display stage duration text', () => {
      const durations = fixture.nativeElement.querySelectorAll(
        '.waterfall-duration'
      );
      expect(durations[0].textContent).toContain('3.0ms');
      expect(durations[1].textContent).toContain('10.0ms');
    });
  });

  describe('waterfallStages edge cases', () => {
    it('should ignore revote event without preceding deny', () => {
      const trace = {
        ...mockTrace,
        events: [
          {
            name: 'lifecycle:notification:revote',
            timestamp: 1005,
            traceId: 'trace-1',
            id: 'revote-orphan'
          } as any
        ],
        metrics: { ...mockTrace.metrics, stages: [] }
      };
      fixture.componentRef.setInput('trace', trace);
      fixture.detectChanges();
      const stages = component.waterfallStages();
      expect(stages.find((s) => s.name === 'revote-delay')).toBeUndefined();
    });

    it('should ignore deny without following revote', () => {
      const trace = {
        ...mockTrace,
        events: [
          {
            name: 'conductor:notification:deny',
            timestamp: 1002,
            traceId: 'trace-1',
            id: 'deny-orphan'
          } as any
        ],
        metrics: { ...mockTrace.metrics, stages: [] }
      };
      fixture.componentRef.setInput('trace', trace);
      fixture.detectChanges();
      const stages = component.waterfallStages();
      expect(stages.find((s) => s.name === 'revote-delay')).toBeUndefined();
    });

    it('should handle stages with no startEventId in tiebreaker', () => {
      const trace = {
        ...mockTrace,
        events: [],
        metrics: {
          ...mockTrace.metrics,
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
      fixture.componentRef.setInput('trace', trace);
      fixture.detectChanges();
      const stages = component.waterfallStages();
      expect(stages.length).toBe(2);
    });
  });

  describe('selectStageEvent edge cases', () => {
    it('should fall through to fallback when startEventId does not match', () => {
      spyOn(component.stageSelected, 'emit');
      const stage = {
        ...mockTrace.metrics.stages[0],
        startEventId: 'nonexistent'
      };
      component.selectStageEvent(stage);
      // Falls through, finds via fallback matching
      expect(component.stageSelected.emit).toHaveBeenCalledWith(
        mockTrace.events[0]
      );
    });
  });
});
