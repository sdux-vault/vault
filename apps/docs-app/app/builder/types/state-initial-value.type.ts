export const StateInitialValueTypes = {
  Deferred: '() => Promise.resolve',
  EmptyArray: '[]',
  EmptyObject: '{}',
  Null: 'null',
  Undefined: 'undefined',
  String: '""',
  Number: '0',
  True: 'true',
  False: 'false',
  Custom: 'custom'
} as const;

export type StateInitialValueType =
  (typeof StateInitialValueTypes)[keyof typeof StateInitialValueTypes];

export function isStateInitialValueType(
  value: unknown
): value is StateInitialValueType {
  return Object.values(StateInitialValueTypes).includes(
    value as StateInitialValueType
  );
}
