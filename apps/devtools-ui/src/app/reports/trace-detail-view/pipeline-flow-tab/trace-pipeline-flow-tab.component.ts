import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input
} from '@angular/core';
import { DevtoolsRegistryService } from '../../../services/registry/devtools-registry.service';
import { PipelineFlowComponent } from '../../../shared/components/pipeline-flow/pipeline-flow.component';
import { UpsellNoticeComponent } from '../../../shared/components/upsell-notice/upsell-notice.component';
import type { TraceExecutionShape } from '../../../shared/shapes/trace';

/**
 * Pipeline Flow tab wrapper component.
 *
 * Self-contained component that handles license gating, cell key
 * resolution, and delegates rendering to the shared
 * {@link PipelineFlowComponent}. Shows an upsell notice when the
 * user is unlicensed.
 */
@Component({
  selector: 'sdux-trace-pipeline-flow-tab',
  standalone: true,
  imports: [PipelineFlowComponent, UpsellNoticeComponent],
  templateUrl: './trace-pipeline-flow-tab.component.html',
  styleUrl: './trace-pipeline-flow-tab.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TracePipelineFlowTabComponent {
  /** Registry service providing license state. */
  #registry = inject(DevtoolsRegistryService);

  /** Whether the current license enables pro/enterprise features. */
  readonly isLicensed = this.#registry.isLicensed;

  /** The trace to visualize. */
  readonly trace = input.required<TraceExecutionShape>();

  /** The cell key for the expanded trace. */
  readonly cellKey = input.required<string | null>();

  /** Resolved cell key when available. */
  readonly resolvedCellKey = computed(() => this.cellKey());
}
