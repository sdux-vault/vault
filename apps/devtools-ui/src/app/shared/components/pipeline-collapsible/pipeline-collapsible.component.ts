import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  signal,
  ViewEncapsulation
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

/**
 * Collapsible pipeline node that toggles its projected content
 * with a chevron indicator.
 */
@Component({
  selector: 'sdux-devtools-pipeline-collapsible',
  standalone: true,
  imports: [MatIconModule, MatTooltipModule],
  templateUrl: './pipeline-collapsible.component.html',
  styleUrl: './pipeline-collapsible.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PipelineCollapsibleComponent {
  /** Label displayed on the pipeline node. */
  readonly label = input.required<string>();

  /** Optional detail text displayed after the label (e.g. duration). */
  readonly detail = input<string>('');

  /** Tooltip text shown on hover. */
  readonly tooltip = input<string>('');

  /** Optional info tooltip that shows a help icon with hover text. */
  readonly infoTooltip = input<string>('');

  /** Optional initial expanded state driven by the parent. */
  readonly initialExpanded = input(false);

  /** Whether the section is currently expanded. */
  readonly expanded = signal(false);

  /** Syncs the expanded state whenever the initialExpanded input changes. */
  constructor() {
    effect(() => {
      this.expanded.set(this.initialExpanded());
    });
  }

  /** Toggles the expanded state. */
  toggle(): void {
    this.expanded.update((v) => !v);
  }
}
