import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import type { EventShape } from '@sdux-vault/shared';
import { DevtoolsAggregateService } from '../../services/devtools-aggregate.service';
import { DevtoolsRegistryService } from '../../services/registry/devtools-registry.service';
import { CollapsibleSectionComponent } from '../../shared/collapsible-section/collapsible-section.component';
import { DetailPaneComponent } from '../../shared/detail-pane/detail-pane.component';
import { ExportButtonComponent } from '../../shared/export-button/export-button.component';
import { HelpToggleComponent } from '../../shared/help-toggle/help-toggle.component';
import { PipelineFlowComponent } from '../../shared/pipeline-flow/pipeline-flow.component';
import { ResetButtonComponent } from '../../shared/reset-button/reset-button.component';
import { LeftRightNavigationDirective } from '../../shared/shortcuts/left-right-navigation/left-right-navigation.directive';
import { UpsellNoticeComponent } from '../../shared/upsell-notice/upsell-notice.component';
import { DevtoolsPipelineEventDetailComponent } from '../events/panels/events/pipeline/detail/devtools-pipeline-event-detail.component';
import { StateTableViewComponent } from '../state-diff-view/state-table-view/state-table-view.component';
import { InspectorTimelineComponent } from './inspector-timeline/inspector-timeline.component';
import { ExtensionInspectorService } from './service/extension-inspector.service';

/**
 * Extension Inspector page component.
 *
 * Provides a dedicated view for engineers writing custom controllers
 * and behaviors. Filters all pipeline data to a single extension key
 * and shows duration statistics across traces.
 */
@Component({
  selector: 'sdux-extension-inspector',
  standalone: true,
  imports: [
    MatIconModule,
    MatSelectModule,
    MatTooltipModule,
    CollapsibleSectionComponent,
    DetailPaneComponent,
    DevtoolsPipelineEventDetailComponent,
    ExportButtonComponent,
    HelpToggleComponent,
    InspectorTimelineComponent,
    LeftRightNavigationDirective,
    PipelineFlowComponent,
    ResetButtonComponent,
    StateTableViewComponent,
    UpsellNoticeComponent
  ],
  providers: [ExtensionInspectorService],
  templateUrl: './extension-inspector.component.html',
  styleUrls: [
    '../scss/reports-common.scss',
    './extension-inspector.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExtensionInspectorComponent {
  /** Aggregate service providing trace data. */
  readonly #aggregate = inject(DevtoolsAggregateService);

  /** Registry service providing license state. */
  readonly #registry = inject(DevtoolsRegistryService);

  /** Inspector service owning all inspection state. */
  readonly inspector = inject(ExtensionInspectorService);

  /** Whether the current license enables pro/enterprise features. */
  readonly isLicensed = this.#registry.isLicensed;

  /** All unique cell keys from loaded traces. */
  readonly cellKeys = computed(() => {
    return Array.from(this.#aggregate.tracesByCellKey().keys()).sort();
  });

  /** Currently selected cell key. */
  readonly selectedCellKey = signal<string>('');

  /** Traces for the selected cell. */
  readonly cellTraces = computed(() => {
    const key = this.selectedCellKey();
    if (!key) return [];
    return this.#aggregate.tracesByCellKey().get(key) ?? [];
  });

  /** Auto-select the first cell key when traces become available. */
  readonly #autoSelectCellKey = effect(() => {
    const keys = this.cellKeys();
    if (keys.length > 0 && !this.selectedCellKey()) {
      this.selectedCellKey.set(keys[0]);
    }
  });

  /** Keep the inspector service in sync whenever cellTraces changes. */
  readonly #syncTraces = effect(() => {
    this.inspector.cellTraces.set(this.cellTraces());
  });

  /** Auto-select the first extension key when keys become available. */
  readonly #autoSelectKey = effect(() => {
    const keys = this.inspector.extensionKeys();
    if (keys.length > 0 && !this.inspector.selectedKey()) {
      this.inspector.selectedKey.set(keys[0]);
    }
  });

  /**
   * Handles cell key selection changes.
   *
   * @param key - The newly selected cell key.
   */
  onCellKeyChange(key: string): void {
    this.selectedCellKey.set(key);
    this.inspector.selectedKey.set('');
  }

  /**
   * Handles extension key selection changes.
   *
   * @param key - The newly selected extension key.
   */
  onKeyChange(key: string): void {
    this.inspector.selectedKey.set(key);
  }

  /**
   * Formats a `::` delimited key for display.
   *
   * @param key - Raw key in `a::b::c::d` format.
   * @returns Formatted string as `c d (b)`.
   */
  formatKey(key: string): string {
    const parts = key.split('::');
    if (parts.length >= 4) {
      return `${parts[2]} ${parts[3]} (${parts[1]})`;
    }
    return key;
  }

  /**
   * Extracts a display label from a candidate event name.
   *
   * Splits the stage segment on `-` and capitalizes each word.
   *
   * @param event - The candidate event.
   * @returns Formatted label (e.g. `pipeline:candidate:core-state` → `Core State`).
   */
  candidateLabel(event: EventShape): string {
    const parts = event.name.split(':');
    const stage = parts.length >= 3 ? parts[parts.length - 1] : event.name;
    return stage
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }

  /** Whether the state comparison section is expanded. */
  readonly stateExpanded = signal(true);

  /** Whether to show only changed keys in candidate diffs. */
  readonly showChangedOnly = signal(false);

  /**
   * Labeled candidate table configurations.
   *
   * First entry is standalone (Pipeline Start). Remaining entries are
   * after-only diffs against their predecessor. Duplicate stage names
   * get a numeric suffix (e.g. Filter 1, Filter 2).
   */
  readonly candidateTableConfigs = computed(() => {
    const candidates = this.inspector.candidateEvents();
    if (candidates.length === 0) return [];

    const nameCounts = new Map<string, number>();
    const nameOccurrences = new Map<string, number>();
    for (const c of candidates) {
      const base = this.candidateLabel(c);
      nameCounts.set(base, (nameCounts.get(base) ?? 0) + 1);
    }

    const labels: string[] = [];
    for (const c of candidates) {
      const base = this.candidateLabel(c);
      const total = nameCounts.get(base) ?? 1;
      if (total > 1) {
        const idx = (nameOccurrences.get(base) ?? 0) + 1;
        nameOccurrences.set(base, idx);
        labels.push(`${base} ${idx}`);
      } else {
        labels.push(base);
      }
    }

    const configs: {
      label: string;
      beforeValue: unknown;
      afterValue: unknown;
      standalone: boolean;
    }[] = [
      {
        label: labels[0],
        beforeValue: candidates[0].candidate,
        afterValue: candidates[0].candidate,
        standalone: true
      }
    ];

    for (let i = 1; i < candidates.length; i++) {
      configs.push({
        label: labels[i],
        beforeValue: candidates[i - 1].candidate,
        afterValue: candidates[i].candidate,
        standalone: false
      });
    }

    return configs;
  });

  /** Whether the detail panel is visible. */
  readonly showDetail = signal(false);

  /** Resets all selections. */
  reset(): void {
    this.selectedCellKey.set('');
    this.inspector.selectedKey.set('');
    this.inspector.cellTraces.set([]);
    this.inspector.selectedExecutionIndex.set(0);
    this.showDetail.set(false);
  }

  /** Opens the detail panel. */
  openDetail(): void {
    this.showDetail.set(true);
  }

  /** Closes the detail panel. */
  closeDetail(): void {
    this.showDetail.set(false);
  }
}
