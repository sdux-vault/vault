import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { WINDOW } from '../../tokens/window.token';
import { ExampleViewerService } from '../services/example-viewer.service';
import { ExampleViewerHeaderComponent } from './example-viewer-header.component';

// Create a mock service
class MockExampleViewerService {
  toggle = jasmine.createSpy('toggle');
}

describe('Component: ExampleViewerHeader', () => {
  let fixture: ComponentFixture<ExampleViewerHeaderComponent>;
  let component: ExampleViewerHeaderComponent;
  let mockService: MockExampleViewerService;
  const mockWindow = {
    location: {
      origin: 'https://example.com',
      pathname: '/docs/page'
    }
  } as Window;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleViewerHeaderComponent, MatIconModule, MatTooltipModule],
      providers: [
        { provide: ExampleViewerService, useClass: MockExampleViewerService },
        { provide: WINDOW, useValue: mockWindow },
        provideZonelessChangeDetection()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleViewerHeaderComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('title', 'My Title');
    fixture.componentRef.setInput('subTitle', 'A Subtitle');
    fixture.componentRef.setInput('exampleId', 'abc-123');
    fixture.detectChanges();
    mockService = TestBed.inject(ExampleViewerService) as any;
  });

  // ────────────────────────────────────────────────────────────
  // INPUTS
  // ────────────────────────────────────────────────────────────

  it('should accept title, subTitle, and exampleId inputs', () => {
    expect(component.title()).toBe('My Title');
    expect(component.subTitle()).toBe('A Subtitle');
    expect(component.exampleId()).toBe('abc-123');
  });

  // ────────────────────────────────────────────────────────────
  // COPY LINK
  // ────────────────────────────────────────────────────────────

  it('should copy the correct URL and toggle copySuccess using mock timers', () => {
    jasmine.clock().install();

    const writeSpy = spyOn(navigator.clipboard, 'writeText').and.returnValue(
      Promise.resolve()
    );

    const expectedUrl = `https://example.com/docs/page#abc-123`;

    component.copyLink();

    // Clipboard was called
    expect(writeSpy).toHaveBeenCalledOnceWith(expectedUrl);

    // Immediately true
    expect(component.copySuccess()).toBeTrue();

    // Fast-forward 2 seconds
    jasmine.clock().tick(2000);

    // Should now reset
    expect(component.copySuccess()).toBeFalse();

    jasmine.clock().uninstall();
  });

  // ────────────────────────────────────────────────────────────
  // TOGGLE SOURCE PANEL
  // ────────────────────────────────────────────────────────────

  it('should toggle isOpen signal and call ExampleViewerService.toggle', () => {
    expect(component.isOpen()).toBeFalse();

    component.toggleSource();
    expect(component.isOpen()).toBeTrue();
    expect(mockService.toggle).toHaveBeenCalledOnceWith('abc-123');

    component.toggleSource();
    expect(component.isOpen()).toBeFalse();
    expect(mockService.toggle).toHaveBeenCalledTimes(2);
  });

  // ────────────────────────────────────────────────────────────
  // TEMPLATE RENDERING (BASIC)
  // ────────────────────────────────────────────────────────────

  it('should render title and subtitle in template', () => {
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('My Title');
    expect(compiled.textContent).toContain('A Subtitle');
  });
});
