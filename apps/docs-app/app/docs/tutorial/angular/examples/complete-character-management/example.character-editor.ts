import type { StateSnapshotShape, VaultErrorShape } from '@sdux-vault/shared';
import type { StarWarsCharacterState } from '../../../examples/star-wars-character.state';
import type { StarWarsCharacterDraft } from './example.character-domain';

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

/** Editable text-length validation outcome, or `null` when the value is valid. */
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

  /** Current committed collection, or `undefined` when no value is present. */
  readonly value: readonly StarWarsCharacterState[] | undefined;

  /** Current normalized error, or `null` when the pipeline is healthy. */
  readonly error: VaultErrorShape | null;

  /** Whether the FeatureCell currently holds a value. */
  readonly hasValue: boolean;
}

/** Shape of a Stepwise request exposed to the teaching output for serialization. */
export interface StepwiseRequestView<T> {
  /** Last value committed before the pending attempt, or `undefined`. */
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

/** Fixed faction choices rendered by both the create and edit flows. */
export const FACTIONS = [
  'Galactic Empire',
  'Jedi Order',
  'Rebel Alliance',
  'Sith Order',
  'Unaffiliated'
] as const;

/** Executable pure filter source displayed by the Filter teaching output. */
export const FILTER_SOURCE = `export const removeUnknownLastNameFilter: FilterFunction<readonly StarWarsCharacterState[]> =
  (characters) => characters.filter(({ lastName }) => lastName !== 'unknown');"
 `;

/** Executable delegating-reducer source displayed by the Reducer 1 teaching output. */
export const REDUCER_1_SOURCE = `#deriveForceSensitiveDisplay(characters: readonly StarWarsCharacterState[]): readonly StarWarsCharacterState[] {
  return characters.map((character) => ({
    ...character,
    forceSensitiveDisplay: character.isForceSensitive ? 'Yes' : 'No'
  }));
`;

/** Executable factory-generated reducer source displayed by the Reducer 2 teaching output. */
export const REDUCER_2_SOURCE = `export function withCharactersSortedByLastName(): ReducerFunction<readonly StarWarsCharacterState[]> {
  return (characters) =>
    [...characters].sort((left, right) =>
      left.lastName.localeCompare(right.lastName)
    );
}`;

/** Custom comparison source passed to Distinct Until Changed for the teaching output. */
export const COMPARISON_FUNCTION_SOURCE = `withDistinctUntilChanged<readonly StarWarsCharacterState[]>(
  (incoming, previous) =>
    incoming.every(({ id }) =>
      previous.some((character) => character.id === id)
    )
)`;

/** Constant feedback messages that do not depend on a specific character. */
export const FEEDBACK = {
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
 * Combines a character's name fields into the consistent label used across every view.
 * @param character - Character whose name fields should be formatted.
 * @returns The character's first and last names separated by one space.
 */
export const displayName = (character: StarWarsCharacterState): string =>
  `${character.name} ${character.lastName}`;

/**
 * Builds the success feedback shown after a character is created and selected.
 * @param name - Display name of the newly created character.
 * @returns The success feedback describing the completed create.
 */
export const characterAddedFeedback = (name: string): OperationFeedback => ({
  message: `${name} was added and selected.`,
  tone: 'success'
});

/**
 * Builds the success feedback shown after an existing character is updated.
 * @param name - Display name of the updated character.
 * @returns The success feedback describing the completed update.
 */
export const characterUpdatedFeedback = (name: string): OperationFeedback => ({
  message: `${name} was updated.`,
  tone: 'success'
});

/**
 * Builds the success feedback shown after a character is removed.
 * @param name - Display name of the removed character.
 * @returns The success feedback describing the completed removal.
 */
export const characterRemovedFeedback = (name: string): OperationFeedback => ({
  message: `${name} was removed.`,
  tone: 'success'
});

/**
 * Trims text before enforcing required, minimum, and maximum lengths.
 * The return value mirrors framework validation error maps so a view can surface it directly.
 * @param value - Raw control value to validate.
 * @param minimum - Smallest accepted number of non-whitespace characters.
 * @param maximum - Largest accepted number of non-whitespace characters.
 * @returns The matching validation error map, or `null` when the value is valid.
 */
export function validateTrimmedText(
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
export function normalizeCharacterDraft(
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
 * Resolves a raw picker value to a known character in the current collection.
 * @param characters - Latest character collection.
 * @param value - Identity received from the picker, as text or number.
 * @returns The matching character, or `null` when no character matches.
 */
export function resolveCharacter(
  characters: readonly StarWarsCharacterState[],
  value: string | number
): StarWarsCharacterState | null {
  const id = Number(value);
  return characters.find((character) => character.id === id) ?? null;
}

/**
 * Serializes a Stepwise request for a teaching output, substituting an absent current value.
 * @param request - Stepwise request to serialize, or `undefined` when none is pending.
 * @returns Indented JSON, or the literal `'undefined'` when no request is pending.
 */
export function serializeStepwiseRequest<T>(
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
 * @returns Indented JSON, or the literal `'undefined'` when the value is absent.
 */
export function serializeTapInput<T>(value: T): string {
  return JSON.stringify(value, null, 2) ?? 'undefined';
}

/**
 * Serializes a StateSnapshot for a teaching output, substituting an absent value.
 * @param snapshot - Finalized snapshot to serialize, or `undefined` when none exists.
 * @returns Indented JSON, or the literal `'undefined'` when no snapshot exists.
 */
export function serializeSnapshot<T>(
  snapshot: StateSnapshotShape<T> | undefined
): string {
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
 * @param emission - Error and snapshot pair, or `undefined` when none exists.
 * @returns Indented JSON, or the literal `'undefined'` when no emission exists.
 */
export function serializeErrorEmission<T>(
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
 * @returns Indented JSON with an absent value substituted by the literal `'undefined'`.
 */
export function serializeRawState(fields: RawStateFields): string {
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
