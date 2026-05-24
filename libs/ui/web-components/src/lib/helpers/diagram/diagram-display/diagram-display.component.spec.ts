import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { sduxTestingModule } from '../../../testing-module/sdux.testing.module';
import { DiagramDisplayComponent } from './diagram-display.component';

describe('Component: DiagramDisplayComponent', () => {
  let fixture: ComponentFixture<DiagramDisplayComponent>;
  let component: DiagramDisplayComponent;

  const createComponent = () => {
    fixture = TestBed.createComponent(DiagramDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiagramDisplayComponent, sduxTestingModule],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: { image: 'diagram.svg', tooltip: 'Example Diagram' }
        }
      ]
    }).compileComponents();
  });

  it('should create the component and inject dialog data', () => {
    createComponent();

    expect(component).toBeTruthy();
    expect(component.data).toEqual({
      image: 'diagram.svg',
      tooltip: 'Example Diagram'
    });
  });

  it('should render the diagram image', () => {
    createComponent();

    const image = fixture.debugElement.query(By.css('sdux-image'));
    expect(image).toBeTruthy();
  });

  it('zoomIn should increase zoom but not exceed max', () => {
    createComponent();

    component.zoom = 3.9;
    component.zoomIn();

    expect(component.zoom).toBeLessThanOrEqual(4);
  });

  it('zoomOut should decrease zoom but not go below 1', () => {
    createComponent();

    component.zoom = 1.1;
    component.zoomOut();

    expect(component.zoom).toBeGreaterThanOrEqual(1);
  });

  it('zoomOut should reset pan when zoom returns to 1', () => {
    createComponent();

    component.zoom = 1.1;
    component.panX = 100;
    component.panY = 100;

    component.zoomOut();

    expect(component.zoom).toBe(1);
    expect(component.panX).toBe(0);
    expect(component.panY).toBe(0);
  });

  it('reset should restore default zoom and pan', () => {
    createComponent();

    component.zoom = 2;
    component.panX = 50;
    component.panY = 75;

    component.reset();

    expect(component.zoom).toBe(1);
    expect(component.panX).toBe(0);
    expect(component.panY).toBe(0);
  });

  it('toggleZoom should toggle between 1 and 2', () => {
    createComponent();

    component.zoom = 1;
    component.toggleZoom();
    expect(component.zoom).toBe(2);

    component.toggleZoom();
    expect(component.zoom).toBe(1);
  });

  it('onWheel should zoom in when deltaY < 0', () => {
    createComponent();

    const event = {
      preventDefault: jasmine.createSpy(),
      deltaY: -100,
      clientX: 100,
      clientY: 100,
      currentTarget: {
        getBoundingClientRect: () => ({
          left: 0,
          top: 0
        })
      }
    } as unknown as WheelEvent;

    component.onWheel(event);

    expect(component.zoom).toBeGreaterThan(1);
  });

  it('onWheel should zoom out when deltaY > 0', () => {
    createComponent();

    component.zoom = 2;

    const event = {
      preventDefault: jasmine.createSpy(),
      deltaY: 100,
      clientX: 100,
      clientY: 100,
      currentTarget: {
        getBoundingClientRect: () => ({
          left: 0,
          top: 0
        })
      }
    } as unknown as WheelEvent;

    component.onWheel(event);

    expect(component.zoom).toBeLessThanOrEqual(2);
  });

  it('onWheel should reset pan when zoom returns to 1', () => {
    createComponent();

    component.zoom = 1;
    component.panX = 10;
    component.panY = 20;

    const event = {
      preventDefault: jasmine.createSpy(),
      deltaY: 200,
      clientX: 0,
      clientY: 0,
      currentTarget: {
        getBoundingClientRect: () => ({
          left: 0,
          top: 0
        })
      }
    } as unknown as WheelEvent;

    component.onWheel(event);

    expect(component.panX).toBe(0);
    expect(component.panY).toBe(0);
  });

  it('startPan should do nothing when zoom <= 1', () => {
    createComponent();

    component.zoom = 1;

    const event = {
      clientX: 100,
      clientY: 100,
      currentTarget: document.createElement('div'),
      target: document.createElement('div'),
      pointerId: 1
    } as unknown as PointerEvent;

    component.startPan(event);

    expect((component as any).isPanning).toBeFalse();
  });

  it('startPan should enable panning when zoom > 1', () => {
    createComponent();

    component.zoom = 2;

    const viewer = document.createElement('div');
    viewer.classList.add('diagram-viewer');

    const canvas = document.createElement('div');
    viewer.appendChild(canvas);

    spyOn(canvas, 'setPointerCapture');

    const event = {
      clientX: 100,
      clientY: 100,
      currentTarget: canvas,
      target: canvas,
      pointerId: 1
    } as unknown as PointerEvent;

    component.startPan(event);

    expect((component as any).isPanning).toBeTrue();
    expect(canvas.setPointerCapture).toHaveBeenCalled();
  });

  it('stopPan should disable panning and remove class', () => {
    createComponent();

    const viewer = document.createElement('div');
    viewer.classList.add('diagram-viewer', 'panning');

    const canvas = document.createElement('div');
    viewer.appendChild(canvas);

    const event = {
      currentTarget: canvas
    } as unknown as PointerEvent;

    component.stopPan(event);

    expect((component as any).isPanning).toBeFalse();
  });

  it('onPan should update pan coordinates when panning', () => {
    createComponent();

    (component as any).isPanning = true;
    (component as any).startX = 10;
    (component as any).startY = 20;

    const event = {
      clientX: 50,
      clientY: 70
    } as PointerEvent;

    component.onPan(event);

    expect(component.panX).toBe(40);
    expect(component.panY).toBe(50);
  });

  it('onPan should do nothing if not panning', () => {
    createComponent();

    (component as any).isPanning = false;

    const originalX = component.panX;
    const originalY = component.panY;

    component.onPan({ clientX: 200, clientY: 200 } as PointerEvent);

    expect(component.panX).toBe(originalX);
    expect(component.panY).toBe(originalY);
  });
});
