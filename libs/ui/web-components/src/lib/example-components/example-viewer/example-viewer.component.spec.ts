import { provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WINDOW } from '../../tokens/window.token';
import { ExampleViewerService } from '../services/example-viewer.service';
import { ExampleViewerComponent } from './example-viewer.component';

describe('Component: ExampleViewer', () => {
  let fixture: ComponentFixture<ExampleViewerComponent>;
  let component: ExampleViewerComponent;
  let mockService: jasmine.SpyObj<ExampleViewerService>;

  beforeEach(() => {
    mockService = jasmine.createSpyObj<ExampleViewerService>(
      'ExampleViewerService',
      ['getVisibilitySignal']
    );

    TestBed.configureTestingModule({
      imports: [ExampleViewerComponent],
      providers: [
        { provide: ExampleViewerService, useValue: mockService },
        {
          provide: WINDOW,
          useValue: {
            location: { origin: 'https://test.com', pathname: '/test' }
          }
        },
        provideZonelessChangeDetection()
      ]
    });

    fixture = TestBed.createComponent(ExampleViewerComponent);
    component = fixture.componentInstance;
  });

  function setInput<T>(name: string, value: T) {
    fixture.componentRef.setInput(name, value);
    fixture.detectChanges();
  }

  // -------------------------------------------------------------------
  // Input: exampleId — empty or falsy should yield sourceVisible = false
  // -------------------------------------------------------------------

  it('should return false when exampleId is empty string', () => {
    setInput('exampleId', '');

    expect(component.sourceVisible()).toBeFalse();
    expect(mockService.getVisibilitySignal).not.toHaveBeenCalled();
  });

  it('should return false when exampleId is not provided', () => {
    // default is '' because input<string>('')
    fixture.detectChanges();

    expect(component.sourceVisible()).toBeFalse();
    expect(mockService.getVisibilitySignal).not.toHaveBeenCalled();
  });

  // -------------------------------------------------------------------
  // Valid exampleId → uses service.getVisibilitySignal()
  // -------------------------------------------------------------------

  it('should return the value of the service signal when exampleId is set', () => {
    const vis = signal(true);
    mockService.getVisibilitySignal.and.returnValue(vis);

    setInput('exampleId', 'ex-1');

    expect(mockService.getVisibilitySignal).toHaveBeenCalledWith('ex-1');
    expect(component.sourceVisible()).toBeTrue();
  });

  it('should recompute when the underlying visibility signal changes', () => {
    const vis = signal(false);
    mockService.getVisibilitySignal.and.returnValue(vis);

    setInput('exampleId', 'ex-2');

    expect(component.sourceVisible()).toBeFalse();

    // Now flip the underlying service signal
    vis.set(true);
    fixture.detectChanges();

    expect(component.sourceVisible()).toBeTrue();
  });

  // -------------------------------------------------------------------
  // Validate title and subTitle inputs behave as signals correctly
  // -------------------------------------------------------------------

  it('should update title input dynamically', () => {
    setInput('title', 'Hello World');
    expect(component.title()).toBe('Hello World');
  });

  it('should update subTitle input dynamically', () => {
    setInput('subTitle', 'Subtitle Here');
    expect(component.subTitle()).toBe('Subtitle Here');
  });

  // -------------------------------------------------------------------
  // Validate that sourceVisible = false when service signal is false
  // -------------------------------------------------------------------

  it('should return false when service signal returns false', () => {
    const vis = signal(false);
    mockService.getVisibilitySignal.and.returnValue(vis);

    setInput('exampleId', 'ex-3');

    expect(component.sourceVisible()).toBeFalse();
  });
});
