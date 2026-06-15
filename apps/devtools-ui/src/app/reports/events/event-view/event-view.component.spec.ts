import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import type { EventShape } from '@sdux-vault/shared';
import { EventViewComponent } from './event-view.component';

describe('Component: DevtoolsPipelineEvent', () => {
  let fixture: ComponentFixture<EventViewComponent>;

  const mockEvent: any = {
    id: 'evt-1',
    cell: 'test-cell',
    type: 'stage',
    behaviorKey: 'test-behavior',
    timestamp: 123456789,
    state: {
      value: { foo: 'bar' },
      isLoading: false,
      hasValue: true,
      error: null
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EventViewComponent],
      providers: [provideZonelessChangeDetection()]
    });

    fixture = TestBed.createComponent(EventViewComponent);

    fixture.componentRef.setInput('event', mockEvent);
    fixture.componentRef.setInput('totalEvents', 3);

    fixture.detectChanges();
  });

  it('should render collapsed header content by default', () => {
    const text = fixture.nativeElement.textContent;

    expect(text).toContain('Test Behavior');
    expect(text).toContain('TEST-BEHAVIOR');
    expect(text).toContain('3');
  });

  it('should emit selectEvent when row is clicked', () => {
    let emitted: EventShape | undefined;
    fixture.componentInstance.selectEvent.subscribe(
      (e: EventShape) => (emitted = e)
    );

    const row = fixture.nativeElement.querySelector('.event-row-header');
    row.click();

    expect(emitted).toEqual(mockEvent);
  });

  it('should apply selected class when selected input is true', () => {
    fixture.componentRef.setInput('selected', true);
    fixture.detectChanges();

    const row = fixture.nativeElement.querySelector('.event-row-header');

    expect(row.classList).toContain('event-row-selected');
  });

  it('should not apply selected class by default', () => {
    const row = fixture.nativeElement.querySelector('.event-row-header');

    expect(row.classList).not.toContain('event-row-selected');
  });

  it('should apply error class when event has an error', () => {
    fixture.componentRef.setInput('event', {
      ...mockEvent,
      error: { message: 'fail' }
    });
    fixture.detectChanges();

    const row = fixture.nativeElement.querySelector('.event-row-header');

    expect(row.classList).toContain('event-row-error');
  });

  describe('parseBehaviorKey', () => {
    it('should include kind and name from canonical behavior keys', () => {
      fixture.componentRef.setInput('event', {
        ...mockEvent,
        behaviorKey: 'SDUX::Behavior::Core::Reducer'
      });
      fixture.detectChanges();

      expect(fixture.componentInstance.parseBehaviorKey()).toEqual([
        'BEHAVIOR',
        'REDUCER'
      ]);
    });

    it('should strip VAULT- prefix from internal keys', () => {
      fixture.componentRef.setInput('event', {
        ...mockEvent,
        behaviorKey: 'VAULT-CONDUCTOR'
      });
      fixture.detectChanges();

      expect(fixture.componentInstance.parseBehaviorKey()).toEqual([
        'CONDUCTOR'
      ]);
    });

    it('should return a single pill for keys without a known prefix', () => {
      fixture.componentRef.setInput('event', {
        ...mockEvent,
        behaviorKey: 'DECISION-ENGINE'
      });
      fixture.detectChanges();

      expect(fixture.componentInstance.parseBehaviorKey()).toEqual([
        'DECISION-ENGINE'
      ]);
    });

    it('should include kind and name from canonical controller keys', () => {
      fixture.componentRef.setInput('event', {
        ...mockEvent,
        behaviorKey: 'SDUX::Controller::Core::Resolve'
      });
      fixture.detectChanges();

      expect(fixture.componentInstance.parseBehaviorKey()).toEqual([
        'CONTROLLER',
        'RESOLVE'
      ]);
    });
  });
});
