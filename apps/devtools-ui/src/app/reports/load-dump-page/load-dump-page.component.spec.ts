import { provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DevtoolsAggregateService } from '../../services/devtools-aggregate.service';
import { LoadDumpPageComponent } from './load-dump-page.component';

describe('Component: LoadDumpPage', () => {
  let fixture: ComponentFixture<LoadDumpPageComponent>;
  let component: LoadDumpPageComponent;
  let mockAggregate: {
    loadDumpEvents: jasmine.Spy;
    traces: ReturnType<typeof signal<never[]>>;
  };

  beforeEach(async () => {
    mockAggregate = {
      loadDumpEvents: jasmine.createSpy('loadDumpEvents'),
      traces: signal([])
    };

    await TestBed.configureTestingModule({
      imports: [LoadDumpPageComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        {
          provide: DevtoolsAggregateService,
          useValue: mockAggregate
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoadDumpPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
        expect(component.errorMessage()).toContain('missing or empty');
        resolve();
      }, 50);
    });
  });

  it('should load valid dump and call aggregate service', () => {
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
    expect(mockAggregate.loadDumpEvents).not.toHaveBeenCalled();
  });
});
