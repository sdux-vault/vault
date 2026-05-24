import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import type { EventShape } from '@sdux-vault/shared';
import { DevtoolsPipelineEventComponent } from './devtools-pipeline-event.component';

describe('Component: DevtoolsPipelineEvent', () => {
  let fixture: ComponentFixture<DevtoolsPipelineEventComponent>;

  const mockEvent: any = {
    cell: 'test-cell',
    type: 'stage:start',
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
    const text = fixture.nativeElement.textContent;

    expect(text).toContain('DetailsStateid: isLoading: falsehasValue: true');
    expect(text).toContain('"foo": "bar"');
  });

  it('should update when event input changes', () => {
    const nextEvent: EventShape = {
      cell: 'updated',
      type: 'stage:end',
      timestamp: 987654321,
      state: {
        value: { hello: 'world' },
        isLoading: true,
        hasValue: true,
        error: null
      }
    } as any;

    fixture.componentRef.setInput('event', nextEvent);
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent;

    expect(text).toContain('"hello": "world"');
  });
});
