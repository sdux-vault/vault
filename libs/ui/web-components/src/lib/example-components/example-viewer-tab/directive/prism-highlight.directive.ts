import { AfterViewInit, Directive, ElementRef, inject } from '@angular/core';
import Prism from 'prismjs';

/** Highlights a rendered source-code element after its view is initialized. */
@Directive({
  selector: 'code[sduxPrismHighlight]',
  standalone: true
})
export class PrismHighlightDirective implements AfterViewInit {
  /** Provides access to the host code element rendered for highlighting. */
  readonly #elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  /** Applies Prism syntax highlighting after the host view is initialized. */
  ngAfterViewInit(): void {
    Prism.highlightElement(this.#elementRef.nativeElement);
  }
}
