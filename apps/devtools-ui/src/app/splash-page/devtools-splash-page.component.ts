import { Component, computed, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { DevtoolsMainPipelinePanelComponent } from '../panels/pipeline/main/devtools-main-pipeline-panel.component';
import { DevtoolsService } from '../services/devtools.service';

/**
 * Root splash-page component for the ngSDuX DevTools application.
 *
 * This component renders the primary tabbed interface for viewing
 * pipeline and queue events emitted by the Vault instrumentation layer.
 * It aggregates DevTools service state and exposes event counts for UI
 * display. It also activates a global insight override to ensure that
 * all monitors emit complete state, payload, queue, and error data.
 *
 * The component is standalone and imports only the minimal panel
 * components needed to render the DevTools interface.
 */
@Component({
  selector: 'sdux-devtools-splash-page',
  standalone: true,
  imports: [MatTabsModule, DevtoolsMainPipelinePanelComponent],
  templateUrl: './devtools-splash-page.component.html',
  styleUrl: './devtools-splash-page.component.scss'
})
export class DevToolsSplashPageComponent {
  /** Internal service providing access to DevTools event streams. */
  private devtools = inject(DevtoolsService);

  /** Reactive list of pipeline events used to populate the UI. */
  readonly events = computed(() => this.devtools.events());

  /** Total number of pipeline events currently stored. */
  readonly totalEvents = computed(() => this.events()?.length);

  /**
   * Clears the current FeatureCell-backed pipeline event history.
   */
  clearEvents(): void {
    this.devtools.clearEvents();
  }

  /**
   * The constructor
   */
  constructor() {
    // Request full insight emission across all monitors for DevTools UI.
    window.sdux?.vaultMonitorInstance?.activateGlobalInsights({
      id: 'dev-tools',
      wantsState: true,
      wantsPayload: true,
      wantsErrors: true
    });
  }
}
