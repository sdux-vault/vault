export const COMPODOCS = {
  components: [
    {
      name: 'ValueResolveExampleComponent',
      description:
        '<p>Defines configuration options that control state cache behavior.</p>\n<p>These options specify cache lifetime, entity identification, and\nhow cache misses are resolved through the state pipeline.</p>\n',
      rawdescription:
        '\n\nDefines configuration options that control state cache behavior.\n\nThese options specify cache lifetime, entity identification, and\nhow cache misses are resolved through the state pipeline.\n',
      methods: [
        {
          name: 'ngOnInit',
          args: [],
          returnType: 'void',
          rawdescription:
            'Lifecycle hook that runs once the component is initialized.'
        }
      ],
      properties: [
        {
          name: 'exampleValue',
          rawdescription: 'Example public property exposed by the component.'
        }
      ]
    }
  ],

  classes: [
    {
      name: 'AbstractActiveController',
      deprecated: false,
      deprecationMessage: '',
      type: 'class',
      constructorObj: {
        name: 'constructor',
        description: '',
        deprecated: false,
        deprecationMessage: '',
        args: [
          {
            name: 'key',
            type: 'string',
            deprecated: false,
            deprecationMessage: ''
          },
          {
            name: 'ctx',
            type: 'ControllerClassContext',
            deprecated: false,
            deprecationMessage: ''
          }
        ]
      },
      inputsClass: [],
      outputsClass: [],
      properties: [
        {
          name: '#subscription',
          deprecated: false,
          deprecationMessage: '',
          type: 'Subscription',
          indexKey: '',
          optional: false,
          description: '',
          line: 18,
          modifierKind: [123]
        },
        {
          name: 'critical',
          defaultValue: 'false',
          deprecated: false,
          deprecationMessage: '',
          type: 'unknown',
          indexKey: '',
          optional: false,
          description: '',
          line: 13,
          modifierKind: [148]
        },
        {
          name: 'destroy',
          args: [],
          optional: false,
          returnType: 'void',
          typeParameters: [],
          line: 59,
          deprecated: false,
          deprecationMessage: ''
        },
        {
          name: 'handleMessage',
          args: [
            {
              name: 'msg',
              type: 'ControllerMessageShape<T>',
              deprecated: false,
              deprecationMessage: ''
            }
          ],
          optional: false,
          returnType: 'Observable<ControllerVote | void>',
          typeParameters: [],
          line: 57,
          deprecated: false,
          deprecationMessage: '',
          rawdescription: '\nAll controllers must implement this',
          description: '<p>All controllers must implement this</p>\n',
          modifierKind: [128]
        }
      ],
      indexSignatures: [],
      extends: [],
      hostBindings: [],
      hostListeners: [],
      implements: ['ControllerContract']
    }
  ],
  injectables: [],
  interfaces: [],
  modules: [],
  pipes: [],
  directives: [],

  miscellaneous: {
    functions: [
      {
        name: 'isHttpResourceRef',
        file: 'projects/shared/src/lib/utils/resolve/is-http-resource.util.ts',
        ctype: 'miscellaneous',
        subtype: 'function',
        deprecated: false,
        deprecationMessage: '',
        description:
          '<p>Type guard that determines whether a value is an <code>HttpResourceRef&lt;T&gt;</code>.</p>\n<p>An <code>HttpResourceRef</code> is a structured object produced by Angular’s\n<code>HttpClient</code> resource APIs. It contains a standardized shape used by\nngVault to detect and normalize resource-backed state transitions.</p>\n<p>This utility checks only for the presence of the canonical\n<code>HttpResourceRef</code> fields (<code>value</code>, <code>isLoading</code>, <code>error</code>, <code>hasValue</code>)\nand does not validate the internal content of those properties.</p>\n',
        args: [
          {
            name: 'obj',
            type: 'any',
            deprecated: false,
            deprecationMessage: ''
          }
        ],
        returnType: 'HttpResourceRefShape<T>'
      },
      {
        name: 'VaultBehavior',
        file: 'projects/shared/src/lib/decorators/vault-behavior.decorator.ts',
        ctype: 'miscellaneous',
        subtype: 'function',
        deprecated: false,
        deprecationMessage: '',
        description:
          '<p>Decorator that registers a class as an ngVault behavior.</p>\n<p>The <code>VaultBehavior</code> decorator attaches the provided <code>BehaviorMeta</code>\ndefinition to the target constructor, making the behavior discoverable by\nthe orchestrator during pipeline initialization. Metadata fields such as\n<code>type</code>, <code>key</code>, and <code>critical</code> are also mirrored onto static properties of\nthe decorated class to support lightweight runtime introspection.</p>\n<p>This decorator does not modify method logic or structure; it only assigns\nmetadata required for orchestrator classification and behavior lifecycle\nmanagement.</p>\n',
        args: [
          {
            name: 'meta',
            type: 'BehaviorMetaShape',
            deprecated: false,
            deprecationMessage: ''
          }
        ]
      }
    ],
    groupedVariables: [
      {
        name: 'DevMode',
        ctype: 'miscellaneous',
        subtype: 'variable',
        file: 'projects/shared/src/lib/utils/dev-mode/dev-mode.util.ts',
        deprecated: false,
        deprecationMessage: '',
        type: 'object',
        defaultValue:
          "{\n  get active(): boolean {\n    return devMode === true;\n  },\n\n  setDevMode(isDevMode: boolean): void {\n    if (devMode !== null && !isTestEnv.active) {\n      throw new Error('[vault] DevMode has already been initialized.');\n    }\n\n    devMode = isDevMode;\n  },\n\n  get unitTestActive(): boolean {\n    return unitTestMode === true;\n  },\n\n  setUnitTestMode(isUnitTestMode: boolean): void {\n    unitTestMode = devMode && isUnitTestMode;\n  }\n}"
      },
      {
        name: 'isDefined',
        ctype: 'miscellaneous',
        subtype: 'variable',
        file: 'projects/shared/src/lib/utils/logic/logic.utils.ts',
        deprecated: false,
        deprecationMessage: '',
        type: 'unknown',
        defaultValue: '(current: unknown): boolean => !isUndefined(current)',
        rawdescription:
          'Determines whether a value is defined (not `undefined`).\nNote: This intentionally does *not* exclude `null`.',
        description:
          '<p>Determines whether a value is defined (not <code>undefined</code>).\nNote: This intentionally does <em>not</em> exclude <code>null</code>.</p>\n'
      }
    ],
    variables: [
      {
        name: 'CacheTTL',
        ctype: 'miscellaneous',
        subtype: 'variable',
        file: 'projects/addons/src/lib/behaviors/cache/state-cache/types/cache-ttl.type.ts',
        deprecated: false,
        deprecationMessage: '',
        type: 'unknown',
        defaultValue:
          '{\n  OneMinute: 60_000,\n  FiveMinutes: 300_000,\n  TenMinutes: 600_000,\n  FifteenMinutes: 900_000,\n  ThirtyMinutes: 1_800_000,\n  OneHour: 3_600_000\n} as const',
        rawdescription:
          'Defines supported cache time-to-live durations in milliseconds.\n\nThese values provide fixed expiration intervals used to control cache\nvalidity and refresh behavior.',
        description:
          '<p>Defines supported cache time-to-live durations in milliseconds.</p>\n<p>These values provide fixed expiration intervals used to control cache\nvalidity and refresh behavior.</p>\n'
      },
      {
        name: 'BEHAVIOR_META',
        ctype: 'miscellaneous',
        subtype: 'variable',
        file: 'projects/shared/src/lib/constants/behavior-meta.constant.ts',
        deprecated: false,
        deprecationMessage: '',
        type: 'unknown',
        defaultValue: "Symbol('BEHAVIOR_META')",
        rawdescription:
          'Unique metadata symbol used to associate {@link BehaviorMeta} definitions\nwith behavior classes decorated using `@VaultBehavior`.\n\nThis symbol is applied directly to behavior constructors and is read by\nthe behavior initialization system to determine the behavior’s type,\nkey, criticality, and extension capabilities.\n\nIt functions as the canonical lookup key for all behavior metadata stored\non a behavior class and is required for correct pipeline registration.',
        description:
          '<p>Unique metadata symbol used to associate {@link BehaviorMeta} definitions\nwith behavior classes decorated using <code>@VaultBehavior</code>.</p>\n<p>This symbol is applied directly to behavior constructors and is read by\nthe behavior initialization system to determine the behavior’s type,\nkey, criticality, and extension capabilities.</p>\n<p>It functions as the canonical lookup key for all behavior metadata stored\non a behavior class and is required for correct pipeline registration.</p>\n'
      }
    ],
    enumerations: [],
    typealiases: [
      {
        name: 'BehaviorType',
        ctype: 'miscellaneous',
        subtype: 'typealias',
        rawtype: 'unknown',
        file: 'projects/shared/src/lib/types/behavior/behavior.type.ts',
        deprecated: false,
        deprecationMessage: '',
        description:
          '<p>Union of all valid ngVault behavior type strings.</p>\n<p>This type is derived from <code>BehaviorTypes</code> using literal inference, ensuring\nstrong typing while preserving full runtime compatibility.</p>\n',
        kind: 200
      }
    ]
  }
};
