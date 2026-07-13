import { inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ANALYTICS_ENABLED } from '@sdux-vault/ui/web-components';
import { distinctUntilChanged, filter, map } from 'rxjs';

declare let gtag: (...args: unknown[]) => void;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  #router = inject(Router);
  #analyticsEnabled = inject(ANALYTICS_ENABLED);

  initialize(): void {
    if (!this.#analyticsEnabled) {
      return;
    }

    this.#router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        ),
        map((event) => this.#getPathname(event.urlAfterRedirects)),
        distinctUntilChanged()
      )
      .subscribe((pathname) => {
        if (typeof gtag === 'function') {
          gtag('event', 'page_view', {
            page_title: document.title,
            page_location: `${window.location.origin}${pathname}`
          });
        }
      });
  }

  #getPathname(url: string): string {
    return url.split(/[?#]/, 1)[0] || '/';
  }
}
