import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DevtoolsPipelineEventDetailComponent } from './devtools-pipeline-event-detail.component';

describe('Component: DevtoolsPipelineEventDetail', () => {
  let fixture: ComponentFixture<DevtoolsPipelineEventDetailComponent>;

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
    error: null
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DevtoolsPipelineEventDetailComponent],
      providers: [provideZonelessChangeDetection()]
    });

    fixture = TestBed.createComponent(DevtoolsPipelineEventDetailComponent);
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
});
