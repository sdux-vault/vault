import { Project } from '@stackblitz/sdk';

export const stepwiseTutorialExampleProject: Project = {
  title: 'stepwise-tutorial-example',
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
  "name": "stepwise-tutorial-example",
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
import {
  withArrayAppendMergeBehavior,
  withStepwiseController,
  withStepwiseFilterBehavior,
  withStepwiseReducerBehavior,
  withStepwiseResolveBehavior
} from '@sdux-vault/addons';
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
    provideFeatureCell(
      ExampleService,
      {
        key: 'star-wars-character',
        initialState: STAR_WARS_CHARACTERS
      },
      [
        /**
         * Preserves the example's collection-oriented merge behavior so a newly
         * created character can be appended to the existing FeatureCell State.
         * The behavior runs during the pipeline's Merge stage and keeps the
         * service focused on describing the update rather than combining arrays.
         */
        withArrayAppendMergeBehavior,

        /**
         * Adds an approval boundary after the Resolve stage. The service exposes
         * the resolved candidate and waits for the example UI to accept or reject
         * it before the candidate continues through the pipeline.
         */
        withStepwiseResolveBehavior,

        /**
         * Adds an approval boundary after filtering. The filtered candidate is
         * made available to the service callback so the UI can accept it and let
         * reducers continue, or reject it and preserve the committed State.
         */
        withStepwiseFilterBehavior,

        /**
         * Adds an approval boundary after all reducers finish. The service can
         * expose the reduced candidate for inspection and decide whether it may
         * become the next committed FeatureCell State.
         */
        withStepwiseReducerBehavior
      ],
      [
        /**
         * Connects the three Stepwise behavior boundaries to the controller that
         * can pause each candidate until the service supplies an accept or reject
         * decision. Without this controller, the callbacks cannot hold the
         * pipeline for the interactive approval demonstrated by the example.
         */
        withStepwiseController
      ]
    )
  ]
};
`,
    'src/example.character-domain.spec.ts': `import {
  cloneCharacters,
  createCharacterState,
  deriveForceSensitiveDisplay,
  deriveFullName,
  getDistinctChangedStateCharacter,
  getNextCharacterId,
  withCharactersSortedByLastName
} from './example.character-domain';

import { StarWarsCharacter } from './star-wars-character.shape';

describe('Character domain', () => {
  const leia: StarWarsCharacter = {
    id: 10,
    name: 'Leia',
    lastName: 'Organa',
    faction: 'Rebel Alliance',
    isForceSensitive: false
  };
  const luke: StarWarsCharacter = {
    id: 20,
    name: 'Luke',
    lastName: 'Skywalker',
    faction: 'Jedi Order',
    isForceSensitive: true
  };

  it('should create a character without mutating its draft', () => {
    const draft = {
      name: 'Han',
      lastName: 'Solo',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    };

    expect(createCharacterState(30, draft)).toEqual({ id: 30, ...draft });
    expect(draft).toEqual({
      name: 'Han',
      lastName: 'Solo',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    });
  });

  it('should clone both the collection and its character objects', () => {
    const characters = [leia, luke];
    const cloned = cloneCharacters(characters);

    expect(cloned).toEqual(characters);
    expect(cloned).not.toBe(characters);
    expect(cloned[0]).not.toBe(leia);
    expect(cloned[1]).not.toBe(luke);
  });

  it('should calculate the next character identity', () => {
    expect(getNextCharacterId([luke, leia])).toBe(21);
    expect(getNextCharacterId([])).toBe(1);
  });

  it('should derive force sensitivity labels without mutating the input', () => {
    const characters = [leia, luke];
    const derived = deriveForceSensitiveDisplay(characters);

    expect(derived).toEqual([
      { ...leia, forceSensitiveDisplay: 'No' },
      { ...luke, forceSensitiveDisplay: 'Yes' }
    ]);
    expect(derived).not.toBe(characters);
    expect(derived[0]).not.toBe(leia);
    expect(characters).toEqual([leia, luke]);
  });

  it('should derive full names without mutating the input', () => {
    const characters = [leia, luke];
    const derived = deriveFullName(characters);

    expect(derived).toEqual([
      { ...leia, fullName: 'Leia Organa' },
      { ...luke, fullName: 'Luke Skywalker' }
    ]);
    expect(derived).not.toBe(characters);
    expect(derived[1]).not.toBe(luke);
    expect(characters).toEqual([leia, luke]);
  });

  it('should create a reducer that sorts a cloned collection by last name', () => {
    const characters = [luke, leia];
    const sorted = withCharactersSortedByLastName()(characters);

    expect(sorted).toEqual([leia, luke]);
    expect(sorted).not.toBe(characters);
    expect(characters).toEqual([luke, leia]);
  });

  it('should cycle Changed State characters and return detached values', () => {
    const first = getDistinctChangedStateCharacter(0);
    const fourth = getDistinctChangedStateCharacter(3);
    const wrapped = getDistinctChangedStateCharacter(4);
    const negative = getDistinctChangedStateCharacter(-1);

    expect(first.character).toEqual(
      jasmine.objectContaining({ id: 601, lastName: 'Jinn' })
    );
    expect(first.nextIndex).toBe(1);
    expect(fourth.character).toEqual(
      jasmine.objectContaining({ id: 604, lastName: 'Fisto' })
    );
    expect(fourth.nextIndex).toBe(0);
    expect(wrapped.character).toEqual(first.character);
    expect(wrapped.character).not.toBe(first.character);
    expect(wrapped.nextIndex).toBe(1);
    expect(negative.character.id).toBe(604);
  });
});
`,
    'src/example.character-domain.ts': `import type { ReducerFunction } from '@sdux-vault/shared';
import type {
  RawStarWarsCharacter,
  StarWarsCharacter,
  StarWarsCharacterDisplayFields
} from './star-wars-character.shape';

/** Editable character fields accepted before application code assigns an ID. */
export type StarWarsCharacterDraft = Omit<RawStarWarsCharacter, 'id'>;

/** Characters cycled by the Changed State teaching action. */
const DISTINCT_CHANGED_STATE_CHARACTERS: readonly RawStarWarsCharacter[] = [
  {
    id: 601,
    name: 'Qui-Gon',
    lastName: 'Jinn',
    faction: 'Jedi Order',
    isForceSensitive: true
  },
  {
    id: 602,
    name: 'Plo',
    lastName: 'Koon',
    faction: 'Jedi Order',
    isForceSensitive: true
  },
  {
    id: 603,
    name: 'Aayla',
    lastName: 'Secura',
    faction: 'Jedi Order',
    isForceSensitive: true
  },
  {
    id: 604,
    name: 'Kit',
    lastName: 'Fisto',
    faction: 'Jedi Order',
    isForceSensitive: true
  }
];

/** Creates a character without mutating the supplied draft. */
export function createCharacterState(
  id: number,
  draft: StarWarsCharacterDraft
): RawStarWarsCharacter {
  return { id, ...draft };
}

/** Produces a detached collection and detached character objects. */
export function cloneCharacters(
  characters: StarWarsCharacter[]
): StarWarsCharacter[] {
  return characters.map((character) => ({ ...character }));
}

/** Returns the current Changed State character and the wrapped next index. */
export function getDistinctChangedStateCharacter(index: number): {
  readonly character: StarWarsCharacter;
  readonly nextIndex: number;
} {
  const normalizedIndex =
    ((index % DISTINCT_CHANGED_STATE_CHARACTERS.length) +
      DISTINCT_CHANGED_STATE_CHARACTERS.length) %
    DISTINCT_CHANGED_STATE_CHARACTERS.length;

  return {
    character: { ...DISTINCT_CHANGED_STATE_CHARACTERS[normalizedIndex]! },
    nextIndex: (normalizedIndex + 1) % DISTINCT_CHANGED_STATE_CHARACTERS.length
  };
}

/** Returns the first integer ID greater than every identity in the collection. */
export function getNextCharacterId(characters: StarWarsCharacter[]): number {
  return Math.max(...characters.map(({ id }) => id), 0) + 1;
}

/** Derives display-friendly force sensitivity labels without mutating the input. */
export function deriveForceSensitiveDisplay(
  characters: StarWarsCharacter[]
): StarWarsCharacter[] {
  return characters.map((character) => ({
    ...character,
    forceSensitiveDisplay: character.isForceSensitive ? 'Yes' : 'No'
  })) satisfies (RawStarWarsCharacter &
    Pick<StarWarsCharacterDisplayFields, 'forceSensitiveDisplay'>)[];
}

