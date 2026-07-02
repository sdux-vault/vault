/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/pipeline/controllers/with-stepwise-controller">withStepwiseController</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import { BrandNameComponent } from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-with-stepwise-controller',
  standalone: true,
  imports: [BrandNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h3>withStepwiseController</h3>
    </div>
    <header class="docs-header">
      <div class="lead">
        Controller that coordinates stepwise policy decisions by serializing
        requests and mediating responses between behaviors and external decision
        producers.<br /><br />
        This controller maintains a FIFO queue of stepwise requests and ensures
        that only one request is active at a time, emitting requests outward and
        resolving them when a corresponding response is received.<br /><br />
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
                    controllerCtx:
                    <a href="/docs/references/contexts/controller-class-context"
                      >ControllerClassContext</a
                    >
                  </li>
                </ul>
              </td>
              <td>
                Creates a new stepwise controller instance and wires bus
                subscriptions.<br /><br />
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
                <strong>#onRequest</strong>
                <p class="modifiers">#private</p>
                <p>inputs:</p>
                <ul>
                  <li>request: StepwiseRequestShape</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Enqueues an inbound stepwise request and triggers processing.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>#onResponse</strong>
                <p class="modifiers">#private</p>
                <p>inputs:</p>
                <ul>
                  <li>response: StepwiseResponseShape</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Processes an external response and resolves the active
                request.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>#processNext</strong>
                <p class="modifiers">#private</p>

                <p>returns: void</p>
              </td>
              <td>
                Advances the request queue and emits the next request when
                idle.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>destroy</strong>

                <p>returns: void</p>
              </td>
              <td>
                Cleans up controller resources and unsubscribes from bus
                streams.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>handleMessage</strong>

                <p>inputs:</p>
                <ul>
                  <li>
                    _:
                    <a href="/docs/references/types/controller-message-shape"
                      >ControllerMessageShape</a
                    >
                  </li>
                </ul>
                <p>
                  returns: Observable&lt;<a
                    href="/docs/references/types/controller-vote"
                    >ControllerVote</a
                  >&gt;
                </p>
              </td>
              <td>
                Handles controller admission messages by abstaining from all
                votes.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>reset</strong>

                <p>returns: void</p>
              </td>
              <td>
                Resets the controller without modifying internal state.<br /><br />
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
                <strong>awaiting?</strong>

                <p class="type">type: StepwiseRequestShape</p>
              </td>
              <td class="column-auto">
                Currently active request awaiting a response.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>bus</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: unknown</p>
                <p class="default">default: StepwiseBusService()</p>
              </td>
              <td class="column-auto">
                Shared stepwise bus used for request, response, and answer
                signaling.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>critical</strong>
                <p class="modifiers">static, readonly</p>
                <p class="type">type: boolean</p>
              </td>
              <td class="column-auto">
                Indicates that this controller is non-critical in the
                pipeline.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>critical</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: unknown</p>
                <p class="default">
                  default:
                  <a href="/docs/pipeline/controllers/with-stepwise-controller"
                    >withStepwiseController</a
                  >.critical
                </p>
              </td>
              <td class="column-auto">
                Indicates whether this controller is critical for pipeline
                execution.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>key</strong>
                <p class="modifiers">static, readonly</p>
                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Static controller key assigned by the decorator.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>key</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Unique controller key for this instance.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>queue</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: StepwiseRequestShape[]</p>
                <p class="default">default: []</p>
              </td>
              <td class="column-auto">
                FIFO queue of pending stepwise requests awaiting processing.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>requestSub</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: Subscription</p>
              </td>
              <td class="column-auto">
                Subscription to inbound stepwise requests.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>responseSub</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: Subscription</p>
              </td>
              <td class="column-auto">
                Subscription to external stepwise responses.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>type</strong>
                <p class="modifiers">static, readonly</p>
                <p class="type">
                  type:
                  <a href="/docs/references/types/controller-type"
                    >ControllerType</a
                  >
                </p>
              </td>
              <td class="column-auto">
                Static controller type identifier assigned by the decorator.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>type</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: unknown</p>
                <p class="default">
                  default:
                  <a href="/docs/pipeline/controllers/with-stepwise-controller"
                    >withStepwiseController</a
                  >.type
                </p>
              </td>
              <td class="column-auto">
                Instance-level controller type identifier.<br /><br />
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
export class withStepwiseControllerComponent {}
