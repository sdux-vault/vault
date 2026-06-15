import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal
} from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';

/**
 * Reusable collapsible help section with an icon toggle button.
 * Projects arbitrary help content via `<ng-content />`.
 */
@Component({
  selector: 'sdux-help-toggle',
  standalone: true,
  imports: [MatTooltipModule],
  templateUrl: './help-toggle.component.html',
  styleUrl: './help-toggle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HelpToggleComponent {
  /** Accessible name for the toggle button. */
  readonly ariaLabel = input('Toggle help');

  /** Whether the help section is expanded. */
  readonly open = signal(false);

  /** Toggles the help section visibility. */
  toggle(): void {
    this.open.update((v) => !v);
  }
}
