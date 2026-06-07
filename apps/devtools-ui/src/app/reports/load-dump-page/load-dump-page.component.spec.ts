import { provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { of } from 'rxjs';
import { ConfirmDialogService } from '../../services/confirm-dialog/confirm-dialog.service';
import { DevtoolsAggregateService } from '../../services/devtools-aggregate.service';
import { DevtoolsLoggingService } from '../../services/devtools-logging.service';
import { DevtoolsRegistryService } from '../../services/registry/devtools-registry.service';
import { LoadDumpPageComponent } from './load-dump-page.component';

describe('Component: LoadDumpPage', () => {
  let fixture: ComponentFixture<LoadDumpPageComponent>;
  let component: LoadDumpPageComponent;
  let mockAggregate: {
    loadDumpEvents: jasmine.Spy;
    clearTraces: jasmine.Spy;
    traces: ReturnType<typeof signal<never[]>>;
  };
  let mockLogging: {
    clearEvents: jasmine.Spy;
  };
  let mockConfirmDialog: {
    confirm: jasmine.Spy;
  };

  beforeEach(async () => {
    mockAggregate = {
      loadDumpEvents: jasmine.createSpy('loadDumpEvents'),
      clearTraces: jasmine.createSpy('clearTraces'),
      traces: signal([])
    };

    mockLogging = {
      clearEvents: jasmine.createSpy('clearEvents')
    };

    mockConfirmDialog = {
      confirm: jasmine.createSpy('confirm').and.returnValue(of(true))
    };

    await TestBed.configureTestingModule({
      imports: [LoadDumpPageComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        {
          provide: DevtoolsAggregateService,
          useValue: mockAggregate
        },
        {
          provide: DevtoolsLoggingService,
          useValue: mockLogging
        },
        {
          provide: ConfirmDialogService,
          useValue: mockConfirmDialog
        },
        {
          provide: DevtoolsRegistryService,
          useValue: { isLicensed: signal(true) }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoadDumpPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the page title', () => {
    const h2 = fixture.nativeElement.querySelector('h2');
    expect(h2.textContent).toContain('Load Debug Dump');
  });

  it('should render the file input', () => {
    const input = fixture.nativeElement.querySelector('input[type="file"]');
    expect(input).toBeTruthy();
    expect(input.getAttribute('accept')).toBe('.json');
  });

  it('should show error for invalid JSON', () => {
    const file = new File(['not valid json'], 'bad.json', {
      type: 'application/json'
    });
    const event = { target: { files: [file] } } as unknown as Event;

    component.onFileSelected(event);

    expect(mockConfirmDialog.confirm).toHaveBeenCalledTimes(1);

    // Wait for FileReader
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        fixture.detectChanges();
        expect(component.errorMessage()).toContain('Failed to parse file');
        resolve();
      }, 50);
    });
  });

  it('should show error for missing events array', () => {
    const dump = JSON.stringify({ timestamp: 123 });
    const file = new File([dump], 'empty.json', {
      type: 'application/json'
    });
    const event = { target: { files: [file] } } as unknown as Event;

    component.onFileSelected(event);

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        fixture.detectChanges();
        expect(component.errorMessage()).toContain('Unsupported file format');
        resolve();
      }, 50);
    });
  });

  it('should open the confirm dialog when a file is selected', () => {
    const file = new File(['{}'], 'test.json', {
      type: 'application/json'
    });
    const event = { target: { files: [file] } } as unknown as Event;

    component.onFileSelected(event);

    expect(mockConfirmDialog.confirm).toHaveBeenCalledOnceWith(
      jasmine.objectContaining({
        title: 'Replace Current Data',
        confirmLabel: 'Load File',
        cancelLabel: 'Cancel'
      })
    );
  });

  it('should call clearTraces and clearEvents before loading dump events', () => {
    const dump = JSON.stringify({
      events: [
        {
          id: 'e1',
          cell: 'test-cell',
          behaviorKey: 'vault-conductor',
          name: 'conductor:start:attempt',
          timestamp: 1000,
          type: 'conductor',
          boundary: 'start',
          traceId: 'trace-1'
        },
        {
          id: 'e2',
          cell: 'test-cell',
          behaviorKey: 'vault-conductor',
          name: 'conductor:end:attempt',
          timestamp: 1010,
          type: 'conductor',
          boundary: 'end',
          payload: { status: 'success' },
          traceId: 'trace-1'
        }
      ]
    });
    const file = new File([dump], 'test-dump.json', {
      type: 'application/json'
    });
    const event = { target: { files: [file] } } as unknown as Event;

    component.onFileSelected(event);

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        fixture.detectChanges();
        expect(mockAggregate.clearTraces).toHaveBeenCalledTimes(1);
        expect(mockLogging.clearEvents).toHaveBeenCalledTimes(1);
        expect(mockAggregate.loadDumpEvents).toHaveBeenCalledTimes(1);
        expect(mockAggregate.loadDumpEvents).toHaveBeenCalledWith(
          jasmine.arrayContaining([
            jasmine.objectContaining({ id: 'e1' }),
            jasmine.objectContaining({ id: 'e2' })
          ])
        );
        expect(component.loadedFileName()).toBe('test-dump.json');
        expect(component.loadedEventCount()).toBe(2);
        expect(component.errorMessage()).toBe('');
        resolve();
      }, 50);
    });
  });

  it('should show success section after load', () => {
    component.loadedFileName.set('dump.json');
    component.loadedEventCount.set(42);
    fixture.detectChanges();

    const success = fixture.nativeElement.querySelector('.success-message');
    expect(success.textContent).toContain('42');
    expect(success.textContent).toContain('dump.json');
  });

  it('should render navigate button after load', () => {
    component.loadedFileName.set('dump.json');
    component.loadedEventCount.set(10);
    fixture.detectChanges();

    const btn = fixture.nativeElement.querySelector('.navigate-button');
    expect(btn).toBeTruthy();
    expect(btn.textContent).toContain('Trace Detail');
  });

  it('should not show error or success initially', () => {
    expect(fixture.nativeElement.querySelector('.error-message')).toBeNull();
    expect(fixture.nativeElement.querySelector('.success-section')).toBeNull();
  });

  it('should do nothing when no file is selected', () => {
    const event = { target: { files: [] } } as unknown as Event;
    component.onFileSelected(event);
    expect(mockConfirmDialog.confirm).not.toHaveBeenCalled();
    expect(mockAggregate.loadDumpEvents).not.toHaveBeenCalled();
  });

  it('should not load or clear when the user cancels the dialog', () => {
    mockConfirmDialog.confirm.and.returnValue(of(false));

    const dump = JSON.stringify({ events: [{ id: 'e1' }] });
    const file = new File([dump], 'test.json', {
      type: 'application/json'
    });
    const input = { files: [file], value: 'C:\\fakepath\\test.json' };
    const event = { target: input } as unknown as Event;

    component.onFileSelected(event);

    expect(mockConfirmDialog.confirm).toHaveBeenCalledTimes(1);
    expect(mockAggregate.clearTraces).not.toHaveBeenCalled();
    expect(mockLogging.clearEvents).not.toHaveBeenCalled();
    expect(mockAggregate.loadDumpEvents).not.toHaveBeenCalled();
    expect(input.value).toBe('');
  });

  it('should load a trace export format (sdux-traces-*.json)', () => {
    const traces = [
      {
        traceId: 'trace-1',
        cellKey: 'test-cell',
        startedAt: 1000,
        finishedAt: 1010,
        events: [
          {
            id: 'e1',
            cell: 'test-cell',
            behaviorKey: 'vault-conductor',
            name: 'conductor:start:attempt',
            timestamp: 1000,
            type: 'conductor',
            boundary: 'start',
            traceId: 'trace-1'
          },
          {
            id: 'e2',
            cell: 'test-cell',
            behaviorKey: 'vault-conductor',
            name: 'conductor:end:attempt',
            timestamp: 1010,
            type: 'conductor',
            boundary: 'end',
            payload: { status: 'success' },
            traceId: 'trace-1'
          }
        ],
        metrics: { status: 'success', duration: 10 }
      }
    ];
    const file = new File([JSON.stringify(traces)], 'sdux-traces-123.json', {
      type: 'application/json'
    });
    const event = { target: { files: [file] } } as unknown as Event;

    component.onFileSelected(event);

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        fixture.detectChanges();
        expect(mockAggregate.clearTraces).toHaveBeenCalledTimes(1);
        expect(mockLogging.clearEvents).toHaveBeenCalledTimes(1);
        expect(mockAggregate.loadDumpEvents).toHaveBeenCalledWith(
          jasmine.arrayContaining([
            jasmine.objectContaining({ id: 'e1' }),
            jasmine.objectContaining({ id: 'e2' })
          ])
        );
        expect(component.loadedFileName()).toBe('sdux-traces-123.json');
        expect(component.loadedEventCount()).toBe(2);
        resolve();
      }, 50);
    });
  });

  it('should show error for an unsupported flat array format', () => {
    const file = new File(['[{"id":"e1"}]'], 'flat-array.json', {
      type: 'application/json'
    });
    const event = { target: { files: [file] } } as unknown as Event;

    component.onFileSelected(event);

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        fixture.detectChanges();
        expect(component.errorMessage()).toContain('Unsupported file format');
        resolve();
      }, 50);
    });
  });

  it('should show error for an empty trace export array', () => {
    const file = new File(['[]'], 'empty-array.json', {
      type: 'application/json'
    });
    const event = { target: { files: [file] } } as unknown as Event;

    component.onFileSelected(event);

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        fixture.detectChanges();
        expect(component.errorMessage()).toContain('Unsupported file format');
        resolve();
      }, 50);
    });
  });

  it('should navigate to trace detail view', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    component.navigateToTraceDetail();
    expect(router.navigate).toHaveBeenCalledWith(['/reports/trace-detail']);
  });

  it('should show error when debug dump events array is empty', () => {
    const dump = JSON.stringify({ events: [] });
    const file = new File([dump], 'empty-events.json', {
      type: 'application/json'
    });
    const event = { target: { files: [file] } } as unknown as Event;

    component.onFileSelected(event);

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        fixture.detectChanges();
        expect(component.errorMessage()).toContain('File contains no events');
        resolve();
      }, 50);
    });
  });

  it('should show warning notice when no file has been loaded', () => {
    const warning = fixture.nativeElement.querySelector('.warning-notice');
    expect(warning).toBeTruthy();
    expect(warning.textContent).toContain('replace');
  });

  it('should show upsell notice when not licensed', async () => {
    const registry = TestBed.inject(DevtoolsRegistryService);
    (registry.isLicensed as ReturnType<typeof signal<boolean>>).set(false);
    fixture.detectChanges();

    const upsell = fixture.nativeElement.querySelector('sdux-upsell-notice');
    expect(upsell).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.load-dump-page')).toBeNull();
  });

  it('should navigate when clicking the navigate button', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    component.loadedFileName.set('dump.json');
    component.loadedEventCount.set(5);
    fixture.detectChanges();

    const btn = fixture.nativeElement.querySelector('.navigate-button');
    btn.click();
    expect(router.navigate).toHaveBeenCalledWith(['/reports/trace-detail']);
  });

  it('should show error when trace export has entries with empty events', () => {
    const traces = [
      {
        traceId: 'trace-1',
        cellKey: 'test-cell',
        startedAt: 1000,
        finishedAt: 1010,
        events: [],
        metrics: { status: 'success', duration: 10 }
      }
    ];
    const file = new File([JSON.stringify(traces)], 'empty-trace-events.json', {
      type: 'application/json'
    });
    const event = { target: { files: [file] } } as unknown as Event;

    component.onFileSelected(event);

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        fixture.detectChanges();
        expect(component.errorMessage()).toContain('File contains no events');
        resolve();
      }, 50);
    });
  });
});
