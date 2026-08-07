/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/pipeline/controllers/with-delay-controller">withDelayController</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import {
  BrandNameComponent,
  PackageNameComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-with-delay-controller',
  standalone: true,
  imports: [BrandNameComponent, PackageNameComponent],
  template: `<div class="docs-container">
    <div class="header">
      <h2>
        <a href="/docs/pipeline/controllers/with-delay-controller"
          >withDelayController</a
        >
      </h2>
    </div>
    <header class="docs-header">
      <div class="lead">
        Policy controller that delays pipeline execution by a configured
        interval.<br /><br />
        The withDelay controller queues incoming pipeline traces and denies
        their initial attempt. After the configured delay elapses, it requests a
        revote to allow the trace to proceed through the pipeline.<br /><br />
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
              <td>Creates a withDelay controller instance.<br /><br /></td>
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
                <strong>clearTimer</strong>
                <p class="modifiers">#private</p>

                <p>returns: void</p>
              </td>
              <td>Clears the active revote timer.<br /><br /></td>
            </tr>
            <tr>
              <td>
                <strong>destroy</strong>

                <p>returns: void</p>
              </td>
              <td>
                Destroys the controller by clearing all queued traces and
                timers.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>fireExpired</strong>
                <p class="modifiers">#private</p>

                <p>returns: void</p>
              </td>
              <td>
                Requests revotes for all expired traces in the queue.<br /><br />
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
                Handles a controller message by queuing or releasing traces
                based on delay.<br /><br />
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
                Installs the withDelay fluent API on a
                <a href="/docs/references/functions/feature-cell"
                  >FeatureCell</a
                >
                builder.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>reset</strong>

                <p>returns: void</p>
              </td>
              <td>
                Resets the controller by clearing all queued traces and
                timers.<br /><br />
              </td>
            </tr>
            <tr>
              <td>
                <strong>scheduleNextTimer</strong>
                <p class="modifiers">#private</p>

                <p>returns: void</p>
              </td>
              <td>
                Schedules a timer for the earliest queued trace.<br /><br />
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
                <strong>configKey</strong>
                <p class="modifiers">static, readonly</p>
                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Configuration key used to retrieve delay options.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>critical</strong>
                <p class="modifiers">static, readonly</p>
                <p class="type">type: boolean</p>
              </td>
              <td class="column-auto">
                Whether this controller is critical for pipeline execution.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>critical</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: unknown</p>
                <p class="default">
                  default:
                  <a href="/docs/pipeline/controllers/with-delay-controller"
                    >withDelayController</a
                  >.critical
                </p>
              </td>
              <td class="column-auto">
                Instance-level critical flag.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>extensionFluent</strong>
                <p class="modifiers">static, readonly</p>
                <p class="type">type: unknown</p>
                <p class="default">default: extendWithDelayFluent</p>
              </td>
              <td class="column-auto">
                Fluent API installation function for
                <a href="/docs/references/functions/feature-cell"
                  >FeatureCell</a
                >
                builders.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>key</strong>
                <p class="modifiers">static, readonly</p>
                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Unique key identifying this controller.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>key</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: string</p>
              </td>
              <td class="column-auto">
                Instance-level unique key.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>milliseconds</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: number</p>
              </td>
              <td class="column-auto">
                Configured delay in milliseconds.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>queue</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: unknown</p>
                <p class="default">default: new Map()</p>
              </td>
              <td class="column-auto">
                Map of trace IDs to their scheduled emit timestamps.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>timer</strong>

                <p class="type">type: ReturnType | null</p>
                <p class="default">default: null</p>
              </td>
              <td class="column-auto">
                Active timer reference for the next scheduled revote.<br /><br />
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
                Controller type classification.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>type</strong>
                <p class="modifiers">readonly</p>
                <p class="type">type: unknown</p>
                <p class="default">
                  default:
                  <a href="/docs/pipeline/controllers/with-delay-controller"
                    >withDelayController</a
                  >.type
                </p>
              </td>
              <td class="column-auto">
                Instance-level controller type.<br /><br />
              </td>
            </tr>
            <tr>
              <td class="column-300">
                <strong>wantsConfig</strong>
                <p class="modifiers">static, readonly</p>
                <p class="type">type: boolean</p>
              </td>
              <td class="column-auto">
                Whether this controller requires configuration.<br /><br />
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
export class withDelayControllerComponent {}
