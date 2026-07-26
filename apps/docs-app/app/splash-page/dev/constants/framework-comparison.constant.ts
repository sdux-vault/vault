import { ComparisonFrameworkType } from '../type/comparison-framework.type';

export const FrameworkComparisonConstant: readonly {
  readonly id: ComparisonFrameworkType;
  readonly label: string;
  readonly subLabel: string;
}[] = [
  { id: 'angular', label: 'Angular', subLabel: 'NgRx vs SDuX' },
  { id: 'react', label: 'React', subLabel: 'Redux vs SDuX' },
  { id: 'svelte', label: 'Svelte', subLabel: 'Stores vs SDuX' },
  { id: 'vue', label: 'Vue', subLabel: 'Pinia vs SDuX' }
];
