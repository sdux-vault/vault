import { Project } from '@stackblitz/sdk';

export const displayCharactersExampleProject: Project = {
  title: 'display-characters-example',
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
  "name": "display-characters-example",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "start": "ng serve --host 0.0.0.0 --port 4200"
  },
  "dependencies": {
    "@angular/cli": "21.2.11",
    "@angular/common": "21.2.13",
    "@angular/compiler": "21.2.13",
    "@angular/core": "21.2.13",
    "@angular/forms": "21.2.13",
    "@angular/platform-browser": "21.2.13",
    "@sdux-vault/addons": "latest",
    "@sdux-vault/angular": "latest",
    "rxjs": "~7.8.0",
    "tslib": "^2.8.0"
  },
  "devDependencies": {
    "@angular/build": "21.2.11",
    "@angular/compiler-cli": "21.2.13",
    "typescript": "~5.9.2"
  }
}
`,
    'src/app.config.ts': `// app.config.ts
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import { provideFeatureCell, provideVault } from '@sdux-vault/angular';
import { ExampleService } from './example.service';
import { STAR_WARS_CHARACTERS } from './star-wars-character.constant';

/**
 * Bootstraps Angular's browser services and initializes the application-scoped
 * Vault runtime before registering the Star Wars character FeatureCell.
 * \`provideFeatureCell()\` associates the Angular service with a unique Feature
 * key and an empty initial State, preparing that boundary for the service
 * integration added in the next tutorial step.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    /**
     * Initializes Vault with its default runtime configuration. This provider
     * must appear before FeatureCell providers so they can use the established
     * application-scoped runtime.
     */
    provideVault(),

    /**
     * Registers the character service and its FeatureCell descriptor with
     * Angular dependency injection. The unique key identifies this FeatureCell,
     * while the initialState property sets the initial character State
     * from a list of constants.
     */
    provideFeatureCell(ExampleService, {
      key: 'star-wars-character',
      initialState: STAR_WARS_CHARACTERS
    })
  ]
};
`,
    'src/example.component.html': `<section class="character-example" aria-labelledby="character-example-title">
  <header class="header">
    <div>
      <p class="eyebrow">Interactive example</p>
      <h2 id="character-example-title">Star Wars character registry</h2>
      <p>
        Use SDuX Vault state management to display a single character from an
        in-memory collection by dropdown selection.
      </p>
    </div>
  </header>

  <fieldset class="feature-cell-controls">
    <div class="workspace">
      <div class="workspace-row workspace-row-top">
        <div class="field selection">
          <label for="character-selection">
            Character ({{ characters().length }} total)
          </label>
          <select
            #characterSelection
            id="character-selection"
            [disabled]="characters().length === 0"
            (change)="selectCharacter(characterSelection.value)">
            <option
              value=""
              disabled
              [selected]="selectedCharacterId() === null">
              Select a character
            </option>
            @for (character of characters(); track character.id) {
              <option
                [value]="character.id"
                [selected]="character.id === selectedCharacterId()">
                {{
                  character.fullName ??
                    character.name + ' ' + character.lastName
                }}
              </option>
            }
          </select>
        </div>
      </div>
      <div class="workspace-row workspace-row-bottom">
        <section
          class="panel character-details"
          aria-labelledby="details-title">
          <div class="header">
            <h3 id="details-title">Character details</h3>
          </div>

          @if (selectedCharacter(); as character) {
            <!-- Teaching point: Minimal Read-Only FeatureCell (ex-002) -->
            <dl>
              <div>
                <dt>Full name</dt>
                <dd>
                  {{ character.fullName }}
                </dd>
              </div>
              <div>
                <dt>First name</dt>
                <dd>{{ character.name }}</dd>
              </div>
              <div>
                <dt>Last name</dt>
                <dd>{{ character.lastName }}</dd>
              </div>
              <div>
                <dt>Identifier</dt>
                <dd>{{ character.id }}</dd>
              </div>
              <div>
                <dt>Faction</dt>
                <dd>{{ character.faction }}</dd>
              </div>
              <div>
                <dt class="force-sensitive">Force-sensitive</dt>
                <dd>{{ character.forceSensitiveDisplay }}</dd>
              </div>
            </dl>
          } @else {
            <div class="empty-state">
              <h4>No character selected</h4>
              <p>Choose a character from the list.</p>
            </div>
          }
        </section>
      </div>
    </div>
  </fieldset>
</section>
`,
    'src/example.component.scss': `// Local design tokens keep this tutorial example self-contained for copy/paste use.
