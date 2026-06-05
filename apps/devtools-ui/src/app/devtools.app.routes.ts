import { Routes } from '@angular/router';
import { ConfigurationComponent } from './configuration/configuration.component';
import { EventsComponent } from './events/events.component';
import { HotStageRankingPageComponent } from './reports/hot-stage-ranking-page/hot-stage-ranking-page.component';
import { TraceDetailViewComponent } from './reports/trace-detail-view/trace-detail-view.component';
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

  /** Trace Detail View report — ordered event table per trace. */
  { path: 'reports/trace-detail', component: TraceDetailViewComponent },

  /** Hot Stage Ranking report — aggregate stage duration analysis. */
  {
    path: 'reports/hot-stage-ranking',
    component: HotStageRankingPageComponent
  },

  /** Configuration route for managing Vault settings. */
  { path: 'configuration', component: ConfigurationComponent },

  /** Catch-all route that redirects invalid paths back to the root. */
  { path: '**', redirectTo: '' }
];
