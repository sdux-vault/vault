import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input
} from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import type { VaultRegistrationEntityShape } from '@sdux-vault/shared';

/**
 * Standalone presentational component rendering a single pipeline
 * node with an optional license badge and detail text.
 *
 * Used inside {@link PipelineFlowComponent} to display behavior,
 * controller, and fluent-API stage entries in the pipeline diagram.
 */
@Component({
  selector: 'sdux-devtools-pipeline-node',
  standalone: true,
  imports: [MatTooltipModule],
  templateUrl: './pipeline-node.component.html',
  styleUrl: './pipeline-node.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PipelineNodeComponent {
  /** Optional explicit label. When omitted, derived from behavior key. */
  readonly label = input<string>('');

  /** Optional detail text shown on the right (e.g. duration or domain). */
  readonly detail = input<string>('');

  /** Optional tooltip shown on hover over the label. */
  readonly tooltip = input<string>('');

  /** Optional informational tooltip shown via a help icon next to the label. */
  readonly infoTooltip = input<string>('');

  /** Optional behavior/controller entity providing license metadata. */
  readonly behavior = input<VaultRegistrationEntityShape>();

  /** Resolved display label: explicit label or name extracted from behavior key. */
  readonly displayLabel = computed(
    () => this.label() || this.vaultKeyName(this.behavior()?.key ?? '')
  );

  /**
   * Extracts the Name segment from a Vault key.
   *
   * @param key - A key in the format `SDUX::<Kind>::<Domain>::<Name>`.
   * @returns The `<Name>` segment, or the full key if the format is unexpected.
   */
  vaultKeyName(key: string): string {
    const parts = key.split('::');
    return parts.length === 4 ? parts[3] : key;
  }
}
