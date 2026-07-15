import { Project } from '@stackblitz/sdk';

export const hydrateStateExampleProject: Project = {
  title: 'angular-hydrate-state-example',
  template: 'node',
  files: {
    'angular.json': `{
  "\$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "angular-demo": {
      "projectType": "application",
      "schematics": {
        "@schematics/angular:component": {
          "style": "scss"
        }
      },
      "root": "./",
      "sourceRoot": "./src",
      "prefix": "example",
      "architect": {
        "build": {
          "builder": "@angular/build:application",
          "options": {
            "browser": "./src/main.ts",
            "tsConfig": "./tsconfig.json",
            "index": "./src/index.html",
            "inlineStyleLanguage": "scss",
            "assets": [
              {
                "glob": "**/*",
                "input": "./public"
              }
            ],
            "styles": ["./src/styles.scss"]
          },
          "configurations": {
            "development": {
              "optimization": false,
              "extractLicenses": false,
              "sourceMap": true
            }
          },
          "defaultConfiguration": "development"
        },
        "serve": {
          "builder": "@angular/build:dev-server",
          "configurations": {
            "development": {
              "buildTarget": "angular-demo:build:development"
            }
          },
          "defaultConfiguration": "development"
        }
      }
    }
  }
}
`,
    'package.json': `{
  "name": "angular-hydrate-state-example",
  "version": "1.0.3",
  "private": true,
  "scripts": {
    "start": "ng serve --host 0.0.0.0 --port 4200"
  },
  "dependencies": {
    "@angular/cdk": "21.2.12",
    "@angular/cli": "21.2.11",
    "@angular/common": "21.2.13",
    "@angular/compiler": "21.2.13",
    "@angular/core": "21.2.13",
    "@angular/platform-browser": "21.2.13",
    "@sdux-vault/angular": "latest",
    "rxjs": "~7.8.0",
    "tslib": "^2.3.0"
  },
  "devDependencies": {
    "@angular/build": "21.2.11",
    "@angular/compiler-cli": "21.2.13",
    "typescript": "~5.9.2"
  }
}
`,
    'src/app/app.config.ts': `import { ApplicationConfig } from '@angular/core';
import { provideFeatureCell, provideVault } from '@sdux-vault/angular';
import { ExampleService } from './example.service';

/**
 * Application-level configuration for the Angular standalone bootstrap.
 *
 * Registers the Vault runtime and the ExampleService FeatureCell with Angular's
 * dependency injection system. The descriptor intentionally leaves
 * \`initialState\` undefined so the service's \`hydrate()\` factory is visibly
 * responsible for supplying the initial value during \`initialize()\`.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // Creates the Vault runtime (state container + lifecycle)
    provideVault({
      /**
       * Controls the verbosity of internal logging.
       * Levels: \`'debug' | 'info' | 'warn' | 'error' | 'off'\`.
       * Set to \`'debug'\` during development to trace pipeline activity.
       */
      logLevel: 'off',

      /**
       * Enables development-mode diagnostics.
       * When \`true\`, the SDuX Debugger panel and Chrome Extension
       * receive real-time pipeline trace events.
       */
      devMode: false
    }),

    // Define a FeatureCell (state + behaviors + controllers)
    provideFeatureCell(
      // Service class that owns the FeatureCell instance
      ExampleService,

      // FeatureCell descriptor (identity + initial state)
      {
        // Unique state key used by the Vault
        key: 'example-feature-cell-key',

        // Leaves the descriptor fallback empty so hydrate() supplies the value
        initialState: undefined
      },

      // Optional definition-time extensions
      [
        // --> Register add-on behaviors here <--
      ],
      [
        // --> Register add-on controllers here <--
      ]
    )
  ]
};
`,
    'src/app/example.component.html': `<div class="example-container">
  <div class="header">
    <div class="title">Angular - SDuX Vault Hydrate State Example</div>
    <div class="subtitle">
      This example demonstrates hydrate() — a deferred factory supplies the
      authoritative initial FeatureCell value when initialize() runs. The
      resolved value then travels through the normal state pipeline.
    </div>
  </div>

  <div class="section">
    <div class="label">FeatureCell Flow</div>
    <div class="flow-hint">
      Deferred factory → initialize() → pipeline → reactive state
    </div>
  </div>

  <div class="section column">
    <div class="state-container">
      <div class="label">Next State</div>
      <div class="hint">Sample data for a later replaceState() update</div>
      <div class="hint file">
        <span class="emphasis">File:</span> app/example.component.ts
      </div>
      <textarea class="data-textarea">{{ sample | json }}</textarea>
    </div>

    <div class="state-container data-row">
      <div class="label">Hydrated FeatureCell State</div>
      <div class="hint">Factory result after initialization</div>
      <div class="hint file">
        <span class="emphasis">File:</span> app/example.service.ts
      </div>
      @if (state.hasValue()) {
        <textarea class="data-textarea" readonly
          >{{ state.value() | json }}
        </textarea>
        <div class="hint state">
          <span class="emphasis">State:</span> {{ activeStateHint() }}
        </div>
        <div class="hint file">
          @if (displayActiveStateHint()) {
            <span class="emphasis">File:</span> app/example.service.ts
          } @else {
            &nbsp;
          }
        </div>
      } @else {
        <textarea class="data-textarea" readonly> </textarea>
        <div class="hint state">
          <span class="emphasis">State:</span> cleared - pipeline has no active
          value for state.
        </div>
        <div class="hint file">
          <span class="emphasis">File:</span> app/example.service.ts &nbsp;
        </div>
      }
    </div>
  </div>

  <div class="section">
    <div class="actions">
      <button class="sdux-button primary" (click)="loadSample()">
        Replace Hydrated State
      </button>

      <div class="secondary-actions">
        <button class="sdux-button" (click)="resetState()">Reset State</button>
      </div>
    </div>
  </div>

  <div class="section learn-more">
    <div class="label">Learn More</div>
    <div class="learn-more-links">
      <a
        href="https://www.sdux-vault.com/docs/pipeline/apis/feature-cell-api/hydrate-method"
        target="_blank"
        rel="noopener noreferrer"
        >hydrate()</a
      >
      <span class="separator">·</span>
      <a
        href="https://www.sdux-vault.com/docs/pipeline/apis/feature-cell-api/initialize-method"
        target="_blank"
        rel="noopener noreferrer"
        >initialize()</a
      >
      <span class="separator">·</span>
      <a
        href="https://www.sdux-vault.com/docs/pipeline/apis/provide-feature-cell"
        target="_blank"
        rel="noopener noreferrer"
        >FeatureCell</a
      >
    </div>
  </div>
</div>
`,
    'src/app/example.component.scss': `\$gap: 0.75rem;
\$padding: 1rem;
\$data-height: 300px;
\$text-area-height: 175px;
\$border: 1px solid rgba(0, 0, 0, 0.08);
\$radius: 8px;
\$text-muted: #666;
\$title-font-size: 2rem;
\$sub-title-font-size: 1rem;
\$label-font-size: 1.1rem;
\$text-area-font-size: 0.8rem;
\$hint-font-size: 1rem;
\$hint-file-font-size: 0.9rem;
\$status-font-size: 0.85rem;

.example-container {
  display: flex;
  flex-direction: column;
  gap: \$gap;
  padding: \$padding;

  .header {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    .title {
      font-size: \$title-font-size;
      font-weight: 600;
      letter-spacing: 0.3px;
    }

    .subtitle {
      font-size: \$sub-title-font-size;
      color: \$text-muted;
      max-width: 600px;
    }
  }

  .section {
    padding: \$padding;

    &.column {
      border: \$border;
      border-radius: \$radius;
      display: flex;
      gap: \$gap;

      @media (max-width: 768px) {
        flex-direction: column;

        .state-container {
          width: 100%;
        }
      }
    }

    .state-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
      min-width: 0;

      &.data-row {
        height: 430px;
      }

      .textarea,
      .data-textarea {
        width: 100%;
        box-sizing: border-box;
        height: \$data-height;
        padding: 0.5rem;
        border: \$border;
        border-radius: 6px;
        font-family: monospace;
        font-size: \$text-area-font-size;
        background: #fafafa;
        color: #222;

        &.empty {
          font-style: italic;
        }

        &.error {
          color: #d33;
        }
      }

      .textarea {
        height: \$text-area-height;
      }
    }

    .label {
      font-size: \$label-font-size;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: \$text-muted;
    }

    .flow-hint {
      margin-top: 0.25rem;
      font-size: 1rem;
      letter-spacing: 0.3px;
      color: \$text-muted;
      font-family: monospace;
    }

    .hint {
      font-size: \$hint-font-size;
      color: #777;
      margin-top: -0.15rem;
      margin-left: 0.5rem;

      &.file {
        color: #999;
        font-family: monospace;
        font-size: \$hint-file-font-size;
        min-height: 16px;
      }

      &.state {
        margin-top: 0.15rem;
      }

      .emphasis {
        font-weight: 600;
        color: #555;
      }
    }

    .actions {
      justify-content: flex-start;
      display: flex;
      align-items: center;
      gap: 3rem;

      @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 2rem;
      }

      .secondary-actions {
        display: flex;
        gap: 2rem;

        @media (max-width: 768px) {
          gap: 1.5rem;
          flex-direction: column;
          align-items: flex-start;
        }
      }
    }
  }

  .status {
    height: 300px;
    font-size: \$status-font-size;
    color: \$text-muted;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .learn-more {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;

    .learn-more-links {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: \$hint-font-size;

      a {
        color: #555;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
          color: #222;
        }
      }

      .separator {
        color: #ccc;
      }
    }
  }
}
`,
    'src/app/example.component.ts': `import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ExampleService } from './example.service';

/**
 * Renders the value produced by the service's deferred hydration factory.
 * The component reads the reactive FeatureCell snapshot and lets the reader
 * replace or clear that value after initialization. ⚠️ Architectural Boundary:
 * State changes are delegated to ExampleService so the component never accesses
 * the Vault directly.
 */
@Component({
  selector: 'example-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'example.component.html',
  styleUrls: ['../styles.scss', 'example.component.scss']
})
export class ExampleComponent {
  /**
   * Provides the service-owned reactive state and mutation methods used by the view.
   */
  #exampleService = inject(ExampleService);

  /**
   * Exposes the read-only reactive snapshot whose \`value()\` and \`hasValue()\`
   * signals keep the template synchronized with the hydrated FeatureCell.
   */
  state = this.#exampleService.state;

  /**
   * Supplies a contrasting dataset used to replace the hydrated value.
   */
  sample = [
    { id: 11, name: 'Luke', lastName: 'Skywalker' },
    { id: 38, name: 'Leia', lastName: 'Organa' },
    { id: 9, name: 'Han', lastName: 'Solo' }
  ];

  /**
   * Describes whether the visible value came from hydration or a later update.
   */
  readonly activeStateHint = signal(
    'hydrate() factory resolved during initialize().'
  );

  /** Controls whether the template shows the source of the hydrated value. */
  readonly displayActiveStateHint = signal(true);

  /**
   * Replaces the hydrated value with the sample dataset through the service.
   * The button click delegates to \`replace()\`, the update crosses the pipeline,
   * and the reactive snapshot refreshes the template.
   * @returns void
   */
  loadSample(): void {
    this.displayActiveStateHint.set(false);
    this.activeStateHint.set('State updated with sample data.');
    this.#exampleService.replace(this.sample);
  }

  /**
   * Clears the current value without running the hydration factory again.
   * Hydration belongs to initialization, so reset leaves the FeatureCell empty.
   * @returns void
   */
  resetState(): void {
    this.#exampleService.reset();
  }
}
`,
    'src/app/example.service.ts': `import { Injectable } from '@angular/core';
import { FeatureCell, injectVault } from '@sdux-vault/angular';

/**
 * Defines one character record stored in the example's array state.
 * The hydration factory and later replacement use the same shape.
 */
export interface Example {
  /** Identifies the character within the FeatureCell array. */
  id: number;

  /** Stores the character's first name for display. */
  name: string;

  /** Stores the character's last name for display. */
  lastName: string;
}

/**
 * Owns the FeatureCell that demonstrates deferred initialization with \`hydrate()\`.
 * The factory is registered before \`initialize()\` and resolves the authoritative
 * initial value at initialization time. Consumers receive reactive state while
 * mutations remain behind service methods. ⚠️ Architectural Boundary:
 * The Vault handle stays private so components cannot bypass this service.
 */
@FeatureCell<Example[]>('example-feature-cell-key')
@Injectable({ providedIn: 'root' })
export class ExampleService {
  /**
   * Provides the private FeatureCell handle used to configure hydration and
   * perform updates. ⚠️ Architectural Boundary: Consumers use the public state
   * snapshot and service methods instead of accessing this handle.
   */
  readonly #vault = injectVault<Example[]>(ExampleService);

  /**
   * Exposes reactive \`value()\`, \`isLoading()\`, \`error()\`, and \`hasValue()\`
   * signals so consumers can render the hydrated snapshot without mutating it.
   */
  readonly state = this.#vault.state;

  /**
   * Registers a Promise-based deferred factory and then initializes the FeatureCell.
   * \`hydrate()\` waits for \`initialize()\` before resolving the authoritative initial
   * value, which is then processed through the configured state pipeline.
   */
  constructor() {
    // Runtime pipeline configuration
    this.#vault
      .hydrate(() =>
        Promise.resolve([{ id: 1, name: 'Darth', lastName: 'Sidious' }])
      )
      // Finalizes configuration and activates the FeatureCell pipeline.
      //
      // After initialize() is called:
      //
      // - The pipeline structure becomes immutable
      // - No additional behaviors or operators may be registered
      // - All subsequent state updates flow through the configured pipeline
      //
      // No state updates will be processed before initialize() is called.
      .initialize();
  }

  /**
   * Replaces the entire hydrated state with a caller-provided character array.
   * The replacement travels through the same active pipeline and updates observers.
   * @param input - Character records that become the next FeatureCell value.
   * @returns void
   */
  replace(input: Example[]): void {
    this.#vault.replaceState({
      loading: false,
      value: input,
      error: null
    });
  }

  /**
   * Clears the FeatureCell snapshot without rerunning its hydration factory.
   * The initialized pipeline remains active for later replacements.
   * @returns void
   */
  reset(): void {
    this.#vault.reset();
  }
}
`,
    'src/index.html': `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>SDuX Angular Example</title>
    <base href="/" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/x-icon" href="favicon.ico" />
  </head>
  <body>
    <example-view></example-view>
  </body>
</html>
`,
    'src/main.ts': `/**
 * Application bootstrap entry point.
 *
 * Bootstraps the root ExampleComponent as a standalone Angular application
 * using the provider configuration defined in appConfig.
 */
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { ExampleComponent } from './app/example.component';

// eslint-disable-next-line
bootstrapApplication(ExampleComponent, appConfig).catch((err: any) =>
  console.error(err)
);
`,
    'src/styles.scss': `/* You can add global styles to this file, and also import other style files */
\$button-height: 40px;
\$color: #ffffff;
\$background: #1976d2;
\$border: #004ba0;
\$radius: 0.3125rem;
\$font-size: 0.875rem; // 14px
\$spacing-xs: 0.25rem; // 4px
\$padding: 0.5rem;
\$font-weight-semibold: 600;

\$button-icon-size: 22px;
\$min-width: 30px !important;

.example-container {
  padding: \$spacing-xs;
  display: flex;
  flex-direction: column;
  gap: \$spacing-xs;
}

.sdux-button {
  height: \$button-height !important;
  color: \$color !important;
  background-color: \$background !important;
  border: 1px solid \$border !important;
  border-radius: \$radius !important;
  font-size: \$font-size !important;
  padding: \$padding;
  gap: \$spacing-xs;
  font-weight: \$font-weight-semibold;

  min-width: 125px !important;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .mat-icon {
    transform: scale(0.75);
  }

  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  .button-text {
    height: \$button-height;
  }

  .mat-icon {
    width: \$button-icon-size !important;
    height: \$button-icon-size !important;
    position: relative;
    padding-left: \$spacing-xs;
    padding-right: \$spacing-xs;
    gap: \$spacing-xs; // Ensures uniform spacing
  }

  &:focus {
    outline: none;
  }
}
`,
    'tsconfig.json': `{
  "compileOnSave": false,
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist/out-tsc",
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": false,
    "noImplicitReturns": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "experimentalDecorators": true,
    "importHelpers": true,
    "target": "ES2022",
    "module": "preserve"
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "typeCheckHostBindings": true,
    "strictTemplates": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["src/**/*.spec.ts"]
}
`
  }
};
