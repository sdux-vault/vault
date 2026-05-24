import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-vault-state-callback-fluent-api-common',
  standalone: true,
  template: `
    <!-- Updated 2026-01-29 -->
    <section class="section">
      <div class="section-title">
        <a href="/docs/references/functions/feature-cell">FeatureCell</a>
        Initialization
      </div>

      <div class="section-body">
        <p>
          The State stage exposes a fluent configuration API that allows
          engineers to register
          <em>emit-state callbacks</em> during
          <a href="/docs/references/functions/feature-cell">FeatureCell</a>
          initialization. These callbacks are invoked by the core
          <strong
            ><a
              href="/docs/pipeline/behaviors/state/with-core-emit-state-behavior"
              >withCoreEmitStateBehavior</a
            ></strong
          >
          after state has been fully committed.
        </p>

        <p>
          This API does not participate in pipeline execution, state derivation,
          or state commitment. It records an ordered set of callbacks that are
          invoked only after the authoritative state snapshot has been produced
          and exposed through <strong>.state</strong> and
          <strong>.state$</strong>.
        </p>

        <div class="table-title">Fluent Emit-State Callback Configuration</div>
        <table>
          <thead>
            <tr>
              <th class="column-300">Fluent API</th>
              <th class="column-auto">Description</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                <p><strong>.emitStates(emitStates)</strong></p>

                <p>input:</p>
                <ul>
                  <li>
                    emitStates:
                    <a href="/docs/references/types/core-emit-state-callback">
                      CoreEmitStateCallback </a
                    >&lt;T&gt;[]
                  </li>
                </ul>

                <p>
                  returns:
                  <a href="/docs/references/shapes/feature-cell-base-shape">
                    FeatureCellBaseShape
                  </a>
                  (chainable)
                </p>
              </td>

              <td>
                <p>
                  Registers emit-state callback functions for a
                  <a href="/docs/references/functions/feature-cell"
                    >FeatureCell</a
                  >. The supplied callbacks are invoked during the State stage
                  after the finalized state snapshot has been committed and
                  emitted.
                </p>

                <p>
                  Emit-state callbacks execute in the
                  <em>State Emission Layer</em> in the exact order they are
                  registered. This method must be called before
                  <code>initialize()</code>. Multiple calls overwrite any
                  previously registered emit-state callbacks.
                </p>

                <p>
                  Emit-state callbacks are strictly observational. They do not
                  influence pipeline execution, do not mutate state, and do not
                  participate in error handling or recovery.
                </p>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="note">Note</div>
        <p>
          Emit-state callbacks exist primarily for backward compatibility with
          imperative or callback-oriented codebases. The recommended mechanism
          for observing state changes is the reactive
          <strong>.state</strong> (synchronous getter / Angular signal) or
          <strong>.state$</strong> (observable) interface. Emit-state callbacks
          should not be relied upon for core application logic.
        </p>
      </div>
    </section>
  `,
  styleUrls: ['../../scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StateCallbackFluentApiCommonComponent {}
