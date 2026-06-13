import { provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ConfirmDialogService } from '../../../services/confirm-dialog/confirm-dialog.service';
import { DevtoolsAggregateService } from '../../../services/devtools-aggregate.service';
import { DevtoolsLoggingService } from '../../../services/devtools-logging.service';
import { DumpFilePickerComponent } from './dump-file-picker.component';

describe('Component: DumpFilePicker', () => {
  let fixture: ComponentFixture<DumpFilePickerComponent>;
  let component: DumpFilePickerComponent;
  let mockAggregate: {
    loadDumpEvents: jasmine.Spy;
    clearTraces: jasmine.Spy;
    traces: ReturnType<typeof signal<never[]>>;
  };
  let mockLogging: { clearEvents: jasmine.Spy };
  let mockConfirmDialog: { confirm: jasmine.Spy };

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
      imports: [DumpFilePickerComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: DevtoolsAggregateService, useValue: mockAggregate },
        { provide: DevtoolsLoggingService, useValue: mockLogging },
        { provide: ConfirmDialogService, useValue: mockConfirmDialog }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DumpFilePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the file input', () => {
    const input = fixture.nativeElement.querySelector('input[type="file"]');
    expect(input).toBeTruthy();
    expect(input.getAttribute('accept')).toBe('.json');
  });

  it('should render the Choose Dump File button when showButton is true', () => {
    fixture.componentRef.setInput('showButton', true);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('.sdux-button');
    expect(button).toBeTruthy();
    expect(button.textContent).toContain('Import Dump File');
  });

  it('should not render the button by default', () => {
    const button = fixture.nativeElement.querySelector('.sdux-button');
    expect(button).toBeNull();
  });

  it('should render the dropzone', () => {
    const dropzone = fixture.nativeElement.querySelector('.dropzone');
    expect(dropzone).toBeTruthy();
    expect(dropzone.textContent).toContain('Drop .json dump file here');
    expect(dropzone.textContent).toContain('or click to browse');
  });

  it('should set dropzone-active class on dragover', () => {
    const dropzone = fixture.nativeElement.querySelector('.dropzone');
    const dragEvent = new Event('dragover', { bubbles: true });
    Object.defineProperty(dragEvent, 'preventDefault', {
      value: jasmine.createSpy('preventDefault')
    });
    Object.defineProperty(dragEvent, 'stopPropagation', {
      value: jasmine.createSpy('stopPropagation')
    });

    dropzone.dispatchEvent(dragEvent);
    fixture.detectChanges();

    expect(dropzone.classList).toContain('dropzone-active');
  });

  it('should remove dropzone-active class on dragleave', () => {
    component.isDragOver.set(true);
    fixture.detectChanges();

    const dropzone = fixture.nativeElement.querySelector('.dropzone');
    dropzone.dispatchEvent(new Event('dragleave', { bubbles: true }));
    fixture.detectChanges();

    expect(dropzone.classList).not.toContain('dropzone-active');
  });

  it('should show error when dropping a non-JSON file', () => {
    const dropzone = fixture.nativeElement.querySelector('.dropzone');
    const file = new File(['hello'], 'test.txt', { type: 'text/plain' });
    const dropEvent = new Event('drop', { bubbles: true }) as DragEvent;
    Object.defineProperty(dropEvent, 'preventDefault', {
      value: jasmine.createSpy('preventDefault')
    });
    Object.defineProperty(dropEvent, 'stopPropagation', {
      value: jasmine.createSpy('stopPropagation')
    });
    Object.defineProperty(dropEvent, 'dataTransfer', {
      value: { files: [file] }
    });

    dropzone.dispatchEvent(dropEvent);
    fixture.detectChanges();

    expect(component.errorMessage()).toContain('Only .json files are accepted');
  });

  it('should process dropped JSON file', () => {
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
        }
      ]
    });
    const file = new File([dump], 'drop-test.json', {
      type: 'application/json'
    });
    const dropEvent = new Event('drop', { bubbles: true }) as DragEvent;
    Object.defineProperty(dropEvent, 'preventDefault', {
      value: jasmine.createSpy('preventDefault')
    });
    Object.defineProperty(dropEvent, 'stopPropagation', {
      value: jasmine.createSpy('stopPropagation')
    });
    Object.defineProperty(dropEvent, 'dataTransfer', {
      value: { files: [file] }
    });

    const dropzone = fixture.nativeElement.querySelector('.dropzone');
    dropzone.dispatchEvent(dropEvent);

    expect(mockConfirmDialog.confirm).toHaveBeenCalled();

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        fixture.detectChanges();
        resolve();
      }, 50);
    });
  });

  it('should do nothing when drop has no files', () => {
    const dropEvent = new Event('drop', { bubbles: true }) as DragEvent;
    Object.defineProperty(dropEvent, 'preventDefault', {
      value: jasmine.createSpy('preventDefault')
    });
    Object.defineProperty(dropEvent, 'stopPropagation', {
      value: jasmine.createSpy('stopPropagation')
    });
    Object.defineProperty(dropEvent, 'dataTransfer', { value: { files: [] } });

    const dropzone = fixture.nativeElement.querySelector('.dropzone');
    dropzone.dispatchEvent(dropEvent);

    expect(mockConfirmDialog.confirm).not.toHaveBeenCalled();
  });

  it('should display file size after loading a file', () => {
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
        }
      ]
    });
    const file = new File([dump], 'size-test.json', {
      type: 'application/json'
    });
    const event = { target: { files: [file] } } as unknown as Event;

    component.onFileSelected(event);

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        fixture.detectChanges();
        const sizeEl = fixture.nativeElement.querySelector('.file-size');
        expect(sizeEl).toBeTruthy();
        expect(sizeEl.textContent).toMatch(/\d+(\.\d+)?\s*(B|KB|MB)/);
        resolve();
      }, 50);
    });
  });

  it('should not show error message initially', () => {
    expect(fixture.nativeElement.querySelector('.error-message')).toBeNull();
  });

  it('should not display file size when in button mode', () => {
    fixture.componentRef.setInput('showButton', true);
    fixture.componentRef.setInput('showDropzone', false);
    component.fileSize.set('1.5 KB');
    fixture.detectChanges();
    const sizeEl = fixture.nativeElement.querySelector('.file-size');
    expect(sizeEl).toBeNull();
  });

  it('should do nothing when no file is selected', () => {
    const event = { target: { files: [] } } as unknown as Event;
    component.onFileSelected(event);
    expect(mockConfirmDialog.confirm).not.toHaveBeenCalled();
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

  it('should not load when the user cancels the dialog', () => {
    mockConfirmDialog.confirm.and.returnValue(of(false));

    const file = new File(['{}'], 'test.json', {
      type: 'application/json'
    });
    const input = { files: [file], value: 'C:\\fakepath\\test.json' };
    const event = { target: input } as unknown as Event;

    component.onFileSelected(event);

    expect(mockAggregate.clearTraces).not.toHaveBeenCalled();
    expect(mockLogging.clearEvents).not.toHaveBeenCalled();
    expect(mockAggregate.loadDumpEvents).not.toHaveBeenCalled();
    expect(input.value).toBe('');
  });

  it('should show error for invalid JSON', () => {
    const file = new File(['not valid json'], 'bad.json', {
      type: 'application/json'
    });
    const event = { target: { files: [file] } } as unknown as Event;

    component.onFileSelected(event);

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        fixture.detectChanges();
        expect(component.errorMessage()).toContain('Failed to parse file');
        resolve();
      }, 50);
    });
  });

  it('should show error for unsupported format', () => {
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

  it('should show error when events array is empty', () => {
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

  it('should show error for unsupported flat array format', () => {
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

  it('should show error for empty trace export array', () => {
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

  it('should show error for trace export with empty events', () => {
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

  it('should load debug dump format and emit fileLoaded', () => {
    const loadedSpy = jasmine.createSpy('fileLoaded');
    component.fileLoaded.subscribe(loadedSpy);

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
        expect(loadedSpy).toHaveBeenCalledOnceWith({
          fileName: 'test-dump.json',
          eventCount: 2
        });
        expect(component.errorMessage()).toBe('');
        resolve();
      }, 50);
    });
  });

  it('should load trace export format and emit fileLoaded', () => {
    const loadedSpy = jasmine.createSpy('fileLoaded');
    component.fileLoaded.subscribe(loadedSpy);

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
        expect(loadedSpy).toHaveBeenCalledOnceWith({
          fileName: 'sdux-traces-123.json',
          eventCount: 2
        });
        resolve();
      }, 50);
    });
  });

  it('should format file size as KB for files >= 1024 bytes', () => {
    const padding = 'x'.repeat(2048);
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
          traceId: 'trace-1',
          padding
        }
      ]
    });
    const file = new File([dump], 'kb-test.json', {
      type: 'application/json'
    });
    const event = { target: { files: [file] } } as unknown as Event;

    component.onFileSelected(event);

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        fixture.detectChanges();
        expect(component.fileSize()).toMatch(/\d+\.\d+\s*KB/);
        resolve();
      }, 50);
    });
  });

  it('should format file size as MB for files >= 1048576 bytes', () => {
    const padding = 'x'.repeat(1_100_000);
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
          traceId: 'trace-1',
          padding
        }
      ]
    });
    const file = new File([dump], 'mb-test.json', {
      type: 'application/json'
    });
    const event = { target: { files: [file] } } as unknown as Event;

    component.onFileSelected(event);

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        fixture.detectChanges();
        expect(component.fileSize()).toMatch(/\d+\.\d+\s*MB/);
        resolve();
      }, 50);
    });
  });
});
