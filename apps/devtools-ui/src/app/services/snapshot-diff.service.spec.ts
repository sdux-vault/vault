import { TestBed } from '@angular/core/testing';
import { SnapshotDiffService } from './snapshot-diff.service';
import { TABLE_DIFF_EVENT_ARTIFACT } from './testing/table-diff-event.artifact';

/**
 * Extracts pipeline:candidate events from the artifact, grouped by traceId.
 */
function extractCandidatesByTrace(): Map<
  string,
  { stage: string; value: unknown }[]
> {
  const map = new Map<string, { stage: string; value: unknown }[]>();
  for (const event of TABLE_DIFF_EVENT_ARTIFACT) {
    if (event.boundary === 'candidate' && event.type === 'pipeline') {
      const traceId = event.traceId!;
      if (!map.has(traceId)) {
        map.set(traceId, []);
      }
      map.get(traceId)!.push({
        stage: event.name.split(':').pop()!,
        value: event.candidate
      });
    }
  }
  return map;
}

describe('Service: Snapshot Diff', () => {
  let service: SnapshotDiffService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnapshotDiffService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('computeTableDiff with null/empty values', () => {
    it('should return empty result for null before and null after', () => {
      const result = service.computeTableDiff(null, null);
      expect(result.beforeColumns).toEqual([]);
      expect(result.afterColumns).toEqual([]);
      expect(result.beforeRows).toEqual([]);
      expect(result.afterRows).toEqual([]);
    });

    it('should return empty result for undefined before and undefined after', () => {
      const result = service.computeTableDiff(undefined, undefined);
      expect(result.beforeColumns).toEqual([]);
      expect(result.afterColumns).toEqual([]);
      expect(result.beforeRows).toEqual([]);
      expect(result.afterRows).toEqual([]);
    });

    it('should mark all after rows as added when before is null', () => {
      const afterVal = [
        { id: 1, name: 'Luke' },
        { id: 2, name: 'Leia' }
      ];
      const result = service.computeTableDiff(null, afterVal);

      expect(result.beforeRows).toEqual([]);
      expect(result.afterRows.length).toBe(2);
      expect(result.afterRows[0].status).toBe('added');
      expect(result.afterRows[0].cells['id']).toBe('added');
      expect(result.afterRows[0].cells['name']).toBe('added');
      expect(result.afterRows[1].status).toBe('added');
    });

    it('should mark all before rows as removed when after is null', () => {
      const beforeVal = [{ id: 1, name: 'Luke' }];
      const result = service.computeTableDiff(beforeVal, null);

      expect(result.afterRows).toEqual([]);
      expect(result.beforeRows.length).toBe(1);
      expect(result.beforeRows[0].status).toBe('removed');
      expect(result.beforeRows[0].cells['id']).toBe('removed');
      expect(result.beforeRows[0].cells['name']).toBe('removed');
    });
  });

  describe('computeTableDiff with identical values', () => {
    it('should mark all rows and cells as unchanged', () => {
      const val = [
        { id: 11, name: 'Luke', lastName: 'Skywalker' },
        { id: 38, name: 'Leia', lastName: 'Organa' }
      ];
      const result = service.computeTableDiff(val, val);

      expect(result.beforeRows.length).toBe(2);
      expect(result.afterRows.length).toBe(2);

      for (const row of [...result.beforeRows, ...result.afterRows]) {
        expect(row.status).toBe('unchanged');
        for (const col of Object.keys(row.cells)) {
          expect(row.cells[col]).toBe('unchanged');
        }
      }
    });
  });

  describe('computeTableDiff with added rows', () => {
    it('should mark extra after rows as added', () => {
      const before = [
        { id: 11, name: 'Luke', lastName: 'Skywalker' },
        { id: 38, name: 'Leia', lastName: 'Organa' }
      ];
      const after = [
        { id: 11, name: 'Luke', lastName: 'Skywalker' },
        { id: 38, name: 'Leia', lastName: 'Organa' },
        { id: 9, name: 'Han', lastName: 'Solo' }
      ];

      const result = service.computeTableDiff(before, after);

      expect(result.afterRows[0].status).toBe('unchanged');
      expect(result.afterRows[1].status).toBe('unchanged');
      expect(result.afterRows[2].status).toBe('added');
      expect(result.afterRows[2].cells['id']).toBe('added');
      expect(result.afterRows[2].cells['name']).toBe('added');
      expect(result.afterRows[2].cells['lastName']).toBe('added');
    });
  });

  describe('computeTableDiff with removed rows', () => {
    it('should mark extra before rows as removed', () => {
      const before = [
        { id: 11, name: 'Luke', lastName: 'Skywalker' },
        { id: 38, name: 'Leia', lastName: 'Organa' },
        { id: 9, name: 'Han', lastName: 'Solo' }
      ];
      const after = [
        { id: 11, name: 'Luke', lastName: 'Skywalker' },
        { id: 38, name: 'Leia', lastName: 'Organa' }
      ];

      const result = service.computeTableDiff(before, after);

      expect(result.beforeRows[0].status).toBe('unchanged');
      expect(result.beforeRows[1].status).toBe('unchanged');
      expect(result.beforeRows[2].status).toBe('removed');
      expect(result.beforeRows[2].cells['id']).toBe('removed');
    });
  });

  describe('computeTableDiff with column additions', () => {
    it('should detect added columns as cell-level diffs', () => {
      const before = [
        { id: 11, name: 'Luke', lastName: 'Skywalker' },
        { id: 38, name: 'Leia', lastName: 'Organa' }
      ];
      const after = [
        { id: 11, name: 'Luke', lastName: 'Skywalker', jedi: true },
        { id: 38, name: 'Leia', lastName: 'Organa', senator: true }
      ];

      const result = service.computeTableDiff(before, after);

      // Before columns should NOT include jedi/senator
      expect(result.beforeColumns).toEqual(['id', 'name', 'lastName']);
      // After columns SHOULD include jedi/senator
      expect(result.afterColumns).toContain('jedi');
      expect(result.afterColumns).toContain('senator');

      // Before rows should be unchanged (only checking before columns)
      expect(result.beforeRows[0].status).toBe('unchanged');
      expect(result.beforeRows[1].status).toBe('unchanged');

      // After rows should be modified (jedi/senator are new columns)
      expect(result.afterRows[0].status).toBe('modified');
      expect(result.afterRows[0].cells['id']).toBe('unchanged');
      expect(result.afterRows[0].cells['name']).toBe('unchanged');
      expect(result.afterRows[0].cells['jedi']).toBe('added');

      expect(result.afterRows[1].status).toBe('modified');
      expect(result.afterRows[1].cells['senator']).toBe('added');
    });
  });

  describe('computeTableDiff with column removals', () => {
    it('should detect removed columns as cell-level diffs', () => {
      const before = [
        { id: 11, name: 'Luke', lastName: 'Skywalker', jedi: true },
        { id: 38, name: 'Leia', lastName: 'Organa', senator: true }
      ];
      const after = [
        { id: 11, name: 'Luke', lastName: 'Skywalker' },
        { id: 38, name: 'Leia', lastName: 'Organa' }
      ];

      const result = service.computeTableDiff(before, after);

      // Before columns include jedi/senator
      expect(result.beforeColumns).toContain('jedi');
      expect(result.beforeColumns).toContain('senator');

      // Before rows should be modified (jedi/senator exist in before but not after)
      expect(result.beforeRows[0].status).toBe('modified');
      expect(result.beforeRows[0].cells['jedi']).toBe('removed');
      expect(result.beforeRows[0].cells['id']).toBe('unchanged');

      expect(result.beforeRows[1].status).toBe('modified');
      expect(result.beforeRows[1].cells['senator']).toBe('removed');
    });
  });

  describe('real-world artifact replay', () => {
    let candidatesByTrace: Map<string, { stage: string; value: unknown }[]>;

    beforeEach(() => {
      candidatesByTrace = extractCandidatesByTrace();
    });

    it('should detect added row when resolve adds Han Solo (t2 seq 1→2)', () => {
      const t2Candidates = candidatesByTrace.get(
        '7a4fd505-d751-49ab-9ad4-ca05a717565c'
      )!;
      // pipeline-start (null) → resolve (3 rows)
      const result = service.computeTableDiff(
        t2Candidates[0].value,
        t2Candidates[1].value
      );

      // Before is null → no before rows
      expect(result.beforeRows).toEqual([]);
      // After has 3 rows, all added
      expect(result.afterRows.length).toBe(3);
      expect(result.afterRows.every((r) => r.status === 'added')).toBeTrue();
    });

    it('should detect removed row when filter drops Han Solo (t2 seq 2→3)', () => {
      const t2Candidates = candidatesByTrace.get(
        '7a4fd505-d751-49ab-9ad4-ca05a717565c'
      )!;
      // resolve (3 rows) → filter (2 rows)
      const result = service.computeTableDiff(
        t2Candidates[1].value,
        t2Candidates[2].value
      );

      // Before has 3 rows, row 3 should be removed
      expect(result.beforeRows.length).toBe(3);
      expect(result.beforeRows[0].status).toBe('unchanged');
      expect(result.beforeRows[1].status).toBe('unchanged');
      expect(result.beforeRows[2].status).toBe('removed');
      expect(result.beforeRows[2].data['name']).toBe('Han');

      // After has 2 rows, all unchanged
      expect(result.afterRows.length).toBe(2);
      expect(result.afterRows[0].status).toBe('unchanged');
      expect(result.afterRows[1].status).toBe('unchanged');
    });

    it('should detect added jedi column when reducer enriches (t2 seq 3→4)', () => {
      const t2Candidates = candidatesByTrace.get(
        '7a4fd505-d751-49ab-9ad4-ca05a717565c'
      )!;
      // filter (2 rows, no jedi) → reducer (2 rows, with jedi)
      const result = service.computeTableDiff(
        t2Candidates[2].value,
        t2Candidates[3].value
      );

      // Before columns should NOT contain jedi
      expect(result.beforeColumns).not.toContain('jedi');
      // After columns SHOULD contain jedi
      expect(result.afterColumns).toContain('jedi');

      // Before rows unchanged (only checking their own columns)
      expect(result.beforeRows[0].status).toBe('unchanged');
      expect(result.beforeRows[1].status).toBe('unchanged');

      // After rows modified at cell level
      expect(result.afterRows[0].status).toBe('modified');
      expect(result.afterRows[0].cells['jedi']).toBe('added');
      expect(result.afterRows[0].cells['id']).toBe('unchanged');
    });

    it('should detect no changes between reducer and core-state (t2 seq 4→5)', () => {
      const t2Candidates = candidatesByTrace.get(
        '7a4fd505-d751-49ab-9ad4-ca05a717565c'
      )!;
      // reducer → core-state (identical)
      const result = service.computeTableDiff(
        t2Candidates[3].value,
        t2Candidates[4].value
      );

      expect(
        result.beforeRows.every((r) => r.status === 'unchanged')
      ).toBeTrue();
      expect(
        result.afterRows.every((r) => r.status === 'unchanged')
      ).toBeTrue();
    });

    it('should detect compute-merge adding rows (t4 seq 2→3)', () => {
      const t4Candidates = candidatesByTrace.get(
        '31cc7fd5-b763-4fe5-9125-340eb7f2ea83'
      )!;
      // resolve (1 row) → compute-merge (3 rows)
      const result = service.computeTableDiff(
        t4Candidates[1].value,
        t4Candidates[2].value
      );

      expect(result.beforeRows.length).toBe(1);
      expect(result.afterRows.length).toBe(3);
      expect(result.afterRows[0].status).toBe('modified');
      expect(result.afterRows[1].status).toBe('added');
      expect(result.afterRows[2].status).toBe('added');
    });

    it('should produce consistent columns per table across all artifact traces', () => {
      for (const [, candidates] of candidatesByTrace) {
        for (let i = 0; i < candidates.length - 1; i++) {
          const result = service.computeTableDiff(
            candidates[i].value,
            candidates[i + 1].value
          );

          // Before columns should match keys from before value
          for (const row of result.beforeRows) {
            for (const col of result.beforeColumns) {
              expect(row.cells[col]).toBeDefined();
            }
          }
          // After columns should match keys from after value
          for (const row of result.afterRows) {
            for (const col of result.afterColumns) {
              expect(row.cells[col]).toBeDefined();
            }
          }
        }
      }
    });
  });

  describe('computeTableDiff with heterogeneous rows', () => {
    it('should mark cell as unchanged when column is missing from current row but exists in other row', () => {
      const before = [
        { id: 1, name: 'Luke' },
        { id: 2, name: 'Leia', rank: 'Senator' }
      ];
      const after = [
        { id: 1, name: 'Luke', rank: 'Jedi' },
        { id: 2, name: 'Leia', rank: 'Senator' }
      ];

      const result = service.computeTableDiff(before, after);

      // 'rank' is in beforeColumns (union of all before row keys)
      expect(result.beforeColumns).toContain('rank');
      // Before row 0 doesn't have 'rank' but after row 0 does → unchanged
      expect(result.beforeRows[0].cells['rank']).toBe('unchanged');
    });
  });

  describe('object value (key-value pairs)', () => {
    it('should convert objects to key-value rows', () => {
      const before = { count: 0, isLoading: false };
      const after = { count: 1, isLoading: false };

      const result = service.computeTableDiff(before, after);

      expect(result.beforeColumns).toEqual(['key', 'value']);
      expect(result.afterColumns).toEqual(['key', 'value']);

      expect(result.beforeRows.length).toBe(2);
      expect(result.afterRows.length).toBe(2);

      // count changed
      expect(result.afterRows[0].status).toBe('modified');
      expect(result.afterRows[0].cells['value']).toBe('modified');
      // isLoading unchanged
      expect(result.afterRows[1].status).toBe('unchanged');
    });
  });
});
