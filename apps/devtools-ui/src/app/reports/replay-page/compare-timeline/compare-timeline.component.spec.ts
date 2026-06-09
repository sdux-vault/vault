import { Component, signal, type WritableSignal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompareTraceService } from '../compare-trace.service';
import {
  CompareTimelineComponent,
  type TimelineMarkerShape
} from './compare-timeline.component';

@Component({
  standalone: true,
  imports: [CompareTimelineComponent],
  template: `
    <sdux-compare-timeline
      [beforeLabel]="beforeLabel()"
      [afterLabel]="afterLabel()"
      [beforeDuration]="beforeDuration()"
      [afterDuration]="afterDuration()"
      [beforeMarkers]="beforeMarkers()"
      [afterMarkers]="afterMarkers()"
      [beforeAllMarkers]="beforeAllMarkers()"
      [afterAllMarkers]="afterAllMarkers()"
      [beforeDiffMarkers]="beforeDiffMarkers()"
      [afterDiffMarkers]="afterDiffMarkers()"
      [beforeStateMarkers]="beforeStateMarkers()"
      [afterStateMarkers]="afterStateMarkers()"
      [beforeCategoryMarkers]="beforeCategoryMarkers()"
      [afterCategoryMarkers]="afterCategoryMarkers()" />
  `,
  providers: [
    {
      provide: CompareTraceService,
      useFactory: () => ({
        timelineViewMode: signal('category-overview')
      })
    }
  ]
})
class TestHostComponent {
  beforeLabel = signal('t1');
  afterLabel = signal('t2');
  beforeDuration = signal(500);
  afterDuration = signal(200);
  beforeMarkers = signal<TimelineMarkerShape[]>([
    {
      label: 'lifecycle',
      eventName: 'lifecycle:start:replace',
      position: 2,
      elapsed: 10
    },
    {
      label: 'pipeline',
      eventName: 'pipeline:candidate:resolve',
      position: 9,
      elapsed: 45
    }
  ]);
  afterMarkers = signal<TimelineMarkerShape[]>([
    {
      label: 'lifecycle',
      eventName: 'lifecycle:start:merge',
      position: 1,
      elapsed: 5
    }
  ]);
  beforeAllMarkers = signal<TimelineMarkerShape[]>([
    {
      label: 'all-before',
      eventName: 'all:before:event',
      position: 5,
      elapsed: 25
    }
  ]);
  afterAllMarkers = signal<TimelineMarkerShape[]>([
    {
      label: 'all-after',
      eventName: 'all:after:event',
      position: 3,
      elapsed: 15
    }
  ]);
  beforeDiffMarkers = signal<TimelineMarkerShape[]>([
    {
      label: 'diff-before',
      eventName: 'diff:before:event',
      position: 4,
      elapsed: 20
    }
  ]);
  afterDiffMarkers = signal<TimelineMarkerShape[]>([
    {
      label: 'diff-after',
      eventName: 'diff:after:event',
      position: 6,
      elapsed: 30
    }
  ]);
  beforeStateMarkers = signal<TimelineMarkerShape[]>([
    {
      label: 'state-before',
      eventName: 'state:before:event',
      position: 7,
      elapsed: 35
    }
  ]);
  afterStateMarkers = signal<TimelineMarkerShape[]>([
    {
      label: 'state-after',
      eventName: 'state:after:event',
      position: 8,
      elapsed: 40
    }
  ]);
  beforeCategoryMarkers = signal<TimelineMarkerShape[]>([
    {
      label: 'cat-before',
      eventName: 'cat:before:event',
      position: 10,
      elapsed: 50
    }
  ]);
  afterCategoryMarkers = signal<TimelineMarkerShape[]>([
    {
      label: 'cat-after',
      eventName: 'cat:after:event',
      position: 11,
      elapsed: 55
    }
  ]);
}

