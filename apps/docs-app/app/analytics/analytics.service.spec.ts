import { TestBed } from '@angular/core/testing';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AnalyticsService } from './analytics.service';

describe('Service: Analytics', () => {
  let service: AnalyticsService;
  let routerEvents$: Subject<unknown>;

  beforeEach(() => {
    routerEvents$ = new Subject();

    TestBed.configureTestingModule({
      providers: [
        AnalyticsService,
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

  it('should call gtag on NavigationEnd', () => {
    const gtagSpy = jasmine.createSpy('gtag');
    (window as unknown as Record<string, unknown>)['gtag'] = gtagSpy;

    service.initialize();
    routerEvents$.next(new NavigationEnd(1, '/docs', '/docs'));

    expect(gtagSpy).toHaveBeenCalledWith('config', 'G-RCLLKRHBD0', {
      page_path: '/docs'
    });
  });

  it('should use urlAfterRedirects for page_path', () => {
    const gtagSpy = jasmine.createSpy('gtag');
    (window as unknown as Record<string, unknown>)['gtag'] = gtagSpy;

    service.initialize();
    routerEvents$.next(new NavigationEnd(1, '/old', '/redirected'));

    expect(gtagSpy).toHaveBeenCalledWith('config', 'G-RCLLKRHBD0', {
      page_path: '/redirected'
    });
  });

  it('should not throw when gtag is not defined', () => {
    service.initialize();

    expect(() => {
      routerEvents$.next(new NavigationEnd(1, '/docs', '/docs'));
    }).not.toThrow();
  });

  it('should ignore non-NavigationEnd events', () => {
    const gtagSpy = jasmine.createSpy('gtag');
    (window as unknown as Record<string, unknown>)['gtag'] = gtagSpy;

    service.initialize();
    routerEvents$.next({ type: 'other' });

    expect(gtagSpy).not.toHaveBeenCalled();
  });
});
