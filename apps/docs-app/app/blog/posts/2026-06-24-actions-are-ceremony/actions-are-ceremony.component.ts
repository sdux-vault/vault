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
  selector: 'sdux-blog-actions-are-ceremony',
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
      title="Actions Are Ceremony — What Happens When You Remove Them"
      date="2026-06-24"
      pillar="TA"
      readingTime="6">
      <header class="docs-header">
        <p class="lead">
          Redux actions were a breakthrough — explicit intent as data. But
          action type strings, creator functions, and switch statements scaled
          into boilerplate factories. What if you kept the explicitness but
          dropped the ceremony? <sdux-vault-brand-name [tm]="true" /> answers
          that question with <span class="code">mergeState()</span> and
          <span class="code">replaceState()</span>.
        </p>
      </header>

      <section class="section">
        <div class="section-title">What Actions Were Supposed to Solve</div>
        <div class="section-body">
          <p>
            Redux introduced actions as plain objects describing state
            transitions. The idea was sound: make every state change explicit,
            traceable, and replayable. Actions gave you a log of everything that
            happened in your application.
          </p>

          <p>
            The contract was simple — an object with a <strong>type</strong>
            string and an optional payload:
          </p>

          <sdux-example-viewer-source
            [displayTabs]="false"
            [displayCopyPaste]="false">
            <sdux-example-viewer-tab [label]="'Redux Action Pattern'">
              <pre
                class="code-inline"><code class="language-ts">// Action type constant
const ADD_USER = 'ADD_USER';

// Action creator function
function addUser(user: User) &#123;
  return &#123; type: ADD_USER, payload: user &#125;;
&#125;

// Dispatch
dispatch(addUser(newUser));</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>

          <p>
            For small applications, this worked. The intent was clear, the data
            flow was linear, and debugging was straightforward.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Where Action Ceremony Breaks Down</div>
        <div class="section-body">
          <p>
            As applications grow, actions multiply. Every feature needs type
            constants, creator functions, and reducer cases. The ceremony scales
            linearly with your feature count:
          </p>

          <table>
            <thead>
              <tr>
                <th>Redux Requirement</th>
                <th>Per Feature</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Action type string constants</td>
                <td>3–10+</td>
              </tr>
              <tr>
                <td>Action creator functions</td>
                <td>3–10+</td>
              </tr>
              <tr>
                <td>Reducer switch/case branches</td>
                <td>3–10+</td>
              </tr>
              <tr>
                <td>Type union exports</td>
                <td>1 per feature</td>
              </tr>
              <tr>
                <td>Selector functions</td>
                <td>2–5+</td>
              </tr>
            </tbody>
          </table>

          <p>
            A ten-feature application can easily accumulate 50+ action types,
            50+ creator functions, and dozens of reducer branches — most of
            which do nothing more than assign a payload to a state key. The
            ceremony exists to satisfy the framework, not to express intent.
          </p>

          <div class="callout callout-warning">
            <p>
              The overhead is not just lines of code. It is cognitive load.
              Every new developer must learn the naming conventions, file
              organization, and boilerplate patterns before they can express a
              single state change.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Direct State Intent with mergeState</div>
        <div class="section-body">
          <p>
            <sdux-vault-brand-name /> does not use global action objects.
            Instead, state updates are invoked directly on the owning
            <sdux-feature-cell />. You call
            <span class="code">mergeState()</span> or
            <span class="code">replaceState()</span> on the state owner itself —
            no type strings, no creator functions, no dispatch broadcasts.
          </p>

          <sdux-multi-framework-example description="Direct State Update">
            <ng-template #angular>
              <pre
                class="code-inline"><code class="language-ts">import &#123; FeatureCell, injectVault &#125; from '&#64;sdux-vault/angular';

