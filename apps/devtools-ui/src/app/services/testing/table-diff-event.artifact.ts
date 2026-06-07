import { EventShape } from '@sdux-vault/shared';

/**
 * Pipeline event artifact from a running SDuX Vault application.
 * Contains 413 events with candidate snapshots for table diff testing.
 * Traces: 9 unique trace IDs.
 */
export const TABLE_DIFF_EVENT_ARTIFACT: EventShape[] = [
  {
    id: '524176d6-8de0-41de-b7a0-1ddb9cf84235',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'lifecycle:notification:revote',
    timestamp: 1780842686661,
    type: 'lifecycle',
    boundary: 'notification',
    traceId: '6bc87087-8021-44cf-987c-3234a033253f'
  },
  {
    id: 'a33c9052-9745-4981-aaca-5bd268cc3b36',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:start:attempt',
    timestamp: 1780842686662,
    type: 'controller',
    boundary: 'start',
    traceId: '6bc87087-8021-44cf-987c-3234a033253f'
  },
  {
    id: '3955128e-5892-4b82-925e-6d5ab8d7c598',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:start:vote',
    timestamp: 1780842686662,
    type: 'controller',
    boundary: 'start',
    traceId: '6bc87087-8021-44cf-987c-3234a033253f'
  },
  {
    id: '6d0f9518-faa4-4419-bfb6-66f4a5c8d246',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:start:vote',
    timestamp: 1780842686662,
    type: 'controller',
    boundary: 'start',
    traceId: '6bc87087-8021-44cf-987c-3234a033253f'
  },
  {
    id: '857d7431-8a44-456c-8e78-76d87c031537',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:start:vote',
    timestamp: 1780842686662,
    type: 'controller',
    boundary: 'start',
    traceId: '6bc87087-8021-44cf-987c-3234a033253f'
  },
  {
    id: 'c44af45b-90b4-4216-add6-8046281a1b00',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:start:vote',
    timestamp: 1780842686663,
    type: 'controller',
    boundary: 'start',
    traceId: '6bc87087-8021-44cf-987c-3234a033253f'
  },
  {
    id: '0e11ded6-1c0e-4418-88a2-11453692f905',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Delay',
    name: 'controller:start:vote',
    timestamp: 1780842686663,
    type: 'controller',
    boundary: 'start',
    traceId: '6bc87087-8021-44cf-987c-3234a033253f'
  },
  {
    id: 'fd7b14e7-5363-486d-a4a9-a431b9a69e3b',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Stepwise',
    name: 'controller:start:vote',
    timestamp: 1780842686663,
    type: 'controller',
    boundary: 'start',
    traceId: '6bc87087-8021-44cf-987c-3234a033253f'
  },
  {
    id: '12ce7232-890f-4cb3-8b85-bf707e576b4d',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::TabSync',
    name: 'controller:start:vote',
    timestamp: 1780842686663,
    type: 'controller',
    boundary: 'start',
    traceId: '6bc87087-8021-44cf-987c-3234a033253f'
  },
  {
    id: '1816998b-41ed-44bd-9632-f9d71268c8c5',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:end:vote',
    timestamp: 1780842686663,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '6bc87087-8021-44cf-987c-3234a033253f'
  },
  {
    id: '28ed0b83-4bae-4716-85fe-185fa438ed84',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:end:vote',
    timestamp: 1780842686663,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '6bc87087-8021-44cf-987c-3234a033253f'
  },
  {
    id: 'fda0ca2f-2787-436c-b79d-1d27bdd4d994',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:end:vote',
    timestamp: 1780842686663,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '6bc87087-8021-44cf-987c-3234a033253f'
  },
  {
    id: '59827d1e-01a0-4f3e-8426-8ff556445391',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Delay',
    name: 'controller:end:vote',
    timestamp: 1780842686664,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '6bc87087-8021-44cf-987c-3234a033253f'
  },
  {
    id: 'a389d4a2-588c-4f8d-bc02-3aefd8109b96',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Stepwise',
    name: 'controller:end:vote',
    timestamp: 1780842686664,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '6bc87087-8021-44cf-987c-3234a033253f'
  },
  {
    id: '5b2973b4-5c18-4e28-ac97-648a7611abc3',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::TabSync',
    name: 'controller:end:vote',
    timestamp: 1780842686664,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '6bc87087-8021-44cf-987c-3234a033253f'
  },
  {
    id: '94aeb601-0412-43a1-8787-fb30c8b8014a',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:end:vote',
    timestamp: 1780842686664,
    type: 'controller',
    boundary: 'end',
    payload: {
      traceId: '6bc87087-8021-44cf-987c-3234a033253f',
      outcome: 'abstain'
    },
    traceId: '6bc87087-8021-44cf-987c-3234a033253f'
  },
  {
    id: '8c9187ff-d0fd-472b-b736-ef90ff691ddf',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:end:attempt',
    timestamp: 1780842686664,
    type: 'controller',
    boundary: 'end',
    payload: {
      decision: true
    },
    traceId: '6bc87087-8021-44cf-987c-3234a033253f'
  },
  {
    id: '3bba9dc0-1c45-4313-a652-996cc52bd76b',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Persist::LocalStorage',
    name: 'stage:start:load-persist',
    timestamp: 1780842686664,
    type: 'stage',
    boundary: 'start',
    traceId: '6bc87087-8021-44cf-987c-3234a033253f'
  },
  {
    id: '606a1da3-23c5-483c-9881-0eb8873f89af',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Persist::LocalStorage',
    name: 'stage:end:load-persist',
    timestamp: 1780842686664,
    type: 'stage',
    boundary: 'end',
    payload: {
      noop: true
    },
    traceId: '6bc87087-8021-44cf-987c-3234a033253f'
  },
  {
    id: '5e2cd6f1-3efc-4790-b76b-e316496bce44',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:success',
    timestamp: 1780842686665,
    type: 'lifecycle',
    boundary: 'notification',
    traceId: '6bc87087-8021-44cf-987c-3234a033253f'
  },
  {
    id: 'c3b0dcaa-53ed-44cc-9f48-8ce541636bb4',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'conductor:end:attempt',
    timestamp: 1780842686665,
    type: 'conductor',
    boundary: 'end',
    payload: {
      status: 'success'
    },
    traceId: '6bc87087-8021-44cf-987c-3234a033253f'
  },
  {
    id: 'c73173d5-4798-4bbb-91f1-4d71e943262c',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:finalize',
    timestamp: 1780842686665,
    type: 'lifecycle',
    boundary: 'notification',
    traceId: '6bc87087-8021-44cf-987c-3234a033253f'
  },
  {
    id: '0806ed90-c8f8-44bc-9003-4b4456308416',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'conductor:start:attempt',
    timestamp: 1780842689297,
    type: 'conductor',
    boundary: 'start',
    traceId: '7a4fd505-d751-49ab-9ad4-ca05a717565c'
  },
  {
    id: '8c76e0f2-48ce-4582-aae0-20be0ce39aeb',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:start:attempt',
    timestamp: 1780842689298,
    type: 'controller',
    boundary: 'start',
    traceId: '7a4fd505-d751-49ab-9ad4-ca05a717565c'
  },
  {
    id: 'a89fef5c-597a-4293-a24d-78f395ef4c7e',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:start:vote',
    timestamp: 1780842689298,
    type: 'controller',
    boundary: 'start',
    traceId: '7a4fd505-d751-49ab-9ad4-ca05a717565c'
  },
  {
    id: '1478142d-3664-4a29-8e07-f5ef402279c2',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:start:vote',
    timestamp: 1780842689298,
    type: 'controller',
    boundary: 'start',
    traceId: '7a4fd505-d751-49ab-9ad4-ca05a717565c'
  },
  {
    id: '7d570d02-87f2-495d-8d86-3b1e2b56555f',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:start:vote',
    timestamp: 1780842689298,
    type: 'controller',
    boundary: 'start',
    traceId: '7a4fd505-d751-49ab-9ad4-ca05a717565c'
  },
  {
    id: '156c8754-ef70-420b-841b-0f3e003ae62e',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:start:vote',
    timestamp: 1780842689298,
    type: 'controller',
    boundary: 'start',
    traceId: '7a4fd505-d751-49ab-9ad4-ca05a717565c'
  },
  {
    id: 'e4a9cf04-4f7c-478b-a038-5bbd99a576ab',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Delay',
    name: 'controller:start:vote',
    timestamp: 1780842689298,
    type: 'controller',
    boundary: 'start',
    traceId: '7a4fd505-d751-49ab-9ad4-ca05a717565c'
  },
  {
    id: 'c68df7eb-31e9-4afd-8cab-24da35ab0721',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Stepwise',
    name: 'controller:start:vote',
    timestamp: 1780842689298,
    type: 'controller',
    boundary: 'start',
    traceId: '7a4fd505-d751-49ab-9ad4-ca05a717565c'
  },
  {
    id: '56e92564-222a-4749-b52b-d65997960664',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::TabSync',
    name: 'controller:start:vote',
    timestamp: 1780842689298,
    type: 'controller',
    boundary: 'start',
    traceId: '7a4fd505-d751-49ab-9ad4-ca05a717565c'
  },
  {
    id: 'eee9f4ef-3da6-4c16-b567-bd70ac1447c9',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:end:vote',
    timestamp: 1780842689298,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '7a4fd505-d751-49ab-9ad4-ca05a717565c'
  },
  {
    id: 'bdefbade-abe9-4d55-be7a-8bac96370e9e',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:end:vote',
    timestamp: 1780842689299,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '7a4fd505-d751-49ab-9ad4-ca05a717565c'
  },
  {
    id: '7a4d03c5-cc12-4e0c-85cf-9467e3c5818c',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:end:vote',
    timestamp: 1780842689299,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '7a4fd505-d751-49ab-9ad4-ca05a717565c'
  },
  {
    id: '9977fd79-d0f6-43ca-8ea8-1053244f63a9',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Delay',
    name: 'controller:end:vote',
    timestamp: 1780842689299,
    type: 'controller',
    boundary: 'end',
    payload: 'deny',
    traceId: '7a4fd505-d751-49ab-9ad4-ca05a717565c'
  },
  {
    id: 'af908fbf-f1f0-4558-b182-01d26ce4cbd4',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Stepwise',
    name: 'controller:end:vote',
    timestamp: 1780842689299,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '7a4fd505-d751-49ab-9ad4-ca05a717565c'
  },
  {
    id: 'e3eee87d-9e2b-443b-9af3-55924d9e2777',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::TabSync',
    name: 'controller:end:vote',
    timestamp: 1780842689299,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '7a4fd505-d751-49ab-9ad4-ca05a717565c'
  },
  {
    id: 'e99ba6df-f3c9-477f-b98e-9b403cb46d6a',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:end:vote',
    timestamp: 1780842689299,
    type: 'controller',
    boundary: 'end',
    payload: {
      traceId: '7a4fd505-d751-49ab-9ad4-ca05a717565c',
      outcome: 'deny'
    },
    traceId: '7a4fd505-d751-49ab-9ad4-ca05a717565c'
  },
  {
    id: '2e823044-35a8-4cef-9050-ce97a526e950',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'conductor:notification:deny',
    timestamp: 1780842689299,
    type: 'conductor',
    boundary: 'notification',
    traceId: '7a4fd505-d751-49ab-9ad4-ca05a717565c'
  },
  {
    id: '552c665e-a895-4eb0-b5da-ea67db1c3398',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'lifecycle:notification:revote',
    timestamp: 1780842689799,
    type: 'lifecycle',
    boundary: 'notification',
    traceId: '7a4fd505-d751-49ab-9ad4-ca05a717565c'
  },
  {
    id: '52cfb9c3-acc6-4f68-b15d-395eb783dba6',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:start:attempt',
    timestamp: 1780842689800,
    type: 'controller',
    boundary: 'start',
    traceId: '7a4fd505-d751-49ab-9ad4-ca05a717565c'
  },
  {
    id: '59b08ddf-c89c-40b6-8258-7778a1c53046',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:start:vote',
    timestamp: 1780842689800,
    type: 'controller',
    boundary: 'start',
    traceId: '7a4fd505-d751-49ab-9ad4-ca05a717565c'
  },
  {
    id: '34976799-5219-418a-9d15-677aa2f20e1f',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:start:vote',
    timestamp: 1780842689801,
    type: 'controller',
    boundary: 'start',
    traceId: '7a4fd505-d751-49ab-9ad4-ca05a717565c'
  },
  {
    id: 'a0790603-b8d0-4d52-9662-d6b90ab450ef',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:start:vote',
    timestamp: 1780842689801,
    type: 'controller',
    boundary: 'start',
    traceId: '7a4fd505-d751-49ab-9ad4-ca05a717565c'
  },
  {
    id: 'af0e494f-9367-4923-9554-ba65506a3bdd',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:start:vote',
    timestamp: 1780842689801,
    type: 'controller',
    boundary: 'start',
    traceId: '7a4fd505-d751-49ab-9ad4-ca05a717565c'
  },
  {
    id: '027eb076-72ad-43b2-b2a5-69a82152e0fa',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Delay',
    name: 'controller:start:vote',
    timestamp: 1780842689801,
    type: 'controller',
    boundary: 'start',
    traceId: '7a4fd505-d751-49ab-9ad4-ca05a717565c'
  },
  {
    id: '258ca504-1855-4767-935f-206a9f954aa0',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Stepwise',
    name: 'controller:start:vote',
    timestamp: 1780842689801,
    type: 'controller',
    boundary: 'start',
    traceId: '7a4fd505-d751-49ab-9ad4-ca05a717565c'
  },
  {
    id: 'de153f32-e925-4fb8-a33f-d61c1ec2d18b',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::TabSync',
    name: 'controller:start:vote',
    timestamp: 1780842689802,
    type: 'controller',
    boundary: 'start',
    traceId: '7a4fd505-d751-49ab-9ad4-ca05a717565c'
  },
  {
    id: 'de0e855a-2a3f-429e-a2fd-61fb35baa78e',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:end:vote',
    timestamp: 1780842689802,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '7a4fd505-d751-49ab-9ad4-ca05a717565c'
  },
  {
    id: 'd6bfd469-9170-4c1d-9c41-b326a9e12b17',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:end:vote',
    timestamp: 1780842689802,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '7a4fd505-d751-49ab-9ad4-ca05a717565c'
  },
  {
    id: 'f4028221-1b8a-413b-adf4-63a617d27ea1',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:end:vote',
    timestamp: 1780842689802,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '7a4fd505-d751-49ab-9ad4-ca05a717565c'
  },
  {
    id: '4a6eeaaa-edeb-4de4-b44c-50ed2c70a02c',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Delay',
    name: 'controller:end:vote',
    timestamp: 1780842689803,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '7a4fd505-d751-49ab-9ad4-ca05a717565c'
  },
  {
    id: 'a49c2879-1988-48b2-94f7-1272d5529b56',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Stepwise',
    name: 'controller:end:vote',
    timestamp: 1780842689803,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '7a4fd505-d751-49ab-9ad4-ca05a717565c'
  },
  {
    id: 'abe55619-99f4-46d3-8352-ff3427dee35e',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::TabSync',
    name: 'controller:end:vote',
    timestamp: 1780842689803,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '7a4fd505-d751-49ab-9ad4-ca05a717565c'
  },
  {
    id: 'c3c7ade2-9eb3-4bc2-bfdd-aaaf61c7c13d',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:end:vote',
    timestamp: 1780842689803,
    type: 'controller',
    boundary: 'end',
    payload: {
      traceId: '7a4fd505-d751-49ab-9ad4-ca05a717565c',
      outcome: 'abstain'
    },
    traceId: '7a4fd505-d751-49ab-9ad4-ca05a717565c'
  },
  {
    id: '9e2c66b2-0ebf-4405-b69a-e28d3f43427b',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:end:attempt',
    timestamp: 1780842689804,
    type: 'controller',
    boundary: 'end',
    payload: {
      decision: true
    },
    traceId: '7a4fd505-d751-49ab-9ad4-ca05a717565c'
  },
  {
    id: 'ade0b4b4-d3c6-4ad7-a749-08dc64fa37c4',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'pipeline:candidate:pipeline-start',
    timestamp: 1780842689804,
    type: 'pipeline',
    boundary: 'candidate',
    traceId: '7a4fd505-d751-49ab-9ad4-ca05a717565c'
  },
  {
    id: '422134bc-9d3a-4d5a-98c5-5c6d490dbd72',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'lifecycle:start:replace',
    timestamp: 1780842689804,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '7a4fd505-d751-49ab-9ad4-ca05a717565c'
  },
  {
    id: '8d0719a2-0167-41d4-b1b3-41a8c37ae983',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    name: 'stage:start:resolve',
    timestamp: 1780842689804,
    type: 'stage',
    boundary: 'start',
    traceId: '7a4fd505-d751-49ab-9ad4-ca05a717565c'
  },
  {
    id: 'a88d1b9c-9e89-4641-9214-8e87d314266b',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    name: 'stage:end:resolve',
    timestamp: 1780842689805,
    state: {
      isLoading: false,
      error: null,
      hasValue: false
    },
    type: 'stage',
    boundary: 'end',
    traceId: '7a4fd505-d751-49ab-9ad4-ca05a717565c'
  },
  {
    id: '2426cd9e-79d1-4f9c-9a5a-bc2251be7939',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'pipeline:candidate:resolve',
    timestamp: 1780842689805,
    type: 'pipeline',
    boundary: 'candidate',
    candidate: [
      {
        id: 11,
        name: 'Luke',
        lastName: 'Skywalker'
      },
      {
        id: 38,
        name: 'Leia',
        lastName: 'Organa'
      },
      {
        id: 9,
        name: 'Han',
        lastName: 'Solo'
      }
    ],
    traceId: '7a4fd505-d751-49ab-9ad4-ca05a717565c'
  },
  {
    id: '70dd3dc6-1cfa-42b4-ab82-51ff696d5ed7',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Filter',
    name: 'stage:start:filter',
    timestamp: 1780842689805,
    type: 'stage',
    boundary: 'start',
    traceId: '7a4fd505-d751-49ab-9ad4-ca05a717565c'
  },
  {
    id: 'b0915451-f34e-44bc-916e-2d7f6c76eb6d',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Filter',
    name: 'stage:end:filter',
    timestamp: 1780842689806,
    type: 'stage',
    boundary: 'end',
    traceId: '7a4fd505-d751-49ab-9ad4-ca05a717565c'
  },
  {
    id: '2df6b38b-4799-4acc-8daa-573291e671e1',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'pipeline:candidate:filter',
    timestamp: 1780842689806,
    type: 'pipeline',
    boundary: 'candidate',
    candidate: [
      {
        id: 11,
        name: 'Luke',
        lastName: 'Skywalker'
      },
      {
        id: 38,
        name: 'Leia',
        lastName: 'Organa'
      }
    ],
    traceId: '7a4fd505-d751-49ab-9ad4-ca05a717565c'
  },
  {
    id: '50676ee3-f8bb-4243-8fd8-641358b0eb63',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Reducer',
    name: 'stage:start:reducer',
    timestamp: 1780842689806,
    type: 'stage',
    boundary: 'start',
    traceId: '7a4fd505-d751-49ab-9ad4-ca05a717565c'
  },
  {
    id: 'c50c8fac-af66-4677-82cd-c1527d02c1ab',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Reducer',
    name: 'stage:end:reducer',
    timestamp: 1780842689807,
    state: {
      isLoading: false,
      error: null,
      hasValue: false
    },
    type: 'stage',
    boundary: 'end',
    traceId: '7a4fd505-d751-49ab-9ad4-ca05a717565c'
  },
  {
    id: 'a1d8b5c1-f2d8-4275-89dd-bac03e4561bd',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'pipeline:candidate:reducer',
    timestamp: 1780842689807,
    type: 'pipeline',
    boundary: 'candidate',
    candidate: [
      {
        id: 11,
        name: 'Luke',
        lastName: 'Skywalker',
        jedi: true
      },
      {
        id: 38,
        name: 'Leia',
        lastName: 'Organa',
        senator: true
      }
    ],
    traceId: '7a4fd505-d751-49ab-9ad4-ca05a717565c'
  },
  {
    id: '23fccbaa-dbd0-4334-9c1d-83b1037031df',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Encrypt::Aes256',
    name: 'stage:start:encrypt',
    timestamp: 1780842689807,
    type: 'stage',
    boundary: 'start',
    traceId: '7a4fd505-d751-49ab-9ad4-ca05a717565c'
  },
  {
    id: '2887551c-f236-4b78-87ad-6bd3f6917fe9',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Encrypt::Aes256',
    name: 'stage:end:encrypt',
    timestamp: 1780842689825,
    type: 'stage',
    boundary: 'end',
    traceId: '7a4fd505-d751-49ab-9ad4-ca05a717565c'
  },
  {
    id: 'd91a22a1-2881-4c9c-80f1-9a3f00c3a132',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Persist::LocalStorage',
    name: 'stage:start:persist',
    timestamp: 1780842689825,
    type: 'stage',
    boundary: 'start',
    traceId: '7a4fd505-d751-49ab-9ad4-ca05a717565c'
  },
  {
    id: 'fbbe079a-21c9-40c5-b524-6fe64bdfc5d1',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Persist::LocalStorage',
    name: 'stage:end:persist',
    timestamp: 1780842689825,
    type: 'stage',
    boundary: 'end',
    traceId: '7a4fd505-d751-49ab-9ad4-ca05a717565c'
  },
  {
    id: '1dbbddaa-d90b-4370-a109-e722f8b45651',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'lifecycle:end:replace',
    timestamp: 1780842689825,
    state: {
      isLoading: false,
      error: null,
      hasValue: false
    },
    type: 'lifecycle',
    boundary: 'end',
    traceId: '7a4fd505-d751-49ab-9ad4-ca05a717565c'
  },
  {
    id: 'f7dc06b6-65a5-4691-ad6e-5c3371f54acf',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:start:core-state',
    timestamp: 1780842689825,
    type: 'stage',
    boundary: 'start',
    traceId: '7a4fd505-d751-49ab-9ad4-ca05a717565c'
  },
  {
    id: '24d4fc49-0c66-4050-a88b-e1a0411cac3a',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'pipeline:candidate:core-state',
    timestamp: 1780842689826,
    type: 'pipeline',
    boundary: 'candidate',
    candidate: [
      {
        id: 11,
        name: 'Luke',
        lastName: 'Skywalker',
        jedi: true
      },
      {
        id: 38,
        name: 'Leia',
        lastName: 'Organa',
        senator: true
      }
    ],
    traceId: '7a4fd505-d751-49ab-9ad4-ca05a717565c'
  },
  {
    id: 'ce4eacd8-0bab-4d5d-b619-afd0e7b0a5ba',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:end:core-state',
    timestamp: 1780842689826,
    state: {
      isLoading: false,
      value: [
        {
          id: 11,
          name: 'Luke',
          lastName: 'Skywalker',
          jedi: true
        },
        {
          id: 38,
          name: 'Leia',
          lastName: 'Organa',
          senator: true
        }
      ],
      error: null,
      hasValue: true
    },
    type: 'stage',
    boundary: 'end',
    traceId: '7a4fd505-d751-49ab-9ad4-ca05a717565c'
  },
  {
    id: 'b11d77e1-d9e7-4ff3-bd7e-3addf28966c1',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:success',
    timestamp: 1780842689826,
    type: 'lifecycle',
    boundary: 'notification',
    traceId: '7a4fd505-d751-49ab-9ad4-ca05a717565c'
  },
  {
    id: 'c3b9eaac-e974-435f-8109-019fd6471a91',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'conductor:end:attempt',
    timestamp: 1780842689826,
    type: 'conductor',
    boundary: 'end',
    payload: {
      status: 'success'
    },
    traceId: '7a4fd505-d751-49ab-9ad4-ca05a717565c'
  },
  {
    id: 'b0579782-2660-4dd5-bb7d-0e1c587d2e42',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:finalize',
    timestamp: 1780842689826,
    type: 'lifecycle',
    boundary: 'notification',
    traceId: '7a4fd505-d751-49ab-9ad4-ca05a717565c'
  },
  {
    id: '5bf703ab-b7d7-46cc-ac71-30c58cc0452f',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'conductor:start:attempt',
    timestamp: 1780842691930,
    type: 'conductor',
    boundary: 'start',
    traceId: 'f46f2fa8-5e2f-434d-9a5d-608bc648c790'
  },
  {
    id: '56aa45bf-47f0-4528-8a12-15189f1da9b8',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:start:attempt',
    timestamp: 1780842691931,
    type: 'controller',
    boundary: 'start',
    traceId: 'f46f2fa8-5e2f-434d-9a5d-608bc648c790'
  },
  {
    id: '8f5e4762-18f2-4abf-84ca-4bcebc776690',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:start:vote',
    timestamp: 1780842691931,
    type: 'controller',
    boundary: 'start',
    traceId: 'f46f2fa8-5e2f-434d-9a5d-608bc648c790'
  },
  {
    id: '33dc89ec-1ae1-4e22-9fdf-9876fa1a4cdd',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:start:vote',
    timestamp: 1780842691932,
    type: 'controller',
    boundary: 'start',
    traceId: 'f46f2fa8-5e2f-434d-9a5d-608bc648c790'
  },
  {
    id: '3b38b754-7df4-433f-8aff-378f27561ad8',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:start:vote',
    timestamp: 1780842691932,
    type: 'controller',
    boundary: 'start',
    traceId: 'f46f2fa8-5e2f-434d-9a5d-608bc648c790'
  },
  {
    id: 'a5d4933b-9ddc-4f0e-a6b5-1d769ec785f0',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:start:vote',
    timestamp: 1780842691933,
    type: 'controller',
    boundary: 'start',
    traceId: 'f46f2fa8-5e2f-434d-9a5d-608bc648c790'
  },
  {
    id: '6e5c5a4c-29de-439a-9c5b-ea0b39a59a62',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Throttle',
    name: 'controller:start:vote',
    timestamp: 1780842691933,
    type: 'controller',
    boundary: 'start',
    traceId: 'f46f2fa8-5e2f-434d-9a5d-608bc648c790'
  },
  {
    id: '6ef5f84f-2930-44de-8c2c-f947d069cc80',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:end:vote',
    timestamp: 1780842691933,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'f46f2fa8-5e2f-434d-9a5d-608bc648c790'
  },
  {
    id: 'b243cca7-a36d-46db-83c7-9f3645fe922a',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:end:vote',
    timestamp: 1780842691934,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'f46f2fa8-5e2f-434d-9a5d-608bc648c790'
  },
  {
    id: 'a41c5bc4-d592-4e58-b66e-fc91e662f7a0',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:end:vote',
    timestamp: 1780842691934,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'f46f2fa8-5e2f-434d-9a5d-608bc648c790'
  },
  {
    id: '1c545a05-e47b-4ce8-a328-82ceac0b3670',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Throttle',
    name: 'controller:end:vote',
    timestamp: 1780842691934,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'f46f2fa8-5e2f-434d-9a5d-608bc648c790'
  },
  {
    id: '01a10399-f760-4446-aa47-91382b3cd78c',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:end:vote',
    timestamp: 1780842691935,
    type: 'controller',
    boundary: 'end',
    payload: {
      traceId: 'f46f2fa8-5e2f-434d-9a5d-608bc648c790',
      outcome: 'abstain'
    },
    traceId: 'f46f2fa8-5e2f-434d-9a5d-608bc648c790'
  },
  {
    id: '99b5c81c-9b4f-4975-9978-c8025a1e8226',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:end:attempt',
    timestamp: 1780842691935,
    type: 'controller',
    boundary: 'end',
    payload: {
      decision: true
    },
    traceId: 'f46f2fa8-5e2f-434d-9a5d-608bc648c790'
  },
  {
    id: '956a9c7a-cbb2-4b55-b99d-3bd8762e5bbf',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'pipeline:candidate:pipeline-start',
    timestamp: 1780842691935,
    type: 'pipeline',
    boundary: 'candidate',
    candidate: [],
    traceId: 'f46f2fa8-5e2f-434d-9a5d-608bc648c790'
  },
  {
    id: '44487eca-5574-4db9-ab28-ad1df0042ccb',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'lifecycle:start:replace',
    timestamp: 1780842691935,
    type: 'lifecycle',
    boundary: 'start',
    traceId: 'f46f2fa8-5e2f-434d-9a5d-608bc648c790'
  },
  {
    id: '61acafbc-6fc2-4030-b6d9-9ee9706ee336',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    name: 'stage:start:resolve',
    timestamp: 1780842691935,
    type: 'stage',
    boundary: 'start',
    traceId: 'f46f2fa8-5e2f-434d-9a5d-608bc648c790'
  },
  {
    id: '396f4af0-c4e5-4a22-a225-a45c37812af5',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    name: 'stage:end:resolve',
    timestamp: 1780842691935,
    state: {
      isLoading: false,
      value: [],
      error: null,
      hasValue: true
    },
    type: 'stage',
    boundary: 'end',
    traceId: 'f46f2fa8-5e2f-434d-9a5d-608bc648c790'
  },
  {
    id: 'fdfbf082-7fff-4795-8d8d-319a77bb68eb',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'pipeline:candidate:resolve',
    timestamp: 1780842691936,
    type: 'pipeline',
    boundary: 'candidate',
    candidate: [
      {
        id: 1,
        name: 'Jean-Luc',
        lastName: 'Picard'
      },
      {
        id: 2,
        name: 'James T.',
        lastName: 'Kirk'
      },
      {
        id: 13,
        name: 'Wesley',
        lastName: 'Crusher'
      }
    ],
    traceId: 'f46f2fa8-5e2f-434d-9a5d-608bc648c790'
  },
  {
    id: '87884539-3849-4843-84c3-ac811011c868',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Filter',
    name: 'stage:start:filter',
    timestamp: 1780842691936,
    type: 'stage',
    boundary: 'start',
    traceId: 'f46f2fa8-5e2f-434d-9a5d-608bc648c790'
  },
  {
    id: 'acb19776-ce4a-4f77-ae85-53fcf1bbdcac',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Filter',
    name: 'stage:end:filter',
    timestamp: 1780842691936,
    type: 'stage',
    boundary: 'end',
    traceId: 'f46f2fa8-5e2f-434d-9a5d-608bc648c790'
  },
  {
    id: 'b044fbb9-91cd-4602-8059-1ef8299d6ebc',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'pipeline:candidate:filter',
    timestamp: 1780842691936,
    type: 'pipeline',
    boundary: 'candidate',
    candidate: [
      {
        id: 1,
        name: 'Jean-Luc',
        lastName: 'Picard'
      },
      {
        id: 2,
        name: 'James T.',
        lastName: 'Kirk'
      }
    ],
    traceId: 'f46f2fa8-5e2f-434d-9a5d-608bc648c790'
  },
  {
    id: '600c0296-f25a-4dd3-bf6e-06e92d7596d5',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Reducer',
    name: 'stage:start:reducer',
    timestamp: 1780842691936,
    type: 'stage',
    boundary: 'start',
    traceId: 'f46f2fa8-5e2f-434d-9a5d-608bc648c790'
  },
  {
    id: 'a6311857-d2bc-4cac-b114-1d46c9b2a9cd',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Reducer',
    name: 'stage:end:reducer',
    timestamp: 1780842691937,
    state: {
      isLoading: false,
      value: [],
      error: null,
      hasValue: true
    },
    type: 'stage',
    boundary: 'end',
    traceId: 'f46f2fa8-5e2f-434d-9a5d-608bc648c790'
  },
  {
    id: 'f48f1267-22fa-4ab5-9494-51d63baceb7b',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'pipeline:candidate:reducer',
    timestamp: 1780842691937,
    type: 'pipeline',
    boundary: 'candidate',
    candidate: [
      {
        id: 1,
        name: 'Jean-Luc',
        lastName: 'Picard',
        captain: true
      },
      {
        id: 2,
        name: 'James T.',
        lastName: 'Kirk'
      }
    ],
    traceId: 'f46f2fa8-5e2f-434d-9a5d-608bc648c790'
  },
  {
    id: 'd682abd0-a33f-4d42-a2f6-5e8803cc0694',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'lifecycle:end:replace',
    timestamp: 1780842691937,
    state: {
      isLoading: false,
      value: [],
      error: null,
      hasValue: true
    },
    type: 'lifecycle',
    boundary: 'end',
    traceId: 'f46f2fa8-5e2f-434d-9a5d-608bc648c790'
  },
  {
    id: '6b797a8f-0455-4bf2-90b2-d95fa6e2a245',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:start:core-state',
    timestamp: 1780842691938,
    type: 'stage',
    boundary: 'start',
    traceId: 'f46f2fa8-5e2f-434d-9a5d-608bc648c790'
  },
  {
    id: '7a5166e2-ee9b-41c4-a726-e56227bc7c34',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'pipeline:candidate:core-state',
    timestamp: 1780842691938,
    type: 'pipeline',
    boundary: 'candidate',
    candidate: [
      {
        id: 1,
        name: 'Jean-Luc',
        lastName: 'Picard',
        captain: true
      },
      {
        id: 2,
        name: 'James T.',
        lastName: 'Kirk'
      }
    ],
    traceId: 'f46f2fa8-5e2f-434d-9a5d-608bc648c790'
  },
  {
    id: 'd05162d1-8cee-4839-b34a-f997539c6495',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:end:core-state',
    timestamp: 1780842691938,
    state: {
      isLoading: false,
      value: [
        {
          id: 1,
          name: 'Jean-Luc',
          lastName: 'Picard',
          captain: true
        },
        {
          id: 2,
          name: 'James T.',
          lastName: 'Kirk'
        }
      ],
      error: null,
      hasValue: true
    },
    type: 'stage',
    boundary: 'end',
    traceId: 'f46f2fa8-5e2f-434d-9a5d-608bc648c790'
  },
  {
    id: '98c60a2a-641a-4228-8841-ca080fb4ce42',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:success',
    timestamp: 1780842691938,
    type: 'lifecycle',
    boundary: 'notification',
    traceId: 'f46f2fa8-5e2f-434d-9a5d-608bc648c790'
  },
  {
    id: 'f4b0a671-3df0-4dd2-930c-cea148c1ff28',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'conductor:end:attempt',
    timestamp: 1780842691938,
    type: 'conductor',
    boundary: 'end',
    payload: {
      status: 'success'
    },
    traceId: 'f46f2fa8-5e2f-434d-9a5d-608bc648c790'
  },
  {
    id: '76e185ac-5b56-4fa2-8a87-52b0791cf8df',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:finalize',
    timestamp: 1780842691939,
    type: 'lifecycle',
    boundary: 'notification',
    traceId: 'f46f2fa8-5e2f-434d-9a5d-608bc648c790'
  },
  {
    id: 'cc93c343-2b0b-4e19-a4b9-937048399c05',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'conductor:start:attempt',
    timestamp: 1780842693647,
    type: 'conductor',
    boundary: 'start',
    traceId: '31cc7fd5-b763-4fe5-9125-340eb7f2ea83'
  },
  {
    id: '42bcf71f-ef14-4362-9927-4221cf3e6c74',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:start:attempt',
    timestamp: 1780842693648,
    type: 'controller',
    boundary: 'start',
    traceId: '31cc7fd5-b763-4fe5-9125-340eb7f2ea83'
  },
  {
    id: 'ae4d725c-590d-4dc2-9cb2-57595fae736d',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:start:vote',
    timestamp: 1780842693648,
    type: 'controller',
    boundary: 'start',
    traceId: '31cc7fd5-b763-4fe5-9125-340eb7f2ea83'
  },
  {
    id: 'd01475bb-4c75-4640-b6eb-35e4e0a253c5',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:start:vote',
    timestamp: 1780842693648,
    type: 'controller',
    boundary: 'start',
    traceId: '31cc7fd5-b763-4fe5-9125-340eb7f2ea83'
  },
  {
    id: '12682cfe-1175-42ae-bede-15e1f4ff9e57',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:start:vote',
    timestamp: 1780842693648,
    type: 'controller',
    boundary: 'start',
    traceId: '31cc7fd5-b763-4fe5-9125-340eb7f2ea83'
  },
  {
    id: '9506dc65-36c6-489a-a4c4-4ae4710075e2',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:start:vote',
    timestamp: 1780842693649,
    type: 'controller',
    boundary: 'start',
    traceId: '31cc7fd5-b763-4fe5-9125-340eb7f2ea83'
  },
  {
    id: '3c71dfc5-939a-481b-b37b-0b09de681cba',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Throttle',
    name: 'controller:start:vote',
    timestamp: 1780842693649,
    type: 'controller',
    boundary: 'start',
    traceId: '31cc7fd5-b763-4fe5-9125-340eb7f2ea83'
  },
  {
    id: '62862440-577b-4fdc-8c69-ad31f2979c97',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:end:vote',
    timestamp: 1780842693649,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '31cc7fd5-b763-4fe5-9125-340eb7f2ea83'
  },
  {
    id: 'de3bfa62-1caf-47f4-8d79-4e900841b9bc',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:end:vote',
    timestamp: 1780842693649,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '31cc7fd5-b763-4fe5-9125-340eb7f2ea83'
  },
  {
    id: '005c938c-023f-4c8c-9dfc-c362bdc0ef63',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:end:vote',
    timestamp: 1780842693650,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '31cc7fd5-b763-4fe5-9125-340eb7f2ea83'
  },
  {
    id: '2bf3062f-9e08-4f7a-902a-ec1d51e6636a',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Throttle',
    name: 'controller:end:vote',
    timestamp: 1780842693650,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '31cc7fd5-b763-4fe5-9125-340eb7f2ea83'
  },
  {
    id: 'cf37c29e-e283-49c6-b37c-2e7e4a331798',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:end:vote',
    timestamp: 1780842693650,
    type: 'controller',
    boundary: 'end',
    payload: {
      traceId: '31cc7fd5-b763-4fe5-9125-340eb7f2ea83',
      outcome: 'abstain'
    },
    traceId: '31cc7fd5-b763-4fe5-9125-340eb7f2ea83'
  },
  {
    id: '839c03c6-58d4-449a-9280-442cbb25fa97',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:end:attempt',
    timestamp: 1780842693651,
    type: 'controller',
    boundary: 'end',
    payload: {
      decision: true
    },
    traceId: '31cc7fd5-b763-4fe5-9125-340eb7f2ea83'
  },
  {
    id: '5a5f61b7-708a-4e1c-a1f3-b643436b6240',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'pipeline:candidate:pipeline-start',
    timestamp: 1780842693651,
    type: 'pipeline',
    boundary: 'candidate',
    candidate: [
      {
        id: 1,
        name: 'Jean-Luc',
        lastName: 'Picard',
        captain: true
      },
      {
        id: 2,
        name: 'James T.',
        lastName: 'Kirk'
      }
    ],
    traceId: '31cc7fd5-b763-4fe5-9125-340eb7f2ea83'
  },
  {
    id: 'fc555620-7f64-494d-a70d-63d9fa18c8be',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'lifecycle:start:merge',
    timestamp: 1780842693651,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '31cc7fd5-b763-4fe5-9125-340eb7f2ea83'
  },
  {
    id: '452c4935-a33a-401d-8f7d-4e586b46ba06',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    name: 'stage:start:resolve',
    timestamp: 1780842693651,
    type: 'stage',
    boundary: 'start',
    traceId: '31cc7fd5-b763-4fe5-9125-340eb7f2ea83'
  },
  {
    id: '9c795bee-7fde-49c2-b222-24faee1d9ee1',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    name: 'stage:end:resolve',
    timestamp: 1780842693652,
    state: {
      isLoading: false,
      value: [
        {
          id: 1,
          name: 'Jean-Luc',
          lastName: 'Picard',
          captain: true
        },
        {
          id: 2,
          name: 'James T.',
          lastName: 'Kirk'
        }
      ],
      error: null,
      hasValue: true
    },
    type: 'stage',
    boundary: 'end',
    traceId: '31cc7fd5-b763-4fe5-9125-340eb7f2ea83'
  },
  {
    id: '47765184-84e4-4161-b429-577b7c2c7d09',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'pipeline:candidate:resolve',
    timestamp: 1780842693652,
    type: 'pipeline',
    boundary: 'candidate',
    candidate: [
      {
        id: 3,
        name: 'William',
        lastName: 'Riker'
      }
    ],
    traceId: '31cc7fd5-b763-4fe5-9125-340eb7f2ea83'
  },
  {
    id: '030ea54a-f7b4-4493-8ed5-4912501b6974',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:start:compute-merge',
    timestamp: 1780842693652,
    type: 'stage',
    boundary: 'start',
    traceId: '31cc7fd5-b763-4fe5-9125-340eb7f2ea83'
  },
  {
    id: '6b97e592-c38a-481b-87a1-7177dcd84572',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:end:compute-merge',
    timestamp: 1780842693653,
    state: {
      isLoading: false,
      value: [
        {
          id: 1,
          name: 'Jean-Luc',
          lastName: 'Picard',
          captain: true
        },
        {
          id: 2,
          name: 'James T.',
          lastName: 'Kirk'
        }
      ],
      error: null,
      hasValue: true
    },
    type: 'stage',
    boundary: 'end',
    traceId: '31cc7fd5-b763-4fe5-9125-340eb7f2ea83'
  },
  {
    id: '302ad0e5-98a6-4e3b-9b6f-c8ddce5f1c1d',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'pipeline:candidate:compute-merge',
    timestamp: 1780842693653,
    type: 'pipeline',
    boundary: 'candidate',
    candidate: [
      {
        id: 1,
        name: 'Jean-Luc',
        lastName: 'Picard',
        captain: true
      },
      {
        id: 2,
        name: 'James T.',
        lastName: 'Kirk'
      },
      {
        id: 3,
        name: 'William',
        lastName: 'Riker'
      }
    ],
    traceId: '31cc7fd5-b763-4fe5-9125-340eb7f2ea83'
  },
  {
    id: '7c9ec4cf-5020-4451-8248-52a89f5db9c0',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Filter',
    name: 'stage:start:filter',
    timestamp: 1780842693653,
    type: 'stage',
    boundary: 'start',
    traceId: '31cc7fd5-b763-4fe5-9125-340eb7f2ea83'
  },
  {
    id: 'd7592441-c669-4867-80ce-6c1a868c0383',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Filter',
    name: 'stage:end:filter',
    timestamp: 1780842693653,
    type: 'stage',
    boundary: 'end',
    traceId: '31cc7fd5-b763-4fe5-9125-340eb7f2ea83'
  },
  {
    id: '335026a9-810c-4894-82d3-78f7a3358644',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'pipeline:candidate:filter',
    timestamp: 1780842693654,
    type: 'pipeline',
    boundary: 'candidate',
    candidate: [
      {
        id: 1,
        name: 'Jean-Luc',
        lastName: 'Picard',
        captain: true
      },
      {
        id: 2,
        name: 'James T.',
        lastName: 'Kirk'
      },
      {
        id: 3,
        name: 'William',
        lastName: 'Riker'
      }
    ],
    traceId: '31cc7fd5-b763-4fe5-9125-340eb7f2ea83'
  },
  {
    id: '99d2e745-bd82-4735-bd3d-f4e722c5dafa',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Reducer',
    name: 'stage:start:reducer',
    timestamp: 1780842693654,
    type: 'stage',
    boundary: 'start',
    traceId: '31cc7fd5-b763-4fe5-9125-340eb7f2ea83'
  },
  {
    id: '58ad63ba-edaa-41dd-b047-210ffbc0eb87',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Reducer',
    name: 'stage:end:reducer',
    timestamp: 1780842693654,
    state: {
      isLoading: false,
      value: [
        {
          id: 1,
          name: 'Jean-Luc',
          lastName: 'Picard',
          captain: true
        },
        {
          id: 2,
          name: 'James T.',
          lastName: 'Kirk'
        }
      ],
      error: null,
      hasValue: true
    },
    type: 'stage',
    boundary: 'end',
    traceId: '31cc7fd5-b763-4fe5-9125-340eb7f2ea83'
  },
  {
    id: '99d2d4e5-5b89-4c25-ad57-3ede72cd510f',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'pipeline:candidate:reducer',
    timestamp: 1780842693655,
    type: 'pipeline',
    boundary: 'candidate',
    candidate: [
      {
        id: 1,
        name: 'Jean-Luc',
        lastName: 'Picard',
        captain: true
      },
      {
        id: 2,
        name: 'James T.',
        lastName: 'Kirk'
      },
      {
        id: 3,
        name: 'William',
        lastName: 'Riker',
        commander: true
      }
    ],
    traceId: '31cc7fd5-b763-4fe5-9125-340eb7f2ea83'
  },
  {
    id: '6681f923-7e1c-4aa1-94b5-77d3bca33292',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'lifecycle:end:merge',
    timestamp: 1780842693655,
    state: {
      isLoading: false,
      value: [
        {
          id: 1,
          name: 'Jean-Luc',
          lastName: 'Picard',
          captain: true
        },
        {
          id: 2,
          name: 'James T.',
          lastName: 'Kirk'
        }
      ],
      error: null,
      hasValue: true
    },
    type: 'lifecycle',
    boundary: 'end',
    traceId: '31cc7fd5-b763-4fe5-9125-340eb7f2ea83'
  },
  {
    id: 'b9499abd-d393-4cff-9d61-4ca25aec4d55',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:start:core-state',
    timestamp: 1780842693656,
    type: 'stage',
    boundary: 'start',
    traceId: '31cc7fd5-b763-4fe5-9125-340eb7f2ea83'
  },
  {
    id: '271a0271-ae20-4420-afd0-f65ca5e401ff',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'pipeline:candidate:core-state',
    timestamp: 1780842693657,
    type: 'pipeline',
    boundary: 'candidate',
    candidate: [
      {
        id: 1,
        name: 'Jean-Luc',
        lastName: 'Picard',
        captain: true
      },
      {
        id: 2,
        name: 'James T.',
        lastName: 'Kirk'
      },
      {
        id: 3,
        name: 'William',
        lastName: 'Riker',
        commander: true
      }
    ],
    traceId: '31cc7fd5-b763-4fe5-9125-340eb7f2ea83'
  },
  {
    id: 'e1a91938-5d3c-4719-b094-4f55d6b56d6e',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:end:core-state',
    timestamp: 1780842693657,
    state: {
      isLoading: false,
      value: [
        {
          id: 1,
          name: 'Jean-Luc',
          lastName: 'Picard',
          captain: true
        },
        {
          id: 2,
          name: 'James T.',
          lastName: 'Kirk'
        },
        {
          id: 3,
          name: 'William',
          lastName: 'Riker',
          commander: true
        }
      ],
      error: null,
      hasValue: true
    },
    type: 'stage',
    boundary: 'end',
    traceId: '31cc7fd5-b763-4fe5-9125-340eb7f2ea83'
  },
  {
    id: '1cf0d577-cda8-4bd1-a044-d91f0ca175bc',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:success',
    timestamp: 1780842693657,
    type: 'lifecycle',
    boundary: 'notification',
    traceId: '31cc7fd5-b763-4fe5-9125-340eb7f2ea83'
  },
  {
    id: '61acd23f-5afd-4921-acc7-9411d729843c',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'conductor:end:attempt',
    timestamp: 1780842693658,
    type: 'conductor',
    boundary: 'end',
    payload: {
      status: 'success'
    },
    traceId: '31cc7fd5-b763-4fe5-9125-340eb7f2ea83'
  },
  {
    id: 'aaf98ed2-e0d2-40f8-8ff0-d7bc1e61323e',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:finalize',
    timestamp: 1780842693658,
    type: 'lifecycle',
    boundary: 'notification',
    traceId: '31cc7fd5-b763-4fe5-9125-340eb7f2ea83'
  },
  {
    id: '35811aa8-3a16-4e15-a3b7-7e33c4420542',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'conductor:start:attempt',
    timestamp: 1780842694952,
    type: 'conductor',
    boundary: 'start',
    traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f'
  },
  {
    id: '3848735a-985c-4268-aa30-e48a37fee629',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:start:attempt',
    timestamp: 1780842694953,
    type: 'controller',
    boundary: 'start',
    traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f'
  },
  {
    id: '90dd4896-ff68-4a77-9b5a-4aec34d9495c',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:start:vote',
    timestamp: 1780842694953,
    type: 'controller',
    boundary: 'start',
    traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f'
  },
  {
    id: 'a77fee8f-fdac-41f6-97eb-9b36797fc308',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:start:vote',
    timestamp: 1780842694954,
    type: 'controller',
    boundary: 'start',
    traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f'
  },
  {
    id: 'd85a7090-a446-421c-9b6a-e8b99f149269',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:start:vote',
    timestamp: 1780842694954,
    type: 'controller',
    boundary: 'start',
    traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f'
  },
  {
    id: 'af8a2da4-9239-411a-ba9d-dcc5ba530b78',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:start:vote',
    timestamp: 1780842694954,
    type: 'controller',
    boundary: 'start',
    traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f'
  },
  {
    id: 'fbc398c3-aaa5-454b-98df-45a662a2a16c',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Delay',
    name: 'controller:start:vote',
    timestamp: 1780842694955,
    type: 'controller',
    boundary: 'start',
    traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f'
  },
  {
    id: '393f5de3-4e9d-4e58-90dd-7a2eff63af73',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Stepwise',
    name: 'controller:start:vote',
    timestamp: 1780842694955,
    type: 'controller',
    boundary: 'start',
    traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f'
  },
  {
    id: '6d81dc3e-f1a0-4fdb-8e05-2bac04fddc38',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::TabSync',
    name: 'controller:start:vote',
    timestamp: 1780842694955,
    type: 'controller',
    boundary: 'start',
    traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f'
  },
  {
    id: '995fb497-7ac4-4878-be0b-32d08fff3d8c',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:end:vote',
    timestamp: 1780842694956,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f'
  },
  {
    id: 'b4e68789-9905-49c9-baf3-e9a34204c868',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:end:vote',
    timestamp: 1780842694956,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f'
  },
  {
    id: 'c76811d2-c531-4336-b3f9-13b19364fd1a',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:end:vote',
    timestamp: 1780842694956,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f'
  },
  {
    id: 'a6919474-b20d-4fa6-95a4-5bfb3a3d6e38',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Delay',
    name: 'controller:end:vote',
    timestamp: 1780842694957,
    type: 'controller',
    boundary: 'end',
    payload: 'deny',
    traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f'
  },
  {
    id: '0897fc99-02ee-4efc-b76e-378f46d2e98f',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Stepwise',
    name: 'controller:end:vote',
    timestamp: 1780842694957,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f'
  },
  {
    id: '6773e38e-90de-4440-815d-4502215bf56f',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::TabSync',
    name: 'controller:end:vote',
    timestamp: 1780842694957,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f'
  },
  {
    id: 'ed5acb56-fb68-4be8-9d76-c66f1b4ff808',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:end:vote',
    timestamp: 1780842694958,
    type: 'controller',
    boundary: 'end',
    payload: {
      traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f',
      outcome: 'deny'
    },
    traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f'
  },
  {
    id: 'e0b13b73-8216-49ef-9dd3-5c0e7746f701',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'conductor:notification:deny',
    timestamp: 1780842694958,
    type: 'conductor',
    boundary: 'notification',
    traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f'
  },
  {
    id: 'bd87569a-18aa-425a-b030-7bef3b6b315f',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'lifecycle:notification:revote',
    timestamp: 1780842695456,
    type: 'lifecycle',
    boundary: 'notification',
    traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f'
  },
  {
    id: 'a09645dc-ce26-4947-a1f3-df483e60f3c4',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:start:attempt',
    timestamp: 1780842695457,
    type: 'controller',
    boundary: 'start',
    traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f'
  },
  {
    id: '130d287f-0538-4ec2-9811-47406b8b24f6',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:start:vote',
    timestamp: 1780842695457,
    type: 'controller',
    boundary: 'start',
    traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f'
  },
  {
    id: 'e24fd33c-5c57-443f-a04b-b382d2abf329',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:start:vote',
    timestamp: 1780842695458,
    type: 'controller',
    boundary: 'start',
    traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f'
  },
  {
    id: '2d7ac344-ba9e-4ce5-8d2c-c6c1fe595ab5',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:start:vote',
    timestamp: 1780842695459,
    type: 'controller',
    boundary: 'start',
    traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f'
  },
  {
    id: '68e03cfd-3358-4b4b-bf73-0b6d292b8e27',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:start:vote',
    timestamp: 1780842695459,
    type: 'controller',
    boundary: 'start',
    traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f'
  },
  {
    id: 'bc0be90d-ab3a-4e0f-bbd8-c8454d9abd6d',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Delay',
    name: 'controller:start:vote',
    timestamp: 1780842695460,
    type: 'controller',
    boundary: 'start',
    traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f'
  },
  {
    id: '23eee2c9-8000-47ca-b0a7-8d82bde36685',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Stepwise',
    name: 'controller:start:vote',
    timestamp: 1780842695461,
    type: 'controller',
    boundary: 'start',
    traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f'
  },
  {
    id: 'f7ad399b-af8c-4feb-83f6-f6e8484e6a0b',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::TabSync',
    name: 'controller:start:vote',
    timestamp: 1780842695462,
    type: 'controller',
    boundary: 'start',
    traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f'
  },
  {
    id: '6d04c8ca-8092-4ec6-bd4b-35eeee7eb96a',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:end:vote',
    timestamp: 1780842695462,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f'
  },
  {
    id: '8c914d45-072d-4afd-832f-dd735fd5861f',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:end:vote',
    timestamp: 1780842695463,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f'
  },
  {
    id: 'fab5ecb4-71b3-4626-830c-7b344c36f4af',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:end:vote',
    timestamp: 1780842695463,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f'
  },
  {
    id: 'ad219cf0-2396-4f70-9475-f0cd796e1e82',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Delay',
    name: 'controller:end:vote',
    timestamp: 1780842695464,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f'
  },
  {
    id: 'dddc8139-7be7-44f6-9386-5ef159151d3c',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Stepwise',
    name: 'controller:end:vote',
    timestamp: 1780842695464,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f'
  },
  {
    id: 'e550b93c-6692-40a1-afbf-3dab8eff92b9',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::TabSync',
    name: 'controller:end:vote',
    timestamp: 1780842695464,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f'
  },
  {
    id: '9689f369-48be-42bd-b420-bfe8b5ae7fb8',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:end:vote',
    timestamp: 1780842695464,
    type: 'controller',
    boundary: 'end',
    payload: {
      traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f',
      outcome: 'abstain'
    },
    traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f'
  },
  {
    id: 'f0ea5373-47ba-4bd6-8f4c-95072e48537a',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:end:attempt',
    timestamp: 1780842695465,
    type: 'controller',
    boundary: 'end',
    payload: {
      decision: true
    },
    traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f'
  },
  {
    id: '993c1c47-c4d5-4556-9aa5-cc40046485de',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'pipeline:candidate:pipeline-start',
    timestamp: 1780842695465,
    type: 'pipeline',
    boundary: 'candidate',
    candidate: [
      {
        id: 11,
        name: 'Luke',
        lastName: 'Skywalker',
        jedi: true
      },
      {
        id: 38,
        name: 'Leia',
        lastName: 'Organa',
        senator: true
      }
    ],
    traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f'
  },
  {
    id: '16ba964a-1a8e-4a92-b379-18369bd7cb98',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'lifecycle:start:merge',
    timestamp: 1780842695466,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f'
  },
  {
    id: '98be5a2e-42a5-4614-be2d-27e3a6a33b0d',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    name: 'stage:start:resolve',
    timestamp: 1780842695466,
    type: 'stage',
    boundary: 'start',
    traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f'
  },
  {
    id: '39b6bb21-6759-408a-8cc9-5c92299a8214',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    name: 'stage:end:resolve',
    timestamp: 1780842695466,
    state: {
      isLoading: false,
      value: [
        {
          id: 11,
          name: 'Luke',
          lastName: 'Skywalker',
          jedi: true
        },
        {
          id: 38,
          name: 'Leia',
          lastName: 'Organa',
          senator: true
        }
      ],
      error: null,
      hasValue: true
    },
    type: 'stage',
    boundary: 'end',
    traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f'
  },
  {
    id: '198222b5-9a81-456a-bb63-f11dd3d17998',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'pipeline:candidate:resolve',
    timestamp: 1780842695467,
    type: 'pipeline',
    boundary: 'candidate',
    candidate: [
      {
        id: 11,
        name: 'Luke',
        lastName: 'Skywalker',
        jedi: true
      },
      {
        id: 38,
        name: 'Leia',
        lastName: 'Organa',
        senator: true
      },
      {
        id: 4,
        name: 'Obi-Wan',
        lastName: 'Kenobi'
      }
    ],
    traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f'
  },
  {
    id: 'b647b208-0f4b-4305-b2ab-2f8680764b38',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:start:compute-merge',
    timestamp: 1780842695467,
    type: 'stage',
    boundary: 'start',
    traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f'
  },
  {
    id: '9896d05d-9bbe-430c-b7fa-5da511f72c10',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:end:compute-merge',
    timestamp: 1780842695468,
    state: {
      isLoading: false,
      value: [
        {
          id: 11,
          name: 'Luke',
          lastName: 'Skywalker',
          jedi: true
        },
        {
          id: 38,
          name: 'Leia',
          lastName: 'Organa',
          senator: true
        }
      ],
      error: null,
      hasValue: true
    },
    type: 'stage',
    boundary: 'end',
    traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f'
  },
  {
    id: '292a2634-95db-4f78-bc99-2814ed64dbe5',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'pipeline:candidate:compute-merge',
    timestamp: 1780842695468,
    type: 'pipeline',
    boundary: 'candidate',
    candidate: [
      {
        id: 11,
        name: 'Luke',
        lastName: 'Skywalker',
        jedi: true
      },
      {
        id: 38,
        name: 'Leia',
        lastName: 'Organa',
        senator: true
      },
      {
        id: 4,
        name: 'Obi-Wan',
        lastName: 'Kenobi'
      }
    ],
    traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f'
  },
  {
    id: 'bca26d5d-9241-473e-b8fd-6793f119c849',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Filter',
    name: 'stage:start:filter',
    timestamp: 1780842695468,
    type: 'stage',
    boundary: 'start',
    traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f'
  },
  {
    id: 'bb66899b-dbad-43ee-b8ae-233d2326a79a',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Filter',
    name: 'stage:end:filter',
    timestamp: 1780842695469,
    type: 'stage',
    boundary: 'end',
    traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f'
  },
  {
    id: '9281728b-455f-45d7-98ca-e8ceee14a312',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'pipeline:candidate:filter',
    timestamp: 1780842695469,
    type: 'pipeline',
    boundary: 'candidate',
    candidate: [
      {
        id: 11,
        name: 'Luke',
        lastName: 'Skywalker',
        jedi: true
      },
      {
        id: 38,
        name: 'Leia',
        lastName: 'Organa',
        senator: true
      },
      {
        id: 4,
        name: 'Obi-Wan',
        lastName: 'Kenobi'
      }
    ],
    traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f'
  },
  {
    id: 'a33882e1-0e8e-4828-83d0-f49cec716da6',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Reducer',
    name: 'stage:start:reducer',
    timestamp: 1780842695470,
    type: 'stage',
    boundary: 'start',
    traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f'
  },
  {
    id: '47bca11b-3847-49c2-9123-63f554b92bb1',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Reducer',
    name: 'stage:end:reducer',
    timestamp: 1780842695470,
    state: {
      isLoading: false,
      value: [
        {
          id: 11,
          name: 'Luke',
          lastName: 'Skywalker',
          jedi: true
        },
        {
          id: 38,
          name: 'Leia',
          lastName: 'Organa',
          senator: true
        }
      ],
      error: null,
      hasValue: true
    },
    type: 'stage',
    boundary: 'end',
    traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f'
  },
  {
    id: '64f2e55e-d73e-4562-abfe-642aa42c859e',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'pipeline:candidate:reducer',
    timestamp: 1780842695470,
    type: 'pipeline',
    boundary: 'candidate',
    candidate: [
      {
        id: 11,
        name: 'Luke',
        lastName: 'Skywalker',
        jedi: true
      },
      {
        id: 38,
        name: 'Leia',
        lastName: 'Organa',
        senator: true
      },
      {
        id: 4,
        name: 'Obi-Wan',
        lastName: 'Kenobi'
      }
    ],
    traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f'
  },
  {
    id: '42d27651-9a37-4374-a4d6-3ea03be4ec5a',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Encrypt::Aes256',
    name: 'stage:start:encrypt',
    timestamp: 1780842695471,
    type: 'stage',
    boundary: 'start',
    traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f'
  },
  {
    id: '5d416df3-38e2-4f7f-bc87-2c1ff217fbf2',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Encrypt::Aes256',
    name: 'stage:end:encrypt',
    timestamp: 1780842695471,
    type: 'stage',
    boundary: 'end',
    traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f'
  },
  {
    id: 'ac4f5010-62a5-427e-adb2-6199afa3af28',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Persist::LocalStorage',
    name: 'stage:start:persist',
    timestamp: 1780842695473,
    type: 'stage',
    boundary: 'start',
    traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f'
  },
  {
    id: '3860fa31-5e8f-467a-bbff-4de13d227884',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Persist::LocalStorage',
    name: 'stage:end:persist',
    timestamp: 1780842695473,
    type: 'stage',
    boundary: 'end',
    traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f'
  },
  {
    id: 'a33254a0-79d9-4037-8e21-63016b0ffa8a',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'lifecycle:end:merge',
    timestamp: 1780842695473,
    state: {
      isLoading: false,
      value: [
        {
          id: 11,
          name: 'Luke',
          lastName: 'Skywalker',
          jedi: true
        },
        {
          id: 38,
          name: 'Leia',
          lastName: 'Organa',
          senator: true
        }
      ],
      error: null,
      hasValue: true
    },
    type: 'lifecycle',
    boundary: 'end',
    traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f'
  },
  {
    id: '0dec1462-04ad-4b91-b214-74008c4943fc',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:start:core-state',
    timestamp: 1780842695474,
    type: 'stage',
    boundary: 'start',
    traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f'
  },
  {
    id: '36674622-83a1-4e92-b118-af7f2883a75b',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'pipeline:candidate:core-state',
    timestamp: 1780842695474,
    type: 'pipeline',
    boundary: 'candidate',
    candidate: [
      {
        id: 11,
        name: 'Luke',
        lastName: 'Skywalker',
        jedi: true
      },
      {
        id: 38,
        name: 'Leia',
        lastName: 'Organa',
        senator: true
      },
      {
        id: 4,
        name: 'Obi-Wan',
        lastName: 'Kenobi'
      }
    ],
    traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f'
  },
  {
    id: '018d4824-4e4d-4c2a-9148-a4caf9604ace',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:end:core-state',
    timestamp: 1780842695475,
    state: {
      isLoading: false,
      value: [
        {
          id: 11,
          name: 'Luke',
          lastName: 'Skywalker',
          jedi: true
        },
        {
          id: 38,
          name: 'Leia',
          lastName: 'Organa',
          senator: true
        },
        {
          id: 4,
          name: 'Obi-Wan',
          lastName: 'Kenobi'
        }
      ],
      error: null,
      hasValue: true
    },
    type: 'stage',
    boundary: 'end',
    traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f'
  },
  {
    id: '2b3e1e0c-e0ff-43be-8037-76f9906edcee',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:success',
    timestamp: 1780842695475,
    type: 'lifecycle',
    boundary: 'notification',
    traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f'
  },
  {
    id: '6325b16e-43be-4d2f-8dc8-52a1c92581f0',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'conductor:end:attempt',
    timestamp: 1780842695475,
    type: 'conductor',
    boundary: 'end',
    payload: {
      status: 'success'
    },
    traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f'
  },
  {
    id: '90ad6b82-5106-4bb6-95a4-a4717cf21baf',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:finalize',
    timestamp: 1780842695476,
    type: 'lifecycle',
    boundary: 'notification',
    traceId: '70235c41-455e-48b4-99d9-3d5469e25b9f'
  },
  {
    id: '0d0db773-d0eb-4cb4-aafe-50cd69ce6961',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'conductor:start:attempt',
    timestamp: 1780842696813,
    type: 'conductor',
    boundary: 'start',
    traceId: '97ea93d4-6396-486e-b171-c85f6a66285f'
  },
  {
    id: '96b0bc8c-e568-4b42-a08c-495df3e69b60',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:start:attempt',
    timestamp: 1780842696814,
    type: 'controller',
    boundary: 'start',
    traceId: '97ea93d4-6396-486e-b171-c85f6a66285f'
  },
  {
    id: '82a375e2-eb43-493b-834c-a1a3aad76bdb',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:start:vote',
    timestamp: 1780842696815,
    type: 'controller',
    boundary: 'start',
    traceId: '97ea93d4-6396-486e-b171-c85f6a66285f'
  },
  {
    id: 'c0247ced-21ac-4c14-9a1d-1435127716fc',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:start:vote',
    timestamp: 1780842696815,
    type: 'controller',
    boundary: 'start',
    traceId: '97ea93d4-6396-486e-b171-c85f6a66285f'
  },
  {
    id: 'd89d767a-fd59-4ce9-86ac-d5f374d0602a',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:start:vote',
    timestamp: 1780842696816,
    type: 'controller',
    boundary: 'start',
    traceId: '97ea93d4-6396-486e-b171-c85f6a66285f'
  },
  {
    id: '9d7fd997-0690-4ff2-84e6-f6bdad83e694',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:start:vote',
    timestamp: 1780842696816,
    type: 'controller',
    boundary: 'start',
    traceId: '97ea93d4-6396-486e-b171-c85f6a66285f'
  },
  {
    id: '870e5f78-2603-4c51-923f-cab59e769401',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Delay',
    name: 'controller:start:vote',
    timestamp: 1780842696816,
    type: 'controller',
    boundary: 'start',
    traceId: '97ea93d4-6396-486e-b171-c85f6a66285f'
  },
  {
    id: '5addfab8-e1b9-44db-9534-273ea1f56997',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Stepwise',
    name: 'controller:start:vote',
    timestamp: 1780842696817,
    type: 'controller',
    boundary: 'start',
    traceId: '97ea93d4-6396-486e-b171-c85f6a66285f'
  },
  {
    id: '18c13626-62ae-42e8-97c2-2d12a8ded724',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::TabSync',
    name: 'controller:start:vote',
    timestamp: 1780842696817,
    type: 'controller',
    boundary: 'start',
    traceId: '97ea93d4-6396-486e-b171-c85f6a66285f'
  },
  {
    id: '846dbb37-a866-49fd-b0fc-52370e466781',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:end:vote',
    timestamp: 1780842696818,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '97ea93d4-6396-486e-b171-c85f6a66285f'
  },
  {
    id: '6562dcee-6d59-419c-aa5f-0a20d56df168',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:end:vote',
    timestamp: 1780842696818,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '97ea93d4-6396-486e-b171-c85f6a66285f'
  },
  {
    id: 'b2467a56-cefb-4d5f-8428-b45519a18e25',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:end:vote',
    timestamp: 1780842696819,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '97ea93d4-6396-486e-b171-c85f6a66285f'
  },
  {
    id: '0ab14386-6900-4746-90fd-eef1e10784dc',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Delay',
    name: 'controller:end:vote',
    timestamp: 1780842696819,
    type: 'controller',
    boundary: 'end',
    payload: 'deny',
    traceId: '97ea93d4-6396-486e-b171-c85f6a66285f'
  },
  {
    id: '0bd8f3d6-4ff4-4e2a-93b2-700a12c929b3',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Stepwise',
    name: 'controller:end:vote',
    timestamp: 1780842696820,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '97ea93d4-6396-486e-b171-c85f6a66285f'
  },
  {
    id: '6911c9d2-d388-4efb-89c8-724e7d13c8f9',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::TabSync',
    name: 'controller:end:vote',
    timestamp: 1780842696820,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '97ea93d4-6396-486e-b171-c85f6a66285f'
  },
  {
    id: 'c69dc895-c052-4ac2-956e-59b547d3f380',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:end:vote',
    timestamp: 1780842696820,
    type: 'controller',
    boundary: 'end',
    payload: {
      traceId: '97ea93d4-6396-486e-b171-c85f6a66285f',
      outcome: 'deny'
    },
    traceId: '97ea93d4-6396-486e-b171-c85f6a66285f'
  },
  {
    id: 'dcc982f1-9724-403b-bf59-b44ab4a9ab6d',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'conductor:notification:deny',
    timestamp: 1780842696821,
    type: 'conductor',
    boundary: 'notification',
    traceId: '97ea93d4-6396-486e-b171-c85f6a66285f'
  },
  {
    id: 'd9f3c6b0-bb7b-4a6f-a9d0-a6ae78e0a3f9',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'lifecycle:notification:revote',
    timestamp: 1780842697318,
    type: 'lifecycle',
    boundary: 'notification',
    traceId: '97ea93d4-6396-486e-b171-c85f6a66285f'
  },
  {
    id: 'd1210dc6-c247-49c6-897b-600919bc97dd',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:start:attempt',
    timestamp: 1780842697319,
    type: 'controller',
    boundary: 'start',
    traceId: '97ea93d4-6396-486e-b171-c85f6a66285f'
  },
  {
    id: '728a2ee3-68e3-4391-afc9-0f4ad4dc3401',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:start:vote',
    timestamp: 1780842697320,
    type: 'controller',
    boundary: 'start',
    traceId: '97ea93d4-6396-486e-b171-c85f6a66285f'
  },
  {
    id: 'f60e2b4a-6d84-486e-96f3-78b1aeb08a78',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:start:vote',
    timestamp: 1780842697321,
    type: 'controller',
    boundary: 'start',
    traceId: '97ea93d4-6396-486e-b171-c85f6a66285f'
  },
  {
    id: 'a53fa881-0646-49dc-a43f-e85e08aef340',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:start:vote',
    timestamp: 1780842697321,
    type: 'controller',
    boundary: 'start',
    traceId: '97ea93d4-6396-486e-b171-c85f6a66285f'
  },
  {
    id: 'c6b4e4ca-4c96-43e7-bca1-faafc80b3889',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:start:vote',
    timestamp: 1780842697322,
    type: 'controller',
    boundary: 'start',
    traceId: '97ea93d4-6396-486e-b171-c85f6a66285f'
  },
  {
    id: '766c5586-3dcb-47ef-a861-b8f5a5156ddc',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Delay',
    name: 'controller:start:vote',
    timestamp: 1780842697322,
    type: 'controller',
    boundary: 'start',
    traceId: '97ea93d4-6396-486e-b171-c85f6a66285f'
  },
  {
    id: 'abc3d187-ebb5-4bef-a667-fe952f064fa9',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Stepwise',
    name: 'controller:start:vote',
    timestamp: 1780842697323,
    type: 'controller',
    boundary: 'start',
    traceId: '97ea93d4-6396-486e-b171-c85f6a66285f'
  },
  {
    id: '685377a3-8bc8-404a-bf6e-0694904549b4',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::TabSync',
    name: 'controller:start:vote',
    timestamp: 1780842697323,
    type: 'controller',
    boundary: 'start',
    traceId: '97ea93d4-6396-486e-b171-c85f6a66285f'
  },
  {
    id: '42d4e400-1760-4839-b9b7-52d2f9e64c26',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:end:vote',
    timestamp: 1780842697324,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '97ea93d4-6396-486e-b171-c85f6a66285f'
  },
  {
    id: 'e657bfff-0f34-4ee9-8205-48f71e2a3c02',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:end:vote',
    timestamp: 1780842697324,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '97ea93d4-6396-486e-b171-c85f6a66285f'
  },
  {
    id: '57efd880-8e16-43dd-b0f0-f3eaaa0dcace',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:end:vote',
    timestamp: 1780842697325,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '97ea93d4-6396-486e-b171-c85f6a66285f'
  },
  {
    id: '8ed01620-f330-46d8-af6c-ee40b20faa05',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Delay',
    name: 'controller:end:vote',
    timestamp: 1780842697325,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '97ea93d4-6396-486e-b171-c85f6a66285f'
  },
  {
    id: 'bccf0c46-31ae-4f6a-8f21-18ed3eedd9bd',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Stepwise',
    name: 'controller:end:vote',
    timestamp: 1780842697326,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '97ea93d4-6396-486e-b171-c85f6a66285f'
  },
  {
    id: '9971e548-2b6b-4a7a-bcfa-80dca830cbfd',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::TabSync',
    name: 'controller:end:vote',
    timestamp: 1780842697326,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '97ea93d4-6396-486e-b171-c85f6a66285f'
  },
  {
    id: 'c7b12c83-680a-4ed6-acc0-41df09df7dfb',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:end:vote',
    timestamp: 1780842697326,
    type: 'controller',
    boundary: 'end',
    payload: {
      traceId: '97ea93d4-6396-486e-b171-c85f6a66285f',
      outcome: 'abstain'
    },
    traceId: '97ea93d4-6396-486e-b171-c85f6a66285f'
  },
  {
    id: '575163e0-58ae-4ee2-9bd8-c59b549b723d',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:end:attempt',
    timestamp: 1780842697327,
    type: 'controller',
    boundary: 'end',
    payload: {
      decision: true
    },
    traceId: '97ea93d4-6396-486e-b171-c85f6a66285f'
  },
  {
    id: '0402fef4-8a70-4579-95ca-896109448f0b',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'pipeline:candidate:pipeline-start',
    timestamp: 1780842697328,
    type: 'pipeline',
    boundary: 'candidate',
    candidate: [
      {
        id: 11,
        name: 'Luke',
        lastName: 'Skywalker',
        jedi: true
      },
      {
        id: 38,
        name: 'Leia',
        lastName: 'Organa',
        senator: true
      },
      {
        id: 4,
        name: 'Obi-Wan',
        lastName: 'Kenobi'
      }
    ],
    traceId: '97ea93d4-6396-486e-b171-c85f6a66285f'
  },
  {
    id: 'fe8aa54f-36d2-4a44-b3ae-98c4eaa4702f',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'lifecycle:start:merge',
    timestamp: 1780842697328,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '97ea93d4-6396-486e-b171-c85f6a66285f'
  },
  {
    id: 'dab3e79d-9ee7-4b28-93b3-7fb9b3e86271',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    name: 'stage:start:resolve',
    timestamp: 1780842697329,
    type: 'stage',
    boundary: 'start',
    traceId: '97ea93d4-6396-486e-b171-c85f6a66285f'
  },
  {
    id: 'fbf8106f-ef7c-4f27-aa25-e8c9cdb2aad2',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    name: 'stage:end:resolve',
    timestamp: 1780842697329,
    state: {
      isLoading: false,
      value: [
        {
          id: 11,
          name: 'Luke',
          lastName: 'Skywalker',
          jedi: true
        },
        {
          id: 38,
          name: 'Leia',
          lastName: 'Organa',
          senator: true
        },
        {
          id: 4,
          name: 'Obi-Wan',
          lastName: 'Kenobi'
        }
      ],
      error: null,
      hasValue: true
    },
    type: 'stage',
    boundary: 'end',
    traceId: '97ea93d4-6396-486e-b171-c85f6a66285f'
  },
  {
    id: 'f343a178-2ab0-4f7f-9c09-9d06976d0187',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'pipeline:candidate:resolve',
    timestamp: 1780842697330,
    type: 'pipeline',
    boundary: 'candidate',
    candidate: [
      {
        id: 11,
        name: 'Luke',
        lastName: 'Skywalker',
        jedi: true
      },
      {
        id: 38,
        name: 'Leia',
        lastName: 'Organa',
        senator: true
      },
      {
        id: 4,
        name: 'Obi-Wan',
        lastName: 'Kenobi'
      },
      {
        id: 5,
        name: 'Darth',
        lastName: 'Vader'
      }
    ],
    traceId: '97ea93d4-6396-486e-b171-c85f6a66285f'
  },
  {
    id: '54ae66b8-0618-4cc1-aa48-a0bd5fa21488',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:start:compute-merge',
    timestamp: 1780842697330,
    type: 'stage',
    boundary: 'start',
    traceId: '97ea93d4-6396-486e-b171-c85f6a66285f'
  },
  {
    id: '9a3768f6-a3b1-43ff-bad5-dfbc56e2089e',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:end:compute-merge',
    timestamp: 1780842697331,
    state: {
      isLoading: false,
      value: [
        {
          id: 11,
          name: 'Luke',
          lastName: 'Skywalker',
          jedi: true
        },
        {
          id: 38,
          name: 'Leia',
          lastName: 'Organa',
          senator: true
        },
        {
          id: 4,
          name: 'Obi-Wan',
          lastName: 'Kenobi'
        }
      ],
      error: null,
      hasValue: true
    },
    type: 'stage',
    boundary: 'end',
    traceId: '97ea93d4-6396-486e-b171-c85f6a66285f'
  },
  {
    id: 'b157cc8b-54ba-49f1-8d62-a6250cf24d8d',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'pipeline:candidate:compute-merge',
    timestamp: 1780842697331,
    type: 'pipeline',
    boundary: 'candidate',
    candidate: [
      {
        id: 11,
        name: 'Luke',
        lastName: 'Skywalker',
        jedi: true
      },
      {
        id: 38,
        name: 'Leia',
        lastName: 'Organa',
        senator: true
      },
      {
        id: 4,
        name: 'Obi-Wan',
        lastName: 'Kenobi'
      },
      {
        id: 5,
        name: 'Darth',
        lastName: 'Vader'
      }
    ],
    traceId: '97ea93d4-6396-486e-b171-c85f6a66285f'
  },
  {
    id: '889d4f75-a435-4a08-8c95-ccdcd07dad34',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Filter',
    name: 'stage:start:filter',
    timestamp: 1780842697332,
    type: 'stage',
    boundary: 'start',
    traceId: '97ea93d4-6396-486e-b171-c85f6a66285f'
  },
  {
    id: '5b356dc4-a949-4748-83cb-fc260f263769',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Filter',
    name: 'stage:end:filter',
    timestamp: 1780842697332,
    type: 'stage',
    boundary: 'end',
    traceId: '97ea93d4-6396-486e-b171-c85f6a66285f'
  },
  {
    id: '07095d2b-aa0e-4417-acb0-c9e6bb895381',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'pipeline:candidate:filter',
    timestamp: 1780842697333,
    type: 'pipeline',
    boundary: 'candidate',
    candidate: [
      {
        id: 11,
        name: 'Luke',
        lastName: 'Skywalker',
        jedi: true
      },
      {
        id: 38,
        name: 'Leia',
        lastName: 'Organa',
        senator: true
      },
      {
        id: 4,
        name: 'Obi-Wan',
        lastName: 'Kenobi'
      },
      {
        id: 5,
        name: 'Darth',
        lastName: 'Vader'
      }
    ],
    traceId: '97ea93d4-6396-486e-b171-c85f6a66285f'
  },
  {
    id: 'f189a449-5a37-4035-a4ee-3c29be3ba549',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Reducer',
    name: 'stage:start:reducer',
    timestamp: 1780842697334,
    type: 'stage',
    boundary: 'start',
    traceId: '97ea93d4-6396-486e-b171-c85f6a66285f'
  },
  {
    id: '5089b5ea-efa0-46bb-82dc-428ddae1f787',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Reducer',
    name: 'stage:end:reducer',
    timestamp: 1780842697334,
    state: {
      isLoading: false,
      value: [
        {
          id: 11,
          name: 'Luke',
          lastName: 'Skywalker',
          jedi: true
        },
        {
          id: 38,
          name: 'Leia',
          lastName: 'Organa',
          senator: true
        },
        {
          id: 4,
          name: 'Obi-Wan',
          lastName: 'Kenobi'
        }
      ],
      error: null,
      hasValue: true
    },
    type: 'stage',
    boundary: 'end',
    traceId: '97ea93d4-6396-486e-b171-c85f6a66285f'
  },
  {
    id: '1c51bf3a-8228-442a-931c-961ede996746',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'pipeline:candidate:reducer',
    timestamp: 1780842697335,
    type: 'pipeline',
    boundary: 'candidate',
    candidate: [
      {
        id: 11,
        name: 'Luke',
        lastName: 'Skywalker',
        jedi: true
      },
      {
        id: 38,
        name: 'Leia',
        lastName: 'Organa',
        senator: true
      },
      {
        id: 4,
        name: 'Obi-Wan',
        lastName: 'Kenobi'
      },
      {
        id: 5,
        name: 'Darth',
        lastName: 'Vader'
      }
    ],
    traceId: '97ea93d4-6396-486e-b171-c85f6a66285f'
  },
  {
    id: '45dadaaf-c176-44a7-9f45-55290452fac6',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Encrypt::Aes256',
    name: 'stage:start:encrypt',
    timestamp: 1780842697335,
    type: 'stage',
    boundary: 'start',
    traceId: '97ea93d4-6396-486e-b171-c85f6a66285f'
  },
  {
    id: '444fbde7-75dc-4ad8-9b4f-44a68840bbfd',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Encrypt::Aes256',
    name: 'stage:end:encrypt',
    timestamp: 1780842697336,
    type: 'stage',
    boundary: 'end',
    traceId: '97ea93d4-6396-486e-b171-c85f6a66285f'
  },
  {
    id: '11f94c01-0cc3-43cc-b426-bd6b296e90fe',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Persist::LocalStorage',
    name: 'stage:start:persist',
    timestamp: 1780842697338,
    type: 'stage',
    boundary: 'start',
    traceId: '97ea93d4-6396-486e-b171-c85f6a66285f'
  },
  {
    id: 'eeeb8d8d-d54e-4c66-8778-a907b5c1a449',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Persist::LocalStorage',
    name: 'stage:end:persist',
    timestamp: 1780842697339,
    type: 'stage',
    boundary: 'end',
    traceId: '97ea93d4-6396-486e-b171-c85f6a66285f'
  },
  {
    id: '37609bbd-c127-4b6c-845a-7cc55c025b2f',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'lifecycle:end:merge',
    timestamp: 1780842697340,
    state: {
      isLoading: false,
      value: [
        {
          id: 11,
          name: 'Luke',
          lastName: 'Skywalker',
          jedi: true
        },
        {
          id: 38,
          name: 'Leia',
          lastName: 'Organa',
          senator: true
        },
        {
          id: 4,
          name: 'Obi-Wan',
          lastName: 'Kenobi'
        }
      ],
      error: null,
      hasValue: true
    },
    type: 'lifecycle',
    boundary: 'end',
    traceId: '97ea93d4-6396-486e-b171-c85f6a66285f'
  },
  {
    id: '2ec42b30-41a6-464f-ac71-c6ed57b40176',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:start:core-state',
    timestamp: 1780842697340,
    type: 'stage',
    boundary: 'start',
    traceId: '97ea93d4-6396-486e-b171-c85f6a66285f'
  },
  {
    id: 'b54529e4-ef6e-41f7-b317-d8dba60e6798',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'pipeline:candidate:core-state',
    timestamp: 1780842697340,
    type: 'pipeline',
    boundary: 'candidate',
    candidate: [
      {
        id: 11,
        name: 'Luke',
        lastName: 'Skywalker',
        jedi: true
      },
      {
        id: 38,
        name: 'Leia',
        lastName: 'Organa',
        senator: true
      },
      {
        id: 4,
        name: 'Obi-Wan',
        lastName: 'Kenobi'
      },
      {
        id: 5,
        name: 'Darth',
        lastName: 'Vader'
      }
    ],
    traceId: '97ea93d4-6396-486e-b171-c85f6a66285f'
  },
  {
    id: 'e369aabf-4bed-4c80-9d14-c25390e39967',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:end:core-state',
    timestamp: 1780842697341,
    state: {
      isLoading: false,
      value: [
        {
          id: 11,
          name: 'Luke',
          lastName: 'Skywalker',
          jedi: true
        },
        {
          id: 38,
          name: 'Leia',
          lastName: 'Organa',
          senator: true
        },
        {
          id: 4,
          name: 'Obi-Wan',
          lastName: 'Kenobi'
        },
        {
          id: 5,
          name: 'Darth',
          lastName: 'Vader'
        }
      ],
      error: null,
      hasValue: true
    },
    type: 'stage',
    boundary: 'end',
    traceId: '97ea93d4-6396-486e-b171-c85f6a66285f'
  },
  {
    id: '9fdad149-4115-409c-9bdd-a5ead9e24471',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:success',
    timestamp: 1780842697341,
    type: 'lifecycle',
    boundary: 'notification',
    traceId: '97ea93d4-6396-486e-b171-c85f6a66285f'
  },
  {
    id: 'd5c4fdc2-faf0-4c6f-a387-e4cc0218bf3a',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'conductor:end:attempt',
    timestamp: 1780842697342,
    type: 'conductor',
    boundary: 'end',
    payload: {
      status: 'success'
    },
    traceId: '97ea93d4-6396-486e-b171-c85f6a66285f'
  },
  {
    id: 'e263446d-46ff-4d20-91fa-ba0045e28c61',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:finalize',
    timestamp: 1780842697343,
    type: 'lifecycle',
    boundary: 'notification',
    traceId: '97ea93d4-6396-486e-b171-c85f6a66285f'
  },
  {
    id: 'd32f5cb3-9809-4428-959e-deba5c515ad2',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'conductor:start:attempt',
    timestamp: 1780842698597,
    type: 'conductor',
    boundary: 'start',
    traceId: '93a408fc-1cf6-4169-8a3e-193c96633e2f'
  },
  {
    id: '61981184-de20-4a2f-80ea-515fb41e514d',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:start:attempt',
    timestamp: 1780842698598,
    type: 'controller',
    boundary: 'start',
    traceId: '93a408fc-1cf6-4169-8a3e-193c96633e2f'
  },
  {
    id: '875e7b66-a8d7-4fa7-ac0b-9073e39f951e',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:start:vote',
    timestamp: 1780842698598,
    type: 'controller',
    boundary: 'start',
    traceId: '93a408fc-1cf6-4169-8a3e-193c96633e2f'
  },
  {
    id: 'efc60f5c-93ed-4f60-989c-68536b85512f',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:start:vote',
    timestamp: 1780842698599,
    type: 'controller',
    boundary: 'start',
    traceId: '93a408fc-1cf6-4169-8a3e-193c96633e2f'
  },
  {
    id: '36a2e638-0831-4139-835f-0d0390e99396',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:start:vote',
    timestamp: 1780842698600,
    type: 'controller',
    boundary: 'start',
    traceId: '93a408fc-1cf6-4169-8a3e-193c96633e2f'
  },
  {
    id: 'ddb6c74b-25c9-4db3-b19e-de2233f79f16',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:start:vote',
    timestamp: 1780842698600,
    type: 'controller',
    boundary: 'start',
    traceId: '93a408fc-1cf6-4169-8a3e-193c96633e2f'
  },
  {
    id: '17f94c54-c40b-4b71-afb2-cbc9788b3a2c',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Throttle',
    name: 'controller:start:vote',
    timestamp: 1780842698601,
    type: 'controller',
    boundary: 'start',
    traceId: '93a408fc-1cf6-4169-8a3e-193c96633e2f'
  },
  {
    id: 'e9cee7ad-87b5-4370-bcf7-6937e6bd1ef8',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:end:vote',
    timestamp: 1780842698601,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '93a408fc-1cf6-4169-8a3e-193c96633e2f'
  },
  {
    id: 'f16bbad5-1532-4085-9f60-cef95dd527b8',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:end:vote',
    timestamp: 1780842698602,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '93a408fc-1cf6-4169-8a3e-193c96633e2f'
  },
  {
    id: '8e78788e-8602-42e4-9d41-94f9f5c376d6',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:end:vote',
    timestamp: 1780842698602,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '93a408fc-1cf6-4169-8a3e-193c96633e2f'
  },
  {
    id: '66e1fea8-feb2-447b-9373-5f5762c2d013',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Throttle',
    name: 'controller:end:vote',
    timestamp: 1780842698603,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '93a408fc-1cf6-4169-8a3e-193c96633e2f'
  },
  {
    id: 'e350e894-7ca2-4ceb-9ae1-9a988d96ae56',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:end:vote',
    timestamp: 1780842698604,
    type: 'controller',
    boundary: 'end',
    payload: {
      traceId: '93a408fc-1cf6-4169-8a3e-193c96633e2f',
      outcome: 'abstain'
    },
    traceId: '93a408fc-1cf6-4169-8a3e-193c96633e2f'
  },
  {
    id: '081f863c-8da6-41a0-af96-92daf9b2000b',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:end:attempt',
    timestamp: 1780842698605,
    type: 'controller',
    boundary: 'end',
    payload: {
      decision: true
    },
    traceId: '93a408fc-1cf6-4169-8a3e-193c96633e2f'
  },
  {
    id: 'df864163-7262-447d-8def-e921923ab88d',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'pipeline:candidate:pipeline-start',
    timestamp: 1780842698605,
    type: 'pipeline',
    boundary: 'candidate',
    candidate: [
      {
        id: 1,
        name: 'Jean-Luc',
        lastName: 'Picard',
        captain: true
      },
      {
        id: 2,
        name: 'James T.',
        lastName: 'Kirk'
      },
      {
        id: 3,
        name: 'William',
        lastName: 'Riker',
        commander: true
      }
    ],
    traceId: '93a408fc-1cf6-4169-8a3e-193c96633e2f'
  },
  {
    id: 'f19b9fc1-03d1-4a07-abf0-b06b06e52a71',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'lifecycle:start:merge',
    timestamp: 1780842698606,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '93a408fc-1cf6-4169-8a3e-193c96633e2f'
  },
  {
    id: 'df225905-f70d-4de0-b69c-b7a4410e01cf',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    name: 'stage:start:resolve',
    timestamp: 1780842698606,
    type: 'stage',
    boundary: 'start',
    traceId: '93a408fc-1cf6-4169-8a3e-193c96633e2f'
  },
  {
    id: 'a63614c2-dbef-468c-9baa-93c14cc8afae',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    name: 'stage:end:resolve',
    timestamp: 1780842698607,
    state: {
      isLoading: false,
      value: [
        {
          id: 1,
          name: 'Jean-Luc',
          lastName: 'Picard',
          captain: true
        },
        {
          id: 2,
          name: 'James T.',
          lastName: 'Kirk'
        },
        {
          id: 3,
          name: 'William',
          lastName: 'Riker',
          commander: true
        }
      ],
      error: null,
      hasValue: true
    },
    type: 'stage',
    boundary: 'end',
    traceId: '93a408fc-1cf6-4169-8a3e-193c96633e2f'
  },
  {
    id: '2d333397-b10b-491e-a11b-2198b6a5aa48',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'pipeline:candidate:resolve',
    timestamp: 1780842698607,
    type: 'pipeline',
    boundary: 'candidate',
    candidate: [
      {
        id: 4,
        name: 'Data',
        lastName: ''
      }
    ],
    traceId: '93a408fc-1cf6-4169-8a3e-193c96633e2f'
  },
  {
    id: '58768191-bcb1-4a36-b997-5a39e193cb01',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:start:compute-merge',
    timestamp: 1780842698608,
    type: 'stage',
    boundary: 'start',
    traceId: '93a408fc-1cf6-4169-8a3e-193c96633e2f'
  },
  {
    id: '02bd8d30-31c6-4d7f-bee4-5005933b79fe',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:end:compute-merge',
    timestamp: 1780842698609,
    state: {
      isLoading: false,
      value: [
        {
          id: 1,
          name: 'Jean-Luc',
          lastName: 'Picard',
          captain: true
        },
        {
          id: 2,
          name: 'James T.',
          lastName: 'Kirk'
        },
        {
          id: 3,
          name: 'William',
          lastName: 'Riker',
          commander: true
        }
      ],
      error: null,
      hasValue: true
    },
    type: 'stage',
    boundary: 'end',
    traceId: '93a408fc-1cf6-4169-8a3e-193c96633e2f'
  },
  {
    id: '7d8c8246-ea1f-490c-8acf-236350803fd6',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'pipeline:candidate:compute-merge',
    timestamp: 1780842698609,
    type: 'pipeline',
    boundary: 'candidate',
    candidate: [
      {
        id: 1,
        name: 'Jean-Luc',
        lastName: 'Picard',
        captain: true
      },
      {
        id: 2,
        name: 'James T.',
        lastName: 'Kirk'
      },
      {
        id: 3,
        name: 'William',
        lastName: 'Riker',
        commander: true
      },
      {
        id: 4,
        name: 'Data',
        lastName: ''
      }
    ],
    traceId: '93a408fc-1cf6-4169-8a3e-193c96633e2f'
  },
  {
    id: '6d2543ec-5b72-43a0-8866-ffeeec126c59',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Filter',
    name: 'stage:start:filter',
    timestamp: 1780842698610,
    type: 'stage',
    boundary: 'start',
    traceId: '93a408fc-1cf6-4169-8a3e-193c96633e2f'
  },
  {
    id: 'f23148e1-c92a-44f7-b1c9-162b3fbfe871',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Filter',
    name: 'stage:end:filter',
    timestamp: 1780842698610,
    type: 'stage',
    boundary: 'end',
    traceId: '93a408fc-1cf6-4169-8a3e-193c96633e2f'
  },
  {
    id: '8eae14c2-1158-4f0d-b48a-ed1a2c4daadd',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'pipeline:candidate:filter',
    timestamp: 1780842698611,
    type: 'pipeline',
    boundary: 'candidate',
    candidate: [
      {
        id: 1,
        name: 'Jean-Luc',
        lastName: 'Picard',
        captain: true
      },
      {
        id: 2,
        name: 'James T.',
        lastName: 'Kirk'
      },
      {
        id: 3,
        name: 'William',
        lastName: 'Riker',
        commander: true
      },
      {
        id: 4,
        name: 'Data',
        lastName: ''
      }
    ],
    traceId: '93a408fc-1cf6-4169-8a3e-193c96633e2f'
  },
  {
    id: '8496ded7-9d4c-4a8c-b691-b9c7952ffbb3',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Reducer',
    name: 'stage:start:reducer',
    timestamp: 1780842698612,
    type: 'stage',
    boundary: 'start',
    traceId: '93a408fc-1cf6-4169-8a3e-193c96633e2f'
  },
  {
    id: '425f0319-e46b-4988-816f-001e0d053bf6',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Reducer',
    name: 'stage:end:reducer',
    timestamp: 1780842698612,
    state: {
      isLoading: false,
      value: [
        {
          id: 1,
          name: 'Jean-Luc',
          lastName: 'Picard',
          captain: true
        },
        {
          id: 2,
          name: 'James T.',
          lastName: 'Kirk'
        },
        {
          id: 3,
          name: 'William',
          lastName: 'Riker',
          commander: true
        }
      ],
      error: null,
      hasValue: true
    },
    type: 'stage',
    boundary: 'end',
    traceId: '93a408fc-1cf6-4169-8a3e-193c96633e2f'
  },
  {
    id: 'f66b7b55-0325-4eae-b3de-3a02461051ee',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'pipeline:candidate:reducer',
    timestamp: 1780842698613,
    type: 'pipeline',
    boundary: 'candidate',
    candidate: [
      {
        id: 1,
        name: 'Jean-Luc',
        lastName: 'Picard',
        captain: true
      },
      {
        id: 2,
        name: 'James T.',
        lastName: 'Kirk'
      },
      {
        id: 3,
        name: 'William',
        lastName: 'Riker',
        commander: true
      },
      {
        id: 4,
        name: 'Data',
        lastName: ''
      }
    ],
    traceId: '93a408fc-1cf6-4169-8a3e-193c96633e2f'
  },
  {
    id: '887e7715-37fd-4513-a33a-9f71b7cf1381',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'lifecycle:end:merge',
    timestamp: 1780842698614,
    state: {
      isLoading: false,
      value: [
        {
          id: 1,
          name: 'Jean-Luc',
          lastName: 'Picard',
          captain: true
        },
        {
          id: 2,
          name: 'James T.',
          lastName: 'Kirk'
        },
        {
          id: 3,
          name: 'William',
          lastName: 'Riker',
          commander: true
        }
      ],
      error: null,
      hasValue: true
    },
    type: 'lifecycle',
    boundary: 'end',
    traceId: '93a408fc-1cf6-4169-8a3e-193c96633e2f'
  },
  {
    id: '39d25f25-ea0c-4251-a08f-fd0b2c5bd99f',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:start:core-state',
    timestamp: 1780842698617,
    type: 'stage',
    boundary: 'start',
    traceId: '93a408fc-1cf6-4169-8a3e-193c96633e2f'
  },
  {
    id: '3b0d99c3-632d-4e72-a588-db6263009f9f',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'pipeline:candidate:core-state',
    timestamp: 1780842698617,
    type: 'pipeline',
    boundary: 'candidate',
    candidate: [
      {
        id: 1,
        name: 'Jean-Luc',
        lastName: 'Picard',
        captain: true
      },
      {
        id: 2,
        name: 'James T.',
        lastName: 'Kirk'
      },
      {
        id: 3,
        name: 'William',
        lastName: 'Riker',
        commander: true
      },
      {
        id: 4,
        name: 'Data',
        lastName: ''
      }
    ],
    traceId: '93a408fc-1cf6-4169-8a3e-193c96633e2f'
  },
  {
    id: '085c7c83-b32f-4c5f-85bb-caf18dc51ee4',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:end:core-state',
    timestamp: 1780842698618,
    state: {
      isLoading: false,
      value: [
        {
          id: 1,
          name: 'Jean-Luc',
          lastName: 'Picard',
          captain: true
        },
        {
          id: 2,
          name: 'James T.',
          lastName: 'Kirk'
        },
        {
          id: 3,
          name: 'William',
          lastName: 'Riker',
          commander: true
        },
        {
          id: 4,
          name: 'Data',
          lastName: ''
        }
      ],
      error: null,
      hasValue: true
    },
    type: 'stage',
    boundary: 'end',
    traceId: '93a408fc-1cf6-4169-8a3e-193c96633e2f'
  },
  {
    id: 'ea19eafe-c485-43d9-882b-a23aaee8813d',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:success',
    timestamp: 1780842698619,
    type: 'lifecycle',
    boundary: 'notification',
    traceId: '93a408fc-1cf6-4169-8a3e-193c96633e2f'
  },
  {
    id: 'a6e16bf3-fd91-45dc-b2e4-e476992dc492',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'conductor:end:attempt',
    timestamp: 1780842698619,
    type: 'conductor',
    boundary: 'end',
    payload: {
      status: 'success'
    },
    traceId: '93a408fc-1cf6-4169-8a3e-193c96633e2f'
  },
  {
    id: 'd5fcd0c2-ba62-4dd2-af14-314538fe087d',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:finalize',
    timestamp: 1780842698620,
    type: 'lifecycle',
    boundary: 'notification',
    traceId: '93a408fc-1cf6-4169-8a3e-193c96633e2f'
  },
  {
    id: 'a3f0e48a-ce15-40fd-8478-4a5e6b0492e2',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'conductor:start:attempt',
    timestamp: 1780842701030,
    type: 'conductor',
    boundary: 'start',
    traceId: '149b8b92-b03c-466c-81b3-9ece202b219a'
  },
  {
    id: 'ce1b97db-d47e-4e6c-a980-f9941ec45042',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:start:attempt',
    timestamp: 1780842701031,
    type: 'controller',
    boundary: 'start',
    traceId: '149b8b92-b03c-466c-81b3-9ece202b219a'
  },
  {
    id: '09d7a7b9-3898-4cfa-8a9c-0b1bb044d3fb',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:start:vote',
    timestamp: 1780842701032,
    type: 'controller',
    boundary: 'start',
    traceId: '149b8b92-b03c-466c-81b3-9ece202b219a'
  },
  {
    id: '157921db-36f5-4864-9c31-3c9ab13292b5',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:start:vote',
    timestamp: 1780842701032,
    type: 'controller',
    boundary: 'start',
    traceId: '149b8b92-b03c-466c-81b3-9ece202b219a'
  },
  {
    id: 'e3d95913-2af5-4f98-8c29-8df56bab3638',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:start:vote',
    timestamp: 1780842701033,
    type: 'controller',
    boundary: 'start',
    traceId: '149b8b92-b03c-466c-81b3-9ece202b219a'
  },
  {
    id: 'ad015224-e32d-4131-a548-f3700dc362e9',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:start:vote',
    timestamp: 1780842701034,
    type: 'controller',
    boundary: 'start',
    traceId: '149b8b92-b03c-466c-81b3-9ece202b219a'
  },
  {
    id: '2f8de595-e3bd-4229-99dd-dec8e5c0948b',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Delay',
    name: 'controller:start:vote',
    timestamp: 1780842701034,
    type: 'controller',
    boundary: 'start',
    traceId: '149b8b92-b03c-466c-81b3-9ece202b219a'
  },
  {
    id: '52eae9ca-b2f9-44b1-ae51-61e8222d7406',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Stepwise',
    name: 'controller:start:vote',
    timestamp: 1780842701035,
    type: 'controller',
    boundary: 'start',
    traceId: '149b8b92-b03c-466c-81b3-9ece202b219a'
  },
  {
    id: '3651948b-f1b1-4f14-823e-9c5e7cc4210d',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::TabSync',
    name: 'controller:start:vote',
    timestamp: 1780842701036,
    type: 'controller',
    boundary: 'start',
    traceId: '149b8b92-b03c-466c-81b3-9ece202b219a'
  },
  {
    id: '36b8ee64-c4d6-4474-9324-38e158b96415',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:end:vote',
    timestamp: 1780842701036,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '149b8b92-b03c-466c-81b3-9ece202b219a'
  },
  {
    id: 'bf4b254a-942a-4a51-aa36-757d523ca8bf',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:end:vote',
    timestamp: 1780842701037,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '149b8b92-b03c-466c-81b3-9ece202b219a'
  },
  {
    id: '4c36cb69-9faa-4ff4-b750-1babc59e440d',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:end:vote',
    timestamp: 1780842701038,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '149b8b92-b03c-466c-81b3-9ece202b219a'
  },
  {
    id: '75ad89b1-36c0-4077-949a-965f013125d1',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Delay',
    name: 'controller:end:vote',
    timestamp: 1780842701038,
    type: 'controller',
    boundary: 'end',
    payload: 'deny',
    traceId: '149b8b92-b03c-466c-81b3-9ece202b219a'
  },
  {
    id: '91fd4f4b-911e-4d83-8f19-4f309f999940',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Stepwise',
    name: 'controller:end:vote',
    timestamp: 1780842701039,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '149b8b92-b03c-466c-81b3-9ece202b219a'
  },
  {
    id: 'd4884741-3b83-4772-94fa-9fce2c6f58ea',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::TabSync',
    name: 'controller:end:vote',
    timestamp: 1780842701040,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '149b8b92-b03c-466c-81b3-9ece202b219a'
  },
  {
    id: '9a66738a-dfb6-4db9-84f5-5d88a3d648f7',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:end:vote',
    timestamp: 1780842701040,
    type: 'controller',
    boundary: 'end',
    payload: {
      traceId: '149b8b92-b03c-466c-81b3-9ece202b219a',
      outcome: 'deny'
    },
    traceId: '149b8b92-b03c-466c-81b3-9ece202b219a'
  },
  {
    id: 'aeef4374-f854-4e18-8baa-605b46ca1449',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'conductor:notification:deny',
    timestamp: 1780842701041,
    type: 'conductor',
    boundary: 'notification',
    traceId: '149b8b92-b03c-466c-81b3-9ece202b219a'
  },
  {
    id: '3cf190c6-7590-4964-b3ee-d7872f27d4f5',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'lifecycle:notification:revote',
    timestamp: 1780842701536,
    type: 'lifecycle',
    boundary: 'notification',
    traceId: '149b8b92-b03c-466c-81b3-9ece202b219a'
  },
  {
    id: 'e732cec8-5a88-4ad5-8a84-3c3e2df3521d',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:start:attempt',
    timestamp: 1780842701538,
    type: 'controller',
    boundary: 'start',
    traceId: '149b8b92-b03c-466c-81b3-9ece202b219a'
  },
  {
    id: '80a4f98a-69da-4680-9c07-19a43cbaf6a7',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:start:vote',
    timestamp: 1780842701539,
    type: 'controller',
    boundary: 'start',
    traceId: '149b8b92-b03c-466c-81b3-9ece202b219a'
  },
  {
    id: 'f2665ffb-83c4-41c9-a9a7-bb388264b2fb',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:start:vote',
    timestamp: 1780842701540,
    type: 'controller',
    boundary: 'start',
    traceId: '149b8b92-b03c-466c-81b3-9ece202b219a'
  },
  {
    id: '5e06a416-4766-42ac-99b5-99d786febd0a',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:start:vote',
    timestamp: 1780842701540,
    type: 'controller',
    boundary: 'start',
    traceId: '149b8b92-b03c-466c-81b3-9ece202b219a'
  },
  {
    id: 'a11c3c44-4e80-48bd-ab13-6c08c112ec83',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:start:vote',
    timestamp: 1780842701541,
    type: 'controller',
    boundary: 'start',
    traceId: '149b8b92-b03c-466c-81b3-9ece202b219a'
  },
  {
    id: 'ec883c89-477f-415c-977f-45fbfde1e466',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Delay',
    name: 'controller:start:vote',
    timestamp: 1780842701542,
    type: 'controller',
    boundary: 'start',
    traceId: '149b8b92-b03c-466c-81b3-9ece202b219a'
  },
  {
    id: '06e2b5fd-0407-4ce8-9e9a-7ae3d5d928b9',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Stepwise',
    name: 'controller:start:vote',
    timestamp: 1780842701542,
    type: 'controller',
    boundary: 'start',
    traceId: '149b8b92-b03c-466c-81b3-9ece202b219a'
  },
  {
    id: '0a50a287-e4b1-441a-9831-d5266b97d69e',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::TabSync',
    name: 'controller:start:vote',
    timestamp: 1780842701543,
    type: 'controller',
    boundary: 'start',
    traceId: '149b8b92-b03c-466c-81b3-9ece202b219a'
  },
  {
    id: 'f70efa89-6c8b-4e20-b72a-65f4ad8bf878',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:end:vote',
    timestamp: 1780842701544,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '149b8b92-b03c-466c-81b3-9ece202b219a'
  },
  {
    id: 'ae76e739-124b-4432-b5d4-8e4cc68a9993',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:end:vote',
    timestamp: 1780842701544,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '149b8b92-b03c-466c-81b3-9ece202b219a'
  },
  {
    id: 'c6cb6fbf-6939-4125-9cba-772699429932',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:end:vote',
    timestamp: 1780842701545,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '149b8b92-b03c-466c-81b3-9ece202b219a'
  },
  {
    id: '1e5f6d9c-92f7-4c0e-9133-e2b4eaa1ad5b',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Delay',
    name: 'controller:end:vote',
    timestamp: 1780842701546,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '149b8b92-b03c-466c-81b3-9ece202b219a'
  },
  {
    id: 'ce17317a-7905-4833-b227-28cde8cba9de',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Stepwise',
    name: 'controller:end:vote',
    timestamp: 1780842701546,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '149b8b92-b03c-466c-81b3-9ece202b219a'
  },
  {
    id: 'f217624d-46cd-4bc3-bb83-ed5bfec2fa5d',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::TabSync',
    name: 'controller:end:vote',
    timestamp: 1780842701547,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '149b8b92-b03c-466c-81b3-9ece202b219a'
  },
  {
    id: 'bce34c26-852e-4d58-b9f2-3d56354802b8',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:end:vote',
    timestamp: 1780842701547,
    type: 'controller',
    boundary: 'end',
    payload: {
      traceId: '149b8b92-b03c-466c-81b3-9ece202b219a',
      outcome: 'abstain'
    },
    traceId: '149b8b92-b03c-466c-81b3-9ece202b219a'
  },
  {
    id: 'b111c940-e5af-41fd-8b46-8ccc36115643',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:end:attempt',
    timestamp: 1780842701549,
    type: 'controller',
    boundary: 'end',
    payload: {
      decision: true
    },
    traceId: '149b8b92-b03c-466c-81b3-9ece202b219a'
  },
  {
    id: '65209869-4ad4-4585-a8d5-dc00ddf688dc',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'pipeline:candidate:pipeline-start',
    timestamp: 1780842701549,
    type: 'pipeline',
    boundary: 'candidate',
    candidate: [
      {
        id: 11,
        name: 'Luke',
        lastName: 'Skywalker',
        jedi: true
      },
      {
        id: 38,
        name: 'Leia',
        lastName: 'Organa',
        senator: true
      },
      {
        id: 4,
        name: 'Obi-Wan',
        lastName: 'Kenobi'
      },
      {
        id: 5,
        name: 'Darth',
        lastName: 'Vader'
      }
    ],
    traceId: '149b8b92-b03c-466c-81b3-9ece202b219a'
  },
  {
    id: '5f65d9c5-d8bf-4660-b488-19353a0db56c',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'lifecycle:start:merge',
    timestamp: 1780842701550,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '149b8b92-b03c-466c-81b3-9ece202b219a'
  },
  {
    id: '5537b809-77c7-403b-98fc-d41c68b184f3',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    name: 'stage:start:resolve',
    timestamp: 1780842701550,
    type: 'stage',
    boundary: 'start',
    traceId: '149b8b92-b03c-466c-81b3-9ece202b219a'
  },
  {
    id: '20b2fdcb-9c28-4cb8-8de9-f660b8ea42a8',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    name: 'stage:end:resolve',
    timestamp: 1780842701551,
    state: {
      isLoading: false,
      value: [
        {
          id: 11,
          name: 'Luke',
          lastName: 'Skywalker',
          jedi: true
        },
        {
          id: 38,
          name: 'Leia',
          lastName: 'Organa',
          senator: true
        },
        {
          id: 4,
          name: 'Obi-Wan',
          lastName: 'Kenobi'
        },
        {
          id: 5,
          name: 'Darth',
          lastName: 'Vader'
        }
      ],
      error: null,
      hasValue: true
    },
    type: 'stage',
    boundary: 'end',
    traceId: '149b8b92-b03c-466c-81b3-9ece202b219a'
  },
  {
    id: 'e1464933-5fe5-4b06-8049-54c94151ee68',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'pipeline:candidate:resolve',
    timestamp: 1780842701552,
    type: 'pipeline',
    boundary: 'candidate',
    candidate: [
      {
        id: 11,
        name: 'Luke',
        lastName: 'Skywalker',
        jedi: true
      },
      {
        id: 38,
        name: 'Leia',
        lastName: 'Organa',
        senator: true
      },
      {
        id: 4,
        name: 'Obi-Wan',
        lastName: 'Kenobi'
      },
      {
        id: 5,
        name: 'Darth',
        lastName: 'Vader'
      },
      {
        id: 6,
        name: 'Padm\u00e9',
        lastName: 'Amidala'
      }
    ],
    traceId: '149b8b92-b03c-466c-81b3-9ece202b219a'
  },
  {
    id: '049e7094-b42d-41e8-8b22-4fbd1118c60c',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:start:compute-merge',
    timestamp: 1780842701552,
    type: 'stage',
    boundary: 'start',
    traceId: '149b8b92-b03c-466c-81b3-9ece202b219a'
  },
  {
    id: '3211c7f4-5775-4038-9ed8-31c08e4fc403',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:end:compute-merge',
    timestamp: 1780842701553,
    state: {
      isLoading: false,
      value: [
        {
          id: 11,
          name: 'Luke',
          lastName: 'Skywalker',
          jedi: true
        },
        {
          id: 38,
          name: 'Leia',
          lastName: 'Organa',
          senator: true
        },
        {
          id: 4,
          name: 'Obi-Wan',
          lastName: 'Kenobi'
        },
        {
          id: 5,
          name: 'Darth',
          lastName: 'Vader'
        }
      ],
      error: null,
      hasValue: true
    },
    type: 'stage',
    boundary: 'end',
    traceId: '149b8b92-b03c-466c-81b3-9ece202b219a'
  },
  {
    id: '616de916-1216-4c34-9dc9-5f1635d31f7d',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'pipeline:candidate:compute-merge',
    timestamp: 1780842701554,
    type: 'pipeline',
    boundary: 'candidate',
    candidate: [
      {
        id: 11,
        name: 'Luke',
        lastName: 'Skywalker',
        jedi: true
      },
      {
        id: 38,
        name: 'Leia',
        lastName: 'Organa',
        senator: true
      },
      {
        id: 4,
        name: 'Obi-Wan',
        lastName: 'Kenobi'
      },
      {
        id: 5,
        name: 'Darth',
        lastName: 'Vader'
      },
      {
        id: 6,
        name: 'Padm\u00e9',
        lastName: 'Amidala'
      }
    ],
    traceId: '149b8b92-b03c-466c-81b3-9ece202b219a'
  },
  {
    id: 'b8c5df1b-5835-46b9-845c-ccc4c30e9540',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Filter',
    name: 'stage:start:filter',
    timestamp: 1780842701555,
    type: 'stage',
    boundary: 'start',
    traceId: '149b8b92-b03c-466c-81b3-9ece202b219a'
  },
  {
    id: '70197c61-a660-4011-bdd7-59562c3d208b',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Filter',
    name: 'stage:end:filter',
    timestamp: 1780842701555,
    type: 'stage',
    boundary: 'end',
    traceId: '149b8b92-b03c-466c-81b3-9ece202b219a'
  },
  {
    id: '5ce865c2-670b-43af-8ac7-422febd43ffa',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'pipeline:candidate:filter',
    timestamp: 1780842701556,
    type: 'pipeline',
    boundary: 'candidate',
    candidate: [
      {
        id: 11,
        name: 'Luke',
        lastName: 'Skywalker',
        jedi: true
      },
      {
        id: 38,
        name: 'Leia',
        lastName: 'Organa',
        senator: true
      },
      {
        id: 4,
        name: 'Obi-Wan',
        lastName: 'Kenobi'
      },
      {
        id: 5,
        name: 'Darth',
        lastName: 'Vader'
      },
      {
        id: 6,
        name: 'Padm\u00e9',
        lastName: 'Amidala'
      }
    ],
    traceId: '149b8b92-b03c-466c-81b3-9ece202b219a'
  },
  {
    id: '59562847-73d0-488f-8f4f-988e0a91c524',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Reducer',
    name: 'stage:start:reducer',
    timestamp: 1780842701557,
    type: 'stage',
    boundary: 'start',
    traceId: '149b8b92-b03c-466c-81b3-9ece202b219a'
  },
  {
    id: '8b573530-7efb-45a2-badb-a4798a10da5c',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Reducer',
    name: 'stage:end:reducer',
    timestamp: 1780842701557,
    state: {
      isLoading: false,
      value: [
        {
          id: 11,
          name: 'Luke',
          lastName: 'Skywalker',
          jedi: true
        },
        {
          id: 38,
          name: 'Leia',
          lastName: 'Organa',
          senator: true
        },
        {
          id: 4,
          name: 'Obi-Wan',
          lastName: 'Kenobi'
        },
        {
          id: 5,
          name: 'Darth',
          lastName: 'Vader'
        }
      ],
      error: null,
      hasValue: true
    },
    type: 'stage',
    boundary: 'end',
    traceId: '149b8b92-b03c-466c-81b3-9ece202b219a'
  },
  {
    id: 'bc7a1819-4500-4c95-bc09-59be9a13c251',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'pipeline:candidate:reducer',
    timestamp: 1780842701558,
    type: 'pipeline',
    boundary: 'candidate',
    candidate: [
      {
        id: 11,
        name: 'Luke',
        lastName: 'Skywalker',
        jedi: true
      },
      {
        id: 38,
        name: 'Leia',
        lastName: 'Organa',
        senator: true
      },
      {
        id: 4,
        name: 'Obi-Wan',
        lastName: 'Kenobi'
      },
      {
        id: 5,
        name: 'Darth',
        lastName: 'Vader'
      },
      {
        id: 6,
        name: 'Padm\u00e9',
        lastName: 'Amidala'
      }
    ],
    traceId: '149b8b92-b03c-466c-81b3-9ece202b219a'
  },
  {
    id: 'da792c3c-ca4d-43c5-b21b-55169aea8174',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Encrypt::Aes256',
    name: 'stage:start:encrypt',
    timestamp: 1780842701559,
    type: 'stage',
    boundary: 'start',
    traceId: '149b8b92-b03c-466c-81b3-9ece202b219a'
  },
  {
    id: '665a92b4-5a8c-4c16-87f3-4b7d97d3bbaf',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Encrypt::Aes256',
    name: 'stage:end:encrypt',
    timestamp: 1780842701560,
    type: 'stage',
    boundary: 'end',
    traceId: '149b8b92-b03c-466c-81b3-9ece202b219a'
  },
  {
    id: '2b29f7cf-4bae-4671-bb4c-88d1c11fc53e',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Persist::LocalStorage',
    name: 'stage:start:persist',
    timestamp: 1780842701562,
    type: 'stage',
    boundary: 'start',
    traceId: '149b8b92-b03c-466c-81b3-9ece202b219a'
  },
  {
    id: '15a09d6f-5a82-443d-88a2-673291dd5fd6',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Persist::LocalStorage',
    name: 'stage:end:persist',
    timestamp: 1780842701563,
    type: 'stage',
    boundary: 'end',
    traceId: '149b8b92-b03c-466c-81b3-9ece202b219a'
  },
  {
    id: 'baf4ec5a-1c5a-48a7-bfec-2666390ea82e',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'lifecycle:end:merge',
    timestamp: 1780842701564,
    state: {
      isLoading: false,
      value: [
        {
          id: 11,
          name: 'Luke',
          lastName: 'Skywalker',
          jedi: true
        },
        {
          id: 38,
          name: 'Leia',
          lastName: 'Organa',
          senator: true
        },
        {
          id: 4,
          name: 'Obi-Wan',
          lastName: 'Kenobi'
        },
        {
          id: 5,
          name: 'Darth',
          lastName: 'Vader'
        }
      ],
      error: null,
      hasValue: true
    },
    type: 'lifecycle',
    boundary: 'end',
    traceId: '149b8b92-b03c-466c-81b3-9ece202b219a'
  },
  {
    id: '0a1f0be1-b0de-47ce-9a5e-ec4bb99122ba',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:start:core-state',
    timestamp: 1780842701564,
    type: 'stage',
    boundary: 'start',
    traceId: '149b8b92-b03c-466c-81b3-9ece202b219a'
  },
  {
    id: 'cb0817a0-07b5-48db-a2fe-29fa68256bf5',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'pipeline:candidate:core-state',
    timestamp: 1780842701564,
    type: 'pipeline',
    boundary: 'candidate',
    candidate: [
      {
        id: 11,
        name: 'Luke',
        lastName: 'Skywalker',
        jedi: true
      },
      {
        id: 38,
        name: 'Leia',
        lastName: 'Organa',
        senator: true
      },
      {
        id: 4,
        name: 'Obi-Wan',
        lastName: 'Kenobi'
      },
      {
        id: 5,
        name: 'Darth',
        lastName: 'Vader'
      },
      {
        id: 6,
        name: 'Padm\u00e9',
        lastName: 'Amidala'
      }
    ],
    traceId: '149b8b92-b03c-466c-81b3-9ece202b219a'
  },
  {
    id: '37e2597d-1004-435a-aa63-869df3bf1b6d',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:end:core-state',
    timestamp: 1780842701565,
    state: {
      isLoading: false,
      value: [
        {
          id: 11,
          name: 'Luke',
          lastName: 'Skywalker',
          jedi: true
        },
        {
          id: 38,
          name: 'Leia',
          lastName: 'Organa',
          senator: true
        },
        {
          id: 4,
          name: 'Obi-Wan',
          lastName: 'Kenobi'
        },
        {
          id: 5,
          name: 'Darth',
          lastName: 'Vader'
        },
        {
          id: 6,
          name: 'Padm\u00e9',
          lastName: 'Amidala'
        }
      ],
      error: null,
      hasValue: true
    },
    type: 'stage',
    boundary: 'end',
    traceId: '149b8b92-b03c-466c-81b3-9ece202b219a'
  },
  {
    id: 'e5427b3c-35bd-4dbc-820b-d4219f39cb9a',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:success',
    timestamp: 1780842701566,
    type: 'lifecycle',
    boundary: 'notification',
    traceId: '149b8b92-b03c-466c-81b3-9ece202b219a'
  },
  {
    id: 'e1ede19a-32e7-491d-800b-8625e8f21295',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'conductor:end:attempt',
    timestamp: 1780842701567,
    type: 'conductor',
    boundary: 'end',
    payload: {
      status: 'success'
    },
    traceId: '149b8b92-b03c-466c-81b3-9ece202b219a'
  },
  {
    id: '12f0635a-684c-44a9-a2b5-ac6c2ff00e6d',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:finalize',
    timestamp: 1780842701568,
    type: 'lifecycle',
    boundary: 'notification',
    traceId: '149b8b92-b03c-466c-81b3-9ece202b219a'
  },
  {
    id: '219d408d-8b72-4088-8ee7-183f7a06e9dc',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'conductor:start:attempt',
    timestamp: 1780842702136,
    type: 'conductor',
    boundary: 'start',
    traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356'
  },
  {
    id: '721c79d9-0e6e-4d84-8cbf-4678089c8be4',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:start:attempt',
    timestamp: 1780842702138,
    type: 'controller',
    boundary: 'start',
    traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356'
  },
  {
    id: '3f46f48e-f6bc-438b-b958-ecc8dbc5be15',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:start:vote',
    timestamp: 1780842702139,
    type: 'controller',
    boundary: 'start',
    traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356'
  },
  {
    id: 'e91d0747-912e-4aec-a693-ca3fdb04997a',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:start:vote',
    timestamp: 1780842702140,
    type: 'controller',
    boundary: 'start',
    traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356'
  },
  {
    id: 'd2049bb9-84fd-4b26-a591-572c2934bea9',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:start:vote',
    timestamp: 1780842702141,
    type: 'controller',
    boundary: 'start',
    traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356'
  },
  {
    id: '0fd64949-6184-4a42-a487-df5ea197398e',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:start:vote',
    timestamp: 1780842702141,
    type: 'controller',
    boundary: 'start',
    traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356'
  },
  {
    id: 'f27999c0-8bcb-4a1b-a143-a983ea6061f7',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Delay',
    name: 'controller:start:vote',
    timestamp: 1780842702142,
    type: 'controller',
    boundary: 'start',
    traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356'
  },
  {
    id: '026d658c-eb37-4f3d-b4d6-a7275cf419ef',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Stepwise',
    name: 'controller:start:vote',
    timestamp: 1780842702143,
    type: 'controller',
    boundary: 'start',
    traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356'
  },
  {
    id: '4c9d3032-9728-4547-8fab-3a23fcd79c7a',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::TabSync',
    name: 'controller:start:vote',
    timestamp: 1780842702144,
    type: 'controller',
    boundary: 'start',
    traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356'
  },
  {
    id: '4906dd03-cf53-4f1e-8ab7-c1897f0ae70e',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:end:vote',
    timestamp: 1780842702145,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356'
  },
  {
    id: '5478996f-e6b5-4eb3-bc6d-cfb8a0b6ac79',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:end:vote',
    timestamp: 1780842702145,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356'
  },
  {
    id: '34d4ce28-ca40-49e3-b840-cfa16bdd026a',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:end:vote',
    timestamp: 1780842702146,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356'
  },
  {
    id: '9e235108-68c0-4a61-aaa7-c0e5e51f2b5f',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Delay',
    name: 'controller:end:vote',
    timestamp: 1780842702147,
    type: 'controller',
    boundary: 'end',
    payload: 'deny',
    traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356'
  },
  {
    id: 'fcd61e08-93b8-40f4-bd2c-a68891e7dbd4',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Stepwise',
    name: 'controller:end:vote',
    timestamp: 1780842702148,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356'
  },
  {
    id: 'a069d7af-2eba-4b26-b313-0f77db1ce16c',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::TabSync',
    name: 'controller:end:vote',
    timestamp: 1780842702148,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356'
  },
  {
    id: '1cc23c9e-7f97-4a21-b292-610822675f57',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:end:vote',
    timestamp: 1780842702149,
    type: 'controller',
    boundary: 'end',
    payload: {
      traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356',
      outcome: 'deny'
    },
    traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356'
  },
  {
    id: 'a27b7912-18df-4e66-ab5a-d8aba311e600',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'conductor:notification:deny',
    timestamp: 1780842702151,
    type: 'conductor',
    boundary: 'notification',
    traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356'
  },
  {
    id: '5a3faffa-cd05-466a-a061-dfb30baf9460',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'lifecycle:notification:revote',
    timestamp: 1780842702643,
    type: 'lifecycle',
    boundary: 'notification',
    traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356'
  },
  {
    id: 'c154cdd6-3583-4039-96bf-9b69288aab22',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:start:attempt',
    timestamp: 1780842702645,
    type: 'controller',
    boundary: 'start',
    traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356'
  },
  {
    id: 'd8b6bddb-9298-48e4-a57a-1d8943e6958c',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:start:vote',
    timestamp: 1780842702647,
    type: 'controller',
    boundary: 'start',
    traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356'
  },
  {
    id: 'e582fc5b-f322-4662-87cf-2abcb1d78e2b',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:start:vote',
    timestamp: 1780842702648,
    type: 'controller',
    boundary: 'start',
    traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356'
  },
  {
    id: '852fa934-c50b-4dd8-8cd1-d546b110bcb6',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:start:vote',
    timestamp: 1780842702649,
    type: 'controller',
    boundary: 'start',
    traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356'
  },
  {
    id: 'd223b0ae-a868-473a-980b-33115e49b0d1',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:start:vote',
    timestamp: 1780842702649,
    type: 'controller',
    boundary: 'start',
    traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356'
  },
  {
    id: 'be88f002-956b-46e4-afec-9be8e55692f3',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Delay',
    name: 'controller:start:vote',
    timestamp: 1780842702650,
    type: 'controller',
    boundary: 'start',
    traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356'
  },
  {
    id: '4301b9c3-6848-48d3-856c-e79177506fd4',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Stepwise',
    name: 'controller:start:vote',
    timestamp: 1780842702651,
    type: 'controller',
    boundary: 'start',
    traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356'
  },
  {
    id: '8bcccc65-093d-46f4-9458-3b71a252d3fa',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::TabSync',
    name: 'controller:start:vote',
    timestamp: 1780842702652,
    type: 'controller',
    boundary: 'start',
    traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356'
  },
  {
    id: 'cf21365e-1e94-4753-a273-31aa2c1c64f5',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:end:vote',
    timestamp: 1780842702653,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356'
  },
  {
    id: '0a188a03-b8c8-43bf-baaf-3c25f7219d69',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:end:vote',
    timestamp: 1780842702654,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356'
  },
  {
    id: '594ba147-69f4-43b1-bd47-d6942057f653',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:end:vote',
    timestamp: 1780842702654,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356'
  },
  {
    id: '08bd9aef-1cf3-46c7-a9ee-ce559d91d5e0',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Delay',
    name: 'controller:end:vote',
    timestamp: 1780842702655,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356'
  },
  {
    id: '80ad751d-87cd-43b7-b26b-76e398d45742',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Stepwise',
    name: 'controller:end:vote',
    timestamp: 1780842702656,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356'
  },
  {
    id: 'd5f0f035-abf5-4485-be68-1fe8b0f79651',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::TabSync',
    name: 'controller:end:vote',
    timestamp: 1780842702657,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356'
  },
  {
    id: 'ebe7a82e-f70a-4800-8dee-a43bde8cd5ea',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:end:vote',
    timestamp: 1780842702657,
    type: 'controller',
    boundary: 'end',
    payload: {
      traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356',
      outcome: 'abstain'
    },
    traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356'
  },
  {
    id: '784b3011-dba4-44c3-be27-bc44503f83ee',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:end:attempt',
    timestamp: 1780842702659,
    type: 'controller',
    boundary: 'end',
    payload: {
      decision: true
    },
    traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356'
  },
  {
    id: '0a1cf168-b581-4504-a495-4bb181029a76',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'pipeline:candidate:pipeline-start',
    timestamp: 1780842702659,
    type: 'pipeline',
    boundary: 'candidate',
    candidate: [
      {
        id: 11,
        name: 'Luke',
        lastName: 'Skywalker',
        jedi: true
      },
      {
        id: 38,
        name: 'Leia',
        lastName: 'Organa',
        senator: true
      },
      {
        id: 4,
        name: 'Obi-Wan',
        lastName: 'Kenobi'
      },
      {
        id: 5,
        name: 'Darth',
        lastName: 'Vader'
      },
      {
        id: 6,
        name: 'Padm\u00e9',
        lastName: 'Amidala'
      }
    ],
    traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356'
  },
  {
    id: '00c45b67-522b-4447-96ad-49b9848874d7',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'lifecycle:start:merge',
    timestamp: 1780842702660,
    type: 'lifecycle',
    boundary: 'start',
    traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356'
  },
  {
    id: '0d986d7d-9d4e-455d-8c22-d832fdfbb8c0',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    name: 'stage:start:resolve',
    timestamp: 1780842702661,
    type: 'stage',
    boundary: 'start',
    traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356'
  },
  {
    id: 'a97a8860-6b83-41cc-a94b-ee53f9d8f3e4',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    name: 'stage:end:resolve',
    timestamp: 1780842702662,
    state: {
      isLoading: false,
      value: [
        {
          id: 11,
          name: 'Luke',
          lastName: 'Skywalker',
          jedi: true
        },
        {
          id: 38,
          name: 'Leia',
          lastName: 'Organa',
          senator: true
        },
        {
          id: 4,
          name: 'Obi-Wan',
          lastName: 'Kenobi'
        },
        {
          id: 5,
          name: 'Darth',
          lastName: 'Vader'
        },
        {
          id: 6,
          name: 'Padm\u00e9',
          lastName: 'Amidala'
        }
      ],
      error: null,
      hasValue: true
    },
    type: 'stage',
    boundary: 'end',
    traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356'
  },
  {
    id: '7d01905b-9c86-4762-a983-1b770dde231c',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'pipeline:candidate:resolve',
    timestamp: 1780842702663,
    type: 'pipeline',
    boundary: 'candidate',
    candidate: [
      {
        id: 11,
        name: 'Luke',
        lastName: 'Skywalker',
        jedi: true
      },
      {
        id: 38,
        name: 'Leia',
        lastName: 'Organa',
        senator: true
      },
      {
        id: 4,
        name: 'Obi-Wan',
        lastName: 'Kenobi'
      },
      {
        id: 5,
        name: 'Darth',
        lastName: 'Vader'
      },
      {
        id: 6,
        name: 'Padm\u00e9',
        lastName: 'Amidala'
      },
      {
        id: 7,
        name: 'Mace',
        lastName: 'Windu'
      }
    ],
    traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356'
  },
  {
    id: '31268116-adad-4b02-82be-69e70c5e65a3',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:start:compute-merge',
    timestamp: 1780842702663,
    type: 'stage',
    boundary: 'start',
    traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356'
  },
  {
    id: 'd7132d68-5b11-4ecf-9212-fdb790385de4',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:end:compute-merge',
    timestamp: 1780842702665,
    state: {
      isLoading: false,
      value: [
        {
          id: 11,
          name: 'Luke',
          lastName: 'Skywalker',
          jedi: true
        },
        {
          id: 38,
          name: 'Leia',
          lastName: 'Organa',
          senator: true
        },
        {
          id: 4,
          name: 'Obi-Wan',
          lastName: 'Kenobi'
        },
        {
          id: 5,
          name: 'Darth',
          lastName: 'Vader'
        },
        {
          id: 6,
          name: 'Padm\u00e9',
          lastName: 'Amidala'
        }
      ],
      error: null,
      hasValue: true
    },
    type: 'stage',
    boundary: 'end',
    traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356'
  },
  {
    id: '40513ffb-7255-455d-9859-9e10033fe1cd',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'pipeline:candidate:compute-merge',
    timestamp: 1780842702665,
    type: 'pipeline',
    boundary: 'candidate',
    candidate: [
      {
        id: 11,
        name: 'Luke',
        lastName: 'Skywalker',
        jedi: true
      },
      {
        id: 38,
        name: 'Leia',
        lastName: 'Organa',
        senator: true
      },
      {
        id: 4,
        name: 'Obi-Wan',
        lastName: 'Kenobi'
      },
      {
        id: 5,
        name: 'Darth',
        lastName: 'Vader'
      },
      {
        id: 6,
        name: 'Padm\u00e9',
        lastName: 'Amidala'
      },
      {
        id: 7,
        name: 'Mace',
        lastName: 'Windu'
      }
    ],
    traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356'
  },
  {
    id: '9bb99d2a-96e1-4027-b861-44581412203b',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Filter',
    name: 'stage:start:filter',
    timestamp: 1780842702666,
    type: 'stage',
    boundary: 'start',
    traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356'
  },
  {
    id: '81cc9222-4b79-4a44-b771-d22a039ff9cf',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Filter',
    name: 'stage:end:filter',
    timestamp: 1780842702667,
    type: 'stage',
    boundary: 'end',
    traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356'
  },
  {
    id: 'a64c1541-d6e6-476d-ba45-026dea6fb164',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'pipeline:candidate:filter',
    timestamp: 1780842702667,
    type: 'pipeline',
    boundary: 'candidate',
    candidate: [
      {
        id: 11,
        name: 'Luke',
        lastName: 'Skywalker',
        jedi: true
      },
      {
        id: 38,
        name: 'Leia',
        lastName: 'Organa',
        senator: true
      },
      {
        id: 4,
        name: 'Obi-Wan',
        lastName: 'Kenobi'
      },
      {
        id: 5,
        name: 'Darth',
        lastName: 'Vader'
      },
      {
        id: 6,
        name: 'Padm\u00e9',
        lastName: 'Amidala'
      },
      {
        id: 7,
        name: 'Mace',
        lastName: 'Windu'
      }
    ],
    traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356'
  },
  {
    id: '3d8bb3a9-61c7-435e-b71e-9d256d67f944',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Reducer',
    name: 'stage:start:reducer',
    timestamp: 1780842702668,
    type: 'stage',
    boundary: 'start',
    traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356'
  },
  {
    id: '5e0eeb9d-3094-40cf-b736-58f7061a7923',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Reducer',
    name: 'stage:end:reducer',
    timestamp: 1780842702669,
    state: {
      isLoading: false,
      value: [
        {
          id: 11,
          name: 'Luke',
          lastName: 'Skywalker',
          jedi: true
        },
        {
          id: 38,
          name: 'Leia',
          lastName: 'Organa',
          senator: true
        },
        {
          id: 4,
          name: 'Obi-Wan',
          lastName: 'Kenobi'
        },
        {
          id: 5,
          name: 'Darth',
          lastName: 'Vader'
        },
        {
          id: 6,
          name: 'Padm\u00e9',
          lastName: 'Amidala'
        }
      ],
      error: null,
      hasValue: true
    },
    type: 'stage',
    boundary: 'end',
    traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356'
  },
  {
    id: '293e78bf-89f4-4971-99cf-a1a34d5646d6',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'pipeline:candidate:reducer',
    timestamp: 1780842702670,
    type: 'pipeline',
    boundary: 'candidate',
    candidate: [
      {
        id: 11,
        name: 'Luke',
        lastName: 'Skywalker',
        jedi: true
      },
      {
        id: 38,
        name: 'Leia',
        lastName: 'Organa',
        senator: true
      },
      {
        id: 4,
        name: 'Obi-Wan',
        lastName: 'Kenobi'
      },
      {
        id: 5,
        name: 'Darth',
        lastName: 'Vader'
      },
      {
        id: 6,
        name: 'Padm\u00e9',
        lastName: 'Amidala'
      },
      {
        id: 7,
        name: 'Mace',
        lastName: 'Windu'
      }
    ],
    traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356'
  },
  {
    id: '03fdf712-6850-46a7-9833-af9ec3e0863e',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Encrypt::Aes256',
    name: 'stage:start:encrypt',
    timestamp: 1780842702671,
    type: 'stage',
    boundary: 'start',
    traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356'
  },
  {
    id: '4bafe8f9-da45-4d31-b9a0-e0c7c8ee1f4c',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Encrypt::Aes256',
    name: 'stage:end:encrypt',
    timestamp: 1780842702672,
    type: 'stage',
    boundary: 'end',
    traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356'
  },
  {
    id: '86b6bdfc-11ec-4de7-8b3e-6bfba173d529',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Persist::LocalStorage',
    name: 'stage:start:persist',
    timestamp: 1780842702675,
    type: 'stage',
    boundary: 'start',
    traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356'
  },
  {
    id: '4d92f048-4b93-4d8b-9543-4d8865252a9c',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Persist::LocalStorage',
    name: 'stage:end:persist',
    timestamp: 1780842702675,
    type: 'stage',
    boundary: 'end',
    traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356'
  },
  {
    id: '8f8474c8-3575-49e3-a554-3af9e67af25b',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'lifecycle:end:merge',
    timestamp: 1780842702676,
    state: {
      isLoading: false,
      value: [
        {
          id: 11,
          name: 'Luke',
          lastName: 'Skywalker',
          jedi: true
        },
        {
          id: 38,
          name: 'Leia',
          lastName: 'Organa',
          senator: true
        },
        {
          id: 4,
          name: 'Obi-Wan',
          lastName: 'Kenobi'
        },
        {
          id: 5,
          name: 'Darth',
          lastName: 'Vader'
        },
        {
          id: 6,
          name: 'Padm\u00e9',
          lastName: 'Amidala'
        }
      ],
      error: null,
      hasValue: true
    },
    type: 'lifecycle',
    boundary: 'end',
    traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356'
  },
  {
    id: '8526d8fa-1496-42ae-bd3d-f4b4bfd8498d',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:start:core-state',
    timestamp: 1780842702677,
    type: 'stage',
    boundary: 'start',
    traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356'
  },
  {
    id: '11e53148-6845-49f4-b1cf-492837fdab70',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'pipeline:candidate:core-state',
    timestamp: 1780842702677,
    type: 'pipeline',
    boundary: 'candidate',
    candidate: [
      {
        id: 11,
        name: 'Luke',
        lastName: 'Skywalker',
        jedi: true
      },
      {
        id: 38,
        name: 'Leia',
        lastName: 'Organa',
        senator: true
      },
      {
        id: 4,
        name: 'Obi-Wan',
        lastName: 'Kenobi'
      },
      {
        id: 5,
        name: 'Darth',
        lastName: 'Vader'
      },
      {
        id: 6,
        name: 'Padm\u00e9',
        lastName: 'Amidala'
      },
      {
        id: 7,
        name: 'Mace',
        lastName: 'Windu'
      }
    ],
    traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356'
  },
  {
    id: '6175d4f1-a9a8-48ed-9546-6377fcda2b8c',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:end:core-state',
    timestamp: 1780842702678,
    state: {
      isLoading: false,
      value: [
        {
          id: 11,
          name: 'Luke',
          lastName: 'Skywalker',
          jedi: true
        },
        {
          id: 38,
          name: 'Leia',
          lastName: 'Organa',
          senator: true
        },
        {
          id: 4,
          name: 'Obi-Wan',
          lastName: 'Kenobi'
        },
        {
          id: 5,
          name: 'Darth',
          lastName: 'Vader'
        },
        {
          id: 6,
          name: 'Padm\u00e9',
          lastName: 'Amidala'
        },
        {
          id: 7,
          name: 'Mace',
          lastName: 'Windu'
        }
      ],
      error: null,
      hasValue: true
    },
    type: 'stage',
    boundary: 'end',
    traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356'
  },
  {
    id: 'bd31bde7-ea5c-41b5-aca9-8729e140d6d3',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:success',
    timestamp: 1780842702679,
    type: 'lifecycle',
    boundary: 'notification',
    traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356'
  },
  {
    id: '1732c382-a0b5-443e-a14a-e39381bea994',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'conductor:end:attempt',
    timestamp: 1780842702679,
    type: 'conductor',
    boundary: 'end',
    payload: {
      status: 'success'
    },
    traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356'
  },
  {
    id: '07fe9e71-8de2-4247-bf15-5809438aaf7a',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:finalize',
    timestamp: 1780842702680,
    type: 'lifecycle',
    boundary: 'notification',
    traceId: 'e9d82b30-7194-431d-8ac5-3e9f5a35a356'
  }
];
