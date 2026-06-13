import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventDetailComponent } from './event-detail.component';

describe('Component: EventDetail', () => {
  let fixture: ComponentFixture<EventDetailComponent>;

  const mockEvent: any = {
    id: 'evt-1',
    cell: 'test-cell',
    type: 'stage',
    name: 'Resolve',
    boundary: 'start',
    behaviorKey: 'SDUX::Behavior::Core::Resolver',
    timestamp: 123456789,
    traceId: 'trace-abc',
    source: 'test-source',
    state: {
      value: { foo: 'bar' },
      isLoading: false,
      hasValue: true,
      error: null
    },
    payload: { action: 'test' },
    candidate: { approved: true, votes: 3 },
    error: null
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EventDetailComponent],
      providers: [provideZonelessChangeDetection()]
    });

    fixture = TestBed.createComponent(EventDetailComponent);
    fixture.componentRef.setInput('event', mockEvent);
    fixture.detectChanges();
  });

  it('should render state metadata', () => {
    const text = fixture.nativeElement.textContent;

    expect(text).toContain('key: SDUX::Behavior::Core::Resolver');
    expect(text).toContain('event id: evt-1');
    expect(text).toContain('trace-abc');
  });

  it('should render event metadata', () => {
    const text = fixture.nativeElement.textContent;

    expect(text).toContain('type: stage');
    expect(text).toContain('event name: Resolve');
    expect(text).toContain('boundary: start');
    expect(text).toContain('source: test-source');
  });

  it('should render state value JSON', () => {
    const text = fixture.nativeElement.textContent;

    expect(text).toContain('"foo": "bar"');
  });

  it('should render payload JSON', () => {
    const text = fixture.nativeElement.textContent;

    expect(text).toContain('"action": "test"');
  });

  it('should render error block when event has an error', () => {
    fixture.componentRef.setInput('event', {
      ...mockEvent,
      error: { message: 'Something broke' }
    });
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent;

    expect(text).toContain('Something broke');
  });

  it('should emit closeDetail when close button is clicked', () => {
    let emitted = false;
    fixture.componentInstance.closeDetail.subscribe(() => (emitted = true));

    const btn = fixture.nativeElement.querySelector('.close-btn');
    btn.click();

    expect(emitted).toBeTrue();
  });

  it('should show null for missing traceId', () => {
    fixture.componentRef.setInput('event', {
      ...mockEvent,
      traceId: undefined
    });
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent;

    expect(text).toContain('trace id: null');
  });

  it('should show null for missing source', () => {
    fixture.componentRef.setInput('event', {
      ...mockEvent,
      source: undefined
    });
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent;

    expect(text).toContain('source: N/A');
  });

  describe('formatSize', () => {
    it('should format bytes', () => {
      expect(fixture.componentInstance.formatSize('hi')).toBe('4 B');
    });

    it('should format kilobytes', () => {
      const value = 'x'.repeat(1500);
      const result = fixture.componentInstance.formatSize(value);

      expect(result).toMatch(/^\d+\.\d KB$/);
    });

    it('should format megabytes', () => {
      const value = 'x'.repeat(1024 * 1024 + 100);
      const result = fixture.componentInstance.formatSize(value);

      expect(result).toMatch(/^\d+\.\d MB$/);
    });

    it('should format gigabytes', () => {
      const originalBlob = globalThis.Blob;
      globalThis.Blob = class MockBlob {
        readonly size: number;
        constructor() {
          this.size = 1024 * 1024 * 1024 + 100;
        }
      } as unknown as typeof Blob;

      const result = fixture.componentInstance.formatSize('x');
      globalThis.Blob = originalBlob;

      expect(result).toMatch(/^\d+\.\d GB$/);
    });
  });

  it('should display state size when state has value', () => {
    const text = fixture.nativeElement.textContent;

    expect(text).toContain('state size:');
  });

  it('should display payload size when payload exists', () => {
    const text = fixture.nativeElement.textContent;

    expect(text).toContain('payload size:');
  });

  it('should not display state size when state has no value', () => {
    fixture.componentRef.setInput('event', {
      ...mockEvent,
      state: { hasValue: false }
    });
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent;

    expect(text).not.toContain('state size:');
  });

  it('should not display payload size when payload is absent', () => {
    fixture.componentRef.setInput('event', {
      ...mockEvent,
      payload: undefined
    });
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent;

    expect(text).not.toContain('payload size:');
  });

  it('should display candidate size when candidate exists', () => {
    const text = fixture.nativeElement.textContent;

    expect(text).toContain('candidate size:');
  });

  it('should not display candidate size when candidate is undefined', () => {
    fixture.componentRef.setInput('event', {
      ...mockEvent,
      candidate: undefined
    });
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent;

    expect(text).not.toContain('candidate size:');
  });
});
