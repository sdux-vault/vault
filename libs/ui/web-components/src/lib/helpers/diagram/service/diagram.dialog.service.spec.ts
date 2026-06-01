import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { DiagramDisplayComponent } from '../diagram-display/diagram-display.component';
import { DiagramDialogService } from './diagram.dialog.service';

describe('Service: DiagramDialog', () => {
  let service: DiagramDialogService;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let originalInnerWidth: number;
  let originalInnerHeight: number;

  beforeEach(() => {
    originalInnerWidth = window.innerWidth;
    originalInnerHeight = window.innerHeight;
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 768
    });

    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      providers: [
        DiagramDialogService,
        { provide: MatDialog, useValue: dialogSpy },
        provideZonelessChangeDetection()
      ]
    });

    service = TestBed.inject(DiagramDialogService);
  });

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: originalInnerHeight
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open the dialog with required image', () => {
    service.open('diagrams/foo.svg', 2, 1);

    expect(dialogSpy.open).toHaveBeenCalledOnceWith(
      DiagramDisplayComponent,
      jasmine.objectContaining({
        width: '819px',
        height: '520px',
        maxWidth: '90vw',
        maxHeight: '90vh',
        data: Object({ image: 'diagrams/foo.svg', tooltip: undefined }),
        panelClass: 'sdux-diagram-dialog-panel'
      })
    );
  });

  it('should pass tooltip when provided', () => {
    service.open('diagrams/bar.svg', 1, 2, 'My Diagram');

    expect(dialogSpy.open).toHaveBeenCalledOnceWith(
      DiagramDisplayComponent,
      jasmine.objectContaining({
        data: {
          image: 'diagrams/bar.svg',
          tooltip: 'My Diagram'
        }
      })
    );
  });

  it('should not mutate input parameters', () => {
    const img = 'diagrams/x.svg';
    const tip = 'x tooltip';

    service.open(img, 2, 2, tip);

    const callArg = dialogSpy.open.calls.mostRecent().args[1]!.data as any;

    expect(callArg.image).toBe(img);
    expect(callArg.tooltip).toBe(tip);

    // ensure service does not alter inputs
    expect(img).toBe('diagrams/x.svg');
    expect(tip).toBe('x tooltip');
  });

  it('should always set required dialog config properties', () => {
    service.open('diagrams/abc.svg', 3, 1);

    const config = dialogSpy.open.calls.mostRecent().args[1]! as any;

    expect(config.width).toBe('819px');
    expect(config.height).toBe('383px');
    expect(config.panelClass).toBe('sdux-diagram-dialog-panel');
    expect(config.data.image).toBe('diagrams/abc.svg');
  });
});
