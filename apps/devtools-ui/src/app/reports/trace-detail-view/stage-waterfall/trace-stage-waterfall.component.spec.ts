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
});
