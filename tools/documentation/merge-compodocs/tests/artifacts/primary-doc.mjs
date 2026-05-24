/**
 * Sample primary (state) Compodoc documentation.json.
 * Minimal representation of the real structure.
 */
export const PRIMARY_DOC = {
  pipes: [],
  interfaces: [
    {
      name: 'FeatureCellConfig',
      id: 'interface-FeatureCellConfig',
      file: 'libs/core/src/lib/feature-cell-config.interface.ts',
      deprecated: false,
      deprecationMessage: '',
      type: 'interface',
      sourceCode: 'export interface FeatureCellConfig {}',
      properties: [],
      indexSignatures: [],
      kind: 165,
      description: '<p>Configuration for a feature cell.</p>',
      rawdescription: 'Configuration for a feature cell.',
      methods: [],
      extends: []
    }
  ],
  injectables: [
    {
      name: 'GlobalErrorService',
      id: 'injectable-GlobalErrorService',
      file: 'libs/core/src/lib/global-error.service.ts',
      deprecated: false,
      deprecationMessage: '',
      type: 'injectable',
      properties: [],
      methods: []
    }
  ],
  guards: [],
  interceptors: [],
  classes: [
    {
      name: 'AbstractActiveController',
      id: 'class-AbstractActiveController',
      file: 'libs/addons/src/lib/controllers/abstract-active.controller.ts',
      deprecated: false,
      deprecationMessage: '',
      type: 'class',
      sourceCode: 'export abstract class AbstractActiveController {}',
      constructorObj: {},
      inputsClass: [],
      outputsClass: [],
      properties: [],
      methods: [],
      indexSignatures: [],
      extends: [],
      hostBindings: [],
      hostListeners: [],
      implements: []
    }
  ],
  directives: [],
  components: [
    {
      name: 'SduxDiagramComponent',
      id: 'component-SduxDiagramComponent',
      file: 'libs/core-extensions/angular/src/lib/sdux-diagram.component.ts',
      deprecated: false,
      deprecationMessage: '',
      type: 'component',
      sourceCode: 'export class SduxDiagramComponent {}',
      selector: 'sdux-diagram',
      providers: [],
      hostBindings: [],
      hostListeners: [],
      inputsClass: [],
      outputsClass: [],
      properties: [],
      methods: []
    }
  ],
  modules: [
    {
      name: 'SduxModule',
      id: 'module-SduxModule',
      file: 'libs/core/src/lib/sdux.module.ts'
    }
  ],
  miscellaneous: {
    variables: [
      {
        name: 'provideFeatureCell',
        ctype: 'miscellaneous',
        subtype: 'variable',
        file: 'libs/core/src/lib/provide-feature-cell.ts',
        deprecated: false,
        deprecationMessage: '',
        type: '',
        defaultValue: '() => {}'
      }
    ],
    functions: [
      {
        name: 'withDebounce',
        file: 'libs/addons/src/lib/behaviors/operators/with-debounce.ts',
        ctype: 'miscellaneous',
        subtype: 'function',
        deprecated: false,
        deprecationMessage: '',
        description: '<p>Applies debounce behavior.</p>',
        args: [],
        jsdoctags: []
      }
    ],
    typealiases: [
      {
        name: 'CellReducer',
        ctype: 'miscellaneous',
        subtype: 'typealias',
        rawtype: '(state: T) => T',
        file: 'libs/core/src/lib/cell-reducer.type.ts',
        deprecated: false,
        deprecationMessage: '',
        description: '',
        kind: 186
      }
    ],
    enumerations: [],
    groupedVariables: {
      'libs/core/src/lib/provide-feature-cell.ts': [
        {
          name: 'provideFeatureCell',
          ctype: 'miscellaneous',
          subtype: 'variable',
          file: 'libs/core/src/lib/provide-feature-cell.ts'
        }
      ]
    }
  },
  routes: {
    name: 'app',
    kind: 'module',
    children: []
  },
  coverage: {
    count: 42,
    status: 'low',
    files: []
  }
};
