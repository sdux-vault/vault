import { provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DevtoolsAggregateService } from '../../services/devtools-aggregate.service';
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
        traceId: 'abc-123-def-456'
      } as any,
      {
        name: 'pipeline:candidate:resolve',
        traceId: 'abc-123-def-456',
        candidate: [{ id: 1, name: 'Luke' }]
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
        traceId: 'merge-trace-001'
      } as any,
      {
        name: 'pipeline:candidate:resolve',
        traceId: 'merge-trace-001',
        candidate: { name: 'updated' }
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
            tracesByCellKey: mockTracesByCellKey
          }
        },
        {
          provide: DevtoolsRegistryService,
          useValue: { isLicensed: signal(true) }
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

  it('should return empty traces when no cell key is selected', () => {
    expect(component.cellTraces()).toEqual([]);
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
});
