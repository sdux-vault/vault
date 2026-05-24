import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleViewerBodyComponent } from './example-viewer-body.component';

// --- Begin Tests ---
describe('Component: ExampleViewerBody', () => {
  let fixture: ComponentFixture<ExampleViewerBodyComponent>;
  let component: ExampleViewerBodyComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleViewerBodyComponent],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleViewerBodyComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should be truthy', () => {
    expect(component).toBeTruthy();
  });
});
