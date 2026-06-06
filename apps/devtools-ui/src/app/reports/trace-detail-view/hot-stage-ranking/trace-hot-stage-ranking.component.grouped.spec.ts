import { provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DevtoolsRegistryService } from '../../../services/registry/devtools-registry.service';
import type { TraceExecutionShape } from '../../../shapes/trace';
import { TraceExecutionStatuses } from '../../../shapes/trace';
import { TraceHotStageRankingComponent } from './trace-hot-stage-ranking.component';

describe('Component: TraceHotStageRanking (Grouped)', () => {
  let fixture: ComponentFixture<TraceHotStageRankingComponent>;
  let component: TraceHotStageRankingComponent;

  const mockIsLicensed = signal(true);

  const mockTraces: TraceExecutionShape[] = [
    {
      traceId: 'trace-1',
      cellKey: 'vault::todos::cell',
      startedAt: 1000,
      finishedAt: 1020,
      events: [],
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
            type: 'stage'
          },
          {
            name: 'effect',
            behaviorKey: 'addTodo',
            startedAt: 1005,
            finishedAt: 1015,
            duration: 10,
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
      cellKey: 'vault::todos::cell',
      startedAt: 2000,
      finishedAt: 2012,
      events: [],
      metrics: {
        duration: 12,
        eventCount: 3,
        status: TraceExecutionStatuses.Success,
        slowestStage: { name: 'reducer', duration: 7 },
        fastestStage: { name: 'guard', duration: 2 },
        stages: [
          {
            name: 'reducer',
            behaviorKey: 'removeTodo',
            startedAt: 2001,
            finishedAt: 2008,
            duration: 7,
            type: 'stage'
          },
          {
            name: 'guard',
            behaviorKey: 'removeTodo',
            startedAt: 2000,
            finishedAt: 2002,
            duration: 2,
            type: 'stage'
          }
        ],
        hadRevote: false,
        controllerVoteCount: 1,
        usedLicensedFeatures: false
      }
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TraceHotStageRankingComponent],
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: DevtoolsRegistryService,
          useValue: { isLicensed: mockIsLicensed }
        }
      ]
    }).compileComponents();
    mockIsLicensed.set(true);

    fixture = TestBed.createComponent(TraceHotStageRankingComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('traces', mockTraces);
    fixture.detectChanges();
  });

  describe('resolvedTraces', () => {
    it('should use traces input when provided', () => {
      expect(component.resolvedTraces()).toEqual(mockTraces);
    });

    it('should wrap single trace input in array', () => {
      fixture.componentRef.setInput('traces', undefined);
      fixture.componentRef.setInput('trace', mockTraces[0]);
      fixture.detectChanges();
      expect(component.resolvedTraces()).toEqual([mockTraces[0]]);
    });

    it('should prefer trace over traces when both provided', () => {
      fixture.componentRef.setInput('trace', mockTraces[1]);
      fixture.componentRef.setInput('traces', mockTraces);
      fixture.detectChanges();
      expect(component.resolvedTraces()).toEqual([mockTraces[1]]);
    });

    it('should return empty array when neither input is provided', () => {
      fixture.componentRef.setInput('traces', undefined);
      fixture.componentRef.setInput('trace', undefined);
      fixture.detectChanges();
      expect(component.resolvedTraces()).toEqual([]);
    });
  });

  describe('rankings', () => {
    it('should aggregate stages by name sorted by duration descending', () => {
      const total = 10 + 10 + 2;
      expect(component.rankings()).toEqual([
        {
          name: 'reducer',
          totalDuration: 10,
          count: 2,
          percentage: (10 / total) * 100
        },
        {
          name: 'effect',
          totalDuration: 10,
          count: 1,
          percentage: (10 / total) * 100
        },
        {
          name: 'guard',
          totalDuration: 2,
          count: 1,
          percentage: (2 / total) * 100
        }
      ]);
    });

    it('should compute rankings from a single trace input', () => {
      fixture.componentRef.setInput('traces', undefined);
      fixture.componentRef.setInput('trace', mockTraces[0]);
      fixture.detectChanges();
      const total = 3 + 10;
      expect(component.rankings()).toEqual([
        {
          name: 'effect',
          totalDuration: 10,
          count: 1,
          percentage: (10 / total) * 100
        },
        {
          name: 'reducer',
          totalDuration: 3,
          count: 1,
          percentage: (3 / total) * 100
        }
      ]);
    });

    it('should return empty array when no traces', () => {
      fixture.componentRef.setInput('traces', []);
      fixture.detectChanges();
      expect(component.rankings()).toEqual([]);
    });

    it('should return empty array when traces have no stages', () => {
      const noStages = [
        {
          ...mockTraces[0],
          metrics: { ...mockTraces[0].metrics, stages: [] }
        }
      ];
      fixture.componentRef.setInput('traces', noStages);
      fixture.detectChanges();
      expect(component.rankings()).toEqual([]);
    });
  });

  describe('grandTotal', () => {
    it('should sum all stage durations', () => {
      expect(component.grandTotal()).toBe(22);
    });
  });

  describe('uniqueStageCount', () => {
    it('should count unique stage names', () => {
      expect(component.uniqueStageCount()).toBe(3);
    });
  });

  describe('slowest', () => {
    it('should return the first ranking entry', () => {
      expect(component.slowest()).toEqual({
        name: 'reducer',
        totalDuration: 10,
        count: 2,
        percentage: (10 / 22) * 100
      });
    });

    it('should return null when no rankings', () => {
      fixture.componentRef.setInput('traces', []);
      fixture.detectChanges();
      expect(component.slowest()).toBeNull();
    });
  });

  describe('fastest', () => {
    it('should return the last ranking entry', () => {
      expect(component.fastest()).toEqual({
        name: 'guard',
        totalDuration: 2,
        count: 1,
        percentage: (2 / 22) * 100
      });
    });

    it('should return null when no rankings', () => {
      fixture.componentRef.setInput('traces', []);
      fixture.detectChanges();
      expect(component.fastest()).toBeNull();
    });
  });

  describe('barWidth', () => {
    it('should return 100 for the slowest stage', () => {
      expect(component.barWidth(component.rankings()[0])).toBe(100);
    });

    it('should return proportional width for other stages', () => {
      expect(component.barWidth(component.rankings()[2])).toBeCloseTo(20, 1);
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
