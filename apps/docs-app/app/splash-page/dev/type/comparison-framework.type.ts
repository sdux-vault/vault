export const ComparisonFrameworkTypes = {
  Angular: 'angular',
  React: 'react',
  Svelte: 'svelte',
  Vue: 'vue'
};

export type ComparisonFrameworkType =
  (typeof ComparisonFrameworkTypes)[keyof typeof ComparisonFrameworkTypes];
