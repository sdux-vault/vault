import {
  ChangeDetectionStrategy,
  Component,
  input,
  model
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

/**
 * Reusable collapsible section with keyboard-accessible toggle.
 * Projects header content via `[header]` slot and body content
 * via default `<ng-content />`.
 */
@Component({
  selector: 'sdux-collapsible-section',
  standalone: true,
  imports: [MatIconModule, MatTooltipModule],
  templateUrl: './collapsible-section.component.html',
  styleUrl: './collapsible-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollapsibleSectionComponent {
  /** Accessible label for the toggle region. */
  readonly ariaLabel = input('Toggle section');

  /** Whether the section body is visible. Two-way bindable. */
  readonly expanded = model(true);

  /** Toggles the expanded state. */
  toggle(): void {
    this.expanded.update((v) => !v);
  }
}
