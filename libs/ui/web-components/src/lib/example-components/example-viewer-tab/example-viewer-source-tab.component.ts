import { Component, input, TemplateRef, ViewChild } from '@angular/core';
import { PrismHighlightDirective } from './directive/prism-highlight.directive';

/** Tab component that displays syntax-highlighted source code using Prism. */
@Component({
  selector: 'sdux-example-viewer-tab',
  standalone: true,
  imports: [PrismHighlightDirective],
  templateUrl: './example-viewer-source-tab.component.html',
  styleUrls: ['./example-viewer-source-tab.component.scss']
})
export class ExampleViewerTabComponent {
  /** Display label for this tab. */
  readonly label = input<string>('Untitled');

  /** Reference to the tab template used by the parent viewer. */
  @ViewChild('tpl', { static: true }) template!: TemplateRef<unknown>;
}
