import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Shared upsell notice displayed when a licensed feature is
 * accessed without a Pro or Enterprise license.
 *
 * Renders a two-line promotional message with a "Purchase Pro
 * License" call-to-action that opens the SDuX Vault dashboard
 * in a new browser tab.
 */
@Component({
  selector: 'sdux-upsell-notice',
  standalone: true,
  templateUrl: './upsell-notice.component.html',
  styleUrl: './upsell-notice.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpsellNoticeComponent {
  /** Primary headline describing the locked feature. */
  readonly headline = input.required<string>();

  /** Supporting body text with additional detail about the feature. */
  readonly body = input.required<string>();
}
