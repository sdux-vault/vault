import { InjectionToken } from '@angular/core';

/**
 * Injection token used to provide a global, application-defined catch phrase.
 *
 * Applications supply a string value for this token in their configuration
 * (such as during bootstrap or within an NgModule provider list). The value is
 * then consumed by UI components—most commonly the `<catch-phrase>` component—
 * to display a consistent, centrally configured branding or tagline.
 *
 * This token enables flexible customization without hard-coding text inside
 * components, keeping the UI theming and branding system fully configurable.
 */
export const SDUX_CATCH_PHRASE = new InjectionToken<string>(
  'SDUX_CATCH_PHRASE'
);
