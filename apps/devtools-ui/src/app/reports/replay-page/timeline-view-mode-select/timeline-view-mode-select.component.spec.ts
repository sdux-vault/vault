import { signal, type WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CompareTraceService } from '../compare-trace.service';
import { TimelineViewModeSelectComponent } from './timeline-view-mode-select.component';

describe('TimelineViewModeSelectComponent', () => {
  let component: TimelineViewModeSelectComponent;
  let viewModeSignal: WritableSignal<string>;

  beforeEach(async () => {
    viewModeSignal = signal('category-overview');

    await TestBed.configureTestingModule({
      imports: [TimelineViewModeSelectComponent],
      providers: [
        {
          provide: CompareTraceService,
          useValue: {
            timelineViewMode: viewModeSignal
          }
        }
      ]
    }).compileComponents();

    component = TestBed.createComponent(
      TimelineViewModeSelectComponent
    ).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose viewMode from CompareTraceService', () => {
    expect(component.viewMode()).toBe('category-overview');
  });

  it('should reflect external viewMode changes', () => {
    viewModeSignal.set('diff-only');
    expect(component.viewMode()).toBe('diff-only');
  });

  it('should allow setting viewMode directly', () => {
    component.viewMode.set('waterfall');
    expect(viewModeSignal()).toBe('waterfall');
  });
});
