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
  type: 'stage',
  behaviorKey: 'SDUX::Behavior::Core::Value',
  cell: 'alpha'
};

const mockEvent2: any = {
  id: 2,
  type: 'controller',
  behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
  cell: 'beta'
};

const mockEventWithError: any = {
  id: 3,
  type: 'lifecycle',
  behaviorKey: 'vault-orchestrator',
  cell: 'alpha',
  error: 'something went wrong'
};

const mockEventWithState: any = {
  id: 4,
  type: 'stage',
  behaviorKey: 'SDUX::Behavior::Core::Filter',
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
  type: 'stage',
  behaviorKey: 'SDUX::Behavior::Core::Value',
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
  type: 'conductor',
  behaviorKey: 'vault-conductor',
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

    it('should reset selectedType to "all"', () => {
      component.selectedType.set('stage');
      component.clearEvents();
      expect(component.selectedType()).toBe('all');
    });

    it('should reset selectedKey to "all"', () => {
      component.selectedKey.set('SDUX::Behavior::Core::Value');
      component.clearEvents();
      expect(component.selectedKey()).toBe('all');
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

    it('should show total state size regardless of cell filter', () => {
      mockService.eventsSignal.set([mockEventWithState, mockEventWithState2]);
      component.selectedCell.set('beta');
      const sizeAlpha = new Blob([
        JSON.stringify(mockEventWithState.state.value)
      ]).size;
      const sizeBeta = new Blob([
        JSON.stringify(mockEventWithState2.state.value)
      ]).size;
      expect(component.latestStateSize()).toBe(`${sizeAlpha + sizeBeta} B`);
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

  describe('type filtering', () => {
    beforeEach(() => {
      mockService.eventsSignal.set([
        mockEvent,
        mockEvent2,
        mockEventWithError,
        mockEventWithState,
        mockEventNoStateValue
      ]);
      fixture.detectChanges();
    });

    it('should default selectedType to "all"', () => {
      expect(component.selectedType()).toBe('all');
    });

    it('should derive sorted unique type names from events', () => {
      expect(component.typeNames()).toEqual([
        'conductor',
        'controller',
        'lifecycle',
        'stage'
      ]);
    });

    it('should scope typeNames by selected cell', () => {
      component.selectedCell.set('alpha');
      expect(component.typeNames()).toEqual(['lifecycle', 'stage']);
    });

    it('should filter events by selected type', () => {
      component.selectedType.set('stage');
      expect(
        component.filteredEvents()?.every((e: any) => e.type === 'stage')
      ).toBeTrue();
    });

    it('should combine cell and type filters', () => {
      component.selectedCell.set('alpha');
      component.selectedType.set('stage');
      const results = component.filteredEvents() ?? [];
      expect(results.length).toBe(2);
      expect(
        results.every((e: any) => e.cell === 'alpha' && e.type === 'stage')
      ).toBeTrue();
    });

    it('should return all events when type is "all"', () => {
      component.selectedType.set('all');
      expect(component.filteredEvents()?.length).toBe(5);
    });
  });

  describe('key filtering', () => {
    beforeEach(() => {
      mockService.eventsSignal.set([
        mockEvent,
        mockEvent2,
        mockEventWithState,
        mockEventNoStateValue
      ]);
      fixture.detectChanges();
    });

    it('should default selectedKey to "all"', () => {
      expect(component.selectedKey()).toBe('all');
    });

    it('should show key filter for stage type', () => {
      component.selectedType.set('stage');
      expect(component.showKeyFilter()).toBeTrue();
    });

    it('should show key filter for controller type', () => {
      component.selectedType.set('controller');
      expect(component.showKeyFilter()).toBeTrue();
    });

    it('should hide key filter for lifecycle type', () => {
      component.selectedType.set('lifecycle');
      expect(component.showKeyFilter()).toBeFalse();
    });

    it('should hide key filter for conductor type', () => {
      component.selectedType.set('conductor');
      expect(component.showKeyFilter()).toBeFalse();
    });

    it('should hide key filter when type is "all"', () => {
      expect(component.showKeyFilter()).toBeFalse();
    });

    it('should derive sorted unique key names scoped by cell and type', () => {
      component.selectedType.set('stage');
      expect(component.keyNames()).toEqual([
        'SDUX::Behavior::Core::Filter',
        'SDUX::Behavior::Core::Value'
      ]);
    });

    it('should scope keyNames by selected cell', () => {
      component.selectedCell.set('alpha');
      component.selectedType.set('stage');
      expect(component.keyNames()).toEqual([
        'SDUX::Behavior::Core::Filter',
        'SDUX::Behavior::Core::Value'
      ]);
    });

    it('should filter events by selected key', () => {
      component.selectedType.set('stage');
      component.selectedKey.set('SDUX::Behavior::Core::Value');
      const results = component.filteredEvents() ?? [];
      expect(results.length).toBe(1);
      expect(results[0]).toBe(mockEvent);
    });

    it('should combine cell, type, and key filters', () => {
      component.selectedCell.set('alpha');
      component.selectedType.set('stage');
      component.selectedKey.set('SDUX::Behavior::Core::Filter');
      const results = component.filteredEvents() ?? [];
      expect(results.length).toBe(1);
      expect(results[0]).toBe(mockEventWithState);
    });

    it('should return all type-filtered events when key is "all"', () => {
      component.selectedType.set('controller');
      component.selectedKey.set('all');
      const results = component.filteredEvents() ?? [];
      expect(results.length).toBe(1);
      expect(results[0]).toBe(mockEvent2);
    });
  });

  describe('displayKeyName', () => {
    it('should return the last segment of a behavior key', () => {
      expect(component.displayKeyName('SDUX::Behavior::Core::Value')).toBe(
        'Value'
      );
    });

    it('should return the last segment of a controller key', () => {
      expect(
        component.displayKeyName('SDUX::Controller::Policy::CoreAbstain')
      ).toBe('CoreAbstain');
    });

    it('should return the full string for internal keys', () => {
      expect(component.displayKeyName('vault-conductor')).toBe(
        'vault-conductor'
      );
    });

    it('should return the full string for keys without separators', () => {
      expect(component.displayKeyName('decision-engine')).toBe(
        'decision-engine'
      );
    });
  });
});
