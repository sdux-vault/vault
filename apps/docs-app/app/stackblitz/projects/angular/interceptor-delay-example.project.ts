import { Project } from '@stackblitz/sdk';

export const interceptorDelayExampleProject: Project = {
  title: 'angular-interceptor-delay-example',
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
  "name": "angular-interceptor-delay-example",
  "version": "1.0.0",
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
    "@sdux-vault/addons": "latest",
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
import { withDelayController } from '@sdux-vault/addons';
import { provideFeatureCell, provideVault } from '@sdux-vault/angular';
import { ExampleService } from './example.service';

/**
 * Application-level configuration for the Angular standalone bootstrap.
 *
 * Registers the Vault runtime and the ExampleService FeatureCell
 * as dependency injection providers.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // Creates the Vault runtime (state container + lifecycle)
    provideVault({ logLevel: 'off' }),

    // Define a FeatureCell (state + behaviors + controllers)
    provideFeatureCell(
      // Service class that owns the FeatureCell instance
      ExampleService,

      // FeatureCell descriptor (identity + initial state)
      {
        // Unique state key used by the Vault
        key: 'example-feature-cell-key',

        // Fallback Initial value for the state
        initialState: []
      },

      // Optional definition-time extensions
      [
        // --> Register add-on behaviors here <--
      ],
      [
        // Register the withDelayController add-on controller to enable delay behavior in this FeatureCell
        withDelayController
        // --> Register add-on controllers here <--
      ]
    )
  ]
};
`,
    'src/app/elapsed-timer.ts': `/**
 * Framework-agnostic elapsed timer used to visualize the delay
 * interceptor's hold window in the StackBlitz example UI.
 *
 * This class has no dependency on Angular, React, Vue, or Svelte.
 * It accepts an onChange callback so each framework can wire it
 * to its own reactive primitive (Angular signal, React setState,
 * Vue ref, or Svelte store). To port this timer, instantiate it
 * with the target framework's state setter and call start/reset
 * from event handlers.
 */
export class ElapsedTimer {
  /** Timestamp (via performance.now) when the timer was last started. */
  #startTime = 0;

  /** Accumulated elapsed milliseconds since the last start. */
  #elapsed = 0;

  /** Whether the timer is currently running. */
  #running = false;

  /** Active requestAnimationFrame handle for cancellation. */
  #frameId = 0;

  /** Callback invoked on every animation frame with the current elapsed ms. */
  #onChange: (ms: number) => void;

  /**
   * Creates a new ElapsedTimer bound to the given change callback.
   *
   * @param onChange - Invoked on each animation frame with the elapsed
   *   milliseconds. Use this to push the value into the framework's
   *   reactive layer.
   */
  constructor(onChange: (ms: number) => void) {
    this.#onChange = onChange;
  }

  /**
   * Current elapsed time in milliseconds.
   *
   * @returns The accumulated elapsed milliseconds.
   */
  get elapsed(): number {
    return this.#elapsed;
  }

  /**
   * Whether the timer is actively counting.
   *
   * @returns True if the timer is running.
   */
  get running(): boolean {
    return this.#running;
  }

  /**
   * Starts the timer. If already running, the call is ignored.
   * Resumes from the current elapsed value, allowing pause/resume
   * semantics if needed.
   *
   * @returns Void.
   */
  start(): void {
    if (this.#running) return;
    this.#running = true;
    this.#startTime = performance.now() - this.#elapsed;
    this.#tick();
  }

  /**
   * Stops the timer and resets elapsed time to zero. Fires the
   * onChange callback with 0 so the UI reflects the reset immediately.
   *
   * @returns Void.
   */
  reset(): void {
    this.#running = false;
    cancelAnimationFrame(this.#frameId);
    this.#elapsed = 0;
    this.#onChange(0);
  }

  /**
   * Stops the timer without resetting elapsed time. Use this in
   * component teardown (e.g., Angular DestroyRef, React useEffect
   * cleanup, or Svelte onDestroy) to prevent orphaned animation frames.
   *
   * @returns Void.
   */
  destroy(): void {
    this.#running = false;
    cancelAnimationFrame(this.#frameId);
  }

  /**
   * Internal animation loop that recalculates elapsed time and
   * notifies the consumer on each frame.
   *
   * @returns Void.
   */
  #tick(): void {
    if (!this.#running) return;
    this.#elapsed = performance.now() - this.#startTime;
    this.#onChange(this.#elapsed);
    this.#frameId = requestAnimationFrame(() => this.#tick());
  }

  /**
   * Formats a millisecond value as a human-readable seconds string
   * with three-digit millisecond precision (e.g. "3.142").
   *
   * @param ms - The elapsed time in milliseconds.
   * @returns A formatted string in "s.mmm" format.
   */
  static format(ms: number): string {
    const seconds = Math.floor(ms / 1000);
    const millis = Math.floor(ms % 1000)
      .toString()
      .padStart(3, '0');
    return \`\${seconds}.\${millis}\`;
  }
}
`,
    'src/app/example.component.html': `<div class="example-container">
  <div class="header">
    <div class="title">SDuX Vault Interceptor Delay Example</div>
    <div class="subtitle">
      This example demonstrates the delay interceptor controller: state updates
      are held for a configured duration before being released into the
      pipeline, letting you observe the delayed commit in real time.
    </div>
  </div>

  <div class="section">
    <div class="label">FeatureCell Flow</div>
    <div class="flow-hint">Input → Interceptor → Output</div>
  </div>

  <div class="section column">
    <div class="state-container">
      <div class="label">Delay (Interceptor)</div>
      <div class="hint">
        Holds state updates for a configured delay before releasing them into
        the pipeline
      </div>
      <div class="hint file">
        <span class="emphasis">File:</span> app/example.service.ts
      </div>
      <textarea class="textarea">
.withDelay?.({ millisecondDelay: 3_000 })
      </textarea>
    </div>
    <div class="state-container">
      <div class="label">Delay Timer</div>
      <div class="hint">
        All data is held for 3 seconds before entering the pipeline
      </div>
      <div class="hint file"></div>
      <textarea class="textarea" readonly>{{ timerDisplay() }}s</textarea>
    </div>
  </div>

  <div class="section column">
    <div class="state-container">
      <div class="label">Input State</div>
      <div class="hint">Raw data before processing</div>
      <div class="hint file">
        <span class="emphasis">File:</span> app/example.component.ts
      </div>
      <textarea class="data-textarea">{{ sample | json }}</textarea>
    </div>

    <div class="state-container data-row">
      <div class="label">FeatureCell State</div>
      <div class="hint">Final state after filters and reducers run</div>
      <div class="hint file">
        <span class="emphasis">File:</span> app/example.service.ts
      </div>
      @if (state.isLoading()) {
        <div class="status">Loading...</div>
      } @else if (state.error()) {
        <textarea class="data-textarea error" readonly
          >{{ state.error() | json }}
        </textarea>
        <div class="hint state">This is a VaultError display</div>
      } @else if (state.hasValue()) {
        <textarea class="data-textarea" readonly
          >{{ state.value() | json }}
        </textarea>
        <div class="hint state">
          <span class="emphasis">State:</span> {{ activeStateHint() }}
        </div>
        <div class="hint file">
          @if (displayActiveStateHint()) {
            <span class="emphasis">File:</span> app/app.config.ts
          } @else {
            &nbsp;
          }
        </div>
      } @else {
        <textarea class="data-textarea" readonly> </textarea>
        <div class="hint state">
          <span class="emphasis">State:</span> cleared - pipeline has no active
          value, error or loading status.
        </div>
        <div class="hint file">
          <span class="emphasis">File:</span> app/app.config.ts &nbsp;
        </div>
      }
    </div>
  </div>

  <div class="section">
    <div class="actions">
      <button class="sdux-button primary" (click)="loadSample()">
        Load Sample State
      </button>

      <div class="secondary-actions">
        <button class="sdux-button" (click)="resetState()">Reset State</button>
        <button class="sdux-button" (click)="toggleLoading()">
          Loading ({{ state.isLoading() }})
        </button>
        <button class="sdux-button" (click)="toggleError()">
          Error ({{ hasError() }})
        </button>
      </div>
    </div>
  </div>

  <div class="section learn-more">
    <div class="label">Learn More</div>
    <div class="learn-more-links">
      <a
        href="https://www.sdux-vault.com/docs/pipeline/controllers/with-delay-controller"
        target="_blank"
        rel="noopener noreferrer"
        >Delay Controller</a
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
\$text-area-height: 75px;
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
    }

    .hint {
      font-size: \$hint-font-size;
      color: #777;
      margin-top: -0.15rem;
      margin-left: 0.5rem;

      &.file {
        min-height: 16px;
        color: #999;
        font-family: monospace;
        font-size: \$hint-file-font-size;
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
import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { ElapsedTimer } from './elapsed-timer';
import { ExampleService } from './example.service';

/**
 * UI component responsible for rendering the example FeatureCell state.
 *
 * This component consumes the Vault-backed state exposed by ExampleService
 * and reacts to its value, loading, and error signals.
 *
 * The component does not manage state directly — it delegates all state
 * updates and lifecycle orchestration to the FeatureCell service.
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
   * Injected FeatureCell service.
   *
   * This provides access to the Vault instance and all
   * runtime pipeline behavior configured in the service.
   */
  #exampleService = inject(ExampleService);

  /**
   * Reactive StateSnapshotShape<T> accessor exposed by the Vault.
   *
   * Provides reactive access to:
   * - value()
   * - isLoading()
   * - error()
   * - hasValue()
   *
   * The template binds directly to these signals for rendering.
   */
  state = this.#exampleService.state;

  /**
   * Sample dataset used to demonstrate state replacement.
   */
  sample = [
    { id: 11, name: 'Luke', lastName: 'Skywalker' },
    { id: 38, name: 'Leia', lastName: 'Organa' },
    { id: 9, name: 'Han', lastName: 'Solo' }
  ];

  /** Hint text describing the current active state. */
  readonly activeStateHint = signal('Initial value is [] (empty array)');

  /** Whether to display the active state hint. */
  readonly displayActiveStateHint = signal(true);

  /** Whether the loading toggle is active. */
  readonly isLoading = signal(false);

  /** Whether the error state is currently set. */
  readonly hasError = computed<boolean>(() => this.state.error() !== null);

  /** Elapsed timer display value. */
  readonly timerDisplay = signal('0.000');

  /** Framework-agnostic elapsed timer instance. */
  readonly #timer = new ElapsedTimer((ms) =>
    this.timerDisplay.set(ElapsedTimer.format(ms))
  );

  /** Registers a DestroyRef callback to clean up the elapsed timer on component teardown. */
  constructor() {
    inject(DestroyRef).onDestroy(() => this.#timer.destroy());
  }

  /**
   * Delegate a full state replacement to the FeatureCell service.
   *
   * The component does NOT mutate state directly.
   * Instead, it forwards the intent to the service,
   * which owns the Vault and pipeline configuration.
   *
   * Architectural Flow:
   * Button Click
   *   → Component method
   *   → Service method
   *   → Vault update
   *   → Pipeline execution
   *   → Reactive UI refresh
   */
  loadSample(): void {
    this.displayActiveStateHint.set(false);
    this.activeStateHint.set(
      'State updated with sample data after filters and reducers run.'
    );
    this.#exampleService.replace(this.sample);
    this.#timer.start();
  }

  /**
   * Resets the FeatureCell state to its initial value.
   */
  resetState(): void {
    this.#exampleService.reset();
    this.#timer.reset();
  }

  /**
   * Toggles the loading flag and updates the service state.
   */
  toggleLoading(): void {
    this.isLoading.update((loading) => !loading);
    this.#exampleService.toggleLoading(this.isLoading());
  }

  /**
   * Toggles the error state between an Error instance and null.
   */
  toggleError(): void {
    const error = this.hasError() ? null : new Error('Example error message');
    this.#exampleService.toggleError(error);
  }
}
`,
    'src/app/example.service.ts': `import { Injectable } from '@angular/core';
import { FeatureCell, injectVault } from '@sdux-vault/angular';

/**
 * Shape representing a single example entity in the FeatureCell state.
 */
export interface Example {
  /** Unique identifier for the example entry. */
  id: number;

  /** First name of the character. */
  name: string;

  /** Last name of the character. */
  lastName: string;

  /** Whether the character is a Jedi, set by the jediReducer. */
  jedi?: boolean;

  /** Whether the character is a Senator, set by the jediReducer. */
  senator?: boolean;
  // TODO - add more fields to demonstrate filter/reducer behavior
}

/**
 * FeatureCell service for the 'example-feature-cell-key' state.
 *
 * This service owns the Vault-backed state and applies
 * runtime pipeline behaviors configured via the Vault fluent API.
 */
@FeatureCell<Example[]>('example-feature-cell-key')
@Injectable({ providedIn: 'root' })
export class ExampleService {
  /**
   * Internal Vault handle for this FeatureCell.
   *
   * ⚠️ Architectural Boundary:
   * The Vault instance is owned exclusively by this service.
   * Components must NEVER access the Vault directly.
   *
   * This ensures:
   * - Centralized state mutation
   * - Controlled pipeline configuration
   * - Proper lifecycle management
   * - Clear separation of concerns
   *
   * All state updates must go through service methods.
   */
  readonly #vault = injectVault<Example[]>(ExampleService);

  /**
   * Public reactive state snapshot exposed to consumers.
   *
   * This is the ONLY surface components should use.
   *
   * Provides read-only reactive access to:
   * - value()
   * - isLoading()
   * - error()
   * - hasValue()
   *
   * Components may read from state,
   * but must call service methods to modify it.
   */
  readonly state = this.#vault.state;

  /**
   * Configures the Vault runtime pipeline with a delay interceptor,
   * and finalizes the FeatureCell initialization.
   *
   * Pipeline execution order:
   *
   * 1. \`.withDelay?.({ millisecondDelay: 3_000 })\` — Holds all state
   *    updates for 3 seconds before releasing them into the pipeline.
   *    The UI will not reflect new data until the delay expires.
   *
   * 3. \`.initialize()\` — Locks the pipeline. No further behaviors can
   *    be registered after this call. State updates are only processed
   *    after initialization completes.
   */
  constructor() {
    // Runtime pipeline configuration
    this.#vault
      .withDelay?.({ millisecondDelay: 3_000 })
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
   * Replace the entire state synchronously.
   */
  replace(input: Example[]): void {
    this.#vault.replaceState({
      loading: false,
      value: input,
      error: null
    });
  }

  /**
   * Resets the FeatureCell state to its initial value.
   */
  reset(): void {
    this.#vault.reset();
  }

  /**
   * Toggles the loading flag on the current state.
   *
   * @param loading - Whether the state should indicate a loading status.
   */
  toggleLoading(loading: boolean): void {
    this.#vault.replaceState({
      loading,
      value: this.state.value()
    });
  }

  /**
   * Toggles the error state on the current FeatureCell.
   *
   * @param error - The error to set, or null to clear.
   */
  toggleError(error: Error | null): void {
    this.#vault.replaceState({
      error: error,
      value: this.state.value()
    });
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
