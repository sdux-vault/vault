import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
  ViewEncapsulation
} from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';

/**
 * Collapsible pipeline node that toggles its projected content
 * with a chevron indicator.
 */
@Component({
  selector: 'sdux-devtools-pipeline-collapsible',
  standalone: true,
  imports: [MatTooltipModule],
  templateUrl: './pipeline-collapsible.component.html',
  styleUrl: './pipeline-collapsible.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PipelineCollapsibleComponent {
  /** Label displayed on the pipeline node. */
  readonly label = input.required<string>();

  /** Tooltip text shown on hover. */
  readonly tooltip = input<string>('');

  /** Whether the section is currently expanded. */
  readonly expanded = signal(false);

  /** Toggles the expanded state. */
  toggle(): void {
    this.expanded.update((v) => !v);
  }
}
