import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import type { TimelineMarkerShape } from '../compare-timeline/compare-timeline.component';
import { CompareTraceService } from '../service/compare-trace.service';
import {
  CompareTimelineWaterfallComponent,
  type WaterfallCategoryShape
} from './compare-timeline-waterfall.component';

describe('CompareTimelineWaterfallComponent', () => {
  let fixture: ComponentFixture<CompareTimelineWaterfallComponent>;
  let component: CompareTimelineWaterfallComponent;
  let el: HTMLElement;

  const mockBeforeMarkers: TimelineMarkerShape[] = [
    {
      label: 'lifecycle',
      eventName: 'lifecycle:start:replace',
      position: 2,
      elapsed: 10
    },
    {
      label: 'lifecycle',
      eventName: 'lifecycle:end:replace',
      position: 18,
      elapsed: 90
    }
  ];

  const mockAfterMarkers: TimelineMarkerShape[] = [
    {
      label: 'lifecycle',
      eventName: 'lifecycle:start:merge',
      position: 5,
      elapsed: 10
    }
  ];

  const mockCategories: WaterfallCategoryShape[] = [
    {
      label: 'lifecycle',
      beforeMarkers: mockBeforeMarkers,
      afterMarkers: mockAfterMarkers,
      totalEvents: 3
    },
    {
      label: 'pipeline',
      beforeMarkers: [
        {
          label: 'pipeline',
          eventName: 'pipeline:resolve',
          position: 25,
          elapsed: 125
        }
      ],
      afterMarkers: [
        {
          label: 'pipeline',
          eventName: 'pipeline:resolve',
          position: 15,
          elapsed: 30
        }
      ],
      totalEvents: 2
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompareTimelineWaterfallComponent],
      providers: [
        {
          provide: CompareTraceService,
          useValue: {
            timelineViewMode: signal('waterfall'),
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
            timelineTickPercent: signal(20),
            timelineTickInterval: signal(100),
            timelineWaterfallCategories: signal(mockCategories)
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CompareTimelineWaterfallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the section header', () => {
    const header = el.querySelector('.section-header h3');
    expect(header!.textContent).toContain('Waterfall');
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

  it('should display total event count', () => {
    const stats = el.querySelector('.timeline-toolbar')!.textContent;
    expect(stats).toContain('5 events');
  });

  it('should display legend with trace labels', () => {
    const legend = el.querySelector('.waterfall-legend')!.textContent;
    expect(legend).toContain('t1');
    expect(legend).toContain('t2');
  });

  it('should render category rows', () => {
    const rows = el.querySelectorAll('.waterfall-row');
    expect(rows.length).toBe(2);
  });

  it('should display category labels', () => {
    const labels = el.querySelectorAll('.waterfall-label');
    expect(labels[0].textContent).toContain('lifecycle');
    expect(labels[1].textContent).toContain('pipeline');
  });

  it('should render before markers', () => {
    const beforeMarkers = el.querySelectorAll('.before-marker');
    expect(beforeMarkers.length).toBe(3);
  });

  it('should render after markers', () => {
    const afterMarkers = el.querySelectorAll('.after-marker');
    expect(afterMarkers.length).toBe(2);
  });

  it('should display time axis', () => {
    const axis = el.querySelector('.waterfall-time-axis')!.textContent;
    expect(axis).toContain('0ms');
    expect(axis).toContain('500ms');
  });

  it('should toggle visibility when header is clicked', () => {
    expect(el.querySelector('.timeline-content')).toBeTruthy();
    const header = el.querySelector('.section-header') as HTMLElement;
    header.click();
    fixture.detectChanges();
    expect(el.querySelector('.timeline-content')).toBeNull();
    header.click();
    fixture.detectChanges();
    expect(el.querySelector('.timeline-content')).toBeTruthy();
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
    it('should return number of categories', () => {
      expect(component.categoryCount()).toBe(2);
    });

    it('should return 0 when no categories', () => {
      const service = TestBed.inject(CompareTraceService);
      (
        service.timelineWaterfallCategories as ReturnType<
          typeof signal<WaterfallCategoryShape[]>
        >
      ).set([]);
      expect(component.categoryCount()).toBe(0);
    });
  });

  describe('totalEvents', () => {
    it('should sum events across all categories', () => {
      expect(component.totalEvents()).toBe(5);
    });

    it('should return 0 when no categories', () => {
      const service = TestBed.inject(CompareTraceService);
      (
        service.timelineWaterfallCategories as ReturnType<
          typeof signal<WaterfallCategoryShape[]>
        >
      ).set([]);
      expect(component.totalEvents()).toBe(0);
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

  describe('showHelp', () => {
    it('should default to false', () => {
      expect(component.showHelp()).toBeFalse();
    });

    it('should toggle to true', () => {
      component.showHelp.set(true);
      expect(component.showHelp()).toBeTrue();
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
