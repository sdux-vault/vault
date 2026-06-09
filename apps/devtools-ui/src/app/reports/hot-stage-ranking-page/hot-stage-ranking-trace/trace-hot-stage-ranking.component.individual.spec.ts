import { provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DevtoolsRegistryService } from '../../../services/registry/devtools-registry.service';
import type { TraceExecutionShape } from '../../../shapes/trace';
import { TraceExecutionStatuses } from '../../../shapes/trace';
import { TraceHotStageRankingComponent } from './trace-hot-stage-ranking.component';

describe('Component: TraceHotStageRanking (Individual)', () => {
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

  describe('viewMode', () => {
    it('should default to grouped', () => {
      expect(component.viewMode()).toBe('grouped');
    });

    it('should toggle to individual', () => {
      component.setViewMode('individual');
      expect(component.viewMode()).toBe('individual');
    });

    it('should toggle back to grouped', () => {
      component.setViewMode('individual');
      component.setViewMode('grouped');
      expect(component.viewMode()).toBe('grouped');
    });
  });

  describe('individualRankings with traces input', () => {
    it('should flatten all stages sorted by duration descending', () => {
      const total = 10 + 7 + 3 + 2;
      expect(component.individualRankings()).toEqual([
        {
          name: 'effect',
          behaviorKey: 'addTodo',
          traceId: 'trace-1',
          duration: 10,
          percentage: (10 / total) * 100
        },
        {
          name: 'reducer',
          behaviorKey: 'removeTodo',
          traceId: 'trace-2',
          duration: 7,
          percentage: (7 / total) * 100
        },
        {
          name: 'reducer',
          behaviorKey: 'addTodo',
          traceId: 'trace-1',
          duration: 3,
          percentage: (3 / total) * 100
        },
        {
          name: 'guard',
          behaviorKey: 'removeTodo',
          traceId: 'trace-2',
          duration: 2,
          percentage: (2 / total) * 100
        }
      ]);
    });

    it('should return empty array when no traces', () => {
      fixture.componentRef.setInput('traces', []);
      fixture.detectChanges();
      expect(component.individualRankings()).toEqual([]);
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
      expect(component.individualRankings()).toEqual([]);
    });
  });

  describe('individualRankings with single trace input', () => {
    it('should show only stages from the single trace', () => {
      fixture.componentRef.setInput('traces', undefined);
      fixture.componentRef.setInput('trace', mockTraces[0]);
      fixture.detectChanges();
      const total = 10 + 3;
      expect(component.individualRankings()).toEqual([
        {
          name: 'effect',
          behaviorKey: 'addTodo',
          traceId: 'trace-1',
          duration: 10,
          percentage: (10 / total) * 100
        },
        {
          name: 'reducer',
          behaviorKey: 'addTodo',
          traceId: 'trace-1',
          duration: 3,
          percentage: (3 / total) * 100
        }
      ]);
    });

    it('should show only stages from trace-2 when that trace is provided', () => {
      fixture.componentRef.setInput('traces', undefined);
      fixture.componentRef.setInput('trace', mockTraces[1]);
      fixture.detectChanges();
      const total = 7 + 2;
      expect(component.individualRankings()).toEqual([
        {
          name: 'reducer',
          behaviorKey: 'removeTodo',
          traceId: 'trace-2',
          duration: 7,
          percentage: (7 / total) * 100
        },
        {
          name: 'guard',
          behaviorKey: 'removeTodo',
          traceId: 'trace-2',
          duration: 2,
          percentage: (2 / total) * 100
        }
      ]);
    });
  });

  describe('slowestIndividual', () => {
    it('should return the first individual entry', () => {
      const total = 10 + 7 + 3 + 2;
      expect(component.slowestIndividual()).toEqual({
        name: 'effect',
        behaviorKey: 'addTodo',
        traceId: 'trace-1',
        duration: 10,
        percentage: (10 / total) * 100
      });
    });

    it('should return null when no entries', () => {
      fixture.componentRef.setInput('traces', []);
      fixture.detectChanges();
      expect(component.slowestIndividual()).toBeNull();
    });
  });

  describe('barWidthIndividual', () => {
    it('should return 100 for the slowest individual', () => {
      expect(
        component.barWidthIndividual(component.individualRankings()[0])
      ).toBe(100);
    });

    it('should return proportional width for other entries', () => {
      expect(
        component.barWidthIndividual(component.individualRankings()[3])
      ).toBeCloseTo(20, 1);
    });

    it('should use fallback of 1 when slowestIndividual is null', () => {
      fixture.componentRef.setInput('traces', []);
      fixture.detectChanges();
      const entry = {
        name: 'test',
        behaviorKey: 'bk',
        traceId: 't1',
        duration: 0,
        percentage: 0
      };
      expect(component.barWidthIndividual(entry)).toBe(0);
    });
  });

  describe('zero grandTotal in individual rankings', () => {
    it('should return 0 percentage when all durations are 0', () => {
      fixture.componentRef.setInput('traces', [
        {
          traceId: 't-zero',
          cellKey: 'cell',
          startedAt: 0,
          finishedAt: 0,
          events: [],
          metrics: {
            duration: 0,
            eventCount: 0,
            status: TraceExecutionStatuses.Success,
            slowestStage: { name: 'none', duration: 0 },
            fastestStage: { name: 'none', duration: 0 },
            stages: [
              {
                name: 'reducer',
                behaviorKey: 'bk',
                startedAt: 0,
                finishedAt: 0,
                duration: 0,
                type: 'stage'
              }
            ],
            hadRevote: false,
            controllerVoteCount: 0,
            usedLicensedFeatures: false
          }
        }
      ]);
      fixture.detectChanges();
      expect(component.individualRankings()[0].percentage).toBe(0);
    });
  });
});
