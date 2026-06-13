import {
  ChangeDetectionStrategy,
  Component,
  input,
  model
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

/**
 * Reusable header section with keyboard-accessible toggle.
 * Projects header content via `[header]` slot and body content
 * via default `<ng-content />`.
 */
@Component({
  selector: 'sdux-header-section',
  standalone: true,
  imports: [MatIconModule, MatTooltipModule],
  templateUrl: './header-section.component.html',
  styleUrl: './header-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderSectionComponent {
  /** Accessible label for the toggle region. */
  readonly ariaLabel = input('Toggle section');

  /** Whether the section body is visible. Two-way bindable. */
  readonly expanded = model(true);

  /** Whether to display the chevron icon. */
  readonly showChevron = input(true);

  /** Toggles the expanded state. */
  toggle(): void {
    this.expanded.update((v) => !v);
  }
}
