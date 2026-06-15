import { EventShape } from '@sdux-vault/shared';

/**
 * Real-world pipeline event capture from a running SDuX Vault application.
 * Contains 624 events across 16 traces from starwars and startrek feature cells.
 *
 * Trace summary:
 *   - 8 successful (conductor:end:attempt)
 *   - 4 failed (lifecycle:notification:runtime-error)
 *   - 4 orphaned (no terminal event)
 *   - 2 cells: starwars-feature-cell-key, startrek-feature-cell-key
 */

export const PIPELINE_EVENT_ARTIFACT: EventShape[] = [
  {
    id: '38f9a554-f9be-43b2-9abc-d23088bf8c47',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'conductor:start:attempt',
    timestamp: 1780527409408,
    type: 'conductor',
    boundary: 'start',
    traceId: '9338f067-5169-4282-86de-0985cd8bcb99'
  },
  {
    id: '5db5a669-5be9-4134-abb8-39dcc1c0fb62',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:start:vote',
    timestamp: 1780527409408,
    type: 'controller',
    boundary: 'start',
    traceId: '9338f067-5169-4282-86de-0985cd8bcb99'
  },
  {
    id: '87fdb962-fe2f-4dce-914d-3082aa92c396',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:start:vote',
    timestamp: 1780527409408,
    type: 'controller',
    boundary: 'start',
    traceId: '9338f067-5169-4282-86de-0985cd8bcb99'
  },
  {
    id: '19b8881b-fd61-4cb0-a034-bccddae4e385',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:start:vote',
    timestamp: 1780527409408,
    type: 'controller',
    boundary: 'start',
    traceId: '9338f067-5169-4282-86de-0985cd8bcb99'
  },
  {
    id: 'f63465a5-0ada-4bf4-8bf9-33f40d3c4dd7',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:start:vote',
    timestamp: 1780527409408,
    type: 'controller',
    boundary: 'start',
    traceId: '9338f067-5169-4282-86de-0985cd8bcb99'
  },
  {
    id: '821efd05-31e8-4046-9c57-426514fa8d6a',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Delay',
    name: 'controller:start:vote',
    timestamp: 1780527409408,
    type: 'controller',
    boundary: 'start',
    traceId: '9338f067-5169-4282-86de-0985cd8bcb99'
  },
  {
    id: 'cfcb2123-cf1b-40c4-a2f2-d0d8cea161e4',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Stepwise',
    name: 'controller:start:vote',
    timestamp: 1780527409408,
    type: 'controller',
    boundary: 'start',
    traceId: '9338f067-5169-4282-86de-0985cd8bcb99'
  },
  {
    id: 'f346f7e4-8201-45f0-975f-313877bb45ec',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::TabSync',
    name: 'controller:start:vote',
    timestamp: 1780527409408,
    type: 'controller',
    boundary: 'start',
    traceId: '9338f067-5169-4282-86de-0985cd8bcb99'
  },
  {
    id: '995b863b-667c-4e5b-a98c-894b07901fbc',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:end:vote',
    timestamp: 1780527409408,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '9338f067-5169-4282-86de-0985cd8bcb99'
  },
  {
    id: '2d89bcc8-f1d9-4d6e-af92-ba91990d488a',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:end:vote',
    timestamp: 1780527409408,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '9338f067-5169-4282-86de-0985cd8bcb99'
  },
  {
    id: 'a28a9d22-5727-4f58-93e1-859e5d880af3',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:end:vote',
    timestamp: 1780527409408,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '9338f067-5169-4282-86de-0985cd8bcb99'
  },
  {
    id: '64b3b754-6bef-400d-85d3-9cf0964c3869',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Delay',
    name: 'controller:end:vote',
    timestamp: 1780527409408,
    type: 'controller',
    boundary: 'end',
    payload: 'deny',
    traceId: '9338f067-5169-4282-86de-0985cd8bcb99'
  },
  {
    id: '02272db8-0e42-4bc2-9b54-82d673ffbc43',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Stepwise',
    name: 'controller:end:vote',
    timestamp: 1780527409409,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '9338f067-5169-4282-86de-0985cd8bcb99'
  },
  {
    id: 'ea8ef513-2f24-44be-b35b-f83302d18cfa',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::TabSync',
    name: 'controller:end:vote',
    timestamp: 1780527409409,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '9338f067-5169-4282-86de-0985cd8bcb99'
  },
  {
    id: 'c8f98b65-4568-42ef-89a4-2e7a2f3fd3f6',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:end:vote',
    timestamp: 1780527409409,
    type: 'controller',
    boundary: 'end',
    payload: {
      traceId: '9338f067-5169-4282-86de-0985cd8bcb99',
      outcome: 'deny'
    },
    traceId: '9338f067-5169-4282-86de-0985cd8bcb99'
  },
  {
    id: 'f2935628-51de-462e-8c11-a5a041b9cd8e',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'conductor:notification:deny',
    timestamp: 1780527409409,
    type: 'conductor',
    boundary: 'notification',
    traceId: '9338f067-5169-4282-86de-0985cd8bcb99'
  },
  {
    id: '164f342d-67a8-4f3a-9212-a9123094a5b0',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'lifecycle:notification:revote',
    timestamp: 1780527409910,
    type: 'lifecycle',
    boundary: 'notification',
    traceId: '9338f067-5169-4282-86de-0985cd8bcb99'
  },
  {
    id: '69255307-4a01-4f2d-9698-0d9d195265c3',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:start:vote',
    timestamp: 1780527409910,
    type: 'controller',
    boundary: 'start',
    traceId: '9338f067-5169-4282-86de-0985cd8bcb99'
  },
  {
    id: '5c2215fe-12da-403d-a50e-1a73d8b3968f',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:start:vote',
    timestamp: 1780527409910,
    type: 'controller',
    boundary: 'start',
    traceId: '9338f067-5169-4282-86de-0985cd8bcb99'
  },
  {
    id: '1781a674-4031-43b2-befc-5d12a4f8f253',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:start:vote',
    timestamp: 1780527409910,
    type: 'controller',
    boundary: 'start',
    traceId: '9338f067-5169-4282-86de-0985cd8bcb99'
  },
  {
    id: '64a916c5-994e-4283-9667-1155b2fefea3',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:start:vote',
    timestamp: 1780527409911,
    type: 'controller',
    boundary: 'start',
    traceId: '9338f067-5169-4282-86de-0985cd8bcb99'
  },
  {
    id: '005bc7ae-05b7-4df0-b008-95aa4132649f',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Delay',
    name: 'controller:start:vote',
    timestamp: 1780527409911,
    type: 'controller',
    boundary: 'start',
    traceId: '9338f067-5169-4282-86de-0985cd8bcb99'
  },
  {
    id: '09e097fe-e526-41af-aa68-6f390c90da14',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Stepwise',
    name: 'controller:start:vote',
    timestamp: 1780527409911,
    type: 'controller',
    boundary: 'start',
    traceId: '9338f067-5169-4282-86de-0985cd8bcb99'
  },
  {
    id: '67385737-d6aa-4b42-b9cc-565dc76b87d8',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::TabSync',
    name: 'controller:start:vote',
    timestamp: 1780527409911,
    type: 'controller',
    boundary: 'start',
    traceId: '9338f067-5169-4282-86de-0985cd8bcb99'
  },
  {
    id: '9da7ab11-d2aa-4df4-996e-447aab954d8b',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:end:vote',
    timestamp: 1780527409911,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '9338f067-5169-4282-86de-0985cd8bcb99'
  },
  {
    id: '0482c1e0-c306-41fc-b6e4-5520eca2e3a7',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:end:vote',
    timestamp: 1780527409911,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '9338f067-5169-4282-86de-0985cd8bcb99'
  },
  {
    id: '1cc5fd87-9fe1-4182-9b8c-fa00d8d14175',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:end:vote',
    timestamp: 1780527409911,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '9338f067-5169-4282-86de-0985cd8bcb99'
  },
  {
    id: '01d0fa3f-3ae1-46d2-b33f-899410fabc2e',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Delay',
    name: 'controller:end:vote',
    timestamp: 1780527409912,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '9338f067-5169-4282-86de-0985cd8bcb99'
  },
  {
    id: 'cdaf3027-b94a-48ac-ac1c-870ca7686470',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Stepwise',
    name: 'controller:end:vote',
    timestamp: 1780527409912,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '9338f067-5169-4282-86de-0985cd8bcb99'
  },
  {
    id: '8470a883-99ba-478a-84f6-fe7f42df79de',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::TabSync',
    name: 'controller:end:vote',
    timestamp: 1780527409912,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '9338f067-5169-4282-86de-0985cd8bcb99'
  },
  {
    id: '42a914ac-08a2-48bb-bee8-dda3cc4714fb',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:end:vote',
    timestamp: 1780527409912,
    type: 'controller',
    boundary: 'end',
    payload: {
      traceId: '9338f067-5169-4282-86de-0985cd8bcb99',
      outcome: 'abstain'
    },
    traceId: '9338f067-5169-4282-86de-0985cd8bcb99'
  },
  {
    id: '421ce977-ff4b-4c95-bfdf-725beb6b3ba1',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'lifecycle:start:replace',
    timestamp: 1780527409912,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '9338f067-5169-4282-86de-0985cd8bcb99'
  },
  {
    id: 'eedca869-e706-47e1-9d3d-1140517a7fff',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    name: 'stage:start:resolve',
    timestamp: 1780527409912,
    type: 'stage',
    boundary: 'start',
    traceId: '9338f067-5169-4282-86de-0985cd8bcb99'
  },
  {
    id: 'aa059e83-3828-4e14-9932-c5a599166a2a',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    name: 'stage:end:resolve',
    timestamp: 1780527409913,
    state: {
      isLoading: false,
      error: null,
      hasValue: false
    },
    type: 'stage',
    boundary: 'end',
    traceId: '9338f067-5169-4282-86de-0985cd8bcb99'
  },
  {
    id: 'be627fc3-7827-4402-982a-5856e59e2b7e',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Filter',
    name: 'stage:start:filter',
    timestamp: 1780527409913,
    type: 'stage',
    boundary: 'start',
    traceId: '9338f067-5169-4282-86de-0985cd8bcb99'
  },
  {
    id: '0f37f8c4-2660-4d7c-97e8-4d153abfb973',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Filter',
    name: 'stage:end:filter',
    timestamp: 1780527409913,
    type: 'stage',
    boundary: 'end',
    traceId: '9338f067-5169-4282-86de-0985cd8bcb99'
  },
  {
    id: '56612b8c-bdcc-456f-a686-db921aa90f98',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Reducer',
    name: 'stage:start:reducer',
    timestamp: 1780527409913,
    type: 'stage',
    boundary: 'start',
    traceId: '9338f067-5169-4282-86de-0985cd8bcb99'
  },
  {
    id: '25d47dd9-98e6-431f-b2b0-a9390f33cdc2',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Reducer',
    name: 'stage:end:reducer',
    timestamp: 1780527409914,
    state: {
      isLoading: false,
      error: null,
      hasValue: false
    },
    type: 'stage',
    boundary: 'end',
    traceId: '9338f067-5169-4282-86de-0985cd8bcb99'
  },
  {
    id: '9a1800fe-8e1d-41bf-8015-03737fed5d7c',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Encrypt::Aes256',
    name: 'stage:start:encrypt',
    timestamp: 1780527409914,
    type: 'stage',
    boundary: 'start',
    traceId: '9338f067-5169-4282-86de-0985cd8bcb99'
  },
  {
    id: 'f2d49dd5-8dec-48e7-9214-565cf500c8e8',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Encrypt::Aes256',
    name: 'stage:end:encrypt',
    timestamp: 1780527409916,
    type: 'stage',
    boundary: 'end',
    traceId: '9338f067-5169-4282-86de-0985cd8bcb99'
  },
  {
    id: '670de57a-139f-4679-ac7e-8bc50ae39669',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Persist::LocalStorage',
    name: 'stage:start:persist',
    timestamp: 1780527409916,
    type: 'stage',
    boundary: 'start',
    traceId: '9338f067-5169-4282-86de-0985cd8bcb99'
  },
  {
    id: 'e63c5f17-a24b-4657-83da-b873f6ffe6ac',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Persist::LocalStorage',
    name: 'stage:end:persist',
    timestamp: 1780527409916,
    type: 'stage',
    boundary: 'end',
    traceId: '9338f067-5169-4282-86de-0985cd8bcb99'
  },
  {
    id: '1e3c5e7e-be11-4aa3-86b3-aef1eb2440ac',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'lifecycle:end:replace',
    timestamp: 1780527409916,
    state: {
      isLoading: false,
      error: null,
      hasValue: false
    },
    type: 'lifecycle',
    boundary: 'end',
    traceId: '9338f067-5169-4282-86de-0985cd8bcb99'
  },
  {
    id: '2b871722-8470-4f46-b40b-2527eb0cc65d',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:start:core-state',
    timestamp: 1780527409916,
    type: 'stage',
    boundary: 'start',
    traceId: '9338f067-5169-4282-86de-0985cd8bcb99'
  },
  {
    id: '766ec521-0d3d-4808-b281-9dbf3bc6865e',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:end:core-state',
    timestamp: 1780527409917,
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
    traceId: '9338f067-5169-4282-86de-0985cd8bcb99'
  },
  {
    id: 'c667a975-8712-415e-8204-ce58a73cefeb',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:success',
    timestamp: 1780527409917,
    type: 'lifecycle',
    boundary: 'notification',
    traceId: '9338f067-5169-4282-86de-0985cd8bcb99'
  },
  {
    id: '8e1cedc1-1070-4ed3-9b06-bea5b2e7094f',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'conductor:end:attempt',
    timestamp: 1780527409917,
    type: 'conductor',
    boundary: 'end',
    payload: {
      status: 'success'
    },
    traceId: '9338f067-5169-4282-86de-0985cd8bcb99'
  },
  {
    id: '317388dc-a6e9-4727-af5c-7c1543a23b61',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:finalize',
    timestamp: 1780527409917,
    type: 'lifecycle',
    boundary: 'notification',
    traceId: '9338f067-5169-4282-86de-0985cd8bcb99'
  },
  {
    id: 'dbc28b5f-4b83-4bbc-bcbd-eeb69b747ed0',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'conductor:start:attempt',
    timestamp: 1780527411295,
    type: 'conductor',
    boundary: 'start',
    traceId: '7ea47d4c-aa8e-4a9f-bd82-719287b5ba3c'
  },
  {
    id: 'b233df05-c1ed-4494-b4d3-1458a2d8f7e0',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:start:vote',
    timestamp: 1780527411295,
    type: 'controller',
    boundary: 'start',
    traceId: '7ea47d4c-aa8e-4a9f-bd82-719287b5ba3c'
  },
  {
    id: '56bd8024-f921-41a5-9dbc-dfda73518e61',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:start:vote',
    timestamp: 1780527411296,
    type: 'controller',
    boundary: 'start',
    traceId: '7ea47d4c-aa8e-4a9f-bd82-719287b5ba3c'
  },
  {
    id: '561457de-3079-407e-bc82-2b07f0f4c421',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:start:vote',
    timestamp: 1780527411296,
    type: 'controller',
    boundary: 'start',
    traceId: '7ea47d4c-aa8e-4a9f-bd82-719287b5ba3c'
  },
  {
    id: 'bd9c3d92-0611-4ac4-af78-b32df17b0e25',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:start:vote',
    timestamp: 1780527411296,
    type: 'controller',
    boundary: 'start',
    traceId: '7ea47d4c-aa8e-4a9f-bd82-719287b5ba3c'
  },
  {
    id: '56a0404d-8a59-4333-a5c0-07f1c6dc19b1',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Delay',
    name: 'controller:start:vote',
    timestamp: 1780527411296,
    type: 'controller',
    boundary: 'start',
    traceId: '7ea47d4c-aa8e-4a9f-bd82-719287b5ba3c'
  },
  {
    id: '5047947c-e11f-423f-979b-2cca2687aebc',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Stepwise',
    name: 'controller:start:vote',
    timestamp: 1780527411296,
    type: 'controller',
    boundary: 'start',
    traceId: '7ea47d4c-aa8e-4a9f-bd82-719287b5ba3c'
  },
  {
    id: '0bc9feb2-81a8-4a43-9988-f66aa0122982',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::TabSync',
    name: 'controller:start:vote',
    timestamp: 1780527411296,
    type: 'controller',
    boundary: 'start',
    traceId: '7ea47d4c-aa8e-4a9f-bd82-719287b5ba3c'
  },
  {
    id: '560e454a-95df-44ce-b9d8-2a7ddb5bd7b1',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:end:vote',
    timestamp: 1780527411297,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '7ea47d4c-aa8e-4a9f-bd82-719287b5ba3c'
  },
  {
    id: 'f6247a25-8f85-4a6f-ab8e-24850f2355de',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:end:vote',
    timestamp: 1780527411297,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '7ea47d4c-aa8e-4a9f-bd82-719287b5ba3c'
  },
  {
    id: 'd3a9bced-0e61-42f9-a1b3-0e40c9f105cb',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:end:vote',
    timestamp: 1780527411297,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '7ea47d4c-aa8e-4a9f-bd82-719287b5ba3c'
  },
  {
    id: '7ed406aa-195d-44a0-b2f9-134e5cea9c08',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Delay',
    name: 'controller:end:vote',
    timestamp: 1780527411297,
    type: 'controller',
    boundary: 'end',
    payload: 'deny',
    traceId: '7ea47d4c-aa8e-4a9f-bd82-719287b5ba3c'
  },
  {
    id: '2d2275c3-9cfd-4546-9c8d-b972741fda07',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Stepwise',
    name: 'controller:end:vote',
    timestamp: 1780527411297,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '7ea47d4c-aa8e-4a9f-bd82-719287b5ba3c'
  },
  {
    id: 'a07b1c28-b7a3-4e21-a60b-6d36509320f9',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::TabSync',
    name: 'controller:end:vote',
    timestamp: 1780527411297,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '7ea47d4c-aa8e-4a9f-bd82-719287b5ba3c'
  },
  {
    id: 'b05e26a5-9ae6-4c27-ae58-d7ab4910d2d2',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:end:vote',
    timestamp: 1780527411297,
    type: 'controller',
    boundary: 'end',
    payload: {
      traceId: '7ea47d4c-aa8e-4a9f-bd82-719287b5ba3c',
      outcome: 'deny'
    },
    traceId: '7ea47d4c-aa8e-4a9f-bd82-719287b5ba3c'
  },
  {
    id: '6c76e053-9b6e-41d6-bb88-dd35340cc846',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'conductor:notification:deny',
    timestamp: 1780527411298,
    type: 'conductor',
    boundary: 'notification',
    traceId: '7ea47d4c-aa8e-4a9f-bd82-719287b5ba3c'
  },
  {
    id: 'abe5d6f5-9659-49ae-b643-0b14dfe9496e',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'lifecycle:notification:revote',
    timestamp: 1780527411797,
    type: 'lifecycle',
    boundary: 'notification',
    traceId: '7ea47d4c-aa8e-4a9f-bd82-719287b5ba3c'
  },
  {
    id: '90ec86e4-b174-4c53-bd6f-4a4d14e8581c',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:start:vote',
    timestamp: 1780527411798,
    type: 'controller',
    boundary: 'start',
    traceId: '7ea47d4c-aa8e-4a9f-bd82-719287b5ba3c'
  },
  {
    id: '07e32aa8-d245-4879-b490-9376664d7e44',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:start:vote',
    timestamp: 1780527411798,
    type: 'controller',
    boundary: 'start',
    traceId: '7ea47d4c-aa8e-4a9f-bd82-719287b5ba3c'
  },
  {
    id: 'ab3a1b40-827f-4948-9d27-fd194575faee',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:start:vote',
    timestamp: 1780527411798,
    type: 'controller',
    boundary: 'start',
    traceId: '7ea47d4c-aa8e-4a9f-bd82-719287b5ba3c'
  },
  {
    id: 'f59c754c-1af5-4ce4-a76f-1e4ea2c9f34c',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:start:vote',
    timestamp: 1780527411798,
    type: 'controller',
    boundary: 'start',
    traceId: '7ea47d4c-aa8e-4a9f-bd82-719287b5ba3c'
  },
  {
    id: 'eba83aa8-3aa1-4388-8127-39d13dd268b5',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Delay',
    name: 'controller:start:vote',
    timestamp: 1780527411799,
    type: 'controller',
    boundary: 'start',
    traceId: '7ea47d4c-aa8e-4a9f-bd82-719287b5ba3c'
  },
  {
    id: 'c04ed362-116c-468d-b6b6-143ecde4d9b3',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Stepwise',
    name: 'controller:start:vote',
    timestamp: 1780527411799,
    type: 'controller',
    boundary: 'start',
    traceId: '7ea47d4c-aa8e-4a9f-bd82-719287b5ba3c'
  },
  {
    id: '5fa59f4b-9239-4b0d-ae86-874ddc68d333',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::TabSync',
    name: 'controller:start:vote',
    timestamp: 1780527411799,
    type: 'controller',
    boundary: 'start',
    traceId: '7ea47d4c-aa8e-4a9f-bd82-719287b5ba3c'
  },
  {
    id: '164f0b11-2165-4168-ba2c-63b3f8b53a09',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:end:vote',
    timestamp: 1780527411799,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '7ea47d4c-aa8e-4a9f-bd82-719287b5ba3c'
  },
  {
    id: 'd122fc5f-43cb-4470-a00b-067095bebf98',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:end:vote',
    timestamp: 1780527411799,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '7ea47d4c-aa8e-4a9f-bd82-719287b5ba3c'
  },
  {
    id: '7ba2756f-7e02-4a5b-a3e2-2933d536b3af',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:end:vote',
    timestamp: 1780527411800,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '7ea47d4c-aa8e-4a9f-bd82-719287b5ba3c'
  },
  {
    id: '0de7d37f-59af-44f3-baa1-aeb76b0c2048',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Delay',
    name: 'controller:end:vote',
    timestamp: 1780527411800,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '7ea47d4c-aa8e-4a9f-bd82-719287b5ba3c'
  },
  {
    id: 'b623b8f0-2e28-49fc-8fdc-e5e8d562a83b',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Stepwise',
    name: 'controller:end:vote',
    timestamp: 1780527411800,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '7ea47d4c-aa8e-4a9f-bd82-719287b5ba3c'
  },
  {
    id: '9aeb34a7-eae0-4799-b854-3cfacb65717a',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::TabSync',
    name: 'controller:end:vote',
    timestamp: 1780527411800,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '7ea47d4c-aa8e-4a9f-bd82-719287b5ba3c'
  },
  {
    id: 'bcd58b20-6ae7-4c1b-8397-28e159f30f98',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:end:vote',
    timestamp: 1780527411801,
    type: 'controller',
    boundary: 'end',
    payload: {
      traceId: '7ea47d4c-aa8e-4a9f-bd82-719287b5ba3c',
      outcome: 'abstain'
    },
    traceId: '7ea47d4c-aa8e-4a9f-bd82-719287b5ba3c'
  },
  {
    id: '320bc772-8c67-4042-a533-a47a7bb18735',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'lifecycle:start:merge',
    timestamp: 1780527411801,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '7ea47d4c-aa8e-4a9f-bd82-719287b5ba3c'
  },
  {
    id: 'bcac291c-52a1-4f6f-b04d-c82d2a196ceb',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    name: 'stage:start:resolve',
    timestamp: 1780527411801,
    type: 'stage',
    boundary: 'start',
    traceId: '7ea47d4c-aa8e-4a9f-bd82-719287b5ba3c'
  },
  {
    id: 'dab00f22-9678-43eb-b570-efa1ce08688d',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    name: 'stage:end:resolve',
    timestamp: 1780527411801,
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
    traceId: '7ea47d4c-aa8e-4a9f-bd82-719287b5ba3c'
  },
  {
    id: 'd6dd4c7a-dcb1-4e06-8a72-584c808b1b2d',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:start:compute-merge',
    timestamp: 1780527411802,
    type: 'stage',
    boundary: 'start',
    traceId: '7ea47d4c-aa8e-4a9f-bd82-719287b5ba3c'
  },
  {
    id: 'e48fda6f-fedd-41c0-9e95-8aa95250324f',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:end:compute-merge',
    timestamp: 1780527411802,
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
    traceId: '7ea47d4c-aa8e-4a9f-bd82-719287b5ba3c'
  },
  {
    id: '4b909a79-b799-4cec-97b8-a90b7e7776ed',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Filter',
    name: 'stage:start:filter',
    timestamp: 1780527411802,
    type: 'stage',
    boundary: 'start',
    traceId: '7ea47d4c-aa8e-4a9f-bd82-719287b5ba3c'
  },
  {
    id: 'f86fca5b-12b5-4c38-ba33-e6dfb35704e2',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Filter',
    name: 'stage:end:filter',
    timestamp: 1780527411802,
    type: 'stage',
    boundary: 'end',
    traceId: '7ea47d4c-aa8e-4a9f-bd82-719287b5ba3c'
  },
  {
    id: 'c56e6459-e60f-4bbd-bae5-2686288103fe',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Reducer',
    name: 'stage:start:reducer',
    timestamp: 1780527411803,
    type: 'stage',
    boundary: 'start',
    traceId: '7ea47d4c-aa8e-4a9f-bd82-719287b5ba3c'
  },
  {
    id: '8d110251-d22b-4489-a3e9-81ce525bc9ec',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Reducer',
    name: 'stage:end:reducer',
    timestamp: 1780527411803,
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
    traceId: '7ea47d4c-aa8e-4a9f-bd82-719287b5ba3c'
  },
  {
    id: 'ac0f1b8e-0268-4a36-b86b-98761cc5d6f7',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Encrypt::Aes256',
    name: 'stage:start:encrypt',
    timestamp: 1780527411803,
    type: 'stage',
    boundary: 'start',
    traceId: '7ea47d4c-aa8e-4a9f-bd82-719287b5ba3c'
  },
  {
    id: '7718c492-05e4-457b-a53d-ffab7a816c22',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Encrypt::Aes256',
    name: 'stage:end:encrypt',
    timestamp: 1780527411804,
    type: 'stage',
    boundary: 'end',
    traceId: '7ea47d4c-aa8e-4a9f-bd82-719287b5ba3c'
  },
  {
    id: '76ac356f-9065-4fb4-95d7-5c74f643f87b',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Persist::LocalStorage',
    name: 'stage:start:persist',
    timestamp: 1780527411805,
    type: 'stage',
    boundary: 'start',
    traceId: '7ea47d4c-aa8e-4a9f-bd82-719287b5ba3c'
  },
  {
    id: 'f79ba5c1-9329-4663-b244-f6af656f1123',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Persist::LocalStorage',
    name: 'stage:end:persist',
    timestamp: 1780527411805,
    type: 'stage',
    boundary: 'end',
    traceId: '7ea47d4c-aa8e-4a9f-bd82-719287b5ba3c'
  },
  {
    id: '27eafba9-c2cc-407b-a9f5-262c4b3bc65a',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'lifecycle:end:merge',
    timestamp: 1780527411805,
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
    traceId: '7ea47d4c-aa8e-4a9f-bd82-719287b5ba3c'
  },
  {
    id: '04847bfb-9de2-4f37-aee1-80357237a5bc',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:start:core-state',
    timestamp: 1780527411805,
    type: 'stage',
    boundary: 'start',
    traceId: '7ea47d4c-aa8e-4a9f-bd82-719287b5ba3c'
  },
  {
    id: '113ccc4e-6a12-4420-b066-1e178105e0e8',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:end:core-state',
    timestamp: 1780527411806,
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
    traceId: '7ea47d4c-aa8e-4a9f-bd82-719287b5ba3c'
  },
  {
    id: 'c7b1fa59-d66c-4ea2-b495-aab26931246a',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:success',
    timestamp: 1780527411806,
    type: 'lifecycle',
    boundary: 'notification',
    traceId: '7ea47d4c-aa8e-4a9f-bd82-719287b5ba3c'
  },
  {
    id: '6adad1c8-0b81-4c4b-ba2f-59eb54d7ea20',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'conductor:end:attempt',
    timestamp: 1780527411806,
    type: 'conductor',
    boundary: 'end',
    payload: {
      status: 'success'
    },
    traceId: '7ea47d4c-aa8e-4a9f-bd82-719287b5ba3c'
  },
  {
    id: 'a3eb5012-f7f3-4b64-9771-a5245d5f15e6',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:finalize',
    timestamp: 1780527411806,
    type: 'lifecycle',
    boundary: 'notification',
    traceId: '7ea47d4c-aa8e-4a9f-bd82-719287b5ba3c'
  },
  {
    id: '0fa2a544-4a48-4f15-a081-3fd1ae7841db',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'conductor:start:attempt',
    timestamp: 1780527413506,
    type: 'conductor',
    boundary: 'start',
    traceId: 'd8c3b9e1-68f6-4bac-b658-ea8da0f00979'
  },
  {
    id: 'f58a89ad-7ed8-49ba-ba1e-963c29bf3aa2',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:start:vote',
    timestamp: 1780527413506,
    type: 'controller',
    boundary: 'start',
    traceId: 'd8c3b9e1-68f6-4bac-b658-ea8da0f00979'
  },
  {
    id: '8a92512b-8ba5-462a-bfcf-0ca4d938d720',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:start:vote',
    timestamp: 1780527413507,
    type: 'controller',
    boundary: 'start',
    traceId: 'd8c3b9e1-68f6-4bac-b658-ea8da0f00979'
  },
  {
    id: '94dfc968-6ec6-49b4-8ac7-58fcf2930eed',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:start:vote',
    timestamp: 1780527413507,
    type: 'controller',
    boundary: 'start',
    traceId: 'd8c3b9e1-68f6-4bac-b658-ea8da0f00979'
  },
  {
    id: '53bd053a-b7df-4465-b122-2fc8b9e89de0',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:start:vote',
    timestamp: 1780527413507,
    type: 'controller',
    boundary: 'start',
    traceId: 'd8c3b9e1-68f6-4bac-b658-ea8da0f00979'
  },
  {
    id: '2cf38804-ea9c-483e-9bea-e4d370014ac3',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:end:vote',
    timestamp: 1780527413507,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'd8c3b9e1-68f6-4bac-b658-ea8da0f00979'
  },
  {
    id: '0316feff-6bd2-47f6-8e05-275c6c91288b',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:end:vote',
    timestamp: 1780527413508,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'd8c3b9e1-68f6-4bac-b658-ea8da0f00979'
  },
  {
    id: '021bd457-6a7e-4231-9f0f-cd8ccaacf121',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:end:vote',
    timestamp: 1780527413508,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'd8c3b9e1-68f6-4bac-b658-ea8da0f00979'
  },
  {
    id: '89e8e936-693b-45be-a660-9b6f3b5e30ca',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:end:vote',
    timestamp: 1780527413508,
    type: 'controller',
    boundary: 'end',
    payload: {
      traceId: 'd8c3b9e1-68f6-4bac-b658-ea8da0f00979',
      outcome: 'abstain'
    },
    traceId: 'd8c3b9e1-68f6-4bac-b658-ea8da0f00979'
  },
  {
    id: 'f3842fb2-e2f4-4e37-8719-4c6d3451a81e',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'lifecycle:start:replace',
    timestamp: 1780527413508,
    type: 'lifecycle',
    boundary: 'start',
    traceId: 'd8c3b9e1-68f6-4bac-b658-ea8da0f00979'
  },
  {
    id: 'e58928a4-fec5-4e26-b216-da1cea2d2a62',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    name: 'stage:start:resolve',
    timestamp: 1780527413509,
    type: 'stage',
    boundary: 'start',
    traceId: 'd8c3b9e1-68f6-4bac-b658-ea8da0f00979'
  },
  {
    id: '26b1e51c-7a76-4803-815c-642b6ac62ae1',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    name: 'stage:end:resolve',
    timestamp: 1780527413509,
    state: {
      isLoading: false,
      value: [],
      error: null,
      hasValue: true
    },
    type: 'stage',
    boundary: 'end',
    traceId: 'd8c3b9e1-68f6-4bac-b658-ea8da0f00979'
  },
  {
    id: '47e6904f-4f20-45d4-87c1-1327034f6d83',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Filter',
    name: 'stage:start:filter',
    timestamp: 1780527413509,
    type: 'stage',
    boundary: 'start',
    traceId: 'd8c3b9e1-68f6-4bac-b658-ea8da0f00979'
  },
  {
    id: '0f83363d-6a62-4b52-8ddc-78ffd7df1cfb',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Filter',
    name: 'stage:end:filter',
    timestamp: 1780527413510,
    type: 'stage',
    boundary: 'end',
    traceId: 'd8c3b9e1-68f6-4bac-b658-ea8da0f00979'
  },
  {
    id: '9c9c5772-a25d-406e-bc34-306a7fde9dd6',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Reducer',
    name: 'stage:start:reducer',
    timestamp: 1780527413510,
    type: 'stage',
    boundary: 'start',
    traceId: 'd8c3b9e1-68f6-4bac-b658-ea8da0f00979'
  },
  {
    id: '6d7252b7-eed5-4fc3-98ce-d4c8972b680c',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Reducer',
    name: 'stage:end:reducer',
    timestamp: 1780527413510,
    state: {
      isLoading: false,
      value: [],
      error: null,
      hasValue: true
    },
    type: 'stage',
    boundary: 'end',
    traceId: 'd8c3b9e1-68f6-4bac-b658-ea8da0f00979'
  },
  {
    id: '6ca398bf-ef30-43fe-8f31-56e70c9b1ce0',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'lifecycle:end:replace',
    timestamp: 1780527413511,
    state: {
      isLoading: false,
      value: [],
      error: null,
      hasValue: true
    },
    type: 'lifecycle',
    boundary: 'end',
    traceId: 'd8c3b9e1-68f6-4bac-b658-ea8da0f00979'
  },
  {
    id: 'aaed7da1-578c-462b-a0e9-483841b7a5ad',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:start:core-state',
    timestamp: 1780527413512,
    type: 'stage',
    boundary: 'start',
    traceId: 'd8c3b9e1-68f6-4bac-b658-ea8da0f00979'
  },
  {
    id: '7fd1c9f7-be7a-4d9f-82c4-fe686414ee24',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:end:core-state',
    timestamp: 1780527413512,
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
    traceId: 'd8c3b9e1-68f6-4bac-b658-ea8da0f00979'
  },
  {
    id: '27a7bb86-023d-4da4-80f1-348fcd9e04a9',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:success',
    timestamp: 1780527413512,
    type: 'lifecycle',
    boundary: 'notification',
    traceId: 'd8c3b9e1-68f6-4bac-b658-ea8da0f00979'
  },
  {
    id: 'a889b811-1e82-4c86-a18b-a20453d30f9d',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'conductor:end:attempt',
    timestamp: 1780527413513,
    type: 'conductor',
    boundary: 'end',
    payload: {
      status: 'success'
    },
    traceId: 'd8c3b9e1-68f6-4bac-b658-ea8da0f00979'
  },
  {
    id: '562c4246-ea12-4414-b926-3c39078554ba',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:finalize',
    timestamp: 1780527413513,
    type: 'lifecycle',
    boundary: 'notification',
    traceId: 'd8c3b9e1-68f6-4bac-b658-ea8da0f00979'
  },
  {
    id: 'be0a6ac1-00ad-4661-a162-3d58eed01775',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-feature-cell',
    name: 'lifecycle:start:reset',
    timestamp: 1780527415870,
    type: 'lifecycle',
    boundary: 'start'
  },
  {
    id: '62fa2e02-eb47-4808-a96f-175a77692898',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'lifecycle:start:reset',
    timestamp: 1780527415871,
    type: 'lifecycle',
    boundary: 'start'
  },
  {
    id: '5ddbdddf-d153-48f5-97f1-fd358f4b55c3',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::AfterTap',
    name: 'lifecycle:start:reset',
    timestamp: 1780527415871,
    type: 'lifecycle',
    boundary: 'start',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: 'bd09ece7-99ec-4414-917d-db1c5d3a024d',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::AfterTap',
    name: 'lifecycle:end:reset',
    timestamp: 1780527415872,
    type: 'lifecycle',
    boundary: 'end',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: '24aaf9b3-798c-49b2-b3b7-10a72b1f1d23',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::BeforeTap',
    name: 'lifecycle:start:reset',
    timestamp: 1780527415872,
    type: 'lifecycle',
    boundary: 'start',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: '34ab3e7e-60d9-48cf-93fe-83ca4e889cdf',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::BeforeTap',
    name: 'lifecycle:end:reset',
    timestamp: 1780527415872,
    type: 'lifecycle',
    boundary: 'end',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: 'ad6d9cfc-2edb-489a-b94e-71dd88e3451e',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Error',
    name: 'lifecycle:start:reset',
    timestamp: 1780527415872,
    type: 'lifecycle',
    boundary: 'start',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: '99d94d37-6da0-463e-a17c-6d47c53c7b37',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Error',
    name: 'lifecycle:end:reset',
    timestamp: 1780527415873,
    type: 'lifecycle',
    boundary: 'end',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: '721a0f34-9f46-48d5-af18-a99515d309d0',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Filter',
    name: 'lifecycle:start:reset',
    timestamp: 1780527415873,
    type: 'lifecycle',
    boundary: 'start',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: 'b9b53d2b-1fe4-4f26-b5bf-b96d6b2b56ea',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Filter',
    name: 'lifecycle:end:reset',
    timestamp: 1780527415873,
    type: 'lifecycle',
    boundary: 'end',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: '5e2e0658-dbc1-4abb-b849-b92f6e7e570c',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::FromObservable',
    name: 'lifecycle:start:reset',
    timestamp: 1780527415873,
    type: 'lifecycle',
    boundary: 'start',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: '1349998f-b81d-4d4d-b885-cca445f980a6',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::FromObservable',
    name: 'lifecycle:end:reset',
    timestamp: 1780527415874,
    type: 'lifecycle',
    boundary: 'end',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: '77ddf7ee-f327-4948-96fa-a80c23a652c5',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::FromPromise',
    name: 'lifecycle:start:reset',
    timestamp: 1780527415874,
    type: 'lifecycle',
    boundary: 'start',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: 'e089878e-723b-41fb-b75b-c8d43a947c02',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::FromPromise',
    name: 'lifecycle:end:reset',
    timestamp: 1780527415874,
    type: 'lifecycle',
    boundary: 'end',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: '265b23b3-11e1-4bed-a2a0-a834d5d82da5',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::FromStream',
    name: 'lifecycle:start:reset',
    timestamp: 1780527415874,
    type: 'lifecycle',
    boundary: 'start',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: '9ed55dfe-b11d-4715-85aa-c0de253fc77b',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::FromStream',
    name: 'lifecycle:end:reset',
    timestamp: 1780527415875,
    type: 'lifecycle',
    boundary: 'end',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: 'cc524e19-e984-4277-a526-01358174754c',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Observable',
    name: 'lifecycle:start:reset',
    timestamp: 1780527415875,
    type: 'lifecycle',
    boundary: 'start',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: '575b1e80-8253-4be4-a400-327af3968aa9',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Observable',
    name: 'lifecycle:end:reset',
    timestamp: 1780527415875,
    type: 'lifecycle',
    boundary: 'end',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: 'dc2fac5d-20d5-4b74-8ead-3f6532fc90a3',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Promise',
    name: 'lifecycle:start:reset',
    timestamp: 1780527415875,
    type: 'lifecycle',
    boundary: 'start',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: 'eb4766c5-d827-4981-a3fb-eb97118562dd',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Promise',
    name: 'lifecycle:end:reset',
    timestamp: 1780527415876,
    type: 'lifecycle',
    boundary: 'end',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: '7b46c063-a3bb-4c5e-bb8e-dcf4c91aada5',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Reducer',
    name: 'lifecycle:start:reset',
    timestamp: 1780527415876,
    type: 'lifecycle',
    boundary: 'start',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: '9612a666-b7c1-4bf9-ab19-8e4da9d0919f',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Reducer',
    name: 'lifecycle:end:reset',
    timestamp: 1780527415876,
    type: 'lifecycle',
    boundary: 'end',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: '351ee32c-3145-402d-b76a-c85c395a2579',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    name: 'lifecycle:start:reset',
    timestamp: 1780527415877,
    type: 'lifecycle',
    boundary: 'start',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: '766b8778-b3ae-460c-b498-a5d96024975c',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    name: 'lifecycle:end:reset',
    timestamp: 1780527415877,
    type: 'lifecycle',
    boundary: 'end',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: '34932ce4-44d5-4015-b063-45b68621b552',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::State',
    name: 'lifecycle:start:reset',
    timestamp: 1780527415877,
    type: 'lifecycle',
    boundary: 'start',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: '820bacb4-c48e-4d6e-9517-df56d2920824',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::State',
    name: 'lifecycle:end:reset',
    timestamp: 1780527415877,
    type: 'lifecycle',
    boundary: 'end',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: 'e5435a7f-d4ca-4431-a24a-018d0b96cfd1',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::ArrayMerge',
    name: 'lifecycle:start:reset',
    timestamp: 1780527415878,
    type: 'lifecycle',
    boundary: 'start',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: '079fc1ee-7651-4c8d-8ed6-05a6ec32cfe8',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::ArrayMerge',
    name: 'lifecycle:end:reset',
    timestamp: 1780527415878,
    type: 'lifecycle',
    boundary: 'end',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: '4a8a0c12-c33e-4742-9987-4d3d7b7fdc43',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::License',
    name: 'lifecycle:start:reset',
    timestamp: 1780527415878,
    type: 'lifecycle',
    boundary: 'start',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: 'c0dda2df-d397-48dd-9594-69b32e31639e',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::License',
    name: 'lifecycle:end:reset',
    timestamp: 1780527415878,
    type: 'lifecycle',
    boundary: 'end',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: 'fffbcdc7-8617-4caf-b582-2a713827de41',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'lifecycle:start:reset',
    timestamp: 1780527415878,
    type: 'lifecycle',
    boundary: 'start',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: 'a6ec9f91-4796-4587-8c0b-b8671bcba78f',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'lifecycle:end:reset',
    timestamp: 1780527415879,
    type: 'lifecycle',
    boundary: 'end',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: '7c37f374-2c50-4f30-89d9-c4c3032a6897',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'lifecycle:start:reset',
    timestamp: 1780527415879,
    type: 'lifecycle',
    boundary: 'start',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: 'd8cb251b-81b4-4f3e-83cc-e636e052b285',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'lifecycle:end:reset',
    timestamp: 1780527415879,
    type: 'lifecycle',
    boundary: 'end',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: 'abacce0e-6cc0-467c-8bbb-a64ac15055bd',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'lifecycle:start:reset',
    timestamp: 1780527415880,
    type: 'lifecycle',
    boundary: 'start',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: 'f046b8da-ff08-42f2-ae04-9f90cff644a3',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'lifecycle:end:reset',
    timestamp: 1780527415880,
    type: 'lifecycle',
    boundary: 'end',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: 'c0c5e1de-5df3-4d71-9f8a-007681773e40',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'lifecycle:end:reset',
    timestamp: 1780527415881,
    type: 'lifecycle',
    boundary: 'end',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: 'd2a625c9-6c37-44a5-a6a5-845072c1c842',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-feature-cell',
    name: 'lifecycle:end:reset',
    timestamp: 1780527415881,
    type: 'lifecycle',
    boundary: 'end',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: '8998b0e4-56c4-416c-b1cb-c1efbcc162ce',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'conductor:start:attempt',
    timestamp: 1780527417550,
    type: 'conductor',
    boundary: 'start',
    traceId: '3b3f838b-821d-4e1b-95ff-9226953b3ce3'
  },
  {
    id: '12d617dc-e2c6-4244-87f3-9f482a5396ab',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:start:vote',
    timestamp: 1780527417550,
    type: 'controller',
    boundary: 'start',
    traceId: '3b3f838b-821d-4e1b-95ff-9226953b3ce3'
  },
  {
    id: 'c637eeac-0bdc-4488-ac86-94470ad20a70',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:start:vote',
    timestamp: 1780527417550,
    type: 'controller',
    boundary: 'start',
    traceId: '3b3f838b-821d-4e1b-95ff-9226953b3ce3'
  },
  {
    id: '4f0f7f08-2b50-4be9-8edb-03b32f886fcc',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:start:vote',
    timestamp: 1780527417551,
    type: 'controller',
    boundary: 'start',
    traceId: '3b3f838b-821d-4e1b-95ff-9226953b3ce3'
  },
  {
    id: 'dc5ce0ed-844e-4970-a659-08bff7fb1a7e',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:start:vote',
    timestamp: 1780527417551,
    type: 'controller',
    boundary: 'start',
    traceId: '3b3f838b-821d-4e1b-95ff-9226953b3ce3'
  },
  {
    id: '7e7a47de-2f15-47f2-a1ef-be86b3bcbab9',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Delay',
    name: 'controller:start:vote',
    timestamp: 1780527417551,
    type: 'controller',
    boundary: 'start',
    traceId: '3b3f838b-821d-4e1b-95ff-9226953b3ce3'
  },
  {
    id: 'bee770e6-55b2-455c-93ef-be843bd86c47',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Stepwise',
    name: 'controller:start:vote',
    timestamp: 1780527417552,
    type: 'controller',
    boundary: 'start',
    traceId: '3b3f838b-821d-4e1b-95ff-9226953b3ce3'
  },
  {
    id: 'f31228b6-c44c-4127-9793-ac7516501700',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::TabSync',
    name: 'controller:start:vote',
    timestamp: 1780527417552,
    type: 'controller',
    boundary: 'start',
    traceId: '3b3f838b-821d-4e1b-95ff-9226953b3ce3'
  },
  {
    id: 'b761ca11-d2f8-4653-8378-3b420cf1bb75',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:end:vote',
    timestamp: 1780527417552,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '3b3f838b-821d-4e1b-95ff-9226953b3ce3'
  },
  {
    id: '49929617-824c-4601-91e8-fccfe128341f',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:end:vote',
    timestamp: 1780527417552,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '3b3f838b-821d-4e1b-95ff-9226953b3ce3'
  },
  {
    id: '28f26542-27b9-42d8-8177-431ff85a61aa',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:end:vote',
    timestamp: 1780527417553,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '3b3f838b-821d-4e1b-95ff-9226953b3ce3'
  },
  {
    id: '10b49c83-b5bf-43e6-aa34-28e03d2b6a2b',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Delay',
    name: 'controller:end:vote',
    timestamp: 1780527417553,
    type: 'controller',
    boundary: 'end',
    payload: 'deny',
    traceId: '3b3f838b-821d-4e1b-95ff-9226953b3ce3'
  },
  {
    id: '4ca2e3ae-0787-48a7-9b7e-53f4e25203b0',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Stepwise',
    name: 'controller:end:vote',
    timestamp: 1780527417553,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '3b3f838b-821d-4e1b-95ff-9226953b3ce3'
  },
  {
    id: 'c80e6a64-a72f-40a1-afe9-e6e7b780e83e',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::TabSync',
    name: 'controller:end:vote',
    timestamp: 1780527417553,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '3b3f838b-821d-4e1b-95ff-9226953b3ce3'
  },
  {
    id: 'c9c170cc-7400-4a0d-99b5-c4321ad22a2e',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:end:vote',
    timestamp: 1780527417554,
    type: 'controller',
    boundary: 'end',
    payload: {
      traceId: '3b3f838b-821d-4e1b-95ff-9226953b3ce3',
      outcome: 'deny'
    },
    traceId: '3b3f838b-821d-4e1b-95ff-9226953b3ce3'
  },
  {
    id: '408c4324-95dc-4f62-b104-c93abb990329',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'conductor:notification:deny',
    timestamp: 1780527417554,
    type: 'conductor',
    boundary: 'notification',
    traceId: '3b3f838b-821d-4e1b-95ff-9226953b3ce3'
  },
  {
    id: '51b6086c-5d28-42d6-89ab-e969dc7bbbbe',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'lifecycle:notification:revote',
    timestamp: 1780527418053,
    type: 'lifecycle',
    boundary: 'notification',
    traceId: '3b3f838b-821d-4e1b-95ff-9226953b3ce3'
  },
  {
    id: '3fc9c135-d95b-45a2-a8fe-b8bec57c7587',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:start:vote',
    timestamp: 1780527418054,
    type: 'controller',
    boundary: 'start',
    traceId: '3b3f838b-821d-4e1b-95ff-9226953b3ce3'
  },
  {
    id: '7cc24c5e-1228-4029-8ca2-ff116e9beb8f',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:start:vote',
    timestamp: 1780527418054,
    type: 'controller',
    boundary: 'start',
    traceId: '3b3f838b-821d-4e1b-95ff-9226953b3ce3'
  },
  {
    id: '86518e1b-a51a-43ba-ba06-a760d0f2ddc1',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:start:vote',
    timestamp: 1780527418055,
    type: 'controller',
    boundary: 'start',
    traceId: '3b3f838b-821d-4e1b-95ff-9226953b3ce3'
  },
  {
    id: 'c0dd2f88-4225-47bc-bb82-01fe29402536',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:start:vote',
    timestamp: 1780527418056,
    type: 'controller',
    boundary: 'start',
    traceId: '3b3f838b-821d-4e1b-95ff-9226953b3ce3'
  },
  {
    id: 'ceb8cf3b-b5cb-4a27-9f3a-ce021631381f',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Delay',
    name: 'controller:start:vote',
    timestamp: 1780527418056,
    type: 'controller',
    boundary: 'start',
    traceId: '3b3f838b-821d-4e1b-95ff-9226953b3ce3'
  },
  {
    id: 'ba3c016c-8205-4f41-a85f-528c1c3aa1e0',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Stepwise',
    name: 'controller:start:vote',
    timestamp: 1780527418057,
    type: 'controller',
    boundary: 'start',
    traceId: '3b3f838b-821d-4e1b-95ff-9226953b3ce3'
  },
  {
    id: '67c8c8b4-2639-41fa-8078-457231fe99e8',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::TabSync',
    name: 'controller:start:vote',
    timestamp: 1780527418057,
    type: 'controller',
    boundary: 'start',
    traceId: '3b3f838b-821d-4e1b-95ff-9226953b3ce3'
  },
  {
    id: '387ef07c-db4a-4f06-934a-5f960679b5d4',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:end:vote',
    timestamp: 1780527418057,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '3b3f838b-821d-4e1b-95ff-9226953b3ce3'
  },
  {
    id: '0289c9a6-fdea-438a-938f-9ca861be95f7',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:end:vote',
    timestamp: 1780527418058,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '3b3f838b-821d-4e1b-95ff-9226953b3ce3'
  },
  {
    id: '8bdf0959-791f-4c73-ab49-e4335a0efb5b',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:end:vote',
    timestamp: 1780527418058,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '3b3f838b-821d-4e1b-95ff-9226953b3ce3'
  },
  {
    id: 'e0d78e6b-d064-47cc-941e-dbc94132ab92',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Delay',
    name: 'controller:end:vote',
    timestamp: 1780527418058,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '3b3f838b-821d-4e1b-95ff-9226953b3ce3'
  },
  {
    id: 'c75b21ba-a697-4379-a0b3-06c834ecea8d',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Stepwise',
    name: 'controller:end:vote',
    timestamp: 1780527418059,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '3b3f838b-821d-4e1b-95ff-9226953b3ce3'
  },
  {
    id: 'e66b2b3c-b520-425d-bb79-f8a0fe9b608f',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::TabSync',
    name: 'controller:end:vote',
    timestamp: 1780527418060,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '3b3f838b-821d-4e1b-95ff-9226953b3ce3'
  },
  {
    id: 'f036953d-36b0-4b22-9080-f635b65bb5a2',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:end:vote',
    timestamp: 1780527418060,
    type: 'controller',
    boundary: 'end',
    payload: {
      traceId: '3b3f838b-821d-4e1b-95ff-9226953b3ce3',
      outcome: 'abstain'
    },
    traceId: '3b3f838b-821d-4e1b-95ff-9226953b3ce3'
  },
  {
    id: '4c18b8ac-1b5a-4837-bea2-34ad894778ec',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'lifecycle:start:merge',
    timestamp: 1780527418061,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '3b3f838b-821d-4e1b-95ff-9226953b3ce3'
  },
  {
    id: '3d6000b3-91bb-4a89-8bd3-0f592eaefb44',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    name: 'stage:start:resolve',
    timestamp: 1780527418061,
    type: 'stage',
    boundary: 'start',
    traceId: '3b3f838b-821d-4e1b-95ff-9226953b3ce3'
  },
  {
    id: 'e7d56a44-ce96-4296-8b3f-5159f3bc58ed',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    name: 'stage:end:resolve',
    timestamp: 1780527418061,
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
    traceId: '3b3f838b-821d-4e1b-95ff-9226953b3ce3'
  },
  {
    id: 'd4f8903b-9c85-4a4a-bf34-aff4ab914f66',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:start:compute-merge',
    timestamp: 1780527418062,
    type: 'stage',
    boundary: 'start',
    traceId: '3b3f838b-821d-4e1b-95ff-9226953b3ce3'
  },
  {
    id: 'a4a1adce-db27-4318-9190-9970690e347a',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:end:compute-merge',
    timestamp: 1780527418062,
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
    traceId: '3b3f838b-821d-4e1b-95ff-9226953b3ce3'
  },
  {
    id: 'eb59bb27-b2d4-452b-950e-eb1f23b2a23c',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Filter',
    name: 'stage:start:filter',
    timestamp: 1780527418063,
    type: 'stage',
    boundary: 'start',
    traceId: '3b3f838b-821d-4e1b-95ff-9226953b3ce3'
  },
  {
    id: '1c35ff18-7ea9-4abf-84b8-d8f620a72c8f',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Filter',
    name: 'stage:end:filter',
    timestamp: 1780527418063,
    type: 'stage',
    boundary: 'end',
    traceId: '3b3f838b-821d-4e1b-95ff-9226953b3ce3'
  },
  {
    id: '5b51516d-80ed-45af-84d7-7ab391120eeb',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Reducer',
    name: 'stage:start:reducer',
    timestamp: 1780527418064,
    type: 'stage',
    boundary: 'start',
    traceId: '3b3f838b-821d-4e1b-95ff-9226953b3ce3'
  },
  {
    id: 'e41ddc60-736c-4cde-b703-a0dadf9e7ed2',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Reducer',
    name: 'stage:end:reducer',
    timestamp: 1780527418064,
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
    traceId: '3b3f838b-821d-4e1b-95ff-9226953b3ce3'
  },
  {
    id: '2146edaa-1c1c-4638-ab13-9095e8a901d9',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Encrypt::Aes256',
    name: 'stage:start:encrypt',
    timestamp: 1780527418065,
    type: 'stage',
    boundary: 'start',
    traceId: '3b3f838b-821d-4e1b-95ff-9226953b3ce3'
  },
  {
    id: 'da890ad6-d6fb-473e-8f67-63da8bf97c6e',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Encrypt::Aes256',
    name: 'stage:end:encrypt',
    timestamp: 1780527418067,
    type: 'stage',
    boundary: 'end',
    traceId: '3b3f838b-821d-4e1b-95ff-9226953b3ce3'
  },
  {
    id: '24e944f0-7df4-415e-87b5-9e41bc52b875',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Persist::LocalStorage',
    name: 'stage:start:persist',
    timestamp: 1780527418067,
    type: 'stage',
    boundary: 'start',
    traceId: '3b3f838b-821d-4e1b-95ff-9226953b3ce3'
  },
  {
    id: '621c18f1-9836-4892-ba59-ec5afc28d032',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Persist::LocalStorage',
    name: 'stage:end:persist',
    timestamp: 1780527418067,
    type: 'stage',
    boundary: 'end',
    traceId: '3b3f838b-821d-4e1b-95ff-9226953b3ce3'
  },
  {
    id: '19f03b96-c0b6-4b6b-b6ee-40e1f01179f6',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'lifecycle:end:merge',
    timestamp: 1780527418068,
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
    traceId: '3b3f838b-821d-4e1b-95ff-9226953b3ce3'
  },
  {
    id: '93814b3e-3857-4b8e-891a-f229b5b8a6d1',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:start:core-state',
    timestamp: 1780527418068,
    type: 'stage',
    boundary: 'start',
    traceId: '3b3f838b-821d-4e1b-95ff-9226953b3ce3'
  },
  {
    id: 'b35adb3b-9e71-4084-bf68-18a9a62a95ed',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:end:core-state',
    timestamp: 1780527418069,
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
    traceId: '3b3f838b-821d-4e1b-95ff-9226953b3ce3'
  },
  {
    id: '3cda8212-3f9c-4561-af9a-52392267f518',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:success',
    timestamp: 1780527418069,
    type: 'lifecycle',
    boundary: 'notification',
    traceId: '3b3f838b-821d-4e1b-95ff-9226953b3ce3'
  },
  {
    id: '47874251-c444-4980-b036-ecf16cf71d52',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'conductor:end:attempt',
    timestamp: 1780527418070,
    type: 'conductor',
    boundary: 'end',
    payload: {
      status: 'success'
    },
    traceId: '3b3f838b-821d-4e1b-95ff-9226953b3ce3'
  },
  {
    id: 'fd9c0e67-4278-43c6-a29f-9b7da79f5e66',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:finalize',
    timestamp: 1780527418070,
    type: 'lifecycle',
    boundary: 'notification',
    traceId: '3b3f838b-821d-4e1b-95ff-9226953b3ce3'
  },
  {
    id: '258a6087-7b86-4b0e-90bc-cafff51bb58f',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'conductor:start:attempt',
    timestamp: 1780527419238,
    type: 'conductor',
    boundary: 'start',
    traceId: 'dd760cb0-54ef-40b3-903e-e918ed45d203'
  },
  {
    id: 'c891b7e4-717c-40c2-b46b-15fc09e2861f',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:start:vote',
    timestamp: 1780527419239,
    type: 'controller',
    boundary: 'start',
    traceId: 'dd760cb0-54ef-40b3-903e-e918ed45d203'
  },
  {
    id: 'be8f97e3-9b76-4083-b3aa-a6d5cc8bbaeb',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:start:vote',
    timestamp: 1780527419239,
    type: 'controller',
    boundary: 'start',
    traceId: 'dd760cb0-54ef-40b3-903e-e918ed45d203'
  },
  {
    id: 'f62e90dc-7ceb-471a-97c2-b6d478b91d28',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:start:vote',
    timestamp: 1780527419239,
    type: 'controller',
    boundary: 'start',
    traceId: 'dd760cb0-54ef-40b3-903e-e918ed45d203'
  },
  {
    id: '9bc5806a-cf4c-4f42-b039-fd5a9a648df2',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:start:vote',
    timestamp: 1780527419240,
    type: 'controller',
    boundary: 'start',
    traceId: 'dd760cb0-54ef-40b3-903e-e918ed45d203'
  },
  {
    id: '37d86e14-9459-4d2e-8ffd-5b5c17b93dd7',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:end:vote',
    timestamp: 1780527419240,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'dd760cb0-54ef-40b3-903e-e918ed45d203'
  },
  {
    id: '63457a30-609e-4f11-981d-a51ce296971e',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:end:vote',
    timestamp: 1780527419240,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'dd760cb0-54ef-40b3-903e-e918ed45d203'
  },
  {
    id: '016e4fbd-da2a-48c8-a0f7-d2d63b359580',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:end:vote',
    timestamp: 1780527419241,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'dd760cb0-54ef-40b3-903e-e918ed45d203'
  },
  {
    id: '4cf8146e-df36-4916-8103-97101e1a9ea9',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:end:vote',
    timestamp: 1780527419241,
    type: 'controller',
    boundary: 'end',
    payload: {
      traceId: 'dd760cb0-54ef-40b3-903e-e918ed45d203',
      outcome: 'abstain'
    },
    traceId: 'dd760cb0-54ef-40b3-903e-e918ed45d203'
  },
  {
    id: 'dcf5333b-60cd-44ec-8de5-12f1e291c9ce',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'lifecycle:start:replace',
    timestamp: 1780527419242,
    type: 'lifecycle',
    boundary: 'start',
    traceId: 'dd760cb0-54ef-40b3-903e-e918ed45d203'
  },
  {
    id: 'ca222320-ce71-4d55-b528-218d1ee52c93',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    name: 'stage:start:resolve',
    timestamp: 1780527419242,
    type: 'stage',
    boundary: 'start',
    traceId: 'dd760cb0-54ef-40b3-903e-e918ed45d203'
  },
  {
    id: '09a8ed90-ee6d-403d-80b1-92a88950dfa7',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    name: 'stage:end:resolve',
    timestamp: 1780527419242,
    state: {
      isLoading: false,
      error: null,
      hasValue: false
    },
    type: 'stage',
    boundary: 'end',
    traceId: 'dd760cb0-54ef-40b3-903e-e918ed45d203'
  },
  {
    id: '58a669c4-b096-4811-9877-37bbc9748b90',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Filter',
    name: 'stage:start:filter',
    timestamp: 1780527419243,
    type: 'stage',
    boundary: 'start',
    traceId: 'dd760cb0-54ef-40b3-903e-e918ed45d203'
  },
  {
    id: '8bab5cb7-15ed-428e-b801-cb097d46ec7d',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Filter',
    name: 'stage:end:filter',
    timestamp: 1780527419243,
    type: 'stage',
    boundary: 'end',
    traceId: 'dd760cb0-54ef-40b3-903e-e918ed45d203'
  },
  {
    id: '33af81f9-a3b0-42fd-b751-7a5816efeb8d',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Reducer',
    name: 'stage:start:reducer',
    timestamp: 1780527419244,
    type: 'stage',
    boundary: 'start',
    traceId: 'dd760cb0-54ef-40b3-903e-e918ed45d203'
  },
  {
    id: '8b4d8a8a-3dd8-44d7-8a5d-778cb8d13cda',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Reducer',
    name: 'stage:end:reducer',
    timestamp: 1780527419244,
    state: {
      isLoading: false,
      error: null,
      hasValue: false
    },
    type: 'stage',
    boundary: 'end',
    traceId: 'dd760cb0-54ef-40b3-903e-e918ed45d203'
  },
  {
    id: 'cb6122bc-ad0c-4472-a3c1-5aa1116bb8ff',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'lifecycle:end:replace',
    timestamp: 1780527419245,
    state: {
      isLoading: false,
      error: null,
      hasValue: false
    },
    type: 'lifecycle',
    boundary: 'end',
    traceId: 'dd760cb0-54ef-40b3-903e-e918ed45d203'
  },
  {
    id: '11d64e48-41ad-482d-bf88-d2d97ad9f792',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:start:core-state',
    timestamp: 1780527419247,
    type: 'stage',
    boundary: 'start',
    traceId: 'dd760cb0-54ef-40b3-903e-e918ed45d203'
  },
  {
    id: '99717050-c31c-4ac7-af42-6909164fd3ef',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:end:core-state',
    timestamp: 1780527419248,
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
    traceId: 'dd760cb0-54ef-40b3-903e-e918ed45d203'
  },
  {
    id: '6eb3a750-20da-4d24-84c0-38b41bd5822a',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:success',
    timestamp: 1780527419248,
    type: 'lifecycle',
    boundary: 'notification',
    traceId: 'dd760cb0-54ef-40b3-903e-e918ed45d203'
  },
  {
    id: 'b40118ad-b764-4682-961d-40c7ee99c8e7',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'conductor:end:attempt',
    timestamp: 1780527419249,
    type: 'conductor',
    boundary: 'end',
    payload: {
      status: 'success'
    },
    traceId: 'dd760cb0-54ef-40b3-903e-e918ed45d203'
  },
  {
    id: '1ebeadf4-e4c6-4d9d-a948-b082e6e14984',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:finalize',
    timestamp: 1780527419249,
    type: 'lifecycle',
    boundary: 'notification',
    traceId: 'dd760cb0-54ef-40b3-903e-e918ed45d203'
  },
  {
    id: '74ff2712-e997-4e90-b61d-d3a26f10880b',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'conductor:start:attempt',
    timestamp: 1780527419847,
    type: 'conductor',
    boundary: 'start',
    traceId: 'bf673fea-51f3-484a-ba58-d681227e007a'
  },
  {
    id: 'f7eb0bdd-97e0-48e0-bce0-aa81f0f8712f',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:start:vote',
    timestamp: 1780527419848,
    type: 'controller',
    boundary: 'start',
    traceId: 'bf673fea-51f3-484a-ba58-d681227e007a'
  },
  {
    id: 'b2d7b084-46e7-42d9-bb23-f1aff4060c37',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:start:vote',
    timestamp: 1780527419849,
    type: 'controller',
    boundary: 'start',
    traceId: 'bf673fea-51f3-484a-ba58-d681227e007a'
  },
  {
    id: '00907a4d-7e95-4d22-bc8c-19bb81350116',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:start:vote',
    timestamp: 1780527419849,
    type: 'controller',
    boundary: 'start',
    traceId: 'bf673fea-51f3-484a-ba58-d681227e007a'
  },
  {
    id: '5662383f-3892-480b-a1fa-ec5c81b27009',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:start:vote',
    timestamp: 1780527419850,
    type: 'controller',
    boundary: 'start',
    traceId: 'bf673fea-51f3-484a-ba58-d681227e007a'
  },
  {
    id: 'a0b93aba-5559-4a26-a435-b202aa795712',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:end:vote',
    timestamp: 1780527419850,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'bf673fea-51f3-484a-ba58-d681227e007a'
  },
  {
    id: '891b38d4-68a8-457f-8041-f3508d53493d',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:end:vote',
    timestamp: 1780527419851,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'bf673fea-51f3-484a-ba58-d681227e007a'
  },
  {
    id: '2c1925c3-ea8e-4052-a6ef-e16b003109b3',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:end:vote',
    timestamp: 1780527419851,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'bf673fea-51f3-484a-ba58-d681227e007a'
  },
  {
    id: 'a731c843-cca7-4d96-adc5-8c734dc402eb',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:end:vote',
    timestamp: 1780527419851,
    type: 'controller',
    boundary: 'end',
    payload: {
      traceId: 'bf673fea-51f3-484a-ba58-d681227e007a',
      outcome: 'abstain'
    },
    traceId: 'bf673fea-51f3-484a-ba58-d681227e007a'
  },
  {
    id: 'aab37b2d-b7e6-4cbb-b5b3-e0c40ce9a627',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'lifecycle:start:merge',
    timestamp: 1780527419852,
    type: 'lifecycle',
    boundary: 'start',
    traceId: 'bf673fea-51f3-484a-ba58-d681227e007a'
  },
  {
    id: 'bfc1dfe8-05f3-40d5-83a1-3a39ac89800b',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    name: 'stage:start:resolve',
    timestamp: 1780527419853,
    type: 'stage',
    boundary: 'start',
    traceId: 'bf673fea-51f3-484a-ba58-d681227e007a'
  },
  {
    id: 'b7958680-e420-4d2f-b4f6-94bd6d7f85a3',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    name: 'stage:end:resolve',
    timestamp: 1780527419853,
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
    traceId: 'bf673fea-51f3-484a-ba58-d681227e007a'
  },
  {
    id: '05fd46ad-ff87-410f-9bff-13cc5fc5842a',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:start:compute-merge',
    timestamp: 1780527419854,
    type: 'stage',
    boundary: 'start',
    traceId: 'bf673fea-51f3-484a-ba58-d681227e007a'
  },
  {
    id: 'bba93587-fff8-4c39-8b95-d300fcc81ba2',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:end:compute-merge',
    timestamp: 1780527419854,
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
    traceId: 'bf673fea-51f3-484a-ba58-d681227e007a'
  },
  {
    id: 'd74b0106-0e1c-4c50-be86-8a95364e3720',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Filter',
    name: 'stage:start:filter',
    timestamp: 1780527419855,
    type: 'stage',
    boundary: 'start',
    traceId: 'bf673fea-51f3-484a-ba58-d681227e007a'
  },
  {
    id: 'eebba94a-ffe5-4be3-a5b6-35c5b5049e7f',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Filter',
    name: 'stage:end:filter',
    timestamp: 1780527419855,
    type: 'stage',
    boundary: 'end',
    traceId: 'bf673fea-51f3-484a-ba58-d681227e007a'
  },
  {
    id: 'f2f06498-1b11-47b5-9da4-88e15dcfa359',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Reducer',
    name: 'stage:start:reducer',
    timestamp: 1780527419856,
    type: 'stage',
    boundary: 'start',
    traceId: 'bf673fea-51f3-484a-ba58-d681227e007a'
  },
  {
    id: '23805f7c-8c9e-43cf-a945-95d2f84effa5',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Reducer',
    name: 'stage:end:reducer',
    timestamp: 1780527419857,
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
    traceId: 'bf673fea-51f3-484a-ba58-d681227e007a'
  },
  {
    id: 'fab6871b-95fe-4b7e-bc6f-356471ca1456',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'lifecycle:end:merge',
    timestamp: 1780527419859,
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
    traceId: 'bf673fea-51f3-484a-ba58-d681227e007a'
  },
  {
    id: '90b4249c-4155-4921-a435-1a6bbde7b440',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:start:core-state',
    timestamp: 1780527419860,
    type: 'stage',
    boundary: 'start',
    traceId: 'bf673fea-51f3-484a-ba58-d681227e007a'
  },
  {
    id: 'b79fe5cc-b49c-4201-9579-065701116be9',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:end:core-state',
    timestamp: 1780527419860,
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
    traceId: 'bf673fea-51f3-484a-ba58-d681227e007a'
  },
  {
    id: 'f4c02663-147e-44ce-b9f6-7e1c45719ffe',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:success',
    timestamp: 1780527419861,
    type: 'lifecycle',
    boundary: 'notification',
    traceId: 'bf673fea-51f3-484a-ba58-d681227e007a'
  },
  {
    id: 'e0519008-4754-490c-929d-962c361b03cb',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'conductor:end:attempt',
    timestamp: 1780527419861,
    type: 'conductor',
    boundary: 'end',
    payload: {
      status: 'success'
    },
    traceId: 'bf673fea-51f3-484a-ba58-d681227e007a'
  },
  {
    id: '21d3aeaf-a523-4a93-b0d6-c1b57e9a155f',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:finalize',
    timestamp: 1780527419862,
    type: 'lifecycle',
    boundary: 'notification',
    traceId: 'bf673fea-51f3-484a-ba58-d681227e007a'
  },
  {
    id: '64dd0ea0-429f-4284-8807-6dbacd0ee7dd',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'conductor:start:attempt',
    timestamp: 1780527421737,
    type: 'conductor',
    boundary: 'start',
    traceId: 'b66e8d34-16c4-4faa-a53c-d365ae435505'
  },
  {
    id: '73e4d903-4bd3-47e8-82dd-de597782cc22',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:start:vote',
    timestamp: 1780527421738,
    type: 'controller',
    boundary: 'start',
    traceId: 'b66e8d34-16c4-4faa-a53c-d365ae435505'
  },
  {
    id: '94ef6fd0-e62d-4559-8a8a-b628ed720e85',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:start:vote',
    timestamp: 1780527421738,
    type: 'controller',
    boundary: 'start',
    traceId: 'b66e8d34-16c4-4faa-a53c-d365ae435505'
  },
  {
    id: 'e7a07346-c202-479c-baec-8802ab21c994',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:start:vote',
    timestamp: 1780527421739,
    type: 'controller',
    boundary: 'start',
    traceId: 'b66e8d34-16c4-4faa-a53c-d365ae435505'
  },
  {
    id: 'a08ff9cf-0a92-4498-a0be-e219ec50c626',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:start:vote',
    timestamp: 1780527421739,
    type: 'controller',
    boundary: 'start',
    traceId: 'b66e8d34-16c4-4faa-a53c-d365ae435505'
  },
  {
    id: '0e6cbd6d-c5f6-4ea4-a1d4-e01e0451595f',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:end:vote',
    timestamp: 1780527421740,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'b66e8d34-16c4-4faa-a53c-d365ae435505'
  },
  {
    id: 'f20cb750-b131-414f-ae04-d2c91b1c27a4',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:end:vote',
    timestamp: 1780527421740,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'b66e8d34-16c4-4faa-a53c-d365ae435505'
  },
  {
    id: '16270097-961c-4e9b-b272-42ff241f95fc',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:end:vote',
    timestamp: 1780527421741,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'b66e8d34-16c4-4faa-a53c-d365ae435505'
  },
  {
    id: '46785eac-9bfb-4627-ada1-c3cd3ea5ebcc',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:end:vote',
    timestamp: 1780527421741,
    type: 'controller',
    boundary: 'end',
    payload: {
      traceId: 'b66e8d34-16c4-4faa-a53c-d365ae435505',
      outcome: 'abstain'
    },
    traceId: 'b66e8d34-16c4-4faa-a53c-d365ae435505'
  },
  {
    id: '920c4b4a-bdf5-4452-9527-4739821c22b7',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'lifecycle:start:merge',
    timestamp: 1780527421742,
    type: 'lifecycle',
    boundary: 'start',
    traceId: 'b66e8d34-16c4-4faa-a53c-d365ae435505'
  },
  {
    id: '70a1cfe0-8eed-4298-a637-2bdbc46baacf',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    name: 'stage:start:resolve',
    timestamp: 1780527421743,
    type: 'stage',
    boundary: 'start',
    traceId: 'b66e8d34-16c4-4faa-a53c-d365ae435505'
  },
  {
    id: 'ccec5a91-4b98-4775-bf31-55173cf622db',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    name: 'stage:end:resolve',
    timestamp: 1780527421743,
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
    traceId: 'b66e8d34-16c4-4faa-a53c-d365ae435505'
  },
  {
    id: '64bb6881-b2e1-4a6a-b81c-21581e50094b',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:start:compute-merge',
    timestamp: 1780527421744,
    type: 'stage',
    boundary: 'start',
    traceId: 'b66e8d34-16c4-4faa-a53c-d365ae435505'
  },
  {
    id: 'a18bd645-6f07-404b-af8c-631dd748c867',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:end:compute-merge',
    timestamp: 1780527421745,
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
    traceId: 'b66e8d34-16c4-4faa-a53c-d365ae435505'
  },
  {
    id: '209be29c-a3c6-4a41-83f9-d29eba1f4dbd',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Filter',
    name: 'stage:start:filter',
    timestamp: 1780527421745,
    type: 'stage',
    boundary: 'start',
    traceId: 'b66e8d34-16c4-4faa-a53c-d365ae435505'
  },
  {
    id: '6943d8de-1de5-4bab-8ad5-9cc15058cb36',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Filter',
    name: 'stage:end:filter',
    timestamp: 1780527421746,
    type: 'stage',
    boundary: 'end',
    traceId: 'b66e8d34-16c4-4faa-a53c-d365ae435505'
  },
  {
    id: '55c310e5-5c9e-406a-aa88-9f4ed5df19e0',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Reducer',
    name: 'stage:start:reducer',
    timestamp: 1780527421747,
    type: 'stage',
    boundary: 'start',
    traceId: 'b66e8d34-16c4-4faa-a53c-d365ae435505'
  },
  {
    id: 'ccb5c9c6-4d02-4625-9bc3-a4af8a5d581b',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Reducer',
    name: 'lifecycle:notification:runtime-error',
    timestamp: 1780527421750,
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
    boundary: 'notification',
    error: {
      message: 'Example error triggered',
      details:
        'Error: Example error triggered\n    at http://localhost:4250/main.js:2749:17\n    at withCoreReducerBehavior2.applyReducer (http://localhost:4250/main.js:1550:12)\n    at #runUpstreamStage (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3035:50)\n    at #finishPipeline (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2873:52)\n    at async http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2919:24\n    at async #safeAsync (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2949:22)\n    at async #orchestrateMerge (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2905:5)\n    at async Conductor.orchestrate (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2632:7)\n    at async #processEvent (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3608:7)\n    at async #processQueue (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3695:11)',
      raw: {},
      timestamp: 1780527421747,
      featureCellKey: 'startrek-feature-cell-key'
    },
    traceId: 'b66e8d34-16c4-4faa-a53c-d365ae435505'
  },
  {
    id: '9c18270c-8399-48a1-8246-a92832cffa15',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:start:core-error',
    timestamp: 1780527421751,
    type: 'stage',
    boundary: 'start',
    traceId: 'b66e8d34-16c4-4faa-a53c-d365ae435505'
  },
  {
    id: 'bdb84d38-4f99-4083-828a-d045b01ea60e',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:end:core-error',
    timestamp: 1780527421752,
    type: 'stage',
    boundary: 'end',
    traceId: 'b66e8d34-16c4-4faa-a53c-d365ae435505'
  },
  {
    id: '597d4844-a046-41e6-b070-d72f5f0a4fda',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:start:core-state',
    timestamp: 1780527421752,
    type: 'stage',
    boundary: 'start',
    traceId: 'b66e8d34-16c4-4faa-a53c-d365ae435505'
  },
  {
    id: '6ed750f9-5f3c-4a44-ade7-d1049aca6863',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:end:core-state',
    timestamp: 1780527421753,
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
      error: {
        message: 'Example error triggered',
        details:
          'Error: Example error triggered\n    at http://localhost:4250/main.js:2749:17\n    at withCoreReducerBehavior2.applyReducer (http://localhost:4250/main.js:1550:12)\n    at #runUpstreamStage (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3035:50)\n    at #finishPipeline (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2873:52)\n    at async http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2919:24\n    at async #safeAsync (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2949:22)\n    at async #orchestrateMerge (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2905:5)\n    at async Conductor.orchestrate (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2632:7)\n    at async #processEvent (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3608:7)\n    at async #processQueue (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3695:11)',
        raw: {},
        timestamp: 1780527421752,
        featureCellKey: 'startrek-feature-cell-key'
      },
      hasValue: true
    },
    type: 'stage',
    boundary: 'end',
    traceId: 'b66e8d34-16c4-4faa-a53c-d365ae435505'
  },
  {
    id: 'abe25fa7-a58a-4920-9a7b-732ecb8e696d',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'lifecycle:start:global-error',
    timestamp: 1780527421753,
    type: 'lifecycle',
    boundary: 'start',
    traceId: 'b66e8d34-16c4-4faa-a53c-d365ae435505'
  },
  {
    id: 'dbe5e10a-fea5-4c93-9fde-48386339bf03',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'lifecycle:end:global-error',
    timestamp: 1780527421753,
    type: 'lifecycle',
    boundary: 'end',
    traceId: 'b66e8d34-16c4-4faa-a53c-d365ae435505'
  },
  {
    id: 'bc1a6ecb-d1bd-48f9-ab29-c6f5a737d123',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:failure',
    timestamp: 1780527421754,
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
      error: {
        message: 'Example error triggered',
        details:
          'Error: Example error triggered\n    at http://localhost:4250/main.js:2749:17\n    at withCoreReducerBehavior2.applyReducer (http://localhost:4250/main.js:1550:12)\n    at #runUpstreamStage (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3035:50)\n    at #finishPipeline (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2873:52)\n    at async http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2919:24\n    at async #safeAsync (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2949:22)\n    at async #orchestrateMerge (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2905:5)\n    at async Conductor.orchestrate (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2632:7)\n    at async #processEvent (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3608:7)\n    at async #processQueue (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3695:11)',
        raw: {},
        timestamp: 1780527421752,
        featureCellKey: 'startrek-feature-cell-key'
      },
      hasValue: true
    },
    type: 'lifecycle',
    boundary: 'notification',
    error: {
      message: 'Unexpected error',
      details: {
        message: 'Example error triggered',
        details:
          'Error: Example error triggered\n    at http://localhost:4250/main.js:2749:17\n    at withCoreReducerBehavior2.applyReducer (http://localhost:4250/main.js:1550:12)\n    at #runUpstreamStage (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3035:50)\n    at #finishPipeline (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2873:52)\n    at async http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2919:24\n    at async #safeAsync (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2949:22)\n    at async #orchestrateMerge (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2905:5)\n    at async Conductor.orchestrate (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2632:7)\n    at async #processEvent (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3608:7)\n    at async #processQueue (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3695:11)',
        raw: {},
        timestamp: 1780527421752,
        featureCellKey: 'startrek-feature-cell-key'
      },
      raw: {
        message: 'Example error triggered',
        details:
          'Error: Example error triggered\n    at http://localhost:4250/main.js:2749:17\n    at withCoreReducerBehavior2.applyReducer (http://localhost:4250/main.js:1550:12)\n    at #runUpstreamStage (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3035:50)\n    at #finishPipeline (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2873:52)\n    at async http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2919:24\n    at async #safeAsync (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2949:22)\n    at async #orchestrateMerge (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2905:5)\n    at async Conductor.orchestrate (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2632:7)\n    at async #processEvent (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3608:7)\n    at async #processQueue (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3695:11)',
        raw: {},
        timestamp: 1780527421752,
        featureCellKey: 'startrek-feature-cell-key'
      },
      timestamp: 1780527421754,
      featureCellKey: 'decision-engine'
    },
    traceId: 'b66e8d34-16c4-4faa-a53c-d365ae435505'
  },
  {
    id: '7486716b-00b6-4f33-8466-81efde027989',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'lifecycle:notification:abort',
    timestamp: 1780527421754,
    type: 'lifecycle',
    boundary: 'notification',
    traceId: 'b66e8d34-16c4-4faa-a53c-d365ae435505'
  },
  {
    id: '4e238717-7ee6-4e3d-8ed2-97c1acb26e5b',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'conductor:end:attempt',
    timestamp: 1780527421755,
    type: 'conductor',
    boundary: 'end',
    payload: {
      status: 'failure'
    },
    traceId: 'b66e8d34-16c4-4faa-a53c-d365ae435505'
  },
  {
    id: '5bd59f3c-e46f-438c-9537-be97478756c6',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:notification:restart-attempt',
    timestamp: 1780527421755,
    type: 'controller',
    boundary: 'notification',
    payload: 'failure',
    traceId: 'b66e8d34-16c4-4faa-a53c-d365ae435505'
  },
  {
    id: '939a5035-f53e-4283-b282-9a5fdada3ccb',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:finalize',
    timestamp: 1780527421755,
    type: 'lifecycle',
    boundary: 'notification',
    traceId: 'b66e8d34-16c4-4faa-a53c-d365ae435505'
  },
  {
    id: 'dd3b9a03-e4c7-4f01-8de7-8885c63f6c3e',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'conductor:start:attempt',
    timestamp: 1780527423191,
    type: 'conductor',
    boundary: 'start',
    traceId: 'daed122e-198f-4517-b60b-d18c9ba3aa45'
  },
  {
    id: '77f8a523-dc00-4999-b14a-27d8059103f8',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:start:vote',
    timestamp: 1780527423192,
    type: 'controller',
    boundary: 'start',
    traceId: 'daed122e-198f-4517-b60b-d18c9ba3aa45'
  },
  {
    id: '78996d7c-d144-49c4-b048-8ffa799c00ac',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:start:vote',
    timestamp: 1780527423193,
    type: 'controller',
    boundary: 'start',
    traceId: 'daed122e-198f-4517-b60b-d18c9ba3aa45'
  },
  {
    id: '02faa680-0a6f-4850-9478-f5e619cb6bd3',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:start:vote',
    timestamp: 1780527423193,
    type: 'controller',
    boundary: 'start',
    traceId: 'daed122e-198f-4517-b60b-d18c9ba3aa45'
  },
  {
    id: 'd924ebb6-f392-45de-9892-32c029eebda2',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:start:vote',
    timestamp: 1780527423194,
    type: 'controller',
    boundary: 'start',
    traceId: 'daed122e-198f-4517-b60b-d18c9ba3aa45'
  },
  {
    id: 'baa44217-632a-4994-8f3d-58045730573f',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:end:vote',
    timestamp: 1780527423195,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'daed122e-198f-4517-b60b-d18c9ba3aa45'
  },
  {
    id: 'a689182f-aa96-4150-ac49-a4271bbd8b87',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:end:vote',
    timestamp: 1780527423195,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'daed122e-198f-4517-b60b-d18c9ba3aa45'
  },
  {
    id: '5f1983f1-8ce7-4644-9f05-b51b78263010',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:end:vote',
    timestamp: 1780527423196,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'daed122e-198f-4517-b60b-d18c9ba3aa45'
  },
  {
    id: 'd64a5951-7604-4a1b-9e72-8180d9108bcb',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:end:vote',
    timestamp: 1780527423196,
    type: 'controller',
    boundary: 'end',
    payload: {
      traceId: 'daed122e-198f-4517-b60b-d18c9ba3aa45',
      outcome: 'abstain'
    },
    traceId: 'daed122e-198f-4517-b60b-d18c9ba3aa45'
  },
  {
    id: 'fdc08144-91b6-4311-9478-c84e586e383a',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'lifecycle:start:merge',
    timestamp: 1780527423197,
    type: 'lifecycle',
    boundary: 'start',
    traceId: 'daed122e-198f-4517-b60b-d18c9ba3aa45'
  },
  {
    id: '3cf9f0e6-29af-415c-8fed-00c80f1c4407',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    name: 'stage:start:resolve',
    timestamp: 1780527423198,
    type: 'stage',
    boundary: 'start',
    traceId: 'daed122e-198f-4517-b60b-d18c9ba3aa45'
  },
  {
    id: '16d6efe1-15cb-45b4-80b3-3dd51f398bac',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    name: 'stage:end:resolve',
    timestamp: 1780527423199,
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
      error: {
        message: 'Example error triggered',
        details:
          'Error: Example error triggered\n    at http://localhost:4250/main.js:2749:17\n    at withCoreReducerBehavior2.applyReducer (http://localhost:4250/main.js:1550:12)\n    at #runUpstreamStage (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3035:50)\n    at #finishPipeline (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2873:52)\n    at async http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2919:24\n    at async #safeAsync (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2949:22)\n    at async #orchestrateMerge (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2905:5)\n    at async Conductor.orchestrate (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2632:7)\n    at async #processEvent (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3608:7)\n    at async #processQueue (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3695:11)',
        raw: {},
        timestamp: 1780527421752,
        featureCellKey: 'startrek-feature-cell-key'
      },
      hasValue: true
    },
    type: 'stage',
    boundary: 'end',
    traceId: 'daed122e-198f-4517-b60b-d18c9ba3aa45'
  },
  {
    id: '9bbd60c0-c451-4477-ac70-3f0c4a54f2fe',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:start:compute-merge',
    timestamp: 1780527423199,
    type: 'stage',
    boundary: 'start',
    traceId: 'daed122e-198f-4517-b60b-d18c9ba3aa45'
  },
  {
    id: 'a785d010-3aa0-424c-8e66-e372207d1f0d',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:end:compute-merge',
    timestamp: 1780527423200,
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
      error: {
        message: 'Example error triggered',
        details:
          'Error: Example error triggered\n    at http://localhost:4250/main.js:2749:17\n    at withCoreReducerBehavior2.applyReducer (http://localhost:4250/main.js:1550:12)\n    at #runUpstreamStage (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3035:50)\n    at #finishPipeline (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2873:52)\n    at async http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2919:24\n    at async #safeAsync (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2949:22)\n    at async #orchestrateMerge (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2905:5)\n    at async Conductor.orchestrate (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2632:7)\n    at async #processEvent (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3608:7)\n    at async #processQueue (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3695:11)',
        raw: {},
        timestamp: 1780527421752,
        featureCellKey: 'startrek-feature-cell-key'
      },
      hasValue: true
    },
    type: 'stage',
    boundary: 'end',
    traceId: 'daed122e-198f-4517-b60b-d18c9ba3aa45'
  },
  {
    id: '35d98779-678a-426d-be54-c679e020332d',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Filter',
    name: 'stage:start:filter',
    timestamp: 1780527423201,
    type: 'stage',
    boundary: 'start',
    traceId: 'daed122e-198f-4517-b60b-d18c9ba3aa45'
  },
  {
    id: '07d566d6-a02f-43a5-8b2f-32bb9cf5200c',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Filter',
    name: 'stage:end:filter',
    timestamp: 1780527423202,
    type: 'stage',
    boundary: 'end',
    traceId: 'daed122e-198f-4517-b60b-d18c9ba3aa45'
  },
  {
    id: '74818de2-4098-4e96-bd7f-3d99cb71d310',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Reducer',
    name: 'stage:start:reducer',
    timestamp: 1780527423202,
    type: 'stage',
    boundary: 'start',
    traceId: 'daed122e-198f-4517-b60b-d18c9ba3aa45'
  },
  {
    id: 'a71025fd-bb6e-4dfc-8e5e-8c324f10fb97',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Reducer',
    name: 'lifecycle:notification:runtime-error',
    timestamp: 1780527423203,
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
      error: {
        message: 'Example error triggered',
        details:
          'Error: Example error triggered\n    at http://localhost:4250/main.js:2749:17\n    at withCoreReducerBehavior2.applyReducer (http://localhost:4250/main.js:1550:12)\n    at #runUpstreamStage (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3035:50)\n    at #finishPipeline (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2873:52)\n    at async http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2919:24\n    at async #safeAsync (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2949:22)\n    at async #orchestrateMerge (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2905:5)\n    at async Conductor.orchestrate (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2632:7)\n    at async #processEvent (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3608:7)\n    at async #processQueue (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3695:11)',
        raw: {},
        timestamp: 1780527421752,
        featureCellKey: 'startrek-feature-cell-key'
      },
      hasValue: true
    },
    type: 'lifecycle',
    boundary: 'notification',
    error: {
      message: 'Example error triggered',
      details:
        'Error: Example error triggered\n    at http://localhost:4250/main.js:2749:17\n    at withCoreReducerBehavior2.applyReducer (http://localhost:4250/main.js:1550:12)\n    at #runUpstreamStage (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3035:50)\n    at #finishPipeline (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2873:52)\n    at async http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2919:24\n    at async #safeAsync (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2949:22)\n    at async #orchestrateMerge (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2905:5)\n    at async Conductor.orchestrate (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2632:7)\n    at async #processEvent (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3608:7)\n    at async #processQueue (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3695:11)',
      raw: {},
      timestamp: 1780527423203,
      featureCellKey: 'startrek-feature-cell-key'
    },
    traceId: 'daed122e-198f-4517-b60b-d18c9ba3aa45'
  },
  {
    id: '5e35df8d-df29-4cfc-a715-c5971a067179',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:start:core-error',
    timestamp: 1780527423205,
    type: 'stage',
    boundary: 'start',
    traceId: 'daed122e-198f-4517-b60b-d18c9ba3aa45'
  },
  {
    id: '16667f18-50e9-4856-94d1-29fb7f7ef4dc',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:end:core-error',
    timestamp: 1780527423205,
    type: 'stage',
    boundary: 'end',
    traceId: 'daed122e-198f-4517-b60b-d18c9ba3aa45'
  },
  {
    id: 'cf3e05b4-e980-4ee8-9bfb-10b437ea3847',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:start:core-state',
    timestamp: 1780527423205,
    type: 'stage',
    boundary: 'start',
    traceId: 'daed122e-198f-4517-b60b-d18c9ba3aa45'
  },
  {
    id: 'c8341e20-2cdb-43d1-a05a-d75a3040cb2e',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:end:core-state',
    timestamp: 1780527423206,
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
      error: {
        message: 'Example error triggered',
        details:
          'Error: Example error triggered\n    at http://localhost:4250/main.js:2749:17\n    at withCoreReducerBehavior2.applyReducer (http://localhost:4250/main.js:1550:12)\n    at #runUpstreamStage (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3035:50)\n    at #finishPipeline (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2873:52)\n    at async http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2919:24\n    at async #safeAsync (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2949:22)\n    at async #orchestrateMerge (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2905:5)\n    at async Conductor.orchestrate (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2632:7)\n    at async #processEvent (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3608:7)\n    at async #processQueue (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3695:11)',
        raw: {},
        timestamp: 1780527423205,
        featureCellKey: 'startrek-feature-cell-key'
      },
      hasValue: true
    },
    type: 'stage',
    boundary: 'end',
    traceId: 'daed122e-198f-4517-b60b-d18c9ba3aa45'
  },
  {
    id: 'adc76e9c-195c-4d5f-ba54-01366ddf277c',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'lifecycle:start:global-error',
    timestamp: 1780527423206,
    type: 'lifecycle',
    boundary: 'start',
    traceId: 'daed122e-198f-4517-b60b-d18c9ba3aa45'
  },
  {
    id: '13f01ac4-5a30-4644-bcfd-5931bd35954b',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'lifecycle:end:global-error',
    timestamp: 1780527423207,
    type: 'lifecycle',
    boundary: 'end',
    traceId: 'daed122e-198f-4517-b60b-d18c9ba3aa45'
  },
  {
    id: '9e4a53c0-86b8-4a2f-9c9d-8e8c007b6bba',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:failure',
    timestamp: 1780527423208,
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
      error: {
        message: 'Example error triggered',
        details:
          'Error: Example error triggered\n    at http://localhost:4250/main.js:2749:17\n    at withCoreReducerBehavior2.applyReducer (http://localhost:4250/main.js:1550:12)\n    at #runUpstreamStage (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3035:50)\n    at #finishPipeline (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2873:52)\n    at async http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2919:24\n    at async #safeAsync (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2949:22)\n    at async #orchestrateMerge (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2905:5)\n    at async Conductor.orchestrate (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2632:7)\n    at async #processEvent (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3608:7)\n    at async #processQueue (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3695:11)',
        raw: {},
        timestamp: 1780527423205,
        featureCellKey: 'startrek-feature-cell-key'
      },
      hasValue: true
    },
    type: 'lifecycle',
    boundary: 'notification',
    error: {
      message: 'Unexpected error',
      details: {
        message: 'Example error triggered',
        details:
          'Error: Example error triggered\n    at http://localhost:4250/main.js:2749:17\n    at withCoreReducerBehavior2.applyReducer (http://localhost:4250/main.js:1550:12)\n    at #runUpstreamStage (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3035:50)\n    at #finishPipeline (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2873:52)\n    at async http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2919:24\n    at async #safeAsync (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2949:22)\n    at async #orchestrateMerge (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2905:5)\n    at async Conductor.orchestrate (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2632:7)\n    at async #processEvent (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3608:7)\n    at async #processQueue (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3695:11)',
        raw: {},
        timestamp: 1780527423205,
        featureCellKey: 'startrek-feature-cell-key'
      },
      raw: {
        message: 'Example error triggered',
        details:
          'Error: Example error triggered\n    at http://localhost:4250/main.js:2749:17\n    at withCoreReducerBehavior2.applyReducer (http://localhost:4250/main.js:1550:12)\n    at #runUpstreamStage (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3035:50)\n    at #finishPipeline (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2873:52)\n    at async http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2919:24\n    at async #safeAsync (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2949:22)\n    at async #orchestrateMerge (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2905:5)\n    at async Conductor.orchestrate (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2632:7)\n    at async #processEvent (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3608:7)\n    at async #processQueue (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3695:11)',
        raw: {},
        timestamp: 1780527423205,
        featureCellKey: 'startrek-feature-cell-key'
      },
      timestamp: 1780527423208,
      featureCellKey: 'decision-engine'
    },
    traceId: 'daed122e-198f-4517-b60b-d18c9ba3aa45'
  },
  {
    id: '7f834329-40a4-4df0-800e-717b64a5ebb5',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'lifecycle:notification:abort',
    timestamp: 1780527423208,
    type: 'lifecycle',
    boundary: 'notification',
    traceId: 'daed122e-198f-4517-b60b-d18c9ba3aa45'
  },
  {
    id: '0927b376-3d66-4b2e-af33-d8175286b4c4',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'conductor:end:attempt',
    timestamp: 1780527423208,
    type: 'conductor',
    boundary: 'end',
    payload: {
      status: 'failure'
    },
    traceId: 'daed122e-198f-4517-b60b-d18c9ba3aa45'
  },
  {
    id: 'b1de8970-7fbc-42c3-bddb-61b44a6951be',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:notification:restart-attempt',
    timestamp: 1780527423209,
    type: 'controller',
    boundary: 'notification',
    payload: 'failure',
    traceId: 'daed122e-198f-4517-b60b-d18c9ba3aa45'
  },
  {
    id: '775ac4f0-6c7b-40c2-9e38-31591261d086',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:finalize',
    timestamp: 1780527423209,
    type: 'lifecycle',
    boundary: 'notification',
    traceId: 'daed122e-198f-4517-b60b-d18c9ba3aa45'
  },
  {
    id: '579816f8-3212-43ea-9899-66a0191a4286',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'conductor:start:attempt',
    timestamp: 1780527425186,
    type: 'conductor',
    boundary: 'start',
    traceId: '0bd8a2fa-4d84-449e-9e68-ee759e31365b'
  },
  {
    id: 'd311d369-6304-48dc-ab02-aced14bcf52f',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:start:vote',
    timestamp: 1780527425187,
    type: 'controller',
    boundary: 'start',
    traceId: '0bd8a2fa-4d84-449e-9e68-ee759e31365b'
  },
  {
    id: 'fac16b08-7ac4-4674-9042-79f9e54cbeec',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:start:vote',
    timestamp: 1780527425188,
    type: 'controller',
    boundary: 'start',
    traceId: '0bd8a2fa-4d84-449e-9e68-ee759e31365b'
  },
  {
    id: 'b89c58e8-e31a-4786-b5cd-9a35c3d0f90d',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:start:vote',
    timestamp: 1780527425189,
    type: 'controller',
    boundary: 'start',
    traceId: '0bd8a2fa-4d84-449e-9e68-ee759e31365b'
  },
  {
    id: '30fbce45-7008-4b3f-bf3e-0fa769438396',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:start:vote',
    timestamp: 1780527425189,
    type: 'controller',
    boundary: 'start',
    traceId: '0bd8a2fa-4d84-449e-9e68-ee759e31365b'
  },
  {
    id: 'd7b4068f-d502-46b9-bc59-bf47c3a48139',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:end:vote',
    timestamp: 1780527425190,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '0bd8a2fa-4d84-449e-9e68-ee759e31365b'
  },
  {
    id: 'a6aa38b2-0d6d-4d6e-a822-65addcd67838',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:end:vote',
    timestamp: 1780527425191,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '0bd8a2fa-4d84-449e-9e68-ee759e31365b'
  },
  {
    id: '735bd144-1964-4941-8640-8e99f59d304d',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:end:vote',
    timestamp: 1780527425191,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '0bd8a2fa-4d84-449e-9e68-ee759e31365b'
  },
  {
    id: 'd0926fa9-149b-4d3b-b5ef-66f89e6d5952',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:end:vote',
    timestamp: 1780527425192,
    type: 'controller',
    boundary: 'end',
    payload: {
      traceId: '0bd8a2fa-4d84-449e-9e68-ee759e31365b',
      outcome: 'abstain'
    },
    traceId: '0bd8a2fa-4d84-449e-9e68-ee759e31365b'
  },
  {
    id: 'bf8941ff-52a3-4f82-88fe-4c535dae7add',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'lifecycle:start:merge',
    timestamp: 1780527425193,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '0bd8a2fa-4d84-449e-9e68-ee759e31365b'
  },
  {
    id: '3d265b43-e3ad-40cd-bfa9-6578f6c3f72d',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    name: 'stage:start:resolve',
    timestamp: 1780527425194,
    type: 'stage',
    boundary: 'start',
    traceId: '0bd8a2fa-4d84-449e-9e68-ee759e31365b'
  },
  {
    id: 'cd4b3c04-e8f0-43ff-be7f-8146f5c4713d',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    name: 'stage:end:resolve',
    timestamp: 1780527425195,
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
      error: {
        message: 'Example error triggered',
        details:
          'Error: Example error triggered\n    at http://localhost:4250/main.js:2749:17\n    at withCoreReducerBehavior2.applyReducer (http://localhost:4250/main.js:1550:12)\n    at #runUpstreamStage (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3035:50)\n    at #finishPipeline (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2873:52)\n    at async http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2919:24\n    at async #safeAsync (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2949:22)\n    at async #orchestrateMerge (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2905:5)\n    at async Conductor.orchestrate (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2632:7)\n    at async #processEvent (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3608:7)\n    at async #processQueue (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3695:11)',
        raw: {},
        timestamp: 1780527423205,
        featureCellKey: 'startrek-feature-cell-key'
      },
      hasValue: true
    },
    type: 'stage',
    boundary: 'end',
    traceId: '0bd8a2fa-4d84-449e-9e68-ee759e31365b'
  },
  {
    id: '568a26f3-b20b-4dae-8812-218212e331fd',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:start:compute-merge',
    timestamp: 1780527425195,
    type: 'stage',
    boundary: 'start',
    traceId: '0bd8a2fa-4d84-449e-9e68-ee759e31365b'
  },
  {
    id: 'bf69bbb4-1f30-4cab-b865-df68ce2bce49',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:end:compute-merge',
    timestamp: 1780527425197,
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
      error: {
        message: 'Example error triggered',
        details:
          'Error: Example error triggered\n    at http://localhost:4250/main.js:2749:17\n    at withCoreReducerBehavior2.applyReducer (http://localhost:4250/main.js:1550:12)\n    at #runUpstreamStage (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3035:50)\n    at #finishPipeline (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2873:52)\n    at async http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2919:24\n    at async #safeAsync (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2949:22)\n    at async #orchestrateMerge (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2905:5)\n    at async Conductor.orchestrate (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2632:7)\n    at async #processEvent (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3608:7)\n    at async #processQueue (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3695:11)',
        raw: {},
        timestamp: 1780527423205,
        featureCellKey: 'startrek-feature-cell-key'
      },
      hasValue: true
    },
    type: 'stage',
    boundary: 'end',
    traceId: '0bd8a2fa-4d84-449e-9e68-ee759e31365b'
  },
  {
    id: 'c7f5a4c6-cc05-4fe2-bbf0-273da605b58b',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Filter',
    name: 'stage:start:filter',
    timestamp: 1780527425197,
    type: 'stage',
    boundary: 'start',
    traceId: '0bd8a2fa-4d84-449e-9e68-ee759e31365b'
  },
  {
    id: '97fb888a-eb64-4e53-afb1-971e42e01096',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Filter',
    name: 'stage:end:filter',
    timestamp: 1780527425198,
    type: 'stage',
    boundary: 'end',
    traceId: '0bd8a2fa-4d84-449e-9e68-ee759e31365b'
  },
  {
    id: 'de2e0e8c-39a0-4281-bdda-004fb2128208',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Reducer',
    name: 'stage:start:reducer',
    timestamp: 1780527425199,
    type: 'stage',
    boundary: 'start',
    traceId: '0bd8a2fa-4d84-449e-9e68-ee759e31365b'
  },
  {
    id: '4fccdcad-d0db-453d-84a8-4c4687e2d578',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Reducer',
    name: 'stage:end:reducer',
    timestamp: 1780527425199,
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
      error: {
        message: 'Example error triggered',
        details:
          'Error: Example error triggered\n    at http://localhost:4250/main.js:2749:17\n    at withCoreReducerBehavior2.applyReducer (http://localhost:4250/main.js:1550:12)\n    at #runUpstreamStage (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3035:50)\n    at #finishPipeline (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2873:52)\n    at async http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2919:24\n    at async #safeAsync (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2949:22)\n    at async #orchestrateMerge (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2905:5)\n    at async Conductor.orchestrate (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2632:7)\n    at async #processEvent (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3608:7)\n    at async #processQueue (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3695:11)',
        raw: {},
        timestamp: 1780527423205,
        featureCellKey: 'startrek-feature-cell-key'
      },
      hasValue: true
    },
    type: 'stage',
    boundary: 'end',
    traceId: '0bd8a2fa-4d84-449e-9e68-ee759e31365b'
  },
  {
    id: '5c52115d-913e-492c-ac83-4bf30794c893',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'lifecycle:end:merge',
    timestamp: 1780527425203,
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
      error: {
        message: 'Example error triggered',
        details:
          'Error: Example error triggered\n    at http://localhost:4250/main.js:2749:17\n    at withCoreReducerBehavior2.applyReducer (http://localhost:4250/main.js:1550:12)\n    at #runUpstreamStage (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3035:50)\n    at #finishPipeline (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2873:52)\n    at async http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2919:24\n    at async #safeAsync (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2949:22)\n    at async #orchestrateMerge (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2905:5)\n    at async Conductor.orchestrate (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2632:7)\n    at async #processEvent (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3608:7)\n    at async #processQueue (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3695:11)',
        raw: {},
        timestamp: 1780527423205,
        featureCellKey: 'startrek-feature-cell-key'
      },
      hasValue: true
    },
    type: 'lifecycle',
    boundary: 'end',
    traceId: '0bd8a2fa-4d84-449e-9e68-ee759e31365b'
  },
  {
    id: 'f0ffc6c0-5ce6-45b7-bb9f-baadd380a24f',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:start:core-state',
    timestamp: 1780527425203,
    type: 'stage',
    boundary: 'start',
    traceId: '0bd8a2fa-4d84-449e-9e68-ee759e31365b'
  },
  {
    id: '15f425ee-dbe3-4a6d-9438-2fd48f98f7d2',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:end:core-state',
    timestamp: 1780527425204,
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
          id: 6,
          name: 'Deanna',
          lastName: 'Troi'
        }
      ],
      error: {
        message: 'Example error triggered',
        details:
          'Error: Example error triggered\n    at http://localhost:4250/main.js:2749:17\n    at withCoreReducerBehavior2.applyReducer (http://localhost:4250/main.js:1550:12)\n    at #runUpstreamStage (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3035:50)\n    at #finishPipeline (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2873:52)\n    at async http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2919:24\n    at async #safeAsync (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2949:22)\n    at async #orchestrateMerge (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2905:5)\n    at async Conductor.orchestrate (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2632:7)\n    at async #processEvent (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3608:7)\n    at async #processQueue (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3695:11)',
        raw: {},
        timestamp: 1780527423205,
        featureCellKey: 'startrek-feature-cell-key'
      },
      hasValue: true
    },
    type: 'stage',
    boundary: 'end',
    traceId: '0bd8a2fa-4d84-449e-9e68-ee759e31365b'
  },
  {
    id: '301c591c-9ad9-4a0c-b1d0-93b11fe9dc55',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:success',
    timestamp: 1780527425204,
    type: 'lifecycle',
    boundary: 'notification',
    traceId: '0bd8a2fa-4d84-449e-9e68-ee759e31365b'
  },
  {
    id: 'cae59bb6-92e1-4365-8025-7d780017c8f5',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'conductor:end:attempt',
    timestamp: 1780527425204,
    type: 'conductor',
    boundary: 'end',
    payload: {
      status: 'success'
    },
    traceId: '0bd8a2fa-4d84-449e-9e68-ee759e31365b'
  },
  {
    id: '51abe432-797c-471c-9baf-66da509443e2',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:finalize',
    timestamp: 1780527425204,
    type: 'lifecycle',
    boundary: 'notification',
    traceId: '0bd8a2fa-4d84-449e-9e68-ee759e31365b'
  },
  {
    id: '700606fd-1b7c-4760-8c13-ba89fcd8f5f3',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-feature-cell',
    name: 'lifecycle:start:reset',
    timestamp: 1780527425800,
    type: 'lifecycle',
    boundary: 'start',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: 'ee05dfdf-7fd1-49ef-b0ad-6c140a54b066',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'lifecycle:start:reset',
    timestamp: 1780527425802,
    type: 'lifecycle',
    boundary: 'start',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: '30015d0d-634d-4ee8-bfe3-fd30e9d875d7',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::AfterTap',
    name: 'lifecycle:start:reset',
    timestamp: 1780527425803,
    type: 'lifecycle',
    boundary: 'start',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: '0554c67c-e79b-4a47-a632-69c0970a7c06',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::AfterTap',
    name: 'lifecycle:end:reset',
    timestamp: 1780527425803,
    type: 'lifecycle',
    boundary: 'end',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: '7e912439-26e0-48f2-8c88-2e559cb90c33',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::BeforeTap',
    name: 'lifecycle:start:reset',
    timestamp: 1780527425804,
    type: 'lifecycle',
    boundary: 'start',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: 'd6e43d57-03c5-466f-b0b1-077d1a00047f',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::BeforeTap',
    name: 'lifecycle:end:reset',
    timestamp: 1780527425805,
    type: 'lifecycle',
    boundary: 'end',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: '684ec8c9-96d1-4115-ad59-5f5ddbc16e19',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Error',
    name: 'lifecycle:start:reset',
    timestamp: 1780527425805,
    type: 'lifecycle',
    boundary: 'start',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: '015b432a-6f4f-4503-9739-e412dc94f860',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Error',
    name: 'lifecycle:end:reset',
    timestamp: 1780527425806,
    type: 'lifecycle',
    boundary: 'end',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: 'd6a26066-f07d-47d8-be22-8cbe01a2902f',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Filter',
    name: 'lifecycle:start:reset',
    timestamp: 1780527425807,
    type: 'lifecycle',
    boundary: 'start',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: 'c6f85f81-1fac-4da7-82dc-e0750a6c8269',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Filter',
    name: 'lifecycle:end:reset',
    timestamp: 1780527425807,
    type: 'lifecycle',
    boundary: 'end',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: 'af105388-f755-4323-bb25-4bb4a3782dc9',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::FromObservable',
    name: 'lifecycle:start:reset',
    timestamp: 1780527425808,
    type: 'lifecycle',
    boundary: 'start',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: '6d339257-233a-4249-99fb-64822e016159',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::FromObservable',
    name: 'lifecycle:end:reset',
    timestamp: 1780527425809,
    type: 'lifecycle',
    boundary: 'end',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: '35eb912d-eada-45d5-8691-0ae9a73cd81e',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::FromPromise',
    name: 'lifecycle:start:reset',
    timestamp: 1780527425810,
    type: 'lifecycle',
    boundary: 'start',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: 'f714703a-8367-4c2e-a535-263164fc571b',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::FromPromise',
    name: 'lifecycle:end:reset',
    timestamp: 1780527425810,
    type: 'lifecycle',
    boundary: 'end',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: 'd24d14df-57aa-4c84-b763-bfb6ec68a923',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::FromStream',
    name: 'lifecycle:start:reset',
    timestamp: 1780527425811,
    type: 'lifecycle',
    boundary: 'start',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: 'd1908446-080e-4eed-953f-488794a955aa',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::FromStream',
    name: 'lifecycle:end:reset',
    timestamp: 1780527425812,
    type: 'lifecycle',
    boundary: 'end',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: '5fa291ac-5a7a-4849-93d3-d65bee46bec9',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Observable',
    name: 'lifecycle:start:reset',
    timestamp: 1780527425812,
    type: 'lifecycle',
    boundary: 'start',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: 'd8f3f509-45d6-4db8-a8fd-28d10abe8ca2',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Observable',
    name: 'lifecycle:end:reset',
    timestamp: 1780527425813,
    type: 'lifecycle',
    boundary: 'end',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: '6acf0cf2-8750-4244-9ddf-9d7b8e1ac816',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Promise',
    name: 'lifecycle:start:reset',
    timestamp: 1780527425813,
    type: 'lifecycle',
    boundary: 'start',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: 'cc2b1404-893b-4290-b93b-b9637ea9536d',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Promise',
    name: 'lifecycle:end:reset',
    timestamp: 1780527425814,
    type: 'lifecycle',
    boundary: 'end',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: '75080c53-d32c-4903-8019-a703ed1ac121',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Reducer',
    name: 'lifecycle:start:reset',
    timestamp: 1780527425815,
    type: 'lifecycle',
    boundary: 'start',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: '8805d263-6651-42ce-b7d6-2fe28d6f85f8',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Reducer',
    name: 'lifecycle:end:reset',
    timestamp: 1780527425815,
    type: 'lifecycle',
    boundary: 'end',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: '8c4d5130-23b6-4326-9291-0490db882b5d',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    name: 'lifecycle:start:reset',
    timestamp: 1780527425816,
    type: 'lifecycle',
    boundary: 'start',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: 'e1135e9b-2fc1-403c-92a1-109514141a93',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    name: 'lifecycle:end:reset',
    timestamp: 1780527425816,
    type: 'lifecycle',
    boundary: 'end',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: '908e285f-e3d0-4525-a531-bf839efaa1e1',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::State',
    name: 'lifecycle:start:reset',
    timestamp: 1780527425817,
    type: 'lifecycle',
    boundary: 'start',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: 'ae1cefab-fd7b-48d5-bcd1-25e9426e1a50',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::State',
    name: 'lifecycle:end:reset',
    timestamp: 1780527425817,
    type: 'lifecycle',
    boundary: 'end',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: '6ee9ce27-96b3-412a-96b4-61857725a11f',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::ArrayMerge',
    name: 'lifecycle:start:reset',
    timestamp: 1780527425817,
    type: 'lifecycle',
    boundary: 'start',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: 'd39f19d8-e9db-4b99-89ef-ae48f6b9b1ae',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::ArrayMerge',
    name: 'lifecycle:end:reset',
    timestamp: 1780527425817,
    type: 'lifecycle',
    boundary: 'end',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: 'af053b8c-7c6d-4e22-a886-f9a38f29a918',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::License',
    name: 'lifecycle:start:reset',
    timestamp: 1780527425818,
    type: 'lifecycle',
    boundary: 'start',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: 'b118b77e-c9c3-40f2-9870-74dda13b41fe',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::License',
    name: 'lifecycle:end:reset',
    timestamp: 1780527425818,
    type: 'lifecycle',
    boundary: 'end',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: 'd8713cf1-f767-46e3-a8da-6f2e8d6fb2c8',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'lifecycle:start:reset',
    timestamp: 1780527425818,
    type: 'lifecycle',
    boundary: 'start',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: 'b1e7207e-922d-48f4-857f-89b48c9c6e46',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'lifecycle:end:reset',
    timestamp: 1780527425818,
    type: 'lifecycle',
    boundary: 'end',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: 'cc360ead-4e4b-4c25-83a4-c13593fb96fe',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'lifecycle:start:reset',
    timestamp: 1780527425819,
    type: 'lifecycle',
    boundary: 'start',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: 'ec80569e-f2f3-48dc-84b8-d4e81629a9bb',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'lifecycle:end:reset',
    timestamp: 1780527425819,
    type: 'lifecycle',
    boundary: 'end',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: '9820922a-3b59-4d83-90f0-55f5b973fa5b',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'lifecycle:start:reset',
    timestamp: 1780527425819,
    type: 'lifecycle',
    boundary: 'start',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: '9024827b-462c-45a6-984a-e18ff2706e99',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'lifecycle:end:reset',
    timestamp: 1780527425819,
    type: 'lifecycle',
    boundary: 'end',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: '3081b39f-8581-46bf-b0cf-b96e16c3897f',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'lifecycle:end:reset',
    timestamp: 1780527425820,
    type: 'lifecycle',
    boundary: 'end',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: 'df40dcc0-388b-478b-b6ed-eb640dbc1040',
    cell: 'startrek-feature-cell-key',
    behaviorKey: 'vault-feature-cell',
    name: 'lifecycle:end:reset',
    timestamp: 1780527425820,
    type: 'lifecycle',
    boundary: 'end',
    traceId: 'b262d251-d2cc-4895-b12f-76e9c8b42597'
  },
  {
    id: '2613fc26-52fc-44d4-ad3c-16871b7aa0d0',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'conductor:start:attempt',
    timestamp: 1780527428172,
    type: 'conductor',
    boundary: 'start',
    traceId: 'daa5fd95-e343-4711-a5bc-5c5cf2a89db5'
  },
  {
    id: '201a6ff9-a410-4e37-90cd-4467b962628a',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:start:vote',
    timestamp: 1780527428174,
    type: 'controller',
    boundary: 'start',
    traceId: 'daa5fd95-e343-4711-a5bc-5c5cf2a89db5'
  },
  {
    id: 'd0c106ce-8fad-4f42-9080-85686b0be3e6',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:start:vote',
    timestamp: 1780527428174,
    type: 'controller',
    boundary: 'start',
    traceId: 'daa5fd95-e343-4711-a5bc-5c5cf2a89db5'
  },
  {
    id: '88e2b02e-3cc2-48ec-a4b1-c5c571fabaec',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:start:vote',
    timestamp: 1780527428175,
    type: 'controller',
    boundary: 'start',
    traceId: 'daa5fd95-e343-4711-a5bc-5c5cf2a89db5'
  },
  {
    id: 'c7658f18-5ed3-4bf8-b976-a670986109b9',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:start:vote',
    timestamp: 1780527428176,
    type: 'controller',
    boundary: 'start',
    traceId: 'daa5fd95-e343-4711-a5bc-5c5cf2a89db5'
  },
  {
    id: 'a6046761-c0ca-4541-99f6-e4872249fd55',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Delay',
    name: 'controller:start:vote',
    timestamp: 1780527428177,
    type: 'controller',
    boundary: 'start',
    traceId: 'daa5fd95-e343-4711-a5bc-5c5cf2a89db5'
  },
  {
    id: '9ffe45cb-704b-4a6a-b550-a8445a8c8fdc',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Stepwise',
    name: 'controller:start:vote',
    timestamp: 1780527428178,
    type: 'controller',
    boundary: 'start',
    traceId: 'daa5fd95-e343-4711-a5bc-5c5cf2a89db5'
  },
  {
    id: 'e8c281a6-089f-4274-b0a7-390c6f26be57',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::TabSync',
    name: 'controller:start:vote',
    timestamp: 1780527428178,
    type: 'controller',
    boundary: 'start',
    traceId: 'daa5fd95-e343-4711-a5bc-5c5cf2a89db5'
  },
  {
    id: 'e4bbc51a-622d-4fa9-a470-54ed835f9f86',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:end:vote',
    timestamp: 1780527428179,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'daa5fd95-e343-4711-a5bc-5c5cf2a89db5'
  },
  {
    id: '86892dfa-9a0b-4b62-a692-44058cc29b73',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:end:vote',
    timestamp: 1780527428180,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'daa5fd95-e343-4711-a5bc-5c5cf2a89db5'
  },
  {
    id: '59a04427-5dfe-4de2-b2e8-1c034898dae5',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:end:vote',
    timestamp: 1780527428181,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'daa5fd95-e343-4711-a5bc-5c5cf2a89db5'
  },
  {
    id: '71649985-7d85-4074-9531-08954671f2a0',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Delay',
    name: 'controller:end:vote',
    timestamp: 1780527428181,
    type: 'controller',
    boundary: 'end',
    payload: 'deny',
    traceId: 'daa5fd95-e343-4711-a5bc-5c5cf2a89db5'
  },
  {
    id: '512f9066-b1f8-4ceb-a4ed-4c1d7c7381bc',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Stepwise',
    name: 'controller:end:vote',
    timestamp: 1780527428182,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'daa5fd95-e343-4711-a5bc-5c5cf2a89db5'
  },
  {
    id: '4f7f359e-1b0f-4b3d-89ae-844dcf4d86dc',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::TabSync',
    name: 'controller:end:vote',
    timestamp: 1780527428183,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'daa5fd95-e343-4711-a5bc-5c5cf2a89db5'
  },
  {
    id: 'e9c1c1c5-c3f4-4e95-8709-8431bfc204f3',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:end:vote',
    timestamp: 1780527428183,
    type: 'controller',
    boundary: 'end',
    payload: {
      traceId: 'daa5fd95-e343-4711-a5bc-5c5cf2a89db5',
      outcome: 'deny'
    },
    traceId: 'daa5fd95-e343-4711-a5bc-5c5cf2a89db5'
  },
  {
    id: '3cd7754d-a951-4c3d-95ec-c91bc3c1e5e9',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'conductor:notification:deny',
    timestamp: 1780527428185,
    type: 'conductor',
    boundary: 'notification',
    traceId: 'daa5fd95-e343-4711-a5bc-5c5cf2a89db5'
  },
  {
    id: 'b81ccaee-a569-4937-8aa3-6cc608a6f7e7',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'lifecycle:notification:revote',
    timestamp: 1780527428677,
    type: 'lifecycle',
    boundary: 'notification',
    traceId: 'daa5fd95-e343-4711-a5bc-5c5cf2a89db5'
  },
  {
    id: '2d963e22-5c47-432d-9bac-6fe60554b7d1',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:start:vote',
    timestamp: 1780527428679,
    type: 'controller',
    boundary: 'start',
    traceId: 'daa5fd95-e343-4711-a5bc-5c5cf2a89db5'
  },
  {
    id: 'f76cac54-10eb-4d9b-8086-d7df0812c790',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:start:vote',
    timestamp: 1780527428680,
    type: 'controller',
    boundary: 'start',
    traceId: 'daa5fd95-e343-4711-a5bc-5c5cf2a89db5'
  },
  {
    id: '74a370d3-1794-416a-ad09-4211260b1c85',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:start:vote',
    timestamp: 1780527428681,
    type: 'controller',
    boundary: 'start',
    traceId: 'daa5fd95-e343-4711-a5bc-5c5cf2a89db5'
  },
  {
    id: '689b51fd-b958-4d18-a886-76250deb9926',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:start:vote',
    timestamp: 1780527428682,
    type: 'controller',
    boundary: 'start',
    traceId: 'daa5fd95-e343-4711-a5bc-5c5cf2a89db5'
  },
  {
    id: '9691bd6c-dd3f-41df-bedc-ea6abf809ef6',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Delay',
    name: 'controller:start:vote',
    timestamp: 1780527428683,
    type: 'controller',
    boundary: 'start',
    traceId: 'daa5fd95-e343-4711-a5bc-5c5cf2a89db5'
  },
  {
    id: 'd21d17db-2309-4b98-861f-60bf51daf266',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Stepwise',
    name: 'controller:start:vote',
    timestamp: 1780527428684,
    type: 'controller',
    boundary: 'start',
    traceId: 'daa5fd95-e343-4711-a5bc-5c5cf2a89db5'
  },
  {
    id: '4364ed06-29a6-4053-badd-e659513f6898',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::TabSync',
    name: 'controller:start:vote',
    timestamp: 1780527428684,
    type: 'controller',
    boundary: 'start',
    traceId: 'daa5fd95-e343-4711-a5bc-5c5cf2a89db5'
  },
  {
    id: 'a3dd189b-e8ea-4c23-8a43-70555f2f6bd0',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:end:vote',
    timestamp: 1780527428685,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'daa5fd95-e343-4711-a5bc-5c5cf2a89db5'
  },
  {
    id: '01155cb1-4f88-4136-b5f7-242fb3db3974',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:end:vote',
    timestamp: 1780527428686,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'daa5fd95-e343-4711-a5bc-5c5cf2a89db5'
  },
  {
    id: '64c77cbd-6821-474e-95ac-be65ace53454',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:end:vote',
    timestamp: 1780527428687,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'daa5fd95-e343-4711-a5bc-5c5cf2a89db5'
  },
  {
    id: '3be56e4e-51bd-4974-94f8-ea7706d2b8ce',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Delay',
    name: 'controller:end:vote',
    timestamp: 1780527428687,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'daa5fd95-e343-4711-a5bc-5c5cf2a89db5'
  },
  {
    id: 'd5dba2a7-49dc-47ba-b33e-47acac8cce50',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Stepwise',
    name: 'controller:end:vote',
    timestamp: 1780527428688,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'daa5fd95-e343-4711-a5bc-5c5cf2a89db5'
  },
  {
    id: 'bfa73493-980d-4e59-8b16-9ecbadc894e1',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::TabSync',
    name: 'controller:end:vote',
    timestamp: 1780527428689,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'daa5fd95-e343-4711-a5bc-5c5cf2a89db5'
  },
  {
    id: 'b7b0fb22-6707-4ba7-947f-820c4fc36b9a',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:end:vote',
    timestamp: 1780527428689,
    type: 'controller',
    boundary: 'end',
    payload: {
      traceId: 'daa5fd95-e343-4711-a5bc-5c5cf2a89db5',
      outcome: 'abstain'
    },
    traceId: 'daa5fd95-e343-4711-a5bc-5c5cf2a89db5'
  },
  {
    id: 'a949cd6c-0788-47a4-a039-50bccb0c5a07',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'lifecycle:start:merge',
    timestamp: 1780527428691,
    type: 'lifecycle',
    boundary: 'start',
    traceId: 'daa5fd95-e343-4711-a5bc-5c5cf2a89db5'
  },
  {
    id: 'de7b3caa-624d-4655-9ecb-dfbd5575f23e',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    name: 'stage:start:resolve',
    timestamp: 1780527428691,
    type: 'stage',
    boundary: 'start',
    traceId: 'daa5fd95-e343-4711-a5bc-5c5cf2a89db5'
  },
  {
    id: 'ac590f35-3724-41d8-99c4-c5686cb52657',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    name: 'stage:end:resolve',
    timestamp: 1780527428692,
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
    traceId: 'daa5fd95-e343-4711-a5bc-5c5cf2a89db5'
  },
  {
    id: '8e570e28-d5cd-4a53-b32f-d4083919119d',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:start:compute-merge',
    timestamp: 1780527428693,
    type: 'stage',
    boundary: 'start',
    traceId: 'daa5fd95-e343-4711-a5bc-5c5cf2a89db5'
  },
  {
    id: '1053f3fc-1399-46fa-886c-ebeb822eeb43',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:end:compute-merge',
    timestamp: 1780527428694,
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
    traceId: 'daa5fd95-e343-4711-a5bc-5c5cf2a89db5'
  },
  {
    id: '1af15b09-034f-4e67-a06a-5d5b6420993c',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Filter',
    name: 'stage:start:filter',
    timestamp: 1780527428695,
    type: 'stage',
    boundary: 'start',
    traceId: 'daa5fd95-e343-4711-a5bc-5c5cf2a89db5'
  },
  {
    id: '4ccc848d-0294-42c1-999a-d61c04089fac',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Filter',
    name: 'stage:end:filter',
    timestamp: 1780527428695,
    type: 'stage',
    boundary: 'end',
    traceId: 'daa5fd95-e343-4711-a5bc-5c5cf2a89db5'
  },
  {
    id: '93528181-b144-4cc8-bf10-811b145be2d6',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Reducer',
    name: 'stage:start:reducer',
    timestamp: 1780527428696,
    type: 'stage',
    boundary: 'start',
    traceId: 'daa5fd95-e343-4711-a5bc-5c5cf2a89db5'
  },
  {
    id: '192e881c-bf35-4407-b968-f3501fb6e2e3',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Reducer',
    name: 'stage:end:reducer',
    timestamp: 1780527428696,
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
    traceId: 'daa5fd95-e343-4711-a5bc-5c5cf2a89db5'
  },
  {
    id: '5b2652c7-0180-49f3-ad90-5da402d6eb17',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Encrypt::Aes256',
    name: 'stage:start:encrypt',
    timestamp: 1780527428697,
    type: 'stage',
    boundary: 'start',
    traceId: 'daa5fd95-e343-4711-a5bc-5c5cf2a89db5'
  },
  {
    id: '60639a32-9440-482d-9b6c-4822182cd0ee',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Encrypt::Aes256',
    name: 'stage:end:encrypt',
    timestamp: 1780527428699,
    type: 'stage',
    boundary: 'end',
    traceId: 'daa5fd95-e343-4711-a5bc-5c5cf2a89db5'
  },
  {
    id: 'bba4224f-aeee-402e-981e-16dc708eb559',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Persist::LocalStorage',
    name: 'stage:start:persist',
    timestamp: 1780527428699,
    type: 'stage',
    boundary: 'start',
    traceId: 'daa5fd95-e343-4711-a5bc-5c5cf2a89db5'
  },
  {
    id: '9b364186-5751-400e-9ef4-803c754b8f63',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Persist::LocalStorage',
    name: 'stage:end:persist',
    timestamp: 1780527428699,
    type: 'stage',
    boundary: 'end',
    traceId: 'daa5fd95-e343-4711-a5bc-5c5cf2a89db5'
  },
  {
    id: '4b33f926-47af-4728-a130-1e0e584ae1db',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'lifecycle:end:merge',
    timestamp: 1780527428700,
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
    traceId: 'daa5fd95-e343-4711-a5bc-5c5cf2a89db5'
  },
  {
    id: '1ac65a7c-6004-42f4-ac48-9767304bfa11',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:start:core-state',
    timestamp: 1780527428700,
    type: 'stage',
    boundary: 'start',
    traceId: 'daa5fd95-e343-4711-a5bc-5c5cf2a89db5'
  },
  {
    id: '386ebb2e-7952-4aed-8fea-2d8fcd085c77',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:end:core-state',
    timestamp: 1780527428701,
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
          name: 'Padmé',
          lastName: 'Amidala'
        }
      ],
      error: null,
      hasValue: true
    },
    type: 'stage',
    boundary: 'end',
    traceId: 'daa5fd95-e343-4711-a5bc-5c5cf2a89db5'
  },
  {
    id: '978b4a0d-0815-4bf5-a70e-fae92ff91619',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:success',
    timestamp: 1780527428701,
    type: 'lifecycle',
    boundary: 'notification',
    traceId: 'daa5fd95-e343-4711-a5bc-5c5cf2a89db5'
  },
  {
    id: '11d5d362-7096-4deb-8a06-2b4026d7d0f0',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'conductor:end:attempt',
    timestamp: 1780527428701,
    type: 'conductor',
    boundary: 'end',
    payload: {
      status: 'success'
    },
    traceId: 'daa5fd95-e343-4711-a5bc-5c5cf2a89db5'
  },
  {
    id: '98c9d98a-41c7-40f8-9737-f6a00f7ca103',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:finalize',
    timestamp: 1780527428702,
    type: 'lifecycle',
    boundary: 'notification',
    traceId: 'daa5fd95-e343-4711-a5bc-5c5cf2a89db5'
  },
  {
    id: '2012f855-7a74-4e2d-a130-089137741a45',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'conductor:start:attempt',
    timestamp: 1780527430150,
    type: 'conductor',
    boundary: 'start',
    traceId: '252fe24e-fe96-4d5b-9fbb-4ed338f09791'
  },
  {
    id: 'd7eec80c-49c3-4bd5-b672-125c5b4b11d5',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:start:vote',
    timestamp: 1780527430152,
    type: 'controller',
    boundary: 'start',
    traceId: '252fe24e-fe96-4d5b-9fbb-4ed338f09791'
  },
  {
    id: '37e10ae3-a0b2-46af-8fc8-38e47c86bb5e',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:start:vote',
    timestamp: 1780527430153,
    type: 'controller',
    boundary: 'start',
    traceId: '252fe24e-fe96-4d5b-9fbb-4ed338f09791'
  },
  {
    id: '22803054-cb2c-4e44-9b24-3572990b6403',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:start:vote',
    timestamp: 1780527430154,
    type: 'controller',
    boundary: 'start',
    traceId: '252fe24e-fe96-4d5b-9fbb-4ed338f09791'
  },
  {
    id: '61a5031d-323f-4ea7-b989-da97721db67c',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:start:vote',
    timestamp: 1780527430155,
    type: 'controller',
    boundary: 'start',
    traceId: '252fe24e-fe96-4d5b-9fbb-4ed338f09791'
  },
  {
    id: 'fbc04b10-4bb0-420f-a357-38ac13bbdad2',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Delay',
    name: 'controller:start:vote',
    timestamp: 1780527430156,
    type: 'controller',
    boundary: 'start',
    traceId: '252fe24e-fe96-4d5b-9fbb-4ed338f09791'
  },
  {
    id: '4d602669-1dbc-4511-8884-5042794c0d56',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Stepwise',
    name: 'controller:start:vote',
    timestamp: 1780527430157,
    type: 'controller',
    boundary: 'start',
    traceId: '252fe24e-fe96-4d5b-9fbb-4ed338f09791'
  },
  {
    id: 'af1da3cd-faee-4cfc-898c-1959a8717665',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::TabSync',
    name: 'controller:start:vote',
    timestamp: 1780527430157,
    type: 'controller',
    boundary: 'start',
    traceId: '252fe24e-fe96-4d5b-9fbb-4ed338f09791'
  },
  {
    id: '7846476a-42c5-4e45-92b7-70e2b7a16b14',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:end:vote',
    timestamp: 1780527430158,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '252fe24e-fe96-4d5b-9fbb-4ed338f09791'
  },
  {
    id: '03b99f46-fa36-4184-9274-9cc9fabbbec5',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:end:vote',
    timestamp: 1780527430159,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '252fe24e-fe96-4d5b-9fbb-4ed338f09791'
  },
  {
    id: '442dcccc-3938-4fd4-a22f-4e552cac9306',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:end:vote',
    timestamp: 1780527430160,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '252fe24e-fe96-4d5b-9fbb-4ed338f09791'
  },
  {
    id: '76a6ee0f-8520-42cd-99d2-2287b8cbb336',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Delay',
    name: 'controller:end:vote',
    timestamp: 1780527430161,
    type: 'controller',
    boundary: 'end',
    payload: 'deny',
    traceId: '252fe24e-fe96-4d5b-9fbb-4ed338f09791'
  },
  {
    id: 'd18a150f-c1ce-44de-aca7-c4b6e51f654a',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Stepwise',
    name: 'controller:end:vote',
    timestamp: 1780527430162,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '252fe24e-fe96-4d5b-9fbb-4ed338f09791'
  },
  {
    id: '498bb8f3-5fe8-42e2-ae0d-14230645b06c',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::TabSync',
    name: 'controller:end:vote',
    timestamp: 1780527430162,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '252fe24e-fe96-4d5b-9fbb-4ed338f09791'
  },
  {
    id: '0b24b32c-5850-44ac-b451-b038e5e0cd76',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:end:vote',
    timestamp: 1780527430163,
    type: 'controller',
    boundary: 'end',
    payload: {
      traceId: '252fe24e-fe96-4d5b-9fbb-4ed338f09791',
      outcome: 'deny'
    },
    traceId: '252fe24e-fe96-4d5b-9fbb-4ed338f09791'
  },
  {
    id: '302faadb-2c81-4515-b949-07f8e2c3a9a4',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'conductor:notification:deny',
    timestamp: 1780527430165,
    type: 'conductor',
    boundary: 'notification',
    traceId: '252fe24e-fe96-4d5b-9fbb-4ed338f09791'
  },
  {
    id: '394f522f-90da-455c-af3f-ff1cd89d1d4b',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'lifecycle:notification:revote',
    timestamp: 1780527430658,
    type: 'lifecycle',
    boundary: 'notification',
    traceId: '252fe24e-fe96-4d5b-9fbb-4ed338f09791'
  },
  {
    id: 'a09ae3b7-6349-439c-af68-bd8c9d64cd6e',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:start:vote',
    timestamp: 1780527430659,
    type: 'controller',
    boundary: 'start',
    traceId: '252fe24e-fe96-4d5b-9fbb-4ed338f09791'
  },
  {
    id: '8a217d7b-5fb1-4963-b2fc-945eef701963',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:start:vote',
    timestamp: 1780527430660,
    type: 'controller',
    boundary: 'start',
    traceId: '252fe24e-fe96-4d5b-9fbb-4ed338f09791'
  },
  {
    id: '46e87cca-717e-47e5-a4bc-efa67a0ca3ee',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:start:vote',
    timestamp: 1780527430661,
    type: 'controller',
    boundary: 'start',
    traceId: '252fe24e-fe96-4d5b-9fbb-4ed338f09791'
  },
  {
    id: 'f4c62091-6572-4025-ab85-8226f2830adc',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:start:vote',
    timestamp: 1780527430662,
    type: 'controller',
    boundary: 'start',
    traceId: '252fe24e-fe96-4d5b-9fbb-4ed338f09791'
  },
  {
    id: '7f37b5d6-6d5b-4bbd-aa99-b6f7bc8f59d0',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Delay',
    name: 'controller:start:vote',
    timestamp: 1780527430663,
    type: 'controller',
    boundary: 'start',
    traceId: '252fe24e-fe96-4d5b-9fbb-4ed338f09791'
  },
  {
    id: '2bd0df8f-80ed-4f9a-8431-f4317e1790e4',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Stepwise',
    name: 'controller:start:vote',
    timestamp: 1780527430664,
    type: 'controller',
    boundary: 'start',
    traceId: '252fe24e-fe96-4d5b-9fbb-4ed338f09791'
  },
  {
    id: 'b18db1ce-8325-40e7-998e-60e1f456fafe',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::TabSync',
    name: 'controller:start:vote',
    timestamp: 1780527430665,
    type: 'controller',
    boundary: 'start',
    traceId: '252fe24e-fe96-4d5b-9fbb-4ed338f09791'
  },
  {
    id: '7da66766-a291-494f-a560-dc828963f18e',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:end:vote',
    timestamp: 1780527430666,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '252fe24e-fe96-4d5b-9fbb-4ed338f09791'
  },
  {
    id: '4cdc6791-80e3-4718-a2d4-a7f643f89a93',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:end:vote',
    timestamp: 1780527430667,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '252fe24e-fe96-4d5b-9fbb-4ed338f09791'
  },
  {
    id: '080f922e-c3ff-4a04-af65-8b0157b5d5c3',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:end:vote',
    timestamp: 1780527430667,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '252fe24e-fe96-4d5b-9fbb-4ed338f09791'
  },
  {
    id: '61b0020e-d940-45fd-9da5-c48113cd9144',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Delay',
    name: 'controller:end:vote',
    timestamp: 1780527430668,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '252fe24e-fe96-4d5b-9fbb-4ed338f09791'
  },
  {
    id: '233fd47d-374b-4bb4-add8-7a7e63e112fc',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Stepwise',
    name: 'controller:end:vote',
    timestamp: 1780527430669,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '252fe24e-fe96-4d5b-9fbb-4ed338f09791'
  },
  {
    id: '3dcb9cd3-b864-4c91-b035-bae423fbc8a3',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::TabSync',
    name: 'controller:end:vote',
    timestamp: 1780527430670,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: '252fe24e-fe96-4d5b-9fbb-4ed338f09791'
  },
  {
    id: 'c8016175-8f24-4cfd-9ea0-2a199b4ce217',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:end:vote',
    timestamp: 1780527430671,
    type: 'controller',
    boundary: 'end',
    payload: {
      traceId: '252fe24e-fe96-4d5b-9fbb-4ed338f09791',
      outcome: 'abstain'
    },
    traceId: '252fe24e-fe96-4d5b-9fbb-4ed338f09791'
  },
  {
    id: 'eca11a14-a9e8-4ff4-8c1c-5d76fbfda665',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'lifecycle:start:merge',
    timestamp: 1780527430672,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '252fe24e-fe96-4d5b-9fbb-4ed338f09791'
  },
  {
    id: '80f21e3e-cf3a-48f1-9ad7-179343623a68',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    name: 'stage:start:resolve',
    timestamp: 1780527430673,
    type: 'stage',
    boundary: 'start',
    traceId: '252fe24e-fe96-4d5b-9fbb-4ed338f09791'
  },
  {
    id: 'b5f665b9-9cd2-473b-8f7d-7fcdb4b196aa',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    name: 'stage:end:resolve',
    timestamp: 1780527430674,
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
          name: 'Padmé',
          lastName: 'Amidala'
        }
      ],
      error: null,
      hasValue: true
    },
    type: 'stage',
    boundary: 'end',
    traceId: '252fe24e-fe96-4d5b-9fbb-4ed338f09791'
  },
  {
    id: '125d7998-dd65-4f7e-a1c6-8983850d9131',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:start:compute-merge',
    timestamp: 1780527430674,
    type: 'stage',
    boundary: 'start',
    traceId: '252fe24e-fe96-4d5b-9fbb-4ed338f09791'
  },
  {
    id: '320e37bb-5b5c-459c-a2bc-be8189dad710',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:end:compute-merge',
    timestamp: 1780527430675,
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
          name: 'Padmé',
          lastName: 'Amidala'
        }
      ],
      error: null,
      hasValue: true
    },
    type: 'stage',
    boundary: 'end',
    traceId: '252fe24e-fe96-4d5b-9fbb-4ed338f09791'
  },
  {
    id: '3da81669-3ab1-4525-86dd-8268960b6f03',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Filter',
    name: 'stage:start:filter',
    timestamp: 1780527430675,
    type: 'stage',
    boundary: 'start',
    traceId: '252fe24e-fe96-4d5b-9fbb-4ed338f09791'
  },
  {
    id: '1454abbd-5b52-48e3-ad03-7ed6489eeb1d',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Filter',
    name: 'stage:end:filter',
    timestamp: 1780527430676,
    type: 'stage',
    boundary: 'end',
    traceId: '252fe24e-fe96-4d5b-9fbb-4ed338f09791'
  },
  {
    id: 'f58fa3b1-abcb-4c6c-865d-d8c26a99ce56',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Reducer',
    name: 'stage:start:reducer',
    timestamp: 1780527430676,
    type: 'stage',
    boundary: 'start',
    traceId: '252fe24e-fe96-4d5b-9fbb-4ed338f09791'
  },
  {
    id: '1cb52679-9ade-405f-8170-9ed156514171',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Reducer',
    name: 'lifecycle:notification:runtime-error',
    timestamp: 1780527430677,
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
          name: 'Padmé',
          lastName: 'Amidala'
        }
      ],
      error: null,
      hasValue: true
    },
    type: 'lifecycle',
    boundary: 'notification',
    error: {
      message: 'Example error triggered',
      details:
        'Error: Example error triggered\n    at http://localhost:4250/main.js:3030:17\n    at withCoreReducerBehavior2.applyReducer (http://localhost:4250/main.js:1550:12)\n    at #runUpstreamStage (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3035:50)\n    at #finishPipeline (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2873:52)\n    at async http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2919:24\n    at async #safeAsync (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2949:22)\n    at async #orchestrateMerge (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2905:5)\n    at async Conductor.orchestrate (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2632:7)\n    at async #processEvent (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3608:7)\n    at async #processQueue (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3695:11)',
      raw: {},
      timestamp: 1780527430677,
      featureCellKey: 'starwars-feature-cell-key'
    },
    traceId: '252fe24e-fe96-4d5b-9fbb-4ed338f09791'
  },
  {
    id: '9159a485-7c95-4c02-882f-2b3b5d83aefc',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:start:core-error',
    timestamp: 1780527430678,
    type: 'stage',
    boundary: 'start',
    traceId: '252fe24e-fe96-4d5b-9fbb-4ed338f09791'
  },
  {
    id: '697ce69f-af3c-48d5-b630-b45177707c2b',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:end:core-error',
    timestamp: 1780527430678,
    type: 'stage',
    boundary: 'end',
    traceId: '252fe24e-fe96-4d5b-9fbb-4ed338f09791'
  },
  {
    id: 'c09cb7c6-439b-499e-a979-1bda59c1347f',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:start:core-state',
    timestamp: 1780527430678,
    type: 'stage',
    boundary: 'start',
    traceId: '252fe24e-fe96-4d5b-9fbb-4ed338f09791'
  },
  {
    id: '51ffa7ec-b016-423f-a178-697305eed0ee',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:end:core-state',
    timestamp: 1780527430679,
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
          name: 'Padmé',
          lastName: 'Amidala'
        }
      ],
      error: {
        message: 'Example error triggered',
        details:
          'Error: Example error triggered\n    at http://localhost:4250/main.js:3030:17\n    at withCoreReducerBehavior2.applyReducer (http://localhost:4250/main.js:1550:12)\n    at #runUpstreamStage (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3035:50)\n    at #finishPipeline (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2873:52)\n    at async http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2919:24\n    at async #safeAsync (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2949:22)\n    at async #orchestrateMerge (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2905:5)\n    at async Conductor.orchestrate (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2632:7)\n    at async #processEvent (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3608:7)\n    at async #processQueue (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3695:11)',
        raw: {},
        timestamp: 1780527430678,
        featureCellKey: 'starwars-feature-cell-key'
      },
      hasValue: true
    },
    type: 'stage',
    boundary: 'end',
    traceId: '252fe24e-fe96-4d5b-9fbb-4ed338f09791'
  },
  {
    id: '1f70c007-2889-4abb-90ef-b18f59a9ad8c',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'lifecycle:start:global-error',
    timestamp: 1780527430679,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '252fe24e-fe96-4d5b-9fbb-4ed338f09791'
  },
  {
    id: '70ca5617-8f64-4b17-95ec-18b9dd16f51b',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'lifecycle:end:global-error',
    timestamp: 1780527430679,
    type: 'lifecycle',
    boundary: 'end',
    traceId: '252fe24e-fe96-4d5b-9fbb-4ed338f09791'
  },
  {
    id: 'b6ea895f-6510-485e-b06d-f795d2e64e4d',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:failure',
    timestamp: 1780527430681,
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
          name: 'Padmé',
          lastName: 'Amidala'
        }
      ],
      error: {
        message: 'Example error triggered',
        details:
          'Error: Example error triggered\n    at http://localhost:4250/main.js:3030:17\n    at withCoreReducerBehavior2.applyReducer (http://localhost:4250/main.js:1550:12)\n    at #runUpstreamStage (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3035:50)\n    at #finishPipeline (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2873:52)\n    at async http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2919:24\n    at async #safeAsync (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2949:22)\n    at async #orchestrateMerge (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2905:5)\n    at async Conductor.orchestrate (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2632:7)\n    at async #processEvent (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3608:7)\n    at async #processQueue (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3695:11)',
        raw: {},
        timestamp: 1780527430678,
        featureCellKey: 'starwars-feature-cell-key'
      },
      hasValue: true
    },
    type: 'lifecycle',
    boundary: 'notification',
    error: {
      message: 'Unexpected error',
      details: {
        message: 'Example error triggered',
        details:
          'Error: Example error triggered\n    at http://localhost:4250/main.js:3030:17\n    at withCoreReducerBehavior2.applyReducer (http://localhost:4250/main.js:1550:12)\n    at #runUpstreamStage (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3035:50)\n    at #finishPipeline (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2873:52)\n    at async http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2919:24\n    at async #safeAsync (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2949:22)\n    at async #orchestrateMerge (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2905:5)\n    at async Conductor.orchestrate (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2632:7)\n    at async #processEvent (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3608:7)\n    at async #processQueue (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3695:11)',
        raw: {},
        timestamp: 1780527430678,
        featureCellKey: 'starwars-feature-cell-key'
      },
      raw: {
        message: 'Example error triggered',
        details:
          'Error: Example error triggered\n    at http://localhost:4250/main.js:3030:17\n    at withCoreReducerBehavior2.applyReducer (http://localhost:4250/main.js:1550:12)\n    at #runUpstreamStage (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3035:50)\n    at #finishPipeline (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2873:52)\n    at async http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2919:24\n    at async #safeAsync (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2949:22)\n    at async #orchestrateMerge (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2905:5)\n    at async Conductor.orchestrate (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2632:7)\n    at async #processEvent (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3608:7)\n    at async #processQueue (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3695:11)',
        raw: {},
        timestamp: 1780527430678,
        featureCellKey: 'starwars-feature-cell-key'
      },
      timestamp: 1780527430681,
      featureCellKey: 'decision-engine'
    },
    traceId: '252fe24e-fe96-4d5b-9fbb-4ed338f09791'
  },
  {
    id: '03bd362e-8aea-4651-8796-28caee9fea95',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'lifecycle:notification:abort',
    timestamp: 1780527430681,
    type: 'lifecycle',
    boundary: 'notification',
    traceId: '252fe24e-fe96-4d5b-9fbb-4ed338f09791'
  },
  {
    id: 'd580c16f-7d58-44e0-b01d-b2f68cddd269',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'conductor:end:attempt',
    timestamp: 1780527430682,
    type: 'conductor',
    boundary: 'end',
    payload: {
      status: 'failure'
    },
    traceId: '252fe24e-fe96-4d5b-9fbb-4ed338f09791'
  },
  {
    id: '1acae7fc-4e13-4c20-beae-e4b840ca48ee',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:notification:restart-attempt',
    timestamp: 1780527430682,
    type: 'controller',
    boundary: 'notification',
    payload: 'failure',
    traceId: '252fe24e-fe96-4d5b-9fbb-4ed338f09791'
  },
  {
    id: '2be788b1-7add-4d24-853d-7eb7151fa858',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:finalize',
    timestamp: 1780527430682,
    type: 'lifecycle',
    boundary: 'notification',
    traceId: '252fe24e-fe96-4d5b-9fbb-4ed338f09791'
  },
  {
    id: 'e1043a06-a457-4a50-b942-b0ade1a82ab3',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-feature-cell',
    name: 'lifecycle:start:reset',
    timestamp: 1780527431907,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: 'e95de458-fbc1-43a0-bdeb-b7a33d90b019',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'lifecycle:start:reset',
    timestamp: 1780527431909,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '724ba222-c90a-4abd-8ae4-985201bdd191',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::AfterTap',
    name: 'lifecycle:start:reset',
    timestamp: 1780527431911,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '3c710cda-2120-44af-a575-e3d6d2b0f2ca',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::AfterTap',
    name: 'lifecycle:end:reset',
    timestamp: 1780527431912,
    type: 'lifecycle',
    boundary: 'end',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '70654bc3-6cd4-4790-8491-79878df67e3c',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::BeforeTap',
    name: 'lifecycle:start:reset',
    timestamp: 1780527431913,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: 'e1e0d143-b3d3-44b8-9298-8c688044e13c',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::BeforeTap',
    name: 'lifecycle:end:reset',
    timestamp: 1780527431914,
    type: 'lifecycle',
    boundary: 'end',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: 'e1790c3c-e87b-41e4-998e-ed937bd58b02',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Error',
    name: 'lifecycle:start:reset',
    timestamp: 1780527431915,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '1266d670-91f1-4a52-a801-61fc73d1646b',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Error',
    name: 'lifecycle:end:reset',
    timestamp: 1780527431916,
    type: 'lifecycle',
    boundary: 'end',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '3c7be8c9-a3d2-49db-a0c0-353b03bbba3c',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Filter',
    name: 'lifecycle:start:reset',
    timestamp: 1780527431917,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: 'efa0e32e-fac8-4230-a010-ff4399bd0ae7',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Filter',
    name: 'lifecycle:end:reset',
    timestamp: 1780527431918,
    type: 'lifecycle',
    boundary: 'end',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '62e28c99-9a65-4ad8-b3d1-3b01c851ce41',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::FromObservable',
    name: 'lifecycle:start:reset',
    timestamp: 1780527431918,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: 'f116804a-281a-4006-896a-c8a445d5b386',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::FromObservable',
    name: 'lifecycle:end:reset',
    timestamp: 1780527431919,
    type: 'lifecycle',
    boundary: 'end',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '5da0d696-338e-4f0e-aff6-dc8362d66f53',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::FromPromise',
    name: 'lifecycle:start:reset',
    timestamp: 1780527431920,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: 'eafd5521-6ab6-4b67-9fe2-10b6bb862415',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::FromPromise',
    name: 'lifecycle:end:reset',
    timestamp: 1780527431921,
    type: 'lifecycle',
    boundary: 'end',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: 'dfff9fe7-ea71-4c29-834c-c285c3daf8da',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::FromStream',
    name: 'lifecycle:start:reset',
    timestamp: 1780527431922,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '2844de15-65ce-45b5-9a23-b4f34c3e2141',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::FromStream',
    name: 'lifecycle:end:reset',
    timestamp: 1780527431923,
    type: 'lifecycle',
    boundary: 'end',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '74f181d0-752f-4cc6-b0ba-69f943ec6cbe',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Observable',
    name: 'lifecycle:start:reset',
    timestamp: 1780527431924,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '583a83bf-869b-444c-9566-4ff7fbb0c644',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Observable',
    name: 'lifecycle:end:reset',
    timestamp: 1780527431924,
    type: 'lifecycle',
    boundary: 'end',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '63235033-374b-4947-a7ab-deacbd3aa1dc',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Promise',
    name: 'lifecycle:start:reset',
    timestamp: 1780527431925,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: 'f557c9f3-4ae3-4ed4-88a3-7d8b1155ab95',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Promise',
    name: 'lifecycle:end:reset',
    timestamp: 1780527431926,
    type: 'lifecycle',
    boundary: 'end',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '5313fa83-046f-4ca6-9ee5-f7d121888763',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Reducer',
    name: 'lifecycle:start:reset',
    timestamp: 1780527431926,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '970e0cfe-ec61-40c1-9c64-c1cb850bbec6',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Reducer',
    name: 'lifecycle:end:reset',
    timestamp: 1780527431926,
    type: 'lifecycle',
    boundary: 'end',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: 'a9bde395-7c44-4f54-918b-4ab653c188a7',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    name: 'lifecycle:start:reset',
    timestamp: 1780527431927,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '36d31721-9d47-4dae-a265-ee04612b81fd',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    name: 'lifecycle:end:reset',
    timestamp: 1780527431927,
    type: 'lifecycle',
    boundary: 'end',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '48b62f79-ac58-45f6-8006-0f47729508c8',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::State',
    name: 'lifecycle:start:reset',
    timestamp: 1780527431927,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: 'fd314e3b-27c2-4691-9199-5ab2c7ea74b6',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::State',
    name: 'lifecycle:end:reset',
    timestamp: 1780527431928,
    type: 'lifecycle',
    boundary: 'end',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: 'be9c8020-6121-4ff8-8e88-1c995f1355d6',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::ArrayMerge',
    name: 'lifecycle:start:reset',
    timestamp: 1780527431928,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: 'e1a63204-12a4-4470-8941-a0a7b6a4cd89',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::ArrayMerge',
    name: 'lifecycle:end:reset',
    timestamp: 1780527431928,
    type: 'lifecycle',
    boundary: 'end',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '7665b860-c10d-419e-9615-4879fc667749',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::License',
    name: 'lifecycle:start:reset',
    timestamp: 1780527431929,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: 'b9ef6e2a-9e6d-4234-b54d-99e1694666d5',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::License',
    name: 'lifecycle:end:reset',
    timestamp: 1780527431929,
    type: 'lifecycle',
    boundary: 'end',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '8777fe55-fbe4-4fd5-ad59-ae756694474c',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Persist::LocalStorage',
    name: 'lifecycle:start:reset',
    timestamp: 1780527431929,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '975dd69d-147c-477d-87c9-12672c76fa87',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Persist::LocalStorage',
    name: 'lifecycle:end:reset',
    timestamp: 1780527431930,
    type: 'lifecycle',
    boundary: 'end',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: 'b052fc07-aeda-4d76-8864-776f1a6c43ea',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Encrypt::Aes256',
    name: 'lifecycle:start:reset',
    timestamp: 1780527431930,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '2f251216-d4d7-47df-bedb-ddba9a7f7b8a',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Encrypt::Aes256',
    name: 'lifecycle:end:reset',
    timestamp: 1780527431930,
    type: 'lifecycle',
    boundary: 'end',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: 'cc8dc642-3528-48db-a4f4-181dc5bd1e86',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'lifecycle:start:reset',
    timestamp: 1780527431931,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '039e94a4-7c38-4bab-8f26-f8382941f121',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'lifecycle:end:reset',
    timestamp: 1780527431931,
    type: 'lifecycle',
    boundary: 'end',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: 'cb8e0978-5fe1-4b90-905c-80034e3f38ba',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'lifecycle:start:reset',
    timestamp: 1780527431931,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '5294553e-46f7-4225-9c49-eb16a0d1d75a',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'lifecycle:end:reset',
    timestamp: 1780527431932,
    type: 'lifecycle',
    boundary: 'end',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '864eae9c-6a7f-441f-bbde-8134763ded94',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'lifecycle:start:reset',
    timestamp: 1780527431932,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '569bc913-f609-49a5-8f50-bcfdc2b41cc2',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'lifecycle:end:reset',
    timestamp: 1780527431932,
    type: 'lifecycle',
    boundary: 'end',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '2441bb4e-ebd7-42dd-8a12-75dae2ceb395',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Delay',
    name: 'lifecycle:start:reset',
    timestamp: 1780527431933,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '2796590b-a9d7-409d-a77a-e6d42d83d5f2',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Delay',
    name: 'lifecycle:end:reset',
    timestamp: 1780527431933,
    type: 'lifecycle',
    boundary: 'end',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '94b51292-486d-46b0-aa86-b6d2240d9a34',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Stepwise',
    name: 'lifecycle:start:reset',
    timestamp: 1780527431933,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '93d2c926-f9cc-40df-a8ca-db68595f54d9',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Stepwise',
    name: 'lifecycle:end:reset',
    timestamp: 1780527431933,
    type: 'lifecycle',
    boundary: 'end',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: 'e11847e3-6144-4acb-89f2-b1452c1babf8',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::TabSync',
    name: 'lifecycle:start:reset',
    timestamp: 1780527431934,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '3eb5b686-79b8-4763-bda2-fcb8080f3a44',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::TabSync',
    name: 'lifecycle:end:reset',
    timestamp: 1780527431934,
    type: 'lifecycle',
    boundary: 'end',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '6c4da505-8374-4291-9815-60d8451fcce8',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'lifecycle:end:reset',
    timestamp: 1780527431934,
    type: 'lifecycle',
    boundary: 'end',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '7892e46a-1f42-482b-8f6f-04981c426f92',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-feature-cell',
    name: 'lifecycle:end:reset',
    timestamp: 1780527431935,
    type: 'lifecycle',
    boundary: 'end',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '92948f13-6a47-41cf-85d0-ebd2a0e5f45d',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'conductor:start:attempt',
    timestamp: 1780527433271,
    type: 'conductor',
    boundary: 'start',
    traceId: 'ec9f318d-8431-4794-b526-aba0a75bb279'
  },
  {
    id: 'ba22a56a-6c34-4e6e-9330-c166a56e1956',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:start:vote',
    timestamp: 1780527433273,
    type: 'controller',
    boundary: 'start',
    traceId: 'ec9f318d-8431-4794-b526-aba0a75bb279'
  },
  {
    id: '608bfb0b-479a-4d6c-9963-b5e93450c264',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:start:vote',
    timestamp: 1780527433274,
    type: 'controller',
    boundary: 'start',
    traceId: 'ec9f318d-8431-4794-b526-aba0a75bb279'
  },
  {
    id: '42fb897a-2197-47fe-a361-a5bc8793a3f8',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:start:vote',
    timestamp: 1780527433275,
    type: 'controller',
    boundary: 'start',
    traceId: 'ec9f318d-8431-4794-b526-aba0a75bb279'
  },
  {
    id: 'e4a40370-950a-4861-8ed9-05728e030ea9',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:start:vote',
    timestamp: 1780527433276,
    type: 'controller',
    boundary: 'start',
    traceId: 'ec9f318d-8431-4794-b526-aba0a75bb279'
  },
  {
    id: 'b88c139d-3e33-4923-b51e-b05243ef22a2',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Delay',
    name: 'controller:start:vote',
    timestamp: 1780527433277,
    type: 'controller',
    boundary: 'start',
    traceId: 'ec9f318d-8431-4794-b526-aba0a75bb279'
  },
  {
    id: '25580ba9-d226-4da8-a6aa-6fc644faab00',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Stepwise',
    name: 'controller:start:vote',
    timestamp: 1780527433278,
    type: 'controller',
    boundary: 'start',
    traceId: 'ec9f318d-8431-4794-b526-aba0a75bb279'
  },
  {
    id: '714fd5ac-9c1c-45c5-860f-8d6a6d6fbde5',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::TabSync',
    name: 'controller:start:vote',
    timestamp: 1780527433279,
    type: 'controller',
    boundary: 'start',
    traceId: 'ec9f318d-8431-4794-b526-aba0a75bb279'
  },
  {
    id: 'a2a38787-f730-4574-9150-51e79b5c2453',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:end:vote',
    timestamp: 1780527433280,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'ec9f318d-8431-4794-b526-aba0a75bb279'
  },
  {
    id: 'e0d07749-6869-47e2-903e-b81180aab455',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:end:vote',
    timestamp: 1780527433281,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'ec9f318d-8431-4794-b526-aba0a75bb279'
  },
  {
    id: '6a787cec-51dc-4af2-b55d-33eb6da942b8',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:end:vote',
    timestamp: 1780527433282,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'ec9f318d-8431-4794-b526-aba0a75bb279'
  },
  {
    id: 'af0932b1-affc-4ea1-b107-0e6b818db31e',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Delay',
    name: 'controller:end:vote',
    timestamp: 1780527433283,
    type: 'controller',
    boundary: 'end',
    payload: 'deny',
    traceId: 'ec9f318d-8431-4794-b526-aba0a75bb279'
  },
  {
    id: '6636270e-18c9-4a3a-9ec5-ab2d745af05f',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Stepwise',
    name: 'controller:end:vote',
    timestamp: 1780527433284,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'ec9f318d-8431-4794-b526-aba0a75bb279'
  },
  {
    id: '0e0ac729-5b23-4c96-aab0-fdb285f31d4c',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::TabSync',
    name: 'controller:end:vote',
    timestamp: 1780527433285,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'ec9f318d-8431-4794-b526-aba0a75bb279'
  },
  {
    id: '0c65f6a0-0d71-4397-8307-a29246c3f961',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:end:vote',
    timestamp: 1780527433286,
    type: 'controller',
    boundary: 'end',
    payload: {
      traceId: 'ec9f318d-8431-4794-b526-aba0a75bb279',
      outcome: 'deny'
    },
    traceId: 'ec9f318d-8431-4794-b526-aba0a75bb279'
  },
  {
    id: '5b20b83d-d916-4bb4-8ef2-04a4dab9a331',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'conductor:notification:deny',
    timestamp: 1780527433288,
    type: 'conductor',
    boundary: 'notification',
    traceId: 'ec9f318d-8431-4794-b526-aba0a75bb279'
  },
  {
    id: 'c240ae16-fca0-4710-b08a-5e1219474f0e',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'lifecycle:notification:revote',
    timestamp: 1780527433780,
    type: 'lifecycle',
    boundary: 'notification',
    traceId: 'ec9f318d-8431-4794-b526-aba0a75bb279'
  },
  {
    id: '9a6be9a7-9f5c-4ec0-a54e-fdbcaa328cce',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:start:vote',
    timestamp: 1780527433781,
    type: 'controller',
    boundary: 'start',
    traceId: 'ec9f318d-8431-4794-b526-aba0a75bb279'
  },
  {
    id: '196791bb-95f6-482d-af9d-1d2f7613620b',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:start:vote',
    timestamp: 1780527433783,
    type: 'controller',
    boundary: 'start',
    traceId: 'ec9f318d-8431-4794-b526-aba0a75bb279'
  },
  {
    id: '586a6d30-1212-4ab8-875b-dd4c86840f4a',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:start:vote',
    timestamp: 1780527433784,
    type: 'controller',
    boundary: 'start',
    traceId: 'ec9f318d-8431-4794-b526-aba0a75bb279'
  },
  {
    id: '1bae1c42-b89b-4374-9e2a-2b430978c566',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:start:vote',
    timestamp: 1780527433785,
    type: 'controller',
    boundary: 'start',
    traceId: 'ec9f318d-8431-4794-b526-aba0a75bb279'
  },
  {
    id: 'e53412f1-184e-4879-873a-fb5baec47f85',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Delay',
    name: 'controller:start:vote',
    timestamp: 1780527433786,
    type: 'controller',
    boundary: 'start',
    traceId: 'ec9f318d-8431-4794-b526-aba0a75bb279'
  },
  {
    id: 'ace71a55-40e9-4bdd-abda-a662c35089ad',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Stepwise',
    name: 'controller:start:vote',
    timestamp: 1780527433787,
    type: 'controller',
    boundary: 'start',
    traceId: 'ec9f318d-8431-4794-b526-aba0a75bb279'
  },
  {
    id: '4b97cfd7-7e42-4f37-bc0b-82618a44bfe7',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::TabSync',
    name: 'controller:start:vote',
    timestamp: 1780527433788,
    type: 'controller',
    boundary: 'start',
    traceId: 'ec9f318d-8431-4794-b526-aba0a75bb279'
  },
  {
    id: 'a267a376-75f4-4295-8abc-f62b87e4ffb4',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:end:vote',
    timestamp: 1780527433789,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'ec9f318d-8431-4794-b526-aba0a75bb279'
  },
  {
    id: '908f39e5-f2b2-45c6-a59d-76b23765361c',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:end:vote',
    timestamp: 1780527433790,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'ec9f318d-8431-4794-b526-aba0a75bb279'
  },
  {
    id: '889759c8-c0e2-47af-a5e2-aa5049cabe39',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:end:vote',
    timestamp: 1780527433791,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'ec9f318d-8431-4794-b526-aba0a75bb279'
  },
  {
    id: 'd75b2320-4a16-43e1-8861-5b62e505f93f',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Delay',
    name: 'controller:end:vote',
    timestamp: 1780527433792,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'ec9f318d-8431-4794-b526-aba0a75bb279'
  },
  {
    id: 'c3a6db02-16dd-41c5-abf9-f5ac7160d264',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Stepwise',
    name: 'controller:end:vote',
    timestamp: 1780527433793,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'ec9f318d-8431-4794-b526-aba0a75bb279'
  },
  {
    id: '6db8c220-1b63-46fc-9398-35d00c15dd4f',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::TabSync',
    name: 'controller:end:vote',
    timestamp: 1780527433794,
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'ec9f318d-8431-4794-b526-aba0a75bb279'
  },
  {
    id: '2ec9f0ed-6f26-4b07-a7f0-3775c16e69a6',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:end:vote',
    timestamp: 1780527433795,
    type: 'controller',
    boundary: 'end',
    payload: {
      traceId: 'ec9f318d-8431-4794-b526-aba0a75bb279',
      outcome: 'abstain'
    },
    traceId: 'ec9f318d-8431-4794-b526-aba0a75bb279'
  },
  {
    id: '7e93a531-4aa2-4837-9459-365c620b76d0',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'lifecycle:start:replace',
    timestamp: 1780527433797,
    type: 'lifecycle',
    boundary: 'start',
    traceId: 'ec9f318d-8431-4794-b526-aba0a75bb279'
  },
  {
    id: '9c377877-9a7d-4e91-873e-4d0919ada48a',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    name: 'stage:start:resolve',
    timestamp: 1780527433798,
    type: 'stage',
    boundary: 'start',
    traceId: 'ec9f318d-8431-4794-b526-aba0a75bb279'
  },
  {
    id: 'ae6ded65-805c-41f4-adb9-eebbc382fdf8',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    name: 'stage:end:resolve',
    timestamp: 1780527433799,
    state: {
      isLoading: false,
      error: null,
      hasValue: false
    },
    type: 'stage',
    boundary: 'end',
    traceId: 'ec9f318d-8431-4794-b526-aba0a75bb279'
  },
  {
    id: '0e23766d-7fb7-4520-a959-ae4a604e1b1d',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Filter',
    name: 'stage:start:filter',
    timestamp: 1780527433800,
    type: 'stage',
    boundary: 'start',
    traceId: 'ec9f318d-8431-4794-b526-aba0a75bb279'
  },
  {
    id: '36c5e30f-14a9-48fc-a00c-00e51eb9cda6',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Filter',
    name: 'stage:end:filter',
    timestamp: 1780527433800,
    type: 'stage',
    boundary: 'end',
    traceId: 'ec9f318d-8431-4794-b526-aba0a75bb279'
  },
  {
    id: '38e21d9e-ffaf-4af3-bfc8-8e0f1c645374',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Reducer',
    name: 'stage:start:reducer',
    timestamp: 1780527433801,
    type: 'stage',
    boundary: 'start',
    traceId: 'ec9f318d-8431-4794-b526-aba0a75bb279'
  },
  {
    id: '317204c4-a203-44de-a98f-cec25286ff82',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Reducer',
    name: 'lifecycle:notification:runtime-error',
    timestamp: 1780527433801,
    state: {
      isLoading: false,
      error: null,
      hasValue: false
    },
    type: 'lifecycle',
    boundary: 'notification',
    error: {
      message: 'Example error triggered',
      details:
        'Error: Example error triggered\n    at http://localhost:4250/main.js:3030:17\n    at withCoreReducerBehavior2.applyReducer (http://localhost:4250/main.js:1550:12)\n    at #runUpstreamStage (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3035:50)\n    at #finishPipeline (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2873:52)\n    at async http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2896:24\n    at async #safeAsync (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2949:22)\n    at async #orchestrateReplace (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2888:5)\n    at async Conductor.orchestrate (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2630:7)\n    at async #processEvent (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3608:7)\n    at async #processQueue (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3695:11)',
      raw: {},
      timestamp: 1780527433801,
      featureCellKey: 'starwars-feature-cell-key'
    },
    traceId: 'ec9f318d-8431-4794-b526-aba0a75bb279'
  },
  {
    id: 'f4c47498-4265-44e4-8b64-590db46b3260',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:start:core-error',
    timestamp: 1780527433802,
    type: 'stage',
    boundary: 'start',
    traceId: 'ec9f318d-8431-4794-b526-aba0a75bb279'
  },
  {
    id: '3e648724-1347-4625-9047-e18c2db9be42',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:end:core-error',
    timestamp: 1780527433803,
    type: 'stage',
    boundary: 'end',
    traceId: 'ec9f318d-8431-4794-b526-aba0a75bb279'
  },
  {
    id: '8f629d2c-ba61-40df-b6fa-c1c87cfdac0e',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:start:core-state',
    timestamp: 1780527433803,
    type: 'stage',
    boundary: 'start',
    traceId: 'ec9f318d-8431-4794-b526-aba0a75bb279'
  },
  {
    id: '0a70bc5f-fdd7-43b9-9fe2-c7a102019147',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:end:core-state',
    timestamp: 1780527433804,
    state: {
      isLoading: false,
      error: {
        message: 'Example error triggered',
        details:
          'Error: Example error triggered\n    at http://localhost:4250/main.js:3030:17\n    at withCoreReducerBehavior2.applyReducer (http://localhost:4250/main.js:1550:12)\n    at #runUpstreamStage (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3035:50)\n    at #finishPipeline (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2873:52)\n    at async http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2896:24\n    at async #safeAsync (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2949:22)\n    at async #orchestrateReplace (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2888:5)\n    at async Conductor.orchestrate (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2630:7)\n    at async #processEvent (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3608:7)\n    at async #processQueue (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3695:11)',
        raw: {},
        timestamp: 1780527433802,
        featureCellKey: 'starwars-feature-cell-key'
      },
      hasValue: false
    },
    type: 'stage',
    boundary: 'end',
    traceId: 'ec9f318d-8431-4794-b526-aba0a75bb279'
  },
  {
    id: '2bcda188-3af5-468c-839d-e6044d6a118a',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'lifecycle:start:global-error',
    timestamp: 1780527433804,
    type: 'lifecycle',
    boundary: 'start',
    traceId: 'ec9f318d-8431-4794-b526-aba0a75bb279'
  },
  {
    id: '8122fe2f-35d9-4924-924f-3892cdcec226',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'lifecycle:end:global-error',
    timestamp: 1780527433804,
    type: 'lifecycle',
    boundary: 'end',
    traceId: 'ec9f318d-8431-4794-b526-aba0a75bb279'
  },
  {
    id: 'c66768a7-fe70-4ea5-a9aa-1cfa4081f13d',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:failure',
    timestamp: 1780527433805,
    state: {
      isLoading: false,
      error: {
        message: 'Example error triggered',
        details:
          'Error: Example error triggered\n    at http://localhost:4250/main.js:3030:17\n    at withCoreReducerBehavior2.applyReducer (http://localhost:4250/main.js:1550:12)\n    at #runUpstreamStage (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3035:50)\n    at #finishPipeline (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2873:52)\n    at async http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2896:24\n    at async #safeAsync (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2949:22)\n    at async #orchestrateReplace (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2888:5)\n    at async Conductor.orchestrate (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2630:7)\n    at async #processEvent (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3608:7)\n    at async #processQueue (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3695:11)',
        raw: {},
        timestamp: 1780527433802,
        featureCellKey: 'starwars-feature-cell-key'
      },
      hasValue: false
    },
    type: 'lifecycle',
    boundary: 'notification',
    error: {
      message: 'Unexpected error',
      details: {
        message: 'Example error triggered',
        details:
          'Error: Example error triggered\n    at http://localhost:4250/main.js:3030:17\n    at withCoreReducerBehavior2.applyReducer (http://localhost:4250/main.js:1550:12)\n    at #runUpstreamStage (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3035:50)\n    at #finishPipeline (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2873:52)\n    at async http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2896:24\n    at async #safeAsync (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2949:22)\n    at async #orchestrateReplace (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2888:5)\n    at async Conductor.orchestrate (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2630:7)\n    at async #processEvent (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3608:7)\n    at async #processQueue (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3695:11)',
        raw: {},
        timestamp: 1780527433802,
        featureCellKey: 'starwars-feature-cell-key'
      },
      raw: {
        message: 'Example error triggered',
        details:
          'Error: Example error triggered\n    at http://localhost:4250/main.js:3030:17\n    at withCoreReducerBehavior2.applyReducer (http://localhost:4250/main.js:1550:12)\n    at #runUpstreamStage (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3035:50)\n    at #finishPipeline (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2873:52)\n    at async http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2896:24\n    at async #safeAsync (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2949:22)\n    at async #orchestrateReplace (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2888:5)\n    at async Conductor.orchestrate (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:2630:7)\n    at async #processEvent (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3608:7)\n    at async #processQueue (http://localhost:4250/@fs/Users/brianpilati/code/sdux-vault/vault/.angular/cache/21.2.14/devtools-demo/vite/deps/@sdux-vault_engine.js?v=a4704218:3695:11)',
        raw: {},
        timestamp: 1780527433802,
        featureCellKey: 'starwars-feature-cell-key'
      },
      timestamp: 1780527433805,
      featureCellKey: 'decision-engine'
    },
    traceId: 'ec9f318d-8431-4794-b526-aba0a75bb279'
  },
  {
    id: '548dd1b6-48fc-4d5c-98ec-48b8b3aa1126',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'lifecycle:notification:abort',
    timestamp: 1780527433805,
    type: 'lifecycle',
    boundary: 'notification',
    traceId: 'ec9f318d-8431-4794-b526-aba0a75bb279'
  },
  {
    id: 'af4516de-95bb-4db1-bcd1-9f4e99a06532',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'conductor:end:attempt',
    timestamp: 1780527433806,
    type: 'conductor',
    boundary: 'end',
    payload: {
      status: 'failure'
    },
    traceId: 'ec9f318d-8431-4794-b526-aba0a75bb279'
  },
  {
    id: '2d933e44-e341-48a5-8b68-ef394a9876b4',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'controller:notification:restart-attempt',
    timestamp: 1780527433806,
    type: 'controller',
    boundary: 'notification',
    payload: 'failure',
    traceId: 'ec9f318d-8431-4794-b526-aba0a75bb279'
  },
  {
    id: 'd7dc29b2-70c0-4c4d-91a3-bbb1b6c911b6',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:finalize',
    timestamp: 1780527433808,
    type: 'lifecycle',
    boundary: 'notification',
    traceId: 'ec9f318d-8431-4794-b526-aba0a75bb279'
  },
  {
    id: 'de415d12-a66b-41f1-9cf4-7d1fe20ec898',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-feature-cell',
    name: 'lifecycle:start:reset',
    timestamp: 1780527436901,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: 'a1029839-ad69-4303-a6cc-2b48fabdde1d',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'lifecycle:start:reset',
    timestamp: 1780527436902,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '4e5ed394-8376-4576-a018-dc30b1892c52',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::AfterTap',
    name: 'lifecycle:start:reset',
    timestamp: 1780527436903,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '17d0cf3a-173b-47cb-84e3-a509bc4d5a1c',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::AfterTap',
    name: 'lifecycle:end:reset',
    timestamp: 1780527436904,
    type: 'lifecycle',
    boundary: 'end',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '7f732838-18b0-4190-92e7-58aba5c001bc',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::BeforeTap',
    name: 'lifecycle:start:reset',
    timestamp: 1780527436906,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: 'b8a6aa73-9c3b-4097-b3ec-dcae4c2a5658',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::BeforeTap',
    name: 'lifecycle:end:reset',
    timestamp: 1780527436907,
    type: 'lifecycle',
    boundary: 'end',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: 'd5a6f898-c378-47d7-b7db-f9c7cadc37d7',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Error',
    name: 'lifecycle:start:reset',
    timestamp: 1780527436908,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '5fa875d8-9085-4b7f-8380-1843a2c8e012',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Error',
    name: 'lifecycle:end:reset',
    timestamp: 1780527436909,
    type: 'lifecycle',
    boundary: 'end',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '5fe7bdb3-f631-4adc-82ff-577b1b64a20c',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Filter',
    name: 'lifecycle:start:reset',
    timestamp: 1780527436910,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '2c75f854-6409-4560-a66f-733e26d975ee',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Filter',
    name: 'lifecycle:end:reset',
    timestamp: 1780527436911,
    type: 'lifecycle',
    boundary: 'end',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '09259dc0-a136-4348-895e-eee02f12d2b3',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::FromObservable',
    name: 'lifecycle:start:reset',
    timestamp: 1780527436912,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '69e6e452-8efd-49ba-bf77-acce748af955',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::FromObservable',
    name: 'lifecycle:end:reset',
    timestamp: 1780527436913,
    type: 'lifecycle',
    boundary: 'end',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: 'cbf896ba-32d5-4488-8465-85168aef9b83',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::FromPromise',
    name: 'lifecycle:start:reset',
    timestamp: 1780527436914,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '7f44cf98-150b-4755-9030-73c51809751d',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::FromPromise',
    name: 'lifecycle:end:reset',
    timestamp: 1780527436915,
    type: 'lifecycle',
    boundary: 'end',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: 'b3afc5d8-1903-4a71-967c-eccdc484514b',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::FromStream',
    name: 'lifecycle:start:reset',
    timestamp: 1780527436916,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: 'd01a3649-14f7-4d09-ba7c-45bf88afad45',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::FromStream',
    name: 'lifecycle:end:reset',
    timestamp: 1780527436916,
    type: 'lifecycle',
    boundary: 'end',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '13a1ef07-f0a4-4caa-8baa-fd8815138dcb',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Observable',
    name: 'lifecycle:start:reset',
    timestamp: 1780527436917,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: 'f9fa127d-1be9-4387-ac57-f9f37a0fbb9d',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Observable',
    name: 'lifecycle:end:reset',
    timestamp: 1780527436917,
    type: 'lifecycle',
    boundary: 'end',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '55ec2e5f-38a3-4e91-9d54-bce8011f134f',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Promise',
    name: 'lifecycle:start:reset',
    timestamp: 1780527436918,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: 'e26c2e86-df46-47a8-aa54-099f071580ad',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Promise',
    name: 'lifecycle:end:reset',
    timestamp: 1780527436918,
    type: 'lifecycle',
    boundary: 'end',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '78182c56-db2b-4045-87a2-001e99810702',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Reducer',
    name: 'lifecycle:start:reset',
    timestamp: 1780527436918,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: 'fc41be85-434c-47a2-8fd6-825d20195e36',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Reducer',
    name: 'lifecycle:end:reset',
    timestamp: 1780527436919,
    type: 'lifecycle',
    boundary: 'end',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '568acf5c-c7b1-42db-8e2e-410907bfb228',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    name: 'lifecycle:start:reset',
    timestamp: 1780527436919,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '3d465772-d893-4bd3-9f2d-8818be8e749b',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    name: 'lifecycle:end:reset',
    timestamp: 1780527436919,
    type: 'lifecycle',
    boundary: 'end',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '0d1c58b0-151a-494a-b844-34cb527f3add',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::State',
    name: 'lifecycle:start:reset',
    timestamp: 1780527436920,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: 'b4c496d8-2d52-411b-b65b-e0e6b52999c7',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::State',
    name: 'lifecycle:end:reset',
    timestamp: 1780527436920,
    type: 'lifecycle',
    boundary: 'end',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: 'e1923060-e063-440e-842f-ee323316d7bb',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::ArrayMerge',
    name: 'lifecycle:start:reset',
    timestamp: 1780527436921,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: 'b75f1f37-1c1f-43ab-9881-05b561dd78a8',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::ArrayMerge',
    name: 'lifecycle:end:reset',
    timestamp: 1780527436921,
    type: 'lifecycle',
    boundary: 'end',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '895df39d-c3c5-4774-a6be-5772853df570',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::License',
    name: 'lifecycle:start:reset',
    timestamp: 1780527436921,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '175bbd5f-cef2-4428-9793-82d60bd6ee2f',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Core::License',
    name: 'lifecycle:end:reset',
    timestamp: 1780527436922,
    type: 'lifecycle',
    boundary: 'end',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: 'c63743a1-5a37-4b1a-bb7e-c21295eb5a29',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Persist::LocalStorage',
    name: 'lifecycle:start:reset',
    timestamp: 1780527436922,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '900fed15-0a96-4265-af71-36a0e1fe242f',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Persist::LocalStorage',
    name: 'lifecycle:end:reset',
    timestamp: 1780527436923,
    type: 'lifecycle',
    boundary: 'end',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '3d896ba7-007d-4c58-9aa0-9c3923cc5a3a',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Encrypt::Aes256',
    name: 'lifecycle:start:reset',
    timestamp: 1780527436923,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '62f280b3-757c-4689-b65c-79f15857577f',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Behavior::Encrypt::Aes256',
    name: 'lifecycle:end:reset',
    timestamp: 1780527436923,
    type: 'lifecycle',
    boundary: 'end',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '9f357796-72b9-4af5-95c3-cadb7ff30f40',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'lifecycle:start:reset',
    timestamp: 1780527436924,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: 'b9fe3f00-4e73-457e-9c84-7f41f9ff5579',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'lifecycle:end:reset',
    timestamp: 1780527436924,
    type: 'lifecycle',
    boundary: 'end',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '67a19e5e-7077-4cb7-8908-34f10a925d0e',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'lifecycle:start:reset',
    timestamp: 1780527436924,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: 'ae944d90-6ea9-43ad-93e5-874b85c44fc9',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'lifecycle:end:reset',
    timestamp: 1780527436925,
    type: 'lifecycle',
    boundary: 'end',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '4063649f-2256-4112-a692-b31597337158',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'lifecycle:start:reset',
    timestamp: 1780527436925,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: 'a4dd91af-3fea-4c1d-818b-60d1d2a99d45',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'lifecycle:end:reset',
    timestamp: 1780527436926,
    type: 'lifecycle',
    boundary: 'end',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '4ff23311-e3f1-4b24-9640-7b0ac70f0c4d',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Delay',
    name: 'lifecycle:start:reset',
    timestamp: 1780527436926,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '4fdd65be-3e81-4bc0-a115-b75ecd9a3810',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Delay',
    name: 'lifecycle:end:reset',
    timestamp: 1780527436926,
    type: 'lifecycle',
    boundary: 'end',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '7b44210e-8d30-4867-81f6-59622ad173a1',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Stepwise',
    name: 'lifecycle:start:reset',
    timestamp: 1780527436927,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '966e1394-78d4-480d-9959-6822150337e5',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::Stepwise',
    name: 'lifecycle:end:reset',
    timestamp: 1780527436927,
    type: 'lifecycle',
    boundary: 'end',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '59e7e14f-eec5-4d8b-8909-1ad2426ad314',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::TabSync',
    name: 'lifecycle:start:reset',
    timestamp: 1780527436927,
    type: 'lifecycle',
    boundary: 'start',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '053bd295-3b13-46f5-b3a6-2a15b034db59',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'SDUX::Controller::Policy::TabSync',
    name: 'lifecycle:end:reset',
    timestamp: 1780527436928,
    type: 'lifecycle',
    boundary: 'end',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: 'c3c7b826-6a90-4597-b357-5ff890666e1e',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-conductor',
    name: 'lifecycle:end:reset',
    timestamp: 1780527436928,
    type: 'lifecycle',
    boundary: 'end',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: 'aec297a9-bb6b-40ce-a299-d166e5c2f490',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-feature-cell',
    name: 'lifecycle:end:reset',
    timestamp: 1780527436929,
    type: 'lifecycle',
    boundary: 'end',
    traceId: '65f83c19-3ab9-4b88-be1a-e5a66dc8d48e'
  },
  {
    id: '9552742f-d5c4-4de6-a1cc-343741951b32',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:start:core-state',
    timestamp: 1780527437773,
    type: 'stage',
    boundary: 'start',
    traceId: '7ef57227-d694-4ddd-94e9-e4e8021555cb'
  },
  {
    id: 'a0a74cd3-1f17-49ff-bc35-6627d0ec1b88',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:end:core-state',
    timestamp: 1780527437774,
    state: {
      isLoading: true,
      error: null,
      hasValue: false
    },
    type: 'stage',
    boundary: 'end',
    traceId: '7ef57227-d694-4ddd-94e9-e4e8021555cb'
  },
  {
    id: 'c4fb4aab-089c-4143-87fe-33dd8235fbb8',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:start:core-state',
    timestamp: 1780527441310,
    type: 'stage',
    boundary: 'start',
    traceId: '407b6c03-d6a5-4bef-b6ce-8bde62384c72'
  },
  {
    id: '1bde231f-71a7-4925-afc2-7f9d3819cdfc',
    cell: 'starwars-feature-cell-key',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:end:core-state',
    timestamp: 1780527441312,
    state: {
      isLoading: false,
      error: null,
      hasValue: false
    },
    type: 'stage',
    boundary: 'end',
    traceId: '407b6c03-d6a5-4bef-b6ce-8bde62384c72'
  }
] as unknown as EventShape[];
