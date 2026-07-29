import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompareTraceService } from '../service/compare-trace.service';
import {
  CompareTimelineSpansComponent,
  type TimelineSpanShape
} from './compare-timeline-spans.component';

describe('CompareTimelineSpansComponent', () => {
  let fixture: ComponentFixture<CompareTimelineSpansComponent>;
  let component: CompareTimelineSpansComponent;
  let el: HTMLElement;

  const mockBeforeSpans: TimelineSpanShape[] = [
    {
      label: 'lifecycle',
      startPosition: 2,
      endPosition: 20,
      startElapsed: 10,
      endElapsed: 100,
      duration: 90,
      eventCount: 3
    },
    {
      label: 'pipeline',
      startPosition: 25,
      endPosition: 50,
      startElapsed: 125,
      endElapsed: 250,
      duration: 125,
      eventCount: 2
    }
  ];

  const mockAfterSpans: TimelineSpanShape[] = [
    {
      label: 'lifecycle',
      startPosition: 5,
      endPosition: 15,
      startElapsed: 10,
      endElapsed: 30,
      duration: 20,
      eventCount: 2
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompareTimelineSpansComponent],
      providers: [
        {
          provide: CompareTraceService,
          useValue: {
            timelineViewMode: signal('category-spans'),
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
            timelineMaxDuration: signal(500),
            timelineZoom: signal(1),
            timelineTickInterval: signal(100),
            timelineBeforeSpans: signal(mockBeforeSpans),
            timelineAfterSpans: signal(mockAfterSpans)
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CompareTimelineSpansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('should display the section header', () => {
    const header = el.querySelector('.header-section h4');
    expect(header!.textContent).toContain('Category Duration Spans');
  });

  it('should display before and after durations in stats', () => {
    const stats = el.querySelector('.timeline-toolbar')!.textContent;
    expect(stats).toContain('Before: 500ms');
    expect(stats).toContain('After: 200ms');
  });

  it('should display duration delta', () => {
    const delta = el.querySelector('.summary-delta');
    expect(delta!.textContent).toContain('faster');
  });

  it('should display percent change', () => {
    const deltas = el.querySelectorAll('.summary-delta');
    const texts = Array.from(deltas).map((d) => d.textContent!.trim());
    expect(texts.some((t) => t.includes('↓') && t.includes('%'))).toBeTrue();
  });

  it('should display category count', () => {
    const stats = el.querySelector('.timeline-toolbar')!.textContent;
    expect(stats).toContain('2 categories');
  });

  it('should display before label', () => {
    const labels = el.querySelectorAll('.timeline-label');
    expect(labels[0].textContent).toContain('t1');
  });

  it('should display after label', () => {
    const labels = el.querySelectorAll('.timeline-label');
    expect(labels[1].textContent).toContain('t2');
  });

  it('should render before spans', () => {
    const spans = el.querySelectorAll('.before-span');
    expect(spans.length).toBe(2);
  });

  it('should render after spans', () => {
    const spans = el.querySelectorAll('.after-span');
    expect(spans.length).toBe(1);
  });

  it('should show span labels', () => {
    const labels = el.querySelectorAll('.before-span .span-label');
    expect(labels[0].textContent).toContain('lifecycle');
    expect(labels[1].textContent).toContain('pipeline');
  });

  it('should display before and after durations', () => {
    const durations = el.querySelectorAll('.timeline-duration');
    expect(durations[0].textContent).toContain('500ms');
    expect(durations[1].textContent).toContain('200ms');
  });

  it('should set both tracks to 100% width', () => {
    const beforeTrack = el.querySelector('.before-track') as HTMLElement;
    const afterTrack = el.querySelector('.after-track') as HTMLElement;
    expect(beforeTrack.style.width).toBe('100%');
    expect(afterTrack.style.width).toBe('100%');
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

  describe('spanWidth', () => {
    it('should return width from end minus start', () => {
      const width = component.spanWidth(mockBeforeSpans[0]);
      expect(width).toBe(18);
    });

    it('should return minimum width of 1 for zero-duration spans', () => {
      const zeroSpan: TimelineSpanShape = {
        label: 'zero',
        startPosition: 50,
        endPosition: 50,
        startElapsed: 100,
        endElapsed: 100,
        duration: 0,
        eventCount: 1
      };
      expect(component.spanWidth(zeroSpan)).toBe(1);
    });

    it('should return minimum width of 1 for very small spans', () => {
      const tinySpan: TimelineSpanShape = {
        label: 'tiny',
        startPosition: 50,
        endPosition: 50.5,
        startElapsed: 100,
        endElapsed: 101,
        duration: 1,
        eventCount: 1
      };
      expect(component.spanWidth(tinySpan)).toBe(1);
    });
  });

  describe('percentChange', () => {
    it('should show decrease when after is shorter', () => {
      expect(component.percentChange()).toContain('↓');
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

  describe('categoryCount', () => {
    it('should count distinct categories across both traces', () => {
      expect(component.categoryCount()).toBe(2);
    });

    it('should return 0 when no spans', () => {
      const service = TestBed.inject(CompareTraceService);
      (
        service.timelineBeforeSpans as ReturnType<
          typeof signal<TimelineSpanShape[]>
        >
      ).set([]);
      (
        service.timelineAfterSpans as ReturnType<
          typeof signal<TimelineSpanShape[]>
        >
      ).set([]);
      expect(component.categoryCount()).toBe(0);
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

  describe('beforeWidthPercent and afterWidthPercent', () => {
    it('should always return 100', () => {
      expect(component.beforeWidthPercent()).toBe(100);
      expect(component.afterWidthPercent()).toBe(100);
    });
  });

  describe('beforeTickPercent and afterTickPercent', () => {
    it('should compute tick percent based on interval and duration', () => {
      expect(component.beforeTickPercent()).toBe((100 / 500) * 100);
      expect(component.afterTickPercent()).toBe((100 / 200) * 100);
    });

    it('should use 1 as minimum duration', () => {
      const service = TestBed.inject(CompareTraceService);
      (service.compareBeforeDuration as ReturnType<typeof signal<number>>).set(
        0
      );
      expect(component.beforeTickPercent()).toBe((100 / 1) * 100);
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
