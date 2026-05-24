import {
  AfterViewInit,
  Component,
  ElementRef,
  input,
  TemplateRef,
  ViewChild
} from '@angular/core';
import Prism from 'prismjs';

/** Tab component that displays syntax-highlighted source code using Prism. */
@Component({
  selector: 'sdux-example-viewer-tab',
  standalone: true,
  templateUrl: './example-viewer-source-tab.component.html',
  styleUrls: ['./example-viewer-source-tab.component.scss']
})
export class ExampleViewerTabComponent implements AfterViewInit {
  /** Display label for this tab. */
  readonly label = input<string>('Untitled');

  /** Reference to the tab template used by the parent viewer. */
  @ViewChild('tpl', { static: true }) template!: TemplateRef<unknown>;

  /** Reference to the code element targeted for Prism highlighting. */
  @ViewChild('codeElement', { static: false })
  codeElement!: ElementRef<HTMLElement>;

  /** Applies Prism syntax highlighting after the view initializes. */
  ngAfterViewInit() {
    if (this.codeElement) {
      Prism.highlightElement(this.codeElement.nativeElement);
    }
  }
}
