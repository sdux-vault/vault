// AUTO-GENERATED – DO NOT EDIT
export const p303Snapshot = [
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'vault-feature-cell',
    name: 'lifecycle:start:initialized',
    timestamp: 'ts-removed',
    type: 'lifecycle',
    boundary: 'start'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'partial-encrypt.with-aes-256::license',
    name: 'lifecycle:notification:license-attempt',
    timestamp: 'ts-removed',
    type: 'lifecycle',
    boundary: 'notification'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'partial-encrypt.with-aes-256::license',
    name: 'lifecycle:notification:license-approved',
    timestamp: 'ts-removed',
    type: 'lifecycle',
    boundary: 'notification'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'vault-conductor',
    name: 'conductor:start:attempt',
    timestamp: 'ts-removed',
    type: 'conductor',
    boundary: 'start',
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'vault-conductor',
    name: 'controller:start:attempt',
    timestamp: 'ts-removed',
    type: 'controller',
    boundary: 'start',
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'vault-conductor',
    name: 'controller:start:vote',
    timestamp: 'ts-removed',
    type: 'controller',
    boundary: 'start',
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:start:vote',
    timestamp: 'ts-removed',
    type: 'controller',
    boundary: 'start',
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:start:vote',
    timestamp: 'ts-removed',
    type: 'controller',
    boundary: 'start',
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:start:vote',
    timestamp: 'ts-removed',
    type: 'controller',
    boundary: 'start',
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:end:vote',
    timestamp: 'ts-removed',
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:end:vote',
    timestamp: 'ts-removed',
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:end:vote',
    timestamp: 'ts-removed',
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'vault-conductor',
    name: 'controller:end:vote',
    timestamp: 'ts-removed',
    type: 'controller',
    boundary: 'end',
    payload: {
      traceId: 'trace-id-removed',
      outcome: 'abstain'
    },
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'vault-feature-cell',
    name: 'lifecycle:end:initialized',
    timestamp: 'ts-removed',
    type: 'lifecycle',
    boundary: 'end'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'vault-conductor',
    name: 'controller:end:attempt',
    timestamp: 'ts-removed',
    type: 'controller',
    boundary: 'end',
    payload: {
      decision: true
    },
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'SDUX::Behavior::Persist::LocalStorage',
    name: 'stage:start:load-persist',
    timestamp: 'ts-removed',
    type: 'stage',
    boundary: 'start',
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'SDUX::Behavior::Persist::LocalStorage',
    name: 'stage:end:load-persist',
    timestamp: 'ts-removed',
    type: 'stage',
    boundary: 'end',
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'SDUX::Behavior::Encrypt::Aes256',
    name: 'stage:start:decrypt',
    timestamp: 'ts-removed',
    type: 'stage',
    boundary: 'start',
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'SDUX::Behavior::Encrypt::Aes256',
    name: 'lifecycle:notification:runtime-error',
    timestamp: 'ts-removed',
    type: 'lifecycle',
    boundary: 'notification',
    error: {
      message:
        'Encrypted snapshot failed integrity verification.\n\nThe encrypted payload could not be authenticated during AES-GCM decryption.\n\nPossible causes:\n\n• The stored ciphertext has been tampered with\n• The stored initialization vector (IV) was modified\n• The encryption key does not match the original key\n• The stored payload is corrupted\n\nVault refuses to restore state from unauthenticated encrypted data.',
      details: 'details-removed',
      raw: 'raw-removed',
      timestamp: 'ts-removed',
      featureCellKey: 'partial-encrypt.with-aes-256'
    },
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:success',
    timestamp: 'ts-removed',
    type: 'lifecycle',
    boundary: 'notification',
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'vault-conductor',
    name: 'conductor:end:attempt',
    timestamp: 'ts-removed',
    type: 'conductor',
    boundary: 'end',
    payload: {
      status: 'success'
    },
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:finalize',
    timestamp: 'ts-removed',
    type: 'lifecycle',
    boundary: 'notification',
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'vault-conductor',
    name: 'conductor:start:attempt',
    timestamp: 'ts-removed',
    type: 'conductor',
    boundary: 'start',
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'vault-conductor',
    name: 'controller:start:attempt',
    timestamp: 'ts-removed',
    type: 'controller',
    boundary: 'start',
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'vault-conductor',
    name: 'controller:start:vote',
    timestamp: 'ts-removed',
    type: 'controller',
    boundary: 'start',
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:start:vote',
    timestamp: 'ts-removed',
    type: 'controller',
    boundary: 'start',
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:start:vote',
    timestamp: 'ts-removed',
    type: 'controller',
    boundary: 'start',
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:start:vote',
    timestamp: 'ts-removed',
    type: 'controller',
    boundary: 'start',
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:end:vote',
    timestamp: 'ts-removed',
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:end:vote',
    timestamp: 'ts-removed',
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:end:vote',
    timestamp: 'ts-removed',
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'vault-conductor',
    name: 'controller:end:vote',
    timestamp: 'ts-removed',
    type: 'controller',
    boundary: 'end',
    payload: {
      traceId: 'trace-id-removed',
      outcome: 'abstain'
    },
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'vault-conductor',
    name: 'controller:end:attempt',
    timestamp: 'ts-removed',
    type: 'controller',
    boundary: 'end',
    payload: {
      decision: true
    },
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'vault-orchestrator',
    name: 'pipeline:candidate:pipeline-start',
    timestamp: 'ts-removed',
    type: 'pipeline',
    boundary: 'candidate',
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'vault-orchestrator',
    name: 'lifecycle:start:replace',
    timestamp: 'ts-removed',
    type: 'lifecycle',
    boundary: 'start',
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    name: 'stage:start:resolve',
    timestamp: 'ts-removed',
    type: 'stage',
    boundary: 'start',
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'vault-orchestrator',
    name: 'pipeline:candidate:resolve',
    timestamp: 'ts-removed',
    type: 'pipeline',
    boundary: 'candidate',
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'SDUX::Behavior::Core::Value',
    name: 'stage:end:resolve',
    timestamp: 'ts-removed',
    type: 'stage',
    boundary: 'end',
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'SDUX::Behavior::Encrypt::Aes256',
    name: 'stage:start:encrypt',
    timestamp: 'ts-removed',
    type: 'stage',
    boundary: 'start',
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'SDUX::Behavior::Encrypt::Aes256',
    name: 'stage:end:encrypt',
    timestamp: 'ts-removed',
    type: 'stage',
    boundary: 'end',
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'SDUX::Behavior::Persist::LocalStorage',
    name: 'stage:start:persist',
    timestamp: 'ts-removed',
    type: 'stage',
    boundary: 'start',
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'SDUX::Behavior::Persist::LocalStorage',
    name: 'stage:end:persist',
    timestamp: 'ts-removed',
    type: 'stage',
    boundary: 'end',
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'vault-orchestrator',
    name: 'lifecycle:end:replace',
    timestamp: 'ts-removed',
    type: 'lifecycle',
    boundary: 'end',
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:start:core-state',
    timestamp: 'ts-removed',
    type: 'stage',
    boundary: 'start',
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'vault-orchestrator',
    name: 'pipeline:candidate:core-state',
    timestamp: 'ts-removed',
    type: 'pipeline',
    boundary: 'candidate',
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'vault-orchestrator',
    name: 'stage:end:core-state',
    timestamp: 'ts-removed',
    type: 'stage',
    boundary: 'end',
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:success',
    timestamp: 'ts-removed',
    type: 'lifecycle',
    boundary: 'notification',
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'vault-conductor',
    name: 'conductor:end:attempt',
    timestamp: 'ts-removed',
    type: 'conductor',
    boundary: 'end',
    payload: {
      status: 'success'
    },
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:finalize',
    timestamp: 'ts-removed',
    type: 'lifecycle',
    boundary: 'notification',
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'vault-feature-cell',
    name: 'lifecycle:start:initialized',
    timestamp: 'ts-removed',
    type: 'lifecycle',
    boundary: 'start'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'partial-encrypt.with-aes-256::license',
    name: 'lifecycle:notification:license-attempt',
    timestamp: 'ts-removed',
    type: 'lifecycle',
    boundary: 'notification'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'partial-encrypt.with-aes-256::license',
    name: 'lifecycle:notification:license-approved',
    timestamp: 'ts-removed',
    type: 'lifecycle',
    boundary: 'notification'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'vault-conductor',
    name: 'conductor:start:attempt',
    timestamp: 'ts-removed',
    type: 'conductor',
    boundary: 'start',
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'vault-conductor',
    name: 'controller:start:attempt',
    timestamp: 'ts-removed',
    type: 'controller',
    boundary: 'start',
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'vault-conductor',
    name: 'controller:start:vote',
    timestamp: 'ts-removed',
    type: 'controller',
    boundary: 'start',
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:start:vote',
    timestamp: 'ts-removed',
    type: 'controller',
    boundary: 'start',
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:start:vote',
    timestamp: 'ts-removed',
    type: 'controller',
    boundary: 'start',
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:start:vote',
    timestamp: 'ts-removed',
    type: 'controller',
    boundary: 'start',
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'SDUX::Controller::Policy::CoreAbstain',
    name: 'controller:end:vote',
    timestamp: 'ts-removed',
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'SDUX::Controller::Policy::CoreLicense',
    name: 'controller:end:vote',
    timestamp: 'ts-removed',
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'SDUX::Controller::Policy::CoreError',
    name: 'controller:end:vote',
    timestamp: 'ts-removed',
    type: 'controller',
    boundary: 'end',
    payload: 'abstain',
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'vault-conductor',
    name: 'controller:end:vote',
    timestamp: 'ts-removed',
    type: 'controller',
    boundary: 'end',
    payload: {
      traceId: 'trace-id-removed',
      outcome: 'abstain'
    },
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'vault-feature-cell',
    name: 'lifecycle:end:initialized',
    timestamp: 'ts-removed',
    type: 'lifecycle',
    boundary: 'end'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'vault-conductor',
    name: 'controller:end:attempt',
    timestamp: 'ts-removed',
    type: 'controller',
    boundary: 'end',
    payload: {
      decision: true
    },
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'SDUX::Behavior::Persist::LocalStorage',
    name: 'stage:start:load-persist',
    timestamp: 'ts-removed',
    type: 'stage',
    boundary: 'start',
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'SDUX::Behavior::Persist::LocalStorage',
    name: 'stage:end:load-persist',
    timestamp: 'ts-removed',
    type: 'stage',
    boundary: 'end',
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'SDUX::Behavior::Encrypt::Aes256',
    name: 'stage:start:decrypt',
    timestamp: 'ts-removed',
    type: 'stage',
    boundary: 'start',
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'SDUX::Behavior::Encrypt::Aes256',
    name: 'lifecycle:notification:runtime-error',
    timestamp: 'ts-removed',
    type: 'lifecycle',
    boundary: 'notification',
    error: {
      message:
        'Encrypted snapshot failed integrity verification.\n\nThe encrypted payload could not be authenticated during AES-GCM decryption.\n\nPossible causes:\n\n• The stored ciphertext has been tampered with\n• The stored initialization vector (IV) was modified\n• The encryption key does not match the original key\n• The stored payload is corrupted\n\nVault refuses to restore state from unauthenticated encrypted data.',
      details: 'details-removed',
      raw: 'raw-removed',
      timestamp: 'ts-removed',
      featureCellKey: 'partial-encrypt.with-aes-256'
    },
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:success',
    timestamp: 'ts-removed',
    type: 'lifecycle',
    boundary: 'notification',
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'vault-conductor',
    name: 'conductor:end:attempt',
    timestamp: 'ts-removed',
    type: 'conductor',
    boundary: 'end',
    payload: {
      status: 'success'
    },
    traceId: 'trace-id-removed'
  },
  {
    id: 'id-removed',
    cell: 'partial-encrypt.with-aes-256',
    behaviorKey: 'decision-engine',
    name: 'lifecycle:notification:finalize',
    timestamp: 'ts-removed',
    type: 'lifecycle',
    boundary: 'notification',
    traceId: 'trace-id-removed'
  }
];
