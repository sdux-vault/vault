import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
  signal
} from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DevtoolsRegistryService } from '../../../services/registry/devtools-registry.service';
import { DetailPaneComponent } from '../../../shared/detail-pane/detail-pane.component';
import { PipelineFlowComponent } from '../../../shared/pipeline-flow/pipeline-flow.component';

/**
 * Detail panel displaying the pipeline flow and the behaviors and
 * controllers registered on a single FeatureCell.
 *
 * Receives a cell key and looks up the registry entry from the
 * {@link DevtoolsRegistryService}. Delegates the pipeline flow
 * diagram to {@link PipelineFlowComponent} and the panel chrome
 * to the shared `DetailPaneComponent`.
 */
@Component({
  selector: 'sdux-devtools-registry-detail',
  standalone: true,
  imports: [DetailPaneComponent, PipelineFlowComponent, MatTooltipModule],
  templateUrl: './registry-detail.component.html',
  styleUrl: './registry-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistryDetailComponent {
  /** Registry service providing FeatureCell lookup by key. */
  #registryService = inject(DevtoolsRegistryService);

  /** The FeatureCell key used to look up registry data. */
  readonly cellKey = input.required<string>();

  /** The resolved registry entry for the given cell key. */
  readonly cell = computed(() => this.#registryService.getCell(this.cellKey()));

  /** Emits when the user closes the detail panel. */
  readonly closeDetail = output<void>();

  /** Behavior entities extracted from the registry cell. */
  readonly behaviors = computed(() => this.cell()?.behaviors ?? []);

  /** Controller entities extracted from the registry cell. */
  readonly controllers = computed(() => this.cell()?.controllers ?? []);

  /** Whether the behaviors section is expanded. */
  readonly behaviorsExpanded = signal(true);

  /** Whether the controllers section is expanded. */
  readonly controllersExpanded = signal(true);

  /** Behaviors sorted alphabetically by key. */
  readonly sortedBehaviors = computed(() =>
    [...this.behaviors()].sort((a, b) => a.key.localeCompare(b.key))
  );

  /** Controllers sorted alphabetically by key. */
  readonly sortedControllers = computed(() =>
    [...this.controllers()].sort((a, b) => a.key.localeCompare(b.key))
  );

  /**
   * Extracts the Domain and Name segments from a Vault key.
   *
   * @param key - A key in the format `SDUX::<Kind>::<Domain>::<Name>`.
   * @returns `<Domain> <Name>`, or the full key if the format is unexpected.
   */
  vaultKeyDomainName(key: string): string {
    const parts = key.split('::');
    return parts.length === 4 ? `${parts[2]} ${parts[3]}` : key;
  }
}