\$sdux-primary-base: #1976d2;
\$sdux-primary-light: #63a4ff;
\$sdux-primary-dark: #004ba0;
\$sdux-accent-base: #d32f2f;
\$sdux-accent-dark: #b71c1c;
\$sdux-warn-base: #fbc02d;
\$sdux-warn-dark: #c49000;
\$sdux-success-base: #388e3c;
\$sdux-text-inverse: #0f172a;
\$sdux-text-white: #ffffff;
\$sdux-surface-light: #ffffff;
\$sdux-surface-outline: \$sdux-primary-light;

\$breakpoint-sm: 480px;
\$breakpoint-md: 768px;
\$breakpoint-lg: 1024px;

\$border-radius-sm: 0.3125rem;
\$border-radius-md: 0.5rem;
\$border-radius-lg: 0.75rem;

\$font-size-xs: 0.75rem;
\$font-size-sm: 0.875rem;
\$font-size-md: 1rem;
\$font-size-xl: 1.25rem;
\$font-size-2xl: 1.5rem;

\$font-weight-medium: 500;
\$font-weight-semibold: 600;
\$font-weight-bold: 700;

\$spacing-xs: 0.25rem;
\$spacing-sm: 0.5rem;
\$spacing-md: 1rem;
\$spacing-lg: 1.5rem;

\$action-button-width: 250px;
\$action-chevron-size: 22.5px;
\$action-chevron-hit-area: 44px;
\$action-column-width: calc(
  \$action-button-width + \$action-chevron-hit-area + \$spacing-xs
);

