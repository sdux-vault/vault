import { InjectionToken } from '@angular/core';

/**
 * Injection token used to provide the global SDUX vault brand name.
 *
 * Applications supply a string value for this token through their provider
 * configuration. The value may be displayed in UI components, tooltips,
 * ARIA labels, or anywhere the application requires a centralized,
 * user-defined product or brand name.
 */
export const SDUX_VAULT_BRAND_NAME = new InjectionToken<string>(
  'SDUX_VAULT_BRAND_NAME'
);
