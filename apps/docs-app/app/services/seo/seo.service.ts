import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import {
  BrandNameService,
  CatchPhraseService
} from '@sdux-vault/ui/web-components';
import { distinctUntilChanged, filter, map } from 'rxjs';
import { RELATED_TOPICS_REGISTRY } from '../../docs/related-topic/constants/related-topics.registry';

/**
 * Keeps route-level canonical and social URL metadata aligned with the active
 * application route.
 *
 * The static index.html metadata is the initial homepage fallback. This service
 * replaces that fallback after Angular navigation so every public route declares
 * its own canonical URL.
 */
@Injectable({
  providedIn: 'root'
})
export class SeoService {
  /** The single production origin used for canonical URLs. */
  static readonly canonicalOrigin = 'https://www.sdux-vault.com';

  #router = inject(Router);
  #document = inject(DOCUMENT);
  #meta = inject(Meta);
  #title = inject(Title);
  #brandName = inject(BrandNameService);
  #catchPhrase = inject(CatchPhraseService);

  /** Starts listening for completed navigations and synchronizing URL metadata. */
  initialize(): void {
    this.#router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        ),
        map((event) => this.#getPathname(event.urlAfterRedirects)),
        distinctUntilChanged()
      )
      .subscribe((pathname) => this.#applySeoMetadata(pathname));
  }

  /** Converts a router URL into a canonical URL without query strings or fragments. */
  #getPathname(url: string): string {
    const pathname = url.split(/[?#]/, 1)[0] || '/';
    return pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
  }

  #getCanonicalUrl(pathname: string): string {
    return `${SeoService.canonicalOrigin}${pathname}`;
  }

  /** Updates URL, title, and description metadata for the active route. */
  #applySeoMetadata(pathname: string): void {
    const canonicalUrl = this.#getCanonicalUrl(pathname);
    const metadata = this.#findMetadata(pathname);

    this.#title.setTitle(metadata.title);
    this.#meta.updateTag({
      name: 'description',
      content: metadata.description
    });
    this.#meta.updateTag({
      property: 'og:title',
      content: metadata.title
    });
    this.#meta.updateTag({
      property: 'og:description',
      content: metadata.description
    });
    this.#meta.updateTag({ name: 'twitter:title', content: metadata.title });
    this.#meta.updateTag({
      name: 'twitter:description',
      content: metadata.description
    });

    let canonicalLink = this.#document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]'
    );

    if (!canonicalLink) {
      canonicalLink = this.#document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      this.#document.head.appendChild(canonicalLink);
    }

    canonicalLink.setAttribute('href', canonicalUrl);

    let openGraphUrl = this.#document.head.querySelector<HTMLMetaElement>(
      'meta[property="og:url"]'
    );

    if (!openGraphUrl) {
      openGraphUrl = this.#document.createElement('meta');
      openGraphUrl.setAttribute('property', 'og:url');
      this.#document.head.appendChild(openGraphUrl);
    }

    openGraphUrl.setAttribute('content', canonicalUrl);
  }

  #findMetadata(pathname: string): {
    title: string;
    description: string;
  } {
    if (pathname === '/') {
      return {
        title: `${this.#brandName.value} — ${this.#catchPhrase.phrase}™`,
        description: `${this.#brandName.vaultValue} is a deterministic, reactive state-management library for TypeScript and JavaScript.`
      };
    }

    const categories = Object.values(RELATED_TOPICS_REGISTRY.categories);
    const category = categories.find((item) => item.baseRoute === pathname);
    const topic =
      category?.title && category.description
        ? { title: category.title, description: category.description }
        : categories
            .flatMap((item) => item.items ?? [])
            .find((item) => item.link === pathname);

    if (topic?.title && topic.description) {
      return { title: topic.title, description: topic.description };
    }

    const displayName = this.toDisplayName(pathname);
    return {
      title: `${displayName} — ${this.#brandName.vaultValue} Reference`,
      description: `Reference documentation for ${displayName} in ${this.#brandName.vaultValue}.`
    };
  }

  private toDisplayName(pathname: string): string {
    const segment =
      pathname.split('/').filter(Boolean).pop() ?? this.#brandName.vaultValue;
    return decodeURIComponent(segment)
      .replace(/[-_]+/g, ' ')
      .replace(/\b\w/g, (character) => character.toUpperCase());
  }
}
