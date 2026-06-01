/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/pipeline/addons/persist/with-session-storage-persist-behavior">withSessionStoragePersistBehavior</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-with-session-storage-persist-behavior',
  standalone: true,
  template: `<div class="docs-container">
    <div class="header">
      <h3>withSessionStoragePersistBehavior</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        SessionStorage persistence behavior that writes and restores
        <a href="/docs/references/functions/feature-cell">FeatureCell</a> state
        using the browser sessionStorage API.<br /><br />
        State persists only for the lifetime of the browser tab and is
        automatically cleared when the tab closes. This behavior runs during the
        persist stage of the Vault pipeline.<br /><br />
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
                Creates a new SessionStorage persistence behavior instance.<br /><br />
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
                Clears the stored state by removing the associated
                sessionStorage entry.<br /><br />
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
                Loads state from sessionStorage, returning undefined when
                missing or invalid.<br /><br />
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
                Persists state into the browser sessionStorage, or removes the
                entry when undefined.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>reset</strong>

                <p>returns: void</p>
              </td>
              <td>
                Resets the persisted sessionStorage entry for this
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
                Fully qualified sessionStorage key used to store this
                <a href="/docs/references/functions/feature-cell">FeatureCell</a
                >’s data.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>critical</strong>
                <p class="modifiers">static, readonly</p>
                <p class="type">type: boolean</p>
              </td>
              <td class="column-auto">
                Indicates this behavior is not critical to pipeline
                execution.<br /><br />
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
                Unique behavior instance key.<br /><br />
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
                Static metadata describing the behavior’s category.<br /><br />
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
    <section class="section">
      <div class="section-title">Documentation Generation Notes</div>
      <div class="section-body">
        <p>
          This reference API documentation is generated from @jsdoc-annotated
          source code using @compodoc, with AI-assisted comments reviewed by a
          human prior to publication.
        </p>
      </div>
    </section>
  </div>`,
  styleUrl: '../../scss/example.scss',
  encapsulation: ViewEncapsulation.None
})
export class withSessionStoragePersistBehaviorComponent {}
