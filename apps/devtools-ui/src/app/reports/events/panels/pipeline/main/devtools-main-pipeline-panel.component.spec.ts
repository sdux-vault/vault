import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventDetailComponent } from '../../../../../shared/components/event-detail/event-detail.component';
import { DevtoolsPipelineEventComponent } from '../../events/devtools-pipeline-event.component';
import { DevtoolsMainPipelinePanelComponent } from './devtools-main-pipeline-panel.component';

const mockEvent: any = {
  id: 1,
  type: 'enqueue',
  behaviorKey: 'test-behavior'
};

describe('Component: DevtoolsPanel', () => {
  let fixture: ComponentFixture<DevtoolsMainPipelinePanelComponent>;
  let component: DevtoolsMainPipelinePanelComponent;
  let mockEvent2: any;
  let mockEvent3: any;

  beforeEach(async () => {
    mockEvent2 = structuredClone(mockEvent);
    mockEvent2.id = 2;

    mockEvent3 = structuredClone(mockEvent);
    mockEvent3.id = 3;

    await TestBed.configureTestingModule({
      imports: [
        DevtoolsMainPipelinePanelComponent,
        DevtoolsPipelineEventComponent,
        EventDetailComponent
      ],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(DevtoolsMainPipelinePanelComponent);
    fixture.componentRef.setInput('events', [mockEvent]);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should reverse events for display via reversedEvents', () => {
    fixture.componentRef.setInput('events', [mockEvent, mockEvent2]);
    fixture.detectChanges();

    expect(component.reversedEvents()).toEqual([
      Object({ id: 2, type: 'enqueue', behaviorKey: 'test-behavior' }),
      Object({ id: 1, type: 'enqueue', behaviorKey: 'test-behavior' })
    ]);
  });

  it('should expose totalEvents from the events input', () => {
    fixture.componentRef.setInput('events', [mockEvent, mockEvent2]);
    fixture.detectChanges();

    expect(component.totalEvents()).toBe(2);
  });

  it('should recompute reversedEvents when input changes', () => {
    expect(component.reversedEvents()).toEqual([
      Object({
        id: 1,
        type: 'enqueue',
        behaviorKey: 'test-behavior'
      })
    ]);

    fixture.componentRef.setInput('events', [mockEvent3]);
    fixture.detectChanges();

    expect(component.reversedEvents()).toEqual([
      Object({ id: 3, type: 'enqueue', behaviorKey: 'test-behavior' })
    ]);
  });

  it('should render template without pipe errors', () => {
    expect(() => fixture.detectChanges()).not.toThrow();
  });

  it('should return event id from trackById', () => {
    expect(component.trackById(0, { id: 'abc' })).toBe('abc');
    expect(component.trackById(1, { id: 42 })).toBe(42);
  });

  it('should select an event via selectEvent', () => {
    component.selectEvent(mockEvent);

    expect(component.selectedEvent()).toEqual(mockEvent);
  });

  it('should clear selected event via closeDetail', () => {
    component.selectEvent(mockEvent);
    component.closeDetail();

    expect(component.selectedEvent()).toBeNull();
  });

  it('should have no selected event by default', () => {
    expect(component.selectedEvent()).toBeNull();
  });

  describe('itemSize', () => {
    it('should be 40', () => {
      expect(component.itemSize()).toBe(40);
    });
  });

  describe('scrollToTop', () => {
    it('should not throw when viewport is undefined', () => {
      expect(() => component.scrollToTop()).not.toThrow();
    });
  });
});
