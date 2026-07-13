import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import { VideoDialogService } from './service/video.dialog.service';
import { SDuXVideoComponent } from './video.component';

describe('Component: Video', () => {
  let fixture: ComponentFixture<SDuXVideoComponent>;
  let dialogService: jasmine.SpyObj<VideoDialogService>;
  let analyticsService: jasmine.SpyObj<AnalyticsService>;

  beforeEach(async () => {
    dialogService = jasmine.createSpyObj('VideoDialogService', ['open']);
    analyticsService = jasmine.createSpyObj('AnalyticsService', [
      'trackVideoInteraction'
    ]);

    await TestBed.configureTestingModule({
      imports: [SDuXVideoComponent],
      providers: [
        { provide: VideoDialogService, useValue: dialogService },
        { provide: AnalyticsService, useValue: analyticsService }
      ]
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
      expect(analyticsService.trackVideoInteraction).toHaveBeenCalledOnceWith({
        videoId: 'm7ClyWSh754',
        action: 'play'
      });
    });

    it('should call VideoDialogService.open() on Enter key', () => {
      const wrapper = fixture.debugElement.query(By.css('.video-wrapper'));
      wrapper.triggerEventHandler('keydown.enter');

      expect(dialogService.open).toHaveBeenCalledOnceWith(
        'm7ClyWSh754',
        262,
        'Pipeline Stages'
      );
      expect(analyticsService.trackVideoInteraction).toHaveBeenCalledOnceWith({
        videoId: 'm7ClyWSh754',
        action: 'play'
      });
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
      expect(analyticsService.trackVideoInteraction).toHaveBeenCalledOnceWith({
        videoId: 'abc123',
        action: 'play'
      });
    });
  });
});
