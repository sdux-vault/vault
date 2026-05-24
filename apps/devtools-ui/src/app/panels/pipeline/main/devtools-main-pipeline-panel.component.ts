import { Component, computed, inject } from '@angular/core';
import { DevtoolsService } from '../../../services/devtools.service';
import { DevtoolsPipelineEventComponent } from '../../events/pipeline/devtools-pipeline-event.component';

/**
 * Main DevTools panel for displaying the pipeline execution history.
 *
 * This component renders the ordered list of pipeline events emitted by
 * all FeatureCells, excluding DevTools-internal telemetry. It delegates
 * state sourcing to `VaultDevtoolsService` and exposes read-only computed
 * signals for template binding.
 *
 * The panel itself contains no business logic; it is purely presentational
 * and updates reactively as the underlying event stream changes.
 */
@Component({
  selector: 'sdux-devtools-main-pipeline-panel',
  standalone: true,
  imports: [DevtoolsPipelineEventComponent],
  templateUrl: './devtools-main-pipeline-panel.component.html',
  styleUrl: './devtools-main-pipeline-panel.component.scss'
})
export class DevtoolsMainPipelinePanelComponent {
  /** Injected DevTools state provider. */
  private devtools = inject(DevtoolsService);

  /**
   * Reactive list of all pipeline events emitted by FeatureCells.
   * Automatically updates as the DevTools service receives new telemetry.
   */
  readonly events = computed(() => this.devtools.events());

  /** Total number of pipeline events emitted so far. */
  readonly totalEvents = this.devtools.totalEvents;
}
