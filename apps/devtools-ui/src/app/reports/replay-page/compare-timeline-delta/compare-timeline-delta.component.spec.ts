import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompareTraceService } from '../service/compare-trace.service';
import {
  CompareTimelineDeltaComponent,
  type TimelineDeltaMarkerShape
} from './compare-timeline-delta.component';

describe('CompareTimelineDeltaComponent', () => {
  let fixture: ComponentFixture<CompareTimelineDeltaComponent>;
  let component: CompareTimelineDeltaComponent;
  let el: HTMLElement;

  const mockMarkers: TimelineDeltaMarkerShape[] = [
    {
      label: 'lifecycle',
      eventName: 'lifecycle:start:replace',
      position: 0,
      delta: -15,
      normalizedDelta: -0.75,
      beforeElapsed: 20,
      afterElapsed: 5
    },
    {
      label: 'pipeline',
      eventName: 'pipeline:candidate:resolve',
      position: 50,
      delta: 30,
      normalizedDelta: 1,
      beforeElapsed: 10,
      afterElapsed: 40
    },
    {
      label: 'stage',
      eventName: 'stage:execute',
      position: 100,
      delta: 0,
      normalizedDelta: 0,
      beforeElapsed: 50,
      afterElapsed: 50
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompareTimelineDeltaComponent],
      providers: [
        {
          provide: CompareTraceService,
          useValue: {
            timelineViewMode: signal('elapsed-delta'),
            traceLabels: signal(
              new Map([
                ['before-id', 't1'],
                ['after-id', 't2']
              ])
            ),
            compareBeforeId: signal('before-id'),
            compareAfterId: signal('after-id'),
            compareBeforeDuration: signal(500),
            compareAfterDuration: signal(200),
            compareDurationDelta: signal('-300ms faster'),
            timelineDeltaMarkers: signal(mockMarkers),
            timelineMaxDuration: signal(500),
            timelineZoom: signal(1),
            timelineTickPercent: signal(20),
            timelineTickInterval: signal(100)
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CompareTimelineDeltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('should display the section header', () => {
    const header = el.querySelector('.header-section h4');
    expect(header!.textContent).toContain('Elapsed Delta');
  });

  it('should display before and after durations in stats', () => {
    const stats = el.querySelector('.timeline-toolbar')!.textContent;
    expect(stats).toContain('Before: 500ms');
    expect(stats).toContain('After: 200ms');
  });

  it('should display faster and slower counts', () => {
    const stats = el.querySelector('.timeline-toolbar')!.textContent;
    expect(stats).toContain('1 faster');
    expect(stats).toContain('1 slower');
  });

  it('should display same count when greater than zero', () => {
    const stats = el.querySelector('.timeline-toolbar')!.textContent;
    expect(stats).toContain('1 same');
  });

  it('should display legend with trace labels', () => {
    const legend = el.querySelector('.delta-legend')!.textContent;
    expect(legend).toContain('t2 slower than t1');
    expect(legend).toContain('t2 faster than t1');
  });

  it('should display y-axis scale labels', () => {
    const yAxis = el.querySelector('.delta-y-axis');
    expect(yAxis).toBeTruthy();
    expect(yAxis!.textContent).toContain('+30ms');
  });

  it('should render delta markers', () => {
    const markers = el.querySelectorAll('.delta-marker');
    expect(markers.length).toBe(3);
  });

  it('should apply slower class to positive delta markers', () => {
    const markers = el.querySelectorAll('.delta-marker');
    expect(markers[1].classList).toContain('slower');
    expect(markers[1].classList).toContain('above');
  });

  it('should apply faster class to negative delta markers', () => {
    const markers = el.querySelectorAll('.delta-marker');
    expect(markers[0].classList).toContain('faster');
    expect(markers[0].classList).toContain('below');
  });

  it('should apply same class to zero delta markers', () => {
    const markers = el.querySelectorAll('.delta-marker');
    expect(markers[2].classList).toContain('same');
  });

  it('should display delta scale on y-axis', () => {
    const scale = el.querySelector('.delta-y-axis')!.textContent;
    expect(scale).toContain('+30ms');
    expect(scale).toContain('-30ms');
    expect(scale).toContain('0ms');
  });

  it('should toggle visibility when header is clicked', () => {
    expect(el.querySelector('.timeline-content')).toBeTruthy();
    const header = el.querySelector('.header-section') as HTMLElement;
    header.click();
    fixture.detectChanges();
    expect(el.querySelector('.timeline-content')).toBeNull();
    header.click();
    fixture.detectChanges();
    expect(el.querySelector('.timeline-content')).toBeTruthy();
  });

  describe('barHeight', () => {
    it('should return scaled height for large delta', () => {
      const height = component.barHeight(mockMarkers[1]);
      expect(height).toBe(45);
    });

    it('should return minimum height of 2 for zero delta', () => {
      const height = component.barHeight(mockMarkers[2]);
      expect(height).toBe(2);
    });

    it('should use absolute value for negative delta', () => {
      const height = component.barHeight(mockMarkers[0]);
      expect(height).toBe(0.75 * 45);
    });
  });

  describe('markerTooltip', () => {
    it('should show slower for positive delta', () => {
      const tooltip = component.markerTooltip(mockMarkers[1]);
      expect(tooltip).toContain('+30ms slower');
      expect(tooltip).toContain('before: +10ms');
      expect(tooltip).toContain('after: +40ms');
    });

    it('should show faster for negative delta', () => {
      const tooltip = component.markerTooltip(mockMarkers[0]);
      expect(tooltip).toContain('-15ms faster');
    });

    it('should show same timing for zero delta', () => {
      const tooltip = component.markerTooltip(mockMarkers[2]);
      expect(tooltip).toContain('same timing');
    });
  });

  describe('percentChange', () => {
    it('should return empty when before is zero', () => {
      expect(component.percentChange()).toContain('↓');
    });

    it('should return empty when durations are equal', () => {
      const service = TestBed.inject(CompareTraceService);
      (service.compareBeforeDuration as ReturnType<typeof signal<number>>).set(
        100
      );
      (service.compareAfterDuration as ReturnType<typeof signal<number>>).set(
        100
      );
      expect(component.percentChange()).toBe('');
    });

    it('should show increase when after is longer', () => {
      const service = TestBed.inject(CompareTraceService);
      (service.compareBeforeDuration as ReturnType<typeof signal<number>>).set(
        100
      );
      (service.compareAfterDuration as ReturnType<typeof signal<number>>).set(
        300
      );
      expect(component.percentChange()).toContain('↑');
    });

    it('should return empty when before is zero', () => {
      const service = TestBed.inject(CompareTraceService);
      (service.compareBeforeDuration as ReturnType<typeof signal<number>>).set(
        0
      );
      (service.compareAfterDuration as ReturnType<typeof signal<number>>).set(
        100
      );
      expect(component.percentChange()).toBe('');
    });
  });

  describe('beforeLabel and afterLabel fallback', () => {
    it('should fall back to Before when trace ID not in labels', () => {
      const service = TestBed.inject(CompareTraceService);
      (service.compareBeforeId as ReturnType<typeof signal<string>>).set(
        'unknown-id'
      );
      expect(component.beforeLabel()).toBe('Before');
    });

    it('should fall back to After when trace ID not in labels', () => {
      const service = TestBed.inject(CompareTraceService);
      (service.compareAfterId as ReturnType<typeof signal<string>>).set(
        'unknown-id'
      );
      expect(component.afterLabel()).toBe('After');
    });
  });

  describe('maxAbsDelta', () => {
    it('should return 0 when no markers', () => {
      const service = TestBed.inject(CompareTraceService);
      (
        service.timelineDeltaMarkers as ReturnType<
          typeof signal<TimelineDeltaMarkerShape[]>
        >
      ).set([]);
      expect(component.maxAbsDelta()).toBe(0);
    });
  });

  describe('sameCount hidden when zero', () => {
    it('should not show same count when zero', () => {
      const service = TestBed.inject(CompareTraceService);
      (
        service.timelineDeltaMarkers as ReturnType<
          typeof signal<TimelineDeltaMarkerShape[]>
        >
      ).set([mockMarkers[0], mockMarkers[1]]);
      fixture.detectChanges();
      const stats = el.querySelector('.timeline-toolbar')!.textContent;
      expect(stats).not.toContain('same');
    });
  });

  describe('markerCount', () => {
    it('should return total marker count', () => {
      expect(component.markerCount()).toBe(3);
    });
  });

  describe('tickMarks', () => {
    it('should generate marks at tick interval', () => {
      const marks = component.tickMarks();
      expect(marks.length).toBeGreaterThan(0);
      expect(marks[0].ms).toBe(100);
      expect(marks[0].position).toBe(20);
    });

    it('should drop last mark when too close to end', () => {
      const service = TestBed.inject(CompareTraceService);
      (service.timelineMaxDuration as ReturnType<typeof signal<number>>).set(
        105
      );
      const marks = component.tickMarks();
      expect(marks.length).toBe(0);
    });

    it('should keep last mark when not too close to end', () => {
      const service = TestBed.inject(CompareTraceService);
      (service.timelineMaxDuration as ReturnType<typeof signal<number>>).set(
        1000
      );
      const marks = component.tickMarks();
      const lastMark = marks[marks.length - 1];
      expect(lastMark.ms).toBe(900);
      expect(lastMark.position).toBe(90);
    });

    it('should use zoom-aware interval', () => {
      const service = TestBed.inject(CompareTraceService);
      (service.timelineTickInterval as ReturnType<typeof signal<number>>).set(
        50
      );
      const marks = component.tickMarks();
      expect(marks[0].ms).toBe(50);
      expect(marks[1].ms).toBe(100);
    });
  });
});
