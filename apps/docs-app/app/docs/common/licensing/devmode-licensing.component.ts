import { Component, input, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrandNameComponent } from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-devmode-licensing-common',
  standalone: true,
  imports: [RouterModule, BrandNameComponent],
  template: `
    <section class="section" id="devmode-and-licensing">
      @if (fragmentLink()) {
        <div class="section-title-navigation">
          <div class="section-title">
            <a href="/docs/references/const/dev-mode">DevMode</a> & Licensing
          </div>
          <div class="section-top-link">
            <a [routerLink]="[]" fragment="top">↑ top</a>
          </div>
        </div>
      } @else {
        <div class="section-title">
          <a href="/docs/references/const/dev-mode">DevMode</a> & Licensing
        </div>
      }

      <div class="section-body">
        <p>
          When <code>devMode</code> is set to <code>true</code>, license
          enforcement is bypassed entirely. This is intentional — it gives
          engineers and potential customers an opportunity to try and demo new
          extensions before purchasing a license.
        </p>

        <p>
          Be aware that <sdux-brand-name [tm]="true" /> cannot run in production
          with <code>devMode = true</code> without noticeable side-effects. Most
          notably, the SDuX Debugger will appear in the application, exposing
          internal pipeline state that is not intended for end users.
          Development mode is designed exclusively for local development and
          evaluation — not as a way to circumvent licensing in a deployed
          environment.
        </p>
      </div>
    </section>
  `,
  styleUrls: ['../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DevmodeLicensingCommonComponent {
  fragmentLink = input<boolean>(false);
}
