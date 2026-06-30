import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { VideoDisplayComponent } from './video-display.component';

describe('Component: VideoDisplay', () => {
  let fixture: ComponentFixture<VideoDisplayComponent>;
  let component: VideoDisplayComponent;

  describe('with start time', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [VideoDisplayComponent, MatDialogModule],
        providers: [
          {
            provide: MAT_DIALOG_DATA,
            useValue: {
              videoId: 'm7ClyWSh754',
              start: 262,
              tooltip: 'Pipeline Stages'
            }
          },
          provideZonelessChangeDetection()
        ]
      }).compileComponents();

      fixture = TestBed.createComponent(VideoDisplayComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render iframe with start parameter in src', () => {
      const iframe = fixture.nativeElement.querySelector('iframe');
      expect(iframe.src).toContain(
        'https://www.youtube-nocookie.com/embed/m7ClyWSh754?rel=0&start=262'
      );
    });

    it('should display the tooltip in the header', () => {
      const title = fixture.nativeElement.querySelector('.title');
      expect(title.textContent).toContain('Pipeline Stages');
    });
  });

  describe('without start time', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [VideoDisplayComponent, MatDialogModule],
        providers: [
          {
            provide: MAT_DIALOG_DATA,
            useValue: { videoId: 'abc123' }
          },
          provideZonelessChangeDetection()
        ]
      }).compileComponents();

      fixture = TestBed.createComponent(VideoDisplayComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should render iframe without start parameter', () => {
      const iframe = fixture.nativeElement.querySelector('iframe');
      expect(iframe.src).toContain(
        'https://www.youtube-nocookie.com/embed/abc123?rel=0'
      );
      expect(iframe.src).not.toContain('start=');
    });

    it('should display default tooltip when not provided', () => {
      const title = fixture.nativeElement.querySelector('.title');
      expect(title.textContent).toContain('SDuX Vault');
    });
  });
});
