import { inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

declare let gtag: (...args: unknown[]) => void;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  #router = inject(Router);

  initialize(): void {
    this.#router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event) => {
        if (typeof gtag === 'function') {
          gtag('config', 'G-RCLLKRHBD0', {
            page_path: event.urlAfterRedirects
          });
        }
      });
  }
}
