/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/pipeline/controllers/with-max-failures-controller">withMaxFailuresController</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-with-max-failures-controller',
  standalone: true,
  imports: [BrandNameComponent, PackageNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h2>
        <a href="/docs/pipeline/controllers/with-max-failures-controller"
          >withMaxFailuresController</a
        >
      </h2>
    </div>
    <header class="docs-header">
      <div class="lead">
        Error controller that tracks per-trace failure counts and aborts
        pipeline attempts once the configured maximum number of failures is
        exceeded.<br /><br />
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
                    controllerCtx:
                    <a href="/docs/references/contexts/controller-class-context"
                      >ControllerClassContext</a
                    >
                  </li>
                </ul>

                <p>implements:</p>
                <ul>
                  <li>
                    <a href="/docs/references/contracts/controller-contract"
                      >ControllerContract</a
                    >
                  </li>
                </ul>
              </td>
              <td>
                Creates a new max-failures controller instance.<br /><br />
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
                <strong>destroy</strong>

                <p>returns: void</p>
              </td>
              <td>
                Tears down the controller and clears the failure counters.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>handleMessage</strong>

                <p>inputs:</p>
                <ul>
                  <li>
                    msg:
                    <a href="/docs/references/types/controller-message-shape"
                      >ControllerMessageShape</a
                    >
                  </li>
                </ul>
                <p>
                  returns: Observable&lt;<a
                    href="/docs/references/types/controller-vote"
                    >ControllerVote</a
                  >
                  | void&gt;
                </p>
              </td>
              <td>
                Evaluates an incoming controller message against the failure
                threshold.<br /><br />
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
                  <li>controllerConfigs: Map</li>
                </ul>
                <p>returns: void</p>
              </td>
              <td>
                Installs the fluent withMaxFailures configuration method on the
                <a href="/docs/references/functions/feature-cell">FeatureCell</a
                >.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>reset</strong>

                <p>returns: void</p>
              </td>
              <td>
                Resets the failure counters to allow fresh attempts.<br /><br />
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
                <strong>activeTraceId</strong>

                <p class="type">type: string | undefined</p>
              </td>
              <td class="column-auto">
                Trace identifier currently being tracked for failures.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>configKey</strong>
                <p class="modifiers">static, readonly</p>
                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Configuration key used to locate max-failure options in the
                config registry.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>critical</strong>
                <p class="modifiers">static, readonly</p>
                <p class="type">type: boolean</p>
              </td>
              <td class="column-auto">
                Whether errors from this controller halt the pipeline.<br /><br />
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
                    href="/docs/pipeline/controllers/with-max-failures-controller"
                    >withMaxFailuresController</a
                  >.critical
                </p>
              </td>
              <td class="column-auto">
                Whether this controller is critical to pipeline execution.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>extensionFluent</strong>
                <p class="modifiers">static, readonly</p>
                <p class="type">type: unknown</p>
                <p class="default">default: extendWithMaxFailureFluent</p>
              </td>
              <td class="column-auto">
                Fluent extension function for max-failure configuration.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>failureCount</strong>

                <p class="type">type: number</p>
                <p class="default">default: 0</p>
              </td>
              <td class="column-auto">
                Accumulated failure count for the active trace.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>key</strong>
                <p class="modifiers">static, readonly</p>
                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Unique controller key used for diagnostics and devtools.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>key</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Unique identifier for this controller instance.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>maxFailures</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: number</p>
              </td>
              <td class="column-auto">
                Maximum number of failures allowed before aborting.<br /><br />
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
                Static controller type used for orchestrator classification.<br /><br />
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
                    href="/docs/pipeline/controllers/with-max-failures-controller"
                    >withMaxFailuresController</a
                  >.type
                </p>
              </td>
              <td class="column-auto">
                The controller type identifier for this instance.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>wantsConfig</strong>
                <p class="modifiers">static, readonly</p>
                <p class="type">type: boolean</p>
              </td>
              <td class="column-auto">
                Whether this controller requires consumer-supplied
                configuration.<br /><br />
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
export class withMaxFailuresControllerComponent {}
