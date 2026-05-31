import {
  computed,
  provideZonelessChangeDetection,
  signal,
  WritableSignal
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DevtoolsService } from '../services/devtools.service';
import { EXTENSION_VERSION } from '../splash-page/devtools-splash-page.component';
import { EventsComponent } from './events.component';

const mockEvent: any = {
  id: 1,
  type: 'enqueue',
  behaviorKey: 'test-behavior'
};

class MockNgVaultDevtoolsService {
  eventsSignal: WritableSignal<any[]> = signal([mockEvent]);
  totalEventsSignal = computed(() => this.eventsSignal().length);

  events() {
    return this.eventsSignal();
  }

  readonly queueEvents = computed(() => this.eventsSignal());
  readonly totalQueueEvents = computed(() => this.queueEvents().length);

  get totalEvents() {
    return this.totalEventsSignal;
  }

  clearEvents = jasmine.createSpy('clearEvents').and.callFake(() => {
    this.eventsSignal.set([]);
  });
}

describe('Component: Events', () => {
  let fixture: ComponentFixture<EventsComponent>;
  let component: EventsComponent;
  let mockService: MockNgVaultDevtoolsService;

  beforeEach(async () => {
    mockService = new MockNgVaultDevtoolsService();

    await TestBed.configureTestingModule({
      imports: [EventsComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: DevtoolsService, useValue: mockService },
        { provide: EXTENSION_VERSION, useValue: '1.0.0' }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the total event count', () => {
    expect(component.totalEvents()).toBe(1);
  });

  it('should clear events', () => {
    component.clearEvents();
    expect(mockService.clearEvents).toHaveBeenCalled();
  });

  it('should filter error events', () => {
    expect(component.errorEvents().length).toBe(0);
  });
});
