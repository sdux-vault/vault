import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { VideoDialogService } from './service/video.dialog.service';
import { SDuXVideoComponent } from './video.component';

describe('Component: Video', () => {
  let fixture: ComponentFixture<SDuXVideoComponent>;
  let dialogService: jasmine.SpyObj<VideoDialogService>;

  beforeEach(async () => {
    dialogService = jasmine.createSpyObj('VideoDialogService', ['open']);

    await TestBed.configureTestingModule({
      imports: [SDuXVideoComponent],
      providers: [{ provide: VideoDialogService, useValue: dialogService }]
    }).compileComponents();

    fixture = TestBed.createComponent(SDuXVideoComponent);
  });

  describe('with all inputs', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('videoId', 'm7ClyWSh754');
      fixture.componentRef.setInput('start', 262);
      fixture.componentRef.setInput('tooltip', 'Pipeline Stages');
      fixture.detectChanges();
    });

    it('should render the tooltip as title', () => {
      const title = fixture.debugElement.query(By.css('.video-title'));
      expect(title.nativeElement.textContent).toBe('Pipeline Stages');
    });

    it('should generate the correct thumbnail URL', () => {
      const img = fixture.debugElement.query(By.css('img'));
      expect(img.nativeElement.src).toContain(
        'https://img.youtube.com/vi/m7ClyWSh754/mqdefault.jpg'
      );
    });

    it('should call VideoDialogService.open() when clicked', () => {
      const wrapper = fixture.debugElement.query(By.css('.video-wrapper'));
      wrapper.triggerEventHandler('click');

      expect(dialogService.open).toHaveBeenCalledOnceWith(
        'm7ClyWSh754',
        262,
        'Pipeline Stages'
      );
    });

    it('should call VideoDialogService.open() on Enter key', () => {
      const wrapper = fixture.debugElement.query(By.css('.video-wrapper'));
      wrapper.triggerEventHandler('keydown.enter');

      expect(dialogService.open).toHaveBeenCalledOnceWith(
        'm7ClyWSh754',
        262,
        'Pipeline Stages'
      );
    });
  });

  describe('with defaults', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('videoId', 'abc123');
      fixture.detectChanges();
    });

    it('should use default tooltip', () => {
      const title = fixture.debugElement.query(By.css('.video-title'));
      expect(title.nativeElement.textContent).toBe('Video');
    });

    it('should call open with undefined start', () => {
      const wrapper = fixture.debugElement.query(By.css('.video-wrapper'));
      wrapper.triggerEventHandler('click');

      expect(dialogService.open).toHaveBeenCalledOnceWith(
        'abc123',
        undefined,
        'Video'
      );
    });
  });
});