@mixin visually-hidden-control {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

@mixin chevron-control(\$rotation: 45deg) {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: \$action-chevron-hit-area;
  min-width: \$action-chevron-hit-area;
  height: \$action-chevron-hit-area;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  color: \$sdux-text-white;
  line-height: 0;
  background: transparent;
  border: 0;
  cursor: pointer;
  transition: transform 0.15s ease;

  &:hover {
    transform: translateY(-2px);

    &::after {
      background: \$sdux-primary-dark;
    }
  }

  &:active {
    transform: scale(0.95);
  }

  &::before {
    position: relative;
    z-index: 1;
    display: block;
    width: 6px;
    height: 6px;
    box-sizing: border-box;
    content: '';
    border-right: 2px solid currentColor;
    border-bottom: 2px solid currentColor;
    transform: rotate(\$rotation);
    transition: transform 150ms ease;
  }

  &::after {
    position: absolute;
    width: \$action-chevron-size;
    height: \$action-chevron-size;
    content: '';
    background: \$sdux-primary-base;
    border: 1px solid transparent;
    border-radius: 50%;
    transition: background-color 0.2s ease;
  }
}

@mixin expandable-action-row {
  display: grid;
  grid-template-rows: auto 1fr;
  gap: \$spacing-sm;
  width: min(100%, \$action-column-width);

  .button-container {
    display: flex;
    gap: \$spacing-xs;
    align-items: center;

    .delay-timer {
      width: 50%;

      > input {
        text-align: right;
        padding-right: 0;
      }
    }

    > span {
      width: 50%;
      font-size: \$font-size-md;
      font-weight: \$font-weight-semibold;
    }

    .button {
      flex: 0 0 \$action-button-width;
      width: \$action-button-width;
      box-sizing: border-box;
    }

    &.hydrate-controls .button.hydrate-terminal,
    &.promise-controls .button.promise-terminal,
    &.observable-controls .button.observable-terminal {
      flex-basis: \$action-button-width * 0.49;
      width: \$action-button-width * 0.4;
    }

    &.hydrate-controls,
    &.promise-controls,
    &.observable-controls {
      width: 100%;
      justify-content: space-between;
    }

    .description-chevron {
      @include chevron-control(-45deg);
    }
  }

  .description-container {
    display: none;
    color: var(--sdux-text-muted);
    line-height: 1.5;
  }

  .description-toggle:focus-visible ~ .button-container {
    .description-chevron {
      outline: 2px solid \$sdux-primary-light;
      outline-offset: 3px;
    }
  }

  .description-toggle:checked ~ .button-container {
    .description-chevron::before {
      transform: rotate(45deg);
    }
  }

  .description-toggle:checked ~ .description-container {
    display: block;
  }
}

:host {
  display: block;
}

.character-example {
  display: flex;
  flex-direction: column;
  gap: \$spacing-lg;
  width: 100%;
  padding: \$spacing-lg;
  box-sizing: border-box;
  color: var(--sdux-text-default);
  background: var(--sdux-surface-bg);
  border: 1px solid \$sdux-surface-outline;
  border-radius: \$border-radius-lg;

  .eyebrow {
    color: \$sdux-primary-light;
    font-size: \$font-size-xs;
    font-weight: \$font-weight-bold;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: \$spacing-sm;
  }

  .section-toggle,
  .description-toggle,
  .tap-toggle {
    @include visually-hidden-control;
  }

  .section-header {
    display: flex;
    grid-column: 1 / -1;
    align-items: center;
    justify-content: space-between;

    > span {
      font-size: \$font-size-xl;
      font-weight: \$font-weight-semibold;
    }

    .section-chevron {
      @include chevron-control(45deg);
    }
  }

  .section-toggle:focus-visible ~ .section-header {
    .section-chevron {
      outline: 2px solid \$sdux-primary-light;
      outline-offset: 3px;
    }
  }

  .section-toggle:not(:checked) ~ .section-header {
    .section-chevron::before {
      transform: rotate(-45deg);
    }
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: \$spacing-xs;
    min-width: 0;

    label {
      font-size: \$font-size-sm;
      font-weight: \$font-weight-semibold;
    }

    input,
    select {
      width: 100%;
      min-height: 42px;
      padding: \$spacing-sm \$spacing-md;
      box-sizing: border-box;
      color: \$sdux-text-inverse;
      background: \$sdux-surface-light;
      border: 1px solid \$sdux-surface-outline;
      border-radius: \$border-radius-sm;
      font: inherit;

      &:focus-visible {
        outline: 3px solid
          color-mix(in srgb, \$sdux-primary-base 45%, transparent);
        outline-offset: 2px;
        border-color: \$sdux-primary-base;
      }

      &[aria-invalid='true'] {
        border-color: \$sdux-accent-base;
      }
    }

    .error {
      margin: 0;
      color: \$sdux-accent-base;
      font-size: \$font-size-xs;
    }

    &.selection {
      flex: 1 1 280px;
      width: 100%;
    }
  }

  .button {
    min-height: 40px;
    padding: \$spacing-sm \$spacing-md;
    color: \$sdux-text-white;
    background: \$sdux-primary-base;
    border: 1px solid \$sdux-primary-dark;
    border-radius: \$border-radius-sm;
    font: inherit;
    font-weight: \$font-weight-semibold;
    cursor: pointer;
    transition:
      background-color 150ms ease,
      box-shadow 150ms ease,
      transform 150ms ease;

    &:hover:not(:disabled) {
      background: \$sdux-primary-dark;
      transform: translateY(-1px);
    }

    &:active:not(:disabled) {
      box-shadow: inset 0 3px 5px
        color-mix(in srgb, \$sdux-text-inverse 35%, transparent);
      transform: translateY(1px) scale(0.98);
      transition-duration: 50ms;
    }

    &:focus-visible {
      outline: 3px solid
        color-mix(in srgb, \$sdux-primary-light 55%, transparent);
      outline-offset: 2px;
    }

    &:disabled {
      opacity: 0.55;
      cursor: not-allowed;
    }

    &.secondary {
      color: var(--sdux-text-default);
      background: transparent;
      border-color: \$sdux-primary-light;

      &:hover:not(:disabled) {
        background: color-mix(in srgb, \$sdux-primary-base 14%, transparent);
      }
    }

    &.danger {
      color: \$sdux-text-white;
      background: \$sdux-accent-base;
      border-color: \$sdux-accent-dark;

      &:hover:not(:disabled) {
        background: \$sdux-accent-dark;
      }
    }

    &.warn {
      color: \$sdux-text-inverse;
      background: \$sdux-warn-base;
      border-color: \$sdux-warn-dark;

      &:hover:not(:disabled) {
        background: \$sdux-warn-dark;
      }
    }
  }

  > .header {
    display: flex;
    flex-direction: column;
    gap: \$spacing-md;
    align-items: flex-start;
    justify-content: space-between;

    @media (min-width: \$breakpoint-md) {
      flex-direction: row;
      align-items: center;
    }

    h2,
    p {
      margin: 0;
    }

    h2 {
      margin-bottom: \$spacing-xs;
      font-size: \$font-size-2xl;
    }
  }

  > .feedback {
    padding: \$spacing-sm \$spacing-md;
    border: 1px solid \$sdux-primary-light;
    border-left-width: 4px;
    border-radius: \$border-radius-sm;
    background: color-mix(in srgb, \$sdux-primary-base 10%, transparent);

    &.error {
      border-color: \$sdux-accent-base;
      background: color-mix(in srgb, \$sdux-accent-base 12%, transparent);
    }

    &.caution {
      color: \$sdux-text-inverse;
      border-color: \$sdux-warn-base;
      background: color-mix(in srgb, \$sdux-warn-base 12%, transparent);
    }

    &.success {
      border-color: \$sdux-success-base;
      background: color-mix(in srgb, \$sdux-success-base 12%, transparent);
    }

    &.global-error {
      display: flex;
      flex-wrap: wrap;
      gap: \$spacing-md;
      align-items: center;
      justify-content: space-between;

      .button {
        flex: 0 0 auto;
      }
    }
  }

  > .feature-cell-controls {
    display: block;
    min-width: 0;
    padding: 0;
    margin: 0;
    border: 0;

    &:disabled {
      .section-chevron,
      .description-chevron,
      .tap-chevron {
        pointer-events: none;
        opacity: 0.55;
        cursor: not-allowed;
      }
    }
  }

  > .feature-cell-controls > .delete-confirmation {
    display: flex;
    flex-direction: column;
    gap: \$spacing-md;
    justify-content: space-between;
    padding: \$spacing-md;
    border: 1px solid \$sdux-warn-base;
    border-left-width: 4px;
    border-radius: \$border-radius-sm;
    background: color-mix(in srgb, \$sdux-warn-base 12%, transparent);

    @media (min-width: \$breakpoint-md) {
      flex-direction: row;
      align-items: center;
    }

    h3,
    p {
      margin: 0;
    }

    h3 {
      font-size: \$font-size-md;
    }
  }

  > .feature-cell-controls > .workspace {
    display: grid;
    gap: \$spacing-lg;
    margin-bottom: \$spacing-lg;

    > .workspace-row {
      display: grid;
      gap: \$spacing-lg;
      min-width: 0;

      @media (min-width: \$breakpoint-lg) {
        grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
      }
    }

    > .workspace-row-top {
      align-items: end;

      @media (min-width: \$breakpoint-lg) {
        .add-action {
          align-items: flex-end;
          justify-content: flex-end;
        }
      }
    }

    > .workspace-row-bottom {
      align-items: stretch;
    }

    .panel {
      display: flex;
      flex-direction: column;
      align-self: stretch;
      min-width: 0;
      padding: \$spacing-lg;
      background: var(--sdux-surface-elevated);
      border: 1px solid \$sdux-surface-outline;
      border-radius: \$border-radius-md;

      > .header {
        margin-bottom: \$spacing-lg;

        h3,
        p {
          margin: 0;
        }

        h3 {
          font-size: \$font-size-xl;
        }
      }

      &.character-details {
        position: relative;

        .loading-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: \$spacing-md;
          align-items: center;
          justify-content: center;
          padding: \$spacing-lg;
          background: var(--sdux-surface-elevated);
          border-radius: \$border-radius-md;
          text-align: center;

          .spinner {
            width: 48px;
            height: 48px;
            border: 5px solid \$sdux-primary-light;
            border-top-color: \$sdux-primary-dark;
            border-radius: 50%;
            animation: character-loading-spin 800ms linear infinite;
          }

          .loading-guidance {
            max-width: 34ch;
            margin: 0;
            color: var(--sdux-text-default);
            line-height: 1.5;
          }
        }

        dl {
          display: grid;
          gap: \$spacing-md;
          margin: 0;

          div {
            display: grid;
            grid-template-columns: minmax(100px, 0.7fr) minmax(0, 1.3fr);
            gap: \$spacing-md;
            padding-bottom: \$spacing-sm;
            border-bottom: 1px solid \$sdux-surface-outline;
          }

          dt {
            color: var(--sdux-text-muted);
            font-weight: \$font-weight-semibold;

            &.force-sensitive {
              min-width: 120px;
              white-space: nowrap;
            }
          }

          dd {
            margin: 0;
            overflow-wrap: anywhere;
          }
        }

        .empty-state {
          display: flex;
          flex-direction: column;
          gap: \$spacing-sm;
          align-items: flex-start;
          padding: \$spacing-lg;
          text-align: left;
          border: 1px dashed \$sdux-surface-outline;
          border-radius: \$border-radius-sm;

          h4,
          p {
            margin: 0;
          }
        }
      }

      &.editor {
        > form {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .form-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: \$spacing-md;

          @media (min-width: \$breakpoint-md) {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .checkbox {
            display: inline-flex;
            gap: \$spacing-sm;
            align-items: center;
            align-self: end;
            width: fit-content;
            min-height: 42px;
            font-weight: \$font-weight-medium;
            cursor: pointer;

            input {
              width: 18px;
              height: 18px;
              accent-color: \$sdux-primary-base;
            }
          }
        }

        > form > .actions {
          justify-content: flex-end;
          margin-top: \$spacing-lg;

          .delete {
            margin-right: auto;
          }
        }
      }
    }

    .add-action {
      justify-content: flex-start;
      margin: 0;

      @media (min-width: \$breakpoint-lg) {
        align-items: flex-end;
        justify-content: flex-end;
      }

      .button {
        flex: 0 0 auto;
        width: auto;
        min-height: 42px;
      }

      @media (max-width: \$breakpoint-lg) {
        .button {
          width: 100%;
        }
      }
    }
  }

  > .feature-cell-controls > .lifecycle-actions {
    display: grid;
    gap: \$spacing-md;
    padding-top: \$spacing-lg;
    margin-top: \$spacing-sm;
    margin-bottom: \$spacing-lg;
    border-top: 1px solid \$sdux-primary-base;

    > .section-toggle:not(:checked) ~ .operator-actions {
      display: none;
    }

    .operator-actions {
      display: grid;
      gap: \$spacing-md;
      grid-template-columns: repeat(
        auto-fit,
        minmax(min(100%, \$action-column-width), 1fr)
      );
      align-items: start;
    }

    .lifecycle-action-row {
      @include expandable-action-row;
      min-width: \$action-column-width;
    }
  }

  > .feature-cell-controls > .pipeline-actions {
    display: grid;
    gap: \$spacing-lg;
    padding-top: \$spacing-lg;
    margin-bottom: \$spacing-lg;
    border-top: 1px solid \$sdux-primary-base;

    > .section-toggle:not(:checked) ~ .pipeline-content {
      display: none;
    }

    .pipeline-content {
      display: grid;
      gap: \$spacing-lg;
    }

    .action-groups {
      display: grid;
      gap: \$spacing-md;
      grid-template-columns: repeat(
        auto-fit,
        minmax(min(100%, \$action-column-width), 1fr)
      );
      align-items: start;
    }

    .action-group {
      display: contents;
    }

    .action-row {
      @include expandable-action-row;
    }
  }

  > .feature-cell-controls > .distinct-operator,
  > .feature-cell-controls > .tab-sync-operator {
    display: grid;
    gap: \$spacing-md;
    padding-top: \$spacing-lg;
    margin-bottom: \$spacing-lg;
    border-top: 1px solid \$sdux-primary-base;

    > .section-toggle:not(:checked) ~ .operator-actions,
    > .section-toggle:not(:checked) ~ .comparison-function-column {
      display: none;
    }

    .action-row {
      @include expandable-action-row;
    }

    .operator-actions {
      display: grid;
      gap: \$spacing-md;
      align-items: start;

      @media (min-width: \$breakpoint-md) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .tab-sync-action-row {
        grid-column: 1 / -1;
        width: 100%;

        .button-container {
          justify-content: flex-start;
        }
      }
    }

    .comparison-function-column {
      display: grid;
      grid-template-rows: auto 1fr;
      gap: \$spacing-sm;
      width: 100%;

      .tap-header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        h3 {
          margin: 0;
          font-size: \$font-size-md;
        }

        .tap-chevron {
          @include chevron-control(45deg);
        }
      }

      textarea {
        width: 100%;
        height: calc(320px / 3);
        min-height: calc(320px / 3);
        padding: \$spacing-md;
        box-sizing: border-box;
        color: \$sdux-text-inverse;
        background: \$sdux-surface-light;
        border: 1px solid \$sdux-surface-outline;
        border-radius: \$border-radius-sm;
        font: inherit;
        resize: vertical;
      }

      > .tap-toggle:focus-visible ~ .tap-header .tap-chevron {
        outline: 2px solid \$sdux-primary-light;
        outline-offset: 3px;
      }

      > .tap-toggle:not(:checked) ~ .tap-header .tap-chevron::before {
        transform: rotate(-45deg);
      }

      > .tap-toggle:not(:checked) ~ textarea {
        display: none;
      }
    }
  }

  > .feature-cell-controls > .tap-output,
  > .feature-cell-controls > .state-output,
  > .feature-cell-controls > .filter-reducer-output {
    display: grid;
    gap: \$spacing-lg;
    padding-top: \$spacing-lg;
    margin-bottom: \$spacing-lg;
    border-top: 1px solid \$sdux-primary-base;

    > .section-toggle:not(:checked) ~ .state-content,
    > .section-toggle:not(:checked) ~ .filter-reducer-content,
    > .section-toggle:not(:checked) ~ .tap-content {
      display: none;
    }

    .state-content,
    .filter-reducer-content,
    .tap-content {
      display: grid;
      gap: \$spacing-lg;
    }

    .state-content,
    .tap-content {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .tap-column {
      display: grid;
      grid-template-rows: auto 1fr;
      gap: \$spacing-sm;

      .tap-header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        h3 {
          margin: 0;
          font-size: \$font-size-md;
        }

        .tap-chevron {
          @include chevron-control(45deg);
        }
      }

      textarea {
        width: 100%;
        min-height: 160px;
        padding: \$spacing-md;
        box-sizing: border-box;
        color: \$sdux-text-inverse;
        background: \$sdux-surface-light;
        border: 1px solid \$sdux-surface-outline;
        border-radius: \$border-radius-sm;
        font: inherit;
        resize: vertical;
      }

      .delay-fields {
        display: grid;
        grid-template-rows: repeat(2, auto);
        gap: \$spacing-sm;

        label {
          display: flex;
          flex-direction: column;
          gap: \$spacing-xs;
          color: var(--sdux-text-muted);
          font-size: \$font-size-sm;
          font-weight: \$font-weight-semibold;
        }

        input {
          width: 100%;
          min-height: 42px;
          padding: \$spacing-sm \$spacing-md;
          box-sizing: border-box;
          color: \$sdux-text-inverse;
          background: \$sdux-surface-light;
          border: 1px solid \$sdux-surface-outline;
          border-radius: \$border-radius-sm;
          font: inherit;

          &:focus-visible {
            outline: 3px solid
              color-mix(in srgb, \$sdux-primary-base 45%, transparent);
            outline-offset: 2px;
            border-color: \$sdux-primary-base;
          }
        }
      }
    }

    .tap-toggle:focus-visible ~ .tap-column {
      .tap-chevron {
        outline: 2px solid \$sdux-primary-light;
        outline-offset: 3px;
      }
    }

    .tap-toggle:not(:checked) ~ .tap-column {
      textarea,
      .delay-fields {
        display: none;
      }

      .tap-chevron::before {
        transform: rotate(-45deg);
      }
    }
  }

  > .feature-cell-controls > .filter-reducer-output {
    .filter-reducer-content {
      grid-template-columns: minmax(0, 1fr);
    }

    .tap-column {
      width: 100%;

      > .tap-toggle:focus-visible ~ .tap-header {
        .tap-chevron {
          outline: 2px solid \$sdux-primary-light;
          outline-offset: 3px;
        }
      }

      > .tap-toggle:not(:checked) ~ .tap-header {
        .tap-chevron::before {
          transform: rotate(-45deg);
        }
      }

      > .tap-toggle:not(:checked) ~ textarea {
        display: none;
      }

      textarea {
        width: 100%;
        height: calc(320px / 3);
        min-height: calc(320px / 3);
      }
    }
  }

  > .feature-cell-controls > .stepwise-output {
    display: grid;
    gap: \$spacing-lg;
    padding-top: \$spacing-lg;
    margin-bottom: \$spacing-lg;
    border-top: 1px solid \$sdux-primary-base;

    > .section-toggle:not(:checked) ~ .stepwise-content {
      display: none;
    }

    .stepwise-content {
      display: grid;
      gap: \$spacing-lg;
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .stepwise-column {
      display: grid;
      grid-template-rows: auto 1fr;
      gap: \$spacing-sm;

      .stepwise-header {
        display: flex;
        gap: \$spacing-sm;
        align-items: center;
        justify-content: space-between;

        h3 {
          margin: 0;
          font-size: \$font-size-md;
        }
      }

      textarea {
        width: 100%;
        min-height: 160px;
        padding: \$spacing-md;
        box-sizing: border-box;
        color: \$sdux-text-inverse;
        background: \$sdux-surface-light;
        border: 1px solid \$sdux-surface-outline;
        border-radius: \$border-radius-sm;
        font: inherit;
        resize: vertical;
      }
    }
  }

  @media (max-width: \$breakpoint-sm) {
    padding: \$spacing-md;

    .actions {
      flex-direction: column;

      .button {
        width: 100%;
      }
    }

    .tap-output,
    .state-output,
    .filter-reducer-output {
      .tap-content,
      .state-content,
      .filter-reducer-content {
        grid-template-columns: minmax(0, 1fr);
      }
    }

    .stepwise-output {
      .stepwise-content {
        grid-template-columns: minmax(0, 1fr);
      }
    }
  }
}

@keyframes character-loading-spin {
  to {
    transform: rotate(360deg);
  }
}
`,
    'src/example.component.spec.ts': `import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { ExampleComponent } from './example.component';
import { ExampleService } from './example.service';
import { StarWarsCharacter } from './star-wars-character.shape';

describe('ExampleComponent', () => {
  const key = 'star-wars-character';
  const initialCharacters: readonly StarWarsCharacter[] = [
    {
      id: 1,
      name: 'Luke',
      lastName: 'Skywalker',
      faction: 'Jedi Order',
      isForceSensitive: true
    },
    {
      id: 2,
      name: 'Leia',
      lastName: 'Organa',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    }
  ];

  let component: ExampleComponent;
  let fixture: ComponentFixture<ExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleComponent],
      providers: [
        provideVaultTesting(),
        provideZonelessChangeDetection(),
        provideFeatureCell(ExampleService, {
          key,
          initialState: initialCharacters
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should expose the latest character collection from the service', async () => {
    expect(component.characters()).toEqual([]);
    await vaultSettled(key);
    expect(component.characters()).toEqual(initialCharacters);
  });

  it('should expose no selected character before a valid selection is made', async () => {
    await vaultSettled(key);
    expect(component['selectedCharacterId']()).toBeNull();
    expect(component['selectedCharacter']()).toBeNull();
  });

  it('should select a known character id and resolve the selected character', async () => {
    await vaultSettled(key);
    component['selectCharacter']('2');

    expect(component['selectedCharacterId']()).toBe(2);
    expect(component['selectedCharacter']()).toEqual(initialCharacters[1]);
  });

  it('should ignore an unknown character id', async () => {
    await vaultSettled(key);
    component['selectCharacter']('999');

    expect(component['selectedCharacterId']()).toBeNull();
    expect(component['selectedCharacter']()).toBeNull();
  });

  it('should keep the empty state when a selected id is not found', async () => {
    await vaultSettled(key);
    component['selectCharacter']('3');

    expect(component['selectedCharacterId']()).toBeNull();
    expect(component['selectedCharacter']()).toBeNull();
  });

  it('should render the empty state until a character is selected', async () => {
    await vaultSettled(key);
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    const detailsPanel = host.querySelector(
      '.character-details'
    ) as HTMLElement;

    expect(detailsPanel.textContent).toContain('No character selected');
    expect(detailsPanel.textContent).not.toContain('Leia');
  });

  it('should render the selected character details after selection', async () => {
    await vaultSettled(key);
    component['selectCharacter']('2');
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;

    expect(host.textContent).toContain('Leia');
    expect(host.textContent).toContain('Rebel Alliance');
    expect(host.textContent).not.toContain('No character selected');
  });
});
`,
    'src/example.component.ts': `import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ExampleService } from './example.service';
