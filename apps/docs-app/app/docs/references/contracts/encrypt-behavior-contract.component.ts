/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/contracts/encrypt-behavior-contract">EncryptBehaviorContract</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-encrypt-behavior-contract',
  standalone: true,
  imports: [BrandNameComponent, PackageNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h2>
        <a href="/docs/references/contracts/encrypt-behavior-contract"
          >EncryptBehaviorContract</a
        >
      </h2>
    </div>
    <header class="docs-header">
      <div class="lead">
        Contract for encryption behaviors that protect persisted state
        values.<br /><br />
      </div>
    </header>
    <section class="section">
      <div class="section-title">Installation</div>
      <div class="section-body">
        <p>
          Part of the
          <strong><sdux-package-name [package]="'shared'" /></strong> project.
        </p>

        <pre
          class="code-inline"><code class="language-ts">npm install <sdux-package-name [package]="'shared'" /></code></pre>
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
                <strong>decryptState</strong>

                <p>inputs:</p>
                <ul>
                  <li>
                    ctx:
                    <a href="/docs/references/contexts/behavior-context"
                      >BehaviorContext</a
                    >
                  </li>
                  <li>
                    encrypted:
                    <a href="/docs/references/types/pipeline-persist-value"
                      >PipelinePersistValue</a
                    >
                  </li>
                </ul>
                <p>
                  returns: Promise |
                  <a href="/docs/references/types/pipeline-persist-value"
                    >PipelinePersistValue</a
                  >
                </p>
              </td>
              <td>Decrypts a value retrieved from storage.<br /><br /></td>
            </tr>
            <tr>
              <td>
                <strong>encryptState</strong>

                <p>inputs:</p>
                <ul>
                  <li>
                    ctx:
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
                  returns: Promise |
                  <a href="/docs/references/types/pipeline-persist-value"
                    >PipelinePersistValue</a
                  >
                </p>
              </td>
              <td>
                Encrypts a plain or already-processed state value before
                persistence.<br /><br />
                or undefined if persistence should be skipped.<br /><br />
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
export class EncryptBehaviorContractComponent {}
