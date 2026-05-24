import { ElementRef, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import Prism from 'prismjs';
import { ExampleViewerTabComponent } from './example-viewer-source-tab.component';

// --- Begin Tests ---
describe('Component: ExampleViewerTabBody', () => {
  let fixture: ComponentFixture<ExampleViewerTabComponent>;
  let component: ExampleViewerTabComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleViewerTabComponent],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleViewerTabComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('label', 'the label');

    fixture.detectChanges();
  });

  it('should have a label', () => {
    expect(component.label()).toBe('the label');
  });

  it('should call Prism.highlightElement when codeElement exists', () => {
    // Spy on Prism
    const prismSpy = spyOn(Prism, 'highlightElement');

    // Mock a code element
    const mockNative = document.createElement('code');
    component.codeElement = new ElementRef(mockNative);

    // Manually call lifecycle hook
    component.ngAfterViewInit();

    expect(prismSpy).toHaveBeenCalledWith(mockNative);
  });

  it('should NOT call Prism.highlightElement when codeElement is undefined', () => {
    const prismSpy = spyOn(Prism, 'highlightElement');

    // Ensure it's undefined
    (component as any).codeElement = undefined;

    component.ngAfterViewInit();

    expect(prismSpy).not.toHaveBeenCalled();
  });
});
