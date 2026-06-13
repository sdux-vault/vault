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
import { diffJson, type Change } from 'diff';
import { DevtoolsAggregateService } from '../../services/devtools-aggregate.service';
import { DevtoolsRegistryService } from '../../services/registry/devtools-registry.service';
import { CollapsibleSectionComponent } from '../../shared/components/collapsible-section/collapsible-section.component';
import { ExportButtonComponent } from '../../shared/components/export-button/export-button.component';
import { HelpToggleComponent } from '../../shared/components/help-toggle/help-toggle.component';
import { ResetButtonComponent } from '../../shared/components/reset-button/reset-button.component';
import { UpsellNoticeComponent } from '../../shared/components/upsell-notice/upsell-notice.component';
import { LeftRightNavigationDirective } from '../../shared/directives/left-right-navigation/left-right-navigation.directive';
import type {
  CandidateSnapshotShape,
  TraceExecutionShape
} from '../../shared/shapes/trace';
import { TraceExecutionStatuses } from '../../shared/shapes/trace';
import { StateTableViewComponent } from './state-table-view/state-table-view.component';

/**
 * State Diff View report component.
 *
 * Displays side-by-side before/after comparisons of pipeline candidate
 * snapshots within a single trace. Users select a trace and navigate
 * between adjacent snapshot pairs to visualize how state transforms
 * through the pipeline stages.
 */
