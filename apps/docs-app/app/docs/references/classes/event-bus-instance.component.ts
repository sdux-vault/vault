/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/classes/event-bus-instance">EventBusInstance</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-event-bus-instance',
  standalone: true,
  imports: [BrandNameComponent, PackageNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h3>EventBusInstance</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Implements the EventBusInterface by managing pipeline and queue event
        streams. This class provides gated event emission based on development
        mode and exposes observable streams for subscribers. It is instantiated
        once and registered globally to support DevTools integration.<br /><br />
      </div>
    </header>
    <section class="section">
      <div class="section-title">Installation</div>
      <div class="section-body">
        <p>
          Part of the
          <strong><sdux-package-name [package]="'dev-tools'" /></strong>
          project.
        </p>

        <pre
          class="code-inline"><code class="language-ts">npm install <sdux-package-name [package]="'dev-tools'" /></code></pre>
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

                <p>implements:</p>
                <ul>
                  <li>
                    <a href="/docs/references/contracts/event-bus-contract"
                      >EventBusContract</a
                    >
                  </li>
                </ul>
              </td>
              <td>
                Creates a new
                <a href="/docs/references/functions/event-bus">EventBus</a>
                instance and exposes it on the global object for DevTools
                access.<br /><br />
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
                <strong>nextPipeline</strong>

                <p>inputs:</p>
                <ul>
                  <li>
                    event:
                    <a href="/docs/references/shapes/event-shape">EventShape</a>
                  </li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Emits a pipeline event to subscribed observers when development
                mode is active.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>pipeline$</strong>

                <p>returns: any</p>
              </td>
              <td>
                Provides an observable stream of emitted pipeline events.<br /><br />
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
                <strong>#pipeline$</strong>

                <p class="type">type: unknown</p>
                <p class="default">default: new Subject()</p>
              </td>
              <td class="column-auto">
                Subject used to emit pipeline events to subscribers.<br /><br />
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
export class EventBusInstanceComponent {}
