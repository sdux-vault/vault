import { provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { DevtoolsAggregateService } from '../../services/devtools-aggregate.service';
import { DevtoolsLoggingService } from '../../services/devtools-logging.service';
import { DevtoolsRegistryService } from '../../services/registry/devtools-registry.service';
import type { TraceExecutionShape } from '../../shapes/trace';
import { TraceExecutionStatuses } from '../../shapes/trace';
import { CellDashboardComponent } from './cell-dashboard.component';

describe('Component: CellDashboard', () => {
  let fixture: ComponentFixture<CellDashboardComponent>;
  let component: CellDashboardComponent;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockIsLicensed = signal(true);

  const mockTraces: TraceExecutionShape[] = [
    {
      traceId: 'trace-1',
      cellKey: 'vault::todos::cell',
      startedAt: 1000,
      finishedAt: 1010,
      events: [],
      metrics: {
        duration: 10,
        eventCount: 3,
        status: TraceExecutionStatuses.Success,
        slowestStage: { name: 'reducer', duration: 5 },
        fastestStage: { name: 'reducer', duration: 5 },
        stages: [],
        hadRevote: false,
        controllerVoteCount: 1,
        usedLicensedFeatures: false
      }
    },
    {
      traceId: 'trace-2',
      cellKey: 'vault::todos::cell',
      startedAt: 2000,
      finishedAt: 2006,
      events: [],
      metrics: {
        duration: 6,
        eventCount: 2,
        status: TraceExecutionStatuses.Success,
        slowestStage: { name: 'reducer', duration: 3 },
        fastestStage: { name: 'reducer', duration: 3 },
        stages: [],
        hadRevote: true,
        controllerVoteCount: 1,
        usedLicensedFeatures: false
      }
    },
    {
      traceId: 'trace-3',
      cellKey: 'vault::auth::cell',
      startedAt: 3000,
      finishedAt: 3020,
      events: [],
      metrics: {
        duration: 20,
        eventCount: 4,
        status: TraceExecutionStatuses.Failed,
        slowestStage: { name: 'none', duration: 0 },
        fastestStage: { name: 'none', duration: 0 },
        stages: [],
        hadRevote: false,
        controllerVoteCount: 0,
        usedLicensedFeatures: false
      }
    },
    {
      traceId: 'trace-4',
      cellKey: 'vault::auth::cell',
      startedAt: 4000,
      finishedAt: 4004,
      events: [],
      metrics: {
        duration: 4,
        eventCount: 2,
        status: TraceExecutionStatuses.Success,
        slowestStage: { name: 'reducer', duration: 2 },
        fastestStage: { name: 'reducer', duration: 2 },
        stages: [],
        hadRevote: false,
        controllerVoteCount: 1,
        usedLicensedFeatures: false
      }
    }
  ];

  const mockTracesByCellKey = new Map([
    ['vault::todos::cell', [mockTraces[0], mockTraces[1]]],
    ['vault::auth::cell', [mockTraces[2], mockTraces[3]]]
  ]);

  let mockTracesSignal: ReturnType<typeof signal<TraceExecutionShape[]>>;

  beforeEach(async () => {
    mockTracesSignal = signal(mockTraces);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [CellDashboardComponent],
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
        },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();
    mockIsLicensed.set(true);

    fixture = TestBed.createComponent(CellDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('summary cards', () => {
    it('should compute cell count', () => {
      expect(component.cellCount()).toBe(2);
    });

    it('should compute total traces', () => {
      expect(component.totalTraces()).toBe(4);
    });

    it('should compute average duration', () => {
      expect(component.avgDuration()).toBe(10);
    });

    it('should compute error rate as percentage', () => {
      expect(component.errorRate()).toBe(25);
    });

    it('should compute revote rate as percentage', () => {
      expect(component.revoteRate()).toBe(25);
    });

    it('should reflect licensed state', () => {
      expect(component.isLicensed()).toBeTrue();
      mockIsLicensed.set(false);
      expect(component.isLicensed()).toBeFalse();
    });
  });

  describe('summary cards with no traces', () => {
    beforeEach(() => {
      mockTracesSignal.set([]);
      fixture.detectChanges();
    });

    it('should return zero for all metrics', () => {
      expect(component.cellCount()).toBe(2);
      expect(component.totalTraces()).toBe(0);
      expect(component.avgDuration()).toBe(0);
      expect(component.errorRate()).toBe(0);
      expect(component.revoteRate()).toBe(0);
    });
  });

  describe('rows', () => {
    it('should produce rows sorted by trace count descending', () => {
      expect(component.rows()).toEqual([
        {
          cellKey: 'vault::todos::cell',
          traceCount: 2,
          avgDuration: 8,
          errorCount: 0,
          revoteCount: 1,
          status: 'healthy'
        },
        {
          cellKey: 'vault::auth::cell',
          traceCount: 2,
          avgDuration: 12,
          errorCount: 1,
          revoteCount: 0,
          status: 'error'
        }
      ]);
    });

    it('should mark status as error when error rate exceeds 10%', () => {
      const authRow = component
        .rows()
        .find((r) => r.cellKey === 'vault::auth::cell');
      expect(authRow?.status).toBe('error');
    });
  });

  describe('navigateToCell', () => {
    it('should navigate to trace detail with cell query param', () => {
      component.navigateToCell('vault::todos::cell');
      expect(routerSpy.navigate).toHaveBeenCalledWith(
        ['/reports/trace-detail'],
        { queryParams: { cell: 'vault::todos::cell' } }
      );
    });
  });
});
