import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MatTooltip } from '@angular/material/tooltip';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import { SDuXDownloadComponent } from './download.component';

describe('Component: Download', () => {
  let fixture: ComponentFixture<SDuXDownloadComponent>;
  let analyticsService: jasmine.SpyObj<AnalyticsService>;

  beforeEach(async () => {
    analyticsService = jasmine.createSpyObj('AnalyticsService', [
      'trackDownloadInteraction'
    ]);

    await TestBed.configureTestingModule({
      imports: [SDuXDownloadComponent],
      providers: [{ provide: AnalyticsService, useValue: analyticsService }]
    }).compileComponents();

    fixture = TestBed.createComponent(SDuXDownloadComponent);
    fixture.componentRef.setInput('url', '/downloads/example.tutorial.zip');
    fixture.detectChanges();
  });

  it('should render a tooltip-enabled 40px download icon', () => {
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    const icon = fixture.debugElement.query(By.css('mat-icon')).nativeElement;
    const tooltip = fixture.debugElement
      .query(By.directive(MatTooltip))
      .injector.get(MatTooltip);

    expect(button.type).toBe('button');
    expect(
      fixture.debugElement.query(By.css('.framework-icon-group'))
    ).not.toBeNull();
    expect(button.className).toContain('framework-icon-button');
    expect(button.getAttribute('aria-label')).toBe('Download');
    expect(icon.className).toContain('framework-icon');
    expect(icon.textContent.trim()).toBe('download');
    const overlay = fixture.debugElement.queryAll(By.css('mat-icon'))[1]
      .nativeElement as HTMLElement;
    expect(overlay.className).toContain('launch-overlay-icon');
    expect(overlay.textContent?.trim()).toBe('file_download');
    expect(tooltip.message).toBe('Download');
  });

  it('should use the tooltip input for the accessible label and tooltip', () => {
    fixture.componentRef.setInput('tooltip', 'Download tutorial');
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    const tooltip = fixture.debugElement
      .query(By.directive(MatTooltip))
      .injector.get(MatTooltip);

    expect(button.getAttribute('aria-label')).toBe('Download tutorial');
    expect(tooltip.message).toBe('Download tutorial');
  });

  it('should track the download and click a temporary anchor', () => {
    const createElement = spyOn(document, 'createElement').and.callThrough();
    const click = spyOn(HTMLAnchorElement.prototype, 'click');

    fixture.debugElement.query(By.css('button')).triggerEventHandler('click');

    const anchor = createElement.calls.mostRecent()
      .returnValue as HTMLAnchorElement;
    expect(analyticsService.trackDownloadInteraction).toHaveBeenCalledOnceWith(
      'example.tutorial.zip'
    );
    expect(anchor.href).toContain('/downloads/example.tutorial.zip');
    expect(anchor.download).toBe('example.tutorial.zip');
    expect(click).toHaveBeenCalledOnceWith();
    expect(document.body.contains(anchor)).toBeFalse();
  });

  it('should use a fallback name for a URL without a file path', () => {
    fixture.componentRef.setInput('url', 'https://example.com/');
    fixture.detectChanges();
    spyOn(HTMLAnchorElement.prototype, 'click');

    fixture.componentInstance.download();

    expect(analyticsService.trackDownloadInteraction).toHaveBeenCalledWith(
      'download'
    );
  });

  it('should use an empty filename fallback when the pathname has no segments', () => {
    spyOn(window, 'URL').and.returnValue({
      pathname: { split: () => [] }
    } as unknown as URL);
    spyOn(HTMLAnchorElement.prototype, 'click');

    fixture.componentInstance.download();

    expect(analyticsService.trackDownloadInteraction).toHaveBeenCalledWith(
      'download'
    );
  });

  it('should use a fallback name when the URL filename is not decodable', () => {
    fixture.componentRef.setInput('url', '/downloads/%E0%A4%A');
    fixture.detectChanges();
    spyOn(HTMLAnchorElement.prototype, 'click');

    fixture.componentInstance.download();

    expect(analyticsService.trackDownloadInteraction).toHaveBeenCalledWith(
      'download'
    );
  });
});
