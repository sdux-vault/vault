export const StateFrameworkTypes = {
  Angular: 'Angular',
  React: 'React',
  Svelte: 'Svelte',
  Vue: 'Vue'
} as const;

export type StateFrameworkType =
  (typeof StateFrameworkTypes)[keyof typeof StateFrameworkTypes];

export function isStateFrameworkType(
  value: unknown
): value is StateFrameworkType {
  return Object.values(StateFrameworkTypes).includes(
    value as StateFrameworkType
  );
}
