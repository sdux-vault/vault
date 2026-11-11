import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent
} from '@sdux-vault/ui/web-components';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector: 'sdux-blog-how-to-create-and-submit-a-new-stackblitz-example',
  standalone: true,
  imports: [
    BlogLayoutComponent,
    RouterModule,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent
  ],
  template: `
    <sdux-blog-layout id="how-to-create-and-submit-a-new-stackblitz-example">
      <header class="docs-header">
        <p class="lead">
          A StackBlitz contribution is more than a working screen. It is a
          standalone teaching project that must remain runnable, documented,
          portable across frameworks, and easy to review. This workflow takes
          you from the example contract through scaffolding, the canonical
          Angular implementation, framework ports, CI checks, and a complete
          pull request.
        </p>
      </header>

      <section class="section">
        <div class="section-title">Start with the Example Contract</div>
        <div class="section-body">
          <p>
            Before writing code, decide what the example is meant to teach. The
            contract should name the SDuX Vault behavior, describe the input and
            visible output, list the interactions a reader must be able to try,
            and identify the frameworks that need ports. Keep the scope narrow:
            one clear concept is easier to understand and easier to compare
            across framework implementations.
          </p>
          <p>
            In this repository, Angular is the canonical source for a
            cross-framework example. Its pipeline configuration, UI structure,
            interactions, and instructional comments establish the behavior that
            React, Vue, and Svelte versions must preserve. A port may change the
            reactive wrapper and template syntax, but it should not quietly
            change what the example teaches.
          </p>
          <div class="callout callout-info">
            <strong>Key takeaway:</strong> Define the observable behavior first,
            then use the implementation files to make that contract easy to
            inspect.
          </div>
          <p>
            If the idea is not yet clear, use the repository's issue templates.
            A feature request captures the use case, affected framework or
            tooling area, expected impact, and alternatives. An example issue
            captures the affected framework, example name, StackBlitz URL,
            reproduction steps, environment, and console errors.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Scaffold a Standalone Project</div>
        <div class="section-body">
          <p>
            Each example lives in its own directory under
            <span class="code">stackblitz/&lt;framework&gt;/</span> and carries
            its own package configuration. Start from the repository root with
            the scaffold command:
          </p>
          <sdux-example-viewer-source
            [displayTabs]="false"
            [displayCopyPaste]="true">
            <sdux-example-viewer-tab [label]="'Scaffold commands'">
              <pre
                class="code-inline"><code class="language-ts">npm run scaffold;
npm run scaffold:angular;
npm run scaffold:react;
npm run scaffold:svelte;
npm run scaffold:vue;</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>
          <p>
            The general command discovers every framework with a scaffolding
            template. The language-specific commands let you create one target
            at a time. The tool lowercases the name, converts whitespace to
            hyphens, appends <span class="code">-example</span> when needed, and
            refuses to overwrite an existing example.
          </p>
          <sdux-example-viewer-source
            [displayTabs]="false"
            [displayCopyPaste]="true">
            <sdux-example-viewer-tab [label]="'Scaffold name normalization'">
              <pre
                class="code-inline"><code class="language-ts">const name = input.trim().toLowerCase().replace(/\\s+/g, '-');

if (!name) &#123;
  throw new Error('Name cannot be empty.');
&#125;

return name.endsWith('-example') ? name : name + '-example';</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>
          <p>After the project is created, run it from its own directory:</p>
          <sdux-example-viewer-source
            [displayTabs]="false"
            [displayCopyPaste]="true">
            <sdux-example-viewer-tab [label]="'Run the standalone project'">
              <pre
                class="code-inline"><code class="language-ts">cd stackblitz/&lt;framework&gt;/&lt;example-name&gt;
npm install
npm start</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>
          <p>
            A contributor should be able to open this directory, install its
            dependencies, and run the project without importing code from
            another example.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Implement the Angular Example First</div>
        <div class="section-body">
          <p>
            Complete the Angular version before starting a port. A typical
            project separates the state-owning service, component, template,
            application configuration, and bootstrap entry point. The service
            owns the Vault-backed state and exposes a read-only state surface;
            the component forwards user intent to service methods and renders
            the resulting snapshot.
          </p>
          <p>
            Make the lesson visible in the UI. Show the input, identify the
            transformation being demonstrated, and display the resulting
            <a href="/docs/references/functions/feature-cell">FeatureCell</a>
            state. Include the interactions a reader needs to reproduce the
            behavior, such as replacing state, resetting it, or showing loading
            and error states.
          </p>
          <p>
            Documentation is part of the example. Follow the repository's
            instructional JSDoc rules for declared classes, methods, fields,
            parameters, and return values. Explain what a symbol does, why it
            exists in the lesson, and how it connects to the visible flow. Keep
            the explanation at the API boundary; do not describe private
            controller mechanics or scheduling internals.
          </p>
          <div class="concept-box">
            <p>
              <strong>Service-owned boundary:</strong> Let the service own state
              mutation and pipeline configuration. Let the component read the
              exposed state and forward user intent. That separation makes the
              example easier to teach and gives each framework port a stable
              behavioral target.
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          Port the Same Example to Other Frameworks
        </div>
        <div class="section-body">
          <p>
            Once Angular is working, use the repository's AI instructions to
            port it instead of starting a framework translation from memory.
            GitHub Copilot can use the
            <a
              href="https://github.com/sdux-vault/stackblitz-examples/blob/main/.github/prompts/port-example.prompt.md"
              >port-example prompt</a
            >, while Codex and other repository-aware agents can use the
            <a
              href="https://github.com/sdux-vault/stackblitz-examples/blob/main/.agents/skills/port-example/SKILL.md"
              >port-example skill</a
            >. Both instructions describe the same disciplined process: read the
            Angular base, identify the example delta, inspect the target
            scaffolding, and apply the same behavior to the target framework.
          </p>
          <sdux-example-viewer-source
            [displayTabs]="false"
            [displayCopyPaste]="true">
            <sdux-example-viewer-tab [label]="'GitHub Copilot port request'">
              <pre
                class="code-inline"><code class="language-ts">&#64;port interceptor-delay-example --to=react</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>
          <p>
            In Copilot, open the prompt from
            <span class="code">.github/prompts/port-example.prompt.md</span>
            and give it a concrete source example and target framework. The
            request above asks it to port
            <span class="code"
              >stackblitz/angular/interceptor-delay-example/</span
            >
            to React. The prompt tells Copilot to preserve the Angular pipeline,
            UI behavior, CSS classes, framework-agnostic utilities, and
            instructional JSDoc while translating only the framework delta.
          </p>
          <sdux-example-viewer-source
            [displayTabs]="false"
            [displayCopyPaste]="true">
            <sdux-example-viewer-tab [label]="'Agent skill port request'">
              <pre
                class="code-inline"><code class="language-ts">Use .agents/skills/port-example/SKILL.md to port the Angular example interceptor-delay-example to React. Read the Angular base and source example, compare the delta, use the React scaffolding and base example, preserve the pipeline and JSDoc, and leave the Angular source unchanged.</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>
          <p>
            In Codex or another agent that supports repository skills, reference
            <span class="code">.agents/skills/port-example/SKILL.md</span> in
            the task. The skill gives the agent a narrow, reviewable job: read
            the Angular source and base example, record the delta, inspect the
            target template and an existing target example, then translate the
            service, component, template, and framework-specific reactive
            wrapper. Framework-agnostic utilities are copied unchanged, and the
            target package is kept standalone.
          </p>
          <p>
            Review the generated files against the Angular source before testing
            them. Preserve the pipeline configuration, UI behavior, class names,
            framework-agnostic utilities, and instructional JSDoc. Only the
            reactive wrapper and framework syntax should change. Do not add
            another state-management library, introduce features absent from
            Angular, or modify the Angular source while creating a port.
          </p>
          <div class="callout callout-warning">
            <strong>Gotcha:</strong> The agent is a porting aid, not permission
            to redesign the example. Its quality checklist still needs a human
            review: verify identical pipeline configuration, complete UI
            interactions, copied JSDoc, matching CSS classes, no Angular APIs,
            and no exposed SDuX Vault internals.
          </div>
          <p>
            Verify the port locally before opening it in StackBlitz. Change into
            the target directory, install its standalone dependencies, and run
            its development server:
          </p>
          <sdux-example-viewer-source
            [displayTabs]="false"
            [displayCopyPaste]="true">
            <sdux-example-viewer-tab [label]="'Run the port locally'">
              <pre
                class="code-inline"><code class="language-ts">cd stackblitz/react/interceptor-delay-example
npm install
npm start</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>
          <p>
            Exercise every interaction in the local browser: load the example,
            trigger each state transition, inspect loading and error behavior,
            and compare the result with Angular. Once the local project works,
            commit and push the branch, open the repository or branch in
            StackBlitz, and select the same
            <span class="code"
              >stackblitz/react/interceptor-delay-example/</span
            >
            directory. Run the browser preview there as a second verification
            that the project is self-contained and StackBlitz-runnable.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Verify Locally Before Opening the PR</div>
        <div class="section-body">
          <p>
            Run every framework project you changed, exercise each visible
            interaction, and confirm that the browser output matches the
            documented contract. Then run the repository checks from its root.
          </p>
          <sdux-example-viewer-source
            [displayTabs]="false"
            [displayCopyPaste]="true">
            <sdux-example-viewer-tab [label]="'Run the CI verification checks'">
              <pre class="code-inline"><code class="language-ts">npm ci
npm run lint
npm run format:check
npm run typecheck
npm run docs:coverage
npm run test:coverage:clean
npm run test:tools:coverage</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>
          <p>
            The combined command <span class="code">npm run verify</span> runs
            the main verification sequence as well. CI uses Node.js 22 and
            performs the same installation, lint, formatting, type, docs, and
            coverage checks for pull requests targeting
            <span class="code">main</span> or <span class="code">dev</span>.
          </p>
          <p>
            Before submitting, check the project-specific risks: no
            cross-example imports, no shared example dependencies, no leftover
            Angular APIs in a port, complete JSDoc coverage, and no internal
            SDuX Vault mechanics exposed in comments or UI text.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Prepare the Pull Request</div>
        <div class="section-body">
          <p>
            Use the repository pull request template. Describe what the example
            teaches, link the related issue, identify every affected framework,
            and report the local and StackBlitz verification results. Add a
            screenshot or preview link when it helps reviewers understand the
            visible behavior.
          </p>
          <table aria-label="Pull request readiness checklist">
            <thead>
              <tr>
                <th scope="col" class="column-250">Check</th>
                <th scope="col" class="column-auto">What it confirms</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Runs locally and in StackBlitz</td>
                <td>
                  The project is runnable in its intended teaching context.
                </td>
              </tr>
              <tr>
                <td>Self-contained example</td>
                <td>
                  The directory has no cross-example imports or shared
                  dependencies.
                </td>
              </tr>
              <tr>
                <td>Checks pass</td>
                <td>
                  Lint, formatting, type checking, docs coverage, and tests are
                  clean.
                </td>
              </tr>
              <tr>
                <td>Documentation is instructional</td>
                <td>
                  Readers can connect the code to the behavior it demonstrates.
                </td>
              </tr>
            </tbody>
          </table>
          <p>
            A contribution is ready when a reviewer can open one framework
            directory, run it independently, understand the lesson from the UI
            and JSDoc, and compare its behavior with the Angular canonical
            source. That is what turns a working screen into a durable
            StackBlitz teaching project.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Deeper Dive</div>
        <div class="section-body">
          <p>
            Browse the
            <a href="https://github.com/sdux-vault/stackblitz-examples"
              >StackBlitz examples repository</a
            >
            for scaffolding templates, existing framework ports, issue forms,
            and the pull request checklist. When you are ready to study the
            behavior behind an existing project, open the
            <a href="/docs/stack-blitz">StackBlitz Examples page</a> and compare
            the same example across its available frameworks.
          </p>
        </div>
      </section>
    </sdux-blog-layout>
  `,
  styleUrls: ['../../../docs/scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogHowToCreateAndSubmitANewStackblitzExampleComponent {}
