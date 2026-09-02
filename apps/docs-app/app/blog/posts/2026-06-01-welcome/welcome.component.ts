import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

/**
 * Welcome blog post — introduces the blog and its content pillars.
 */
@Component({
  selector: 'sdux-blog-welcome',
  standalone: true,
  imports: [BlogLayoutComponent, RouterModule],
  template: `
    <sdux-blog-layout id="welcome">
      <header class="docs-header">
        <p class="lead">
          I've been building SDuX Vault for a while now, and I've learned that
          the hardest part isn't writing the code — it's explaining why the code
          works the way it does.
        </p>
        <p>
          It's like building a better mousetrap. I truly believe SDuX is a
          better way to do state management. Then I realized that no one will
          adopt it if they don't know how to use it and what problems it solves.
        </p>

        <p>
          If I did my job right with the docs and the blogs then your journey to
          understanding that SDuX is better (and different) will be a
          self-discovery. I won't have to convince you. You'll share the same
          excitement I have using this new powerful library.
        </p>

        <p>That's what this blog is for and all the documentation.</p>
        <p>
          I have literally spent <strong>4 months</strong> on documentation. AND
          that's with AI helping me write it.
        </p>

        <p>
          So if you want to understand the "why" behind SDuX Vault's
          architecture, features, and design decisions, you're in the right
          place.
        </p>
      </header>

      <section class="section">
        <div class="section-title">Why a Blog?</div>
        <div class="section-body">
          <p>
            Documentation tells you what something does. A blog post tells you
            why it was built that way, what problem it solves, and what
            tradeoffs were made along the way. Those are the things I wish more
            libraries talked about openly.
          </p>

          <p>
            I have wrestled with how open to be about the internals of SDuX.
            Part out of being self-conscious and part out of protecting the
            integrity of the library. I finally came to the conclusion that the
            best way to build trust and confidence in SDuX is to be transparent
            about how it works and why it works that way.
          </p>

          <p>
            Just take a peek at the
            <a href="/docs/diagrams" target="_blank" rel="noopener"
              >official diagrams</a
            >
            and you will have a sense of the depth of transparency I am striving
            for with this library.
          </p>

          <p>
            Every post here will be grounded in real code and real
            documentation. If I make a claim about how SDuX Vault handles state
            updates or the pipeline or mutation, there's a source doc and a
            working example behind it. No hand-waving. It's literally
            <strong>Plain TypeScript, Zero Magic</strong> all the way.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">What You'll Find</div>
        <div class="section-body">
          <p>
            If you've ever fought with race conditions, stale state, or reducer
            boilerplate — those are the problems I'll be writing about. Expect
            architecture deep-dives on how referential isolation eliminates
            mutation bugs, how every state update is atomic and deterministic
            with no partial commits, and how the pipeline separates data
            transformation from policy enforcement with built-in safeguards like
            the circuit breaker pattern.
          </p>
          <p>
            I'm planning step-by-step walkthroughs of pipeline stages,
            controllers, and behaviors. Posts on how simple testing can be
            without mocks or framework-specific harnesses. Posts on the built-in
            debugger and how it can hand execution traces to AI for structured
            diagnostic reports. And since the engine is framework-agnostic, I'll
            show how everything works the same across Angular, React, Vue, and
            Svelte.
          </p>
          <p>
            Every post will include comparisons grounded in documented features
            rather than marketing claims, and live StackBlitz demos so you can
            try everything without installing anything.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Deeper Dive</div>
        <div class="section-body">
          <p>
            Every post should/will link back to the official documentation and
            include explanations, recommended patterns and anti-patterns to
            avoid, API contracts, diagrams, examples, StackBlitz demos (with
            more on the way) and cross-references.
          </p>
          <p>
            If you're ready to see what all the excitement is about SDuX then
            jump straight in:
          </p>
          <ul>
            <li>
              Open a
              <a href="/docs/stackblitz">StackBlitz demo</a>
            </li>
            <li>
              Try the
              <a href="/docs/pipeline/builder">Builder</a>
            </li>
          </ul>
        </div>
      </section>
    </sdux-blog-layout>
  `,
  styleUrls: ['../../../docs/scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogWelcomeComponent {}
