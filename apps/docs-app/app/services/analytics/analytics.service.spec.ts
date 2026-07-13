import { TestBed } from '@angular/core/testing';
import { NavigationEnd, Router } from '@angular/router';
import { ANALYTICS_ENABLED } from '@sdux-vault/ui/web-components';
import { Subject } from 'rxjs';
import { AnalyticsService } from './analytics.service';

describe('Service: Analytics', () => {
  let service: AnalyticsService;
  let routerEvents$: Subject<unknown>;
  let gtagSpy: jasmine.Spy;

  beforeEach(() => {
    routerEvents$ = new Subject();
    gtagSpy = jasmine.createSpy('gtag');
    (window as unknown as Record<string, unknown>)['gtag'] = gtagSpy;

    TestBed.configureTestingModule({
      providers: [
        AnalyticsService,
        { provide: ANALYTICS_ENABLED, useValue: true },
        {
          provide: Router,
          useValue: { events: routerEvents$.asObservable() }
        }
      ]
    });

    service = TestBed.inject(AnalyticsService);
  });

  afterEach(() => {
    delete (window as unknown as Record<string, unknown>)['gtag'];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send exactly one page view for the initial navigation', () => {
    service.initialize();

    routerEvents$.next(new NavigationEnd(1, '/docs', '/docs'));

    expect(gtagSpy).toHaveBeenCalledOnceWith('event', 'page_view', {
      page_title: document.title,
      page_location: `${window.location.origin}/docs`
    });
  });

  it('should use urlAfterRedirects for the page location', () => {
    service.initialize();

    routerEvents$.next(new NavigationEnd(1, '/old', '/redirected'));

    expect(gtagSpy).toHaveBeenCalledOnceWith('event', 'page_view', {
      page_title: document.title,
      page_location: `${window.location.origin}/redirected`
    });
  });

  it('should not send another page view for fragment-only changes', () => {
    service.initialize();

    routerEvents$.next(new NavigationEnd(1, '/docs', '/docs'));
    routerEvents$.next(new NavigationEnd(2, '/docs#example', '/docs#example'));

    expect(gtagSpy).toHaveBeenCalledTimes(1);
  });

  it('should not send another page view for query-string-only changes', () => {
    service.initialize();

    routerEvents$.next(new NavigationEnd(1, '/docs', '/docs'));
    routerEvents$.next(
      new NavigationEnd(2, '/docs?framework=angular', '/docs?framework=angular')
    );

    expect(gtagSpy).toHaveBeenCalledTimes(1);
  });

  it('should send another page view when the pathname changes', () => {
    service.initialize();

    routerEvents$.next(new NavigationEnd(1, '/docs', '/docs'));
    routerEvents$.next(new NavigationEnd(2, '/blog', '/blog'));

    expect(gtagSpy).toHaveBeenCalledTimes(2);
    expect(gtagSpy).toHaveBeenCalledWith('event', 'page_view', {
      page_title: document.title,
      page_location: `${window.location.origin}/blog`
    });
  });

  it('should use the root pathname when the URL has no pathname', () => {
    service.initialize();

    routerEvents$.next(new NavigationEnd(1, '#section', '#section'));

    expect(gtagSpy).toHaveBeenCalledOnceWith('event', 'page_view', {
      page_title: document.title,
      page_location: `${window.location.origin}/`
    });
  });

  it('should not throw when gtag is not defined', () => {
    delete (window as unknown as Record<string, unknown>)['gtag'];
    service.initialize();

    expect(() => {
      routerEvents$.next(new NavigationEnd(1, '/docs', '/docs'));
    }).not.toThrow();
  });

  it('should ignore non-NavigationEnd events', () => {
    service.initialize();

    routerEvents$.next({ type: 'other' });

    expect(gtagSpy).not.toHaveBeenCalled();
  });

  it('should not subscribe to page views when analytics is disabled', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        AnalyticsService,
        { provide: ANALYTICS_ENABLED, useValue: false },
        {
          provide: Router,
          useValue: { events: routerEvents$.asObservable() }
        }
      ]
    });
    service = TestBed.inject(AnalyticsService);

    service.initialize();
    routerEvents$.next(new NavigationEnd(1, '/docs', '/docs'));

    expect(gtagSpy).not.toHaveBeenCalled();
  });
});
