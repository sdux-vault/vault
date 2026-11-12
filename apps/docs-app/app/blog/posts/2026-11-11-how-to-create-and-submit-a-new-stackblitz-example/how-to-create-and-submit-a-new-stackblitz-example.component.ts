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
          A StackBlitz example is a small, runnable lesson. You will clone the
          examples repository, scaffold one project per framework, document it,
          port it, check it, and open a pull request. The process has more steps
          than a typical change, but each step is simple, and this guide walks
          through all of them.
        </p>
      </header>

      <section class="section">
        <div class="section-title">Pick a Reference Example</div>
        <div class="section-body">
          <p>
            Every new example should follow a proven pattern. The
            <span class="code">replace-example</span> already exists in Angular,
            React, Vue, and Svelte, so it is a good reference. Open its Angular
            project, read how the service owns the state, and notice how the
            component only displays the result and forwards user actions.
          </p>
          <p>
            Choose one clear concept for your example. One behavior is easier to
            explain, easier to review, and easier to compare across frameworks.
          </p>
          <div class="callout callout-info">
            <strong>Key takeaway:</strong> Angular is the canonical version. The
            other frameworks are ports of it, so build Angular first.
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Clone the Repository</div>
        <div class="section-body">
          <p>
            Clone the repository and create a branch for your example. Run these
            commands in the directory where you keep your projects:
          </p>
          <sdux-example-viewer-source
            [displayTabs]="false"
            [displayCopyPaste]="true">
            <sdux-example-viewer-tab [label]="'Clone and branch'">
              <pre
                class="code-inline"><code class="language-ts">git clone https://github.com/sdux-vault/stackblitz-examples.git;
cd stackblitz-examples;
git checkout -b add-my-first-example;</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>
          <p>
            If you have already forked the repository, clone your fork instead
            and open a pull request from your branch to
            <span class="code">dev</span> when you are ready.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Install the Dependencies</div>
        <div class="section-body">
          <p>
            Install the repository tools once from the root. These packages
            power the scaffold, the port, and the checks you will run later.
          </p>
          <sdux-example-viewer-source
            [displayTabs]="false"
            [displayCopyPaste]="true">
            <sdux-example-viewer-tab [label]="'Install'">
              <pre
                class="code-inline"><code class="language-ts">npm install;</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Scaffold the Angular Project</div>
        <div class="section-body">
          <p>
            Use the package scripts to create the project. Start with Angular,
            since it is the canonical version:
          </p>
          <sdux-example-viewer-source
            [displayTabs]="false"
            [displayCopyPaste]="true">
            <sdux-example-viewer-tab [label]="'Scaffold Angular'">
              <pre
                class="code-inline"><code class="language-ts">npm run scaffold:angular;</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>
          <p>
            The script asks for a name. Enter
            <span class="code">my-first</span>. It lowercases the name, converts
            spaces to hyphens, and adds <span class="code">-example</span>, so
            the project is created at
            <span class="code">stackblitz/angular/my-first-example</span>. It
            also refuses to overwrite an existing example, so choose a name that
            is not already taken.
          </p>
          <p>
            The scaffold copies shared global files into every example. Do not
            edit those global files for one example. Put your example's code
            inside its own folder.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Write the Example Code</div>
        <div class="section-body">
          <p>The scaffold gives you three files to change:</p>
          <ul>
            <li>
              <span class="code">example.service.ts</span> owns the state,
            </li>
            <li>
              <span class="code">example.component.ts</span> forwards user
              actions, and
            </li>
            <li>
              <span class="code">example.component.html</span> displays the
              result.
            </li>
          </ul>
          <p>
            Keep the same split in your example. Only the service talks to the
            Vault. The component reads the state and calls service methods.
          </p>
          <p>
            Start with the service. It declares the state shape, registers the
            FeatureCell, initializes the pipeline, and exposes the methods the
            component can call. This is the replace example's service, trimmed
            to its essentials:
          </p>
          <sdux-example-viewer-source
            [displayTabs]="false"
            [displayCopyPaste]="true">
            <sdux-example-viewer-tab [label]="'example.service.ts'">
              <pre
                class="code-inline"><code class="language-ts">import &#123; Injectable &#125; from '@angular/core';
import &#123; FeatureCell, injectVault &#125; from '@sdux-vault/angular';

export interface Example &#123;
  id: number;
  name: string;
  lastName: string;
&#125;

