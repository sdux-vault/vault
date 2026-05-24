export const StatePrimitiveTypes = {
  Array: '[]',
  Object: '{}',
  String: 'string',
  Number: 'number',
  Boolean: 'boolean'
} as const;

export type StatePrimitiveType =
  (typeof StatePrimitiveTypes)[keyof typeof StatePrimitiveTypes];

export function isStatePrimitiveType(
  value: unknown
): value is StatePrimitiveType {
  return Object.values(StatePrimitiveTypes).includes(
    value as StatePrimitiveType
  );
}
