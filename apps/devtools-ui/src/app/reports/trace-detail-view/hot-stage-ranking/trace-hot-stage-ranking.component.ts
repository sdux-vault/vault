import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal
} from '@angular/core';
import { DevtoolsRegistryService } from '../../../services/registry/devtools-registry.service';
import type { TraceExecutionShape } from '../../../shapes/trace';

/**
 * Shape representing an aggregated stage ranking entry.
 */
interface StageRankingEntry {
  /** Stage name (e.g. `reducer`, `effect`). */
  name: string;

  /** Total summed duration across all traces. */
  totalDuration: number;

  /** Number of times this stage appeared across all traces. */
  count: number;

  /** Percentage of total pipeline time consumed by this stage. */
  percentage: number;
}

/**
 * Shape representing an individual stage execution entry.
 */
interface IndividualStageEntry {
  /** Stage name (e.g. `reducer`, `effect`). */
  name: string;

  /** Behavior key that triggered this stage. */
  behaviorKey: string;

  /** Trace ID this stage belongs to. */
  traceId: string;

  /** Duration of this individual execution. */
  duration: number;

  /** Percentage of total pipeline time consumed by this execution. */
  percentage: number;
}

/**
 * View mode for the hot stage ranking display.
 */
type ViewMode = 'grouped' | 'individual';

/**
 * Hot Stage Ranking component.
 *
 * Aggregates pipeline stage durations across all provided traces,
 * groups by stage name, and displays a ranked bar chart showing
 * which stages consume the most total processing time. Identifies
 * systemic bottlenecks across the entire trace set.
 */
@Component({
  selector: 'sdux-trace-hot-stage-ranking',
  standalone: true,
  templateUrl: './trace-hot-stage-ranking.component.html',
  styleUrl: './trace-hot-stage-ranking.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TraceHotStageRankingComponent {
  /** Registry service providing license state. */
  #registry = inject(DevtoolsRegistryService);

  /** Whether the current license enables pro/enterprise features. */
  readonly isLicensed = this.#registry.isLicensed;

  /** Single trace for per-trace detail context. */
  readonly trace = input<TraceExecutionShape>();

  /** Multiple traces for aggregate context. */
  readonly traces = input<TraceExecutionShape[]>();

  /** Resolved trace list from whichever input is supplied. */
  readonly resolvedTraces = computed<TraceExecutionShape[]>(() => {
    const single = this.trace();
    if (single) return [single];
    return this.traces() ?? [];
  });

  /** Current view mode toggle. */
  readonly viewMode = signal<ViewMode>('grouped');

  /** Aggregated stage rankings sorted by total duration descending. */
  readonly rankings = computed<StageRankingEntry[]>(() => {
    const traces = this.resolvedTraces();
    const totals = new Map<string, { duration: number; count: number }>();

    for (const trace of traces) {
      for (const stage of trace.metrics.stages) {
        const entry = totals.get(stage.name) ?? { duration: 0, count: 0 };
        entry.duration += stage.duration;
        entry.count += 1;
        totals.set(stage.name, entry);
      }
    }

    const grandTotal = Array.from(totals.values()).reduce(
      (sum, e) => sum + e.duration,
      0
    );

    return Array.from(totals, ([name, entry]) => ({
      name,
      totalDuration: entry.duration,
      count: entry.count,
      percentage: grandTotal > 0 ? (entry.duration / grandTotal) * 100 : 0
    })).sort((a, b) => b.totalDuration - a.totalDuration);
  });

  /** Grand total duration across all stages. */
  readonly grandTotal = computed(() =>
    this.rankings().reduce((sum, r) => sum + r.totalDuration, 0)
  );

  /** Total unique stage names. */
  readonly uniqueStageCount = computed(() => this.rankings().length);

  /** The slowest stage entry, if any. */
  readonly slowest = computed(() => this.rankings()[0] ?? null);

  /** The fastest stage entry, if any. */
  readonly fastest = computed(() => {
    const r = this.rankings();
    return r.length > 0 ? r[r.length - 1] : null;
  });

  /**
   * Computes the bar width percentage relative to the slowest stage.
   */
  barWidth(entry: StageRankingEntry): number {
    const max = this.slowest()?.totalDuration ?? 1;
    return (entry.totalDuration / max) * 100;
  }

  /** Individual stage executions sorted by duration descending. */
  readonly individualRankings = computed<IndividualStageEntry[]>(() => {
    const traces = this.resolvedTraces();
    const entries: IndividualStageEntry[] = [];

    for (const trace of traces) {
      for (const stage of trace.metrics.stages) {
        entries.push({
          name: stage.name,
          behaviorKey: stage.behaviorKey,
          traceId: trace.traceId,
          duration: stage.duration,
          percentage: 0
        });
      }
    }

    const grandTotal = entries.reduce((sum, e) => sum + e.duration, 0);
    for (const entry of entries) {
      entry.percentage =
        grandTotal > 0 ? (entry.duration / grandTotal) * 100 : 0;
    }

    return entries.sort((a, b) => b.duration - a.duration);
  });

  /** The slowest individual entry, if any. */
  readonly slowestIndividual = computed(
    () => this.individualRankings()[0] ?? null
  );

  /**
   * Computes the bar width percentage relative to the slowest individual stage.
   */
  barWidthIndividual(entry: IndividualStageEntry): number {
    const max = this.slowestIndividual()?.duration ?? 1;
    return (entry.duration / max) * 100;
  }

  /**
   * Toggles the view mode.
   */
  setViewMode(mode: ViewMode): void {
    this.viewMode.set(mode);
  }
}
