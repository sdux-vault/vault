import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import type { TraceExecutionShape } from '../../../shared/shapes/trace';
import { TraceExecutionStatuses } from '../../../shared/shapes/trace';
import { TraceEventTableComponent } from './trace-event-table.component';

describe('Component: TraceEventTable', () => {
  let fixture: ComponentFixture<TraceEventTableComponent>;
  let component: TraceEventTableComponent;

  const mockTrace: TraceExecutionShape = {
    traceId: 'trace-1',
    cellKey: 'vault::todos::cell',
    startedAt: 1000,
    finishedAt: 1005,
    events: [
      {
        name: 'conductor:start:dispatch',
        timestamp: 1000,
        traceId: 'trace-1',
        cell: 'vault::todos::cell',
        type: 'conductor',
        behaviorKey: 'addTodo',
        boundary: 'start',
        id: 'evt-1',
        payload: { text: 'hello' }
      } as any,
      {
        name: 'stage:end:reducer',
        timestamp: 1003,
        traceId: 'trace-1',
        cell: 'vault::todos::cell',
        type: 'stage',
        behaviorKey: 'addTodo',
        boundary: 'end',
        id: 'evt-2',
        state: {
          isLoading: false,
          error: null,
          hasValue: true,
          value: [{ id: 1 }]
        }
      } as any,
      {
        name: 'conductor:end:attempt',
        timestamp: 1005,
        traceId: 'trace-1',
        cell: 'vault::todos::cell',
        type: 'conductor',
        behaviorKey: 'addTodo',
        boundary: 'end',
        id: 'evt-3'
      } as any
    ],
    metrics: {
      duration: 5,
      eventCount: 3,
      status: TraceExecutionStatuses.Success,
      slowestStage: { name: 'reducer', duration: 3 },
      fastestStage: { name: 'reducer', duration: 3 },
      stages: [],
      hadRevote: false,
      controllerVoteCount: 1,
      usedLicensedFeatures: false
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TraceEventTableComponent],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(TraceEventTableComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('trace', mockTrace);
    fixture.detectChanges();
  });

  describe('deltaMs', () => {
    it('should return 0.0 for the first event', () => {
      expect(component.deltaMs(mockTrace.events[0], 0)).toBe('0.0');
    });

    it('should compute delta from previous event', () => {
      expect(component.deltaMs(mockTrace.events[1], 1)).toBe('3.0');
    });

    it('should compute delta for the third event', () => {
      expect(component.deltaMs(mockTrace.events[2], 2)).toBe('2.0');
    });
  });

  describe('elapsedMs', () => {
    it('should return 0.0 for the first event', () => {
      expect(component.elapsedMs(mockTrace.events[0])).toBe('0.0');
    });

    it('should compute elapsed from trace start', () => {
      expect(component.elapsedMs(mockTrace.events[1])).toBe('3.0');
    });

    it('should compute elapsed for the last event', () => {
      expect(component.elapsedMs(mockTrace.events[2])).toBe('5.0');
    });
  });

  describe('eventDisplayName', () => {
    it('should drop the boundary segment for three-part names', () => {
      expect(component.eventDisplayName(mockTrace.events[0])).toBe(
        'conductor dispatch'
      );
    });

    it('should drop the boundary segment for stage events', () => {
      expect(component.eventDisplayName(mockTrace.events[1])).toBe(
        'stage reducer'
      );
    });

    it('should return the name unchanged for two-part names', () => {
      const event = { ...mockTrace.events[0], name: 'conductor:start' } as any;
      expect(component.eventDisplayName(event)).toBe('conductor:start');
    });
  });

  describe('eventBehaviorKey', () => {
    it('should return the behaviorKey', () => {
      expect(component.eventBehaviorKey(mockTrace.events[0])).toBe('addTodo');
    });

    it('should return empty string when undefined', () => {
      expect(component.eventBehaviorKey({} as any)).toBe('');
    });
  });

  describe('hasState', () => {
    it('should return true when state has value', () => {
      expect(component.hasState(mockTrace.events[1])).toBeTrue();
    });

    it('should return false when no state', () => {
      expect(component.hasState(mockTrace.events[0])).toBeFalse();
    });

    it('should return false when hasValue is false', () => {
      const event = {
        state: { isLoading: false, error: null, hasValue: false }
      } as any;
      expect(component.hasState(event)).toBeFalse();
    });
  });

  describe('hasPayload', () => {
    it('should return true when payload exists', () => {
      expect(component.hasPayload(mockTrace.events[0])).toBeTrue();
    });

    it('should return false when no payload', () => {
      expect(component.hasPayload(mockTrace.events[2])).toBeFalse();
    });
  });

  describe('hasError', () => {
    it('should return false when no error', () => {
      expect(component.hasError(mockTrace.events[0])).toBeFalse();
    });

    it('should return true when error present', () => {
      const event = { ...mockTrace.events[0], error: 'timeout' } as any;
      expect(component.hasError(event)).toBeTrue();
    });
  });

  describe('selectEvent', () => {
    it('should set selectedEventId and emit eventSelected', () => {
      spyOn(component.eventSelected, 'emit');
      component.selectEvent(mockTrace.events[0]);
      expect(component.selectedEventId()).toBe('evt-1');
      expect(component.eventSelected.emit).toHaveBeenCalledWith(
        mockTrace.events[0]
      );
    });

    it('should deselect when same event clicked again', () => {
      component.selectEvent(mockTrace.events[0]);
      component.selectEvent(mockTrace.events[0]);
      expect(component.selectedEventId()).toBeNull();
    });

    it('should switch to a different event', () => {
      component.selectEvent(mockTrace.events[0]);
      component.selectEvent(mockTrace.events[1]);
      expect(component.selectedEventId()).toBe('evt-2');
    });
  });
});
