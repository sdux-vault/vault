import { Component, ViewEncapsulation } from '@angular/core';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector: 'sdux-blog-mutation-bugs-eliminated',
  standalone: true,
  imports: [BlogLayoutComponent],
  template: `
    <sdux-blog-layout
      title="Mutation Bugs? Eliminated by Architecture"
      date="2026-06-06"
      pillar="TA"
      readingTime="5">
      <header class="docs-header">
        <p class="lead">
          Most state management libraries tell you "don't mutate state." SDuX
          Vault takes a different approach — it makes mutation structurally
          impossible. Every pipeline stage receives an independent copy of your
          data, eliminating mutation leaks not by convention, but by
          construction.
        </p>
      </header>

      <section class="section">
        <div class="section-title">The Problem with "Don't Mutate"</div>
        <div class="section-body">
          <p>
            Every state management library has the same rule: don't mutate your
            state directly. Redux says it. NgRx says it. MobX wraps it in
            proxies. The assumption is always the same — if you follow the
            convention, your state stays clean.
          </p>
          <p>
            But conventions break under pressure. A developer passes an object
            reference into a reducer and modifies it downstream. A shared array
            gets mutated inside a selector. A nested property changes in one
            subscriber and silently corrupts the state tree for every other
            subscriber. These bugs are insidious because they don't throw errors
            — they produce wrong results quietly, and they're nearly impossible
            to trace back to the source.
          </p>
          <p>
            The fundamental issue is that "don't mutate" is a social contract,
            not an architectural guarantee. SDuX Vault eliminates the entire
            category by making mutation structurally impossible at every
            pipeline boundary.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">How Pipeline Isolation Works</div>
        <div class="section-body">
          <p>
            When state enters any pipeline stage in SDuX Vault, it is
            automatically deep-cloned via structuredClone. Every stage —
            interceptor, resolver, filter, reducer, merge, persist — receives
            its own independent copy of the data. No stage can see or affect
            another stage's copy.
          </p>
          <p>
            This isn't a shallow copy. Objects, arrays, dates, typed arrays,
            RegExp instances, and deeply nested object graphs are all cloned
            completely. Cyclic references are handled safely. You don't call
            anything, configure anything, or opt into anything. Isolation
            happens automatically at every boundary, every time.
          </p>

          <div class="callout callout-info">
            <strong>Key takeaway:</strong> SDuX Vault uses a clone-first,
            freeze-safe fallback strategy. The primary path deep-clones via
            structuredClone. When cloning isn't possible, the pipeline falls
            back to deep-freezing the value to prevent mutation.
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">What About Non-Cloneable Values?</div>
        <div class="section-body">
          <p>
            Not everything can be cloned. structuredClone cannot handle
            functions, promises, class instances, or DOM nodes. SDuX Vault
            handles these cases deterministically rather than silently ignoring
            them.
          </p>
          <p>
            When a value cannot be deep-cloned, the pipeline applies a deep
            freeze, making the object immutable at runtime. This prevents
            mutation where cloning isn't possible, while preserving the object's
            identity and prototype chain.
          </p>
          <p>
            Primitives — numbers, strings, booleans, bigints, symbols, null, and
            undefined — are immutable by definition and are returned as-is
            without any processing. Already-frozen objects are recognized as
            isolated and passed through without additional work.
          </p>

          <table>
            <thead>
              <tr>
                <th>Value Type</th>
                <th>Isolation Strategy</th>
                <th>Mutation Safe</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Plain objects, arrays, dates</td>
                <td>Deep cloned via structuredClone</td>
                <td>✅ Yes</td>
              </tr>
              <tr>
                <td>Typed arrays, RegExp</td>
                <td>Deep cloned via structuredClone</td>
                <td>✅ Yes</td>
              </tr>
              <tr>
                <td>Cyclic object graphs</td>
                <td>Deep cloned (cycles preserved)</td>
                <td>✅ Yes</td>
              </tr>
              <tr>
                <td>Functions, promises</td>
                <td>Deep frozen</td>
                <td>⚠️ Partial</td>
              </tr>
              <tr>
                <td>Class instances</td>
                <td>Deep frozen (prototype not cloned)</td>
                <td>⚠️ Partial</td>
              </tr>
              <tr>
                <td>Primitives</td>
                <td>Returned as-is</td>
                <td>✅ Yes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Where Isolation Is Applied</div>
        <div class="section-body">
          <p>
            Isolation isn't applied at one point — it's enforced at every
            pipeline boundary where state values cross between stages. The
            Conductor and Orchestrator apply isolation automatically at each of
            these boundaries:
          </p>
          <ul>
            <li>
              <strong>Incoming state</strong> — isolated when entering the
              pipeline to prevent consumer-side mutations from affecting
              execution.
            </li>
            <li>
              <strong>Interceptor, Resolve, Filter, Reducer stages</strong> —
              each receives an isolated copy before executing.
            </li>
            <li>
              <strong>Merge stage</strong> — both the current state and the
              partial update are isolated before and after the merge
              computation.
            </li>
            <li>
              <strong>BeforeTap / AfterTap</strong> — observation callbacks
              receive isolated copies, ensuring tap functions cannot corrupt the
              data flow.
            </li>
            <li>
              <strong>Final state</strong> — the resolved value is isolated
              before committing to the output layer.
            </li>
            <li>
              <strong>Error handling</strong> — error values, state snapshots,
              and current state are all isolated before reaching error handlers.
            </li>
          </ul>
          <p>
            This means that no matter how many stages your pipeline has, no
            matter how many behaviors are registered, every stage operates on
            its own isolated copy. A mutation in one stage cannot leak to
            another.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">The Guarantees</div>
        <div class="section-body">
          <div class="concept-box">
            <p><strong>Pipeline Isolation guarantees:</strong></p>
            <ul>
              <li>No mutation leaks across pipeline boundaries</li>
              <li>Stable, predictable data flow through all stages</li>
              <li>Automatic isolation — independent of your state shape</li>
              <li>Safe handling of cyclic object graphs</li>
            </ul>
            <p>
              These guarantees hold for synchronous values, promises,
              observables, and continuous streams.
            </p>
          </div>
          <p>
            "Don't mutate" is a convention. Conventions break under deadline
            pressure, during late-night debugging, and in code written by
            engineers who haven't read the style guide. SDuX Vault eliminates
            the category entirely. Your state is isolated at every boundary,
            every time, without you writing a single line of defensive code.
          </p>

          <div class="callout callout-warning">
            <strong>Best practice:</strong> For maximum isolation guarantees,
            keep your state shapes as plain objects, arrays, primitives, dates,
            or JSON-serializable graphs. Avoid storing class instances, DOM
            nodes, observables, or WeakMap/WeakSet values in pipeline state.
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Try It Yourself</div>
        <div class="section-body">
          <p>
            Read the full
            <a routerLink="/docs/pipeline/isolation"
              >Pipeline Isolation documentation</a
            >
            to see the complete isolation behavior matrix and understand exactly
            how every value type is handled at each pipeline boundary.
          </p>
        </div>
      </section>
    </sdux-blog-layout>
  `,
  styleUrls: ['../../../docs/scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogMutationBugsEliminatedComponent {}
