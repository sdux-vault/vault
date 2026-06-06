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
 * Detail panel for displaying the full breakdown of a single pipeline event.
 *
 * Renders state metadata, event metadata, state value JSON, payload JSON,
 * and error JSON in a vertically scrollable pane. Designed to sit beside
 * the virtual-scrolled event list in a master-detail layout.
 */
@Component({
  selector: 'sdux-devtools-pipeline-event-detail',
  standalone: true,
  imports: [CommonModule, MatTooltipModule],
  templateUrl: './devtools-pipeline-event-detail.component.html',
  styleUrl: './devtools-pipeline-event-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DevtoolsPipelineEventDetailComponent {
  /** The selected pipeline event to display in detail. */
  readonly event = input.required<EventShape>();

  /** Emits when the user closes the detail panel. */
  readonly closeDetail = output<void>();
}
