import { Routes } from '@angular/router';
import { AiAssistPageComponent } from './reports/ai-assist-page/ai-assist-page.component';
import { EventsComponent } from './reports/events/events.component';
import { ExtensionInspectorComponent } from './reports/extension-inspector/extension-inspector.component';
import { HotStageRankingPageComponent } from './reports/hot-stage-ranking-page/hot-stage-ranking-page.component';
import { LoadDumpPageComponent } from './reports/load-dump-page/load-dump-page.component';
import { ReplayPageComponent } from './reports/replay-page/replay-page.component';
import { StateDiffViewComponent } from './reports/state-diff-view/state-diff-view.component';
import { TraceDetailViewComponent } from './reports/trace-detail-view/trace-detail-view.component';
import { TraceExportPageComponent } from './reports/trace-export-page/trace-export-page.component';
import { VaultOverviewComponent } from './reports/vault-overview/vault-overview.component';
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

  /** AI Assist — export debug dump and AI analysis prompt. */
  { path: 'reports/ai-assist', component: AiAssistPageComponent },

  /** Trace Detail View report — ordered event table per trace. */
  { path: 'reports/trace-detail', component: TraceDetailViewComponent },

  /** Hot Stage Ranking report — aggregate stage duration analysis. */
  {
    path: 'reports/hot-stage-ranking',
    component: HotStageRankingPageComponent
  },

  /** State Diff View report — side-by-side pipeline candidate comparison. */
  { path: 'reports/state-diff', component: StateDiffViewComponent },

  /** Load Dump — import exported debug dump files. */
  { path: 'reports/load-dump', component: LoadDumpPageComponent },

  /** Pipeline Replay — replay traces through live FeatureCell instances. */
  { path: 'reports/replay', component: ReplayPageComponent },

  /** Vault Overview report — registry, versions, and license details. */
  { path: 'reports/vault-overview', component: VaultOverviewComponent },

  /** Extension Inspector — per-key performance analysis (licensed). */
  {
    path: 'reports/extension-inspector',
    component: ExtensionInspectorComponent
  },

  /** Chrome Trace Export — download pipeline traces as Chrome flame charts. */
  {
    path: 'reports/trace-export',
    component: TraceExportPageComponent
  },

  /** Catch-all route that redirects invalid paths back to the root. */
  { path: '**', redirectTo: '' }
];
