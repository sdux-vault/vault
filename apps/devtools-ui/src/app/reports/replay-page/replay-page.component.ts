import { JsonPipe, SlicePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SDuXShape } from '@sdux-vault/shared';
import { DevtoolsAggregateService } from '../../services/devtools-aggregate.service';
import { DevtoolsRegistryService } from '../../services/registry/devtools-registry.service';
import type { TraceExecutionShape } from '../../shapes/trace';
import { ExportButtonComponent } from '../../shared/export-button/export-button.component';
import { UpsellNoticeComponent } from '../../shared/upsell-notice/upsell-notice.component';

/**
 * Determines whether a trace used replaceState or mergeState by
 * inspecting its event names for lifecycle start markers.
 *
 * @param trace - The trace execution to inspect.
 * @returns 'replace' or 'merge' based on the lifecycle event found.
 */
function resolveDispatchMethod(
  trace: TraceExecutionShape
): 'replace' | 'merge' {
  for (const event of trace.events) {
    if (event.name === 'lifecycle:start:merge') return 'merge';
    if (event.name === 'lifecycle:start:replace') return 'replace';
  }
  return 'replace';
}

/**
 * Extracts the resolved pipeline candidate value from the
 * pipeline:candidate:resolve event in a trace.
 *
 * @param trace - The trace execution to inspect.
 * @returns The resolved candidate value, or undefined if not found.
 */
function extractResolvedValue(trace: TraceExecutionShape): unknown | undefined {
  for (const event of trace.events) {
    if (
      event.name === 'pipeline:candidate:resolve' &&
      event.candidate != null
    ) {
      return event.candidate;
    }
  }

  return undefined;
}

/**
 * Page component for replaying trace data through live FeatureCell instances.
 *
 * Reads traces from the aggregate service, allows the user to select a
 * cell and trace, then dispatches the resolved value through the live
 * cell's replaceState or mergeState method via globalThis.sdux.replay.
 */
@Component({
  selector: 'sdux-replay-page',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,
    SlicePipe,
    MatFormFieldModule,
    MatSelectModule,
    MatTooltipModule,
    ExportButtonComponent,
    UpsellNoticeComponent
  ],
  templateUrl: './replay-page.component.html',
  styleUrls: ['../scss/reports-common.scss', './replay-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReplayPageComponent {
  /** Aggregate service providing trace data. */
  #aggregate = inject(DevtoolsAggregateService);

  /** Registry service providing license state. */
  #registry = inject(DevtoolsRegistryService);

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

  /** Currently selected trace ID. */
  readonly selectedTraceId = signal<string>('');

  /** The selected trace object. */
  readonly selectedTrace = computed(() => {
    const traceId = this.selectedTraceId();
    if (!traceId) return undefined;
    return this.cellTraces().find((t) => t.traceId === traceId);
  });

  /** Resolved dispatch method for the selected trace. */
  readonly dispatchMethod = computed(() => {
    const trace = this.selectedTrace();
    if (!trace) return undefined;
    return resolveDispatchMethod(trace);
  });

  /** Resolved value from the selected trace. */
  readonly resolvedValue = computed(() => {
    const trace = this.selectedTrace();
    if (!trace) return undefined;
    return extractResolvedValue(trace);
  });

  /** Result message after replay attempt. */
  readonly resultMessage = signal<string>('');

  /** Whether the last replay was an error. */
  readonly resultIsError = signal<boolean>(false);

  /**
   * Handles cell key selection changes.
   *
   * @param key - The selected cell key.
   */
  onCellKeyChange(key: string): void {
    this.selectedCellKey.set(key);
    this.selectedTraceId.set('');
    this.resultMessage.set('');
  }

  /**
   * Handles trace ID selection changes.
   *
   * @param traceId - The selected trace ID.
   */
  onTraceIdChange(traceId: string): void {
    this.selectedTraceId.set(traceId);
    this.resultMessage.set('');
  }

  /**
   * Replays the selected trace through the live FeatureCell instance.
   *
   * Reads the cell from globalThis.sdux.replay.getCell(), determines
   * whether to use replaceState or mergeState from the trace events,
   * and dispatches the resolved value.
   */
  replay(): void {
    const cellKey = this.selectedCellKey();
    const value = this.resolvedValue();
    const method = this.dispatchMethod();

    if (!cellKey || value === undefined || !method) {
      this.resultIsError.set(true);
      this.resultMessage.set(
        'Missing cell key, resolved value, or dispatch method.'
      );
      return;
    }

    const sdux: SDuXShape | undefined = globalThis.sdux;
    const cell = sdux?.replay?.getCell(cellKey) as
      | { mergeState: (v: unknown) => void; replaceState: (v: unknown) => void }
      | undefined;

    if (!cell) {
      this.resultIsError.set(true);
      this.resultMessage.set(
        `No live cell found for "${cellKey}". Ensure the application is running with DevMode enabled.`
      );
      return;
    }

    try {
      if (method === 'merge') {
        cell.mergeState(value);
      } else {
        cell.replaceState(value);
      }

      this.resultIsError.set(false);
      this.resultMessage.set(
        `Replayed via ${method}State to "${cellKey}" successfully.`
      );
    } catch (error: unknown) {
      this.resultIsError.set(true);
      this.resultMessage.set(
        `Replay failed: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }
}