&#64;FeatureCell&lt;Example[]&gt;('example-feature-cell-key')
&#64;Injectable(&#123; providedIn: 'root' &#125;)
export class ExampleService &#123;
  readonly #vault = injectVault&lt;Example[]&gt;(ExampleService);
  readonly state = this.#vault.state;

  constructor() &#123;
    this.#vault.initialize();
  &#125;

  replace(input: Example[]): void &#123;
    this.#vault.replaceState(&#123; loading: false, value: input, error: null &#125;);
  &#125;

  reset(): void &#123;
    this.#vault.reset();
  &#125;
&#125;</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>
          <p>
            Next, the component. It reads the state from the service and
            forwards each button click to a service method. It never changes the
            state itself:
          </p>
          <sdux-example-viewer-source
            [displayTabs]="false"
            [displayCopyPaste]="true">
            <sdux-example-viewer-tab [label]="'example.component.ts'">
              <pre
                class="code-inline"><code class="language-ts">import &#123; Component, inject &#125; from '@angular/core';
import &#123; ExampleService &#125; from './example.service';

export class ExampleComponent &#123;
  readonly #exampleService = inject(ExampleService);
  readonly state = this.#exampleService.state;

  readonly sample = [
    &#123; id: 11, name: 'Luke', lastName: 'Skywalker' &#125;,
    &#123; id: 38, name: 'Leia', lastName: 'Organa' &#125;,
    &#123; id: 9, name: 'Han', lastName: 'Solo' &#125;
  ];

  loadSample(): void &#123;
    this.#exampleService.replace(this.sample);
  &#125;

  resetState(): void &#123;
    this.#exampleService.reset();
  &#125;
&#125;</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>
          <p>
            Last, the template. It has two buttons and shows the state once the
            pipeline has a value:
          </p>
          <sdux-example-viewer-source
            [displayTabs]="false"
            [displayCopyPaste]="true">
            <sdux-example-viewer-tab [label]="'example.component.html'">
              <pre
                class="code-inline"
                ngNonBindable><code class="language-ts">&lt;button (click)="loadSample()"&gt;Load Sample State&lt;/button&gt;
&lt;button (click)="resetState()"&gt;Reset State&lt;/button&gt;

&#64;if (state.hasValue()) &#123;
  &lt;pre&gt;&#123;&#123; state.value() | json &#125;&#125;&lt;/pre&gt;
&#125;</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>
          <p>
            Follow the flow when you click a button: the template calls the
            component, the component calls the service, the service updates the
            Vault, and the pipeline sends the new value back to the template.
            Build your example by changing the sample data, the state shape, and
            the service methods to teach your behavior.
          </p>
          <p>
            The code is enough to run for now. You will add the documentation in
            a later step, so keep the comments short until then.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Run It Locally</div>
        <div class="section-body">
          <p>
            Each example is a standalone project. Install its dependencies and
            start its development server from its own folder:
          </p>
          <sdux-example-viewer-source
            [displayTabs]="false"
            [displayCopyPaste]="true">
            <sdux-example-viewer-tab [label]="'Run the Angular project'">
              <pre
                class="code-inline"><code class="language-ts">cd stackblitz/angular/my-first-example;
npm install;
npm start;</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>
          <p>
            Open the address the terminal prints. For Angular, it is
            <span class="code">http://localhost:4200</span>. Click every
            control, confirm the output changes the way the lesson describes,
            and fix anything that looks wrong before you continue.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Add the Documentation</div>
        <div class="section-body">
          <p>
            Documentation is generated with an AI prompt, so you do not have to
            write every comment by hand. The repository provides the same
            instructions for two tools:
          </p>
          <ul>
            <li>
              GitHub Copilot: open
              <span class="code">.github/prompts/add-stack-docs.prompt.md</span>
              and run it against your Angular project.
            </li>
            <li>
              Codex: use the skill at
              <span class="code">.agents/skills/add-stack-docs/SKILL.md</span>
              against the same project.
            </li>
          </ul>
          <p>
            Point the prompt at
            <span class="code">stackblitz/angular/my-first-example</span>. It
            adds clear JSDoc for classes, methods, fields, parameters, and
            return values. Read the result and make sure it explains what each
            symbol does in the lesson. Do not let the prompt describe internal
            mechanics. Keep the explanations at the API boundary.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Port to the Other Frameworks</div>
        <div class="section-body">
          <p>
            Once Angular works and is documented, create the React, Vue, and
            Svelte versions with the port prompt. There are two versions of it,
            one for each tool:
          </p>
          <ul>
            <li>
              GitHub Copilot: use
              <span class="code">.github/prompts/port-example.prompt.md</span>.
            </li>
            <li>
              Codex: use
              <span class="code">.agents/skills/port-example/SKILL.md</span>.
            </li>
          </ul>
          <p>In Copilot, run the port for each framework:</p>
          <sdux-example-viewer-source
            [displayTabs]="false"
            [displayCopyPaste]="true">
            <sdux-example-viewer-tab [label]="'Copilot port commands'">
              <pre
                class="code-inline"><code class="language-ts">&#64;port my-first-example --to=react;
