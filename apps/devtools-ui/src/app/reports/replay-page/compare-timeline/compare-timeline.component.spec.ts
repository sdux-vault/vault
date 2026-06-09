import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
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
      [afterMarkers]="afterMarkers()" />
  `
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
});
