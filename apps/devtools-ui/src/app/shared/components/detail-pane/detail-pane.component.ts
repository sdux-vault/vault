import {
  ChangeDetectionStrategy,
  Component,
  input,
  output
} from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EscapeCloseDirective } from '../../directives/escape-close/escape-close.directive';

/**
 * Reusable detail-pane wrapper providing a header with a title and close
 * button, plus a scrollable body region for projected content.
 *
 * Used as the right-side panel in master-detail layouts throughout the
 * DevTools application. The caller supplies a title string and listens
 * for the {@link closeDetail} output to dismiss the pane.
 *
 * Content is projected into the scrollable body via `<ng-content>`.
 */
@Component({
  selector: 'sdux-devtools-detail-pane',
  standalone: true,
  imports: [EscapeCloseDirective, MatTooltipModule],
  templateUrl: './detail-pane.component.html',
  styleUrl: './detail-pane.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailPaneComponent {
  /** Title displayed in the panel header. */
  readonly title = input.required<string>();

  /** Emits when the user clicks the close button. */
  readonly closeDetail = output<void>();
}
