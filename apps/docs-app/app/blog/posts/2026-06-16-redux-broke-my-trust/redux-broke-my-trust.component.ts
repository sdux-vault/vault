import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  SDuXVideoComponent
} from '@sdux-vault/ui/web-components';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector: 'sdux-blog-redux-broke-my-trust',
  standalone: true,
  imports: [
    BlogLayoutComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    RouterModule,
    BrandNameComponent,
    SDuXVideoComponent
  ],
  template: `
    <sdux-blog-layout
      title="I Built a State Engine Because Redux Broke My Trust"
      date="2026-06-16"
      pillar="TA"
      readingTime="8">
      <header class="docs-header">
        <p class="lead">
          I set out to build a state management library — a deterministic
          pipeline. After years of Redux boilerplate that everyone accepted as
          normal, action creators you were told to "write once and copy-paste,"
          and reducer sprawl that buried intent under ceremony — I stopped
          tolerating it and started building something clean.
          <sdux-brand-name /> 1.0 is the result.
        </p>
      </header>

      <section class="section">
        <div class="section-title">The Breaking Point</div>
        <div class="section-body">
          <p>
            There's a moment every developer recognizes — the moment you realize
            you're spending more time writing boilerplate than solving problems.
            Action types. Action creators. Reducer switch statements. Selector
            files. Effect classes. Barrel exports to wire it all together. And
            the justification was always the same: "You write it once and then
            copy and paste."
          </p>
          <p>
            That was never good enough for me. Copy-paste isn't architecture.
            It's capitulation. Every pasted block is a block nobody reads,
            nobody questions, and nobody maintains — until it breaks. And when
            you have hundreds of pasted action-reducer pairs across a codebase,
            "find the bug" becomes "find the needle in a haystack of
            identical-looking files."
          </p>
          <p>
            My standard has always been clean, readable, deterministic code.
            Code where the intent is obvious from the structure. Code where a
            new team member can open a file and understand what it does without
            cross-referencing four other files. Redux's boilerplate was the
            opposite of that — it buried intent under ceremony and called it a
            pattern.
          </p>
          <p>
            I couldn't take the bloat anymore. Not the volume of files, not the
            ritualistic repetition, and not the industry consensus that this was
            somehow acceptable. So I stopped patching around it and started
            building something that didn't need patching.
          </p>

          <div class="callout callout-info">
            <strong>Key insight:</strong> If your state management architecture
            requires you to copy and paste the same scaffolding for every
            feature, the architecture is the problem — not your productivity.
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">What Deterministic Actually Means</div>
        <div class="section-body">
          <p>
            The boilerplate problem isn't just about volume — it's about what
            the volume hides. When you scatter intent across action files,
            reducer files, effect files, and selector files, you lose the
            ability to read a feature and understand it. That's the opposite of
            clean code. Clean code is readable. Readable code is deterministic.
            Deterministic code tells you exactly what will happen without
            chasing references across a directory tree.
          </p>
          <p>
            "Deterministic" gets thrown around a lot. Redux calls itself
            predictable. NgRx calls itself reactive. But predictable doesn't
            mean deterministic, and reactive doesn't mean ordered. Predictable
            means you can guess what might happen. Deterministic means: same
            input, same pipeline, same result. Every time. Enforced by the
            architecture, not by your discipline.
          </p>
          <p>
            That distinction mattered to me because I wanted code I could trust
            on sight. In <sdux-brand-name />, every state transition flows
            through a single, ordered execution pipeline. No middleware chain
            running in whatever order it registered. No action dispatch
            intercepted by an effect you forgot existed. No selector returning
            stale data because something changed underneath it.
          </p>
          <p>
            One pipeline. One direction. One result. You read it, you know it.
            That's deterministic — and that's what clean code demands.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">The Pipeline Is the Contract</div>
        <div class="section-body">
          <p>
            Redux's boilerplate exists because the architecture doesn't give you
            structure — so you build your own, file by file, pattern by pattern,
            copy by paste. I wanted the opposite: an execution model that
            <em>is</em> the structure. No scaffolding required. No ceremony to
            maintain. The pipeline itself is the contract, and the contract
            eliminates the need for all that boilerplate.
          </p>
          <p>
            That's why the pipeline isn't a feature of
            <sdux-brand-name /> — it <em>is</em> <sdux-brand-name />. Every
            state transition flows through nine ordered stages. Each stage has a
            single responsibility. No stage can skip ahead, run out of order, or
            silently fail. You don't need action creators to describe intent —
            the pipeline stage <em>is</em>
            the intent.
          </p>

          <div class="code-inline">
            Controllers &rarr; Interceptors &rarr; Resolve &rarr; Merge &rarr;
            Operators &rarr; Filters &rarr; Reducers &rarr; State &rarr;
            Extensions
          </div>

          <p>
            Controllers govern policy — when, how, and whether execution
            proceeds. Interceptors guard and transform incoming actions before
            they reach the pipeline. Operators refine or suppress candidates
            before resolution. Resolve normalizes incoming input into a resolved
            candidate value. Merge combines the current committed state with the
            resolved candidate. Filters gate execution based on conditions.
            Reducers compute the finalized candidate state. State commits and
            exposes finalized state snapshots. Extensions handle post-commit
            work like encryption and persistence.
          </p>
          <p>
            This isn't a plugin system you bolt together with boilerplate. It's
            a contract you define once, read plainly, and trust completely. When
            you open a pipeline definition, you know exactly what will happen,
            in what order, every time. No cross-referencing. No ceremony. That's
            what I spent years building toward.
          </p>

          <div class="callout callout-info">
            <strong>Key takeaway:</strong> The pipeline is the contract. The
            contract is the truth. Every transition explicit. Every output
            guaranteed. No exceptions.
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Nine Stages — One Direction — Zero Ambiguity
        </div>
        <div class="section-body">
          <p>
            Redux gives you a reducer and tells you to figure out the rest. Need
            async? Write a middleware and its boilerplate. Need validation?
            Another middleware, another set of files. Need logging? Another one.
            Every concern adds another layer of copy-pasted scaffolding, and
            none of it has a guaranteed execution order.
          </p>
          <p>
            I built <sdux-brand-name /> to replace that sprawl with nine
            explicit stages. No middleware to wire. No action types to declare.
            Each stage has a defined role:
          </p>

          <table>
            <thead>
              <tr>
                <th><strong>Stage</strong></th>
                <th><strong>Role</strong></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Controllers</td>
                <td>
                  Policy-driven governance — control when, how, and whether
                  execution proceeds
                </td>
              </tr>
              <tr>
                <td>Interceptors</td>
                <td>
                  Guard and transform incoming actions — validate, enrich, or
                  reject at the gate
                </td>
              </tr>
              <tr>
                <td>Resolve</td>
                <td>
                  Normalize incoming input into a resolved candidate value
                </td>
              </tr>
              <tr>
                <td>Merge</td>
                <td>
                  Combine committed state with the resolved candidate value
                </td>
              </tr>
              <tr>
                <td>Operators</td>
                <td>Refine or suppress candidates before resolution</td>
              </tr>
              <tr>
                <td>Filters</td>
                <td>
                  Conditional execution gates — skip or allow pipeline
                  continuation
                </td>
              </tr>
              <tr>
                <td>Reducers</td>
                <td>
                  Compute the finalized candidate state — deterministic with
                  zero side effects
                </td>
              </tr>
              <tr>
                <td>State</td>
                <td>Commit and expose finalized state snapshots</td>
              </tr>
              <tr>
                <td>Extensions</td>
                <td>
                  Post-commit behaviors — encryption, persistence, all acting on
                  committed output
                </td>
              </tr>
            </tbody>
          </table>

          <p>
            Every stage is composable and opt-in. You don't pay for what you
            don't use. But when you do use a stage, you know exactly where it
            sits in the execution order, what it receives, and what it produces.
            No boilerplate to maintain. No surprises. Just clean, readable
            definitions.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Why 1.0 Now</div>
        <div class="section-body">
          <p>
            Why did it take so long to ship 1.0? Because I refused to ship until
            the code was as clean as I demanded it to be — not just the library
            code, but the code
            <em>you</em> write when you use it.
          </p>
          <p>
            Every stage needed to be provably deterministic. Every boundary
            needed referential isolation — deep-cloned data at every pipeline
            boundary so no stage can corrupt another's input. Every execution
            needed an atomic guarantee — either the full pipeline completes and
            state commits, or nothing changes. No partial updates. No torn
            state. And critically: no boilerplate tax on the developer.
          </p>
          <p>
            The testing model needed to be as clean as the pipeline itself: act,
            settle, assert. No marble diagrams. No fake timers. No flaky async
            waits. Three steps, readable on sight.
          </p>

          <sdux-example-viewer-source
            [displayTabs]="false"
            [displayCopyPaste]="false">
            <sdux-example-viewer-tab
              [label]="'Scoped Pipeline with Behaviors and Controllers'">
              <pre
                class="code-inline"><code class="language-ts">// act &rarr; settle &rarr; assert
it('updates cart', async () =&gt; &#123;
  cartCell.mergeState(&#123; value: mockItems &#125;);
  await vaultSettled(&lt;cart-cell-key&gt;);
  expect(cartCell.state.total).toBe(42);
&#125;);</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>

          <p>
            The framework story needed to be real — not "we support React too"
            as an afterthought, but a pure TypeScript core with first-class
            bindings for Angular, React, Vue, and Node. One runtime. Every
            platform. Zero dependencies on any framework.
          </p>
          <p>
            1.0 ships because all of those contracts are now proven. Not
            promised — proven. Thousands of tests. Real production patterns. A
            Pipeline Builder that generates type-safe TypeScript from a visual
            interface. StackBlitz examples you can run without installing
            anything. And not a single line of copy-paste boilerplate required.
          </p>
          <p>
            I built <sdux-brand-name /> because I believe state management code
            should be as clean and intentional as the rest of your application.
            1.0 is the moment it stops being my standard and starts being
            available as yours.
          </p>
        </div>
      </section>

      <section class="diagram-section">
        <div class="section-title">Watch It</div>

        <div class="section-body">
          <sdux-video videoId="m7ClyWSh754" [tooltip]="'Pipeline Overview'" />

          <sdux-video
            videoId="aFTiIvR0H4M"
            [tooltip]="'SDUX vs Redux O(n) Comparison'" />
        </div>
      </section>
    </sdux-blog-layout>
  `,
  styleUrls: ['../../../docs/scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogReduxBrokeMyTrustComponent {}
