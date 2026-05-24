/** Test artifact representing a registry with edge-case FeatureCell entries. */
export const REGISTRY_EDGE_ARTIFACT = new Map([
  [
    'feature-a',
    {
      key: 'feature-a',
      behaviorsRegistered: true,
      controllersRegistered: true,
      fluentApis: null,
      behaviors: new Map([
        ['b1', { validLicense: 'valid' }],
        ['b2', { validLicense: 'pending' }]
      ]),
      controllers: new Map([
        ['c1', { validLicense: 'revoked' }],
        ['c2', { validLicense: 'timeout' }]
      ])
    }
  ],

  [
    'feature-b',
    {
      key: 'feature-b',
      behaviorsRegistered: true,
      controllersRegistered: true,
      fluentApis: null,
      behaviors: new Map([
        ['b3', { validLicense: 'not-required' }],
        ['b4', { validLicense: 'notrequired' }]
      ]),
      controllers: new Map()
    }
  ],

  // ------------------------------------------------
  // EDGE CASE CELL (covers missing branches)
  // ------------------------------------------------
  [
    'feature-edge',
    {
      key: 'feature-edge',
      behaviorsRegistered: false,
      controllersRegistered: false,
      fluentApis: undefined,

      // triggers: cell.behaviors ? ... : []
      behaviors: undefined,

      // triggers: cell.controllers ? ... : []
      controllers: undefined
    }
  ],

  // ------------------------------------------------
  // LICENSE NULL CASE
  // ------------------------------------------------
  [
    'feature-null-license',
    {
      key: 'feature-null-license',
      behaviorsRegistered: true,
      controllersRegistered: true,
      fluentApis: null,

      behaviors: new Map([['b-null', { validLicense: undefined }]]),

      controllers: new Map([['c-null', { validLicense: null }]])
    }
  ]
]);
