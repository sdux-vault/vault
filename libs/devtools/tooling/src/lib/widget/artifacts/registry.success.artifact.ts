/** Test artifact representing a registry with successfully registered FeatureCells. */
export const REGISTRY_SUCCESS_ARTIFACT = new Map([
  [
    'pipeline-builder',
    {
      key: 'pipeline-builder',
      behaviorsRegistered: true,
      controllersRegistered: true,

      fluentApis: {
        filters: 0,
        reducers: 0,
        beforeTaps: 0,
        afterTaps: 0,
        emitStateCallbacks: 0,
        errorCallbacks: 0
      },

      behaviors: new Map([
        [
          'SDUX::Behavior::Core::AfterTap',
          {
            key: 'SDUX::Behavior::Core::AfterTap',
            type: 'coreAfterTap',
            critical: true,
            needsLicense: false,
            validLicense: 'not-required'
          }
        ],
        [
          'SDUX::Behavior::Core::BeforeTap',
          {
            key: 'SDUX::Behavior::Core::BeforeTap',
            type: 'coreBeforeTap',
            critical: true,
            needsLicense: false,
            validLicense: 'not-required'
          }
        ],
        [
          'SDUX::Behavior::Core::Error',
          {
            key: 'SDUX::Behavior::Core::Error',
            type: 'coreError',
            critical: true,
            needsLicense: false,
            validLicense: 'not-required'
          }
        ],
        [
          'SDUX::Behavior::Core::Filter',
          {
            key: 'SDUX::Behavior::Core::Filter',
            type: 'filter',
            critical: true,
            needsLicense: false,
            validLicense: 'not-required'
          }
        ],
        [
          'SDUX::Behavior::Core::FromObservable',
          {
            key: 'SDUX::Behavior::Core::FromObservable',
            type: 'fromObservable',
            critical: false,
            needsLicense: false,
            validLicense: 'not-required'
          }
        ],
        [
          'SDUX::Behavior::Core::FromPromise',
          {
            key: 'SDUX::Behavior::Core::FromPromise',
            type: 'fromPromise',
            critical: false,
            needsLicense: false,
            validLicense: 'not-required'
          }
        ],
        [
          'SDUX::Behavior::Core::FromStream',
          {
            key: 'SDUX::Behavior::Core::FromStream',
            type: 'fromStream',
            critical: false,
            needsLicense: false,
            validLicense: 'not-required'
          }
        ],
        [
          'SDUX::Behavior::Core::Observable',
          {
            key: 'SDUX::Behavior::Core::Observable',
            type: 'resolve',
            critical: false,
            needsLicense: false,
            validLicense: 'not-required'
          }
        ],
        [
          'SDUX::Behavior::Core::Promise',
          {
            key: 'SDUX::Behavior::Core::Promise',
            type: 'resolve',
            critical: false,
            needsLicense: false,
            validLicense: 'not-required'
          }
        ],
        [
          'SDUX::Behavior::Core::Reducer',
          {
            key: 'SDUX::Behavior::Core::Reducer',
            type: 'reduce',
            critical: true,
            needsLicense: false,
            validLicense: 'not-required'
          }
        ],
        [
          'SDUX::Behavior::Core::Value',
          {
            key: 'SDUX::Behavior::Core::Value',
            type: 'resolve',
            critical: true,
            needsLicense: false,
            validLicense: 'not-required'
          }
        ],
        [
          'SDUX::Behavior::Core::State',
          {
            key: 'SDUX::Behavior::Core::State',
            type: 'coreState',
            critical: true,
            needsLicense: false,
            validLicense: 'not-required'
          }
        ],
        [
          'SDUX::Behavior::Merge::Deep',
          {
            key: 'SDUX::Behavior::Merge::Deep',
            type: 'merge',
            critical: true,
            needsLicense: false,
            validLicense: 'not-required'
          }
        ],
        [
          'SDUX::Behavior::Persist::SessionStorage',
          {
            key: 'SDUX::Behavior::Persist::SessionStorage',
            type: 'persist',
            critical: false,
            needsLicense: false,
            validLicense: 'not-required'
          }
        ]
      ]),

      controllers: new Map([
        [
          'SDUX::Controller::Policy::CoreAbstain',
          {
            key: 'SDUX::Controller::Policy::CoreAbstain',
            type: 'coreAbstain',
            critical: false,
            needsLicense: false,
            validLicense: 'not-required'
          }
        ],
        [
          'SDUX::Controller::Policy::CoreLicense',
          {
            key: 'SDUX::Controller::Policy::CoreLicense',
            type: 'license',
            critical: true,
            needsLicense: false,
            validLicense: 'not-required'
          }
        ],
        [
          'SDUX::Controller::Policy::CoreError',
          {
            key: 'SDUX::Controller::Policy::CoreError',
            type: 'error',
            critical: false,
            needsLicense: false,
            validLicense: 'not-required'
          }
        ]
      ])
    }
  ]
]);
