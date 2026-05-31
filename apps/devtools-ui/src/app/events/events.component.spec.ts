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
  behaviorKey: 'test-behavior',
  cell: 'alpha'
};

const mockEvent2: any = {
  id: 2,
  type: 'enqueue',
  behaviorKey: 'test-behavior-2',
  cell: 'beta'
};

const mockEventWithError: any = {
  id: 3,
  type: 'enqueue',
  behaviorKey: 'test-behavior-3',
  cell: 'alpha',
  error: 'something went wrong'
};

const mockEventWithState: any = {
  id: 4,
  type: 'enqueue',
  behaviorKey: 'test-behavior-4',
  cell: 'alpha',
  state: {
    hasValue: true,
    value: [{ id: 11, name: 'Luke', lastName: 'Skywalker', jedi: true }],
    isLoading: false,
    error: null
  }
};

const mockEventWithState2: any = {
  id: 5,
  type: 'enqueue',
  behaviorKey: 'test-behavior-5',
  cell: 'beta',
  state: {
    hasValue: true,
    value: [{ id: 1, name: 'Jean-Luc', lastName: 'Picard', captain: true }],
    isLoading: false,
    error: null
  }
};

const mockEventNoStateValue: any = {
  id: 6,
  type: 'enqueue',
  behaviorKey: 'test-behavior-6',
  cell: 'gamma',
  state: { hasValue: false, value: undefined, isLoading: true, error: null }
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

  describe('cell filtering', () => {
    beforeEach(() => {
      mockService.eventsSignal.set([mockEvent, mockEvent2, mockEventWithError]);
      fixture.detectChanges();
    });

    it('should default selectedCell to "all"', () => {
      expect(component.selectedCell()).toBe('all');
    });

    it('should derive sorted unique cell names from events', () => {
      expect(component.cellNames()).toEqual(['alpha', 'beta']);
    });

    it('should return all events when selectedCell is "all"', () => {
      expect(component.filteredEvents()?.length).toBe(3);
    });

    it('should filter events by selected cell', () => {
      component.selectedCell.set('alpha');
      expect(component.filteredEvents()?.length).toBe(2);
      expect(
        component.filteredEvents()?.every((e: any) => e.cell === 'alpha')
      ).toBeTrue();
    });

    it('should filter error events by selected cell', () => {
      component.selectedCell.set('alpha');
      expect(component.errorEvents().length).toBe(1);
      expect(component.errorEvents()[0]).toBe(mockEventWithError);
    });

    it('should return no error events for a cell with none', () => {
      component.selectedCell.set('beta');
      expect(component.errorEvents().length).toBe(0);
    });

    it('should update totalEvents based on filtered results', () => {
      component.selectedCell.set('beta');
      expect(component.totalEvents()).toBe(1);
    });
  });

  describe('clearEvents', () => {
    it('should reset selectedCell to "all"', () => {
      component.selectedCell.set('alpha');
      component.clearEvents();
      expect(component.selectedCell()).toBe('all');
    });
  });

  describe('latestStateSize', () => {
    it('should return null when there are no events', () => {
      mockService.eventsSignal.set([]);
      expect(component.latestStateSize()).toBeNull();
    });

    it('should return null when no events have state with hasValue', () => {
      mockService.eventsSignal.set([mockEvent, mockEventNoStateValue]);
      expect(component.latestStateSize()).toBeNull();
    });

    it('should return the size of the latest event state value', () => {
      mockService.eventsSignal.set([mockEventWithState]);
      const size = new Blob([JSON.stringify(mockEventWithState.state.value)])
        .size;
      expect(component.latestStateSize()).toBe(`${size} B`);
    });

    it('should sum sizes across cells when viewing all', () => {
      mockService.eventsSignal.set([mockEventWithState, mockEventWithState2]);
      const sizeAlpha = new Blob([
        JSON.stringify(mockEventWithState.state.value)
      ]).size;
      const sizeBeta = new Blob([
        JSON.stringify(mockEventWithState2.state.value)
      ]).size;
      expect(component.latestStateSize()).toBe(`${sizeAlpha + sizeBeta} B`);
    });

    it('should only include the selected cell size when filtered', () => {
      mockService.eventsSignal.set([mockEventWithState, mockEventWithState2]);
      component.selectedCell.set('beta');
      const sizeBeta = new Blob([
        JSON.stringify(mockEventWithState2.state.value)
      ]).size;
      expect(component.latestStateSize()).toBe(`${sizeBeta} B`);
    });

    it('should use the latest event per cell', () => {
      const olderEvent: any = {
        ...mockEventWithState,
        id: 99,
        state: {
          hasValue: true,
          value: [{ id: 1 }],
          isLoading: false,
          error: null
        }
      };
      mockService.eventsSignal.set([olderEvent, mockEventWithState]);
      const size = new Blob([JSON.stringify(mockEventWithState.state.value)])
        .size;
      expect(component.latestStateSize()).toBe(`${size} B`);
    });

    it('should skip events without hasValue when calculating size', () => {
      mockService.eventsSignal.set([
        mockEventNoStateValue,
        mockEventWithState2
      ]);
      const sizeBeta = new Blob([
        JSON.stringify(mockEventWithState2.state.value)
      ]).size;
      expect(component.latestStateSize()).toBe(`${sizeBeta} B`);
    });
  });
});
