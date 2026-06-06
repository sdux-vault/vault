import { provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DevtoolsAggregateService } from '../../services/devtools-aggregate.service';
import { DevtoolsLoggingService } from '../../services/devtools-logging.service';
import { DevtoolsRegistryService } from '../../services/registry/devtools-registry.service';
import type { TraceExecutionShape } from '../../shapes/trace';
import { TraceExecutionStatuses } from '../../shapes/trace';
import { HotStageRankingPageComponent } from './hot-stage-ranking-page.component';

describe('Component: HotStageRankingPage', () => {
  let fixture: ComponentFixture<HotStageRankingPageComponent>;
  let component: HotStageRankingPageComponent;

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
      cellKey: 'vault::auth::cell',
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

  const mockTracesByCellKey = new Map([
    ['vault::todos::cell', [mockTraces[0]]],
    ['vault::auth::cell', [mockTraces[1]]]
  ]);

  let mockTracesSignal: ReturnType<typeof signal<TraceExecutionShape[]>>;

  beforeEach(async () => {
    mockTracesSignal = signal(mockTraces);

    await TestBed.configureTestingModule({
      imports: [HotStageRankingPageComponent],
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: DevtoolsAggregateService,
          useValue: {
            traces: mockTracesSignal,
            tracesByCellKey: signal(mockTracesByCellKey)
          }
        },
        {
          provide: DevtoolsRegistryService,
          useValue: { isLicensed: mockIsLicensed }
        },
        {
          provide: DevtoolsLoggingService,
          useValue: jasmine.createSpyObj('DevtoolsLoggingService', [
            'clearEvents'
          ])
        }
      ]
    }).compileComponents();
    mockIsLicensed.set(true);

    fixture = TestBed.createComponent(HotStageRankingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('cellKeys', () => {
    it('should return sorted cell keys from aggregate service', () => {
      expect(component.cellKeys()).toEqual([
        'vault::auth::cell',
        'vault::todos::cell'
      ]);
    });
  });

  describe('selectedCell', () => {
    it('should default to all', () => {
      expect(component.selectedCell()).toBe('all');
    });

    it('should update when selectCell is called', () => {
      component.selectCell('vault::todos::cell');
      expect(component.selectedCell()).toBe('vault::todos::cell');
    });
  });

  describe('filteredTraces', () => {
    it('should return all traces when cell is all', () => {
      expect(component.filteredTraces()).toEqual(mockTraces);
    });

    it('should filter traces by selected cell', () => {
      component.selectCell('vault::todos::cell');
      expect(component.filteredTraces()).toEqual([mockTraces[0]]);
    });

    it('should filter to auth cell', () => {
      component.selectCell('vault::auth::cell');
      expect(component.filteredTraces()).toEqual([mockTraces[1]]);
    });

    it('should return all traces after resetting to all', () => {
      component.selectCell('vault::todos::cell');
      component.selectCell('all');
      expect(component.filteredTraces()).toEqual(mockTraces);
    });

    it('should return empty when cell has no traces', () => {
      component.selectCell('vault::nonexistent::cell');
      expect(component.filteredTraces()).toEqual([]);
    });
  });
});
