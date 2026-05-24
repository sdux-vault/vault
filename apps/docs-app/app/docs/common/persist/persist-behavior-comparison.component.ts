import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-vault-persist-behavior-comparison-common',
  standalone: true,
  template: `
    <!-- Updated 2026-01-21 -->
    <section class="section">
      <div class="section-title">Built-in Persist Behavior Comparison</div>

      <div class="section-body">
        <p>
          The following table summarizes the characteristics of the built-in
          persist behaviors provided by the Vault. Each behavior operates during
          the <strong>Persist stage</strong> and is responsible solely for
          writing and restoring finalized state values. All built-in persist
          behaviors are fail-safe and support intentional state clearing when
          the incoming value is <em>undefined</em>.
        </p>

        <div class="table-scroll">
          <table>
            <thead>
              <tr>
                <th class="column-250">Behavior</th>
                <th class="auto">Lifetime</th>
                <th class="auto">Storage Mechanism</th>
                <th class="auto">Clears on <em>undefined</em></th>
                <th class="auto">Fail-safe</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  <a
                    href="/docs/pipeline/addons/with-cookie-storage-persist-behavior"
                    >withCookieStoragePersistBehavior</a
                  >
                </td>
                <td>Browser-managed</td>
                <td><code>document.cookie</code></td>
                <td>✅</td>
                <td>✅</td>
              </tr>

              <tr>
                <td>
                  <a
                    href="/docs/pipeline/addons/with-local-storage-persist-behavior"
                    >withLocalStoragePersistBehavior</a
                  >
                </td>
                <td>Persistent</td>
                <td><code>localStorage</code></td>
                <td>✅</td>
                <td>✅</td>
              </tr>

              <tr>
                <td>
                  <a
                    href="/docs/pipeline/addons/with-session-storage-persist-behavior"
                    >withSessionStoragePersistBehavior</a
                  >
                </td>
                <td>Tab-scoped</td>
                <td><code>sessionStorage</code></td>
                <td>✅</td>
                <td>✅</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: []
})
export class VaultPersistBehaviorComparisonCommonComponent {}
