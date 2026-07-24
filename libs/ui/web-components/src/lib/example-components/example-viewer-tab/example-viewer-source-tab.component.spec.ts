import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
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
});
