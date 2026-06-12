import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TimelineZoomControlComponent } from './timeline-zoom-control.component';

describe('TimelineZoomControlComponent', () => {
  let component: TimelineZoomControlComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimelineZoomControlComponent],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    component = TestBed.createComponent(
      TimelineZoomControlComponent
    ).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default zoom to 1', () => {
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
    component.zoom.set(10);
    expect(component.canZoomIn()).toBeFalse();
    component.zoomIn();
    expect(component.zoom()).toBe(10);
  });

  it('should show zoom label as percentage', () => {
    expect(component.zoomLabel()).toBe('100%');
    component.zoomIn();
    expect(component.zoomLabel()).toBe('150%');
  });

  it('should reach maximum zoom level of 1000%', () => {
    for (let i = 0; i < 10; i++) component.zoomIn();
    expect(component.zoom()).toBe(10);
    expect(component.zoomLabel()).toBe('1000%');
  });

  it('should fallback to computed percentage for unknown zoom value', () => {
    component.zoom.set(5);
    expect(component.zoomLabel()).toBe('500%');
  });
});
