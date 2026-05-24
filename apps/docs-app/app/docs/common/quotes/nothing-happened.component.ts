import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-nothing-happened-quote',
  standalone: true,
  template: `
    <!-- Updated 2026-01-21 -->

    <blockquote class="sdux-quote">
      <p>
        "SDuX has one core responsibility: to ensure the lifecycle of a state
        update attempt is fully represented — from the moment a request is made,
        through every stage, until the attempt is definitively finalized — even
        when nothing happened."
      </p>
      <footer class="quote-author">— Brian, creator</footer>
    </blockquote>
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../scss/example.scss']
})
export class NothingHappenedQuoteComponent {}