import { StarWarsCharacter } from './star-wars-character.shape';

/**
 * Projects SDuX-managed character State into template-ready selection data.
 * The component reads the service-owned FeatureCell State, keeps only the selected
 * character identity locally, and derives the displayed record from that identity.
 * **Architectural Boundary:** The component owns presentation state while the service owns
 * FeatureCell access and committed collection State.
 */
@Component({
  selector: 'sdux-star-wars-character-example',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleComponent {
  /**
   * Provides the component-facing character use cases and reactive collection signal.
   * The component never reaches through this service to access the FeatureCell directly.
   */
  readonly #exampleService = inject(ExampleService);

  /**
   * Projects the current FeatureCell value into a read-only Angular computed signal.
   * The empty-array fallback gives templates a stable collection before a value is available.
   */
  readonly characters = computed<readonly StarWarsCharacter[]>(
    () => this.#exampleService.state.value() ?? []
  );

  /** Holds the identity currently selected by the character picker, or \`null\` when none is selected. */
  protected readonly selectedCharacterId = signal<number | null>(null);

  /**
   * Resolves the selected identity against the latest reactive character collection.
   * Returning \`null\` keeps the template safe when the character was removed or never existed.
   */
  protected readonly selectedCharacter = computed(() => {
    const selectedId = this.selectedCharacterId();
    return this.characters().find(({ id }) => id === selectedId) ?? null;
  });

  /**
   * Resolves a picker value to a known character identity in the current SDuX-managed collection.
   * Unknown identities are ignored so stale or invalid option values cannot change the displayed State.
   * @param value - Character identity received from the select element.
   * @returns Nothing; the selected identity signal is updated in place.
   */
  protected selectCharacter(value: string): void {
    const character =
      this.characters().find((character) => character.id === Number(value)) ??
      null;

    if (!character) {
      return;
    }

    this.selectedCharacterId.set(character.id);
  }
}
`,
    'src/example.service.spec.ts': `import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { ExampleService } from './example.service';
import { StarWarsCharacter } from './star-wars-character.shape';

describe('ExampleService', () => {
  const key = 'star-wars-character';
  let service: ExampleService;
  const initialCharacters: readonly StarWarsCharacter[] = [
    {
      id: 10,
      name: 'Leia',
      lastName: 'Organa',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    },
    {
      id: 20,
      name: 'Luke',
      lastName: 'Skywalker',
      faction: 'Jedi Order',
      isForceSensitive: true
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideVaultTesting(),
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideFeatureCell(
          ExampleService,
          { key, initialState: initialCharacters },
          [],
          []
        )
      ]
    });

    service = TestBed.inject(ExampleService);
  });

  it('should initialize with the configured FeatureCell State', async () => {
    await vaultSettled(key);
    expect(service.state.value()).toEqual(initialCharacters);
    expect(service.state.isLoading()).toBeFalse();
    expect(service.state.error()).toBeNull();
    expect(service.state.hasValue()).toBeTrue();
  });
});
`,
    'src/example.service.ts': `// example.service.ts
