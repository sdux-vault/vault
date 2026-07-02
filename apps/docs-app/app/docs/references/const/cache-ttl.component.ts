/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/const/cache-ttl">CacheTTL</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import { BrandNameComponent } from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-cache-ttl',
  standalone: true,
  imports: [BrandNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h3>CacheTTL</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Defines supported cache time-to-live durations in milliseconds.<br /><br />
        These values provide fixed expiration intervals used to control cache
        validity and refresh behavior.<br /><br />
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
                <strong>OneMinute</strong>
              </td>
              <td class="column-auto">
                <code>60000</code>
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>FiveMinutes</strong>
              </td>
              <td class="column-auto">
                <code>300000</code>
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>TenMinutes</strong>
              </td>
              <td class="column-auto">
                <code>600000</code>
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>FifteenMinutes</strong>
              </td>
              <td class="column-auto">
                <code>900000</code>
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>ThirtyMinutes</strong>
              </td>
              <td class="column-auto">
                <code>1800000</code>
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>OneHour</strong>
              </td>
              <td class="column-auto">
                <code>3600000</code>
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
  styleUrl: '../../scss/example.scss',
  encapsulation: ViewEncapsulation.None
})
export class CacheTTLComponent {}
