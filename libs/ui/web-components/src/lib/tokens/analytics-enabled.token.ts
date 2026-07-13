import { InjectionToken } from '@angular/core';

/** Controls whether web-component analytics events may be sent. */
export const ANALYTICS_ENABLED = new InjectionToken<boolean>(
  'AnalyticsEnabled',
  {
    providedIn: 'root',
    factory: () => false
  }
);