import { Injectable } from '@angular/core';
import { FeatureCell, injectVault } from '@sdux-vault/angular';
import { StarWarsCharacter } from './star-wars-character.shape';

/**
 * Owns the character collection and exposes domain operations for the tutorial component.
 * The FeatureCell decorator associates this service with a typed state boundary, while
 * \`injectVault\` provides the reactive state and update methods for that boundary.
 * Create, update, remove, and restore operations all flow through the FeatureCell pipeline.
 * ️**Architectural Boundary:** Components consume this service instead of accessing the
 * FeatureCell directly, keeping state ownership and character rules in one place.
 */
@FeatureCell<readonly StarWarsCharacter[]>('star-wars-character')
@Injectable({ providedIn: 'root' })
export class ExampleService {
  /**
   * Provides the strongly typed FeatureCell API associated with this decorated service.
   * Every collection update passes through this reference before reactive state changes.
   */
  readonly #vault = injectVault<readonly StarWarsCharacter[]>(ExampleService);

  /**
   * Exposes the FeatureCell's Angular signal state for value, loading, error, and presence checks.
   * Consumers can bind to these reactive accessors without subscribing manually.
   */
  readonly state = this.#vault.state;

  /**
   * Captures the first committed collection, then configures and initializes the FeatureCell pipeline.
   */
  constructor() {
    /*
     * \`.initialize()\` finalizes the pipeline configuration and activates the
     * FeatureCell. Its initial value and subsequent updates now pass through the
     * the entire pipeline before becoming committed immutable, reactive State.
     */
    this.#vault.initialize();
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
  </head>
  <body>
    <sdux-star-wars-character-example></sdux-star-wars-character-example>
  </body>
</html>
`,
    'src/main.ts': `import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app.config';
import { ExampleComponent } from './example.component';

bootstrapApplication(ExampleComponent, appConfig).catch((error) => {
  console.error(error);
});
`,
    'src/star-wars-character.constant.ts': `import type { RawStarWarsCharacter } from './star-wars-character.shape';

/** Raw tutorial seed data captured before filters and reducers add display-only fields. */
export const STAR_WARS_CHARACTERS: readonly RawStarWarsCharacter[] = [
  {
    id: 1,
    name: 'Luke',
    lastName: 'Skywalker',
    faction: 'Rebel Alliance',
    isForceSensitive: true
  },
  {
    id: 2,
    name: 'Leia',
    lastName: 'Organa',
    faction: 'Rebel Alliance',
    isForceSensitive: false
  },
  {
    id: 3,
    name: 'Darth',
    lastName: 'Vader',
    faction: 'Galactic Empire',
    isForceSensitive: false
  },
  {
    id: 4,
    name: 'Obi-Wan',
    lastName: 'Kenobi',
    faction: 'Jedi Order',
    isForceSensitive: true
  },
  {
    id: 5,
    name: 'Chewbacca',
    lastName: 'unknown',
    faction: 'Rebel Alliance',
    isForceSensitive: false
  }
];
`,
    'src/star-wars-character.shape.ts': `// star-wars-character.shape.ts

// Defines the raw pre-reducer State contract for a Star Wars character.
export interface RawStarWarsCharacter {
  /** Unique identifier for the character. */
  id: number;

  /** First name of the character. */
  name: string;

  /** Last name of the character. */
  lastName: string;

  /** Faction associated with the character. */
  faction: string;

  /** Indicates whether the character is force-sensitive. */
  isForceSensitive: boolean;
}

// Defines the display-only fields derived by the reducer stage.
export interface StarWarsCharacterDisplayFields {
  /** Full name derived from the raw \`name\` and \`lastName\` fields. */
  fullName: string;

  /** Translated display value for force-sensitive status. */
  forceSensitiveDisplay: string;
}

// Defines the committed tutorial State contract, which may include reducer-derived display fields.
export type StarWarsCharacter = RawStarWarsCharacter &
  Partial<StarWarsCharacterDisplayFields>;
`,
    'src/styles.scss': `html,
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

body {
  padding: 1rem;
  background: #f8fafc;
  color: #0f172a;
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
