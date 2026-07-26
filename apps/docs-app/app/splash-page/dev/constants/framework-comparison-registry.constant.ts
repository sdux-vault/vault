import { ANGULAR_REDUX_OUTPUT } from '../examples/angular/redux/redux-output';
import { ANGULAR_SDUX_OUTPUT } from '../examples/angular/sdux/sdux-output';
import { REACT_REDUX_OUTPUT } from '../examples/react/redux/redux-output';
import { REACT_SDUX_OUTPUT } from '../examples/react/sdux/sdux-output';
import { SVELTE_SDUX_OUTPUT } from '../examples/svelte/sdux/sdux-output';
import { SVELTE_STORES_OUTPUT } from '../examples/svelte/stores/stores-output';
import { VUE_PINIA_OUTPUT } from '../examples/vue/pinia/pinia-output';
import { VUE_SDUX_OUTPUT } from '../examples/vue/sdux/sdux-output';
import { FrameworkComparisonPairShape } from '../shapes/framework-comparison-pair.shape';
import { ComparisonFrameworkType } from '../type/comparison-framework.type';

export const FrameworkComparisonRegistryConstant: Record<
  ComparisonFrameworkType,
  FrameworkComparisonPairShape
> = {
  angular: {
    id: 'angular',
    selectorLabel: 'Angular',
    sharedSetupFileNames: ['main.ts', 'app.config.ts'],
    displayCeremony: true,
    left: {
      frameworkLabel: 'Angular',
      libraryLabel: 'Redux',
      files: ANGULAR_REDUX_OUTPUT
    },
    right: {
      frameworkLabel: 'Angular',
      libraryLabel: 'SDuX',
      usesSduxBrandName: true,
      files: ANGULAR_SDUX_OUTPUT
    }
  },
  react: {
    id: 'react',
    selectorLabel: 'React',
    sharedSetupFileNames: ['main.tsx'],
    displayCeremony: true,
    left: {
      frameworkLabel: 'React',
      libraryLabel: 'Redux',
      files: REACT_REDUX_OUTPUT
    },
    right: {
      frameworkLabel: 'React',
      libraryLabel: 'SDuX',
      usesSduxBrandName: true,
      files: REACT_SDUX_OUTPUT
    }
  },
  svelte: {
    id: 'svelte',
    selectorLabel: 'Svelte',
    sharedSetupFileNames: ['main.ts', 'App.svelte'],
    displayCeremony: false,
    left: {
      frameworkLabel: 'Svelte',
      libraryLabel: 'Stores',
      files: SVELTE_STORES_OUTPUT
    },
    right: {
      frameworkLabel: 'Svelte',
      libraryLabel: 'SDuX',
      usesSduxBrandName: true,
      files: SVELTE_SDUX_OUTPUT
    }
  },
  vue: {
    id: 'vue',
    selectorLabel: 'Vue',
    sharedSetupFileNames: ['main.ts', 'App.vue'],
    displayCeremony: false,
    left: {
      frameworkLabel: 'Vue',
      libraryLabel: 'Pinia',
      files: VUE_PINIA_OUTPUT
    },
    right: {
      frameworkLabel: 'Vue',
      libraryLabel: 'SDuX',
      usesSduxBrandName: true,
      files: VUE_SDUX_OUTPUT
    }
  }
};
