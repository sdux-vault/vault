import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { NavigationEnd, Router } from '@angular/router';
import {
  SDUX_CATCH_PHRASE,
  SDUX_BRAND_NAME,
  SDUX_FEATURE_CELL_BRAND_NAME,
  SDUX_VAULT_BRAND_NAME
} from '@sdux-vault/ui/web-components';
import { Subject } from 'rxjs';
import { RELATED_TOPICS_REGISTRY } from '../../docs/related-topic/constants/related-topics.registry';
import { SeoService } from './seo.service';

describe('Service: Seo', () => {
  let service: SeoService;
  let routerEvents$: Subject<unknown>;
  let document: Document;

  beforeEach(() => {
    routerEvents$ = new Subject();

    TestBed.configureTestingModule({
      providers: [
        SeoService,
        {
          provide: Router,
          useValue: { events: routerEvents$.asObservable() }
        },
        { provide: SDUX_BRAND_NAME, useValue: 'SDuX' },
        { provide: SDUX_VAULT_BRAND_NAME, useValue: 'SDuX Vault' },
        { provide: SDUX_FEATURE_CELL_BRAND_NAME, useValue: 'FeatureCell' },
        { provide: SDUX_CATCH_PHRASE, useValue: 'Plain TypeScript, Zero Magic' }
      ]
    });

    service = TestBed.inject(SeoService);
    document = TestBed.inject(DOCUMENT);
    removeSeoTags();
  });

  afterEach(() => {
    removeSeoTags();
  });

  function removeSeoTags(): void {
    document?.head
      .querySelectorAll(
        'link[rel="canonical"], meta[property="og:url"], meta[name="description"], meta[property="og:title"], meta[property="og:description"], meta[name="twitter:title"], meta[name="twitter:description"]'
      )
      .forEach((element) => element.remove());
  }

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create route-specific canonical and Open Graph URLs', () => {
    service.initialize();

    routerEvents$.next(
      new NavigationEnd(
        1,
        '/docs/references/types/log-level-type',
        '/docs/references/types/log-level-type'
      )
    );

    const canonicalUrl =
      'https://www.sdux-vault.com/docs/references/types/log-level-type';

    expect(
      document.head.querySelector('link[rel="canonical"]')?.getAttribute('href')
    ).toBe(canonicalUrl);
    expect(
      document.head
        .querySelector('meta[property="og:url"]')
        ?.getAttribute('content')
    ).toBe(canonicalUrl);
  });

  it('should apply title and description metadata from related topics', () => {
    service.initialize();

    routerEvents$.next(
      new NavigationEnd(
        1,
        '/docs/welcome/core-concepts',
        '/docs/welcome/core-concepts'
      )
    );

    expect(document.title).toContain('SDuX Vault Core Concepts');
    expect(
      document.head.querySelector<HTMLMetaElement>('meta[name="description"]')
        ?.content
    ).toContain('FeatureCell');
    expect(
      document.head.querySelector<HTMLMetaElement>('meta[property="og:title"]')
        ?.content
    ).toBe(document.title);
  });

  it('should apply default reference metadata when no related topic exists', () => {
    service.initialize();

    routerEvents$.next(
      new NavigationEnd(
        1,
        '/docs/references/types/log-level-type',
        '/docs/references/types/log-level-type'
      )
    );

    expect(document.title).toBe('Log Level Type — SDuX Vault Reference');
    expect(
      document.head.querySelector<HTMLMetaElement>('meta[name="description"]')
        ?.content
    ).toBe('Reference documentation for Log Level Type in SDuX Vault.');
  });

  it('should use an empty item list when a related-topic category has no items', () => {
    const category = RELATED_TOPICS_REGISTRY.categories.default;
    const items = category.items;
    category.items = undefined;

    try {
      service.initialize();
      routerEvents$.next(new NavigationEnd(1, '/unknown', '/unknown'));

      expect(document.title).toBe('Unknown — SDuX Vault Reference');
    } finally {
      category.items = items;
    }
  });

  it('should use the configured vault brand when the pathname has no segment', () => {
    const displayName = (
      service as unknown as { toDisplayName(pathname: string): string }
    ).toDisplayName('');

    expect(displayName).toBe('SDuX Vault');
  });

  it('should remove query strings and fragments from canonical URLs', () => {
    service.initialize();

    routerEvents$.next(
      new NavigationEnd(
        1,
        '/docs?framework=angular#example',
        '/docs?framework=angular#example'
      )
    );

    expect(
      document.head.querySelector('link[rel="canonical"]')?.getAttribute('href')
    ).toBe('https://www.sdux-vault.com/docs');
  });

  it('should use the site root when navigation has no pathname', () => {
    service.initialize();

    routerEvents$.next(new NavigationEnd(1, '', ''));

    expect(
      document.head.querySelector('link[rel="canonical"]')?.getAttribute('href')
    ).toBe('https://www.sdux-vault.com/');
  });

  it('should update existing canonical and Open Graph tags', () => {
    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = 'https://www.sdux-vault.com/';
    document.head.appendChild(canonical);

    const openGraphUrl = document.createElement('meta');
    openGraphUrl.setAttribute('property', 'og:url');
    openGraphUrl.setAttribute('content', 'https://www.sdux-vault.com/');
    document.head.appendChild(openGraphUrl);

    service.initialize();
    routerEvents$.next(new NavigationEnd(1, '/blog', '/blog'));

    expect(document.head.querySelectorAll('link[rel="canonical"]')).toHaveSize(
      1
    );
    expect(
      document.head.querySelectorAll('meta[property="og:url"]')
    ).toHaveSize(1);
    expect(canonical.href).toBe('https://www.sdux-vault.com/blog');
    expect(openGraphUrl.content).toBe('https://www.sdux-vault.com/blog');
  });

  it('should ignore non-navigation events', () => {
    service.initialize();
    routerEvents$.next({ type: 'other' });

    expect(document.head.querySelector('link[rel="canonical"]')).toBeNull();
    expect(document.head.querySelector('meta[property="og:url"]')).toBeNull();
  });
});
