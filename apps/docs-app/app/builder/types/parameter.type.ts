export const ParameterTypes = {
  Boolean: 'boolean',
  Function: 'function',
  Number: 'number',
  Select: 'select',
  String: 'string'
} as const;

export type ParameterType =
  (typeof ParameterTypes)[keyof typeof ParameterTypes];