&#64;port my-first-example --to=vue;
&#64;port my-first-example --to=svelte;</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>
          <p>
            In Codex, ask the agent to use the port skill for the same Angular
            project and the same target framework. Use one run per framework so
            each change is easy to review.
          </p>
          <p>
            The port keeps the same pipeline, UI, class names, and
            documentation. Only the framework syntax and the reactive wrapper
            change. Review the generated files against Angular before you run
            them. The Angular project should not change during a port.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Verify Each Framework</div>
        <div class="section-body">
          <p>
            Run every framework you created. Use the same steps as Angular, once
            for each folder:
          </p>
          <sdux-example-viewer-source
            [displayTabs]="false"
            [displayCopyPaste]="true">
            <sdux-example-viewer-tab [label]="'Run each framework'">
              <pre
                class="code-inline"><code class="language-ts">cd stackblitz/react/my-first-example;
npm install;
npm start;
cd ../../vue/my-first-example;
npm install;
npm start;
cd ../../svelte/my-first-example;
npm install;
npm start;</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>
          <p>
            Each version should behave the same way. Compare the output side by
            side with Angular. Then run the repository checks from the root:
          </p>
          <sdux-example-viewer-source
            [displayTabs]="false"
            [displayCopyPaste]="true">
            <sdux-example-viewer-tab [label]="'Run the checks'">
              <pre class="code-inline"><code class="language-ts">npm run lint;
npm run format:check;
npm run typecheck;
npm run docs:coverage;</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>
          <p>
            All four checks must pass before you open a pull request. The
            <span class="code">npm run verify</span> command runs the main
            checks together, and CI runs them again on every pull request.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Verify on StackBlitz</div>
        <div class="section-body">
          <p>
            Push your branch, then open each framework folder in StackBlitz. The
            URL pattern is the same for every example:
          </p>
          <sdux-example-viewer-source
            [displayTabs]="false"
            [displayCopyPaste]="true">
            <sdux-example-viewer-tab [label]="'StackBlitz URL'">
              <pre
                class="code-inline"><code class="language-ts">https://stackblitz.com/github/sdux-vault/stackblitz-examples/tree/main/stackblitz/angular/my-first-example</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>
          <p>
            Replace <span class="code">angular</span> with
            <span class="code">react</span>, <span class="code">vue</span>, or
            <span class="code">svelte</span> to check the other frameworks. Open
            the preview and confirm it works as it did locally. The example must
            run without any changes on your machine.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Commit and Open a Pull Request</div>
        <div class="section-body">
          <p>
            Commit your work on the branch, push it, and open a pull request:
          </p>
          <sdux-example-viewer-source
            [displayTabs]="false"
            [displayCopyPaste]="true">
            <sdux-example-viewer-tab [label]="'Commit and push'">
              <pre
                class="code-inline"><code class="language-ts">git add stackblitz/;
git commit -m "Add my-first example for Angular, React, Vue, and Svelte";
git push -u origin add-my-first-example;
gh pr create --fill;</code></pre>
            </sdux-example-viewer-tab>
          </sdux-example-viewer-source>
          <p>
            The repository's pull request template asks for a description, the
            related issue, the frameworks you changed, and your local and
            StackBlitz results. Fill in each section. A reviewer should be able
            to open one folder, run it, and understand the lesson from the UI
            and the documentation.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="section-title">Deeper Dive</div>
        <div class="section-body">
          <p>
            Read the
            <a href="https://github.com/sdux-vault/stackblitz-examples"
              >StackBlitz examples repository</a
            >
            for the scaffold templates, the existing examples, and the pull
            request checklist. You can also open the
            <a href="/docs/stack-blitz">StackBlitz Examples page</a> to compare
            your example with the others.
          </p>
        </div>
      </section>
    </sdux-blog-layout>
  `,
  styleUrls: ['../../../docs/scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogHowToCreateAndSubmitANewStackblitzExampleComponent {}
