import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  CatchPhraseComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  FeatureCellBrandNameComponent
} from '@sdux-vault/ui/web-components';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector: 'sdux-blog-plain-typescript-zero-magic',
  standalone: true,
  imports: [
    BlogLayoutComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    RouterModule,
    BrandNameComponent,
    CatchPhraseComponent,
    FeatureCellBrandNameComponent
  ],
  template: `
    <sdux-blog-layout id="plain-typescript-zero-magic">
      <header class="docs-header">
        <p class="lead">
          <sdux-catch-phrase [tm]="true" /> is not a tagline &mdash; it is a
          design constraint. <sdux-brand-name [tm]="true" /> does not rely on
          hidden runtime behavior, implicit mutation, or framework-level
          interception. What you write is what executes. This post unpacks what
          that constraint means in practice, and why "no hidden runtime
          behavior" is the property you feel most when you are debugging,
          testing, and deciding whether to trust a library with your application
          state.
        </p>
      </header>

      <section class="section">
        <div class="section-title">What Zero Magic Means Technically</div>
        <div class="section-body">
          <p>
            "Magic" in a state library is any behavior that runs on your behalf
            without appearing in your code. A proxy that intercepts property
            writes. A decorator that rewrites a method at runtime. A global
            dispatcher that fans an action out to listeners you never registered
            directly. Each of these moves execution off the page you are reading
            and into machinery you cannot see.
          </p>
          <p>
            <sdux-brand-name /> takes the opposite position as a deliberate
            constraint: pure functions stay pure, side effects are explicit, and
            execution is observable. The goal is not abstraction for its own
            sake &mdash; it is clarity. Every concept you work with is a
            language-level primitive, so the behavior on the screen is the
            behavior at runtime.
          </p>
          <div class="callout callout-info">
            <p>
              <strong>Key takeaway:</strong> The design constraint is literal.
              No hidden runtime behavior, no implicit mutation, no
              framework-level interception. If a state change happens, it
              happens because your code called for it at a place you can point
              to.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">No Implicit Mutation, No Interception</div>
        <div class="section-body">
          <p>
            Two of the most common sources of "how did this value change?"
            confusion are implicit mutation and silent interception.
            <sdux-brand-name /> removes both by construction.
          </p>
          <p>
            Reducer functions remain pure and deterministic. A reducer takes the
            current state and returns the next one &mdash; it does not reach out
            and modify the existing value in place. Because the function is
            pure, you can read it, reason about it, and test it in isolation
            with nothing but its inputs.
          </p>
          <sdux-example-viewer-source
            [displayTabs]="false"
            [displayCopyPaste]="false">
            <sdux-example-viewer-tab [label]="'Pure Reducer'">
              <pre class="code-inline"><code class="language-ts">featureCell
  .reducers([
    (current) =&gt; (&#123; ...current, count: current.count + 1 &#125;)
  ])
  .initialize();</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>
          <p>
            There is no proxy watching that object and no framework layer
            intercepting the return value on its way out. The reducer runs, and
            the value it returns is the value the pipeline works with. Existing
            reducer logic transfers directly as long as it stays pure, does not
            mutate state, and preserves the structural shape of the value.
          </p>
          <div class="callout callout-warning">
            <p>
              <strong>Warning:</strong> "No implicit mutation" is a contract you
              hold up too. If a reducer mutates the incoming state instead of
              returning a new value, you break the guarantee the library is
              built to protect. Return new structures; never edit the argument
              in place.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">What You Write Is What Executes</div>
        <div class="section-body">
          <p>
            Updating state is an explicit call, not a broadcast. When you update
            a <sdux-feature-cell [tm]="true" />, you are updating that specific
            cell &mdash; not emitting an event into a global store and hoping
            the right listener reacts. The state owner is known at the call
            site, and the update target is unambiguous.
          </p>
          <sdux-example-viewer-source
            [displayTabs]="false"
            [displayCopyPaste]="false">
            <sdux-example-viewer-tab [label]="'Explicit State Update'">
              <pre
                class="code-inline"><code class="language-ts">vault.replaceState(nextValue);

// or

vault.mergeState(partialValue);</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>
          <p>
            Instead of dispatching an action object and letting a reducer tree
            decide what it meant, you submit state input into the pipeline
            directly. The execution flows through a deterministic pipeline
            rather than a chain of middleware. You do not have to hold a mental
            model of interceptors firing in an order you did not specify &mdash;
            the call you write is the work that runs.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Why This Matters for Debugging</div>
        <div class="section-body">
          <p>
            Debugging is, mostly, answering two questions: what changed, and
            what caused it. Hidden runtime behavior makes both questions harder,
            because the cause lives somewhere your stack trace does not
            obviously lead. When execution is observable and explicit, the
            answers are already on the page.
          </p>
          <p>
            Because updates target a known cell from a known call site, a stack
            trace points at the code that requested the change. Because reducers
            are pure, you can reproduce a transition with its inputs alone.
            Because state commitment is coordinated by the pipeline, observers
            never see partial results &mdash; you are never chasing a value that
            was briefly half-applied and then corrected.
          </p>
          <div class="callout callout-info">
            <p>
              <strong>Key takeaway:</strong> The absence of magic is what makes
              a debugger useful again. There is no layer of interception between
              the line you set a breakpoint on and the state transition it
              produces.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Why This Matters for Trust</div>
        <div class="section-body">
          <p>
            Trust in a state library is really trust in its guarantees: that
            execution ordering is predictable, that state derivation rules are
            stable, that there are no hidden runtime mutations of your logic.
            Those guarantees are only credible if you can verify them &mdash;
            and you can only verify what is explicit.
          </p>
          <p>
            "Plain TypeScript, Zero Magic" is what makes the guarantees
            inspectable. You can read the reducer and know it is pure. You can
            read the update call and know exactly which cell it targets. You can
            follow execution through the pipeline instead of taking a
            framework's word that everything resolved correctly. Trust here is
            not asked for &mdash; it is earned by being observable.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Deeper Dive</div>
        <div class="section-body">
          <p>
            "No hidden runtime behavior" is a constraint you can hold the
            library to, not a promise you have to take on faith. See how the
            same explicit model maps onto patterns you already know in the
            <a [routerLink]="['/docs/migration']">migration guide</a>, and
            explore <sdux-brand-name /> on
            <a
              href="https://github.com/sdux-vault"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit the SDuX Vault GitHub organization in a new window"
              >GitHub &rarr;</a
            >
          </p>
        </div>
      </section>
    </sdux-blog-layout>
  `,
  styleUrls: ['../../../docs/scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogPlainTypescriptZeroMagicComponent {}
