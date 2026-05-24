/**
 * Sample secondary (vault-engine) Compodoc documentation.json.
 * Minimal representation of the real structure.
 */
export const SECONDARY_DOC = {
  pipes: [],
  interfaces: [
    {
      name: 'ArbitratorConfig',
      id: 'interface-ArbitratorConfig',
      file: 'lib/src/arbitrator/arbitrator-config.interface.ts',
      deprecated: false,
      deprecationMessage: '',
      type: 'interface',
      sourceCode: 'export interface ArbitratorConfig {}',
      properties: [],
      indexSignatures: [],
      kind: 165,
      description: '<p>Configuration for the arbitrator.</p>',
      rawdescription: 'Configuration for the arbitrator.',
      methods: [],
      extends: []
    },
    {
      name: 'ConductorOptions',
      id: 'interface-ConductorOptions',
      file: 'lib/src/conductor/conductor-options.interface.ts',
      deprecated: false,
      deprecationMessage: '',
      type: 'interface',
      sourceCode: 'export interface ConductorOptions {}',
      properties: [],
      indexSignatures: [],
      kind: 165,
      description: '<p>Options for the conductor.</p>',
      rawdescription: 'Options for the conductor.',
      methods: [],
      extends: []
    }
  ],
  injectables: [],
  guards: [],
  interceptors: [],
  classes: [
    {
      name: 'Conductor',
      id: 'class-Conductor',
      file: 'lib/src/conductor/conductor.class.ts',
      deprecated: false,
      deprecationMessage: '',
      type: 'class',
      sourceCode: 'export class Conductor {}',
      constructorObj: {},
      inputsClass: [],
      outputsClass: [],
      properties: [],
      methods: [
        {
          name: 'execute',
          args: [],
          returnType: 'void',
          description: '<p>Executes the conductor pipeline.</p>'
        }
      ],
      indexSignatures: [],
      extends: [],
      hostBindings: [],
      hostListeners: [],
      implements: []
    }
  ],
  directives: [],
  components: [],
  modules: [],
  miscellaneous: {
    variables: [
      {
        name: 'DEFAULT_TIMEOUT',
        ctype: 'miscellaneous',
        subtype: 'variable',
        file: 'lib/src/constants/defaults.ts',
        deprecated: false,
        deprecationMessage: '',
        type: 'number',
        defaultValue: '5000'
      }
    ],
    functions: [],
    typealiases: [
      {
        name: 'VoteResult',
        ctype: 'miscellaneous',
        subtype: 'typealias',
        rawtype: "'approve' | 'deny' | 'abstain'",
        file: 'lib/src/arbitrator/vote-result.type.ts',
        deprecated: false,
        deprecationMessage: '',
        description: '',
        kind: 186
      }
    ],
    enumerations: [],
    groupedVariables: {
      'lib/src/constants/defaults.ts': [
        {
          name: 'DEFAULT_TIMEOUT',
          ctype: 'miscellaneous',
          subtype: 'variable',
          file: 'lib/src/constants/defaults.ts'
        }
      ]
    }
  },
  routes: {
    name: 'engine',
    kind: 'module',
    children: []
  },
  coverage: {
    count: 18,
    status: 'low',
    files: []
  }
};
