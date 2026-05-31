import { Routes } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { DevToolsSplashPageComponent } from './splash-page/devtools-splash-page.component';

/**
 * Routing configuration for the Vault DevTools application.
 *
 * The DevTools UI consists of a single splash/entry page. Any unknown
 * or unmatched route redirects back to the root path to maintain a stable
 * and predictable navigation flow, which is required in browser extension
 * environments where deep-linking is not supported.
 *
 * This routing table intentionally contains no lazy loading or nested
 * segments, ensuring deterministic startup and compatibility with the
 * extension sandbox.
 */
export const routes: Routes = [
  /** Primary entry route for the DevTools splash interface. */
  { path: '', component: DevToolsSplashPageComponent },

  /** Dedicated events route for the tabbed event viewer. */
  { path: 'events', component: EventsComponent },

  /** Catch-all route that redirects invalid paths back to the root. */
  { path: '**', redirectTo: '' }
];
