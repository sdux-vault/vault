import { provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DevtoolsAggregateService } from '../../services/devtools-aggregate.service';
import { DevtoolsLoggingService } from '../../services/devtools-logging.service';
import { DevtoolsRegistryService } from '../../services/registry/devtools-registry.service';
import type { TraceExecutionShape } from '../../shapes/trace';
import { ReplayPageComponent } from './replay-page.component';

describe('Component: ReplayPage', () => {
  let fixture: ComponentFixture<ReplayPageComponent>;
  let component: ReplayPageComponent;
  let mockTracesSignal: ReturnType<typeof signal<TraceExecutionShape[]>>;
  let mockTracesByCellKey: ReturnType<
    typeof signal<Map<string, TraceExecutionShape[]>>
  >;

  const mockTrace: TraceExecutionShape = {
    traceId: 'abc-123-def-456',
    cellKey: 'employees',
    startedAt: 1000,
    finishedAt: 1500,
    events: [
      {
        name: 'lifecycle:start:replace',
        traceId: 'abc-123-def-456',
        timestamp: 1010
      } as any,
      {
        name: 'pipeline:candidate:resolve',
        traceId: 'abc-123-def-456',
        candidate: [{ id: 1, name: 'Luke' }],
        timestamp: 1045
      } as any
    ],
    metrics: {
      status: 'success',
      duration: 500,
      stageCount: 4,
      eventCount: 6
    } as any
  };

  const mockMergeTrace: TraceExecutionShape = {
    traceId: 'merge-trace-001',
    cellKey: 'employees',
    startedAt: 2000,
    finishedAt: 2200,
    events: [
      {
        name: 'lifecycle:start:merge',
        traceId: 'merge-trace-001',
        timestamp: 2005
      } as any,
      {
        name: 'pipeline:candidate:resolve',
        traceId: 'merge-trace-001',
        candidate: { name: 'updated' },
        timestamp: 2030
      } as any
    ],
    metrics: {
      status: 'success',
      duration: 200,
      stageCount: 3,
      eventCount: 4
    } as any
  };

  const mockNoLifecycleTrace: TraceExecutionShape = {
    traceId: 'no-lifecycle-001',
    cellKey: 'employees',
    startedAt: 3000,
    finishedAt: 3100,
    events: [
      {
        name: 'stage:start:resolve',
        traceId: 'no-lifecycle-001'
      } as any
    ],
    metrics: {
      status: 'success',
      duration: 100,
      stageCount: 1,
      eventCount: 1
    } as any
  };

  const mockCoreStateTrace: TraceExecutionShape = {
    traceId: 'core-state-001',
    cellKey: 'employees',
    startedAt: 4000,
    finishedAt: 4200,
    events: [
      {
        name: 'lifecycle:start:replace',
        traceId: 'core-state-001'
      } as any,
      {
        name: 'pipeline:candidate:resolve',
        traceId: 'core-state-001',
        candidate: [{ id: 11, name: 'Luke' }]
      } as any
    ],
    metrics: {
      status: 'success',
      duration: 200,
      stageCount: 4,
      eventCount: 6
    } as any
  };

  beforeEach(async () => {
    mockTracesSignal = signal<TraceExecutionShape[]>([
      mockTrace,
      mockMergeTrace,
      mockNoLifecycleTrace,
      mockCoreStateTrace
    ]);

    mockTracesByCellKey = signal(
      new Map([
        [
          'employees',
          [mockTrace, mockMergeTrace, mockNoLifecycleTrace, mockCoreStateTrace]
        ]
      ])
    );

    await TestBed.configureTestingModule({
      imports: [ReplayPageComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        {
          provide: DevtoolsAggregateService,
          useValue: {
            traces: mockTracesSignal,
            tracesByCellKey: mockTracesByCellKey,
            extractCandidates: (trace: TraceExecutionShape) => {
              const candidates = trace.events
                .filter(
                  (e: any) =>
                    e.name === 'pipeline:candidate:resolve' &&
                    e.candidate != null
                )
                .map((e: any, i: number) => ({
                  stage: 'resolve',
                  eventId: e.traceId + '-' + i,
                  behaviorKey: 'test',
                  timestamp: trace.startedAt + i,
                  sequenceIndex: i,
                  value: e.candidate
                }));
              return candidates;
            }
          }
        },
        {
          provide: DevtoolsRegistryService,
          useValue: { isLicensed: signal(true) }
        },
        {
          provide: DevtoolsLoggingService,
          useValue: { clearEvents: () => {} }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ReplayPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the page title', () => {
    const h2 = fixture.nativeElement.querySelector('h2');
    expect(h2.textContent).toContain('Pipeline Replay');
  });

  it('should list cell keys from traces', () => {
    expect(component.cellKeys()).toEqual(['employees']);
  });

  it('should show traces when a cell key is selected', () => {
    component.onCellKeyChange('employees');
    expect(component.cellTraces().length).toBe(4);
  });

  it('should resolve dispatch method as replace', () => {
    component.onCellKeyChange('employees');
    component.onTraceIdChange('abc-123-def-456');
    expect(component.dispatchMethod()).toBe('replace');
  });

  it('should resolve dispatch method as merge', () => {
    component.onCellKeyChange('employees');
    component.onTraceIdChange('merge-trace-001');
    expect(component.dispatchMethod()).toBe('merge');
  });

  it('should extract the resolved value from the trace', () => {
    component.onCellKeyChange('employees');
    component.onTraceIdChange('abc-123-def-456');
    expect(component.resolvedValue()).toEqual([{ id: 1, name: 'Luke' }]);
  });

  it('should show error when replaying without a live cell', () => {
    component.onCellKeyChange('employees');
    component.onTraceIdChange('abc-123-def-456');

    (globalThis as any).sdux = undefined;

    component.replay();

    expect(component.resultIsError()).toBeTrue();
    expect(component.resultMessage()).toContain('No live cell found');
  });

  it('should call replaceState on the live cell when replaying a replace trace', () => {
    component.onCellKeyChange('employees');
    component.onTraceIdChange('abc-123-def-456');

    const mockCell = {
      replaceState: jasmine.createSpy('replaceState'),
      mergeState: jasmine.createSpy('mergeState')
    };

    (globalThis as any).sdux = {
      replay: { getCell: () => mockCell }
    };

    component.replay();

    expect(mockCell.replaceState).toHaveBeenCalledWith([
      { id: 1, name: 'Luke' }
    ]);
    expect(mockCell.mergeState).not.toHaveBeenCalled();
    expect(component.resultIsError()).toBeFalse();
    expect(component.resultMessage()).toContain('replaceState');
  });

  it('should call mergeState on the live cell when replaying a merge trace', () => {
    component.onCellKeyChange('employees');
    component.onTraceIdChange('merge-trace-001');

    const mockCell = {
      replaceState: jasmine.createSpy('replaceState'),
      mergeState: jasmine.createSpy('mergeState')
    };

    (globalThis as any).sdux = {
      replay: { getCell: () => mockCell }
    };

    component.replay();

    expect(mockCell.mergeState).toHaveBeenCalledWith({ name: 'updated' });
    expect(mockCell.replaceState).not.toHaveBeenCalled();
    expect(component.resultIsError()).toBeFalse();
    expect(component.resultMessage()).toContain('mergeState');
  });

  it('should show error when replay throws', () => {
    component.onCellKeyChange('employees');
    component.onTraceIdChange('abc-123-def-456');

    const mockCell = {
      replaceState: jasmine
        .createSpy('replaceState')
        .and.throwError('Pipeline error'),
      mergeState: jasmine.createSpy('mergeState')
    };

    (globalThis as any).sdux = {
      replay: { getCell: () => mockCell }
    };

    component.replay();

    expect(component.resultIsError()).toBeTrue();
    expect(component.resultMessage()).toContain('Pipeline error');
  });

  it('should show error when replaying without selection', () => {
    component.replay();
    expect(component.resultIsError()).toBeTrue();
    expect(component.resultMessage()).toContain('Missing cell key');
  });

  it('should clear result message on cell key change', () => {
    component.onCellKeyChange('employees');
    component.onTraceIdChange('abc-123-def-456');
    component.replay();
    expect(component.resultMessage()).toBeTruthy();

    component.onCellKeyChange('employees');
    expect(component.resultMessage()).toBe('');
  });

  it('should auto-dismiss result message after 5 seconds', () => {
    jasmine.clock().install();
    try {
      component.onCellKeyChange('employees');
      component.onTraceIdChange('abc-123-def-456');
      component.replay();
      expect(component.resultMessage()).toBeTruthy();
      TestBed.flushEffects();

      jasmine.clock().tick(4999);
      expect(component.resultMessage()).toBeTruthy();

      jasmine.clock().tick(1);
      expect(component.resultMessage()).toBe('');
    } finally {
      jasmine.clock().uninstall();
    }
  });

  it('should default to replace when trace has no lifecycle events', () => {
    component.onCellKeyChange('employees');
    component.onTraceIdChange('no-lifecycle-001');
    expect(component.dispatchMethod()).toBe('replace');
  });

  it('should return undefined resolved value when trace has no resolve event', () => {
    component.onCellKeyChange('employees');
    component.onTraceIdChange('no-lifecycle-001');
    expect(component.resolvedValue()).toBeUndefined();
  });

  it('should extract resolved value from pipeline:candidate:resolve', () => {
    component.onCellKeyChange('employees');
    component.onTraceIdChange('core-state-001');
    expect(component.resolvedValue()).toEqual([{ id: 11, name: 'Luke' }]);
  });

  it('should auto-select the first cell key when traces are available', () => {
    expect(component.selectedCellKey()).toBe('employees');
    expect(component.cellTraces().length).toBe(4);
  });

  it('should return empty traces for an unknown cell key', () => {
    component.onCellKeyChange('nonexistent');
    expect(component.cellTraces()).toEqual([]);
  });

  it('should show error with stringified non-Error when replay throws a primitive', () => {
    component.onCellKeyChange('employees');
    component.onTraceIdChange('abc-123-def-456');

    const mockCell = {
      replaceState: jasmine.createSpy('replaceState').and.callFake(() => {
        throw 'raw string error';
      }),
      mergeState: jasmine.createSpy('mergeState')
    };

    (globalThis as any).sdux = {
      replay: { getCell: () => mockCell }
    };

    component.replay();

    expect(component.resultIsError()).toBeTrue();
    expect(component.resultMessage()).toContain('raw string error');
  });

  it('should show empty state when no traces are loaded', () => {
    mockTracesSignal.set([]);
    mockTracesByCellKey.set(new Map());
    fixture.detectChanges();

    expect(component.cellKeys()).toEqual([]);
  });

  it('should show upsell notice when not licensed', async () => {
    await TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [ReplayPageComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        {
          provide: DevtoolsAggregateService,
          useValue: {
            traces: signal([]),
            tracesByCellKey: signal(new Map())
          }
        },
        {
          provide: DevtoolsRegistryService,
          useValue: { isLicensed: signal(false) }
        }
      ]
    }).compileComponents();

    const unlicensedFixture = TestBed.createComponent(ReplayPageComponent);
    unlicensedFixture.detectChanges();

    const upsell =
      unlicensedFixture.nativeElement.querySelector('sdux-upsell-notice');
    expect(upsell).toBeTruthy();
  });

  it('should default showTraceSummary and showResolvedValue to true', () => {
    expect(component.showTraceSummary()).toBeTrue();
    expect(component.showResolvedValue()).toBeTrue();
  });

  it('should collapse trace summary and resolved value on successful replay', () => {
    component.onCellKeyChange('employees');
    component.onTraceIdChange('abc-123-def-456');

    const mockCell = {
      replaceState: jasmine.createSpy('replaceState'),
      mergeState: jasmine.createSpy('mergeState')
    };

    (globalThis as any).sdux = {
      replay: { getCell: () => mockCell }
    };

    component.replay();

    expect(component.showTraceSummary()).toBeFalse();
    expect(component.showResolvedValue()).toBeFalse();
    expect(component.showCompareTraces()).toBeTrue();
  });

  it('should not collapse sections on failed replay', () => {
    component.onCellKeyChange('employees');
    component.onTraceIdChange('abc-123-def-456');

    (globalThis as any).sdux = undefined;

    component.replay();

    expect(component.showTraceSummary()).toBeTrue();
    expect(component.showResolvedValue()).toBeTrue();
  });

  it('should generate trace labels as t1, t2, etc.', () => {
    component.onCellKeyChange('employees');
    const labels = component.traceLabels();
    expect(labels.get('abc-123-def-456')).toBe('t1');
    expect(labels.get('merge-trace-001')).toBe('t2');
  });

  it('should compute compareBeforeEvents from selected trace', () => {
    component.onCellKeyChange('employees');
    component.compareBeforeId.set('abc-123-def-456');

    const events = component.compareBeforeEvents();
    expect(events).toEqual(mockTrace.events);
  });

  it('should compute compareAfterEvents from selected trace', () => {
    component.onCellKeyChange('employees');
    component.compareAfterId.set('merge-trace-001');

    const events = component.compareAfterEvents();
    expect(events).toEqual(mockMergeTrace.events);
  });

  it('should return empty array for compareBeforeEvents when no trace selected', () => {
    component.onCellKeyChange('employees');
    expect(component.compareBeforeEvents()).toEqual([]);
  });

  it('should return empty array for compareAfterEvents for unknown trace', () => {
    component.onCellKeyChange('employees');
    component.compareAfterId.set('nonexistent-id');
    expect(component.compareAfterEvents()).toEqual([]);
  });

  it('should strip id and traceId from currentBeforeEvent', () => {
    component.onCellKeyChange('employees');
    component.compareBeforeId.set('abc-123-def-456');
    component.compareAfterId.set('merge-trace-001');
    component.compareEventIndex.set(0);

    const event = component.currentBeforeEvent() as Record<string, unknown>;
    expect(event).toBeDefined();
    expect(event['id']).toBeUndefined();
    expect(event['traceId']).toBeUndefined();
    expect(event['timestamp']).toBeUndefined();
    expect(event['name']).toBe('lifecycle:start:replace');
    expect(event['elapsed']).toBe('+10ms');
    expect(event['delta']).toBe('+5ms');
  });

  it('should strip id and traceId from currentAfterEvent', () => {
    component.onCellKeyChange('employees');
    component.compareBeforeId.set('abc-123-def-456');
    component.compareAfterId.set('merge-trace-001');
    component.compareEventIndex.set(0);

    const event = component.currentAfterEvent() as Record<string, unknown>;
    expect(event).toBeDefined();
    expect(event['id']).toBeUndefined();
    expect(event['traceId']).toBeUndefined();
    expect(event['timestamp']).toBeUndefined();
    expect(event['name']).toBe('lifecycle:start:merge');
    expect(event['elapsed']).toBe('+5ms');
    expect(event['delta']).toBe('-5ms');
  });

  it('should expand sections and clear result on trace change', () => {
    component.onCellKeyChange('employees');
    component.onTraceIdChange('abc-123-def-456');

    // Simulate successful replay which collapses sections
    const mockCell = {
      replaceState: jasmine.createSpy('replaceState'),
      mergeState: jasmine.createSpy('mergeState')
    };
    (globalThis as any).sdux = { replay: { getCell: () => mockCell } };
    component.replay();

    expect(component.showTraceSummary()).toBeFalse();
    expect(component.showResolvedValue()).toBeFalse();
    expect(component.resultMessage()).toBeTruthy();

    // Change trace — should reopen and clear message
    component.onTraceIdChange('merge-trace-001');

    expect(component.showTraceSummary()).toBeTrue();
    expect(component.showResolvedValue()).toBeTrue();
    expect(component.resultMessage()).toBe('');
    expect(component.resultIsError()).toBeFalse();
    expect(component.showCompareTraces()).toBeFalse();
  });

  it('should set compareBeforeId to selectedTraceId on successful replay', () => {
    component.onCellKeyChange('employees');
    component.onTraceIdChange('abc-123-def-456');

    const mockCell = {
      replaceState: jasmine.createSpy('replaceState'),
      mergeState: jasmine.createSpy('mergeState')
    };
    (globalThis as any).sdux = { replay: { getCell: () => mockCell } };

    component.replay();

    expect(component.compareBeforeId()).toBe('abc-123-def-456');
  });

  it('should default showCompareTraces to true', () => {
    expect(component.showCompareTraces()).toBeTrue();
  });

  it('should collapse compare traces on trace change', () => {
    component.onCellKeyChange('employees');
    component.onTraceIdChange('abc-123-def-456');

    expect(component.showCompareTraces()).toBeFalse();
  });

  it('should toggle showCompareTraces', () => {
    component.showCompareTraces.set(false);
    expect(component.showCompareTraces()).toBeFalse();

    component.showCompareTraces.set(true);
    expect(component.showCompareTraces()).toBeTrue();
  });

  it('should default showCompareHelp to false', () => {
    expect(component.showCompareHelp()).toBeFalse();
  });

  it('should toggle showCompareHelp', () => {
    component.showCompareHelp.set(true);
    expect(component.showCompareHelp()).toBeTrue();

    component.showCompareHelp.set(false);
    expect(component.showCompareHelp()).toBeFalse();
  });

  it('should navigate to previous event', () => {
    component.onCellKeyChange('employees');
    component.compareBeforeId.set('abc-123-def-456');
    component.compareAfterId.set('merge-trace-001');
    component.compareEventIndex.set(1);

    component.previousEvent();
    expect(component.compareEventIndex()).toBe(0);
  });

  it('should not navigate before first event', () => {
    component.onCellKeyChange('employees');
    component.compareBeforeId.set('abc-123-def-456');
    component.compareAfterId.set('merge-trace-001');
    component.compareEventIndex.set(0);

    component.previousEvent();
    expect(component.compareEventIndex()).toBe(0);
  });

  it('should navigate to next event', () => {
    component.onCellKeyChange('employees');
    component.compareBeforeId.set('abc-123-def-456');
    component.compareAfterId.set('merge-trace-001');
    component.compareEventIndex.set(0);

    component.nextEvent();
    expect(component.compareEventIndex()).toBe(1);
  });

  it('should not navigate past last event', () => {
    component.onCellKeyChange('employees');
    component.compareBeforeId.set('abc-123-def-456');
    component.compareAfterId.set('merge-trace-001');
    component.compareEventIndex.set(1);

    component.nextEvent();
    expect(component.compareEventIndex()).toBe(1);
  });

  it('should compute compareHasPrevious and compareHasNext', () => {
    component.onCellKeyChange('employees');
    component.compareBeforeId.set('abc-123-def-456');
    component.compareAfterId.set('merge-trace-001');
    component.compareEventIndex.set(0);

    expect(component.compareHasPrevious()).toBeFalse();
    expect(component.compareHasNext()).toBeTrue();

    component.compareEventIndex.set(1);
    expect(component.compareHasPrevious()).toBeTrue();
    expect(component.compareHasNext()).toBeFalse();
  });

  it('should swap before/after when selecting the before trace', () => {
    component.onCellKeyChange('employees');
    component.compareBeforeId.set('abc-123-def-456');
    component.compareAfterId.set('merge-trace-001');

    component.selectCompareTrace('abc-123-def-456');

    expect(component.compareBeforeId()).toBe('merge-trace-001');
    expect(component.compareAfterId()).toBe('abc-123-def-456');
  });

  it('should swap after/before when selecting the after trace', () => {
    component.onCellKeyChange('employees');
    component.compareBeforeId.set('abc-123-def-456');
    component.compareAfterId.set('merge-trace-001');

    component.selectCompareTrace('merge-trace-001');

    expect(component.compareAfterId()).toBe('abc-123-def-456');
    expect(component.compareBeforeId()).toBe('merge-trace-001');
  });

  it('should assign to before slot when empty', () => {
    component.onCellKeyChange('employees');
    component.compareBeforeId.set('');
    component.compareAfterId.set('merge-trace-001');

    component.selectCompareTrace('abc-123-def-456');

    expect(component.compareBeforeId()).toBe('abc-123-def-456');
  });

  it('should assign to after slot when before is filled and trace is new', () => {
    component.onCellKeyChange('employees');
    component.compareBeforeId.set('abc-123-def-456');
    component.compareAfterId.set('');

    component.selectCompareTrace('merge-trace-001');

    expect(component.compareAfterId()).toBe('merge-trace-001');
  });

  it('should reset event index when selecting a compare trace', () => {
    component.onCellKeyChange('employees');
    component.compareBeforeId.set('abc-123-def-456');
    component.compareAfterId.set('merge-trace-001');
    component.compareEventIndex.set(1);

    component.selectCompareTrace('no-lifecycle-001');

    expect(component.compareEventIndex()).toBe(0);
  });

  it('should select a before trace directly', () => {
    component.onCellKeyChange('employees');
    component.compareBeforeId.set('abc-123-def-456');
    component.compareEventIndex.set(1);

    component.selectBeforeTrace('merge-trace-001');

    expect(component.compareBeforeId()).toBe('merge-trace-001');
    expect(component.compareEventIndex()).toBe(0);
  });

  it('should select an after trace directly', () => {
    component.onCellKeyChange('employees');
    component.compareAfterId.set('abc-123-def-456');
    component.compareEventIndex.set(1);

    component.selectAfterTrace('merge-trace-001');

    expect(component.compareAfterId()).toBe('merge-trace-001');
    expect(component.compareEventIndex()).toBe(0);
  });

  it('should compute compareDiffHunks between two events', () => {
    component.onCellKeyChange('employees');
    component.compareBeforeId.set('abc-123-def-456');
    component.compareAfterId.set('merge-trace-001');
    component.compareEventIndex.set(0);

    const hunks = component.compareDiffHunks();
    expect(hunks.length).toBeGreaterThan(0);
  });

  it('should return empty hunks when both events are null', () => {
    component.onCellKeyChange('employees');
    component.compareBeforeId.set('');
    component.compareAfterId.set('');

    const hunks = component.compareDiffHunks();
    expect(hunks).toEqual([]);
  });

  it('should compute compareBeforeLines from diff hunks', () => {
    component.onCellKeyChange('employees');
    component.compareBeforeId.set('abc-123-def-456');
    component.compareAfterId.set('merge-trace-001');
    component.compareEventIndex.set(0);

    const lines = component.compareBeforeLines();
    expect(lines.length).toBeGreaterThan(0);
    for (const line of lines) {
      expect(line.cssClass).not.toBe('diff-line-added');
    }
  });

  it('should compute compareAfterLines from diff hunks', () => {
    component.onCellKeyChange('employees');
    component.compareBeforeId.set('abc-123-def-456');
    component.compareAfterId.set('merge-trace-001');
    component.compareEventIndex.set(0);

    const lines = component.compareAfterLines();
    expect(lines.length).toBeGreaterThan(0);
    for (const line of lines) {
      expect(line.cssClass).not.toBe('diff-line-removed');
    }
  });

  it('should return undefined from stripNoiseFields for null event', () => {
    component.onCellKeyChange('employees');
    component.compareBeforeId.set('abc-123-def-456');
    component.compareAfterId.set('merge-trace-001');
    // Set index beyond events to get null
    component.compareEventIndex.set(99);

    expect(component.currentBeforeEvent()).toBeUndefined();
  });

  it('should strip payload.traceId from events', () => {
    component.onCellKeyChange('employees');
    component.compareBeforeId.set('abc-123-def-456');
    component.compareAfterId.set('merge-trace-001');
    component.compareEventIndex.set(1);

    const event = component.currentBeforeEvent() as Record<string, unknown>;
    expect(event).toBeDefined();
    if (event['payload'] && typeof event['payload'] === 'object') {
      expect(
        (event['payload'] as Record<string, unknown>)['traceId']
      ).toBeUndefined();
    }
  });

  it('should return empty traces when cell key is cleared and no traces exist', () => {
    mockTracesByCellKey.set(new Map());
    mockTracesSignal.set([]);
    component.onCellKeyChange('');
    expect(component.cellTraces()).toEqual([]);
  });

  it('should show delta as 0ms when elapsed times are equal', () => {
    // Create traces with matching relative timestamps
    const trace1: TraceExecutionShape = {
      traceId: 'equal-1',
      cellKey: 'timers',
      startedAt: 100,
      finishedAt: 200,
      events: [{ name: 'test', traceId: 'equal-1', timestamp: 110 } as any],
      metrics: {
        status: 'success',
        duration: 100,
        stageCount: 1,
        eventCount: 1
      } as any
    };
    const trace2: TraceExecutionShape = {
      traceId: 'equal-2',
      cellKey: 'timers',
      startedAt: 500,
      finishedAt: 600,
      events: [{ name: 'test', traceId: 'equal-2', timestamp: 510 } as any],
      metrics: {
        status: 'success',
        duration: 100,
        stageCount: 1,
        eventCount: 1
      } as any
    };

    mockTracesByCellKey.set(
      new Map([
        ['timers', [trace1, trace2]],
        [
          'employees',
          [mockTrace, mockMergeTrace, mockNoLifecycleTrace, mockCoreStateTrace]
        ]
      ])
    );

    component.onCellKeyChange('timers');
    component.compareBeforeId.set('equal-1');
    component.compareAfterId.set('equal-2');
    component.compareEventIndex.set(0);

    const event = component.currentBeforeEvent() as Record<string, unknown>;
    expect(event['delta']).toBe('0ms');
  });

  it('should strip payload.traceId from events with payload objects', () => {
    const traceWithPayload: TraceExecutionShape = {
      traceId: 'payload-1',
      cellKey: 'payloads',
      startedAt: 100,
      finishedAt: 200,
      events: [
        {
          name: 'test:event',
          traceId: 'payload-1',
          timestamp: 110,
          payload: { traceId: 'payload-1', status: 'ok' }
        } as any
      ],
      metrics: {
        status: 'success',
        duration: 100,
        stageCount: 1,
        eventCount: 1
      } as any
    };
    const traceWithPayload2: TraceExecutionShape = {
      traceId: 'payload-2',
      cellKey: 'payloads',
      startedAt: 200,
      finishedAt: 300,
      events: [
        {
          name: 'test:event',
          traceId: 'payload-2',
          timestamp: 210,
          payload: { traceId: 'payload-2', status: 'ok' }
        } as any
      ],
      metrics: {
        status: 'success',
        duration: 100,
        stageCount: 1,
        eventCount: 1
      } as any
    };

    mockTracesByCellKey.set(
      new Map([
        ['payloads', [traceWithPayload, traceWithPayload2]],
        [
          'employees',
          [mockTrace, mockMergeTrace, mockNoLifecycleTrace, mockCoreStateTrace]
        ]
      ])
    );

    component.onCellKeyChange('payloads');
    component.compareBeforeId.set('payload-1');
    component.compareAfterId.set('payload-2');
    component.compareEventIndex.set(0);

    const event = component.currentBeforeEvent() as Record<string, unknown>;
    expect(event['traceId']).toBeUndefined();
    const payload = event['payload'] as Record<string, unknown>;
    expect(payload['traceId']).toBeUndefined();
    expect(payload['status']).toBe('ok');
  });

  it('should use fallback empty array when trace has no events property', () => {
    const brokenTrace = {
      traceId: 'broken-1',
      cellKey: 'broken'
    } as unknown as TraceExecutionShape;

    mockTracesByCellKey.set(
      new Map([
        ['broken', [brokenTrace]],
        [
          'employees',
          [mockTrace, mockMergeTrace, mockNoLifecycleTrace, mockCoreStateTrace]
        ]
      ])
    );

    component.onCellKeyChange('broken');
    component.compareBeforeId.set('broken-1');
    expect(component.compareBeforeEvents()).toEqual([]);
  });

  it('should return 0 duration when trace has no metrics', () => {
    const noMetricsTrace = {
      traceId: 'no-metrics-1',
      cellKey: 'broken'
    } as unknown as TraceExecutionShape;
    const noMetricsTrace2 = {
      traceId: 'no-metrics-2',
      cellKey: 'broken'
    } as unknown as TraceExecutionShape;

    mockTracesByCellKey.set(
      new Map([
        ['broken', [noMetricsTrace, noMetricsTrace2]],
        [
          'employees',
          [mockTrace, mockMergeTrace, mockNoLifecycleTrace, mockCoreStateTrace]
        ]
      ])
    );

    component.onCellKeyChange('broken');
    component.compareBeforeId.set('no-metrics-1');
    component.compareAfterId.set('no-metrics-2');
    expect(component.compareBeforeDuration()).toBe(0);
    expect(component.compareAfterDuration()).toBe(0);
  });

  it('should produce diff hunks when only one side has an event', () => {
    component.onCellKeyChange('employees');
    component.compareBeforeId.set('abc-123-def-456');
    component.compareAfterId.set('no-lifecycle-001');
    // Index 1 exists for before (2 events) but not for after (1 event)
    component.compareEventIndex.set(1);

    const hunks = component.compareDiffHunks();
    expect(hunks.length).toBeGreaterThan(0);
  });

  it('should produce diff hunks when before side has no event at index', () => {
    component.onCellKeyChange('employees');
    component.compareBeforeId.set('no-lifecycle-001');
    component.compareAfterId.set('abc-123-def-456');
    // Index 1 exists for after (2 events) but not for before (1 event)
    component.compareEventIndex.set(1);

    const hunks = component.compareDiffHunks();
    expect(hunks.length).toBeGreaterThan(0);
  });

  it('should count differing events between two traces', () => {
    component.onCellKeyChange('employees');
    component.compareBeforeId.set('abc-123-def-456');
    component.compareAfterId.set('merge-trace-001');

    expect(component.compareDifferingCount()).toBe(2);
  });

  it('should return 0 differing events when no traces selected', () => {
    component.onCellKeyChange('employees');
    component.compareBeforeId.set('');
    component.compareAfterId.set('');

    expect(component.compareDifferingCount()).toBe(0);
  });

  it('should compute compareBeforeDuration from trace metrics', () => {
    component.onCellKeyChange('employees');
    component.compareBeforeId.set('abc-123-def-456');

    expect(component.compareBeforeDuration()).toBe(500);
  });

  it('should compute compareAfterDuration from trace metrics', () => {
    component.onCellKeyChange('employees');
    component.compareAfterId.set('merge-trace-001');

    expect(component.compareAfterDuration()).toBe(200);
  });

  it('should return 0 duration when no trace is selected', () => {
    component.onCellKeyChange('employees');
    expect(component.compareBeforeDuration()).toBe(0);
    expect(component.compareAfterDuration()).toBe(0);
  });

  it('should show slower delta when after is longer', () => {
    component.onCellKeyChange('employees');
    component.compareBeforeId.set('merge-trace-001');
    component.compareAfterId.set('abc-123-def-456');

    expect(component.compareDurationDelta()).toBe('+300ms slower');
  });

  it('should show faster delta when after is shorter', () => {
    component.onCellKeyChange('employees');
    component.compareBeforeId.set('abc-123-def-456');
    component.compareAfterId.set('merge-trace-001');

    expect(component.compareDurationDelta()).toBe('-300ms faster');
  });

  it('should show same speed when durations match', () => {
    component.onCellKeyChange('employees');
    component.compareBeforeId.set('abc-123-def-456');
    component.compareAfterId.set('core-state-001');

    // Both have duration: 500 and 200 respectively — need matching ones
    // mockTrace=500, mockCoreStateTrace=200. Use two with same duration.
    component.compareBeforeId.set('merge-trace-001');
    component.compareAfterId.set('merge-trace-001');

    expect(component.compareDurationDelta()).toBe('same speed');
  });

  it('should return empty delta when no traces selected', () => {
    component.onCellKeyChange('employees');
    component.compareBeforeId.set('');
    component.compareAfterId.set('');

    expect(component.compareDurationDelta()).toBe('');
  });

  it('should default showOnlyDiffs to false', () => {
    expect(component.showOnlyDiffs()).toBeFalse();
  });

  it('should compute differingIndices between two traces', () => {
    component.onCellKeyChange('employees');
    component.compareBeforeId.set('abc-123-def-456');
    component.compareAfterId.set('merge-trace-001');

    const indices = component.differingIndices();
    expect(indices.length).toBe(2);
    expect(indices).toEqual([0, 1]);
  });

  it('should toggle diff filter on and jump to first differing event', () => {
    component.onCellKeyChange('employees');
    component.compareBeforeId.set('abc-123-def-456');
    component.compareAfterId.set('merge-trace-001');
    component.compareEventIndex.set(0);

    component.toggleDiffFilter();

    expect(component.showOnlyDiffs()).toBeTrue();
    expect(component.compareEventIndex()).toBe(0);
  });

  it('should toggle diff filter off', () => {
    component.onCellKeyChange('employees');
    component.compareBeforeId.set('abc-123-def-456');
    component.compareAfterId.set('merge-trace-001');

    component.showOnlyDiffs.set(true);
    component.toggleDiffFilter();

    expect(component.showOnlyDiffs()).toBeFalse();
  });

  it('should jump to nearest differing event when enabling filter on identical event', () => {
    // Create traces where event 0 is identical but event 1 differs
    const traceA: TraceExecutionShape = {
      traceId: 'filter-a',
      cellKey: 'filter',
      startedAt: 100,
      finishedAt: 200,
      events: [
        { name: 'same-event', traceId: 'filter-a', timestamp: 110 } as any,
        { name: 'different-a', traceId: 'filter-a', timestamp: 120 } as any
      ],
      metrics: {
        status: 'success',
        duration: 100,
        stageCount: 1,
        eventCount: 2
      } as any
    };
    const traceB: TraceExecutionShape = {
      traceId: 'filter-b',
      cellKey: 'filter',
      startedAt: 200,
      finishedAt: 300,
      events: [
        { name: 'same-event', traceId: 'filter-b', timestamp: 210 } as any,
        { name: 'different-b', traceId: 'filter-b', timestamp: 220 } as any
      ],
      metrics: {
        status: 'success',
        duration: 100,
        stageCount: 1,
        eventCount: 2
      } as any
    };

    mockTracesByCellKey.set(
      new Map([
        ['filter', [traceA, traceB]],
        [
          'employees',
          [mockTrace, mockMergeTrace, mockNoLifecycleTrace, mockCoreStateTrace]
        ]
      ])
    );

    component.onCellKeyChange('filter');
    component.compareBeforeId.set('filter-a');
    component.compareAfterId.set('filter-b');
    component.compareEventIndex.set(0); // identical event

    component.toggleDiffFilter();

    // Should jump to index 1 (the differing event)
    expect(component.compareEventIndex()).toBe(1);
  });

  it('should not jump when enabling filter with no differing events', () => {
    component.onCellKeyChange('employees');
    component.compareBeforeId.set('abc-123-def-456');
    component.compareAfterId.set('abc-123-def-456');
    component.compareEventIndex.set(0);

    component.toggleDiffFilter();

    expect(component.compareEventIndex()).toBe(0);
  });

  it('should navigate to previous differing event when filter is active', () => {
    component.onCellKeyChange('employees');
    component.compareBeforeId.set('abc-123-def-456');
    component.compareAfterId.set('merge-trace-001');
    component.showOnlyDiffs.set(true);
    component.compareEventIndex.set(1);

    component.previousEvent();

    expect(component.compareEventIndex()).toBe(0);
  });

  it('should navigate to next differing event when filter is active', () => {
    component.onCellKeyChange('employees');
    component.compareBeforeId.set('abc-123-def-456');
    component.compareAfterId.set('merge-trace-001');
    component.showOnlyDiffs.set(true);
    component.compareEventIndex.set(0);

    component.nextEvent();

    expect(component.compareEventIndex()).toBe(1);
  });

  it('should not navigate past last differing event when filter is active', () => {
    component.onCellKeyChange('employees');
    component.compareBeforeId.set('abc-123-def-456');
    component.compareAfterId.set('merge-trace-001');
    component.showOnlyDiffs.set(true);
    component.compareEventIndex.set(1);

    component.nextEvent();

    expect(component.compareEventIndex()).toBe(1);
  });

  it('should not navigate before first differing event when filter is active', () => {
    component.onCellKeyChange('employees');
    component.compareBeforeId.set('abc-123-def-456');
    component.compareAfterId.set('merge-trace-001');
    component.showOnlyDiffs.set(true);
    component.compareEventIndex.set(0);

    component.previousEvent();

    expect(component.compareEventIndex()).toBe(0);
  });

  it('should compute compareHasPrevious with filter active', () => {
    component.onCellKeyChange('employees');
    component.compareBeforeId.set('abc-123-def-456');
    component.compareAfterId.set('merge-trace-001');
    component.showOnlyDiffs.set(true);
    component.compareEventIndex.set(0);

    expect(component.compareHasPrevious()).toBeFalse();

    component.compareEventIndex.set(1);
    expect(component.compareHasPrevious()).toBeTrue();
  });

  it('should compute compareHasNext with filter active', () => {
    component.onCellKeyChange('employees');
    component.compareBeforeId.set('abc-123-def-456');
    component.compareAfterId.set('merge-trace-001');
    component.showOnlyDiffs.set(true);
    component.compareEventIndex.set(1);

    expect(component.compareHasNext()).toBeFalse();

    component.compareEventIndex.set(0);
    expect(component.compareHasNext()).toBeTrue();
  });

  it('should return 0 skippedBeforeCurrentCount when filter is off', () => {
    component.onCellKeyChange('employees');
    component.compareBeforeId.set('abc-123-def-456');
    component.compareAfterId.set('merge-trace-001');
    component.compareEventIndex.set(1);

    expect(component.skippedBeforeCurrentCount()).toBe(0);
  });

  it('should compute skippedBeforeCurrentCount when filter is active', () => {
    // Use traces where event 0 is identical, event 1 differs
    const traceA: TraceExecutionShape = {
      traceId: 'skip-a',
      cellKey: 'skip',
      startedAt: 100,
      finishedAt: 300,
      events: [
        { name: 'same', traceId: 'skip-a', timestamp: 110 } as any,
        { name: 'same', traceId: 'skip-a', timestamp: 120 } as any,
        { name: 'diff-a', traceId: 'skip-a', timestamp: 130 } as any
      ],
      metrics: {
        status: 'success',
        duration: 200,
        stageCount: 1,
        eventCount: 3
      } as any
    };
    const traceB: TraceExecutionShape = {
      traceId: 'skip-b',
      cellKey: 'skip',
      startedAt: 200,
      finishedAt: 400,
      events: [
        { name: 'same', traceId: 'skip-b', timestamp: 210 } as any,
        { name: 'same', traceId: 'skip-b', timestamp: 220 } as any,
        { name: 'diff-b', traceId: 'skip-b', timestamp: 230 } as any
      ],
      metrics: {
        status: 'success',
        duration: 200,
        stageCount: 1,
        eventCount: 3
      } as any
    };

    mockTracesByCellKey.set(
      new Map([
        ['skip', [traceA, traceB]],
        [
          'employees',
          [mockTrace, mockMergeTrace, mockNoLifecycleTrace, mockCoreStateTrace]
        ]
      ])
    );

    component.onCellKeyChange('skip');
    component.compareBeforeId.set('skip-a');
    component.compareAfterId.set('skip-b');
    component.showOnlyDiffs.set(true);
    component.compareEventIndex.set(2); // first diff is at index 2

    // 2 identical events skipped before index 2
    expect(component.skippedBeforeCurrentCount()).toBe(2);
  });

  it('should compute skipped count between two differing events', () => {
    // Events: diff(0), same(1), same(2), diff(3)
    const traceA: TraceExecutionShape = {
      traceId: 'gap-a',
      cellKey: 'gap',
      startedAt: 100,
      finishedAt: 300,
      events: [
        { name: 'diff-a', traceId: 'gap-a', timestamp: 110 } as any,
        { name: 'same', traceId: 'gap-a', timestamp: 120 } as any,
        { name: 'same', traceId: 'gap-a', timestamp: 130 } as any,
        { name: 'diff-a2', traceId: 'gap-a', timestamp: 140 } as any
      ],
      metrics: {
        status: 'success',
        duration: 200,
        stageCount: 1,
        eventCount: 4
      } as any
    };
    const traceB: TraceExecutionShape = {
      traceId: 'gap-b',
      cellKey: 'gap',
      startedAt: 200,
      finishedAt: 400,
      events: [
        { name: 'diff-b', traceId: 'gap-b', timestamp: 210 } as any,
        { name: 'same', traceId: 'gap-b', timestamp: 220 } as any,
        { name: 'same', traceId: 'gap-b', timestamp: 230 } as any,
        { name: 'diff-b2', traceId: 'gap-b', timestamp: 240 } as any
      ],
      metrics: {
        status: 'success',
        duration: 200,
        stageCount: 1,
        eventCount: 4
      } as any
    };

    mockTracesByCellKey.set(
      new Map([
        ['gap', [traceA, traceB]],
        [
          'employees',
          [mockTrace, mockMergeTrace, mockNoLifecycleTrace, mockCoreStateTrace]
        ]
      ])
    );

    component.onCellKeyChange('gap');
    component.compareBeforeId.set('gap-a');
    component.compareAfterId.set('gap-b');
    component.showOnlyDiffs.set(true);
    component.compareEventIndex.set(3); // second diff, 2 identical skipped between 0 and 3

    expect(component.skippedBeforeCurrentCount()).toBe(2);
  });

  it('should reset showOnlyDiffs on cell key change', () => {
    component.showOnlyDiffs.set(true);
    component.onCellKeyChange('employees');
    expect(component.showOnlyDiffs()).toBeFalse();
  });

  it('should jump to last differing event when enabling filter past all diffs', () => {
    const traceA: TraceExecutionShape = {
      traceId: 'end-a',
      cellKey: 'end',
      startedAt: 100,
      finishedAt: 200,
      events: [
        { name: 'diff-a', traceId: 'end-a', timestamp: 110 } as any,
        { name: 'same', traceId: 'end-a', timestamp: 120 } as any
      ],
      metrics: {
        status: 'success',
        duration: 100,
        stageCount: 1,
        eventCount: 2
      } as any
    };
    const traceB: TraceExecutionShape = {
      traceId: 'end-b',
      cellKey: 'end',
      startedAt: 200,
      finishedAt: 300,
      events: [
        { name: 'diff-b', traceId: 'end-b', timestamp: 210 } as any,
        { name: 'same', traceId: 'end-b', timestamp: 220 } as any
      ],
      metrics: {
        status: 'success',
        duration: 100,
        stageCount: 1,
        eventCount: 2
      } as any
    };

    mockTracesByCellKey.set(
      new Map([
        ['end', [traceA, traceB]],
        [
          'employees',
          [mockTrace, mockMergeTrace, mockNoLifecycleTrace, mockCoreStateTrace]
        ]
      ])
    );

    component.onCellKeyChange('end');
    component.compareBeforeId.set('end-a');
    component.compareAfterId.set('end-b');
    component.compareEventIndex.set(1); // identical event, past last diff

    component.toggleDiffFilter();

    // Should jump back to index 0 (the only differing event)
    expect(component.compareEventIndex()).toBe(0);
  });

  it('should extract unique categories from compared traces', () => {
    component.onCellKeyChange('employees');
    component.compareBeforeId.set('abc-123-def-456');
    component.compareAfterId.set('merge-trace-001');

    const categories = component.compareCategories();
    expect(categories).toContain('lifecycle');
    expect(categories).toContain('pipeline');
    expect(categories.length).toBeGreaterThanOrEqual(2);
  });

  it('should default categoryFilters to empty set', () => {
    expect(component.categoryFilters().size).toBe(0);
  });

  it('should toggle a category filter on', () => {
    component.onCellKeyChange('employees');
    component.compareBeforeId.set('abc-123-def-456');
    component.compareAfterId.set('merge-trace-001');

    component.toggleCategoryFilter('lifecycle');

    expect(component.categoryFilters().has('lifecycle')).toBeTrue();
  });

  it('should toggle a category filter off', () => {
    component.onCellKeyChange('employees');
    component.compareBeforeId.set('abc-123-def-456');
    component.compareAfterId.set('merge-trace-001');

    component.toggleCategoryFilter('lifecycle');
    component.toggleCategoryFilter('lifecycle');

    expect(component.categoryFilters().has('lifecycle')).toBeFalse();
  });

  it('should filter visible indices by category', () => {
    component.onCellKeyChange('employees');
    component.compareBeforeId.set('abc-123-def-456');
    component.compareAfterId.set('merge-trace-001');

    // Only show lifecycle events
    component.toggleCategoryFilter('lifecycle');

    const indices = component.visibleIndices();
    expect(indices).toEqual([0]); // Only event 0 is lifecycle
  });

  it('should combine diff-only and category filters in visibleIndices', () => {
    // Create traces with mixed categories
    const traceA: TraceExecutionShape = {
      traceId: 'cat-a',
      cellKey: 'cats',
      startedAt: 100,
      finishedAt: 200,
      events: [
        {
          name: 'lifecycle:start:replace',
          traceId: 'cat-a',
          timestamp: 110
        } as any,
        {
          name: 'pipeline:candidate:resolve',
          traceId: 'cat-a',
          timestamp: 120
        } as any,
        {
          name: 'controller:vote',
          traceId: 'cat-a',
          timestamp: 130
        } as any
      ],
      metrics: {
        status: 'success',
        duration: 100,
        stageCount: 1,
        eventCount: 3
      } as any
    };
    const traceB: TraceExecutionShape = {
      traceId: 'cat-b',
      cellKey: 'cats',
      startedAt: 200,
      finishedAt: 300,
      events: [
        {
          name: 'lifecycle:start:replace',
          traceId: 'cat-b',
          timestamp: 210
        } as any,
        {
          name: 'pipeline:different',
          traceId: 'cat-b',
          timestamp: 220
        } as any,
        {
          name: 'controller:vote',
          traceId: 'cat-b',
          timestamp: 230
        } as any
      ],
      metrics: {
        status: 'success',
        duration: 100,
        stageCount: 1,
        eventCount: 3
      } as any
    };

    mockTracesByCellKey.set(
      new Map([
        ['cats', [traceA, traceB]],
        [
          'employees',
          [mockTrace, mockMergeTrace, mockNoLifecycleTrace, mockCoreStateTrace]
        ]
      ])
    );

    component.onCellKeyChange('cats');
    component.compareBeforeId.set('cat-a');
    component.compareAfterId.set('cat-b');

    // Enable diff-only + pipeline category
    component.showOnlyDiffs.set(true);
    component.categoryFilters.set(new Set(['pipeline']));

    const indices = component.visibleIndices();
    // Only event 1 is pipeline AND differs
    expect(indices).toEqual([1]);
  });

  it('should navigate with category filter active', () => {
    component.onCellKeyChange('employees');
    component.compareBeforeId.set('abc-123-def-456');
    component.compareAfterId.set('merge-trace-001');

    component.toggleCategoryFilter('pipeline');
    component.compareEventIndex.set(0);

    component.nextEvent();

    expect(component.compareEventIndex()).toBe(1);
  });

  it('should jump to nearest visible event when enabling category filter', () => {
    component.onCellKeyChange('employees');
    component.compareBeforeId.set('abc-123-def-456');
    component.compareAfterId.set('merge-trace-001');
    component.compareEventIndex.set(0); // lifecycle event

    component.toggleCategoryFilter('pipeline');

    // Should jump to index 1 (the pipeline event)
    expect(component.compareEventIndex()).toBe(1);
  });

  it('should reset categoryFilters on cell key change', () => {
    component.categoryFilters.set(new Set(['lifecycle']));
    component.onCellKeyChange('employees');
    expect(component.categoryFilters().size).toBe(0);
  });

  it('should return empty visibleIndices when no filters are active', () => {
    component.onCellKeyChange('employees');
    component.compareBeforeId.set('abc-123-def-456');
    component.compareAfterId.set('merge-trace-001');

    expect(component.visibleIndices()).toEqual([]);
  });

  it('should handle events without name property in category filter', () => {
    const traceA: TraceExecutionShape = {
      traceId: 'noname-a',
      cellKey: 'noname',
      startedAt: 100,
      finishedAt: 200,
      events: [
        { traceId: 'noname-a', timestamp: 110 } as any,
        {
          name: 'lifecycle:start',
          traceId: 'noname-a',
          timestamp: 120
        } as any
      ],
      metrics: {
        status: 'success',
        duration: 100,
        stageCount: 1,
        eventCount: 2
      } as any
    };
    const traceB: TraceExecutionShape = {
      traceId: 'noname-b',
      cellKey: 'noname',
      startedAt: 200,
      finishedAt: 300,
      events: [
        { traceId: 'noname-b', timestamp: 210 } as any,
        {
          name: 'lifecycle:start',
          traceId: 'noname-b',
          timestamp: 220
        } as any
      ],
      metrics: {
        status: 'success',
        duration: 100,
        stageCount: 1,
        eventCount: 2
      } as any
    };

    mockTracesByCellKey.set(
      new Map([
        ['noname', [traceA, traceB]],
        [
          'employees',
          [mockTrace, mockMergeTrace, mockNoLifecycleTrace, mockCoreStateTrace]
        ]
      ])
    );

    component.onCellKeyChange('noname');
    component.compareBeforeId.set('noname-a');
    component.compareAfterId.set('noname-b');
    component.toggleCategoryFilter('lifecycle');

    const indices = component.visibleIndices();
    // Only index 1 has lifecycle, index 0 has no name
    expect(indices).toEqual([1]);
  });

  it('should compute skippedBeforeCurrentCount with category filter', () => {
    // Create traces: lifecycle(0), pipeline(1), lifecycle(2)
    const traceA: TraceExecutionShape = {
      traceId: 'skip-cat-a',
      cellKey: 'skip-cat',
      startedAt: 100,
      finishedAt: 200,
      events: [
        {
          name: 'lifecycle:start',
          traceId: 'skip-cat-a',
          timestamp: 110
        } as any,
        {
          name: 'pipeline:resolve',
          traceId: 'skip-cat-a',
          timestamp: 120
        } as any,
        {
          name: 'lifecycle:end',
          traceId: 'skip-cat-a',
          timestamp: 130
        } as any
      ],
      metrics: {
        status: 'success',
        duration: 100,
        stageCount: 1,
        eventCount: 3
      } as any
    };
    const traceB: TraceExecutionShape = {
      traceId: 'skip-cat-b',
      cellKey: 'skip-cat',
      startedAt: 200,
      finishedAt: 300,
      events: [
        {
          name: 'lifecycle:start',
          traceId: 'skip-cat-b',
          timestamp: 210
        } as any,
        {
          name: 'pipeline:different',
          traceId: 'skip-cat-b',
          timestamp: 220
        } as any,
        {
          name: 'lifecycle:end',
          traceId: 'skip-cat-b',
          timestamp: 230
        } as any
      ],
      metrics: {
        status: 'success',
        duration: 100,
        stageCount: 1,
        eventCount: 3
      } as any
    };

    mockTracesByCellKey.set(
      new Map([
        ['skip-cat', [traceA, traceB]],
        [
          'employees',
          [mockTrace, mockMergeTrace, mockNoLifecycleTrace, mockCoreStateTrace]
        ]
      ])
    );

    component.onCellKeyChange('skip-cat');
    component.compareBeforeId.set('skip-cat-a');
    component.compareAfterId.set('skip-cat-b');
    component.categoryFilters.set(new Set(['lifecycle']));
    component.compareEventIndex.set(2); // second lifecycle event

    // 1 event skipped (pipeline at index 1) between lifecycle at 0 and 2
    expect(component.skippedBeforeCurrentCount()).toBe(1);
  });

  it('should default showOnlyState to false', () => {
    expect(component.showOnlyState()).toBeFalse();
  });

  it('should toggle showOnlyState on', () => {
    component.onCellKeyChange('employees');
    component.compareBeforeId.set('abc-123-def-456');
    component.compareAfterId.set('merge-trace-001');

    component.toggleStateFilter();

    expect(component.showOnlyState()).toBeTrue();
  });

  it('should toggle showOnlyState off', () => {
    component.onCellKeyChange('employees');
    component.compareBeforeId.set('abc-123-def-456');
    component.compareAfterId.set('merge-trace-001');

    component.toggleStateFilter();
    component.toggleStateFilter();

    expect(component.showOnlyState()).toBeFalse();
  });

  it('should reset showOnlyState on cell key change', () => {
    component.showOnlyState.set(true);
    component.onCellKeyChange('employees');
    expect(component.showOnlyState()).toBeFalse();
  });

  it('should filter visibleIndices to events with state attribute', () => {
    const traceA: TraceExecutionShape = {
      traceId: 'state-a',
      cellKey: 'state-test',
      startedAt: 100,
      finishedAt: 200,
      events: [
        {
          name: 'lifecycle:start',
          traceId: 'state-a',
          timestamp: 110
        } as any,
        {
          name: 'stage:resolve',
          traceId: 'state-a',
          timestamp: 120,
          state: { count: 1 }
        } as any,
        {
          name: 'pipeline:resolve',
          traceId: 'state-a',
          timestamp: 130
        } as any
      ],
      metrics: {
        status: 'success',
        duration: 100,
        stageCount: 1,
        eventCount: 3
      } as any
    };
    const traceB: TraceExecutionShape = {
      traceId: 'state-b',
      cellKey: 'state-test',
      startedAt: 200,
      finishedAt: 300,
      events: [
        {
          name: 'lifecycle:start',
          traceId: 'state-b',
          timestamp: 210
        } as any,
        {
          name: 'stage:resolve',
          traceId: 'state-b',
          timestamp: 220,
          state: { count: 2 }
        } as any,
        {
          name: 'pipeline:resolve',
          traceId: 'state-b',
          timestamp: 230
        } as any
      ],
      metrics: {
        status: 'success',
        duration: 100,
        stageCount: 1,
        eventCount: 3
      } as any
    };

    mockTracesByCellKey.set(
      new Map([
        ['state-test', [traceA, traceB]],
        [
          'employees',
          [mockTrace, mockMergeTrace, mockNoLifecycleTrace, mockCoreStateTrace]
        ]
      ])
    );

    component.onCellKeyChange('state-test');
    component.compareBeforeId.set('state-a');
    component.compareAfterId.set('state-b');
    component.toggleStateFilter();

    // Only event at index 1 has state attribute
    expect(component.visibleIndices()).toEqual([1]);
  });

  it('should combine state filter with diff-only filter', () => {
    const traceA: TraceExecutionShape = {
      traceId: 'sd-a',
      cellKey: 'sd-test',
      startedAt: 100,
      finishedAt: 200,
      events: [
        {
          name: 'lifecycle:start',
          traceId: 'sd-a',
          timestamp: 110,
          state: { v: 1 }
        } as any,
        {
          name: 'stage:resolve',
          traceId: 'sd-a',
          timestamp: 120,
          state: { v: 2 }
        } as any
      ],
      metrics: {
        status: 'success',
        duration: 100,
        stageCount: 1,
        eventCount: 2
      } as any
    };
    const traceB: TraceExecutionShape = {
      traceId: 'sd-b',
      cellKey: 'sd-test',
      startedAt: 200,
      finishedAt: 300,
      events: [
        {
          name: 'lifecycle:start',
          traceId: 'sd-b',
          timestamp: 210,
          state: { v: 1 }
        } as any,
        {
          name: 'stage:resolve',
          traceId: 'sd-b',
          timestamp: 220,
          state: { v: 99 }
        } as any
      ],
      metrics: {
        status: 'success',
        duration: 100,
        stageCount: 1,
        eventCount: 2
      } as any
    };

    mockTracesByCellKey.set(
      new Map([
        ['sd-test', [traceA, traceB]],
        [
          'employees',
          [mockTrace, mockMergeTrace, mockNoLifecycleTrace, mockCoreStateTrace]
        ]
      ])
    );

    component.onCellKeyChange('sd-test');
    component.compareBeforeId.set('sd-a');
    component.compareAfterId.set('sd-b');
    component.showOnlyDiffs.set(true);
    component.showOnlyState.set(true);

    // Event 0: has state but same → filtered by diff. Event 1: has state and differs → visible
    expect(component.visibleIndices()).toEqual([1]);
  });

  it('should jump to nearest visible event when enabling state filter', () => {
    const traceA: TraceExecutionShape = {
      traceId: 'jump-s-a',
      cellKey: 'jump-s',
      startedAt: 100,
      finishedAt: 200,
      events: [
        {
          name: 'lifecycle:start',
          traceId: 'jump-s-a',
          timestamp: 110
        } as any,
        {
          name: 'stage:resolve',
          traceId: 'jump-s-a',
          timestamp: 120,
          state: { v: 1 }
        } as any
      ],
      metrics: {
        status: 'success',
        duration: 100,
        stageCount: 1,
        eventCount: 2
      } as any
    };
    const traceB: TraceExecutionShape = {
      traceId: 'jump-s-b',
      cellKey: 'jump-s',
      startedAt: 200,
      finishedAt: 300,
      events: [
        {
          name: 'lifecycle:start',
          traceId: 'jump-s-b',
          timestamp: 210
        } as any,
        {
          name: 'stage:resolve',
          traceId: 'jump-s-b',
          timestamp: 220,
          state: { v: 2 }
        } as any
      ],
      metrics: {
        status: 'success',
        duration: 100,
        stageCount: 1,
        eventCount: 2
      } as any
    };

    mockTracesByCellKey.set(
      new Map([
        ['jump-s', [traceA, traceB]],
        [
          'employees',
          [mockTrace, mockMergeTrace, mockNoLifecycleTrace, mockCoreStateTrace]
        ]
      ])
    );

    component.onCellKeyChange('jump-s');
    component.compareBeforeId.set('jump-s-a');
    component.compareAfterId.set('jump-s-b');
    component.compareEventIndex.set(0); // no state attribute

    component.toggleStateFilter();

    // Should jump to index 1 (has state)
    expect(component.compareEventIndex()).toBe(1);
  });

  it('should return empty visibleIndices when state filter is on but no events have state', () => {
    component.onCellKeyChange('employees');
    component.compareBeforeId.set('abc-123-def-456');
    component.compareAfterId.set('merge-trace-001');
    component.toggleStateFilter();

    expect(component.visibleIndices()).toEqual([]);
  });

  describe('timeline', () => {
    beforeEach(() => {
      component.onCellKeyChange('employees');
      component.compareBeforeId.set('abc-123-def-456');
      component.compareAfterId.set('merge-trace-001');
    });

    it('should compute timelineMaxDuration as the greater of both durations', () => {
      expect(component.compare.timelineMaxDuration()).toBe(500);
    });

    it('should build before timeline markers with correct positions', () => {
      const markers = component.compare.timelineBeforeMarkers();
      expect(markers.length).toBe(2);
      expect(markers[0].label).toBe('lifecycle');
      expect(markers[0].eventName).toBe('lifecycle:start:replace');
      expect(markers[0].elapsed).toBe(10);
      expect(markers[0].position).toBe(2);
      expect(markers[1].label).toBe('pipeline');
      expect(markers[1].eventName).toBe('pipeline:candidate:resolve');
      expect(markers[1].elapsed).toBe(45);
      expect(markers[1].position).toBe(9);
    });

    it('should build after timeline markers with correct positions', () => {
      const markers = component.compare.timelineAfterMarkers();
      expect(markers.length).toBe(2);
      expect(markers[0].label).toBe('lifecycle');
      expect(markers[0].eventName).toBe('lifecycle:start:merge');
      expect(markers[0].elapsed).toBe(5);
      expect(markers[0].position).toBe(1);
      expect(markers[1].label).toBe('pipeline');
      expect(markers[1].eventName).toBe('pipeline:candidate:resolve');
      expect(markers[1].elapsed).toBe(30);
      expect(markers[1].position).toBe(6);
    });

    it('should deduplicate categories keeping only the first occurrence', () => {
      const markers = component.compare.timelineBeforeMarkers();
      const labels = markers.map((m: { label: string }) => m.label);
      expect(new Set(labels).size).toBe(labels.length);
    });

    it('should return empty markers when no trace is selected', () => {
      component.compareBeforeId.set('');
      expect(component.compare.timelineBeforeMarkers()).toEqual([]);
    });
  });
});
