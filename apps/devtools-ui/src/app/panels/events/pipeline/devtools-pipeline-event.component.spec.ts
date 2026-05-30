import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import type { EventShape } from '@sdux-vault/shared';
import { DevtoolsPipelineEventComponent } from './devtools-pipeline-event.component';

describe('Component: DevtoolsPipelineEvent', () => {
  let fixture: ComponentFixture<DevtoolsPipelineEventComponent>;

  const mockEvent: any = {
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
      imports: [DevtoolsPipelineEventComponent],
      providers: [provideZonelessChangeDetection()]
    });

    fixture = TestBed.createComponent(DevtoolsPipelineEventComponent);

    fixture.componentRef.setInput('event', mockEvent);
    fixture.componentRef.setInput('totalEvents', 3);

    fixture.detectChanges();
  });

  it('should render the event details', () => {
    fixture.componentRef.setInput('expanded', true);
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent;

    expect(text).toContain('isLoading: False');
    expect(text).toContain('hasValue: True');
    expect(text).toContain('"foo": "bar"');
  });

  it('should update when event input changes', () => {
    const nextEvent: EventShape = {
      cell: 'updated',
      type: 'stage',
      behaviorKey: 'updated-behavior',
      timestamp: 987654321,
      state: {
        value: { hello: 'world' },
        isLoading: true,
        hasValue: true,
        error: null
      }
    } as any;

    fixture.componentRef.setInput('event', nextEvent);
    fixture.componentRef.setInput('expanded', true);
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent;

    expect(text).toContain('"hello": "world"');
  });

  it('should emit expandedChange when onToggle is called', () => {
    const component = fixture.componentInstance;
    let emitted: boolean | undefined;
    component.expandedChange.subscribe((v: boolean) => (emitted = v));

    component.onToggle(true);
    expect(emitted).toBeTrue();

    component.onToggle(false);
    expect(emitted).toBeFalse();
  });

  it('should render collapsed header content by default', () => {
    const text = fixture.nativeElement.textContent;

    expect(text).toContain('test-cell');
    expect(text).toContain('TEST-BEHAVIOR');
    expect(text).toContain('003');
  });

  describe('parseBehaviorKey', () => {
    it('should strip SDUX:: prefix and kind segment from canonical keys', () => {
      fixture.componentRef.setInput('event', {
        ...mockEvent,
        behaviorKey: 'SDUX::Behavior::Core::Reducer'
      });
      fixture.detectChanges();

      expect(fixture.componentInstance.parseBehaviorKey()).toEqual([
        'CORE',
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

    it('should handle controller keys', () => {
      fixture.componentRef.setInput('event', {
        ...mockEvent,
        behaviorKey: 'SDUX::Controller::Core::Resolve'
      });
      fixture.detectChanges();

      expect(fixture.componentInstance.parseBehaviorKey()).toEqual([
        'CORE',
        'RESOLVE'
      ]);
    });
  });
});
