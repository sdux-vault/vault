import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { EXTENSION_VERSION } from '../splash-page/devtools-splash-page.component';

/**
 * Top-level toolbar displaying the brand logo, version badge, and a
 * configurable drop-down menu for future actions.
 */
@Component({
  selector: 'sdux-toolbar',
  standalone: true,
  imports: [MatMenuModule, MatTooltipModule, RouterLink],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {
  /** Extension manifest version, resolved via injection token. */
  readonly version = inject(EXTENSION_VERSION);
}
