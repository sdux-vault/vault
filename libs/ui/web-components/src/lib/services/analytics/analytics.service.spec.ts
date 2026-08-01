import { TestBed } from '@angular/core/testing';
import { ANALYTICS_ENABLED } from '../../tokens/analytics-enabled.token';
import { AnalyticsService } from './analytics.service';

describe('Service: Analytics', () => {
  let service: AnalyticsService;
  let gtagSpy: jasmine.Spy;

  beforeEach(() => {
    gtagSpy = jasmine.createSpy('gtag');
    (window as unknown as Record<string, unknown>)['gtag'] = gtagSpy;

    TestBed.configureTestingModule({
      providers: [{ provide: ANALYTICS_ENABLED, useValue: true }]
    });
    service = TestBed.inject(AnalyticsService);
  });

  afterEach(() => {
    delete (window as unknown as Record<string, unknown>)['gtag'];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should track a launch', () => {
    service.trackStackblitzInteraction({
      exampleId: 'hydrate-state',
      framework: 'angular',
      action: 'launch'
    });

    expect(gtagSpy).toHaveBeenCalledOnceWith(
      'event',
      'stackblitz_interaction',
      {
        example_id: 'hydrate-state',
        framework: 'angular',
        action: 'launch'
      }
    );
  });

  it('should track a link copy', () => {
    service.trackStackblitzInteraction({
      exampleId: 'hydrate-state',
      framework: 'vue',
      action: 'copy'
    });

    expect(gtagSpy).toHaveBeenCalledOnceWith(
      'event',
      'stackblitz_interaction',
      {
        example_id: 'hydrate-state',
        framework: 'vue',
        action: 'copy'
      }
    );
  });

  it('should track a diagram click', () => {
    service.trackDiagramInteraction({
      diagramId: 'diagrams/test.svg',
      action: 'click'
    });

    expect(gtagSpy).toHaveBeenCalledOnceWith('event', 'diagram_interaction', {
      diagram_id: 'diagrams/test.svg',
      action: 'click'
    });
  });

  it('should not throw when tracking a diagram without gtag', () => {
    delete (window as unknown as Record<string, unknown>)['gtag'];

    expect(() =>
      service.trackDiagramInteraction({
        diagramId: 'diagrams/test.svg',
        action: 'click'
      })
    ).not.toThrow();
  });

  it('should track a video play', () => {
    service.trackVideoInteraction({
      videoId: 'm7ClyWSh754',
      action: 'play'
    });

    expect(gtagSpy).toHaveBeenCalledOnceWith('event', 'video_interaction', {
      video_id: 'm7ClyWSh754',
      action: 'play'
    });
  });

  it('should not throw when tracking a video without gtag', () => {
    delete (window as unknown as Record<string, unknown>)['gtag'];

    expect(() =>
      service.trackVideoInteraction({
        videoId: 'm7ClyWSh754',
        action: 'play'
      })
    ).not.toThrow();
  });

  it('should track a social share', () => {
    service.trackShareInteraction({
      contentType: 'post',
      contentUrl: 'https://www.sdux-vault.com/blog/test',
      platform: 'bluesky',
      action: 'share'
    });

    expect(gtagSpy).toHaveBeenCalledOnceWith('event', 'share_interaction', {
      content_type: 'post',
      content_url: 'https://www.sdux-vault.com/blog/test',
      platform: 'bluesky',
      action: 'share'
    });
  });

  it('should track a share-link copy', () => {
    service.trackShareInteraction({
      contentType: 'diagram',
      contentUrl: 'https://www.sdux-vault.com/docs/diagrams',
      platform: 'clipboard',
      action: 'copy'
    });

    expect(gtagSpy).toHaveBeenCalledOnceWith('event', 'share_interaction', {
      content_type: 'diagram',
      content_url: 'https://www.sdux-vault.com/docs/diagrams',
      platform: 'clipboard',
      action: 'copy'
    });
  });

  it('should track a file download', () => {
    service.trackDownloadInteraction('sdux-wordmark.svg');

    expect(gtagSpy).toHaveBeenCalledOnceWith('event', 'download_interaction', {
      file_name: 'sdux-wordmark.svg',
      action: 'download'
    });
  });

  it('should not throw when tracking a download without gtag', () => {
    delete (window as unknown as Record<string, unknown>)['gtag'];

    expect(() =>
      service.trackDownloadInteraction('sdux-wordmark.svg')
    ).not.toThrow();
  });

  it('should not throw when tracking a share without gtag', () => {
    delete (window as unknown as Record<string, unknown>)['gtag'];

    expect(() =>
      service.trackShareInteraction({
        contentType: 'post',
        contentUrl: 'https://www.sdux-vault.com/blog/test',
        platform: 'x',
        action: 'share'
      })
    ).not.toThrow();
  });

  it('should not throw when gtag is not defined', () => {
    delete (window as unknown as Record<string, unknown>)['gtag'];

    expect(() =>
      service.trackStackblitzInteraction({
        exampleId: 'hydrate-state',
        framework: 'angular',
        action: 'launch'
      })
    ).not.toThrow();
  });

  it('should not track interactions when analytics is disabled', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [{ provide: ANALYTICS_ENABLED, useValue: false }]
    });
    service = TestBed.inject(AnalyticsService);

    service.trackStackblitzInteraction({
      exampleId: 'hydrate-state',
      framework: 'angular',
      action: 'launch'
    });
    service.trackDiagramInteraction({
      diagramId: 'diagrams/test.svg',
      action: 'click'
    });
    service.trackVideoInteraction({
      videoId: 'm7ClyWSh754',
      action: 'play'
    });
    service.trackShareInteraction({
      contentType: 'post',
      contentUrl: 'https://www.sdux-vault.com/blog/test',
      platform: 'x',
      action: 'share'
    });
    service.trackDownloadInteraction('sdux-wordmark.svg');

    expect(gtagSpy).not.toHaveBeenCalled();
  });
});