describe('CompareTimelineComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('should create the component', () => {
    const timeline = el.querySelector('sdux-compare-timeline');
    expect(timeline).toBeTruthy();
  });

  it('should display before and after labels', () => {
    const labels = el.querySelectorAll('.timeline-label');
    expect(labels[0].textContent).toContain('t1');
    expect(labels[1].textContent).toContain('t2');
  });

  it('should display durations', () => {
    const durations = el.querySelectorAll('.timeline-duration');
    expect(durations[0].textContent).toContain('500ms');
    expect(durations[1].textContent).toContain('200ms');
  });

  it('should render before markers', () => {
    const beforeTrack = el.querySelector('.before-track');
    const markers = beforeTrack!.querySelectorAll('.timeline-marker');
    expect(markers.length).toBe(2);
  });

  it('should render after markers', () => {
    const afterTrack = el.querySelector('.after-track');
    const markers = afterTrack!.querySelectorAll('.timeline-marker');
    expect(markers.length).toBe(1);
  });

  it('should show delta as faster when after is shorter', () => {
    const delta = el.querySelector('.summary-delta');
    expect(delta!.textContent).toContain('faster');
    expect(delta!.classList).toContain('faster');
  });

  it('should show delta as slower when after is longer', () => {
    host.beforeDuration.set(100);
    host.afterDuration.set(300);
    fixture.detectChanges();
    const delta = el.querySelector('.summary-delta');
    expect(delta!.textContent).toContain('slower');
    expect(delta!.classList).toContain('slower');
  });

  it('should show same speed when durations are equal', () => {
    host.beforeDuration.set(100);
    host.afterDuration.set(100);
    fixture.detectChanges();
    const delta = el.querySelector('.summary-delta');
    expect(delta!.textContent).toContain('same speed');
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

  it('should set before track width based on max duration', () => {
    const beforeTrack = el.querySelector('.before-track') as HTMLElement;
    expect(beforeTrack.style.width).toBe('100%');
  });

  it('should set after track width based on max duration', () => {
    const afterTrack = el.querySelector('.after-track') as HTMLElement;
    expect(afterTrack.style.width).toBe('40%');
  });

  it('should position markers via left style', () => {
    const markers = el.querySelectorAll(
      '.before-track .timeline-marker'
    ) as NodeListOf<HTMLElement>;
    expect(markers[0].style.left).toBe('2%');
    expect(markers[1].style.left).toBe('9%');
  });

  it('should show marker labels', () => {
    const labels = el.querySelectorAll('.before-track .marker-label');
    expect(labels[0].textContent).toContain('lifecycle');
    expect(labels[1].textContent).toContain('pipeline');
  });

  it('should return empty string when both durations are zero', () => {
    host.beforeDuration.set(0);
    host.afterDuration.set(0);
    fixture.detectChanges();
    const delta = el.querySelector('.summary-delta');
    expect(delta!.textContent!.trim()).toBe('');
  });

  describe('view mode switching', () => {
    let viewMode: WritableSignal<string>;

    beforeEach(() => {
      const service = fixture.debugElement.injector.get(CompareTraceService);
      viewMode = service.timelineViewMode as WritableSignal<string>;
    });

    it('should display all-events markers in all-events mode', () => {
      viewMode.set('all-events');
      fixture.detectChanges();
      const beforeTrack = el.querySelector('.before-track');
      const markers = beforeTrack!.querySelectorAll('.timeline-marker');
      expect(markers.length).toBe(1);
      expect(markers[0].querySelector('.marker-label')!.textContent).toContain(
        'all-before'
      );
    });

    it('should display diff-only markers in diff-only mode', () => {
      viewMode.set('diff-only');
      fixture.detectChanges();
      const beforeTrack = el.querySelector('.before-track');
      const markers = beforeTrack!.querySelectorAll('.timeline-marker');
      expect(markers.length).toBe(1);
      expect(markers[0].querySelector('.marker-label')!.textContent).toContain(
        'diff-before'
      );
    });

    it('should display state-only markers in state-only mode', () => {
      viewMode.set('state-only');
      fixture.detectChanges();
      const afterTrack = el.querySelector('.after-track');
      const markers = afterTrack!.querySelectorAll('.timeline-marker');
      expect(markers.length).toBe(1);
      expect(markers[0].querySelector('.marker-label')!.textContent).toContain(
        'state-after'
      );
    });

    it('should display category-filtered markers in category-filtered mode', () => {
      viewMode.set('category-filtered');
      fixture.detectChanges();
      const beforeTrack = el.querySelector('.before-track');
      const markers = beforeTrack!.querySelectorAll('.timeline-marker');
      expect(markers.length).toBe(1);
      expect(markers[0].querySelector('.marker-label')!.textContent).toContain(
        'cat-before'
      );
    });

    it('should use per-trace scaling (100% width) in non-overview modes', () => {
      viewMode.set('all-events');
      fixture.detectChanges();
      const beforeTrack = el.querySelector('.before-track') as HTMLElement;
      const afterTrack = el.querySelector('.after-track') as HTMLElement;
      expect(beforeTrack.style.width).toBe('100%');
      expect(afterTrack.style.width).toBe('100%');
    });

    it('should use proportional scaling in category-overview mode', () => {
      viewMode.set('category-overview');
      fixture.detectChanges();
      const afterTrack = el.querySelector('.after-track') as HTMLElement;
      expect(afterTrack.style.width).toBe('40%');
    });
  });

  describe('percentChange', () => {
    it('should show percentage decrease when after is shorter', () => {
      const content = el.querySelector('.timeline-content')!;
      const percentEl = content.querySelectorAll('.summary-delta');
      const texts = Array.from(percentEl).map((e) => e.textContent!.trim());
      expect(texts.some((t) => t.includes('↓') && t.includes('%'))).toBeTrue();
    });

    it('should show percentage increase when after is longer', () => {
      host.beforeDuration.set(100);
      host.afterDuration.set(300);
      fixture.detectChanges();
      const percentEls = el.querySelectorAll('.summary-delta');
      const texts = Array.from(percentEls).map((e) => e.textContent!.trim());
      expect(texts.some((t) => t.includes('↑') && t.includes('%'))).toBeTrue();
    });

    it('should show empty percent when durations are equal', () => {
      host.beforeDuration.set(100);
      host.afterDuration.set(100);
      fixture.detectChanges();
      const percentEls = el.querySelectorAll('.summary-delta');
      const texts = Array.from(percentEls).map((e) => e.textContent!.trim());
      expect(texts.every((t) => !t.includes('%'))).toBeTrue();
    });

    it('should show empty percent when before is zero', () => {
      host.beforeDuration.set(0);
      host.afterDuration.set(100);
      fixture.detectChanges();
      const percentEls = el.querySelectorAll('.summary-delta');
      const texts = Array.from(percentEls).map((e) => e.textContent!.trim());
      expect(texts.every((t) => !t.includes('%'))).toBeTrue();
    });
  });

  describe('categoryCount and eventCount', () => {
    it('should show category count in stats', () => {
      const stats = el.querySelector('.timeline-stats')!.textContent;
      expect(stats).toContain('2 categories');
    });

    it('should show event count in non-overview modes', () => {
      const service = fixture.debugElement.injector.get(CompareTraceService);
      (service.timelineViewMode as WritableSignal<string>).set('all-events');
      fixture.detectChanges();
      const stats = el.querySelector('.timeline-stats')!.textContent;
      expect(stats).toContain('events');
    });

    it('should not show event count in category-overview mode', () => {
      const stats = el.querySelector('.timeline-stats')!.textContent;
      expect(stats).not.toContain('events');
    });
  });

  describe('maxDuration', () => {
    it('should use at least 1 as max duration', () => {
      host.beforeDuration.set(0);
      host.afterDuration.set(0);
      fixture.detectChanges();
      const beforeTrack = el.querySelector('.before-track') as HTMLElement;
      expect(beforeTrack.style.width).toBe('0%');
    });
  });
});
