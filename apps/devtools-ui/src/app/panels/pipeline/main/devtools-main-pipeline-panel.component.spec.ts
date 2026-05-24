import {
  computed,
  provideZonelessChangeDetection,
  signal,
  WritableSignal
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DevtoolsService } from '../../../services/devtools.service';
import { DevtoolsPipelineEventComponent } from '../../events/pipeline/devtools-pipeline-event.component';
import { DevtoolsMainPipelinePanelComponent } from './devtools-main-pipeline-panel.component';

const mockEvent: any = {
  id: 1,
  type: 'enqueue'
};

class MockDevtoolsService {
  eventsSignal: WritableSignal<any[]> = signal([mockEvent]);
  totalEventsSignal = computed(() => this.eventsSignal().length);

  events() {
    return this.eventsSignal();
  }

  get totalEvents() {
    return this.totalEventsSignal;
  }

  clearEvents = jasmine.createSpy('clearEvents').and.callFake(() => {
    this.eventsSignal.set([]);
  });
}

describe('Component: DevtoolsPanel', () => {
  let fixture: ComponentFixture<DevtoolsMainPipelinePanelComponent>;
  let component: DevtoolsMainPipelinePanelComponent;
  let mockService: MockDevtoolsService;
  let mockEvent2: any;
  let mockEvent3: any;

  beforeEach(async () => {
    mockService = new MockDevtoolsService();

    mockEvent2 = structuredClone(mockEvent);
    mockEvent2.id = 2;

    mockEvent3 = structuredClone(mockEvent);
    mockEvent3.id = 3;

    await TestBed.configureTestingModule({
      imports: [
        DevtoolsMainPipelinePanelComponent,
        DevtoolsPipelineEventComponent
      ],
      providers: [
        { provide: DevtoolsService, useValue: mockService },
        provideZonelessChangeDetection()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DevtoolsMainPipelinePanelComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should expose events from the service as a computed signal', () => {
    mockService.eventsSignal.set([mockEvent, mockEvent2]);
    fixture.detectChanges();

    expect(component.events()).toEqual([
      Object({ id: 1, type: 'enqueue' }),
      Object({ id: 2, type: 'enqueue' })
    ]);
  });

  it('should expose totalEvents from the service', () => {
    mockService.eventsSignal.set([mockEvent, mockEvent2]);
    fixture.detectChanges();

    expect(component.totalEvents()).toBe(2);
  });

  it('should recompute events when service updates underlying signal', () => {
    expect(component.events()).toEqual([
      Object({
        id: 1,
        type: 'enqueue'
      })
    ]);

    mockService.eventsSignal.set([mockEvent3]);
    fixture.detectChanges();

    expect(component.events()).toEqual([Object({ id: 3, type: 'enqueue' })]);
  });

  it('should render template without pipe errors', () => {
    expect(() => fixture.detectChanges()).not.toThrow();
  });
});
