import { Component, computed, input, ViewEncapsulation } from '@angular/core';
import { PackageNameComponent } from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-vault-interceptor-behaviors-common',
  standalone: true,
  template: `
    <!-- Updated 2026-01-21 -->

    @if (isGlobalErrorPause()) {
      <div class="table-title">Global Error Pause</div>
      <table>
        <thead>
          <tr>
            <th class="column-250">Behavior</th>
            <th class="column-auto">Description</th>
            <th class="column-50">Package</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              <strong
                ><a
                  href="/docs/pipeline/addons/interceptors/with-global-error-pause-behavior"
                  >withGlobalErrorPauseBehavior</a
                ></strong
              >
              <p>input: none</p>
              <p>type: void</p>
              <p>implementation:</p>
              <ul>
                <li>
                  <a href="/docs/references/functions/provide-feature-cell"
                    >provideFeatureCell</a
                  >
                </li>
              </ul>
            </td>
            <td>
              Prevents updates from entering the pipeline while a global Vault
              error is present. Incoming updates are gated at the interceptor
              stage and resume once the error condition is cleared. This
              behavior is attached at
              <a href="/docs/references/functions/feature-cell">FeatureCell</a>
              definition time and must be used in conjunction with the
              <strong
                ><a
                  href="/docs/pipeline/controllers/with-replay-global-error-controller"
                  >withReplayGlobalErrorController</a
                ></strong
              >
              to ensure coordinated replay and admission control.
            </td>
            <td><sdux-package-name [package]="'addons'" /></td>
          </tr>
        </tbody>
      </table>
    }
  `,
  styleUrls: ['../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [PackageNameComponent]
})
export class VaultInterceptorCommonComponent {
  type = input<string>('all');

  isGlobalErrorPause = computed(() => {
    return this.type() === 'all' || this.type() === 'globalErrorPause';
  });
}
