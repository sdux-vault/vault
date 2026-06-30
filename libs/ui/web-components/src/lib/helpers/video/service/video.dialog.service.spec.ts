import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { VideoDisplayComponent } from '../video-display/video-display.component';
import { VideoDialogService } from './video.dialog.service';

describe('Service: VideoDialog', () => {
  let service: VideoDialogService;
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
        VideoDialogService,
        { provide: MatDialog, useValue: dialogSpy },
        provideZonelessChangeDetection()
      ]
    });

    service = TestBed.inject(VideoDialogService);
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

  it('should open the dialog with videoId', () => {
    service.open('m7ClyWSh754');

    expect(dialogSpy.open).toHaveBeenCalledOnceWith(
      VideoDisplayComponent,
      jasmine.objectContaining({
        width: '819px',
        height: '571px',
        maxWidth: '90vw',
        maxHeight: '90vh',
        data: { videoId: 'm7ClyWSh754', start: undefined, tooltip: undefined },
        panelClass: 'sdux-video-dialog-panel'
      })
    );
  });

  it('should pass start and tooltip when provided', () => {
    service.open('m7ClyWSh754', 262, 'Pipeline Stages');

    expect(dialogSpy.open).toHaveBeenCalledOnceWith(
      VideoDisplayComponent,
      jasmine.objectContaining({
        data: {
          videoId: 'm7ClyWSh754',
          start: 262,
          tooltip: 'Pipeline Stages'
        }
      })
    );
  });

  it('should always set required dialog config properties', () => {
    service.open('abc123');
    const config = dialogSpy.open.calls.mostRecent().args[1]! as any;
    expect(config.panelClass).toBe('sdux-video-dialog-panel');
    expect(config.data.videoId).toBe('abc123');
  });
});
