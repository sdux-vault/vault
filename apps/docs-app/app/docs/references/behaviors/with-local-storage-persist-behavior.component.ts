/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/pipeline/addons/persist/with-local-storage-persist-behavior">withLocalStoragePersistBehavior</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import { BrandNameComponent } from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-with-local-storage-persist-behavior',
  standalone: true,
  imports: [BrandNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h3>withLocalStoragePersistBehavior</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        LocalStorage persistence behavior that writes and restores
        <a href="/docs/references/functions/feature-cell">FeatureCell</a> state
        using the browser localStorage API.<br /><br />
        State persists across browser sessions until explicitly cleared or
        removed. This behavior runs during the persist stage of the Vault
        pipeline.<br /><br />
      </div>
    </header>
    <section class="section">
      <div class="section-title">Installation</div>
      <div class="section-body">
        Part of the <strong>@sdux-vault/addons</strong> project.

        <pre
          class="code-inline"><code class="language-ts">npm install @sdux-vault/addons</code></pre>
      </div>
    </section>
    <section class="section">
      <div class="section-title">Constructor</div>
      <div class="section-body">
        <table aria-label="Constructor">
          <thead>
            <tr>
              <th scope="col" class="column-300">Signature</th>
              <th scope="col" class="column-auto">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>constructor</strong>
                <p>inputs:</p>
                <ul>
                  <li>key: string</li>
                  <li>
                    behaviorCtx:
                    <a href="/docs/references/contexts/behavior-class-context"
                      >BehaviorClassContext</a
                    >
                  </li>
                </ul>

                <p>implements:</p>
                <ul>
                  <li>
                    <a
                      href="/docs/references/contracts/persist-behavior-contract"
                      >PersistBehaviorContract</a
                    >
                  </li>
                </ul>
              </td>
              <td>
                Creates a LocalStorage persistence behavior instance.<br /><br />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <section class="section">
      <div class="section-title">Methods</div>
      <div class="section-body">
        <table aria-label="Methods">
          <thead>
            <tr>
              <th scope="col" class="column-300">Method</th>
              <th scope="col" class="column-auto">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>clearState</strong>

                <p>returns: void</p>
              </td>
              <td>
                Clears the stored state by removing the associated localStorage
                entry.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>destroy</strong>

                <p>returns: void</p>
              </td>
              <td>
                Teardown hook invoked when the
                <a href="/docs/references/functions/feature-cell"
                  >FeatureCell</a
                >
                is destroyed.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>loadState</strong>

                <p>
                  returns:
                  <a href="/docs/references/types/pipeline-persist-value"
                    >PipelinePersistValue</a
                  >&lt;T&gt;
                </p>
              </td>
              <td>
                Loads state from localStorage, returning undefined when missing
                or invalid.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>persistState</strong>

                <p>inputs:</p>
                <ul>
                  <li>
                    current:
                    <a href="/docs/references/types/pipeline-persist-value"
                      >PipelinePersistValue</a
                    >
                  </li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Persists state into the browser localStorage, or removes the
                entry when undefined.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>reset</strong>

                <p>returns: void</p>
              </td>
              <td>
                Resets the persisted localStorage entry for this
                <a href="/docs/references/functions/feature-cell">FeatureCell</a
                >.<br /><br />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <section class="section">
      <div class="section-title">Properties</div>
      <div class="section-body">
        <table aria-label="Properties">
          <thead>
            <tr>
              <th scope="col" class="column-300">Property</th>
              <th scope="col" class="column-auto">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="column-300">
                <strong>#storageKey</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Fully namespaced localStorage key for this
                <a href="/docs/references/functions/feature-cell">FeatureCell</a
                >.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>critical</strong>
                <p class="modifiers">static, readonly</p>
                <p class="type">type: boolean</p>
              </td>
              <td class="column-auto">
                Indicates this persist behavior is critical.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>critical</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: unknown</p>
                <p class="default">default: true</p>
              </td>
              <td class="column-auto">
                Indicates whether this behavior instance is critical to pipeline
                execution.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>key</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Unique per-instance behavior key.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>licenseId</strong>
                <p class="modifiers">static, readonly</p>
                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                License identifier required by this behavior.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>type</strong>
                <p class="modifiers">static, readonly</p>
                <p class="type">
                  type:
                  <a href="/docs/references/types/behavior-type"
                    >BehaviorType</a
                  >
                </p>
              </td>
              <td class="column-auto">
                Static metadata describing the behavior classification.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>type</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: unknown</p>
                <p class="default">
                  default:
                  <a href="/docs/references/const/behavior-types"
                    >BehaviorTypes</a
                  >.Persist
                </p>
              </td>
              <td class="column-auto">
                Instance-level behavior type.<br /><br />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <div class="documentation">
      <p>
        The <sdux-brand-name [tm]="true" /> documentation is central in
        providing world-class support for our users.
      </p>
      <p>
        This reference API documentation is generated from @jsdoc-annotated
        source code using @compodoc, with AI-assisted comments reviewed by a
        human prior to publication.
      </p>
    </div>
  </div>`,
  styleUrl: '../../scss/documentation.scss',
  encapsulation: ViewEncapsulation.None
})
export class withLocalStoragePersistBehaviorComponent {}
