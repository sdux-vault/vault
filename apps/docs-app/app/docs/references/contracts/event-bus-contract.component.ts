/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/contracts/event-bus-contract">EventBusContract</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import { BrandNameComponent } from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-event-bus-contract',
  standalone: true,
  imports: [BrandNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h3>EventBusContract</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Defines the contract for an event bus responsible for emitting and
        observing pipeline and queue events. This interface provides methods for
        publishing events and subscribing to their corresponding event
        streams.<br /><br />
      </div>
    </header>
    <section class="section">
      <div class="section-title">Installation</div>
      <div class="section-body">
        Part of the <strong>@sdux-vault/shared</strong> project.

        <pre
          class="code-inline"><code class="language-ts">npm install @sdux-vault/shared</code></pre>
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
                Emits a pipeline event to all subscribed observers.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>pipeline$</strong>

                <p>
                  returns: Observable&lt;<a
                    href="/docs/references/shapes/event-shape"
                    >EventShape</a
                  >&gt;
                </p>
              </td>
              <td>
                Provides an observable stream of emitted pipeline events.<br /><br />
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
export class EventBusContractComponent {}
