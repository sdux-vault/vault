import {
  ANGULAR_REDUX_OUTPUT,
  ANGULAR_REDUX_OUTPUT_METADATA
} from '../examples/angular/redux/redux-output';
import {
  ANGULAR_SDUX_OUTPUT,
  ANGULAR_SDUX_OUTPUT_METADATA
} from '../examples/angular/sdux/sdux-output';
import {
  REACT_REDUX_OUTPUT,
  REACT_REDUX_OUTPUT_METADATA
} from '../examples/react/redux/redux-output';
import {
  REACT_SDUX_OUTPUT,
  REACT_SDUX_OUTPUT_METADATA
} from '../examples/react/sdux/sdux-output';
import {
  SVELTE_SDUX_OUTPUT,
  SVELTE_SDUX_OUTPUT_METADATA
} from '../examples/svelte/sdux/sdux-output';
import {
  SVELTE_STORES_OUTPUT,
  SVELTE_STORES_OUTPUT_METADATA
} from '../examples/svelte/stores/stores-output';
import {
  VUE_PINIA_OUTPUT,
  VUE_PINIA_OUTPUT_METADATA
} from '../examples/vue/pinia/pinia-output';
import {
  VUE_SDUX_OUTPUT,
  VUE_SDUX_OUTPUT_METADATA
} from '../examples/vue/sdux/sdux-output';
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
      files: ANGULAR_REDUX_OUTPUT,
      metadata: ANGULAR_REDUX_OUTPUT_METADATA
    },
    right: {
      frameworkLabel: 'Angular',
      libraryLabel: 'SDuX',
      usesSduxBrandName: true,
      files: ANGULAR_SDUX_OUTPUT,
      metadata: ANGULAR_SDUX_OUTPUT_METADATA
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
      files: REACT_REDUX_OUTPUT,
      metadata: REACT_REDUX_OUTPUT_METADATA
    },
    right: {
      frameworkLabel: 'React',
      libraryLabel: 'SDuX',
      usesSduxBrandName: true,
      files: REACT_SDUX_OUTPUT,
      metadata: REACT_SDUX_OUTPUT_METADATA
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
      files: SVELTE_STORES_OUTPUT,
      metadata: SVELTE_STORES_OUTPUT_METADATA
    },
    right: {
      frameworkLabel: 'Svelte',
      libraryLabel: 'SDuX',
      usesSduxBrandName: true,
      files: SVELTE_SDUX_OUTPUT,
      metadata: SVELTE_SDUX_OUTPUT_METADATA
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
      files: VUE_PINIA_OUTPUT,
      metadata: VUE_PINIA_OUTPUT_METADATA
    },
    right: {
      frameworkLabel: 'Vue',
      libraryLabel: 'SDuX',
      usesSduxBrandName: true,
      files: VUE_SDUX_OUTPUT,
      metadata: VUE_SDUX_OUTPUT_METADATA
    }
  }
};
