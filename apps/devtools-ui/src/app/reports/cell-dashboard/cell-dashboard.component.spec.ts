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
        status: TraceExecutionStatuses.Denied,
        slowestStage: { name: 'reducer', duration: 3 },
        fastestStage: { name: 'reducer', duration: 3 },
        stages: [],
        hadRevote: false,
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

    it('should compute denied rate as percentage', () => {
      expect(component.deniedRate()).toBe(25);
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
      expect(component.deniedRate()).toBe(0);
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
          status: 'healthy'
        },
        {
          cellKey: 'vault::auth::cell',
          traceCount: 2,
          avgDuration: 12,
          errorCount: 1,
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

    it('should mark status as warning when errors exist but rate is 10% or below', () => {
      const warningTraces: TraceExecutionShape[] = Array.from(
        { length: 10 },
        (_, i) => ({
          traceId: `wt-${i}`,
          cellKey: 'vault::warn::cell',
          startedAt: 1000 * i,
          finishedAt: 1000 * i + 5,
          events: [],
          metrics: {
            duration: 5,
            eventCount: 1,
            status:
              i === 0
                ? TraceExecutionStatuses.Failed
                : TraceExecutionStatuses.Success,
            slowestStage: { name: 'reducer', duration: 5 },
            fastestStage: { name: 'reducer', duration: 5 },
            stages: [],
            hadRevote: false,
            controllerVoteCount: 1,
            usedLicensedFeatures: false
          }
        })
      );

      const warningMap = new Map([['vault::warn::cell', warningTraces]]);

      const aggregate = TestBed.inject(DevtoolsAggregateService);
      (
        aggregate.traces as ReturnType<typeof signal<TraceExecutionShape[]>>
      ).set(warningTraces);
      (
        aggregate.tracesByCellKey as ReturnType<
          typeof signal<Map<string, TraceExecutionShape[]>>
        >
      ).set(warningMap);
      fixture.detectChanges();

      const row = component
        .rows()
        .find((r) => r.cellKey === 'vault::warn::cell');
      expect(row?.status).toBe('warning');
    });

    it('should count orphaned traces as errors', () => {
      const orphanedTraces: TraceExecutionShape[] = [
        {
          traceId: 'orphan-1',
          cellKey: 'vault::orphan::cell',
          startedAt: 1000,
          finishedAt: 1010,
          events: [],
          metrics: {
            duration: 10,
            eventCount: 1,
            status: TraceExecutionStatuses.Orphaned,
            slowestStage: { name: 'reducer', duration: 10 },
            fastestStage: { name: 'reducer', duration: 10 },
            stages: [],
            hadRevote: false,
            controllerVoteCount: 1,
            usedLicensedFeatures: false
          }
        }
      ];

      const orphanMap = new Map([['vault::orphan::cell', orphanedTraces]]);

      const aggregate = TestBed.inject(DevtoolsAggregateService);
      (
        aggregate.traces as ReturnType<typeof signal<TraceExecutionShape[]>>
      ).set(orphanedTraces);
      (
        aggregate.tracesByCellKey as ReturnType<
          typeof signal<Map<string, TraceExecutionShape[]>>
        >
      ).set(orphanMap);
      fixture.detectChanges();

      expect(component.errorRate()).toBe(100);
      const row = component
        .rows()
        .find((r) => r.cellKey === 'vault::orphan::cell');
      expect(row?.errorCount).toBe(1);
    });
  });

  describe('template rendering', () => {
    it('should render cell cards when rows exist', () => {
      const cards = fixture.nativeElement.querySelectorAll('.cell-card');
      expect(cards.length).toBe(2);
    });

    it('should show empty message when tracesByCellKey is empty', () => {
      const aggregate = TestBed.inject(DevtoolsAggregateService);
      (
        aggregate.traces as ReturnType<typeof signal<TraceExecutionShape[]>>
      ).set([]);
      (
        aggregate.tracesByCellKey as ReturnType<
          typeof signal<Map<string, TraceExecutionShape[]>>
        >
      ).set(new Map());
      fixture.detectChanges();

      const empty = fixture.nativeElement.querySelector('.empty-state');
      expect(empty).toBeTruthy();
      expect(empty.textContent).toContain('No cells detected yet');
    });

    it('should apply cell-error class when errorCount > 0', () => {
      const errorCells = fixture.nativeElement.querySelectorAll('.cell-error');
      expect(errorCells.length).toBe(1);
    });

    it('should apply card-value-warn class when errorRate > 0', () => {
      const warnCards =
        fixture.nativeElement.querySelectorAll('.card-value-warn');
      expect(warnCards.length).toBe(2);
    });

    it('should render status-healthy icon', () => {
      const healthy = fixture.nativeElement.querySelector('.status-healthy');
      expect(healthy).toBeTruthy();
    });

    it('should render status-error icon', () => {
      const error = fixture.nativeElement.querySelector('.status-error');
      expect(error).toBeTruthy();
    });

    it('should render status-warning icon when status is warning', () => {
      const warningTraces: TraceExecutionShape[] = Array.from(
        { length: 10 },
        (_, i) => ({
          traceId: `wt-${i}`,
          cellKey: 'vault::warn::cell',
          startedAt: 1000 * i,
          finishedAt: 1000 * i + 5,
          events: [],
          metrics: {
            duration: 5,
            eventCount: 1,
            status:
              i === 0
                ? TraceExecutionStatuses.Failed
                : TraceExecutionStatuses.Success,
            slowestStage: { name: 'reducer', duration: 5 },
            fastestStage: { name: 'reducer', duration: 5 },
            stages: [],
            hadRevote: false,
            controllerVoteCount: 1,
            usedLicensedFeatures: false
          }
        })
      );

      const aggregate = TestBed.inject(DevtoolsAggregateService);
      (
        aggregate.traces as ReturnType<typeof signal<TraceExecutionShape[]>>
      ).set(warningTraces);
      (
        aggregate.tracesByCellKey as ReturnType<
          typeof signal<Map<string, TraceExecutionShape[]>>
        >
      ).set(new Map([['vault::warn::cell', warningTraces]]));
      fixture.detectChanges();

      const warning = fixture.nativeElement.querySelector('.status-warning');
      expect(warning).toBeTruthy();
    });

    it('should navigate when clicking a cell card button', () => {
      const btn = fixture.nativeElement.querySelector('.cell-card-view-btn');
      btn.click();
      expect(routerSpy.navigate).toHaveBeenCalled();
    });

    it('should show ✗ when unlicensed', () => {
      mockIsLicensed.set(false);
      fixture.detectChanges();
      const cards = fixture.nativeElement.querySelectorAll('.card-value');
      const licensedCard = Array.from(cards).find(
        (c) =>
          (c as HTMLElement).textContent?.includes('✗') ||
          (c as HTMLElement).textContent?.includes('✓')
      ) as HTMLElement;
      expect(licensedCard.textContent).toContain('✗');
    });

    it('should not apply card-value-warn when rates are zero', () => {
      const aggregate = TestBed.inject(DevtoolsAggregateService);
      const zeroTraces: TraceExecutionShape[] = [
        {
          traceId: 'z-1',
          cellKey: 'vault::zero::cell',
          startedAt: 1000,
          finishedAt: 1005,
          events: [],
          metrics: {
            duration: 5,
            eventCount: 1,
            status: TraceExecutionStatuses.Success,
            slowestStage: { name: 'reducer', duration: 5 },
            fastestStage: { name: 'reducer', duration: 5 },
            stages: [],
            hadRevote: false,
            controllerVoteCount: 1,
            usedLicensedFeatures: false
          }
        }
      ];
      (
        aggregate.traces as ReturnType<typeof signal<TraceExecutionShape[]>>
      ).set(zeroTraces);
      (
        aggregate.tracesByCellKey as ReturnType<
          typeof signal<Map<string, TraceExecutionShape[]>>
        >
      ).set(new Map([['vault::zero::cell', zeroTraces]]));
      fixture.detectChanges();

      const warnCards =
        fixture.nativeElement.querySelectorAll('.card-value-warn');
      expect(warnCards.length).toBe(0);
    });

    it('should render cell card key text', () => {
      const key = fixture.nativeElement.querySelector('.cell-card-key');
      expect(key).toBeTruthy();
      expect(key.textContent).toBeTruthy();
    });
  });

  describe('rows edge cases', () => {
    it('should return avgDuration 0 for a cell with empty traces array', () => {
      const aggregate = TestBed.inject(DevtoolsAggregateService);
      (
        aggregate.tracesByCellKey as ReturnType<
          typeof signal<Map<string, TraceExecutionShape[]>>
        >
      ).set(new Map([['vault::empty::cell', []]]));
      fixture.detectChanges();

      const row = component
        .rows()
        .find((r) => r.cellKey === 'vault::empty::cell');
      expect(row?.avgDuration).toBe(0);
      expect(row?.status).toBe('healthy');
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
