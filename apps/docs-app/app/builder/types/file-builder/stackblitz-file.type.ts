export const StackblitzFileTypes = {
  AngularAppConfig: 'Angular App Config',
  AngularComponent: 'Angular Component',
  AngularService: 'Angular Service',
  ReactCell: 'React Cell',
  ReactComponent: 'React Component',
  ReactMain: 'React Main',
  SvelteCell: 'Svelte Cell',
  SvelteComponent: 'Svelte Component',
  SvelteMain: 'Svelte Main',
  VueCell: 'Vue Cell',
  VueComponent: 'Vue Component',
  VueMain: 'Vue Main'
} as const;

export type StackblitzFileType =
  (typeof StackblitzFileTypes)[keyof typeof StackblitzFileTypes];
