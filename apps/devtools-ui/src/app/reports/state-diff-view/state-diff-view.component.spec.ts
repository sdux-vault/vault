import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DevtoolsAggregateService } from '../../services/devtools-aggregate.service';
import { DevtoolsLoggingService } from '../../services/devtools-logging.service';
import { DevtoolsRegistryService } from '../../services/registry/devtools-registry.service';
import type {
  CandidateSnapshotShape,
  TraceExecutionShape
} from '../../shapes/trace';
import { TraceExecutionStatuses } from '../../shapes/trace';
import { StateDiffViewComponent } from './state-diff-view.component';

describe('StateDiffViewComponent', () => {
  let component: StateDiffViewComponent;
  let fixture: ComponentFixture<StateDiffViewComponent>;
  const mockIsLicensed = signal(true);

  const mockCandidates: CandidateSnapshotShape[] = [
    {
      stage: 'reducer' as any,
      eventId: 'e1',
      behaviorKey: 'addTodo',
      timestamp: 1001,
      sequenceIndex: 0,
      value: { count: 0 }
    },
    {
      stage: 'effect' as any,
      eventId: 'e2',
      behaviorKey: 'addTodo',
      timestamp: 1002,
      sequenceIndex: 1,
      value: { count: 1 }
    },
    {
      stage: 'interceptor' as any,
      eventId: 'e3',
      behaviorKey: 'addTodo',
      timestamp: 1003,
      sequenceIndex: 2,
      value: { count: 2 }
    }
  ];

  const mockTraces: TraceExecutionShape[] = [
    {
      traceId: 'trace-1',
      cellKey: 'vault::todos::cell',
      startedAt: 1000,
      finishedAt: 1005,
      events: [],
      metrics: {
        duration: 5,
        eventCount: 3,
        status: TraceExecutionStatuses.Success,
        slowestStage: { name: 'reducer', duration: 3 },
        fastestStage: { name: 'reducer', duration: 3 },
        stages: [],
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
      events: [],
      metrics: {
        duration: 10,
        eventCount: 2,
        status: TraceExecutionStatuses.Failed,
        slowestStage: { name: 'reducer', duration: 5 },
        fastestStage: { name: 'reducer', duration: 5 },
        stages: [],
        hadRevote: false,
        controllerVoteCount: 1,
        usedLicensedFeatures: false
      }
    }
  ];

  let mockAggregate: {
    traces: ReturnType<typeof signal<TraceExecutionShape[]>>;
    tracesByCellKey: ReturnType<
      typeof signal<Map<string, TraceExecutionShape[]>>
    >;
    extractCandidates: jasmine.Spy;
  };

  beforeEach(async () => {
    const cellMap = new Map<string, TraceExecutionShape[]>();
    cellMap.set('vault::todos::cell', [mockTraces[0]]);
    cellMap.set('vault::auth::cell', [mockTraces[1]]);

    mockAggregate = {
      traces: signal<TraceExecutionShape[]>([...mockTraces]),
      tracesByCellKey: signal(cellMap),
      extractCandidates: jasmine
        .createSpy('extractCandidates')
        .and.returnValue(mockCandidates)
    };

    await TestBed.configureTestingModule({
      imports: [StateDiffViewComponent, MatSelectModule, MatTooltipModule],
      providers: [
        { provide: DevtoolsAggregateService, useValue: mockAggregate },
        {
          provide: DevtoolsLoggingService,
          useValue: { clearEvents: () => {} }
        },
        {
          provide: DevtoolsRegistryService,
          useValue: { isLicensed: mockIsLicensed }
        }
      ]
    }).compileComponents();

    mockIsLicensed.set(true);
    fixture = TestBed.createComponent(StateDiffViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should auto-select the first trace', () => {
    expect(component.selectedTraceId()).toBe('trace-1');
  });

  it('should compute cellKeys sorted', () => {
    expect(component.cellKeys()).toEqual([
      'vault::auth::cell',
      'vault::todos::cell'
    ]);
  });

  it('should compute filteredTraces sorted by startedAt', () => {
    const traces = component.filteredTraces();
    expect(traces.length).toBe(2);
    expect(traces[0].traceId).toBe('trace-1');
    expect(traces[1].traceId).toBe('trace-2');
  });

  it('should filter traces by selected cell', () => {
    component.selectCell('vault::auth::cell');
    fixture.detectChanges();
    const traces = component.filteredTraces();
    expect(traces.length).toBe(1);
    expect(traces[0].cellKey).toBe('vault::auth::cell');
  });

  it('should compute traceLabels per cell key', () => {
    const labels = component.traceLabels();
    expect(labels.get('trace-1')).toBe('t1');
    expect(labels.get('trace-2')).toBe('t1');
  });

  it('should compute selectedTrace from selectedTraceId', () => {
    expect(component.selectedTrace()?.traceId).toBe('trace-1');
  });

  it('should return null selectedTrace when no trace selected', () => {
    mockAggregate.traces.set([]);
    fixture.detectChanges();
    component.selectedTraceId.set(null);
    expect(component.selectedTrace()).toBeNull();
  });

  it('should compute candidates from aggregate.extractCandidates', () => {
    expect(component.candidates()).toEqual(mockCandidates);
    expect(mockAggregate.extractCandidates).toHaveBeenCalled();
  });

  it('should compute totalPairs as candidates.length - 1', () => {
    expect(component.totalPairs()).toBe(2);
  });

  it('should compute zero totalPairs with no candidates', () => {
    mockAggregate.extractCandidates.and.returnValue([]);
    mockAggregate.traces.set([]);
    component.selectedTraceId.set(null);
    fixture.detectChanges();
    expect(component.totalPairs()).toBe(0);
  });

  it('should compute beforeSnapshot and afterSnapshot', () => {
    expect(component.beforeSnapshot()?.eventId).toBe('e1');
    expect(component.afterSnapshot()?.eventId).toBe('e2');
  });

  describe('isLicensed', () => {
    it('should reflect registry isLicensed', () => {
      expect(component.isLicensed()).toBe(true);
      mockIsLicensed.set(false);
      expect(component.isLicensed()).toBe(false);
    });
  });

  describe('diffHunks', () => {
    it('should return diff hunks for before/after snapshots', () => {
      const hunks = component.diffHunks();
      expect(hunks.length).toBeGreaterThan(0);
    });

    it('should return empty array when no snapshots selected', () => {
      mockAggregate.extractCandidates.and.returnValue([]);
      mockAggregate.traces.set([]);
      component.selectedTraceId.set(null);
      fixture.detectChanges();
      expect(component.diffHunks()).toEqual([]);
    });
  });

  describe('beforeLines and afterLines', () => {
    it('should produce lines from diff hunks', () => {
      const before = component.beforeLines();
      const after = component.afterLines();
      expect(before.length).toBeGreaterThan(0);
      expect(after.length).toBeGreaterThan(0);
    });

    it('should mark removed lines with diff-line-removed', () => {
      const before = component.beforeLines();
      const removed = before.filter((l) => l.cssClass === 'diff-line-removed');
      expect(removed.length).toBeGreaterThan(0);
    });

    it('should mark added lines with diff-line-added', () => {
      const after = component.afterLines();
      const added = after.filter((l) => l.cssClass === 'diff-line-added');
      expect(added.length).toBeGreaterThan(0);
    });

    it('should return empty arrays when no snapshots selected', () => {
      mockAggregate.extractCandidates.and.returnValue([]);
      mockAggregate.traces.set([]);
      component.selectedTraceId.set(null);
      fixture.detectChanges();
      expect(component.beforeLines()).toEqual([]);
      expect(component.afterLines()).toEqual([]);
    });
  });

  describe('pair navigation', () => {
    it('should start at indices 0 and 1', () => {
      expect(component.beforeIndex()).toBe(0);
      expect(component.afterIndex()).toBe(1);
    });

    it('should not navigate previous from start', () => {
      expect(component.hasPrevious()).toBe(false);
    });

    it('should navigate to next pair', () => {
      component.nextPair();
      expect(component.beforeIndex()).toBe(1);
      expect(component.afterIndex()).toBe(2);
    });

    it('should detect hasNext', () => {
      expect(component.hasNext()).toBe(true);
      component.nextPair();
      expect(component.hasNext()).toBe(false);
    });

    it('should navigate to previous pair', () => {
      component.nextPair();
      component.previousPair();
      expect(component.beforeIndex()).toBe(0);
      expect(component.afterIndex()).toBe(1);
    });

    it('should not navigate previous when already at start', () => {
      component.previousPair();
      expect(component.beforeIndex()).toBe(0);
      expect(component.afterIndex()).toBe(1);
    });

    it('should not navigate next when already at end', () => {
      component.nextPair();
      component.nextPair();
      expect(component.beforeIndex()).toBe(1);
      expect(component.afterIndex()).toBe(2);
    });
  });

  describe('selectSnapshot', () => {
    it('should set indices with lower index as before', () => {
      component.selectSnapshot(2);
      expect(component.beforeIndex()).toBe(0);
      expect(component.afterIndex()).toBe(2);
    });

    it('should set indices correctly when selected is before current before', () => {
      component.nextPair();
      component.selectSnapshot(0);
      expect(component.beforeIndex()).toBe(0);
      expect(component.afterIndex()).toBe(1);
    });
  });

  describe('selectCell', () => {
    it('should reset trace selection and pair indices', () => {
      component.nextPair();
      component.selectCell('vault::auth::cell');
      fixture.detectChanges();
      expect(component.selectedCell()).toBe('vault::auth::cell');
      expect(component.beforeIndex()).toBe(0);
      expect(component.afterIndex()).toBe(1);
    });
  });

  describe('selectTrace', () => {
    it('should set trace and reset pair', () => {
      component.nextPair();
      component.selectTrace('trace-2');
      expect(component.selectedTraceId()).toBe('trace-2');
      expect(component.beforeIndex()).toBe(0);
      expect(component.afterIndex()).toBe(1);
    });
  });

  describe('relativeTime', () => {
    it('should return relative time from trace start', () => {
      const result = component.relativeTime(mockCandidates[0]);
      expect(result).toBe('+1.0ms');
    });

    it('should return empty string when no trace selected', () => {
      component.selectedTraceId.set(null);
      mockAggregate.traces.set([]);
      fixture.detectChanges();
      const result = component.relativeTime(mockCandidates[0]);
      expect(result).toBe('');
    });
  });

  describe('statusLabel', () => {
    it('should return ✓ SUCCESS for success', () => {
      expect(component.statusLabel(mockTraces[0])).toBe('✓ SUCCESS');
    });

    it('should return ✗ FAILED for failed', () => {
      expect(component.statusLabel(mockTraces[1])).toBe('✗ FAILED');
    });

    it('should return ⊘ DENIED for denied', () => {
      const trace = {
        ...mockTraces[0],
        metrics: {
          ...mockTraces[0].metrics,
          status: TraceExecutionStatuses.Denied
        }
      };
      expect(component.statusLabel(trace)).toBe('⊘ DENIED');
    });

    it('should return ⚠ ORPHANED for orphaned', () => {
      const trace = {
        ...mockTraces[0],
        metrics: {
          ...mockTraces[0].metrics,
          status: TraceExecutionStatuses.Orphaned
        }
      };
      expect(component.statusLabel(trace)).toBe('⚠ ORPHANED');
    });

    it('should return ↺ ABORTED for aborted', () => {
      const trace = {
        ...mockTraces[0],
        metrics: {
          ...mockTraces[0].metrics,
          status: TraceExecutionStatuses.Aborted
        }
      };
      expect(component.statusLabel(trace)).toBe('↺ ABORTED');
    });

    it('should return ? for unknown status', () => {
      const trace = {
        ...mockTraces[0],
        metrics: { ...mockTraces[0].metrics, status: 'unknown' as any }
      };
      expect(component.statusLabel(trace)).toBe('?');
    });
  });

  describe('statusClass', () => {
    it('should return status-success for success', () => {
      expect(component.statusClass(mockTraces[0])).toBe('status-success');
    });

    it('should return status-error for failed', () => {
      expect(component.statusClass(mockTraces[1])).toBe('status-error');
    });

    it('should return status-denied for denied', () => {
      const trace = {
        ...mockTraces[0],
        metrics: {
          ...mockTraces[0].metrics,
          status: TraceExecutionStatuses.Denied
        }
      };
      expect(component.statusClass(trace)).toBe('status-denied');
    });

    it('should return status-orphaned for orphaned', () => {
      const trace = {
        ...mockTraces[0],
        metrics: {
          ...mockTraces[0].metrics,
          status: TraceExecutionStatuses.Orphaned
        }
      };
      expect(component.statusClass(trace)).toBe('status-orphaned');
    });

    it('should return status-aborted for aborted', () => {
      const trace = {
        ...mockTraces[0],
        metrics: {
          ...mockTraces[0].metrics,
          status: TraceExecutionStatuses.Aborted
        }
      };
      expect(component.statusClass(trace)).toBe('status-aborted');
    });

    it('should return empty string for unknown status', () => {
      const trace = {
        ...mockTraces[0],
        metrics: { ...mockTraces[0].metrics, status: 'unknown' as any }
      };
      expect(component.statusClass(trace)).toBe('');
    });
  });

  describe('auto-select effect', () => {
    it('should auto-select first trace when current is invalid', () => {
      component.selectedTraceId.set('nonexistent');
      fixture.detectChanges();
      expect(component.selectedTraceId()).toBe('trace-1');
    });
  });

  describe('template rendering', () => {
    it('should show upsell notice when not licensed', () => {
      mockIsLicensed.set(false);
      fixture.detectChanges();
      const upsell = fixture.nativeElement.querySelector('sdux-upsell-notice');
      expect(upsell).toBeTruthy();
      expect(
        fixture.nativeElement.querySelector('.state-diff-page')
      ).toBeNull();
    });

    it('should show empty state when filteredTraces is empty', () => {
      mockAggregate.traces.set([]);
      mockAggregate.tracesByCellKey.set(new Map());
      fixture.detectChanges();

      const empty = fixture.nativeElement.querySelector('.empty-state');
      expect(empty).toBeTruthy();
      expect(empty.textContent).toContain('No traces available');
    });

    it('should show empty state when fewer than 2 candidates', () => {
      mockAggregate.extractCandidates.and.returnValue([mockCandidates[0]]);
      mockAggregate.traces.set([{ ...mockTraces[0] }, { ...mockTraces[1] }]);
      fixture.detectChanges();

      const empties = fixture.nativeElement.querySelectorAll('.empty-state');
      const candidateEmpty = Array.from(empties).find((el) =>
        (el as HTMLElement).textContent?.includes('fewer than 2')
      );
      expect(candidateEmpty).toBeTruthy();
    });

    it('should render pair navigation when candidates >= 2', () => {
      const nav = fixture.nativeElement.querySelector('.pair-nav');
      expect(nav).toBeTruthy();
      const counter = fixture.nativeElement.querySelector('.pair-counter');
      expect(counter.textContent).toContain('Pair 1 of 2');
    });

    it('should render diff panels with before/after headers', () => {
      const headers =
        fixture.nativeElement.querySelectorAll('.diff-header-title');
      expect(headers.length).toBe(2);
      expect(headers[0].textContent).toContain('BEFORE');
      expect(headers[1].textContent).toContain('AFTER');
    });

    it('should render snapshot table rows', () => {
      const rows = fixture.nativeElement.querySelectorAll('.snapshot-row');
      expect(rows.length).toBe(6);
    });

    it('should mark selected snapshot rows', () => {
      const selected = fixture.nativeElement.querySelectorAll(
        '.snapshot-row.selected'
      );
      expect(selected.length).toBe(2);
    });

    it('should render indicator dots for selected snapshots', () => {
      const indicators = fixture.nativeElement.querySelectorAll('.indicator');
      expect(indicators.length).toBeGreaterThanOrEqual(2);
    });

    it('should render trace banner with status badge', () => {
      const badge = fixture.nativeElement.querySelector('.trace-status-badge');
      expect(badge).toBeTruthy();
      expect(badge.textContent).toContain('SUCCESS');
    });

    it('should disable previous button at start', () => {
      const prevBtn = fixture.nativeElement.querySelector(
        '.sdux-button[aria-label="Previous pair"]'
      );
      expect(prevBtn.disabled).toBeTrue();
    });

    it('should enable next button when hasNext', () => {
      const nextBtn = fixture.nativeElement.querySelector(
        '.sdux-button[aria-label="Next pair"]'
      );
      expect(nextBtn.disabled).toBeFalse();
    });

    it('should navigate via next button click', () => {
      const nextBtn = fixture.nativeElement.querySelector(
        '.sdux-button[aria-label="Next pair"]'
      );
      nextBtn.click();
      fixture.detectChanges();
      expect(component.beforeIndex()).toBe(1);
      expect(component.afterIndex()).toBe(2);
    });

    it('should navigate via previous button click', () => {
      component.nextPair();
      fixture.detectChanges();
      const prevBtn = fixture.nativeElement.querySelector(
        '.sdux-button[aria-label="Previous pair"]'
      );
      prevBtn.click();
      fixture.detectChanges();
      expect(component.beforeIndex()).toBe(0);
    });

    it('should click snapshot row to select', () => {
      const rows = fixture.nativeElement.querySelectorAll('.snapshot-row');
      rows[2].click();
      fixture.detectChanges();
      expect(component.afterIndex()).toBe(2);
    });

    it('should render trace-filter select even when no filtered traces', () => {
      mockAggregate.traces.set([]);
      mockAggregate.tracesByCellKey.set(new Map());
      fixture.detectChanges();
      const traceFilter = fixture.nativeElement.querySelector('.trace-filter');
      expect(traceFilter).not.toBeNull();
    });
  });

  describe('beforeSnapshot and afterSnapshot edge cases', () => {
    it('should return null when index is out of bounds', () => {
      mockAggregate.extractCandidates.and.returnValue([]);
      mockAggregate.traces.set([]);
      component.selectedTraceId.set(null);
      fixture.detectChanges();
      expect(component.beforeSnapshot()).toBeNull();
      expect(component.afterSnapshot()).toBeNull();
    });
  });

  describe('hasNext edge case', () => {
    it('should return false when candidates list is empty', () => {
      mockAggregate.extractCandidates.and.returnValue([]);
      mockAggregate.traces.set([]);
      component.selectedTraceId.set(null);
      fixture.detectChanges();
      expect(component.hasNext()).toBeFalse();
    });
  });

  describe('diffHunks with partial nulls', () => {
    it('should diff when before is null but after exists', () => {
      mockAggregate.extractCandidates.and.returnValue([
        { ...mockCandidates[0], value: null },
        mockCandidates[1]
      ]);
      fixture.detectChanges();
      const hunks = component.diffHunks();
      expect(hunks.length).toBeGreaterThan(0);
    });

    it('should diff when after is null but before exists', () => {
      mockAggregate.extractCandidates.and.returnValue([
        mockCandidates[0],
        { ...mockCandidates[1], value: null }
      ]);
      fixture.detectChanges();
      const hunks = component.diffHunks();
      expect(hunks.length).toBeGreaterThan(0);
    });
  });

  describe('selectSnapshot when index equals afterIndex', () => {
    it('should swap using beforeIndex as other when index matches afterIndex', () => {
      component.selectSnapshot(1);
      expect(component.beforeIndex()).toBe(0);
      expect(component.afterIndex()).toBe(1);
    });

    it('should handle index equal to other (same as before)', () => {
      component.nextPair();
      component.selectSnapshot(1);
      expect(component.beforeIndex()).toBe(1);
      expect(component.afterIndex()).toBe(2);
    });
  });

  describe('auto-select effect no-op', () => {
    it('should not change selectedTraceId when current trace is valid', () => {
      component.selectedTraceId.set('trace-2');
      fixture.detectChanges();
      expect(component.selectedTraceId()).toBe('trace-2');
    });

    it('should not select when traces list is empty', () => {
      mockAggregate.traces.set([]);
      mockAggregate.tracesByCellKey.set(new Map());
      component.selectedTraceId.set(null);
      fixture.detectChanges();
      expect(component.selectedTraceId()).toBeNull();
    });
  });

  describe('buildLines edge cases', () => {
    it('should handle unchanged lines with no trailing newline', () => {
      mockAggregate.extractCandidates.and.returnValue([
        { ...mockCandidates[0], value: { a: 1 } },
        { ...mockCandidates[1], value: { a: 1 } }
      ]);
      mockAggregate.traces.set([{ ...mockTraces[0] }, { ...mockTraces[1] }]);
      fixture.detectChanges();
      const before = component.beforeLines();
      const after = component.afterLines();
      expect(before.length).toBeGreaterThan(0);
      expect(after.length).toBeGreaterThan(0);
      before.forEach((l) => expect(l.cssClass).toBe(''));
      after.forEach((l) => expect(l.cssClass).toBe(''));
    });

    it('should fallback to empty object when before value is null', () => {
      mockAggregate.extractCandidates.and.returnValue([
        { ...mockCandidates[0], value: null },
        { ...mockCandidates[1], value: { x: 1 } }
      ]);
      mockAggregate.traces.set([{ ...mockTraces[0] }, { ...mockTraces[1] }]);
      fixture.detectChanges();
      const hunks = component.diffHunks();
      expect(hunks.length).toBeGreaterThan(0);
    });

    it('should fallback to empty object when after value is null', () => {
      mockAggregate.extractCandidates.and.returnValue([
        { ...mockCandidates[0], value: { x: 1 } },
        { ...mockCandidates[1], value: null }
      ]);
      mockAggregate.traces.set([{ ...mockTraces[0] }, { ...mockTraces[1] }]);
      fixture.detectChanges();
      const hunks = component.diffHunks();
      expect(hunks.length).toBeGreaterThan(0);
    });
  });

  describe('template diff-header-meta', () => {
    it('should display sequence index and relative time', () => {
      const metas = fixture.nativeElement.querySelectorAll('.diff-header-meta');
      expect(metas.length).toBe(2);
      expect(metas[0].textContent).toContain('seq #1');
      expect(metas[0].textContent).toContain('+1.0ms');
      expect(metas[1].textContent).toContain('seq #2');
      expect(metas[1].textContent).toContain('+2.0ms');
    });
  });

  describe('template snapshot-table-headers', () => {
    it('should render before and after table headers with candidate count', () => {
      const headers = fixture.nativeElement.querySelectorAll(
        '.snapshot-table-header'
      );
      expect(headers.length).toBe(2);
      expect(headers[0].textContent).toContain('Before Snapshot');
      expect(headers[0].textContent).toContain('3');
      expect(headers[1].textContent).toContain('After Snapshot');
      expect(headers[1].textContent).toContain('3');
    });
  });

  describe('selectBeforeSnapshot', () => {
    it('should set beforeIndex without changing afterIndex when less than afterIndex', () => {
      component.nextPair();
      // now before=1, after=2
      component.selectBeforeSnapshot(0);
      expect(component.beforeIndex()).toBe(0);
      expect(component.afterIndex()).toBe(2);
    });

    it('should not change if index equals afterIndex', () => {
      component.selectBeforeSnapshot(1);
      expect(component.beforeIndex()).toBe(0);
      expect(component.afterIndex()).toBe(1);
    });

    it('should swap when selecting index greater than afterIndex', () => {
      component.selectBeforeSnapshot(2);
      expect(component.beforeIndex()).toBe(1);
      expect(component.afterIndex()).toBe(2);
    });
  });

  describe('selectAfterSnapshot', () => {
    it('should set afterIndex to the selected index', () => {
      component.selectAfterSnapshot(2);
      expect(component.afterIndex()).toBe(2);
      expect(component.beforeIndex()).toBe(0);
    });

    it('should not change if index equals beforeIndex', () => {
      component.selectAfterSnapshot(0);
      expect(component.afterIndex()).toBe(1);
      expect(component.beforeIndex()).toBe(0);
    });

    it('should swap when selecting index less than beforeIndex', () => {
      component.nextPair();
      // now before=1, after=2
      component.selectAfterSnapshot(0);
      expect(component.beforeIndex()).toBe(0);
      expect(component.afterIndex()).toBe(1);
    });
  });
});
