/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/abstracts/licensing-abstract">LicensingAbstract</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-licensing-abstract',
  standalone: true,
  template: `<div class="docs-container">
    <div class="header">
      <h3>LicensingAbstract</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Stub abstract class that simulates the licensing lifecycle for tests.<br /><br />
      </div>
    </header>
    <section class="section">
      <div class="section-title">Installation</div>
      <div class="section-body">
        Part of the <strong>@sdux-vault/engine</strong> project.

        <pre
          class="code-inline"><code class="language-ts">npm install @sdux-vault/engine</code></pre>
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
                  <li>
                    _ctx:
                    <a href="/docs/references/contexts/licensable-class-context"
                      >LicensableClassContext</a
                    >
                  </li>
                </ul>
              </td>
              <td>Creates a stub licensing instance.<br /><br /></td>
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
                <strong>validateLicense</strong>

                <p>inputs:</p>
                <ul>
                  <li>_valid: boolean</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Stub handler invoked when the license validity changes.<br /><br />
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
                <strong>key</strong>
                <p class="modifiers">static, readonly</p>
                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Unique key identifying this licensable class.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>needsLicense</strong>
                <p class="modifiers">static, readonly</p>
                <p class="type">type: boolean</p>
              </td>
              <td class="column-auto">
                Whether this class requires a license.<br /><br />
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
export class LicensingAbstractComponent {}