&#64;FeatureCell&lt;UserState&gt;('user')
&#64;Injectable(&#123; providedIn: 'root' &#125;)
export class UserService &#123;
  readonly vault = injectVault&lt;UserState&gt;(UserService);

  updateUser(name: string, role: string) &#123;
    // Direct state intent — no action creators needed
    this.vault.mergeState(&#123; value: &#123; name, role &#125; &#125;);
  &#125;

  resetUser() &#123;
    // Or replace entirely
    this.vault.replaceState(&#123; value: defaultUser &#125;);
  &#125;
&#125;</code></pre>
            </ng-template>
            <ng-template #core>
              <pre
                class="code-inline"><code class="language-ts">import &#123; FeatureCell &#125; from '&#64;sdux-vault/core';

const userCell = FeatureCell('user', &#123; value: defaultUser &#125;);

// Direct state intent — no action creators needed
userCell.mergeState(&#123; value: &#123; name: 'Alice', role: 'admin' &#125; &#125;);

// Or replace entirely
userCell.replaceState(&#123; value: defaultUser &#125;);</code></pre>
            </ng-template>
          </sdux-multi-framework-example>

          <p>
            The update target is unambiguous. You are calling a method on the
            state owner — not broadcasting an event to a global store hoping the
            right reducer picks it up.
          </p>

          <div class="callout callout-info">
            <p>
              <span class="code">mergeState()</span> combines your input with
              the current state using a declarative merge behavior. The default
              is <strong>withArrayMerge</strong>, but you can swap in
              <strong>withObjectShallowMerge</strong>,
              <strong>withObjectDeepMerge</strong>,
              <strong>withArrayPushMerge</strong>,
              <strong>withArrayAppendMerge</strong> or write your own custom
              merge behavior — one declaration per <sdux-feature-cell />, no
              code changes at the call site.
              <span class="code">replaceState()</span> bypasses merge entirely
              and replaces state outright. Both trigger the full deterministic
              pipeline with the execution guarantee ensuring ordered, atomic
              completion.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Redux vs SDuX Vault — Side by Side</div>
        <div class="section-body">
          <p>Here is the same state update expressed in both systems:</p>

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
                <td>Define intent</td>
                <td>Action type string + creator function</td>
                <td>Call <span class="code">mergeState()</span> directly</td>
              </tr>
              <tr>
                <td>Route to handler</td>
                <td>Global dispatch → reducer tree evaluation</td>
                <td>Method on owning <sdux-feature-cell /></td>
              </tr>
              <tr>
                <td>Compute next state</td>
                <td>Switch/case in reducer</td>
                <td>Pipeline behaviors (resolve, merge, reduce)</td>
              </tr>
              <tr>
                <td>Boilerplate per update</td>
                <td>Type constant + creator + reducer case</td>
                <td>One method call</td>
              </tr>
              <tr>
                <td>Traceability</td>
                <td>Action log in DevTools</td>
                <td>Pipeline execution trace in built-in debugger</td>
              </tr>
            </tbody>
          </table>

          <p>
            You do not lose traceability by removing actions. The pipeline
            execution trace provides the same visibility — which
            <sdux-feature-cell /> was updated, what input was provided, which
            behaviors ran, and what state was committed.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          When Action-Like Structures Still Make Sense
        </div>
        <div class="section-body">
          <p>
            <sdux-vault-brand-name /> does not prohibit action-like structures.
            If your team benefits from named intent objects for organization or
            auditability, you can still structure your input that way:
          </p>

          <sdux-example-viewer-source
            [displayTabs]="false"
            [displayCopyPaste]="false">
            <sdux-example-viewer-tab [label]="'Optional Action-Like Structure'">
              <pre
                class="code-inline"><code class="language-ts">// You can still organize updates as named objects
const addUserIntent = &#123; value: &#123; name: 'Alice', role: 'admin' &#125; &#125;;

// Pass directly to the owning FeatureCell
userCell.mergeState(addUserIntent);</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>

          <p>
            The difference is that this is optional. You are not forced into
            type strings, creator functions, or switch statements to satisfy the
            framework. The ceremony is gone. The clarity remains.
          </p>

          <div class="callout callout-info">
            <p>
              <sdux-vault-brand-name /> is intentionally designed to minimize
              structural boilerplate. Action creators, switch statements, and
              large type unions are not required for correctness. Avoid
              recreating Redux-style ceremony unless it provides clear value for
              your specific application.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Try It Yourself</div>
        <div class="section-body">
          <p>
            See how <sdux-vault-brand-name /> eliminates action ceremony in a
            live, runnable example:
          </p>
          <!-- StackBlitz: actions-are-ceremony -->
          <ul>
            <li>
              <a routerLink="/docs/migration">
                Redux Concepts in <sdux-brand-name /> — Full migration reference
              </a>
            </li>
            <li>
              <a
                routerLink="/docs/pipeline/apis/feature-cell-api/merge-state-method">
                Understanding mergeState()
              </a>
            </li>
            <li>
              <a
                routerLink="/docs/pipeline/apis/feature-cell-api/replace-state-method">
                Understanding replaceState()
              </a>
            </li>
          </ul>
        </div>
      </section>
    </sdux-blog-layout>
  `,
  styleUrls: ['../../../docs/scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogActionsAreCeremonyComponent {}
