/**
 * Creates a deterministic persistence key for a feature cell and persistence type.
 *
 * Validates inputs and returns a normalized string used to avoid collisions with user-level storage entries.
 *
 * @param persistType - Identifier representing the persistence mechanism.
 * @param featureCellKey - Unique key identifying the feature cell.
 * @param behaviorKey - Unique key identifying the behavior.
 * @returns A normalized persistence key string.
 */
export function definePersistKey(
  persistType: string,
  featureCellKey: string,
  behaviorKey: string
): string {
  if (!featureCellKey || typeof featureCellKey !== 'string') {
    throw new Error(
      `[vault] Invalid featureCellKey for persistence: "${featureCellKey}"`
    );
  }

  if (!persistType || typeof persistType !== 'string') {
    throw new Error(
      `[vault] Invalid persistType for persistence: "${persistType}"`
    );
  }

  if (!behaviorKey || typeof behaviorKey !== 'string') {
    throw new Error(
      `[vault] Invalid behaviorKey for persistence: "${behaviorKey}"`
    );
  }

  const cleanType = persistType.trim().toLowerCase();
  const cleanFeatureCellKey = featureCellKey.trim();
  const cleanBehaviorKey = behaviorKey.trim();

  // Avoid collisions with user-level storage entries
  return `vault::${cleanType}::${cleanFeatureCellKey}::${cleanBehaviorKey}`;
}
