import type { StateSnapshotShape, VaultErrorShape } from '@sdux-vault/shared';
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
