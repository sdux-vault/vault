import { InjectionToken } from '@angular/core';

/** Injection token providing a reference to the browser Window object (undefined in SSR). */
export const WINDOW = new InjectionToken<Window | undefined>('WindowToken');
