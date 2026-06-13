import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output
} from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EventShape } from '@sdux-vault/shared';

/**
 * Presentational component for rendering a single pipeline event within
 * the ngSDuX DevTools UI.
 *
 * The component receives an `EventModel` representing a single pipeline
 * telemetry emission and a corresponding total event count for display
 * purposes. It performs no transformation logic and contains no internal
 * state; all rendering is delegated to the template.
 *
 * This component is standalone and intended to be embedded inside
 * higher-level DevTools panels such as event history lists or inspectors.
 */
@Component({
  selector: 'sdux-devtools-pipeline-event',
  standalone: true,
  imports: [CommonModule, MatTooltipModule],
  templateUrl: './devtools-pipeline-event.component.html',
  styleUrl: './devtools-pipeline-event.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DevtoolsPipelineEventComponent {
  /**
   * The pipeline event instance to be displayed. This input is required and
   * represents a single telemetry record emitted by the ngSDuX pipeline
   * (e.g., Resolve, Filter, Reduce, Persist, etc.).
   */
  readonly event = input.required<EventShape>();

  /**
   * Total number of pipeline events currently captured. Used in the UI to
   * display index, ordering, or summary information.
   */
  readonly totalEvents = input.required<number>();

  /**
   * Whether this event row is currently selected in the master-detail view.
   */
  readonly selected = input<boolean>(false);

  /**
   * Emits the event when the user clicks this row to select it.
   */
  readonly selectEvent = output<EventShape>();

  /**
   * Parses the raw behavior key into display segments for pill rendering.
   *
   * Canonical keys (`SDUX::Kind::Domain::Name`) produce two pills:
   * the kind (Behavior/Controller) and the name, skipping the domain.
   * Internal keys strip the `VAULT-` prefix and produce a single pill.
   *
   * @returns An array of uppercase segment strings.
   */
  parseBehaviorKey(): string[] {
    const raw = this.event().behaviorKey;
    if (raw.startsWith('SDUX::')) {
      const parts = raw.split('::');
      const kind = parts[1];
      const name = parts[parts.length - 1];
      return [kind.toUpperCase(), name.toUpperCase()];
    }
    const stripped = raw.replace(/^VAULT-/i, '');
    return [stripped.toUpperCase()];
  }

  /**
   * Extracts the name segment from the canonical behavior key.
   *
   * For canonical keys (`SDUX::Kind::Domain::Name`), returns the
   * last segment (Name). For internal keys, returns the raw key
   * with the `VAULT-` prefix stripped.
   *
   * @returns The behavior name in uppercase.
   */
  behaviorName(): string {
    const raw = this.event().behaviorKey;
    if (raw.startsWith('SDUX::')) {
      return raw.split('::').pop()!.toUpperCase();
    }
    return raw.replace(/^VAULT-/i, '').toUpperCase();
  }

  /**
   * Formats the behavior key for display in the event row.
   *
   * For canonical keys (`a::b::c::d`), returns `c d`.
   * For hyphenated keys (`a-b`), returns `A B` with each word capitalized.
   *
   * @returns The formatted display key.
   */
  displayKey(): string {
    const raw = this.event().behaviorKey;
    if (raw.includes('::')) {
      const parts = raw.split('::');
      return parts.slice(-2).join(' ');
    }
    return raw
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }
}
