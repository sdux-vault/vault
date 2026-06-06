import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output
} from '@angular/core';
import { EventShape } from '@sdux-vault/shared';
import { DevtoolsRegistryService } from '../../../services/registry/devtools-registry.service';
import type { TraceExecutionShape } from '../../../shapes/trace';
import type { StageMetricShape } from '../../../shapes/trace/stage-metric.shape';
import { UpsellNoticeComponent } from '../../../shared/upsell-notice/upsell-notice.component';

/**
 * Stage Waterfall visualization component.
 *
 * Renders trace stages as horizontal waterfall bars representing
 * wall-clock timing. Includes synthetic revote-delay entries and
 * highlights the slowest stage. Clicking a row resolves the
 * corresponding start event and emits it.
 */
@Component({
  selector: 'sdux-trace-stage-waterfall',
  standalone: true,
  imports: [UpsellNoticeComponent],
  templateUrl: './trace-stage-waterfall.component.html',
  styleUrl: './trace-stage-waterfall.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TraceStageWaterfallComponent {
  /** Registry service providing license state. */
  #registry = inject(DevtoolsRegistryService);

  /** Whether the current license enables pro/enterprise features. */
  readonly isLicensed = this.#registry.isLicensed;

  /** The trace whose stages are visualized. */
  readonly trace = input.required<TraceExecutionShape>();

  /** Emitted when a waterfall row is clicked with the resolved start event. */
  readonly stageSelected = output<EventShape>();

  /**
   * Builds waterfall rows from trace stages plus synthetic revote-delay
   * entries. Revote delays are inserted chronologically and excluded
   * from slowest-stage highlighting.
   */
  waterfallStages(): StageMetricShape[] {
    const trace = this.trace();
    const revoteDelays: StageMetricShape[] = [];
    let denyTimestamp: number | null = null;

    for (const event of trace.events) {
      if (event.name === 'conductor:notification:deny') {
        denyTimestamp = event.timestamp;
      } else if (
        event.name === 'lifecycle:notification:revote' &&
        denyTimestamp !== null
      ) {
        revoteDelays.push({
          name: 'revote-delay',
          behaviorKey: 'vault-conductor',
          startedAt: denyTimestamp,
          finishedAt: event.timestamp,
          duration: event.timestamp - denyTimestamp,
          type: 'lifecycle' as StageMetricShape['type']
        });
        denyTimestamp = null;
      }
    }

    const eventIndex = new Map<string, number>();
    trace.events.forEach((e, i) => eventIndex.set(e.id, i));

    const sortByStart = (a: StageMetricShape, b: StageMetricShape): number => {
      const timeDiff = a.startedAt - b.startedAt;
      if (timeDiff !== 0) return timeDiff;
      return (
        (eventIndex.get(a.startEventId ?? '') ?? 0) -
        (eventIndex.get(b.startEventId ?? '') ?? 0)
      );
    };

    const allStages = [...trace.metrics.stages, ...revoteDelays];
    const attempts: StageMetricShape[] = [];
    const rest: StageMetricShape[] = [];
    for (const stage of allStages) {
      if (stage.name === 'attempt') {
        attempts.push(stage);
      } else {
        rest.push(stage);
      }
    }
    rest.sort(sortByStart);
    return [...rest, ...attempts];
  }

  /**
   * Determines if a stage is a synthetic revote-delay row.
   */
  isRevoteDelay(stage: StageMetricShape): boolean {
    return stage.name === 'revote-delay';
  }

  /**
   * Computes waterfall bar left offset for a stage within its trace.
   */
  waterfallLeft(stage: StageMetricShape): number {
    const trace = this.trace();
    if (trace.metrics.duration === 0) return 0;
    return ((stage.startedAt - trace.startedAt) / trace.metrics.duration) * 100;
  }

  /**
   * Computes waterfall bar width for a stage within its trace.
   */
  waterfallWidth(stage: StageMetricShape): number {
    const trace = this.trace();
    if (trace.metrics.duration === 0) return 100;
    const width = (stage.duration / trace.metrics.duration) * 100;
    return Math.max(width, 0.5);
  }

  /**
   * Determines if a stage is the slowest in the trace.
   */
  isSlowestStage(stage: StageMetricShape): boolean {
    const trace = this.trace();
    return (
      trace.metrics.stages.length > 1 &&
      stage.duration === trace.metrics.slowestStage.duration &&
      stage.name === trace.metrics.slowestStage.name
    );
  }

  /**
   * Determines if the slow label should appear to the right of the bar.
   * Returns true when the bar ends in the left half of the track.
   */
  isSlowOnRight(stage: StageMetricShape): boolean {
    return this.waterfallLeft(stage) + this.waterfallWidth(stage) <= 50;
  }

  /**
   * Finds and emits the start event matching a stage in the trace.
   */
  selectStageEvent(stage: StageMetricShape): void {
    const trace = this.trace();

    if (stage.startEventId) {
      const event = trace.events.find((e) => e.id === stage.startEventId);
      if (event) {
        this.stageSelected.emit(event);
        return;
      }
    }
    const event = trace.events.find(
      (e) =>
        e.timestamp === stage.startedAt &&
        e.behaviorKey === stage.behaviorKey &&
        e.boundary === 'start' &&
        e.name.endsWith(':' + stage.name)
    );
    if (event) {
      this.stageSelected.emit(event);
    }
  }
}
