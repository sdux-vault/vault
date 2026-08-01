import { Project } from '@stackblitz/sdk';

export const encryptAndPersistExampleProject: Project = {
  title: 'encrypt-and-persist-example',
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
  "name": "encrypt-and-persist-example",
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
import { withArrayAppendMergeBehavior } from '@sdux-vault/addons';
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
         * \`provideFeatureCell()\` accepts an optional behaviors array as its third argument.
         * Registering \`withArrayAppendMergeBehavior\` here changes the Merge stage so
         * \`mergeState()\` appends the incoming one-item character array to the current
         * collection instead of replacing the entire FeatureCell value.
         */
        withArrayAppendMergeBehavior
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
export function getNextCharacterId(
  characters: readonly StarWarsCharacter[]
): number {
  return Math.max(...characters.map(({ id }) => id), 0) + 1;
}

/** Derives display-friendly force sensitivity labels without mutating the input. */
export function deriveForceSensitiveDisplay(
  characters: readonly StarWarsCharacter[]
): readonly StarWarsCharacter[] {
  return characters.map((character) => ({
    ...character,
    forceSensitiveDisplay: character.isForceSensitive ? 'Yes' : 'No'
  })) satisfies (RawStarWarsCharacter &
    Pick<StarWarsCharacterDisplayFields, 'forceSensitiveDisplay'>)[];
}

/** Derives a display-ready full name for each character without mutating the input. */
export function deriveFullName(
  characters: readonly StarWarsCharacter[]
): readonly StarWarsCharacter[] {
  return characters.map((character) => ({
    ...character,
    fullName: \`\${character.name} \${character.lastName}\`
  })) satisfies (RawStarWarsCharacter &
    Pick<StarWarsCharacterDisplayFields, 'fullName'>)[];
}

/** Creates a pure reducer that orders a cloned collection by last name. */
export function withCharactersSortedByLastName(): ReducerFunction<
  readonly StarWarsCharacter[]
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
        Use SDuX Vault state management to select, create, and update characters
        from an in-memory collection.
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

  <fieldset class="feature-cell-controls">
    @if (deleteCandidate(); as character) {
      <section
        class="delete-confirmation"
        aria-labelledby="delete-confirmation-title"
        role="alert">
        <div>
          <h3 id="delete-confirmation-title">
            Delete
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
                {{
                  character.fullName ??
                    character.name + ' ' + character.lastName
                }}
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
                  Choose a character from the list or complete the form to add a
                  new one.
                </p>
              }
            </div>
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
    <div class="filter-reducer-output">
      <input
        id="filters-reducers-section-toggle"
        class="section-toggle"
        type="checkbox"
        aria-label="Toggle Filters and Reducers visibility"
        checked />
      <div class="section-header">
        <span>Filters and Reducers</span>
        <label
          class="section-chevron"
          for="filters-reducers-section-toggle"
          title="Show or hide Filters and Reducers"></label>
      </div>

      <div class="filter-reducer-content">
        <div class="tap-column">
          <input
            id="filter-output-toggle"
            class="tap-toggle"
            type="checkbox"
            aria-label="Toggle Filter source visibility"
            checked />
          <div class="tap-header">
            <h3>Filter</h3>
            <label
              class="tap-chevron"
              for="filter-output-toggle"
              title="Show or hide Filter output"></label>
          </div>
          <textarea
            readonly
            rows="6"
            aria-label="Filter source"
            [value]="editor.filterSource"></textarea>
        </div>

        <div class="tap-column">
          <input
            id="reducer-one-output-toggle"
            class="tap-toggle"
            type="checkbox"
            aria-label="Toggle Reducer 1 output visibility"
            checked />
          <div class="tap-header">
            <h3>Reducer 1</h3>
            <label
              class="tap-chevron"
              for="reducer-one-output-toggle"
              title="Show or hide Reducer 1 output"></label>
          </div>
          <textarea
            readonly
            rows="6"
            aria-label="Reducer 1 output"
            [value]="editor.reducer1Source"></textarea>
        </div>

        <div class="tap-column">
          <input
            id="reducer-two-output-toggle"
            class="tap-toggle"
            type="checkbox"
            aria-label="Toggle Reducer 2 output visibility"
            checked />
          <div class="tap-header">
            <h3>Reducer 2</h3>
            <label
              class="tap-chevron"
              for="reducer-two-output-toggle"
              title="Show or hide Reducer 2 output"></label>
          </div>
          <textarea
            readonly
            rows="6"
            aria-label="Reducer 2 output"
            [value]="editor.reducer2Source"></textarea>
        </div>

        <div class="tap-column">
          <input
            id="reducer-three-output-toggle"
            class="tap-toggle"
            type="checkbox"
            aria-label="Toggle Reducer 3 output visibility"
            checked />
          <div class="tap-header">
            <h3>Reducer 3</h3>
            <label
              class="tap-chevron"
              for="reducer-three-output-toggle"
              title="Show or hide Reducer 3 output"></label>
          </div>
          <textarea
            readonly
            rows="6"
            aria-label="Reducer 3 output"
            [value]="editor.reducer3Source"></textarea>
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

  const withDerivedFields = (
    characters: readonly StarWarsCharacter[]
  ): readonly StarWarsCharacter[] =>
    [...characters]
      .map((character) => ({
        ...character,
        forceSensitiveDisplay: character.isForceSensitive ? 'Yes' : 'No',
        fullName: \`\${character.name} \${character.lastName}\`
      }))
      .sort((left, right) => left.lastName.localeCompare(right.lastName));

  const reducedCharacters = withDerivedFields(initialCharacters);

  let component: ExampleComponent;
  let fixture: ComponentFixture<ExampleComponent>;
  let service: ExampleService;

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
    service = TestBed.inject(ExampleService);
    fixture.detectChanges();
  });

  it('should expose the latest character collection from the service', async () => {
    expect(component.characters()).toEqual([]);
    await vaultSettled(key);
    expect(component.characters()).toEqual(reducedCharacters);
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
    expect(component['selectedCharacter']()).toEqual(reducedCharacters[0]);
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

  it('should render the initially selected character details after state loads', async () => {
    await vaultSettled(key);
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    const detailsPanel = host.querySelector(
      '.character-details'
    ) as HTMLElement;

    expect(detailsPanel.textContent).toContain('Leia Organa');
    expect(detailsPanel.textContent).toContain('Rebel Alliance');
    expect(detailsPanel.textContent).not.toContain('No character selected');
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

  it('should enter create mode and clear the form', async () => {
    await vaultSettled(key);
    fixture.detectChanges();

    component['startCreate']();

    expect(component['editorMode']()).toBe('create');
    expect(component['editorTitle']()).toBe('Add a character');
    expect(component['submitLabel']()).toBe('Add character');
    expect(component['selectedCharacterId']()).toBeNull();
    expect(component['characterForm'].getRawValue()).toEqual({
      name: '',
      lastName: '',
      faction: '',
      isForceSensitive: false
    });
    expect(component['characterForm'].pristine).toBeTrue();
    expect(component['characterForm'].untouched).toBeTrue();
  });

  it('should restore the previous selection when canceling create mode', async () => {
    await vaultSettled(key);
    fixture.detectChanges();
    component['startCreate']();
    component['characterForm'].setValue({
      name: 'Han',
      lastName: 'Solo',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    });

    component['cancelEdit']();

    expect(component['editorMode']()).toBe('edit');
    expect(component['selectedCharacterId']()).toBe(2);
    expect(component['characterForm'].getRawValue()).toEqual({
      name: 'Leia',
      lastName: 'Organa',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    });
    expect(component['feedback']()).toEqual(
      component.editor.feedback['newCharacterDiscarded']
    );
  });

  it('should restore the selected character form when canceling edit mode', async () => {
    await vaultSettled(key);
    fixture.detectChanges();
    component['selectCharacter']('2');
    component['characterForm'].setValue({
      name: 'General Leia',
      lastName: 'Organa',
      faction: 'Resistance',
      isForceSensitive: false
    });

    component['cancelEdit']();

    expect(component['editorMode']()).toBe('edit');
    expect(component['selectedCharacterId']()).toBe(2);
    expect(component['characterForm'].getRawValue()).toEqual({
      name: 'Leia',
      lastName: 'Organa',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    });
    expect(component['feedback']()).toEqual(
      component.editor.feedback['unsavedChangesDiscarded']
    );
  });

  it('should fall back to create mode when canceling without a selected character', async () => {
    await vaultSettled(key);
    component['selectedCharacterId'].set(null);
    component['editorMode'].set('edit');
    component['characterForm'].setValue({
      name: 'Temp',
      lastName: 'Character',
      faction: 'Unaffiliated',
      isForceSensitive: false
    });

    component['cancelEdit']();

    expect(component['editorMode']()).toBe('create');
    expect(component['selectedCharacterId']()).toBeNull();
    expect(component['characterForm'].getRawValue()).toEqual({
      name: '',
      lastName: '',
      faction: '',
      isForceSensitive: false
    });
    expect(component['feedback']()).toBeNull();
  });

  it('should show invalid-form feedback when save is attempted with invalid values', async () => {
    await vaultSettled(key);
    fixture.detectChanges();
    component['startCreate']();

    component['saveCharacter']();

    expect(component['feedback']()).toEqual(
      component.editor.feedback['invalidForm']
    );
    expect(component['characterForm'].controls.name.touched).toBeTrue();
    expect(component['characterForm'].controls.lastName.touched).toBeTrue();
    expect(component['characterForm'].controls.faction.touched).toBeTrue();
  });

  it('should create a character from normalized form values', async () => {
    await vaultSettled(key);
    fixture.detectChanges();
    const createdCharacter: StarWarsCharacter = {
      id: 30,
      name: 'Han',
      lastName: 'Solo',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    };
    const createCharacterSpy = spyOn(
      service,
      'createCharacter'
    ).and.returnValue(createdCharacter);

    component['startCreate']();
    component['characterForm'].setValue({
      name: '  Han  ',
      lastName: '  Solo  ',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    });

    component['saveCharacter']();

    expect(createCharacterSpy).toHaveBeenCalledOnceWith({
      name: 'Han',
      lastName: 'Solo',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    });
    expect(component['selectedCharacterId']()).toBe(30);
    expect(component['editorMode']()).toBe('edit');
    expect(component['characterForm'].getRawValue()).toEqual({
      name: 'Han',
      lastName: 'Solo',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    });
    expect(component['feedback']()).toEqual({
      message: 'Han Solo was added and selected.',
      tone: 'success'
    });
  });

  it('should require a selected character before saving an edit', async () => {
    await vaultSettled(key);
    fixture.detectChanges();
    const updateCharacterSpy = spyOn(service, 'updateCharacter');

    component['selectedCharacterId'].set(null);
    component['editorMode'].set('edit');
    component['characterForm'].setValue({
      name: 'Leia',
      lastName: 'Organa',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    });

    component['saveCharacter']();

    expect(updateCharacterSpy).not.toHaveBeenCalled();
    expect(component['feedback']()).toEqual(
      component.editor.feedback['selectBeforeSave']
    );
  });

  it('should update the selected character from normalized form values', async () => {
    await vaultSettled(key);
    fixture.detectChanges();
    const updatedCharacter: StarWarsCharacter = {
      id: 2,
      name: 'General Leia',
      lastName: 'Organa',
      faction: 'Resistance',
      isForceSensitive: false
    };
    const updateCharacterSpy = spyOn(
      service,
      'updateCharacter'
    ).and.returnValue(updatedCharacter);

    component['selectCharacter']('2');
    component['characterForm'].setValue({
      name: '  General Leia  ',
      lastName: '  Organa  ',
      faction: 'Resistance',
      isForceSensitive: false
    });

    component['saveCharacter']();

    expect(updateCharacterSpy).toHaveBeenCalledOnceWith(2, {
      name: 'General Leia',
      lastName: 'Organa',
      faction: 'Resistance',
      isForceSensitive: false
    });
    expect(component['characterForm'].getRawValue()).toEqual({
      name: 'General Leia',
      lastName: 'Organa',
      faction: 'Resistance',
      isForceSensitive: false
    });
    expect(component['feedback']()).toEqual({
      message: 'General Leia Organa was updated.',
      tone: 'success'
    });
  });

  it('should open delete confirmation for the selected character and clear feedback', async () => {
    await vaultSettled(key);
    fixture.detectChanges();

    component['feedback'].set({
      message: 'Old feedback',
      tone: 'info'
    });
    component['selectCharacter']('2');

    component['requestDelete']();

    expect(component['deleteCandidate']()).toEqual(reducedCharacters[0]);
    expect(component['feedback']()).toBeNull();
  });

  it('should ignore delete requests when no character is selected', async () => {
    await vaultSettled(key);
    fixture.detectChanges();

    component['selectedCharacterId'].set(null);
    component['deleteCandidate'].set(null);

    component['requestDelete']();

    expect(component['deleteCandidate']()).toBeNull();
  });

  it('should clear the pending delete candidate when delete is canceled', async () => {
    await vaultSettled(key);
    fixture.detectChanges();

    component['deleteCandidate'].set(initialCharacters[0]!);

    component['cancelDelete']();

    expect(component['deleteCandidate']()).toBeNull();
  });

  it('should ignore confirm delete when there is no pending candidate', async () => {
    await vaultSettled(key);
    fixture.detectChanges();
    const removeCharacterSpy = spyOn(service, 'removeCharacter');

    component['deleteCandidate'].set(null);

    component['confirmDelete']();

    expect(removeCharacterSpy).not.toHaveBeenCalled();
    expect(component['editorMode']()).toBe('edit');
  });

  it('should remove the pending character and reset the editor after delete confirmation', async () => {
    await vaultSettled(key);
    fixture.detectChanges();
    const removeCharacterSpy = spyOn(
      service,
      'removeCharacter'
    ).and.callThrough();

    component['selectCharacter']('2');
    component['requestDelete']();

    component['confirmDelete']();
    await vaultSettled(key);

    expect(removeCharacterSpy).toHaveBeenCalledOnceWith(2);
    expect(component['deleteCandidate']()).toBeNull();
    expect(component['selectedCharacterId']()).toBeNull();
    expect(component['editorMode']()).toBe('create');
    expect(component['characterForm'].getRawValue()).toEqual({
      name: '',
      lastName: '',
      faction: '',
      isForceSensitive: false
    });
    expect(component['characterForm'].pristine).toBeTrue();
    expect(component['characterForm'].untouched).toBeTrue();
    expect(component['feedback']()).toEqual({
      message: 'Leia Organa was removed.',
      tone: 'success'
    });
    expect(component.characters()).toEqual(
      withDerivedFields([initialCharacters[0]!])
    );
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
import { ExampleService } from './example.service';
import type { StarWarsCharacter } from './star-wars-character.shape';

/**
 * Coordinates the add and edit flows layered on top of the tutorial's SDuX-managed collection.
 * The component owns presentation state such as selection, editor mode, form state, and feedback,
 * while the service remains the only place that mutates Feature State.
 * **Architectural Boundary:** The component owns local editor behavior while the service owns
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
  /** Exposes shared editor validation, labels, and feedback wording. */
  readonly editor = new ExampleCharacterEditor();

  /**
   * Provides the component-facing character use cases and reactive collection signal.
   * The component never reaches through this service to access the FeatureCell directly.
   */
  readonly #exampleService = inject(ExampleService);

  /** Creates the non-nullable reactive form used by the create and edit flows. */
  readonly #formBuilder = inject(FormBuilder);

  /** Prevents later collection emissions from replacing the user's current selection. */
  #hasInitializedSelection = false;

  /** Remembers the selected identity so canceling create mode can restore the prior editor. */
  #selectedCharacterBeforeCreate: number | null = null;

  /**
   * Projects the current FeatureCell value into a read-only Angular computed signal.
   * The empty-array fallback gives templates a stable collection before a value is available.
   */
  readonly characters = computed<readonly StarWarsCharacter[]>(
    () => this.#exampleService.state.value() ?? []
  );

  /** Holds the identity currently selected by the character picker, or \`null\` when none is selected. */
  protected readonly selectedCharacterId = signal<number | null>(null);

  /** Tracks whether the editor should create a character or update the selected character. */
  protected readonly editorMode = signal<EditorMode>('edit');

  /** Exposes the latest operation result for the template's accessible feedback region. */
  protected readonly feedback = signal<OperationFeedback | null>(null);

  /**
   * Resolves the selected identity against the latest reactive character collection.
   * Returning \`null\` keeps the template safe when the character was removed or never existed.
   */
  protected readonly selectedCharacter = computed(() => {
    const selectedId = this.selectedCharacterId();
    return this.characters().find(({ id }) => id === selectedId) ?? null;
  });

  /** Defines the non-nullable form model and validation rules shared by create and edit flows. */
  protected readonly characterForm = this.#formBuilder.nonNullable.group({
    name: ['', [this.#trimmedTextLength(2, 40)]],
    lastName: ['', [this.#trimmedTextLength(2, 40)]],
    faction: ['', Validators.required],
    isForceSensitive: [false]
  });

  /** Watches the reactive collection and selects its first character when initial state arrives. */
  constructor() {
    this.#observeInitialSelection();
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
   * Resolves a picker value to a known character identity in the current SDuX-managed collection.
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
    this.feedback.set(null);
    this.#patchForm(character);
  }

  /**
   * Validates and normalizes form values before delegating create or update work to the service.
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
   * Resolves the stable label used in messages and template fallbacks.
   * @param character - Raw or reduced character whose display label should be returned.
   * @returns A stable full-name label composed from the current character fields.
   */
  #characterLabel(character: StarWarsCharacter): string {
    return \`\${character.name} \${character.lastName}\`;
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

  /** Holds the character awaiting explicit confirmation before removal. */
  protected readonly deleteCandidate = signal<StarWarsCharacter | null>(null);

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

  /** Derives the editor heading from the current mode so the template stays declarative. */
  protected readonly editorTitle = computed(() =>
    this.editorMode() === 'create' ? 'Add a character' : 'Update character'
  );

  /** Derives the submit-button label from the operation that saving will perform. */
  protected readonly submitLabel = computed(() =>
    this.editorMode() === 'create' ? 'Add character' : 'Save changes'
  );

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
  readonly StarWarsCharacter[]
> = (characters) => characters.filter(({ lastName }) => lastName !== 'unknown');
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

  const withDerivedFields = (
    characters: readonly StarWarsCharacter[]
  ): readonly StarWarsCharacter[] =>
    characters.map((character) => ({
      ...character,
      forceSensitiveDisplay: character.isForceSensitive ? 'Yes' : 'No',
      fullName: \`\${character.name} \${character.lastName}\`
    }));

  const configureService = async (
    initialState: readonly StarWarsCharacter[] | null = initialCharacters
  ): Promise<ExampleService> => {
    await TestBed.configureTestingModule({
      providers: [
        provideVaultTesting(),
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideFeatureCell(ExampleService, { key, initialState }, [], [])
      ]
    });

    const configuredService = TestBed.inject(ExampleService);
    await vaultSettled(key);

    return configuredService;
  };

  beforeEach(async () => {
    TestBed.resetTestingModule();
  });

  it('should initialize with the configured FeatureCell State', async () => {
    const service = await configureService();

    expect(service.state.value()).toEqual(withDerivedFields(initialCharacters));
    expect(service.state.isLoading()).toBeFalse();
    expect(service.state.error()).toBeNull();
    expect(service.state.hasValue()).toBeTrue();
  });

  it('should submit a new character using the next available id', async () => {
    const service = await configureService();

    const createdCharacter = service.createCharacter({
      name: 'Han',
      lastName: 'Solo',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    });

    await vaultSettled(key);

    expect(createdCharacter).toEqual({
      id: 21,
      name: 'Han',
      lastName: 'Solo',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    });
    expect(service.state.value()).toEqual(
      withDerivedFields([createdCharacter])
    );
  });

  it('should create the first character with id 1 when no value exists', async () => {
    const service = await configureService(null);

    const createdCharacter = service.createCharacter({
      name: 'Han',
      lastName: 'Solo',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    });

    await vaultSettled(key);

    expect(createdCharacter).toEqual({
      id: 1,
      name: 'Han',
      lastName: 'Solo',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    });
    expect(service.state.value()).toEqual(
      withDerivedFields([createdCharacter])
    );
  });

  it('should replace the matching character without changing the others', async () => {
    const service = await configureService();

    const updatedCharacter = service.updateCharacter(10, {
      name: 'General Leia',
      lastName: 'Organa',
      faction: 'Resistance',
      isForceSensitive: false
    });

    await vaultSettled(key);

    expect(updatedCharacter).toEqual({
      id: 10,
      name: 'General Leia',
      lastName: 'Organa',
      faction: 'Resistance',
      isForceSensitive: false
    });
    expect(service.state.value()).toEqual([
      ...withDerivedFields([updatedCharacter, initialCharacters[1]!])
    ]);
  });

  it('should leave the collection unchanged when updating a missing character', async () => {
    const service = await configureService();

    const updatedCharacter = service.updateCharacter(999, {
      name: 'Missing',
      lastName: 'Character',
      faction: 'Unaffiliated',
      isForceSensitive: false
    });

    await vaultSettled(key);

    expect(updatedCharacter).toEqual({
      id: 999,
      name: 'Missing',
      lastName: 'Character',
      faction: 'Unaffiliated',
      isForceSensitive: false
    });
    expect(service.state.value()).toEqual(withDerivedFields(initialCharacters));
  });

  it('should safely update against an empty collection when no value exists', async () => {
    const service = await configureService(null);

    const updatedCharacter = service.updateCharacter(1, {
      name: 'Missing',
      lastName: 'Character',
      faction: 'Unaffiliated',
      isForceSensitive: false
    });

    await vaultSettled(key);

    expect(updatedCharacter).toEqual({
      id: 1,
      name: 'Missing',
      lastName: 'Character',
      faction: 'Unaffiliated',
      isForceSensitive: false
    });
    expect(service.state.value()).toEqual([]);
  });

  it('should remove the matching character from the current collection', async () => {
    const service = await configureService();

    service.removeCharacter(10);

    await vaultSettled(key);

    expect(service.state.value()).toEqual(
      withDerivedFields([initialCharacters[1]!])
    );
  });

  it('should safely remove against an empty collection when no value exists', async () => {
    const service = await configureService(null);

    service.removeCharacter(10);

    await vaultSettled(key);

    expect(service.state.value()).toEqual([]);
  });
});
`,
    'src/example.service.ts': `import { Injectable } from '@angular/core';
import { FeatureCell, injectVault } from '@sdux-vault/angular';
import {
  createCharacterState,
  deriveForceSensitiveDisplay,
  deriveFullName,
  getNextCharacterId,
  withCharactersSortedByLastName,
  type StarWarsCharacterDraft
} from './example.character-domain';
import { removeUnknownLastNameFilter } from './example.filter';
import type { StarWarsCharacter } from './star-wars-character.shape';

/**
 * Owns the character collection and exposes domain operations for the tutorial component.
 * The FeatureCell decorator associates this service with a typed state boundary, while
 * \`injectVault\` provides the reactive state and update methods for that boundary.
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
   * Initializes the FeatureCell for the add/edit tutorial slice.
   */
  constructor() {
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
    this.#vault.filters([
      removeUnknownLastNameFilter,
      (characters) => {
        return characters;
      }
    ]);

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

    this.#vault.initialize();
  }

  /**
   * Assigns an ID and sends the new character through \`mergeState\` as a one-item array.
   * The configured array-append merge behavior adds that item while preserving existing characters.
   * @param draft - Editable character fields collected from the component form.
   * @returns The character submitted to the FeatureCell with its assigned ID.
   */
  createCharacter(draft: StarWarsCharacterDraft): StarWarsCharacter {
    const nextCharacterId = getNextCharacterId(this.#vault.state.value() ?? []);
    const character = createCharacterState(nextCharacterId, draft);

    this.#vault.mergeState({
      value: [character]
    });

    return character;
  }

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
          ) ?? []
    });

    return updatedCharacter;
  }

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
