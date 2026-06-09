import { signal, type WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CompareTraceService } from '../compare-trace.service';
import { TimelineZoomControlComponent } from './timeline-zoom-control.component';

describe('TimelineZoomControlComponent', () => {
  let component: TimelineZoomControlComponent;
  let zoomSignal: WritableSignal<number>;

  beforeEach(async () => {
    zoomSignal = signal(1);

    await TestBed.configureTestingModule({
      imports: [TimelineZoomControlComponent],
      providers: [
        {
          provide: CompareTraceService,
          useValue: {
            timelineZoom: zoomSignal
          }
        }
      ]
    }).compileComponents();

    component = TestBed.createComponent(
      TimelineZoomControlComponent
    ).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose zoom from CompareTraceService', () => {
    expect(component.zoom()).toBe(1);
  });

  it('should not allow zoom out at minimum level', () => {
    expect(component.canZoomOut()).toBeFalse();
  });

  it('should allow zoom in at minimum level', () => {
    expect(component.canZoomIn()).toBeTrue();
  });

  it('should zoom in one step', () => {
    component.zoomIn();
    expect(component.zoom()).toBe(1.5);
  });

  it('should zoom in multiple steps', () => {
    component.zoomIn();
    component.zoomIn();
    expect(component.zoom()).toBe(2);
  });

  it('should zoom out after zooming in', () => {
    component.zoomIn();
    component.zoomIn();
    component.zoomOut();
    expect(component.zoom()).toBe(1.5);
  });

  it('should not zoom out below minimum', () => {
    component.zoomOut();
    expect(component.zoom()).toBe(1);
  });

  it('should not zoom in beyond maximum', () => {
    zoomSignal.set(6);
    expect(component.canZoomIn()).toBeFalse();
    component.zoomIn();
    expect(component.zoom()).toBe(6);
  });

  it('should show zoom label as percentage', () => {
    expect(component.zoomLabel()).toBe('100%');
    component.zoomIn();
    expect(component.zoomLabel()).toBe('150%');
  });

  it('should reach maximum zoom level of 600%', () => {
    for (let i = 0; i < 10; i++) component.zoomIn();
    expect(component.zoom()).toBe(6);
    expect(component.zoomLabel()).toBe('600%');
  });
});
