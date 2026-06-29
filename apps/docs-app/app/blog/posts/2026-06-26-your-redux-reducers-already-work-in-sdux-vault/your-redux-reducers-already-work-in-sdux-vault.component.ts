import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  FeatureCellBrandNameComponent,
  MultiFrameworkExampleComponent,
  VaultBrandNameComponent
} from '@sdux-vault/ui/web-components';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector: 'sdux-blog-your-redux-reducers-already-work-in-sdux-vault',
  standalone: true,
  imports: [
    BlogLayoutComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    MultiFrameworkExampleComponent,
    RouterModule,
    BrandNameComponent,
    VaultBrandNameComponent,
    FeatureCellBrandNameComponent
  ],
  template: `
    <sdux-blog-layout
      title="Your Redux Reducers Already Work in SDuX Vault"
      date="2026-06-26"
      pillar="ED"
      readingTime="6">
      <header class="docs-header">
        <p class="lead">
          If your Redux reducer is pure, does not mutate, and preserves shape —
          it works as a <sdux-vault-brand-name [tm]="true" /> reducer behavior
          with zero modification. This is the easiest migration path: take what
          you already have and register it declaratively.
        </p>
      </header>

      <section class="section">
        <div class="section-title">What Makes a Reducer Portable</div>
        <div class="section-body">
          <p>
            A Redux reducer is portable to <sdux-vault-brand-name /> when it
            meets three criteria:
          </p>

          <ul>
            <li>
              <strong>Pure</strong> — same input always produces the same output
            </li>
            <li>
              <strong>Non-mutating</strong> — returns a new object rather than
              modifying the input
            </li>
            <li>
              <strong>Shape-preserving</strong> — the return type matches the
              state interface
            </li>
          </ul>

          <p>
            Most well-written Redux reducers already satisfy all three. The
            patterns Redux taught you — spread operators, array methods that
            return new arrays, computed properties — all produce functions that
            work directly in <sdux-vault-brand-name />.
          </p>

          <div class="callout callout-info">
            <p>
              Reducer functions remain pure and deterministic. Existing Redux
              reducer logic can typically be reused without modification as long
              as they are pure, do not mutate state, and preserve structural
              shape.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">The .reducers() Declarative API</div>
        <div class="section-body">
          <p>
            In Redux, reducers compose into a tree via
            <span class="code">combineReducers()</span>. In
            <sdux-vault-brand-name />, reducers register declaratively through
            the fluent <span class="code">.reducers()</span> API and must be
            configured <strong>before</strong> the <sdux-feature-cell /> is
            initialized.
          </p>

          <sdux-example-viewer-source
            [displayTabs]="false"
            [displayCopyPaste]="false">
            <sdux-example-viewer-tab
              [label]="'Declarative Reducer Registration'">
              <pre class="code-inline"><code class="language-ts">featureCell
  .reducers([
    (current) =&gt; (&#123; ...current, count: current.count + 1 &#125;)
  ])
  .initialize()</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>

          <p>
            Reducers are not dynamically injected into the pipeline. Once
            <span class="code">initialize()</span> is called, the pipeline
            structure is fixed. This guarantees that reducer execution order is
            stable and deterministic for the lifetime of the
            <sdux-feature-cell />.
          </p>

          <p>This constraint ensures:</p>

          <ul>
            <li>Predictable execution ordering</li>
            <li>Stable state derivation rules</li>
            <li>No hidden runtime mutations of state logic</li>
            <li>Deterministic pipeline guarantees</li>
          </ul>
        </div>
      </section>

      <section class="section">
        <div class="section-title">What Stays the Same</div>
        <div class="section-body">
          <p>
            Everything that matters about your reducer logic transfers directly:
          </p>

          <table>
            <thead>
              <tr>
                <th>Concern</th>
                <th>Redux</th>
                <th><sdux-brand-name /></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Function signature</td>
                <td>Pure function: state in, state out</td>
                <td>Pure function: state in, state out</td>
              </tr>
              <tr>
                <td>Immutability</td>
                <td>Spread operators, Object.assign</td>
                <td>Same patterns — no change</td>
              </tr>
              <tr>
                <td>Shape preservation</td>
                <td>TypeScript enforces return type</td>
                <td>TypeScript enforces return type</td>
              </tr>
              <tr>
                <td>Testability</td>
                <td>Call function, assert output</td>
                <td>Call function, assert output</td>
              </tr>
              <tr>
                <td>Composition</td>
                <td>Multiple reducers per feature</td>
                <td>Array of reducers per <sdux-feature-cell /></td>
              </tr>
            </tbody>
          </table>

          <p>
            The function you wrote for Redux is the function you register in
            <sdux-vault-brand-name />. The investment in learning pure state
            transformations was not wasted — it was preparation.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          What Changes — Registration, Not Composition
        </div>
        <div class="section-body">
          <p>
            In Redux, reducers compose into a root reducer tree and execute
            whenever <span class="code">dispatch()</span> is called. Advanced
            setups may dynamically inject reducers at runtime, replace reducer
            trees, or alter store structure during execution.
          </p>

          <p>
            In <sdux-vault-brand-name />, reducers exist as a dedicated
            <strong>Reducer Stage</strong> within the pipeline. They are
            registered declaratively and the pipeline structure is fixed after
            initialization:
          </p>

          <sdux-multi-framework-example description="Reducer Registration">
            <ng-template #angular>
              <pre
                class="code-inline"><code class="language-ts">import &#123; FeatureCell, injectVault &#125; from '&#64;sdux-vault/angular';

// Your existing Redux reducer logic — unchanged
const normalizeEmail = (state: UserState) =&gt; (&#123;
  ...state,
  email: state.email.toLowerCase().trim()
&#125;);

const applyDefaultRole = (state: UserState) =&gt; (&#123;
  ...state,
  role: state.role || 'viewer'
&#125;);

// user.service.ts
&#64;FeatureCell&lt;UserState&gt;('user')
&#64;Injectable(&#123; providedIn: 'root' &#125;)
export class UserService &#123;
  readonly vault = injectVault&lt;UserState&gt;(UserService);

  constructor() &#123;
    this.vault
      .reducers([normalizeEmail, applyDefaultRole])
      .initialize();
  &#125;
&#125;</code></pre>
            </ng-template>
            <ng-template #core>
              <pre
                class="code-inline"><code class="language-ts">import &#123; FeatureCell &#125; from '&#64;sdux-vault/core';

// Your existing Redux reducer logic — unchanged
const normalizeEmail = (state: UserState) =&gt; (&#123;
  ...state,
  email: state.email.toLowerCase().trim()
&#125;);

const applyDefaultRole = (state: UserState) =&gt; (&#123;
  ...state,
  role: state.role || 'viewer'
&#125;);

// Register declaratively — fixed order, explicit ownership
const userCell = FeatureCell(&#123;
  key: 'user',
  initialState: &#123; email: '', role: '', name: '' &#125;
&#125;)
  .reducers([normalizeEmail, applyDefaultRole])
  .initialize();</code></pre>
            </ng-template>
          </sdux-multi-framework-example>

          <p>Three differences matter:</p>

          <ul>
            <li>
              <strong>Scoped ownership</strong> — reducers belong to one
              <sdux-feature-cell />, not a global tree
            </li>
            <li>
              <strong>Fixed order</strong> — array position determines execution
              order, permanently
            </li>
            <li>
              <strong>No global evaluation</strong> — reducers only execute when
              their owning cell updates
            </li>
          </ul>

          <p>
            Unlike Redux reducer trees, which may be composed or replaced at
            runtime, <sdux-vault-brand-name /> enforces pipeline consistency.
            Reducers cannot be added, removed, or reordered after
            initialization.
          </p>

          <div class="callout callout-warning">
            <p>
              Reducers are the <em>only</em> stage permitted to produce the
              committed state value. They never control scheduling, never emit
              snapshots directly, and never influence pipeline flow.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Redux vs <sdux-brand-name /> — Side by Side
        </div>
        <div class="section-body">
          <table>
            <thead>
              <tr>
                <th>Concern</th>
                <th>Redux</th>
                <th><sdux-brand-name /></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Registration</td>
                <td>
                  <span class="code">combineReducers()</span> into root tree
                </td>
                <td>
                  <span class="code">.reducers([])</span> on owning
                  <sdux-feature-cell />
                </td>
              </tr>
              <tr>
                <td>Execution trigger</td>
                <td>Every global dispatch</td>
                <td>Only when the owning cell updates</td>
              </tr>
              <tr>
                <td>Dynamic injection</td>
                <td>Supported at runtime</td>
                <td>Not permitted — fixed at initialization</td>
              </tr>
              <tr>
                <td>Execution order</td>
                <td>Determined by tree structure</td>
                <td>Determined by array position — guaranteed stable</td>
              </tr>
              <tr>
                <td>Reducer logic</td>
                <td>Pure function</td>
                <td>Same pure function — no modification needed</td>
              </tr>
            </tbody>
          </table>

          <div class="callout callout-info">
            <p>
              The reducer logic itself does not change. The ceremony around it
              disappears. No action type constants, no creator functions, no
              combineReducers tree, no global evaluation on every dispatch.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Try It Yourself</div>
        <div class="section-body">
          <p>
            Take an existing Redux reducer and register it in a
            <sdux-feature-cell />. The function stays the same — the wiring
            simplifies:
          </p>

          <!-- StackBlitz: your-redux-reducers-already-work -->

          <ul>
            <li>
              <a routerLink="/docs/migration">
                Redux Concepts in <sdux-brand-name /> — Full migration reference
              </a>
            </li>
            <li>
              <a routerLink="/docs/pipeline/behaviors/reducers">
                Reducer Behaviors
              </a>
            </li>
            <li>
              <a routerLink="/docs/pipeline"> Understanding the Pipeline </a>
            </li>
          </ul>
        </div>
      </section>
    </sdux-blog-layout>
  `,
  styleUrls: ['../../../docs/scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogYourReduxReducersAlreadyWorkInSduxVaultComponent {}
