import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import type { TraceExecutionShape } from '../../../shapes/trace';
import { TraceExecutionStatuses } from '../../../shapes/trace';
import { TraceTimelineComponent } from './trace-timeline.component';

describe('Component: TraceTimeline', () => {
  let fixture: ComponentFixture<TraceTimelineComponent>;
  let component: TraceTimelineComponent;

  const mockTraces: TraceExecutionShape[] = [
    {
      traceId: 'trace-1',
      cellKey: 'vault::todos::cell',
      startedAt: 1000,
      finishedAt: 1005,
      events: [],
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
    },
    {
      traceId: 'trace-2',
      cellKey: 'vault::auth::cell',
      startedAt: 2000,
      finishedAt: 2010,
      events: [],
      metrics: {
        duration: 10,
        eventCount: 2,
        status: TraceExecutionStatuses.Failed,
        slowestStage: { name: 'none', duration: 0 },
        fastestStage: { name: 'none', duration: 0 },
        stages: [],
        hadRevote: false,
        controllerVoteCount: 0,
        usedLicensedFeatures: false
      }
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TraceTimelineComponent],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(TraceTimelineComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('traces', mockTraces);
    fixture.detectChanges();
  });

  describe('timeWindow', () => {
    it('should compute min and max from traces', () => {
      const tw = component.timeWindow();
      expect(tw.min).toBe(1000);
      expect(tw.max).toBe(2010);
    });

    it('should return defaults when no traces provided', () => {
      fixture.componentRef.setInput('traces', []);
      fixture.detectChanges();
      const tw = component.timeWindow();
      expect(tw).toEqual({ min: 0, max: 1 });
    });
  });

  describe('statusLabel', () => {
    it('should return ✓ for success', () => {
      expect(component.statusLabel(mockTraces[0])).toBe('✓');
    });

    it('should return ✗ for failed', () => {
      expect(component.statusLabel(mockTraces[1])).toBe('✗');
    });

    it('should return ⊘ for denied', () => {
      const denied = {
        ...mockTraces[0],
        metrics: {
          ...mockTraces[0].metrics,
          status: TraceExecutionStatuses.Denied
        }
      };
      expect(component.statusLabel(denied)).toBe('⊘');
    });

    it('should return ⚠ for orphaned', () => {
      const orphaned = {
        ...mockTraces[0],
        metrics: {
          ...mockTraces[0].metrics,
          status: TraceExecutionStatuses.Orphaned
        }
      };
      expect(component.statusLabel(orphaned)).toBe('⚠');
    });

    it('should return ↺ for aborted', () => {
      const aborted = {
        ...mockTraces[0],
        metrics: {
          ...mockTraces[0].metrics,
          status: TraceExecutionStatuses.Aborted
        }
      };
      expect(component.statusLabel(aborted)).toBe('↺');
    });

    it('should return ? for unknown status', () => {
      const unknown = {
        ...mockTraces[0],
        metrics: { ...mockTraces[0].metrics, status: 'unknown' as any }
      };
      expect(component.statusLabel(unknown)).toBe('?');
    });
  });

  describe('statusClass', () => {
    it('should return status-success for successful traces', () => {
      expect(component.statusClass(mockTraces[0])).toBe('status-success');
    });

    it('should return status-error for failed traces', () => {
      expect(component.statusClass(mockTraces[1])).toBe('status-error');
    });

    it('should return status-denied for denied traces', () => {
      const denied = {
        ...mockTraces[0],
        metrics: {
          ...mockTraces[0].metrics,
          status: TraceExecutionStatuses.Denied
        }
      };
      expect(component.statusClass(denied)).toBe('status-denied');
    });

    it('should return status-orphaned for orphaned traces', () => {
      const orphaned = {
        ...mockTraces[0],
        metrics: {
          ...mockTraces[0].metrics,
          status: TraceExecutionStatuses.Orphaned
        }
      };
      expect(component.statusClass(orphaned)).toBe('status-orphaned');
    });

    it('should return status-aborted for aborted traces', () => {
      const aborted = {
        ...mockTraces[0],
        metrics: {
          ...mockTraces[0].metrics,
          status: TraceExecutionStatuses.Aborted
        }
      };
      expect(component.statusClass(aborted)).toBe('status-aborted');
    });

    it('should return empty string for unknown status', () => {
      const unknown = {
        ...mockTraces[0],
        metrics: { ...mockTraces[0].metrics, status: 'unknown' as any }
      };
      expect(component.statusClass(unknown)).toBe('');
    });
  });

  describe('timelineLeft', () => {
    it('should return 0 for the earliest trace', () => {
      expect(component.timelineLeft(mockTraces[0])).toBe(0);
    });

    it('should return positive percentage for later traces', () => {
      const left = component.timelineLeft(mockTraces[1]);
      expect(left).toBeGreaterThan(0);
      expect(left).toBeLessThanOrEqual(100);
    });
  });

  describe('timelineWidth', () => {
    it('should return a positive percentage', () => {
      const width = component.timelineWidth(mockTraces[0]);
      expect(width).toBeGreaterThan(0);
    });

    it('should enforce a minimum width of 0.5', () => {
      const zeroTrace = {
        ...mockTraces[0],
        startedAt: 1000,
        finishedAt: 1000,
        metrics: { ...mockTraces[0].metrics, duration: 0 }
      };
      expect(component.timelineWidth(zeroTrace)).toBe(0.5);
    });
  });

  describe('toggleTrace', () => {
    it('should set selectedTraceId and emit traceToggled', () => {
      spyOn(component.traceToggled, 'emit');
      component.toggleTrace('trace-1');
      expect(component.selectedTraceId()).toBe('trace-1');
      expect(component.traceToggled.emit).toHaveBeenCalledWith('trace-1');
    });

    it('should deselect when toggling the same trace', () => {
      component.toggleTrace('trace-1');
      component.toggleTrace('trace-1');
      expect(component.selectedTraceId()).toBeNull();
    });

    it('should switch selection to a different trace', () => {
      component.toggleTrace('trace-1');
      component.toggleTrace('trace-2');
      expect(component.selectedTraceId()).toBe('trace-2');
    });
  });
});