/** Derives a display-ready full name for each character without mutating the input. */
export function deriveFullName(
  characters: StarWarsCharacter[]
): StarWarsCharacter[] {
  return characters.map((character) => ({
    ...character,
    fullName: \`\${character.name} \${character.lastName}\`
  })) satisfies (RawStarWarsCharacter &
    Pick<StarWarsCharacterDisplayFields, 'fullName'>)[];
}

/** Creates a pure reducer that orders a cloned collection by last name. */
export function withCharactersSortedByLastName(): ReducerFunction<
  StarWarsCharacter[]
> {
  return (characters) =>
    [...characters].sort((left, right) =>
      left.lastName.localeCompare(right.lastName)
    );
}
`,
    'src/example.character-editor.spec.ts': `import type { StateSnapshotShape, VaultErrorShape } from '@sdux-vault/shared';
import { ExampleCharacterEditor } from './example.character-editor';
import { StarWarsCharacter } from './star-wars-character.shape';

describe('Character editor', () => {
  const editor = new ExampleCharacterEditor();

  const leia: StarWarsCharacter = {
    id: 10,
    name: 'Leia',
    lastName: 'Organa',
    faction: 'Rebel Alliance',
    isForceSensitive: false
  };
  const luke: StarWarsCharacter = {
    id: 20,
    name: 'Luke',
    lastName: 'Skywalker',
    faction: 'Jedi Order',
    isForceSensitive: true
  };

  const error: VaultErrorShape = {
    message: 'Boom',
    featureCellKey: 'star-wars-character',
    timestamp: 0,
    raw: null
  };

  describe('constants', () => {
    it('should expose the fixed faction choices', () => {
      expect(editor.factions).toEqual([
        'Galactic Empire',
        'Jedi Order',
        'Rebel Alliance',
        'Sith Order',
        'Unaffiliated'
      ]);
    });

    it('should expose the filter, reducer, and comparison teaching sources', () => {
      expect(editor.filterSource).toContain('removeUnknownLastNameFilter');
      expect(editor.reducer1Source).toContain('#deriveForceSensitiveDisplay');
      expect(editor.reducer2Source).toContain('withCharactersSortedByLastName');
      expect(editor.reducer3Source).toContain('deriveFullName');
      expect(editor.comparisonFunctionSource).toContain(
        'withDistinctUntilChanged'
      );
    });

    it('should expose constant feedback messages', () => {
      expect(editor.feedback['invalidForm']).toEqual({
        message: 'Correct the highlighted fields before saving.',
        tone: 'error'
      });
      expect(editor.feedback['selectBeforeSave']).toEqual({
        message: 'Select a character before saving changes.',
        tone: 'error'
      });
      expect(editor.feedback['newCharacterDiscarded']).toEqual({
        message: 'The new character was discarded.',
        tone: 'info'
      });
      expect(editor.feedback['unsavedChangesDiscarded']).toEqual({
        message: 'Unsaved changes were discarded.',
        tone: 'info'
      });
      expect(editor.feedback['initialCollectionRestored']).toEqual({
        message: 'The initial character collection was restored.',
        tone: 'success'
      });
    });
  });

  describe('feedback builders', () => {
    it('should build the created feedback message', () => {
      expect(editor.characterAddedFeedback('Han Solo')).toEqual({
        message: 'Han Solo was added and selected.',
        tone: 'success'
      });
    });

    it('should build the updated feedback message', () => {
      expect(editor.characterUpdatedFeedback('Leia Organa')).toEqual({
        message: 'Leia Organa was updated.',
        tone: 'success'
      });
    });

    it('should build the removed feedback message', () => {
      expect(editor.characterRemovedFeedback('Luke Skywalker')).toEqual({
        message: 'Luke Skywalker was removed.',
        tone: 'success'
      });
    });
  });

  describe('ExampleCharacterEditor.validateTrimmedText', () => {
    it('should require a non-empty trimmed value', () => {
      expect(editor.validateTrimmedText('   ', 2, 40)).toEqual({
        required: true
      });
      expect(editor.validateTrimmedText(null, 2, 40)).toEqual({
        required: true
      });
      expect(editor.validateTrimmedText(undefined, 2, 40)).toEqual({
        required: true
      });
    });

    it('should enforce the minimum trimmed length', () => {
      expect(editor.validateTrimmedText(' a ', 2, 40)).toEqual({
        minlength: { actualLength: 1, requiredLength: 2 }
      });
    });

    it('should enforce the maximum trimmed length', () => {
      expect(editor.validateTrimmedText('abcd', 2, 3)).toEqual({
        maxlength: { actualLength: 4, requiredLength: 3 }
      });
    });

    it('should accept a value within the trimmed bounds', () => {
      expect(editor.validateTrimmedText('  Leia  ', 2, 40)).toBeNull();
    });
  });

  describe('ExampleCharacterEditor.normalizeCharacterDraft', () => {
    it('should trim the name fields and preserve the remaining values', () => {
      expect(
        editor.normalizeCharacterDraft({
          name: '  Han  ',
          lastName: '  Solo  ',
          faction: 'Rebel Alliance',
          isForceSensitive: false
        })
      ).toEqual({
        name: 'Han',
        lastName: 'Solo',
        faction: 'Rebel Alliance',
        isForceSensitive: false
      });
    });
  });

  describe('serializeStepwiseRequest', () => {
    it('should serialize a pending request with an existing current value', () => {
      expect(
        editor.serializeStepwiseRequest({
          current: [leia],
          candidate: [leia, luke]
        })
      ).toBe(
        JSON.stringify({ current: [leia], candidate: [leia, luke] }, null, 2)
      );
    });

    it('should substitute an absent current value', () => {
      expect(
        editor.serializeStepwiseRequest({
          current: undefined,
          candidate: [luke]
        })
      ).toBe(
        JSON.stringify({ current: 'undefined', candidate: [luke] }, null, 2)
      );
    });

    it('should render a missing request as undefined', () => {
      expect(editor.serializeStepwiseRequest(undefined)).toBe('undefined');
    });
  });

  describe('serializeTapInput', () => {
    it('should serialize a present value', () => {
      expect(editor.serializeTapInput([leia])).toBe(
        JSON.stringify([leia], null, 2)
      );
    });

    it('should render an absent value as undefined', () => {
      expect(editor.serializeTapInput(undefined)).toBe('undefined');
    });
  });

  describe('serializeSnapshot', () => {
    it('should serialize a snapshot with a present value', () => {
      const snapshot: StateSnapshotShape<readonly StarWarsCharacter[]> = {
        isLoading: false,
        value: [leia],
        error: null,
        hasValue: true
      };

      expect(editor.serializeSnapshot(snapshot)).toBe(
        JSON.stringify(snapshot, null, 2)
      );
    });

    it('should substitute an absent snapshot value', () => {
      const snapshot: StateSnapshotShape<readonly StarWarsCharacter[]> = {
        isLoading: false,
        value: undefined,
        error: null,
        hasValue: false
      };

      expect(editor.serializeSnapshot(snapshot)).toBe(
        JSON.stringify(
          {
            isLoading: false,
            value: 'undefined',
            error: null,
            hasValue: false
          },
          null,
          2
        )
      );
    });

    it('should render a missing snapshot as undefined', () => {
      expect(editor.serializeSnapshot(undefined)).toBe('undefined');
    });
  });

  describe('serializeErrorEmission', () => {
    it('should serialize an emission with a present state value', () => {
      const state: StateSnapshotShape<readonly StarWarsCharacter[]> = {
        isLoading: false,
        value: [leia],
        error,
        hasValue: true
      };

      expect(editor.serializeErrorEmission({ error, state })).toBe(
        JSON.stringify({ error, state }, null, 2)
      );
    });

    it('should substitute an absent state value', () => {
      const state: StateSnapshotShape<readonly StarWarsCharacter[]> = {
        isLoading: false,
        value: undefined,
        error,
        hasValue: false
      };

      expect(editor.serializeErrorEmission({ error, state })).toBe(
        JSON.stringify(
          {
            error,
            state: {
              isLoading: false,
              value: 'undefined',
              error,
              hasValue: false
            }
          },
          null,
          2
        )
      );
    });

    it('should render a missing emission as undefined', () => {
      expect(editor.serializeErrorEmission(undefined)).toBe('undefined');
    });
  });

  describe('serializeRawState', () => {
    it('should serialize present raw state fields', () => {
      expect(
        editor.serializeRawState({
          isLoading: true,
          value: [leia],
          error: null,
          hasValue: true
        })
      ).toBe(
        JSON.stringify(
          { isLoading: true, value: [leia], error: null, hasValue: true },
          null,
          2
        )
      );
    });

    it('should substitute an absent raw state value', () => {
      expect(
        editor.serializeRawState({
          isLoading: false,
          value: undefined,
          error,
          hasValue: false
        })
      ).toBe(
        JSON.stringify(
          { isLoading: false, value: 'undefined', error, hasValue: false },
          null,
          2
        )
      );
    });
  });
});
`,
    'src/example.character-editor.ts': `import type { StateSnapshotShape, VaultErrorShape } from '@sdux-vault/shared';
import type { StarWarsCharacterDraft } from './example.character-domain';
import type { StarWarsCharacter } from './star-wars-character.shape';

/**
 * Framework-agnostic presentation logic shared by the Angular, React, Vue, and Svelte
 * ports of the Complete Character Management example. Nothing in this module imports a
 * framework or holds reactive state: every export is a plain type, constant, or pure
 * function so each view can own its own reactivity and form APIs while reusing identical
 * validation, normalization, serialization, and feedback wording.
 */

/**
 * Identifies whether the editor is creating a new character or updating an existing one.
 * The mode controls labels, selection behavior, and which service operation runs on save.
 */
export type EditorMode = 'create' | 'edit';

/**
 * Limits operation messages to the visual states supported by every view.
 * Each tone also determines the status class and accessibility role rendered to the user.
 */
export type FeedbackTone = 'error' | 'info' | 'success';

/**
 * Carries user-facing feedback after a form or collection operation.
 * A view combines the message and tone to present an accessible status update.
 */
export interface OperationFeedback {
  /** Text that explains the result of the latest user operation. */
  readonly message: string;

  /** Visual and accessibility category applied to the feedback message. */
  readonly tone: FeedbackTone;
}

/** Editable text-length validation outcome, or \`null\` when the value is valid. */
export type TrimmedTextError = Record<string, unknown> | null;

/** Raw values a view reads from the character form before normalization. */
export interface CharacterFormValue {
  /** Character first name as typed, before trimming. */
  readonly name: string;

  /** Character last name as typed, before trimming. */
  readonly lastName: string;

  /** Selected faction; already constrained to a valid option by the control. */
  readonly faction: string;

  /** Whether the character is marked Force sensitive. */
  readonly isForceSensitive: boolean;
}

/** Individual state fields a view reads to serialize the raw StateSnapshot output. */
export interface RawStateFields {
  /** Whether the FeatureCell is currently loading. */
  readonly isLoading: boolean;

  /** Current committed collection, or \`undefined\` when no value is present. */
  readonly value: readonly StarWarsCharacter[] | undefined;

  /** Current normalized error, or \`null\` when the pipeline is healthy. */
  readonly error: VaultErrorShape | null;

  /** Whether the FeatureCell currently holds a value. */
  readonly hasValue: boolean;
}

/** Shape of a Stepwise request exposed to the teaching output for serialization. */
export interface StepwiseRequestView<T> {
  /** Last value committed before the pending attempt, or \`undefined\`. */
  readonly current: T | undefined;

  /** Candidate awaiting an explicit continue or block decision. */
  readonly candidate: T;
}

/** Shape of the finalized error emission exposed to the teaching output. */
export interface ErrorEmissionView<T> {
  /** Finalized Vault error produced by the Error stage. */
  readonly error: VaultErrorShape;

  /** Immutable FeatureCell snapshot associated with the finalized error. */
  readonly state: StateSnapshotShape<T>;
}

export class ExampleCharacterEditor {
  /** Fixed faction choices rendered by both the create and edit flows. */
  readonly factions = [
    'Galactic Empire',
    'Jedi Order',
    'Rebel Alliance',
    'Sith Order',
    'Unaffiliated'
  ] as const;

  /**
   * Builds the success feedback shown after a character is created and selected.
   * @param name - Display name of the newly created character.
   * @returns The success feedback describing the completed create.
   */
  characterAddedFeedback(name: string): OperationFeedback {
    return {
      message: \`\${name} was added and selected.\`,
      tone: 'success'
    };
  }

  /** Executable pure filter source displayed by the Filter teaching output. */
  readonly filterSource = \`export const removeUnknownLastNameFilter: FilterFunction<readonly StarWarsCharacter[]> =
  (characters) => characters.filter(({ lastName }) => lastName !== 'unknown');"
 \`;

  /** Executable delegating-reducer source displayed by the Reducer 1 teaching output. */
  readonly reducer1Source = \`#deriveForceSensitiveDisplay(characters: readonly StarWarsCharacter[]): readonly StarWarsCharacter[] {
  return characters.map((character) => ({
    ...character,
    forceSensitiveDisplay: character.isForceSensitive ? 'Yes' : 'No'
  }));
  }); 
}\`;

  /** Executable factory-generated reducer source displayed by the Reducer 2 teaching output. */
  readonly reducer2Source = \`export function withCharactersSortedByLastName(): ReducerFunction<readonly StarWarsCharacter[]> {
  return (characters) =>
    [...characters].sort((left, right) =>
      left.lastName.localeCompare(right.lastName)
    );
}\`;

  /** Executable full-name reducer source displayed by the Reducer 3 teaching output. */
  readonly reducer3Source = \`export function deriveFullName(
  characters: readonly StarWarsCharacter[]
): readonly StarWarsCharacter[] {
  return characters.map((character) => ({
    ...character,
    fullName: \\\`\${'\${character.name} \${character.lastName}'}\\\`
  }));
}\`;

  /** Custom comparison source passed to Distinct Until Changed for the teaching output. */
  readonly comparisonFunctionSource = \`withDistinctUntilChanged<readonly StarWarsCharacter[]>(
  (incoming, previous) =>
    incoming.every(({ id }) =>
      previous.some((character) => character.id === id)
    )
)\`;

  /** Constant feedback messages that do not depend on a specific character. */
  readonly feedback = {
    /** Reported when the form fails validation on save. */
    invalidForm: {
      message: 'Correct the highlighted fields before saving.',
      tone: 'error'
    },

    /** Reported when an edit save runs without a selected character. */
    selectBeforeSave: {
      message: 'Select a character before saving changes.',
      tone: 'error'
    },

    /** Reported when a pending create is discarded by canceling. */
    newCharacterDiscarded: {
      message: 'The new character was discarded.',
      tone: 'info'
    },

    /** Reported when unsaved edits are discarded by canceling. */
    unsavedChangesDiscarded: {
      message: 'Unsaved changes were discarded.',
      tone: 'info'
    },

    /** Reported when the captured baseline collection is restored. */
    initialCollectionRestored: {
      message: 'The initial character collection was restored.',
      tone: 'success'
    }
  } as const satisfies Record<string, OperationFeedback>;
  /**
   * Builds the success feedback shown after an existing character is updated.
   * @param name - Display name of the updated character.
   * @returns The success feedback describing the completed update.
   */
  characterUpdatedFeedback(name: string): OperationFeedback {
    return {
      message: \`\${name} was updated.\`,
      tone: 'success'
    };
  }

  /**
   * Builds the success feedback shown after a character is removed.
   * @param name - Display name of the removed character.
   * @returns The success feedback describing the completed removal.
   */
  characterRemovedFeedback(name: string): OperationFeedback {
    return {
      message: \`\${name} was removed.\`,
      tone: 'success'
    };
  }

  /**
   * Trims text before enforcing required, minimum, and maximum lengths.
   * The return value mirrors framework validation error maps so a view can surface it directly.
   * @param value - Raw control value to validate.
   * @param minimum - Smallest accepted number of non-whitespace characters.
   * @param maximum - Largest accepted number of non-whitespace characters.
   * @returns The matching validation error map, or \`null\` when the value is valid.
   */
  validateTrimmedText(
    value: unknown,
    minimum: number,
    maximum: number
  ): TrimmedTextError {
    const trimmed = String(value ?? '').trim();

    if (!trimmed) {
      return { required: true };
    }

    if (trimmed.length < minimum) {
      return {
        minlength: { actualLength: trimmed.length, requiredLength: minimum }
      };
    }

    if (trimmed.length > maximum) {
      return {
        maxlength: { actualLength: trimmed.length, requiredLength: maximum }
      };
    }

    return null;
  }

  /**
   * Normalizes raw form values into a character draft with trimmed name fields.
   * @param formValue - Raw values collected from the character form.
   * @returns A draft ready to submit to the FeatureCell service.
   */
  normalizeCharacterDraft(
    formValue: CharacterFormValue
  ): StarWarsCharacterDraft {
    return {
      name: formValue.name.trim(),
      lastName: formValue.lastName.trim(),
      faction: formValue.faction,
      isForceSensitive: formValue.isForceSensitive
    };
  }

  /**
   * Serializes a Stepwise request for a teaching output, substituting an absent current value.
   * @param request - Stepwise request to serialize, or \`undefined\` when none is pending.
   * @returns Indented JSON, or the literal \`'undefined'\` when no request is pending.
   */
  serializeStepwiseRequest<T>(
    request: StepwiseRequestView<T> | undefined
  ): string {
    if (!request) {
      return 'undefined';
    }

    return JSON.stringify(
      {
        ...request,
        current: request.current ?? 'undefined'
      },
      null,
      2
    );
  }

  /**
   * Serializes an immutable tap input for a teaching output.
   * @param value - Tap input value observed by a Before or After Tap callback.
   * @returns Indented JSON, or the literal \`'undefined'\` when the value is absent.
   */
  serializeTapInput<T>(value: T): string {
    return JSON.stringify(value, null, 2) ?? 'undefined';
  }

  /**
   * Serializes a StateSnapshot for a teaching output, substituting an absent value.
   * @param snapshot - Finalized snapshot to serialize, or \`undefined\` when none exists.
   * @returns Indented JSON, or the literal \`'undefined'\` when no snapshot exists.
   */
  serializeSnapshot<T>(snapshot: StateSnapshotShape<T> | undefined): string {
    if (!snapshot) {
      return 'undefined';
    }

    return JSON.stringify(
      {
        ...snapshot,
        value: snapshot.value === undefined ? 'undefined' : snapshot.value
      },
      null,
      2
    );
  }

  /**
   * Serializes a finalized error emission for a teaching output.
   * @param emission - Error and snapshot pair, or \`undefined\` when none exists.
   * @returns Indented JSON, or the literal \`'undefined'\` when no emission exists.
   */
  serializeErrorEmission<T>(
    emission: ErrorEmissionView<T> | undefined
  ): string {
    if (!emission) {
      return 'undefined';
    }

    return JSON.stringify(
      {
        error: emission.error,
        state: {
          ...emission.state,
          value:
            emission.state.value === undefined
              ? 'undefined'
              : emission.state.value
        }
      },
      null,
      2
    );
  }

  /**
   * Serializes the complete raw StateSnapshot fields for the Raw StateSnapshot teaching output.
   * @param fields - Individual state fields a view reads from its reactive state.
   * @returns Indented JSON with an absent value substituted by the literal \`'undefined'\`.
   */
  serializeRawState(fields: RawStateFields): string {
    return JSON.stringify(
      {
        isLoading: fields.isLoading,
        value: fields.value === undefined ? 'undefined' : fields.value,
        error: fields.error,
        hasValue: fields.hasValue
      },
      null,
      2
    );
  }
}
`,
    'src/example.component.html': `<section class="character-example" aria-labelledby="character-example-title">
  <header class="header">
    <div>
      <p class="eyebrow">Interactive example</p>
      <h2 id="character-example-title">Star Wars character registry</h2>
      <p>
        Use SDuX Vault state management to select, create, update, and remove
        characters from an in-memory collection.
      </p>
    </div>
  </header>

  @if (feedback(); as operationFeedback) {
    <div
      class="feedback"
      [class.error]="operationFeedback.tone === 'error'"
      [class.success]="operationFeedback.tone === 'success'"
      [attr.role]="operationFeedback.tone === 'error' ? 'alert' : 'status'"
      aria-live="polite">
      {{ operationFeedback.message }}
    </div>
  }

  @if (!hydrationSettled()) {
    <div class="feedback caution" role="status" aria-live="polite">
      The initial state hydrate method is awaiting resolve or reject in the
      <strong>Actions</strong> section
    </div>
  }

  <fieldset class="feature-cell-controls">
    @if (deleteCandidate(); as character) {
      <section
        class="delete-confirmation"
        aria-labelledby="delete-confirmation-title"
        role="alert">
        <div>
          <h3 id="delete-confirmation-title">
            Remove
            {{
              character.fullName ?? character.name + ' ' + character.lastName
            }}?
          </h3>
          <p>This action removes the character from the current collection.</p>
        </div>
        <div class="actions">
          <button
            type="button"
            class="button secondary"
            (click)="cancelDelete()">
            Cancel
          </button>
          <button type="button" class="button danger" (click)="confirmDelete()">
            Ok
          </button>
        </div>
      </section>
    }

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
                {{ character.fullName }}
              </option>
            }
          </select>
        </div>

        <div class="actions add-action" aria-label="Character actions">
          <button type="button" class="button" (click)="startCreate()">
            Add character
          </button>
        </div>
      </div>

      <div class="workspace-row workspace-row-bottom">
        <section
          class="panel character-details"
          aria-labelledby="details-title">
          @if (state.isLoading()) {
            <div
              class="loading-overlay"
              role="status"
              aria-label="Loading characters">
              <span class="spinner" aria-hidden="true"></span>
              <p class="loading-guidance">
                <strong>State is loading.</strong>
                Complete the pending State change request by selecting Resolve
                or Reject in the Actions section.
              </p>
            </div>
          } @else {
            <div class="header">
              <h3 id="details-title">Character details</h3>
            </div>

            @if (selectedCharacter(); as character) {
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
                @if (characters().length === 0) {
                  <h4>The collection is empty</h4>
                  <p>Add a character to continue the example.</p>
                  <button type="button" class="button" (click)="startCreate()">
                    Add the first character
                  </button>
                } @else {
                  <h4>No character selected</h4>
                  <p>
                    Choose a character from the list or complete the form to add
                    a new one.
                  </p>
                }
              </div>
            }
          }
        </section>

        <section class="panel editor" aria-labelledby="editor-title">
          <div class="header">
            <h3 id="editor-title">{{ editorTitle() }}</h3>
          </div>

          <form
            [formGroup]="characterForm"
            (ngSubmit)="saveCharacter()"
            novalidate>
            <div class="form-grid">
              @let nameControl = characterForm.controls.name;
              @let showNameError =
                nameControl.invalid &&
                (nameControl.dirty || nameControl.touched);

              <div class="field">
                <label for="character-first-name">First name</label>
                <input
                  id="character-first-name"
                  type="text"
                  formControlName="name"
                  autocomplete="off"
                  maxlength="40"
                  [attr.aria-invalid]="showNameError ? true : null"
                  [attr.aria-describedby]="
                    showNameError ? 'character-first-name-error' : null
                  " />
                @if (showNameError) {
                  <p class="error" id="character-first-name-error">
                    Enter a first name between 2 and 40 characters.
                  </p>
                }
              </div>

              @let lastNameControl = characterForm.controls.lastName;
              @let showLastNameError =
                lastNameControl.invalid &&
                (lastNameControl.dirty || lastNameControl.touched);

              <div class="field">
                <label for="character-last-name">Last name</label>
                <input
                  id="character-last-name"
                  type="text"
                  formControlName="lastName"
                  autocomplete="off"
                  maxlength="40"
                  [attr.aria-invalid]="showLastNameError ? true : null"
                  [attr.aria-describedby]="
                    showLastNameError ? 'character-last-name-error' : null
                  " />
                @if (showLastNameError) {
                  <p class="error" id="character-last-name-error">
                    Enter a last name between 2 and 40 characters.
                  </p>
                }
              </div>

              @let factionControl = characterForm.controls.faction;
              @let showFactionError =
                factionControl.invalid &&
                (factionControl.dirty || factionControl.touched);

              <div class="field">
                <label for="character-faction">Faction</label>
                <select
                  id="character-faction"
                  formControlName="faction"
                  [attr.aria-invalid]="showFactionError ? true : null"
                  [attr.aria-describedby]="
                    showFactionError ? 'character-faction-error' : null
                  ">
                  <option value="" disabled>Select a faction</option>
                  @for (faction of editor.factions; track faction) {
                    <option [value]="faction">{{ faction }}</option>
                  }
                </select>
                @if (showFactionError) {
                  <p class="error" id="character-faction-error">
                    Select a faction.
                  </p>
                }
              </div>

              <label class="checkbox">
                <input type="checkbox" formControlName="isForceSensitive" />
                <span>Character is force-sensitive</span>
              </label>
            </div>

            <div class="actions">
              @if (editorMode() === 'edit') {
                <button
                  type="button"
                  class="button danger delete"
                  [disabled]="!selectedCharacter()"
                  (click)="requestDelete()">
                  Delete Character
                </button>
              }
              <button
                type="submit"
                class="button"
                [disabled]="characterForm.invalid">
                {{ submitLabel() }}
              </button>
              <button
                type="button"
                class="button secondary"
                (click)="cancelEdit()">
                Cancel
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>

    <div class="lifecycle-actions">
      <input
        id="lifecycle-section-toggle"
        class="section-toggle"
        type="checkbox"
        aria-label="Toggle Lifecycle visibility"
        checked />
      <div class="section-header">
        <span>Lifecycle</span>
        <label
          class="section-chevron"
          for="lifecycle-section-toggle"
          title="Show or hide Lifecycle"></label>
      </div>

      <div class="operator-actions">
        <div class="action-row lifecycle-action-row">
          <input
            id="reset-description"
            class="description-toggle"
            type="checkbox"
            aria-label="Show Reset State description" />
          <div class="button-container">
            <button type="button" class="button danger" (click)="resetState()">
              Reset State
            </button>
            <label
              class="description-chevron"
              for="reset-description"
              title="Show or hide Reset State description"></label>
          </div>
          <div class="description-container">
            Calls the FeatureCell's dedicated <code>reset()</code> API to
            explicitly clear the current state value to
            <code>undefined</code> without submitting replacement state.
          </div>
        </div>
      </div>
    </div>

    <div class="pipeline-actions">
      <input
        id="actions-section-toggle"
        class="section-toggle"
        type="checkbox"
        aria-label="Toggle Actions visibility"
        checked />
      <div class="section-header">
        <span>Actions</span>
        <label
          class="section-chevron"
          for="actions-section-toggle"
          title="Show or hide Actions"></label>
      </div>

      <div class="pipeline-content">
        <div class="action-groups">
          <div class="action-group">
            <div class="action-row">
              <input
                id="hydrate-description"
                class="description-toggle"
                type="checkbox"
                aria-label="Show Hydration description" />
              <div class="button-container hydrate-controls">
                <button
                  type="button"
                  class="button hydrate-terminal"
                  [disabled]="hydrationSettled()"
                  (click)="resolveHydration()">
                  Resolve
                </button>
                <button
                  type="button"
                  class="button danger hydrate-terminal"
                  [disabled]="hydrationSettled()"
                  (click)="rejectHydration()">
                  Reject
                </button>
                <label
                  class="description-chevron"
                  for="hydrate-description"
                  title="Show or hide Hydration description"></label>
              </div>
              <div class="description-container">
                The service registers a deferred hydration factory before
                initialize() makes it the authoritative initial State source.
                Resolve sends five characters through the full Replace pipeline,
                including the configured Filter, Taps, and Reducers. Reject
                emits an initialization Error and leaves the FeatureCell without
                a value; configured initial State is not used as a fallback.
                Hydration runs once during initialization and does not run again
                when State is reset.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="stepwise-output">
      <input
        id="stepwise-section-toggle"
        class="section-toggle"
        type="checkbox"
        aria-label="Toggle Stepwise Requests visibility"
        checked />
      <div class="section-header">
        <span>Stepwise Requests</span>
        <label
          class="section-chevron"
          for="stepwise-section-toggle"
          title="Show or hide Stepwise Requests"></label>
      </div>

      <div class="stepwise-content">
        <div class="stepwise-column">
          <div class="stepwise-header">
            <h3>Stepwise Resolve</h3>
          </div>
          <textarea
            readonly
            rows="8"
            aria-label="Stepwise Resolve output"
            [value]="stepwiseResolveRequestJson()"></textarea>
        </div>

        <div class="stepwise-column">
          <div class="stepwise-header">
            <h3>Stepwise Filter</h3>
          </div>
          <textarea
            readonly
            rows="8"
            aria-label="Stepwise Filter output"
            [value]="stepwiseFilterRequestJson()"></textarea>
        </div>

        <div class="stepwise-column">
          <div class="stepwise-header">
            <h3>Stepwise Reducer</h3>
          </div>
          <textarea
            readonly
            rows="8"
            aria-label="Stepwise Reducer output"
            [value]="stepwiseReducerRequestJson()"></textarea>
        </div>
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
\$example-min-width: calc(\$action-column-width + (\$spacing-lg * 2));

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
  min-width: \$example-min-width;
}

.character-example {
  display: flex;
  flex-direction: column;
  gap: \$spacing-lg;
  width: 100%;
  min-width: \$example-min-width;
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
        min-height: 200px;

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
      grid-auto-flow: column;
      grid-auto-columns: minmax(0, 1fr);
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
      grid-auto-flow: column;
      grid-auto-columns: minmax(0, 1fr);
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
import {
  withArrayAppendMergeBehavior,
  withStepwiseController,
  withStepwiseFilterBehavior,
  withStepwiseReducerBehavior,
  withStepwiseResolveBehavior
} from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { ExampleComponent } from './example.component';
import { exampleHydrate } from './example.hydrate';
import { ExampleService } from './example.service';
import type { StarWarsCharacter } from './star-wars-character.shape';

describe('ExampleComponent', () => {
  const key = 'star-wars-character';
  const initialCharacters: StarWarsCharacter[] = [
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
  let service: ExampleService;

  const settlePipeline = async (): Promise<void> => {
    let settled = false;
    const settledPromise = vaultSettled(key).then(() => {
      settled = true;
    });

    while (!settled) {
      await Promise.race([
        settledPromise,
        new Promise<void>((resolve) => setTimeout(resolve))
      ]);

      if (service.isStepwiseResolvePending()) {
        component['acceptStepwiseResolve']();
        continue;
      }

      if (service.isStepwiseFilterPending()) {
        component['acceptStepwiseFilter']();
        continue;
      }

      if (service.isStepwiseReducerPending()) {
        component['acceptStepwiseReducer']();
      }
    }

    await settledPromise;
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleComponent],
      providers: [
        provideVaultTesting(),
        provideZonelessChangeDetection(),
        provideFeatureCell(
          ExampleService,
          { key, initialState: initialCharacters },
          [
            withArrayAppendMergeBehavior,
            withStepwiseResolveBehavior,
            withStepwiseFilterBehavior,
            withStepwiseReducerBehavior
          ],
          [withStepwiseController]
        )
      ]
    }).compileComponents();

    spyOn(exampleHydrate, 'getPromise').and.returnValue(
      Promise.resolve(initialCharacters)
    );
    spyOn(window, 'confirm').and.returnValue(true);

    fixture = TestBed.createComponent(ExampleComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ExampleService);
    fixture.detectChanges();
    await settlePipeline();
    fixture.detectChanges();
  });

  afterEach(() => TestBed.resetTestingModule());

  it('should select a known character and patch the editor', () => {
    component['selectCharacter']('2');

    expect(component['selectedCharacter']()?.id).toBe(2);
    expect(component['characterForm'].getRawValue()).toEqual({
      name: 'Leia',
      lastName: 'Organa',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    });
  });

  it('should ignore an unknown character selection', () => {
    component['selectCharacter']('999');

    expect(component['selectedCharacter']()?.id).toBe(2);
  });

  it('should enter create mode and restore it when canceled', () => {
    component['startCreate']();
    expect(component['editorMode']()).toBe('create');

    component['cancelEdit']();

    expect(component['editorMode']()).toBe('edit');
    expect(component['selectedCharacterId']()).toBe(2);
  });

  it('should show invalid feedback for an invalid form', () => {
    component['startCreate']();

    component['saveCharacter']();

    expect(component['feedback']()).toEqual(
      component.editor.feedback['invalidForm']
    );
  });

  it('should delegate the three Stepwise decisions', () => {
    const resolveSpy = spyOn(service, 'acceptStepwiseResolve');
    const cancelResolveSpy = spyOn(service, 'cancelStepwiseResolve');
    const filterSpy = spyOn(service, 'cancelStepwiseFilter');
    const reducerSpy = spyOn(service, 'acceptStepwiseReducer');
    const cancelReducerSpy = spyOn(service, 'cancelStepwiseReducer');

    component['acceptStepwiseResolve']();
    component['cancelStepwiseResolve']();
    component['cancelStepwiseFilter']();
    component['acceptStepwiseReducer']();
    component['cancelStepwiseReducer']();

    expect(resolveSpy).toHaveBeenCalledTimes(1);
    expect(cancelResolveSpy).toHaveBeenCalledTimes(1);
    expect(filterSpy).toHaveBeenCalledTimes(1);
    expect(reducerSpy).toHaveBeenCalledTimes(1);
    expect(cancelReducerSpy).toHaveBeenCalledTimes(1);
  });

  it('should delegate Reset State to the service', () => {
    const resetSpy = spyOn(service, 'resetState');

    component['resetState']();

    expect(resetSpy).toHaveBeenCalledOnceWith();
    expect(component['characterForm'].pristine).toBeTrue();
  });

  it('should restore edits for an existing selection or fall back to create mode', () => {
    expect(component['editorTitle']()).toBe('Update character');
    expect(component['submitLabel']()).toBe('Save changes');
    component['selectCharacter']('2');
    component['characterForm'].setValue({
      name: 'Changed',
      lastName: 'Name',
      faction: 'Changed Faction',
      isForceSensitive: true
    });
    component['cancelEdit']();

    expect(component['feedback']()).toEqual(
      component.editor.feedback['unsavedChangesDiscarded']
    );

    component['selectedCharacterId'].set(null);
    component['cancelEdit']();
    expect(component['editorMode']()).toBe('create');
    expect(component['editorTitle']()).toBe('Add a character');
    expect(component['submitLabel']()).toBe('Add character');
  });

  it('should create and update characters from valid form values', () => {
    const createdCharacter: StarWarsCharacter = {
      id: 20,
      name: 'Han',
      lastName: 'Solo',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    };
    spyOn(service, 'createCharacter').and.returnValue(createdCharacter);

    component['startCreate']();
    component['characterForm'].setValue({
      name: '  Han  ',
      lastName: '  Solo  ',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    });
    component['saveCharacter']();

    expect(component['selectedCharacterId']()).toBe(20);
    expect(component['feedback']()?.message).toContain('Han Solo');

    const updatedCharacter = { ...createdCharacter, name: 'General Han' };
    spyOn(service, 'updateCharacter').and.returnValue(updatedCharacter);
    component['characterForm'].setValue({
      name: 'General Han',
      lastName: 'Solo',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    });
    component['saveCharacter']();

    expect(component['feedback']()?.message).toContain('General Han Solo');
  });

  it('should require a selection before saving an edit', () => {
    component['editorMode'].set('edit');
    component['selectedCharacterId'].set(null);
    component['characterForm'].setValue({
      name: 'Leia',
      lastName: 'Organa',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    });

    component['saveCharacter']();

    expect(component['feedback']()).toEqual(
      component.editor.feedback['selectBeforeSave']
    );
  });

  it('should manage delete confirmation and reset the editor after confirmation', () => {
    const removeSpy = spyOn(service, 'removeCharacter');
    component['selectCharacter']('2');
    component['requestDelete']();

    expect(component['deleteCandidate']()?.id).toBe(2);
    component['cancelDelete']();
    expect(component['deleteCandidate']()).toBeNull();

    component['requestDelete']();
    component['confirmDelete']();

    expect(removeSpy).toHaveBeenCalledWith(2);
    expect(component['editorMode']()).toBe('create');
    expect(component['deleteCandidate']()).toBeNull();
  });

  it('should ignore delete requests and confirmations without a candidate', () => {
    component['selectedCharacterId'].set(null);
    component['requestDelete']();
    component['confirmDelete']();

    expect(component['deleteCandidate']()).toBeNull();
  });

  it('should handle hydration callbacks when they are available or absent', () => {
    const resolve = jasmine.createSpy('resolve');
    spyOn(exampleHydrate, 'getResolve').and.returnValue(resolve);
    component['resolveHydration']();
    expect(resolve).toHaveBeenCalledTimes(1);
    expect(component['hydrationSettled']()).toBeTrue();

    const reject = jasmine.createSpy('reject');
    spyOn(exampleHydrate, 'getReject').and.returnValue(reject);
    component['rejectHydration']();
    expect(reject).toHaveBeenCalledTimes(1);

    (exampleHydrate.getResolve as jasmine.Spy).and.returnValue(null);
    (exampleHydrate.getReject as jasmine.Spy).and.returnValue(null);
    component['resolveHydration']();
    component['rejectHydration']();
  });

  it('should reset prompt guards and avoid duplicate prompts', () => {
    const confirmSpy = window.confirm as jasmine.Spy;
    confirmSpy.calls.reset();
    confirmSpy.and.returnValue(true);

    component['processStepwiseResolvePending'](true);
    component['processStepwiseResolvePending'](true);
    component['processStepwiseResolvePending'](false);
    component['processStepwiseFilterPending'](true);
    component['processStepwiseFilterPending'](true);
    component['processStepwiseFilterPending'](false);
    component['processStepwiseReducerPending'](true);
    component['processStepwiseReducerPending'](true);
    component['processStepwiseReducerPending'](false);

    expect(confirmSpy).toHaveBeenCalledTimes(3);
  });

  it('should follow the native prompt decision for each Stepwise stage', () => {
    const resolveSpy = spyOn(component as never, 'acceptStepwiseResolve');
    const filterSpy = spyOn(component as never, 'cancelStepwiseFilter');
    const reducerSpy = spyOn(component as never, 'acceptStepwiseReducer');
    (window.confirm as jasmine.Spy).and.returnValues(true, false, true);

    component['handleStepwiseResolvePrompt']();
    component['handleStepwiseFilterPrompt']();
    component['handleStepwiseReducerPrompt']();

    expect(resolveSpy).toHaveBeenCalledTimes(1);
    expect(filterSpy).toHaveBeenCalledTimes(1);
    expect(reducerSpy).toHaveBeenCalledTimes(1);
  });

  it('should block each Stepwise stage when the prompt is canceled', () => {
    const resolveSpy = spyOn(component as never, 'cancelStepwiseResolve');
    const filterSpy = spyOn(component as never, 'cancelStepwiseFilter');
    const reducerSpy = spyOn(component as never, 'cancelStepwiseReducer');
    (window.confirm as jasmine.Spy).and.returnValue(false);

    component['handleStepwiseResolvePrompt']();
    component['handleStepwiseFilterPrompt']();
    component['handleStepwiseReducerPrompt']();

    expect(resolveSpy).toHaveBeenCalledTimes(1);
    expect(filterSpy).toHaveBeenCalledTimes(1);
    expect(reducerSpy).toHaveBeenCalledTimes(1);
  });
});
`,
    'src/example.component.ts': `import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {
  EditorMode,
  ExampleCharacterEditor,
  OperationFeedback
} from './example.character-editor';
import { exampleHydrate } from './example.hydrate';
import { ExampleService } from './example.service';
import type { StarWarsCharacter } from './star-wars-character.shape';

/**
 * Coordinates the reactive character editor presented by this tutorial example.
 * It consumes the service's computed character collection and keeps selection, form,
 * confirmation, and feedback state in Angular signals.
 * Computed signals derive the selected character and mode-specific labels for the template.
 * User actions delegate collection changes to \`ExampleService\`, then reactive state refreshes the view.
 * **Architectural Boundary:** The component owns presentation state while the service owns
 * FeatureCell access and character collection mutations.
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
  // Reactive state: shared services and framework utilities.

  /** Exposes the character editor instance for template and internal use. */
  readonly editor = new ExampleCharacterEditor();

  /**
   * Provides the component-facing character use cases and reactive collection signal.
   * The component never reaches through this service to access the FeatureCell directly.
   */
  readonly #exampleService = inject(ExampleService);

  /** Creates the non-nullable reactive form used by the character editor. */
  readonly #formBuilder = inject(FormBuilder);

  // Lifecycle guards: one-time selection and one-prompt-per-request coordination.

  /** Prevents later collection emissions from replacing the user's current selection. */
  #hasInitializedSelection = false;

  /** Prevents duplicate native confirm prompts for the same pending Stepwise Resolve request. */
  #hasPromptedStepwiseResolve = false;

  /** Prevents duplicate native confirm prompts for the same pending Stepwise Filter request. */
  #hasPromptedStepwiseFilter = false;

  /** Prevents duplicate native confirm prompts for the same pending Stepwise Reducer request. */
  #hasPromptedStepwiseReducer = false;

  /** Remembers the selected identity so canceling create mode can restore the prior editor. */
  #selectedCharacterBeforeCreate: number | null = null;

  // Reactive state: direct service projections consumed by the template.

  /**
   * Projects the current FeatureCell value into a read-only Angular computed signal.
   * The empty-array fallback gives templates a stable collection before a value is available.
   */
  /** Teaching Point: ex-001 */
  readonly characters = computed<readonly StarWarsCharacter[]>(
    () => this.state.value() ?? []
  );

  /** Exposes the FeatureCell loading signal so the template can cover the current selection. */
  protected readonly state = this.#exampleService.state;

  /** Enables Stepwise controls only while the Resolve callback awaits a decision. */
  protected readonly isStepwiseResolvePending =
    this.#exampleService.isStepwiseResolvePending;

  /** Enables Filter controls only while its Stepwise callback awaits a decision. */
  protected readonly isStepwiseFilterPending =
    this.#exampleService.isStepwiseFilterPending;

  /** Enables Reducer controls only while its Stepwise callback awaits a decision. */
  protected readonly isStepwiseReducerPending =
    this.#exampleService.isStepwiseReducerPending;

  /** Serializes the current and candidate values supplied to the Stepwise Resolve callback. */
  protected readonly stepwiseResolveRequestJson = computed(() =>
    this.editor.serializeStepwiseRequest(
      this.#exampleService.stepwiseResolveRequest()
    )
  );

  /** Serializes the current and filtered candidate values from Stepwise Filter. */
  protected readonly stepwiseFilterRequestJson = computed(() =>
    this.editor.serializeStepwiseRequest(
      this.#exampleService.stepwiseFilterRequest()
    )
  );

  /** Serializes the current and fully reduced candidate from Stepwise Reducer. */
  protected readonly stepwiseReducerRequestJson = computed(() =>
    this.editor.serializeStepwiseRequest(
      this.#exampleService.stepwiseReducerRequest()
    )
  );

  /** Holds the identity currently selected by the character picker, or \`null\` when none is selected. */
  protected readonly selectedCharacterId = signal<number | null>(null);

  /** Tracks whether the editor should create a character or update the selected character. */
  protected readonly editorMode = signal<EditorMode>('edit');

  /** Exposes the latest operation result for the template's accessible feedback region. */
  protected readonly feedback = signal<OperationFeedback | null>(null);

  /** Prevents the one-time hydration source from being settled more than once. */
  protected readonly hydrationSettled = signal(false);

  /** Holds the character awaiting explicit confirmation before removal. */
  protected readonly deleteCandidate = signal<StarWarsCharacter | null>(null);

  /**
   * Resolves the selected identity against the latest reactive character collection.
   * Returning \`null\` keeps the template safe when the character was removed or never existed.
   */
  protected readonly selectedCharacter = computed(() => {
    const selectedId = this.selectedCharacterId();
    return this.characters().find(({ id }) => id === selectedId) ?? null;
  });

  /** Derives the editor heading from the current mode so the template stays declarative. */
  protected readonly editorTitle = computed(() =>
    this.editorMode() === 'create' ? 'Add a character' : 'Update character'
  );

  /** Derives the submit-button label from the operation that saving will perform. */
  protected readonly submitLabel = computed(() =>
    this.editorMode() === 'create' ? 'Add character' : 'Save changes'
  );

  /**
   * Defines the non-nullable form model and validation rules shared by create and edit flows.
   * Name fields validate trimmed lengths while faction selection remains required.
   */
  protected readonly characterForm = this.#formBuilder.nonNullable.group({
    name: ['', [this.#trimmedTextLength(2, 40)]],
    lastName: ['', [this.#trimmedTextLength(2, 40)]],
    faction: ['', Validators.required],
    isForceSensitive: [false]
  });

  /**
   * Watches the reactive collection and selects its first character when initial state arrives.
   * The one-time guard preserves later user selections and does not interrupt create mode.
   */
  constructor() {
    this.#observeInitialSelection();
    this.#observeStepwisePromptEffects();
  }

  /**
   * Selects and patches the first character when the reactive collection first
   * becomes available. The one-time guard preserves later user selections and
   * prevents asynchronous state emissions from interrupting create mode.
   * @returns Nothing; the effect updates local selection and form state.
   */
  #observeInitialSelection(): void {
    effect(() => {
      const characters = this.characters();

      if (
        !this.#hasInitializedSelection &&
        this.editorMode() === 'edit' &&
        this.selectedCharacterId() === null &&
        characters.length > 0
      ) {
        const firstCharacter = characters[0]!;

        this.#hasInitializedSelection = true;
        this.selectedCharacterId.set(firstCharacter.id);
        this.#patchForm(firstCharacter);
      }
    });
  }

  /**
   * Watches the three stepwise request signals and forwards each pending
   * request to its matching presentation method. This keeps Resolve, Filter,
   * and Reducer approval prompts in the component layer while the service and
   * pipeline retain ownership of FeatureCell State.
   * @returns Nothing; the effects coordinate the component's stepwise prompt state.
   */
  #observeStepwisePromptEffects(): void {
    effect(() => {
      this.processStepwiseResolvePending(this.isStepwiseResolvePending());
    });

    effect(() => {
      this.processStepwiseFilterPending(this.isStepwiseFilterPending());
    });

    effect(() => {
      this.processStepwiseReducerPending(this.isStepwiseReducerPending());
    });
  }

  /**
   * Creates a validator that trims text before enforcing required, minimum, and maximum lengths.
   * @param minimum - Smallest accepted number of non-whitespace characters.
   * @param maximum - Largest accepted number of non-whitespace characters.
   * @returns An Angular validator that reports the matching validation error or \`null\`.
   */
  #trimmedTextLength(minimum: number, maximum: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      this.editor.validateTrimmedText(control.value, minimum, maximum);
  }

  /**
   * Resolves a picker value to a known character and opens that character in edit mode.
   * Unknown identities are ignored so stale or invalid option values cannot disturb the editor.
   * @param value - Character identity received from the select element.
   * @returns Nothing; selection, form, and feedback signals are updated in place.
   */
  protected selectCharacter(value: string): void {
    const character =
      this.characters().find((character) => character.id === Number(value)) ??
      null;

    if (!character) {
      return;
    }

    this.selectedCharacterId.set(character.id);
    this.#selectedCharacterBeforeCreate = null;
    this.editorMode.set('edit');
    this.deleteCandidate.set(null);
    this.feedback.set(null);
    this.#patchForm(character);
  }

  /**
   * Enters create mode, remembers the prior selection, and resets the form to clean defaults.
   * Repeated calls preserve the original selection so cancel can still return to it.
   * @returns Nothing; the editor signals and form state are reset in place.
   */
  protected startCreate(): void {
    if (this.editorMode() !== 'create') {
      this.#selectedCharacterBeforeCreate = this.selectedCharacterId();
    }

    this.selectedCharacterId.set(null);
    this.editorMode.set('create');
    this.deleteCandidate.set(null);
    this.feedback.set(null);
    this.#clearCharacterForm();
  }

  /**
   * Discards current edits and restores the character selected before editing or creating began.
   * When no valid selection exists, it falls back to a clean create form.
   * @returns Nothing; editor mode, form values, and feedback are updated in place.
   */
  protected cancelEdit(): void {
    if (this.editorMode() === 'create') {
      const character = this.characters().find(
        ({ id }) => id === this.#selectedCharacterBeforeCreate
      );

      if (character) {
        this.selectedCharacterId.set(character.id);
        this.#selectedCharacterBeforeCreate = null;
        this.editorMode.set('edit');
        this.#patchForm(character);
        this.feedback.set(this.editor.feedback['newCharacterDiscarded']);
        return;
      }
    }

    const character = this.selectedCharacter();

    if (character) {
      this.editorMode.set('edit');
      this.#patchForm(character);
      this.feedback.set(this.editor.feedback['unsavedChangesDiscarded']);
      return;
    }

    this.startCreate();
  }

  /**
   * Validates and normalizes form values before delegating create or update work to the service.
   * The flow is form submission → service use case → FeatureCell pipeline → reactive collection update.
   * Invalid input or a missing edit selection produces feedback without changing collection state.
   * @returns Nothing; the selected identity, form, and feedback reflect the submitted operation.
   */
  protected saveCharacter(): void {
    if (this.characterForm.invalid) {
      this.characterForm.markAllAsTouched();
      this.feedback.set(this.editor.feedback['invalidForm']);
      return;
    }

    const formValue = this.characterForm.getRawValue();
    const normalizedCharacter = this.editor.normalizeCharacterDraft(formValue);

    if (this.editorMode() === 'create') {
      const character =
        this.#exampleService.createCharacter(normalizedCharacter);

      this.selectedCharacterId.set(character.id);
      this.#selectedCharacterBeforeCreate = null;
      this.editorMode.set('edit');
      this.#patchForm(character);
      this.feedback.set(
        this.editor.characterAddedFeedback(this.#characterLabel(character))
      );
      return;
    }

    const selectedId = this.selectedCharacterId();

    if (selectedId === null) {
      this.feedback.set(this.editor.feedback['selectBeforeSave']);
      return;
    }

    const updatedCharacter = this.#exampleService.updateCharacter(
      selectedId,
      normalizedCharacter
    );

    this.#patchForm(updatedCharacter);
    this.feedback.set(
      this.editor.characterUpdatedFeedback(
        this.#characterLabel(updatedCharacter)
      )
    );
  }

  /**
   * Opens the confirmation state for the currently selected character.
   * No confirmation is shown when the selection cannot resolve to a character.
   * @returns Nothing; the delete candidate and feedback signals are updated in place.
   */
  protected requestDelete(): void {
    const character = this.selectedCharacter();

    if (character) {
      this.deleteCandidate.set(character);
      this.feedback.set(null);
    }
  }

  /**
   * Closes the removal confirmation without changing the character collection.
   * @returns Nothing; the pending delete candidate is cleared.
   */
  protected cancelDelete(): void {
    this.deleteCandidate.set(null);
  }

  /**
   * Delegates confirmed removal to the service, then resets the component to create mode.
   * The flow is confirmation → service removal → FeatureCell pipeline → reactive collection update.
   * @returns Nothing; selection, form, confirmation, and feedback state are updated in place.
   */
  protected confirmDelete(): void {
    const character = this.deleteCandidate();

    if (!character) {
      return;
    }

    this.#exampleService.removeCharacter(character.id);

    this.deleteCandidate.set(null);
    this.selectedCharacterId.set(null);
    this.#selectedCharacterBeforeCreate = null;
    this.editorMode.set('create');
    this.#clearCharacterForm();

    this.feedback.set(
      this.editor.characterRemovedFeedback(this.#characterLabel(character))
    );
  }

  /**
   * Delegates FeatureCell reset behavior to the service and clears the character form.
   * @returns Nothing; the cleared state propagates through the reactive state APIs.
   */
  protected resetState(): void {
    this.#exampleService.resetState();
    this.#clearCharacterForm();
  }

  /**
   * Resolves the authoritative hydration source and completes FeatureCell initialization.
   * A missing resolver preserves the pending UI because no hydration cycle was completed.
   * @returns Nothing; the hydrated characters continue through the full pipeline automatically.
   */
  protected resolveHydration(): void {
    const resolveHydration = exampleHydrate.getResolve();

    if (!resolveHydration) {
      return;
    }

    resolveHydration();
    this.hydrationSettled.set(true);
  }

  /**
   * Rejects the authoritative hydration source and completes initialization with an Error.
   * Vault exposes the failure without evaluating configured initial State as a fallback.
   * @returns Nothing; loading and Error State update through pipeline finalization.
   */
  protected rejectHydration(): void {
    const rejectHydration = exampleHydrate.getReject();

    if (!rejectHydration) {
      return;
    }

    rejectHydration();
    this.hydrationSettled.set(true);
  }

  /**
   * Accepts the pending Stepwise Resolve candidate and resumes its pipeline.
   * @returns Nothing; the resulting State arrives through the existing reactive stream.
   */
  protected acceptStepwiseResolve(): void {
    this.#exampleService.acceptStepwiseResolve();
  }

  /**
   * Blocks the pending Stepwise Resolve candidate and preserves committed State.
   * @returns Nothing; the suspended pipeline terminates as a controlled no-op.
   */
  protected cancelStepwiseResolve(): void {
    this.#exampleService.cancelStepwiseResolve();
  }

  /**
   * Accepts the candidate produced by the Filter stage and resumes its pipeline.
   * @returns Nothing; downstream reducers and State commitment remain reactive.
   */
  protected acceptStepwiseFilter(): void {
    this.#exampleService.acceptStepwiseFilter();
  }

  /**
   * Blocks the candidate produced by the Filter stage and preserves committed State.
   * @returns Nothing; the suspended attempt terminates as a controlled no-op.
   */
  protected cancelStepwiseFilter(): void {
    this.#exampleService.cancelStepwiseFilter();
  }

  /**
   * Accepts the fully reduced candidate and allows State commitment to continue.
   * @returns Nothing; the finalized State arrives through the reactive stream.
   */
  protected acceptStepwiseReducer(): void {
    this.#exampleService.acceptStepwiseReducer();
  }

  /**
   * Blocks the fully reduced candidate and preserves committed State.
   * @returns Nothing; the suspended pipeline terminates as a controlled no-op.
   */
  protected cancelStepwiseReducer(): void {
    this.#exampleService.cancelStepwiseReducer();
  }

  /**
   * Reports whether a pending Stepwise stage should open its native confirmation prompt.
   * @param isPending - Whether the current Stepwise stage is awaiting a decision.
   * @param hasPrompted - Whether this pending request has already shown its dialog.
   * @returns True when a browser prompt can be shown for the pending request.
   */
  protected shouldPromptForPendingStepwise(
    isPending: boolean,
    hasPrompted: boolean
  ): boolean {
    return isPending && !hasPrompted && typeof window !== 'undefined';
  }

  /** Processes the current Stepwise Resolve pending state and opens its prompt at most once. */
  protected processStepwiseResolvePending(isPending: boolean): void {
    if (!isPending) {
      this.#hasPromptedStepwiseResolve = false;
      return;
    }

    if (
      !this.shouldPromptForPendingStepwise(
        isPending,
        this.#hasPromptedStepwiseResolve
      )
    ) {
      return;
    }

    this.#hasPromptedStepwiseResolve = true;
    this.handleStepwiseResolvePrompt();
  }

  /** Processes the current Stepwise Filter pending state and opens its prompt at most once. */
  protected processStepwiseFilterPending(isPending: boolean): void {
    if (!isPending) {
      this.#hasPromptedStepwiseFilter = false;
      return;
    }

    if (
      !this.shouldPromptForPendingStepwise(
        isPending,
        this.#hasPromptedStepwiseFilter
      )
    ) {
      return;
    }

    this.#hasPromptedStepwiseFilter = true;
    this.handleStepwiseFilterPrompt();
  }

  /** Processes the current Stepwise Reducer pending state and opens its prompt at most once. */
  protected processStepwiseReducerPending(isPending: boolean): void {
    if (!isPending) {
      this.#hasPromptedStepwiseReducer = false;
      return;
    }

    if (
      !this.shouldPromptForPendingStepwise(
        isPending,
        this.#hasPromptedStepwiseReducer
      )
    ) {
      return;
    }

    this.#hasPromptedStepwiseReducer = true;
    this.handleStepwiseReducerPrompt();
  }

  /** Opens the native confirmation flow for a pending Stepwise Resolve request. */
  protected handleStepwiseResolvePrompt(): void {
    if (
      window.confirm(
        'Stepwise Resolve is pending. Press OK to accept or Cancel to block the candidate.'
      )
    ) {
      this.acceptStepwiseResolve();
      return;
    }

    this.cancelStepwiseResolve();
  }

  /** Opens the native confirmation flow for a pending Stepwise Filter request. */
  protected handleStepwiseFilterPrompt(): void {
    if (
      window.confirm(
        'Stepwise Filter is pending. Press OK to accept or Cancel to block the candidate.'
      )
    ) {
      this.acceptStepwiseFilter();
      return;
    }

    this.cancelStepwiseFilter();
  }

  /** Opens the native confirmation flow for a pending Stepwise Reducer request. */
  protected handleStepwiseReducerPrompt(): void {
    if (
      window.confirm(
        'Stepwise Reducer is pending. Press OK to accept or Cancel to block the candidate.'
      )
    ) {
      this.acceptStepwiseReducer();
      return;
    }

    this.cancelStepwiseReducer();
  }

  /**
   * Resolves the stable label used in messages and template fallbacks.
   * @param character - Raw or reduced character whose display label should be returned.
   * @returns The post-reducer full name when present, otherwise a local fallback.
   */
  #characterLabel(character: StarWarsCharacter): string {
    return character.fullName ?? \`\${character.name} \${character.lastName}\`;
  }

  /**
   * Clears every editable character field and restores clean form metadata.
   * @returns Nothing; the existing reactive form is reset in place.
   */
  #clearCharacterForm(): void {
    this.characterForm.reset({
      name: '',
      lastName: '',
      faction: '',
      isForceSensitive: false
    });
    this.characterForm.markAsPristine();
    this.characterForm.markAsUntouched();
  }

  /**
   * Copies a character into the form and resets dirty and touched metadata for a clean edit state.
   * @param character - Character whose values should populate the editor.
   * @returns Nothing; the existing reactive form is updated in place.
   */
  #patchForm(character: StarWarsCharacter): void {
    this.characterForm.setValue({
      name: character.name,
      lastName: character.lastName,
      faction: character.faction,
      isForceSensitive: character.isForceSensitive
    });
    this.characterForm.markAsPristine();
    this.characterForm.markAsUntouched();
  }
}
`,
    'src/example.filter.ts': `// example.filter.ts
import { FilterFunction } from '@sdux-vault/shared';
import type { StarWarsCharacter } from './star-wars-character.shape';

/**
 * Removes characters whose last name is exactly \`"unknown"\` without mutating the candidate collection.
 * @param characters - Candidate character collection entering the Filter stage.
 * @returns A new collection containing every character with a known last name.
 */
export const removeUnknownLastNameFilter: FilterFunction<
  StarWarsCharacter[]
> = (characters) => characters.filter(({ lastName }) => lastName !== 'unknown');
`,
    'src/example.hydrate.spec.ts': `import { exampleHydrate } from './example.hydrate';

describe('exampleHydrate', () => {
  describe('controller availability', () => {
    it('should not expose terminal controllers before hydration is requested', () => {
      expect(exampleHydrate.getResolve()).toBeNull();
      expect(exampleHydrate.getReject()).toBeNull();
    });
  });

  describe('active request lifecycle', () => {
    it('should resolve the authoritative collection and clear its controllers', async () => {
      const promise = exampleHydrate.getPromise();
      const resolve = exampleHydrate.getResolve();

      expect(resolve).not.toBeNull();

      resolve!();
      const characters = await promise;

      expect(characters.length).toBe(5);
      expect(exampleHydrate.getResolve()).toBeNull();
    });

    it('should reject the authoritative source and clear its controllers', async () => {
      const promise = exampleHydrate.getPromise();
      const reject = exampleHydrate.getReject();

      expect(reject).not.toBeNull();

      reject!();

      await expectAsync(promise).toBeRejectedWithError(
        'The character hydration was rejected.'
      );
      expect(exampleHydrate.getReject()).toBeNull();
    });
  });

  describe('stale controller safety', () => {
    it('should ignore a stale resolver captured from a previous cycle', async () => {
      const firstPromise = exampleHydrate.getPromise();
      const staleResolve = exampleHydrate.getResolve()!;

      staleResolve();
      await firstPromise;

      const secondPromise = exampleHydrate.getPromise();
      let secondSettled = false;
      void secondPromise.then(() => {
        secondSettled = true;
      });

      staleResolve();
      await Promise.resolve();

      expect(secondSettled).toBeFalse();

      exampleHydrate.getResolve()!();

      await expectAsync(secondPromise).toBeResolved();
    });

    it('should ignore a stale rejecter captured from a previous cycle', async () => {
      const firstPromise = exampleHydrate.getPromise();
      const staleReject = exampleHydrate.getReject()!;

      staleReject();
      await expectAsync(firstPromise).toBeRejected();

      const secondPromise = exampleHydrate.getPromise();
      let secondSettled = false;
      void secondPromise.catch(() => {
        secondSettled = true;
      });

      staleReject();
      await Promise.resolve();

      expect(secondSettled).toBeFalse();

      exampleHydrate.getReject()!();

      await expectAsync(secondPromise).toBeRejectedWithError(
        'The character hydration was rejected.'
      );
    });
  });
});
`,
    'src/example.hydrate.ts': `import type {
  RawStarWarsCharacter,
  StarWarsCharacter
} from './star-wars-character.shape';

/** Raw characters supplied by the tutorial's authoritative hydration source. */
const HYDRATED_CHARACTERS: readonly RawStarWarsCharacter[] = [
  {
    id: 301,
    name: 'Cal',
    lastName: 'Kestis',
    faction: 'Jedi Order',
    isForceSensitive: true
  },
  {
    id: 302,
    name: 'Jyn',
    lastName: 'Erso',
    faction: 'Rebel Alliance',
    isForceSensitive: false
  },
  {
    id: 303,
    name: 'Bo-Katan',
    lastName: 'Kryze',
    faction: 'Mandalorians',
    isForceSensitive: false
  },
  {
    id: 304,
    name: 'Mace',
    lastName: 'Windu',
    faction: 'Jedi Order',
    isForceSensitive: true
  },
  {
    id: 305,
    name: 'BB-8',
    lastName: 'unknown',
    faction: 'Resistance',
    isForceSensitive: false
  }
];

/** Resolves the pending hydration with its authoritative character collection. */
type CharacterResolver = (characters: StarWarsCharacter[]) => void;

/** Rejects the pending hydration with its simulated initialization failure. */
type CharacterRejecter = (reason: Error) => void;

/**
 * Coordinates the manually settled Promise used by the hydration teaching example.
 * The singleton lets the service register one deferred initialization source while
 * the component controls whether that authoritative source resolves or rejects.
 */
class ExampleHydrate {
  /** Reuses the hydration Promise requested during the active initialization cycle. */
  #pendingPromise: Promise<StarWarsCharacter[]> | null = null;

  /** Holds the native resolver until hydration completes successfully. */
  #resolveCharacters: CharacterResolver | null = null;

  /** Holds the native rejecter until hydration terminates with an Error. */
  #rejectCharacters: CharacterRejecter | null = null;

  /**
   * Creates or returns the deferred source that \`hydrate()\` evaluates during \`initialize()\`.
   * @returns The active Promise for the authoritative initial character State.
   */
  getPromise(): Promise<StarWarsCharacter[]> {
    if (!this.#pendingPromise) {
      this.#pendingPromise = new Promise((resolve, reject) => {
        this.#resolveCharacters = resolve;
        this.#rejectCharacters = reject;
      });
    }

    return this.#pendingPromise;
  }

  /**
   * Returns a controller-safe function that successfully completes hydration once.
   * The resolved collection is cloned so the pipeline receives detached teaching data.
   * @returns A zero-argument resolver, or \`null\` before hydration has started.
   */
  getResolve(): (() => void) | null {
    const resolveCharacters = this.#resolveCharacters;

    if (!resolveCharacters) {
      return null;
    }

    return () => {
      if (this.#resolveCharacters !== resolveCharacters) {
        return;
      }

      this.#clearPendingRequest();
      resolveCharacters(
        HYDRATED_CHARACTERS.map((character) => ({ ...character }))
      );
    };
  }

  /**
   * Returns a controller-safe function that fails the authoritative source once.
   * The rejection enters Vault's initialization Error lifecycle without consulting
   * configured initial State or persistence as a fallback.
   * @returns A zero-argument rejecter, or \`null\` before hydration has started.
   */
  getReject(): (() => void) | null {
    const rejectCharacters = this.#rejectCharacters;

    if (!rejectCharacters) {
      return null;
    }

    return () => {
      if (this.#rejectCharacters !== rejectCharacters) {
        return;
      }

      this.#clearPendingRequest();
      rejectCharacters(new Error('The character hydration was rejected.'));
    };
  }

  /** Releases the completed Promise and both terminal controllers. */
  #clearPendingRequest(): void {
    this.#resolveCharacters = null;
    this.#rejectCharacters = null;
    this.#pendingPromise = null;
  }
}

/** Shared coordinator used by the service and component for the hydration example. */
export const exampleHydrate = new ExampleHydrate();
`,
    'src/example.service.spec.ts': `import type { FactoryProvider } from '@angular/core';
import { provideZonelessChangeDetection, signal } from '@angular/core';
import {
  withArrayAppendMergeBehavior,
  withStepwiseController,
  withStepwiseFilterBehavior,
  withStepwiseReducerBehavior,
  withStepwiseResolveBehavior
} from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { TestBed } from '@angular/core/testing';
import { exampleHydrate } from './example.hydrate';
import { ExampleService } from './example.service';
import type { StarWarsCharacter } from './star-wars-character.shape';
import { of } from 'rxjs';

describe('ExampleService', () => {
  const key = 'star-wars-character';
  const initialCharacters: StarWarsCharacter[] = [
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

  const expectedCharacters = (characters: readonly StarWarsCharacter[]) =>
    [...characters]
      .map((character) => ({
        ...character,
        forceSensitiveDisplay: character.isForceSensitive ? 'Yes' : 'No',
        fullName: \`\${character.name} \${character.lastName}\`
      }))
      .sort((left, right) => left.lastName.localeCompare(right.lastName));

  const acceptStepwiseAndSettle = async (
    service: ExampleService
  ): Promise<void> => {
    let settled = false;
    const settledPromise = vaultSettled(key).then(() => {
      settled = true;
    });

    while (!settled) {
      await Promise.race([
        settledPromise,
        new Promise<void>((resolve) => setTimeout(resolve))
      ]);

      if (service.isStepwiseResolvePending()) {
        service.acceptStepwiseResolve();
        continue;
      }

      if (service.isStepwiseFilterPending()) {
        service.acceptStepwiseFilter();
        continue;
      }

      if (service.isStepwiseReducerPending()) {
        service.acceptStepwiseReducer();
      }
    }

    await settledPromise;
  };

  const configureService = async (
    initialState: StarWarsCharacter[] | null = initialCharacters
  ): Promise<ExampleService> => {
    await TestBed.configureTestingModule({
      providers: [
        provideVaultTesting(),
        provideZonelessChangeDetection(),
        provideFeatureCell(
          ExampleService,
          { key, initialState },
          [
            withArrayAppendMergeBehavior,
            withStepwiseResolveBehavior,
            withStepwiseFilterBehavior,
            withStepwiseReducerBehavior
          ],
          [withStepwiseController]
        )
      ]
    });

    spyOn(exampleHydrate, 'getPromise').and.returnValue(
      Promise.resolve(initialState ?? undefined) as Promise<StarWarsCharacter[]>
    );

    const service = TestBed.inject(ExampleService);
    await acceptStepwiseAndSettle(service);
    return service;
  };

  beforeEach(() => TestBed.resetTestingModule());

  it('should initialize and expose reduced FeatureCell State', async () => {
    const service = await configureService();

    expect(service.state.value()).toEqual(
      expectedCharacters(initialCharacters)
    );
    expect(service.state.hasValue()).toBeTrue();
    expect(service.state.error()).toBeNull();
  });

  it('should expose each Stepwise callback request', async () => {
    const service = await configureService();

    expect(service.stepwiseResolveRequest()).toEqual(
      jasmine.objectContaining({ candidate: jasmine.any(Array) })
    );
    expect(service.stepwiseFilterRequest()).toEqual(
      jasmine.objectContaining({ candidate: jasmine.any(Array) })
    );
    expect(service.stepwiseReducerRequest()).toEqual(
      jasmine.objectContaining({ candidate: jasmine.any(Array) })
    );
  });

  it('should safely ignore decisions when no request is pending', async () => {
    const service = await configureService();

    service.acceptStepwiseResolve();
    service.cancelStepwiseResolve();
    service.acceptStepwiseFilter();
    service.cancelStepwiseFilter();
    service.acceptStepwiseReducer();
    service.cancelStepwiseReducer();

    expect(service.isStepwiseResolvePending()).toBeFalse();
    expect(service.isStepwiseFilterPending()).toBeFalse();
    expect(service.isStepwiseReducerPending()).toBeFalse();
  });

  it('should create, update, and remove characters through the FeatureCell', async () => {
    const service = await configureService();
    const created = service.createCharacter({
      name: 'Han',
      lastName: 'Solo',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    });

    expect(created.id).toBe(3);
    await acceptStepwiseAndSettle(service);
    service.updateCharacter(3, { ...created, name: 'General Han' });
    await acceptStepwiseAndSettle(service);
    service.removeCharacter(3);
    await acceptStepwiseAndSettle(service);

    expect(service.state.value()).toEqual(
      expectedCharacters(initialCharacters)
    );
  });

  it('should reset and restore the captured initial characters', async () => {
    const service = await configureService();

    service.resetState();
    expect(service.restoreInitialCharacters()).toEqual(
      jasmine.objectContaining({
        id: 2,
        name: 'Leia',
        lastName: 'Organa',
        forceSensitiveDisplay: 'No',
        fullName: 'Leia Organa'
      })
    );
  });

  it('should handle empty initial State in update, remove, and restore flows', async () => {
    const service = await configureService(null);

    service.updateCharacter(3, {
      name: 'Missing',
      lastName: 'Character',
      faction: 'Unaffiliated',
      isForceSensitive: false
    });
    await acceptStepwiseAndSettle(service);

    service.removeCharacter(3);
    await acceptStepwiseAndSettle(service);

    expect(service.state.value()).toEqual([]);
    expect(service.restoreInitialCharacters()).toBeNull();
  });

  it('should capture an empty baseline when a valued snapshot has no value', async () => {
    const featureCellProviders = provideFeatureCell(ExampleService, {
      key,
      initialState: null
    });
    const featureCellProvider = featureCellProviders[0] as FactoryProvider;
    const vault = jasmine.createSpyObj('FeatureCell', [
      'hydrate',
      'withStepwiseResolve',
      'filters',
      'withStepwiseFilter',
      'reducers',
      'withStepwiseReducer',
      'initialize',
      'replaceState'
    ]);

    Object.assign(vault, {
      state: {
        value: signal<StarWarsCharacter[] | undefined>(undefined)
      },
      state\$: of({ snapshot: { hasValue: true, value: undefined } })
    });

    vault.hydrate.and.returnValue(vault);
    vault.withStepwiseResolve.and.returnValue(vault);
    vault.filters.and.returnValue(vault);
    vault.withStepwiseFilter.and.returnValue(vault);
    vault.reducers.and.returnValue(vault);
    vault.withStepwiseReducer.and.returnValue(vault);

    await TestBed.configureTestingModule({
      providers: [
        provideVaultTesting(),
        provideZonelessChangeDetection(),
        { provide: featureCellProvider.provide, useValue: vault },
        ExampleService
      ]
    });

    const service = TestBed.inject(ExampleService);

    expect(service.restoreInitialCharacters()).toBeNull();
    expect(vault.replaceState).toHaveBeenCalledOnceWith({ value: [] });
  });
});
`,
    'src/example.service.ts': `// example.service.ts
import { inject, Injectable, Injector, signal } from '@angular/core';
import { type StepwiseBehaviorDecisionShape } from '@sdux-vault/addons';
import { FeatureCell, injectVault } from '@sdux-vault/angular';
import { filter, take } from 'rxjs';
import {
  cloneCharacters,
  createCharacterState,
  deriveForceSensitiveDisplay,
  deriveFullName,
  getNextCharacterId,
  type StarWarsCharacterDraft,
  withCharactersSortedByLastName
} from './example.character-domain';
import { removeUnknownLastNameFilter } from './example.filter';
import { exampleHydrate } from './example.hydrate';
import type { StarWarsCharacter } from './star-wars-character.shape';

/** Values exposed while a Resolve-stage candidate awaits a tutorial decision. */
/** Teaching Point: ex-038 */
export interface StepwiseResolveRequest {
  /** Last value committed before the pending pipeline attempt began. */
  readonly current: StarWarsCharacter[] | undefined;

  /** Fully resolved pre-filter candidate waiting for an explicit continue or block decision. */
  readonly candidate: StarWarsCharacter[];
}

/** Values exposed while a filtered candidate awaits a tutorial decision. */
/** Teaching Point: ex-039 */
export interface StepwiseFilterRequest {
  /** Last value committed before the pending pipeline attempt began. */
  readonly current: StarWarsCharacter[] | undefined;

  /** Candidate produced by the Filter stage and awaiting policy approval. */
  readonly candidate: StarWarsCharacter[];
}

/** Values exposed while a reduced candidate awaits a tutorial decision. */
/** Teaching Point: ex-040 */
export interface StepwiseReducerRequest {
  /** Last value committed before the pending pipeline attempt began. */
  readonly current: StarWarsCharacter[] | undefined;

  /** Candidate produced by all reducers and awaiting policy approval. */
  readonly candidate: StarWarsCharacter[];
}

// Teaching point: CRUD Foundation (ex-007)
/**
 * Owns the character collection and exposes domain operations for the tutorial component.
 * The FeatureCell decorator associates this service with a typed state boundary, while
 * \`injectVault\` provides the reactive state and update methods for that boundary.
 * Create, update, remove, and restore operations all flow through the FeatureCell pipeline.
 * ️**Architectural Boundary:** Components consume this service instead of accessing the
 * FeatureCell directly, keeping state ownership and character rules in one place.
 */
@FeatureCell<StarWarsCharacter[]>('star-wars-character')
@Injectable({ providedIn: 'root' })
export class ExampleService {
  /**
   * Provides the strongly typed FeatureCell API associated with this decorated service.
   * Every collection update passes through this reference before reactive state changes.
   */
  readonly #vault = injectVault<StarWarsCharacter[]>(ExampleService);

  /** Supplies the Angular injection context required to create an HTTP resource. */
  readonly #injector = inject(Injector);

  /**
   * Stores a detached copy of the first resolved character collection.
   * Restore operations use this baseline instead of any later edited state.
   */
  #initialCharacters: StarWarsCharacter[] = [];

  /**
   * Tracks the identity assigned to the next newly created character.
   * Initialization advances it beyond the largest ID in the initial collection.
   */
  #nextCharacterId = 1;

  /** Retains the latest Resolve-stage comparison shown by the tutorial. */
  /** Teaching Point: ex-038 */
  readonly #stepwiseResolveRequest = signal<StepwiseResolveRequest | undefined>(
    undefined
  );

  // Teaching point: Stepwise Resolve (ex-038)
  /** Exposes the current and candidate values supplied to the Stepwise callback. */
  /** Teaching Point: ex-038 */
  readonly stepwiseResolveRequest = this.#stepwiseResolveRequest.asReadonly();

  /** Tracks whether the active callback is waiting for a user decision. */
  /** Teaching Point: ex-038 */
  readonly #isStepwiseResolvePending = signal(false);

  /** Enables the Accept and Cancel controls only while a callback is suspended. */
  /** Teaching Point: ex-038 */
  readonly isStepwiseResolvePending =
    this.#isStepwiseResolvePending.asReadonly();

  /** Holds the one-use decision functions for the active Stepwise request. */
  /** Teaching Point: ex-038 */
  #stepwiseResolveDecisions: StepwiseBehaviorDecisionShape | undefined;

  /**
   * Suspends the Resolve stage and publishes both callback values for inspection.
   * The pipeline remains paused until the component delegates either an Accept
   * (\`continue\`) or Cancel (\`block\`) decision back to this service.
   */
  /** Teaching Point: ex-038 */
  readonly #captureStepwiseResolve = (
    current: StarWarsCharacter[] | undefined,
    candidate: StarWarsCharacter[],
    decisions: StepwiseBehaviorDecisionShape
  ): void => {
    this.#stepwiseResolveRequest.set({ current, candidate });
    this.#stepwiseResolveDecisions = decisions;
    this.#isStepwiseResolvePending.set(true);
  };

  /** Retains the latest filtered candidate comparison shown by the tutorial. */
  /** Teaching Point: ex-039 */
  readonly #stepwiseFilterRequest = signal<StepwiseFilterRequest | undefined>(
    undefined
  );

  // Teaching point: Stepwise Filter (ex-039)
  /** Exposes the current and filtered candidate values supplied to the callback. */
  /** Teaching Point: ex-039 */
  readonly stepwiseFilterRequest = this.#stepwiseFilterRequest.asReadonly();

  /** Tracks whether the Filter-stage callback is waiting for a user decision. */
  /** Teaching Point: ex-039 */
  readonly #isStepwiseFilterPending = signal(false);

  /** Enables the Filter Accept and Cancel controls only while the stage is suspended. */
  /** Teaching Point: ex-039 */
  readonly isStepwiseFilterPending = this.#isStepwiseFilterPending.asReadonly();

  /** Holds the one-use decision functions for the active Filter-stage request. */
  /** Teaching Point: ex-039 */
  #stepwiseFilterDecisions: StepwiseBehaviorDecisionShape | undefined;

  /**
   * Suspends the filtered candidate and publishes both callback values for inspection.
   * The pipeline remains paused until the component delegates an explicit decision.
   */
  /** Teaching Point: ex-039 */
  readonly #captureStepwiseFilter = (
    current: StarWarsCharacter[] | undefined,
    candidate: StarWarsCharacter[],
    decisions: StepwiseBehaviorDecisionShape
  ): void => {
    this.#stepwiseFilterRequest.set({ current, candidate });
    this.#stepwiseFilterDecisions = decisions;
    this.#isStepwiseFilterPending.set(true);
  };

  /** Retains the latest reduced candidate comparison shown by the tutorial. */
  /** Teaching Point: ex-040 */
  readonly #stepwiseReducerRequest = signal<StepwiseReducerRequest | undefined>(
    undefined
  );

  // Teaching point: Stepwise Reducer (ex-040)
  /** Exposes the current and reduced candidate values supplied to the callback. */
  /** Teaching Point: ex-040 */
  readonly stepwiseReducerRequest = this.#stepwiseReducerRequest.asReadonly();

  /** Tracks whether the Reducer-stage callback is waiting for a user decision. */
  /** Teaching Point: ex-040 */
  readonly #isStepwiseReducerPending = signal(false);

  /** Enables Reducer controls only while the stage is suspended. */
  /** Teaching Point: ex-040 */
  readonly isStepwiseReducerPending =
    this.#isStepwiseReducerPending.asReadonly();

  /** Holds the one-use decision functions for the active Reducer-stage request. */
  /** Teaching Point: ex-040 */
  #stepwiseReducerDecisions: StepwiseBehaviorDecisionShape | undefined;

  /**
   * Suspends the reduced candidate and publishes both callback values for inspection.
   * The pipeline remains paused until the component delegates an explicit decision.
   */
  /** Teaching Point: ex-040 */
  readonly #captureStepwiseReducer = (
    current: StarWarsCharacter[] | undefined,
    candidate: StarWarsCharacter[],
    decisions: StepwiseBehaviorDecisionShape
  ): void => {
    this.#stepwiseReducerRequest.set({ current, candidate });
    this.#stepwiseReducerDecisions = decisions;
    this.#isStepwiseReducerPending.set(true);
  };

  // Teaching point: Raw StateSnapshot (ex-016)
  /**
   * Exposes the FeatureCell's Angular signal state for value, loading, error, and presence checks.
   * Consumers can bind to these reactive accessors without subscribing manually.
   */
  /** Teaching Point: ex-016 */
  readonly state = this.#vault.state;

  // Teaching point: Raw StateSnapshot\$ (ex-017)
  /**
   * Exposes committed FeatureCell snapshots for consumers that teach observable state access.
   * Each emission carries the same state value available through the Angular signal API.
   */
  /** Teaching Point: ex-017 */
  readonly state\$ = this.#vault.state\$;

  /**
   * Captures the first committed collection, then configures and initializes the FeatureCell pipeline.
   */
  constructor() {
    this.#captureInitialCharacters();

    /*
     * \`.hydrate()\` registers a deferred factory as the authoritative source for
     * this FeatureCell's initial State. The factory is declared before
     * \`.initialize()\` but does not execute until initialization begins.
     *
     * Resolving the Promise sends the hydrated collection through the complete
     * Replace → Resolve → Filter → Tap → Reducer → Emit pipeline. Rejecting it
     * emits an initialization Error without falling back to configured initial
     * State or persistence because hydration has the highest precedence.
     */
    this.#vault.hydrate(() => exampleHydrate.getPromise());

    // Teaching point: Stepwise Resolve (ex-038)
    /*
     * \`.withStepwiseResolve()\` installs an explicit approval boundary at the
     * Resolve stage. Its \`StepwiseFunction\` receives the last committed State,
     * the fully resolved candidate, and a one-use decision contract.
     *
     * This callback deliberately makes no immediate decision. It publishes both
     * values for inspection and leaves the pipeline suspended until the tutorial
     * UI calls \`continue()\` through Accept or \`block()\` through Cancel. Exactly
     * one terminal decision is consumed for each pending request.
     */
    this.#vault.withStepwiseResolve!({
      stepwiseCallback: this.#captureStepwiseResolve
    });

    /*
     * \`.filters()\` registers \`removeUnknownLastNameFilter\` as a
     * \`FilterFunction<readonly StarWarsCharacter[]>\`.
     *
     * This pure function runs before reducers and returns a new candidate
     * collection without characters whose last name is exactly \`unknown\`.
     * The inline second filter normally returns that collection unchanged. When
     * the teaching flag is enabled, it throws deliberately so the example can show
     * pipeline error normalization without allowing the candidate to commit.
     */
    this.#vault.filters([removeUnknownLastNameFilter]);

    // Teaching point: Stepwise Filter (ex-039)
    /*
     * \`.withStepwiseFilter()\` installs a second explicit approval boundary
     * immediately after the Filter stage. Its \`StepwiseFunction\` receives the
     * last committed State, the already-filtered candidate, and the same
     * one-use decision contract demonstrated by Stepwise Resolve.
     *
     * The callback publishes its isolated inputs without mutating them. Accept
     * invokes \`continue()\` so reducers may process the filtered candidate;
     * Cancel invokes \`block()\` so the attempt ends without changing State.
     */
    this.#vault.withStepwiseFilter!({
      stepwiseCallback: this.#captureStepwiseFilter
    });

    /*
     * The first \`.reducers()\` entry is a delegating
     * \`ReducerFunction<readonly StarWarsCharacter[]>\`.
     *
     * After filtering, this imported pure function performs an immutable transformation
     * through \`deriveForceSensitiveDisplay()\`, producing a new collection in which
     * every retained character has a \`Yes\` or \`No\` display value.
     */

    /*
     * The second entry uses a factory-generated pure reducer, a different function
     * pattern that still returns the same \`ReducerFunction\` contract.
     *
     * It runs after Reducer 1, clones the transformed collection, and sorts characters
     * alphabetically by \`lastName\` without mutating the incoming array.
     */

    /*
     * The third entry is another delegating pure reducer.
     *
     * It runs after sorting and derives a display-ready \`fullName\` from the existing
     * \`name\` and \`lastName\` fields so every view can reuse the same post-pipeline label.
     */
    this.#vault.reducers([
      deriveForceSensitiveDisplay,
      withCharactersSortedByLastName(),
      deriveFullName
    ]);

    /*
     * \`.withStepwiseReducer()\` installs the final approval boundary after all
     * reducers have completed. Its \`StepwiseFunction\` receives the last committed
     * State and the fully reduced candidate, including the derived force display
     * values, deterministic last-name ordering, and display-ready full names
     * produced above.
     *
     * Accept invokes \`continue()\` so the reduced candidate may proceed toward
     * commitment; Cancel invokes \`block()\` so the attempt ends without replacing
     * the current State. The callback observes isolated inputs and mutates neither.
     */
    this.#vault.withStepwiseReducer!({
      stepwiseCallback: this.#captureStepwiseReducer
    });

    /*
     * \`.initialize()\` finalizes the pipeline configuration and activates the
     * FeatureCell. Its initial value and subsequent updates now pass through the
     * registered Filter → Before Tap → Reducer → After Tap stages before becoming committed
     * reactive State, which is then observed by the State Emission callback.
     */
    this.#vault.initialize();
  }

  #captureInitialCharacters(): void {
    this.#vault.state\$
      .pipe(
        filter(({ snapshot }) => snapshot.hasValue),
        take(1)
      )
      .subscribe(({ snapshot }) => {
        this.#initialCharacters = cloneCharacters(snapshot.value ?? []);
        this.#nextCharacterId = getNextCharacterId(this.#initialCharacters);
      });
  }

  /**
   * Accepts the active Resolve-stage candidate and resumes its pipeline.
   * A call made without a pending callback is safely ignored.
   */
  /** Teaching point: Accept Stepwise Resolve (ex-038) */
  acceptStepwiseResolve(): void {
    this.#completeStepwiseResolve('continue');
  }

  /**
   * Cancels the active Resolve-stage candidate while preserving committed State.
   * A call made without a pending callback is safely ignored.
   */
  /** Teaching point: Accept Stepwise Resolve (ex-038) */
  cancelStepwiseResolve(): void {
    this.#completeStepwiseResolve('block');
  }

  /** Accepts the active filtered candidate and allows reducers to continue. */
  /** Teaching point: Accept Stepwise Filter (ex-039) */
  acceptStepwiseFilter(): void {
    this.#completeStepwiseFilter('continue');
  }

  /** Cancels the active filtered candidate while preserving committed State. */
  /** Teaching point: Cancel Stepwise Filter (ex-039) */
  cancelStepwiseFilter(): void {
    this.#completeStepwiseFilter('block');
  }

  /** Accepts the fully reduced candidate and allows commitment to continue. */
  /** Teaching point: Accept Stepwise Reducer (ex-040) */
  acceptStepwiseReducer(): void {
    this.#completeStepwiseReducer('continue');
  }

  /** Cancels the fully reduced candidate while preserving committed State. */
  /** Teaching point: Cancel Stepwise Reducer (ex-040) */
  cancelStepwiseReducer(): void {
    this.#completeStepwiseReducer('block');
  }

  /** Consumes exactly one pending decision before allowing another request. */
  /** Teaching point: Complete Stepwise Resolve (ex-038) */
  #completeStepwiseResolve(decision: 'continue' | 'block'): void {
    const decisions = this.#stepwiseResolveDecisions;

    if (!decisions) {
      return;
    }

    this.#stepwiseResolveDecisions = undefined;
    this.#isStepwiseResolvePending.set(false);
    decisions[decision]();
  }

  /** Consumes exactly one pending Filter-stage decision. */
  /** Teaching point: Complete Stepwise Filter (ex-039) */
  #completeStepwiseFilter(decision: 'continue' | 'block'): void {
    const decisions = this.#stepwiseFilterDecisions;

    if (!decisions) {
      return;
    }

    this.#stepwiseFilterDecisions = undefined;
    this.#isStepwiseFilterPending.set(false);
    decisions[decision]();
  }

  /** Teaching point: Complete Stepwise Reducer (ex-040) */
  /** Consumes exactly one pending Reducer-stage decision. */
  #completeStepwiseReducer(decision: 'continue' | 'block'): void {
    const decisions = this.#stepwiseReducerDecisions;

    if (!decisions) {
      return;
    }

    this.#stepwiseReducerDecisions = undefined;
    this.#isStepwiseReducerPending.set(false);
    decisions[decision]();
  }

  // Teaching point: Create (ex-009)
  /**
   * Assigns an ID and sends the new character through \`mergeState\` as a one-item array.
   * The configured array-append merge behavior adds that item while preserving existing characters.
   * @param draft - Editable character fields collected from the component form.
   * @returns The character submitted to the FeatureCell with its assigned ID.
   */
  createCharacter(draft: StarWarsCharacterDraft): StarWarsCharacter {
    const character = createCharacterState(this.#nextCharacterId++, draft);

    this.#vault.mergeState({
      value: [character]
    });

    return character;
  }

  // Teaching point: Create / Update (ex-010)
  /**
   * Builds a replacement character and maps it into the latest collection through \`replaceState\`.
   * A matching ID is replaced while every other character retains its existing value.
   * @param id - Identity of the character to replace.
   * @param changes - Complete editable fields that should accompany the preserved identity.
   * @returns The replacement character submitted to the FeatureCell.
   */
  updateCharacter(
    id: number,
    changes: StarWarsCharacterDraft
  ): StarWarsCharacter {
    const updatedCharacter = createCharacterState(id, changes);

    this.#vault.replaceState({
      value: () =>
        this.#vault.state
          .value()
          ?.map((character) =>
            character.id === id ? updatedCharacter : character
          )
    });

    return updatedCharacter;
  }

  // Teaching point: Remove (ex-006)
  /**
   * Filters the requested identity from the latest collection through \`replaceState\`.
   * An unknown ID leaves the visible collection unchanged.
   * @param id - Identity of the character to remove.
   * @returns Nothing; consumers observe the resulting collection through \`characters\`.
   */
  removeCharacter(id: number): void {
    this.#vault.replaceState({
      value: () =>
        this.#vault.state.value()?.filter((character) => character.id !== id) ??
        []
    });
  }

  // Teaching point: Reset (ex-021)
  /**
   * Resets the FeatureCell through its dedicated lifecycle API.
   * Consumers observe the cleared value as \`undefined\` through the reactive state APIs.
   * @returns Nothing; the FeatureCell performs the reset operation internally.
   */
  resetState(): void {
    this.#vault.reset();
  }

  // Teaching point: Restore (ex-022)
  /**
   * Clones the captured baseline and replaces the current FeatureCell collection with it.
   * Returning the first restored character lets the component restore its selection as well.
   * @returns The first restored character, or \`null\` when the initial collection was empty.
   */
  restoreInitialCharacters(): StarWarsCharacter | null {
    const initialCharacters = cloneCharacters(this.#initialCharacters);

    this.#vault.replaceState({
      value: initialCharacters
    });

    return initialCharacters[0] ?? null;
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
