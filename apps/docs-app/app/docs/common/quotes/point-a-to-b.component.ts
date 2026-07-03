import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-point-a-to-b-quote',
  standalone: true,
  template: `
    <!-- Updated 2026-01-21 -->

    <blockquote class="sdux-quote">
      <p>
        SDuX has one primary responsibility:
        <strong>move state deterministically from point A to point B</strong>.
      </p>
      <footer class="quote-author">— Brian, creator</footer>
    </blockquote>
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../scss/documentation.scss']
})
export class PointAtoBQuoteComponent {}
