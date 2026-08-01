/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/pipeline/addons/encrypt/with-aes256encrypt-behavior">withAes256EncryptBehavior</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-with-aes256encrypt-behavior',
  standalone: true,
  imports: [BrandNameComponent, PackageNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h3>withAes256EncryptBehavior</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        AES-256-GCM encryption behavior that encrypts and decrypts persisted
        state values. This behavior derives a symmetric encryption key from
        consumer-supplied configuration and applies encryption during
        persistence and decryption during restoration.<br /><br />
      </div>
    </header>
    <section class="section">
      <div class="section-title">Installation</div>
      <div class="section-body">
        <p>
          Part of the
          <strong><sdux-package-name [package]="'addons'" /></strong> project.
        </p>

        <pre
          class="code-inline"><code class="language-ts">npm install <sdux-package-name [package]="'addons'" /></code></pre>
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
                      href="/docs/references/contracts/encrypt-behavior-contract"
                      >EncryptBehaviorContract</a
                    >
                  </li>
                </ul>
              </td>
              <td>
                Creates a new AES-256 encryption behavior instance.<br /><br />
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
                <strong>#abToBase64</strong>
                <p class="modifiers">#private</p>
                <p>inputs:</p>
                <ul>
                  <li>buf: ArrayBuffer | ArrayBufferView</li>
                </ul>
                <p>returns: string</p>
              </td>
              <td>
                Converts an ArrayBuffer into a base64-encoded string.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>#base64ToAb</strong>
                <p class="modifiers">#private</p>
                <p>inputs:</p>
                <ul>
                  <li>b64: string</li>
                </ul>
                <p>returns: ArrayBuffer</p>
              </td>
              <td>
                Converts a base64-encoded string into an ArrayBuffer.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>#ensureSecretInitialized</strong>
                <p class="modifiers">async, #private</p>

                <p>returns: Promise&lt;void&gt;</p>
              </td>
              <td>
                Ensures the encryption key has been derived and cached.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>#importKey</strong>
                <p class="modifiers">async, #private</p>

                <p>returns: Promise&lt;CryptoKey&gt;</p>
              </td>
              <td>
                Derives and imports an AES-256-GCM CryptoKey from the configured
                secret.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>#initializeKey</strong>
                <p class="modifiers">async, #private</p>

                <p>returns: Promise&lt;void&gt;</p>
              </td>
              <td>
                Initializes the derived AES-256 encryption key.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>decryptState</strong>
                <p class="modifiers">async</p>
                <p>inputs:</p>
                <ul>
                  <li>
                    _ctx:
                    <a href="/docs/references/contexts/behavior-context"
                      >BehaviorContext</a
                    >
                  </li>
                  <li>encrypted: T</li>
                </ul>
                <p>returns: Promise&lt;T | undefined&gt;</p>
              </td>
              <td>
                Decrypts an encrypted AES-256-GCM state envelope.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>destroy</strong>

                <p>returns: void</p>
              </td>
              <td>
                Releases cached cryptographic material held by this behavior
                instance.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>encryptState</strong>
                <p class="modifiers">async</p>
                <p>inputs:</p>
                <ul>
                  <li>
                    _ctx:
                    <a href="/docs/references/contexts/behavior-context"
                      >BehaviorContext</a
                    >
                  </li>
                  <li>
                    current:
                    <a href="/docs/references/types/pipeline-persist-value"
                      >PipelinePersistValue</a
                    >
                  </li>
                </ul>
                <p>
                  returns: Promise&lt;<a
                    href="/docs/references/types/pipeline-persist-value"
                    >PipelinePersistValue</a
                  >&lt;T&gt;&gt;
                </p>
              </td>
              <td>
                Encrypts a persisted state value using AES-256-GCM.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>installFluentApi</strong>
                <p class="modifiers">static</p>
                <p>inputs:</p>
                <ul>
                  <li>
                    cell:
                    <a href="/docs/references/shapes/feature-cell-base-shape"
                      >FeatureCellBaseShape</a
                    >
                  </li>
                  <li>behaviorConfigs: Map</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Installs fluent encryption APIs onto a Feature Cell instance.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>reset</strong>

                <p>returns: void</p>
              </td>
              <td>
                Resets the encryption behavior to an uninitialized state.<br /><br />
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
                <strong>#cryptoKey</strong>

                <p class="type">type: CryptoKey</p>
              </td>
              <td class="column-auto">
                Cached cryptographic key derived from the configured secret.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>#initPromise?</strong>

                <p class="type">type: Promise</p>
              </td>
              <td class="column-auto">
                Promise used to coordinate one-time key initialization.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>#options</strong>
                <p class="modifiers">readonly</p>
                <p class="type">
                  type:
                  <a href="/docs/references/options/aes256behavior-options"
                    >AES256BehaviorOptions</a
                  >
                </p>
              </td>
              <td class="column-auto">
                Resolved encryption configuration options.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>configKey</strong>
                <p class="modifiers">static, readonly</p>
                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Configuration key used to supply behavior options.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>critical</strong>
                <p class="modifiers">static, readonly</p>
                <p class="type">type: boolean</p>
              </td>
              <td class="column-auto">
                Indicates whether this behavior is critical.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>critical</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: unknown</p>
                <p class="default">
                  default:
                  <a
                    href="/docs/pipeline/addons/encrypt/with-aes256encrypt-behavior"
                    >withAes256EncryptBehavior</a
                  >.critical
                </p>
              </td>
              <td class="column-auto">
                Indicates whether this behavior instance is critical.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>key</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Unique key identifying this behavior instance.<br /><br />
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
                Static metadata describing this behavior type.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>type</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: unknown</p>
                <p class="default">
                  default:
                  <a
                    href="/docs/pipeline/addons/encrypt/with-aes256encrypt-behavior"
                    >withAes256EncryptBehavior</a
                  >.type
                </p>
              </td>
              <td class="column-auto">
                Behavior type identifier used by the orchestrator.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>wantsConfig</strong>
                <p class="modifiers">static, readonly</p>
                <p class="type">type: boolean</p>
              </td>
              <td class="column-auto">
                Indicates whether this behavior requires configuration.<br /><br />
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
export class withAes256EncryptBehaviorComponent {}