@Component({
  selector: 'sdux-state-diff-view',
  standalone: true,
  imports: [
    MatIconModule,
    MatSelectModule,
    MatTooltipModule,
    CollapsibleSectionComponent,
    ExportButtonComponent,
    HelpToggleComponent,
    LeftRightNavigationDirective,
    ResetButtonComponent,
    StateTableViewComponent,
    UpsellNoticeComponent
  ],
  templateUrl: './state-diff-view.component.html',
  styleUrls: [
    '../scss/reports-common.scss',
    './state-diff-view.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StateDiffViewComponent {
  /** Internal reference to the trace aggregate FeatureCell service. */
  #aggregate = inject(DevtoolsAggregateService);

  /** Registry service providing license state. */
  #registry = inject(DevtoolsRegistryService);

  /** Whether the current license enables pro/enterprise features. */
  readonly isLicensed = this.#registry.isLicensed;

  /** All completed traces from the aggregate service. */
  readonly traces = this.#aggregate.traces;

  /** Available cell keys for filtering. */
  readonly cellKeys = computed(() => {
    const keys = [...this.#aggregate.tracesByCellKey().keys()];
    return keys.sort();
  });

  /** Currently selected cell filter ('all' = no filter). */
  readonly selectedCell = signal<string>('all');

  /** Currently selected trace ID. */
  readonly selectedTraceId = signal<string | null>(null);

  /** Index of the "before" snapshot in the selected pair (0-based). */
  readonly beforeIndex = signal<number>(0);

  /** Index of the "after" snapshot in the selected pair (0-based). */
  readonly afterIndex = signal<number>(1);

  /** Active view mode for snapshot display ('diff' or 'table'). */
  readonly viewMode = signal<'diff' | 'table'>('diff');

  /** Whether to show only changed keys/lines in the diff and table views. */
  readonly showChangedOnly = signal(false);

  /** Whether the mutation graph section is expanded. */
  readonly showMutationGraph = signal(true);

  /**
   * Computes the state mutation graph data from candidates.
   * Computes the state mutation graph from the selected trace's candidates.
   * Each row is a candidate pair; each column is a pipeline stage.
   * A dot indicates the candidate value changed in that pair comparison.
   */
  readonly mutationGraph = computed(() => {
    const list = this.candidates();
    if (list.length < 2)
      return {
        stages: [] as string[],
        rows: [] as { label: string; pairIndex: number; cells: boolean[] }[]
      };

    const stages: string[] = list.map((c) => c.stage);
    const rows: { label: string; pairIndex: number; cells: boolean[] }[] = [];

    for (let i = 1; i < list.length; i++) {
      const previous = list[i - 1].value;
      const current = list[i].value;
      const mutated = JSON.stringify(previous) !== JSON.stringify(current);

      const cells = stages.map((_, idx) => idx === i && mutated);
      rows.push({
        label: `${list[i - 1].stage} → ${list[i].stage}`,
        pairIndex: i - 1,
        cells
      });
    }

    return { stages, rows };
  });

  /** Traces filtered by cell selection. */
  readonly filteredTraces = computed(() => {
    const cell = this.selectedCell();
    let traces = this.traces();
    if (cell !== 'all') {
      traces = traces.filter((t) => t.cellKey === cell);
    }
    return [...traces].sort((a, b) => a.startedAt - b.startedAt);
  });

  /** Maps traceId → sequential label (t1, t2, …) per cell key. */
  readonly traceLabels = computed(() => {
    const traces = this.filteredTraces();
    const counters = new Map<string, number>();
    const labels = new Map<string, string>();
    for (const trace of traces) {
      const count = (counters.get(trace.cellKey) ?? 0) + 1;
      counters.set(trace.cellKey, count);
      labels.set(trace.traceId, `t${count}`);
    }
    return labels;
  });

  /** Auto-selects the first trace when the filtered list changes and nothing is selected. */
  readonly #autoSelect = effect(() => {
    const traces = this.filteredTraces();
    const current = this.selectedTraceId();
    if (
      traces.length > 0 &&
      (!current || !traces.some((t) => t.traceId === current))
    ) {
      this.selectedTraceId.set(traces[0].traceId);
    }
  });

  /** The currently selected trace. */
  readonly selectedTrace = computed<TraceExecutionShape | null>(() => {
    const id = this.selectedTraceId();
    if (!id) return null;
    return this.filteredTraces().find((t) => t.traceId === id) ?? null;
  });

  /** Candidate snapshots extracted from the selected trace. */
  readonly candidates = computed<CandidateSnapshotShape[]>(() => {
    const trace = this.selectedTrace();
    if (!trace) return [];
    return this.#aggregate.extractCandidates(trace);
  });

  /** Total number of snapshot pairs available. */
  readonly totalPairs = computed(() =>
    Math.max(0, this.candidates().length - 1)
  );

  /** The "before" snapshot for the current pair. */
  readonly beforeSnapshot = computed<CandidateSnapshotShape | null>(() => {
    const list = this.candidates();
    const idx = this.beforeIndex();
    return list[idx] ?? null;
  });

  /** The "after" snapshot for the current pair. */
  readonly afterSnapshot = computed<CandidateSnapshotShape | null>(() => {
    const list = this.candidates();
    const idx = this.afterIndex();
    return list[idx] ?? null;
  });

  /** Diff hunks computed via diffJson for the current pair. */
  readonly diffHunks = computed<Change[]>(() => {
    const before = this.beforeSnapshot()?.value;
    const after = this.afterSnapshot()?.value;
    if (before == null && after == null) return [];
    return diffJson(before ?? {}, after ?? {});
  });

  /** Lines for the BEFORE diff panel (removed + unchanged). */
  readonly beforeLines = computed(() =>
    this.#buildLines(this.diffHunks(), 'before', this.showChangedOnly())
  );

  /** Lines for the AFTER diff panel (added + unchanged). */
  readonly afterLines = computed(() =>
    this.#buildLines(this.diffHunks(), 'after', this.showChangedOnly())
  );

  /** Whether previous pair navigation is available. */
  readonly hasPrevious = computed(() => this.beforeIndex() > 0);

  /** Whether next pair navigation is available. */
  readonly hasNext = computed(() => {
    const list = this.candidates();
    return this.afterIndex() < list.length - 1;
  });

  /**
   * Resolves a status label for display.
   */
  statusLabel(trace: TraceExecutionShape): string {
    switch (trace.metrics.status) {
      case TraceExecutionStatuses.Success:
        return '✓ SUCCESS';
      case TraceExecutionStatuses.Failed:
        return '✗ FAILED';
      case TraceExecutionStatuses.Denied:
        return '⊘ DENIED';
      case TraceExecutionStatuses.Orphaned:
        return '⚠ ORPHANED';
      case TraceExecutionStatuses.Aborted:
        return '↺ ABORTED';
      default:
        return '?';
    }
  }

  /**
   * Resolves a CSS class for the trace status.
   */
  statusClass(trace: TraceExecutionShape): string {
    switch (trace.metrics.status) {
      case TraceExecutionStatuses.Success:
        return 'status-success';
      case TraceExecutionStatuses.Failed:
        return 'status-error';
      case TraceExecutionStatuses.Denied:
        return 'status-denied';
      case TraceExecutionStatuses.Orphaned:
        return 'status-orphaned';
      case TraceExecutionStatuses.Aborted:
        return 'status-aborted';
      default:
        return '';
    }
  }

  /** Selects a cell filter value. */
  selectCell(cell: string): void {
    this.selectedCell.set(cell);
    this.selectedTraceId.set(null);
    this.resetPair();
  }

  /** Selects a trace for snapshot comparison. */
  selectTrace(traceId: string): void {
    this.selectedTraceId.set(traceId);
    this.resetPair();
  }

  /** Navigates to the previous snapshot pair. */
  previousPair(): void {
    if (this.hasPrevious()) {
      this.beforeIndex.update((i) => i - 1);
      this.afterIndex.update((i) => i - 1);
    }
  }

  /** Navigates to the next snapshot pair. */
  nextPair(): void {
    if (this.hasNext()) {
      this.beforeIndex.update((i) => i + 1);
      this.afterIndex.update((i) => i + 1);
    }
  }

  /** Navigates directly to a specific pair by index (from the mutation graph). */
  navigateToPair(pairIndex: number): void {
    this.beforeIndex.set(pairIndex);
    this.afterIndex.set(pairIndex + 1);
  }

  /** Selects a specific snapshot as the "before" in the comparison. */
  selectBeforeSnapshot(index: number): void {
    if (index === this.afterIndex()) return;
    this.beforeIndex.set(index);
    if (index > this.afterIndex()) {
      this.afterIndex.set(index);
      this.beforeIndex.set(Math.max(0, index - 1));
    }
  }

  /** Selects a specific snapshot as the "after" in the comparison. */
  selectAfterSnapshot(index: number): void {
    if (index === this.beforeIndex()) return;
    this.afterIndex.set(index);
    if (index < this.beforeIndex()) {
      this.beforeIndex.set(index);
      this.afterIndex.set(Math.min(this.candidates().length - 1, index + 1));
    }
  }

  /** Selects a specific snapshot row for comparison. */
  selectSnapshot(index: number): void {
    const other =
      index === this.beforeIndex() ? this.afterIndex() : this.beforeIndex();
    if (index < other) {
      this.beforeIndex.set(index);
      this.afterIndex.set(other);
    } else {
      this.beforeIndex.set(other);
      this.afterIndex.set(index);
    }
  }

  /** Computes the relative time offset from the trace start. */
  relativeTime(snapshot: CandidateSnapshotShape): string {
    const trace = this.selectedTrace();
    if (!trace) return '';
    const delta = snapshot.timestamp - trace.startedAt;
    return `+${delta.toFixed(1)}ms`;
  }

  /** Resets pair selection to the first two snapshots. */
  private resetPair(): void {
    this.beforeIndex.set(0);
    this.afterIndex.set(1);
  }

  /**
   * Builds display lines for a diff panel from diffJson hunks.
   *
   * @param hunks - The diff change hunks.
   * @param side - Which panel to build lines for.
   * @returns Array of objects with text and CSS class.
   */
  #buildLines(
    hunks: Change[],
    side: 'before' | 'after',
    changedOnly: boolean
  ): { text: string; cssClass: string }[] {
    const lines: { text: string; cssClass: string }[] = [];
    for (const hunk of hunks) {
      if (side === 'before' && hunk.added) continue;
      if (side === 'after' && hunk.removed) continue;
      if (changedOnly && !hunk.added && !hunk.removed) continue;

      const cssClass = hunk.added
        ? 'diff-line-added'
        : hunk.removed
          ? 'diff-line-removed'
          : '';

      const text = hunk.value.endsWith('\n')
        ? hunk.value.slice(0, -1)
        : hunk.value;

      for (const line of text.split('\n')) {
        if (line.length > 0) {
          lines.push({ text: line, cssClass });
        }
      }
    }
    return lines;
  }
}
