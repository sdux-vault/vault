/** Expected trace begin events used in test assertions. */
export const BEGIN_EVENTS_EXPECTED = [
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'B',
    ts: 0,
    pid: 1,
    tid: '5ddc1e1c-4bd6-45d3-943e-75b69ef2dee5',
    args: {
      cell: 'pipeline-builder',
      behavior: '5ddc1e1c-4bd6-45d3-943e-75b69ef2dee5',
      scheduler: 'delayed',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'B',
    ts: 200,
    pid: 1,
    tid: '5ddc1e1c-4bd6-45d3-943e-75b69ef2dee5',
    args: {
      cell: 'pipeline-builder',
      behavior: '5ddc1e1c-4bd6-45d3-943e-75b69ef2dee5',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'B',
    ts: 499,
    pid: 1,
    tid: '5ddc1e1c-4bd6-45d3-943e-75b69ef2dee5',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'B',
    ts: 699,
    pid: 1,
    tid: '5ddc1e1c-4bd6-45d3-943e-75b69ef2dee5',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Core::Value',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'B',
    ts: 798,
    pid: 1,
    tid: '5ddc1e1c-4bd6-45d3-943e-75b69ef2dee5',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'B',
    ts: 1198,
    pid: 1,
    tid: '5ddc1e1c-4bd6-45d3-943e-75b69ef2dee5',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Persist::SessionStorage',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'B',
    ts: 1597,
    pid: 1,
    tid: '5ddc1e1c-4bd6-45d3-943e-75b69ef2dee5',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 1976,
    pid: 1,
    tid: '5ddc1e1c-4bd6-45d3-943e-75b69ef2dee5',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 2076,
    pid: 1,
    tid: '5ddc1e1c-4bd6-45d3-943e-75b69ef2dee5',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'B',
    ts: 2075295,
    pid: 1,
    tid: 'e27e81bf-37b7-40ad-98ba-7f0eb293a21e',
    args: {
      cell: 'pipeline-builder',
      behavior: 'e27e81bf-37b7-40ad-98ba-7f0eb293a21e',
      scheduler: 'delayed',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'B',
    ts: 2075695,
    pid: 1,
    tid: 'e27e81bf-37b7-40ad-98ba-7f0eb293a21e',
    args: {
      cell: 'pipeline-builder',
      behavior: 'e27e81bf-37b7-40ad-98ba-7f0eb293a21e',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'B',
    ts: 2076494,
    pid: 1,
    tid: 'e27e81bf-37b7-40ad-98ba-7f0eb293a21e',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'B',
    ts: 2076793,
    pid: 1,
    tid: 'e27e81bf-37b7-40ad-98ba-7f0eb293a21e',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Core::Value',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'B',
    ts: 2077093,
    pid: 1,
    tid: 'e27e81bf-37b7-40ad-98ba-7f0eb293a21e',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'B',
    ts: 2078192,
    pid: 1,
    tid: 'e27e81bf-37b7-40ad-98ba-7f0eb293a21e',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Persist::SessionStorage',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'B',
    ts: 2079991,
    pid: 1,
    tid: 'e27e81bf-37b7-40ad-98ba-7f0eb293a21e',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 2080470,
    pid: 1,
    tid: 'e27e81bf-37b7-40ad-98ba-7f0eb293a21e',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 2080670,
    pid: 1,
    tid: 'e27e81bf-37b7-40ad-98ba-7f0eb293a21e',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'B',
    ts: 2736289,
    pid: 1,
    tid: '54c6d994-1bcd-4043-a34e-fa32555301c3',
    args: {
      cell: 'pipeline-builder',
      behavior: '54c6d994-1bcd-4043-a34e-fa32555301c3',
      scheduler: 'delayed',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'B',
    ts: 2736689,
    pid: 1,
    tid: '54c6d994-1bcd-4043-a34e-fa32555301c3',
    args: {
      cell: 'pipeline-builder',
      behavior: '54c6d994-1bcd-4043-a34e-fa32555301c3',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'B',
    ts: 2737588,
    pid: 1,
    tid: '54c6d994-1bcd-4043-a34e-fa32555301c3',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'B',
    ts: 2737787,
    pid: 1,
    tid: '54c6d994-1bcd-4043-a34e-fa32555301c3',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Core::Value',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'B',
    ts: 2738087,
    pid: 1,
    tid: '54c6d994-1bcd-4043-a34e-fa32555301c3',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'B',
    ts: 2739285,
    pid: 1,
    tid: '54c6d994-1bcd-4043-a34e-fa32555301c3',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Persist::SessionStorage',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'B',
    ts: 2740185,
    pid: 1,
    tid: '54c6d994-1bcd-4043-a34e-fa32555301c3',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 2740864,
    pid: 1,
    tid: '54c6d994-1bcd-4043-a34e-fa32555301c3',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 2741064,
    pid: 1,
    tid: '54c6d994-1bcd-4043-a34e-fa32555301c3',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'B',
    ts: 3276184,
    pid: 1,
    tid: 'da5ac314-c0d5-4628-841f-2e7b5da3d8f7',
    args: {
      cell: 'pipeline-builder',
      behavior: 'da5ac314-c0d5-4628-841f-2e7b5da3d8f7',
      scheduler: 'delayed',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'B',
    ts: 3276583,
    pid: 1,
    tid: 'da5ac314-c0d5-4628-841f-2e7b5da3d8f7',
    args: {
      cell: 'pipeline-builder',
      behavior: 'da5ac314-c0d5-4628-841f-2e7b5da3d8f7',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'B',
    ts: 3277482,
    pid: 1,
    tid: 'da5ac314-c0d5-4628-841f-2e7b5da3d8f7',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'B',
    ts: 3277781,
    pid: 1,
    tid: 'da5ac314-c0d5-4628-841f-2e7b5da3d8f7',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Core::Value',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'B',
    ts: 3278081,
    pid: 1,
    tid: 'da5ac314-c0d5-4628-841f-2e7b5da3d8f7',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'B',
    ts: 3279380,
    pid: 1,
    tid: 'da5ac314-c0d5-4628-841f-2e7b5da3d8f7',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Persist::SessionStorage',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'B',
    ts: 3279980,
    pid: 1,
    tid: 'da5ac314-c0d5-4628-841f-2e7b5da3d8f7',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 3280560,
    pid: 1,
    tid: 'da5ac314-c0d5-4628-841f-2e7b5da3d8f7',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 3280759,
    pid: 1,
    tid: 'da5ac314-c0d5-4628-841f-2e7b5da3d8f7',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'B',
    ts: 4640779,
    pid: 1,
    tid: 'cb8c0bb8-9160-4c7a-8b58-33c1b4036fe3',
    args: {
      cell: 'pipeline-builder',
      behavior: 'cb8c0bb8-9160-4c7a-8b58-33c1b4036fe3',
      scheduler: 'delayed',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'B',
    ts: 4641279,
    pid: 1,
    tid: 'cb8c0bb8-9160-4c7a-8b58-33c1b4036fe3',
    args: {
      cell: 'pipeline-builder',
      behavior: 'cb8c0bb8-9160-4c7a-8b58-33c1b4036fe3',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'B',
    ts: 4642179,
    pid: 1,
    tid: 'cb8c0bb8-9160-4c7a-8b58-33c1b4036fe3',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'B',
    ts: 4642378,
    pid: 1,
    tid: 'cb8c0bb8-9160-4c7a-8b58-33c1b4036fe3',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Core::Value',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'B',
    ts: 4642777,
    pid: 1,
    tid: 'cb8c0bb8-9160-4c7a-8b58-33c1b4036fe3',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'B',
    ts: 4643976,
    pid: 1,
    tid: 'cb8c0bb8-9160-4c7a-8b58-33c1b4036fe3',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Persist::SessionStorage',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'B',
    ts: 4645075,
    pid: 1,
    tid: 'cb8c0bb8-9160-4c7a-8b58-33c1b4036fe3',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 4645954,
    pid: 1,
    tid: 'cb8c0bb8-9160-4c7a-8b58-33c1b4036fe3',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 4646253,
    pid: 1,
    tid: 'cb8c0bb8-9160-4c7a-8b58-33c1b4036fe3',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'B',
    ts: 5328373,
    pid: 1,
    tid: '6b7209f0-40dc-4b54-97ed-428b42bec195',
    args: {
      cell: 'pipeline-builder',
      behavior: '6b7209f0-40dc-4b54-97ed-428b42bec195',
      scheduler: 'delayed',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'B',
    ts: 5328772,
    pid: 1,
    tid: '6b7209f0-40dc-4b54-97ed-428b42bec195',
    args: {
      cell: 'pipeline-builder',
      behavior: '6b7209f0-40dc-4b54-97ed-428b42bec195',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'B',
    ts: 5329771,
    pid: 1,
    tid: '6b7209f0-40dc-4b54-97ed-428b42bec195',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'B',
    ts: 5329971,
    pid: 1,
    tid: '6b7209f0-40dc-4b54-97ed-428b42bec195',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Core::Value',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'B',
    ts: 5330270,
    pid: 1,
    tid: '6b7209f0-40dc-4b54-97ed-428b42bec195',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'B',
    ts: 5331570,
    pid: 1,
    tid: '6b7209f0-40dc-4b54-97ed-428b42bec195',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Persist::SessionStorage',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'B',
    ts: 5332569,
    pid: 1,
    tid: '6b7209f0-40dc-4b54-97ed-428b42bec195',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 5334048,
    pid: 1,
    tid: '6b7209f0-40dc-4b54-97ed-428b42bec195',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 5334447,
    pid: 1,
    tid: '6b7209f0-40dc-4b54-97ed-428b42bec195',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'B',
    ts: 5856167,
    pid: 1,
    tid: 'f75cf56f-9c31-4e8d-8a69-3b0ee6a4b75c',
    args: {
      cell: 'pipeline-builder',
      behavior: 'f75cf56f-9c31-4e8d-8a69-3b0ee6a4b75c',
      scheduler: 'delayed',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'B',
    ts: 5856566,
    pid: 1,
    tid: 'f75cf56f-9c31-4e8d-8a69-3b0ee6a4b75c',
    args: {
      cell: 'pipeline-builder',
      behavior: 'f75cf56f-9c31-4e8d-8a69-3b0ee6a4b75c',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'B',
    ts: 5857565,
    pid: 1,
    tid: 'f75cf56f-9c31-4e8d-8a69-3b0ee6a4b75c',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'B',
    ts: 5857764,
    pid: 1,
    tid: 'f75cf56f-9c31-4e8d-8a69-3b0ee6a4b75c',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Core::Value',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'B',
    ts: 5858064,
    pid: 1,
    tid: 'f75cf56f-9c31-4e8d-8a69-3b0ee6a4b75c',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'B',
    ts: 5859262,
    pid: 1,
    tid: 'f75cf56f-9c31-4e8d-8a69-3b0ee6a4b75c',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Persist::SessionStorage',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'B',
    ts: 5860062,
    pid: 1,
    tid: 'f75cf56f-9c31-4e8d-8a69-3b0ee6a4b75c',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 5860642,
    pid: 1,
    tid: 'f75cf56f-9c31-4e8d-8a69-3b0ee6a4b75c',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 5860941,
    pid: 1,
    tid: 'f75cf56f-9c31-4e8d-8a69-3b0ee6a4b75c',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'B',
    ts: 6829360,
    pid: 1,
    tid: '248ddbf8-899c-444f-8680-6c1844225302',
    args: {
      cell: 'pipeline-builder',
      behavior: '248ddbf8-899c-444f-8680-6c1844225302',
      scheduler: 'delayed',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'B',
    ts: 6829860,
    pid: 1,
    tid: '248ddbf8-899c-444f-8680-6c1844225302',
    args: {
      cell: 'pipeline-builder',
      behavior: '248ddbf8-899c-444f-8680-6c1844225302',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'B',
    ts: 6830859,
    pid: 1,
    tid: '248ddbf8-899c-444f-8680-6c1844225302',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'B',
    ts: 6831159,
    pid: 1,
    tid: '248ddbf8-899c-444f-8680-6c1844225302',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Core::Value',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'B',
    ts: 6831458,
    pid: 1,
    tid: '248ddbf8-899c-444f-8680-6c1844225302',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'B',
    ts: 6832557,
    pid: 1,
    tid: '248ddbf8-899c-444f-8680-6c1844225302',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Persist::SessionStorage',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'B',
    ts: 6833157,
    pid: 1,
    tid: '248ddbf8-899c-444f-8680-6c1844225302',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 6833736,
    pid: 1,
    tid: '248ddbf8-899c-444f-8680-6c1844225302',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 6833936,
    pid: 1,
    tid: '248ddbf8-899c-444f-8680-6c1844225302',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'B',
    ts: 7087156,
    pid: 1,
    tid: 'd5338aa4-41c4-42b7-918a-05e89bd986f2',
    args: {
      cell: 'pipeline-builder',
      behavior: 'd5338aa4-41c4-42b7-918a-05e89bd986f2',
      scheduler: 'delayed',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'B',
    ts: 7087555,
    pid: 1,
    tid: 'd5338aa4-41c4-42b7-918a-05e89bd986f2',
    args: {
      cell: 'pipeline-builder',
      behavior: 'd5338aa4-41c4-42b7-918a-05e89bd986f2',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'B',
    ts: 7088853,
    pid: 1,
    tid: 'd5338aa4-41c4-42b7-918a-05e89bd986f2',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'B',
    ts: 7089053,
    pid: 1,
    tid: 'd5338aa4-41c4-42b7-918a-05e89bd986f2',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Core::Value',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'B',
    ts: 7089452,
    pid: 1,
    tid: 'd5338aa4-41c4-42b7-918a-05e89bd986f2',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'B',
    ts: 7090251,
    pid: 1,
    tid: 'd5338aa4-41c4-42b7-918a-05e89bd986f2',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Persist::SessionStorage',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'B',
    ts: 7091250,
    pid: 1,
    tid: 'd5338aa4-41c4-42b7-918a-05e89bd986f2',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 7091730,
    pid: 1,
    tid: 'd5338aa4-41c4-42b7-918a-05e89bd986f2',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 7092030,
    pid: 1,
    tid: 'd5338aa4-41c4-42b7-918a-05e89bd986f2',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'B',
    ts: 7940650,
    pid: 1,
    tid: '9548dc76-91b2-43b5-abb8-3ce5269260f4',
    args: {
      cell: 'pipeline-builder',
      behavior: '9548dc76-91b2-43b5-abb8-3ce5269260f4',
      scheduler: 'delayed',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'B',
    ts: 7941150,
    pid: 1,
    tid: '9548dc76-91b2-43b5-abb8-3ce5269260f4',
    args: {
      cell: 'pipeline-builder',
      behavior: '9548dc76-91b2-43b5-abb8-3ce5269260f4',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'B',
    ts: 7942149,
    pid: 1,
    tid: '9548dc76-91b2-43b5-abb8-3ce5269260f4',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'B',
    ts: 7942348,
    pid: 1,
    tid: '9548dc76-91b2-43b5-abb8-3ce5269260f4',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Core::Value',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'B',
    ts: 7942847,
    pid: 1,
    tid: '9548dc76-91b2-43b5-abb8-3ce5269260f4',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'B',
    ts: 7944046,
    pid: 1,
    tid: '9548dc76-91b2-43b5-abb8-3ce5269260f4',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Persist::SessionStorage',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'B',
    ts: 7944945,
    pid: 1,
    tid: '9548dc76-91b2-43b5-abb8-3ce5269260f4',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 7945625,
    pid: 1,
    tid: '9548dc76-91b2-43b5-abb8-3ce5269260f4',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 7945924,
    pid: 1,
    tid: '9548dc76-91b2-43b5-abb8-3ce5269260f4',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'B',
    ts: 9615444,
    pid: 1,
    tid: '9c1c59df-84dd-43fb-ada4-650895040465',
    args: {
      cell: 'pipeline-builder',
      behavior: '9c1c59df-84dd-43fb-ada4-650895040465',
      scheduler: 'delayed',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'B',
    ts: 9615644,
    pid: 1,
    tid: '9c1c59df-84dd-43fb-ada4-650895040465',
    args: {
      cell: 'pipeline-builder',
      behavior: '9c1c59df-84dd-43fb-ada4-650895040465',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'B',
    ts: 9616043,
    pid: 1,
    tid: '9c1c59df-84dd-43fb-ada4-650895040465',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'B',
    ts: 9616143,
    pid: 1,
    tid: '9c1c59df-84dd-43fb-ada4-650895040465',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Core::Value',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'B',
    ts: 9616342,
    pid: 1,
    tid: '9c1c59df-84dd-43fb-ada4-650895040465',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'B',
    ts: 9616942,
    pid: 1,
    tid: '9c1c59df-84dd-43fb-ada4-650895040465',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Persist::SessionStorage',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'B',
    ts: 9617441,
    pid: 1,
    tid: '9c1c59df-84dd-43fb-ada4-650895040465',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 9617820,
    pid: 1,
    tid: '9c1c59df-84dd-43fb-ada4-650895040465',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 9618020,
    pid: 1,
    tid: '9c1c59df-84dd-43fb-ada4-650895040465',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'B',
    ts: 10740739,
    pid: 1,
    tid: 'c060efe9-9e02-48a8-a8b2-5bf5fd8e1380',
    args: {
      cell: 'pipeline-builder',
      behavior: 'c060efe9-9e02-48a8-a8b2-5bf5fd8e1380',
      scheduler: 'delayed',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'B',
    ts: 10740939,
    pid: 1,
    tid: 'c060efe9-9e02-48a8-a8b2-5bf5fd8e1380',
    args: {
      cell: 'pipeline-builder',
      behavior: 'c060efe9-9e02-48a8-a8b2-5bf5fd8e1380',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'B',
    ts: 10741338,
    pid: 1,
    tid: 'c060efe9-9e02-48a8-a8b2-5bf5fd8e1380',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'B',
    ts: 10741438,
    pid: 1,
    tid: 'c060efe9-9e02-48a8-a8b2-5bf5fd8e1380',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Core::Value',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'B',
    ts: 10741438,
    pid: 1,
    tid: 'c060efe9-9e02-48a8-a8b2-5bf5fd8e1380',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'B',
    ts: 10741937,
    pid: 1,
    tid: 'c060efe9-9e02-48a8-a8b2-5bf5fd8e1380',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Persist::SessionStorage',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'B',
    ts: 10742236,
    pid: 1,
    tid: 'c060efe9-9e02-48a8-a8b2-5bf5fd8e1380',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 10742516,
    pid: 1,
    tid: 'c060efe9-9e02-48a8-a8b2-5bf5fd8e1380',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 10742715,
    pid: 1,
    tid: 'c060efe9-9e02-48a8-a8b2-5bf5fd8e1380',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'B',
    ts: 12053935,
    pid: 1,
    tid: '611d04a0-6f1e-41fb-8d40-e8c2d8d27242',
    args: {
      cell: 'pipeline-builder',
      behavior: '611d04a0-6f1e-41fb-8d40-e8c2d8d27242',
      scheduler: 'delayed',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'B',
    ts: 12054334,
    pid: 1,
    tid: '611d04a0-6f1e-41fb-8d40-e8c2d8d27242',
    args: {
      cell: 'pipeline-builder',
      behavior: '611d04a0-6f1e-41fb-8d40-e8c2d8d27242',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'B',
    ts: 12054833,
    pid: 1,
    tid: '611d04a0-6f1e-41fb-8d40-e8c2d8d27242',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'B',
    ts: 12055033,
    pid: 1,
    tid: '611d04a0-6f1e-41fb-8d40-e8c2d8d27242',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Core::Value',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'B',
    ts: 12055232,
    pid: 1,
    tid: '611d04a0-6f1e-41fb-8d40-e8c2d8d27242',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'B',
    ts: 12056032,
    pid: 1,
    tid: '611d04a0-6f1e-41fb-8d40-e8c2d8d27242',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Persist::SessionStorage',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'B',
    ts: 12056631,
    pid: 1,
    tid: '611d04a0-6f1e-41fb-8d40-e8c2d8d27242',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 12057110,
    pid: 1,
    tid: '611d04a0-6f1e-41fb-8d40-e8c2d8d27242',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 12057309,
    pid: 1,
    tid: '611d04a0-6f1e-41fb-8d40-e8c2d8d27242',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'B',
    ts: 13904029,
    pid: 1,
    tid: '066886db-4022-44bb-9ae0-5f3e25243334',
    args: {
      cell: 'pipeline-builder',
      behavior: '066886db-4022-44bb-9ae0-5f3e25243334',
      scheduler: 'delayed',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'B',
    ts: 13904428,
    pid: 1,
    tid: '066886db-4022-44bb-9ae0-5f3e25243334',
    args: {
      cell: 'pipeline-builder',
      behavior: '066886db-4022-44bb-9ae0-5f3e25243334',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'B',
    ts: 13905028,
    pid: 1,
    tid: '2c4a0ad0-e4da-4dc7-bed8-88989d8ee659',
    args: {
      cell: 'pipeline-builder',
      behavior: '2c4a0ad0-e4da-4dc7-bed8-88989d8ee659',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'B',
    ts: 13905128,
    pid: 1,
    tid: '22f1190b-83c8-43f5-957e-3aee0f18cec7',
    args: {
      cell: 'pipeline-builder',
      behavior: '22f1190b-83c8-43f5-957e-3aee0f18cec7',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'B',
    ts: 13905327,
    pid: 1,
    tid: '066886db-4022-44bb-9ae0-5f3e25243334',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'B',
    ts: 13905527,
    pid: 1,
    tid: '066886db-4022-44bb-9ae0-5f3e25243334',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Core::Value',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'B',
    ts: 13905726,
    pid: 1,
    tid: '066886db-4022-44bb-9ae0-5f3e25243334',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'B',
    ts: 13906426,
    pid: 1,
    tid: '066886db-4022-44bb-9ae0-5f3e25243334',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Persist::SessionStorage',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'B',
    ts: 13906925,
    pid: 1,
    tid: '066886db-4022-44bb-9ae0-5f3e25243334',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 13907404,
    pid: 1,
    tid: '066886db-4022-44bb-9ae0-5f3e25243334',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 13907604,
    pid: 1,
    tid: '066886db-4022-44bb-9ae0-5f3e25243334',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'B',
    ts: 13907723,
    pid: 1,
    tid: '2c4a0ad0-e4da-4dc7-bed8-88989d8ee659',
    args: {
      cell: 'pipeline-builder',
      behavior: '2c4a0ad0-e4da-4dc7-bed8-88989d8ee659',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'B',
    ts: 13908023,
    pid: 1,
    tid: '2c4a0ad0-e4da-4dc7-bed8-88989d8ee659',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'B',
    ts: 13908123,
    pid: 1,
    tid: '2c4a0ad0-e4da-4dc7-bed8-88989d8ee659',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Core::Value',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'B',
    ts: 13908822,
    pid: 1,
    tid: '2c4a0ad0-e4da-4dc7-bed8-88989d8ee659',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'B',
    ts: 13909422,
    pid: 1,
    tid: '2c4a0ad0-e4da-4dc7-bed8-88989d8ee659',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Persist::SessionStorage',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'B',
    ts: 13909821,
    pid: 1,
    tid: '2c4a0ad0-e4da-4dc7-bed8-88989d8ee659',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 13910200,
    pid: 1,
    tid: '2c4a0ad0-e4da-4dc7-bed8-88989d8ee659',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 13910400,
    pid: 1,
    tid: '2c4a0ad0-e4da-4dc7-bed8-88989d8ee659',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'B',
    ts: 13910420,
    pid: 1,
    tid: '22f1190b-83c8-43f5-957e-3aee0f18cec7',
    args: {
      cell: 'pipeline-builder',
      behavior: '22f1190b-83c8-43f5-957e-3aee0f18cec7',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'B',
    ts: 13910819,
    pid: 1,
    tid: '22f1190b-83c8-43f5-957e-3aee0f18cec7',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'B',
    ts: 13910919,
    pid: 1,
    tid: '22f1190b-83c8-43f5-957e-3aee0f18cec7',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Core::Value',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'B',
    ts: 13911119,
    pid: 1,
    tid: '22f1190b-83c8-43f5-957e-3aee0f18cec7',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'B',
    ts: 13911618,
    pid: 1,
    tid: '22f1190b-83c8-43f5-957e-3aee0f18cec7',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Persist::SessionStorage',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'B',
    ts: 13912017,
    pid: 1,
    tid: '22f1190b-83c8-43f5-957e-3aee0f18cec7',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 13912596,
    pid: 1,
    tid: '22f1190b-83c8-43f5-957e-3aee0f18cec7',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 13912995,
    pid: 1,
    tid: '22f1190b-83c8-43f5-957e-3aee0f18cec7',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'B',
    ts: 15289714,
    pid: 1,
    tid: '84e44fe8-075f-4449-9f06-2c760c07065d',
    args: {
      cell: 'pipeline-builder',
      behavior: '84e44fe8-075f-4449-9f06-2c760c07065d',
      scheduler: 'delayed',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'B',
    ts: 15290014,
    pid: 1,
    tid: '84e44fe8-075f-4449-9f06-2c760c07065d',
    args: {
      cell: 'pipeline-builder',
      behavior: '84e44fe8-075f-4449-9f06-2c760c07065d',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'B',
    ts: 15290513,
    pid: 1,
    tid: '5402980a-a649-41e2-92da-c73354f1956e',
    args: {
      cell: 'pipeline-builder',
      behavior: '5402980a-a649-41e2-92da-c73354f1956e',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'B',
    ts: 15290613,
    pid: 1,
    tid: '84e44fe8-075f-4449-9f06-2c760c07065d',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'B',
    ts: 15290812,
    pid: 1,
    tid: '84e44fe8-075f-4449-9f06-2c760c07065d',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Core::Value',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'B',
    ts: 15291112,
    pid: 1,
    tid: '84e44fe8-075f-4449-9f06-2c760c07065d',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'B',
    ts: 15291611,
    pid: 1,
    tid: '84e44fe8-075f-4449-9f06-2c760c07065d',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Persist::SessionStorage',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'B',
    ts: 15292709,
    pid: 1,
    tid: '84e44fe8-075f-4449-9f06-2c760c07065d',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 15293089,
    pid: 1,
    tid: '84e44fe8-075f-4449-9f06-2c760c07065d',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 15293388,
    pid: 1,
    tid: '84e44fe8-075f-4449-9f06-2c760c07065d',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'B',
    ts: 15293408,
    pid: 1,
    tid: '5402980a-a649-41e2-92da-c73354f1956e',
    args: {
      cell: 'pipeline-builder',
      behavior: '5402980a-a649-41e2-92da-c73354f1956e',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'B',
    ts: 15293807,
    pid: 1,
    tid: '5402980a-a649-41e2-92da-c73354f1956e',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'B',
    ts: 15293907,
    pid: 1,
    tid: '5402980a-a649-41e2-92da-c73354f1956e',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Core::Value',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'B',
    ts: 15294007,
    pid: 1,
    tid: '5402980a-a649-41e2-92da-c73354f1956e',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'B',
    ts: 15294607,
    pid: 1,
    tid: '5402980a-a649-41e2-92da-c73354f1956e',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Persist::SessionStorage',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'B',
    ts: 15295106,
    pid: 1,
    tid: '5402980a-a649-41e2-92da-c73354f1956e',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 15295285,
    pid: 1,
    tid: '5402980a-a649-41e2-92da-c73354f1956e',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 15295585,
    pid: 1,
    tid: '5402980a-a649-41e2-92da-c73354f1956e',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'B',
    ts: 16507504,
    pid: 1,
    tid: 'f788df6a-64f9-490f-b4cd-60fc1f187a92',
    args: {
      cell: 'pipeline-builder',
      behavior: 'f788df6a-64f9-490f-b4cd-60fc1f187a92',
      scheduler: 'delayed',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'B',
    ts: 16507803,
    pid: 1,
    tid: 'f788df6a-64f9-490f-b4cd-60fc1f187a92',
    args: {
      cell: 'pipeline-builder',
      behavior: 'f788df6a-64f9-490f-b4cd-60fc1f187a92',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'B',
    ts: 16508302,
    pid: 1,
    tid: '93077326-676f-451e-b7ae-c4750b6efc37',
    args: {
      cell: 'pipeline-builder',
      behavior: '93077326-676f-451e-b7ae-c4750b6efc37',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'B',
    ts: 16508602,
    pid: 1,
    tid: 'f788df6a-64f9-490f-b4cd-60fc1f187a92',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'B',
    ts: 16508701,
    pid: 1,
    tid: 'f788df6a-64f9-490f-b4cd-60fc1f187a92',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Core::Value',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'B',
    ts: 16509001,
    pid: 1,
    tid: 'f788df6a-64f9-490f-b4cd-60fc1f187a92',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'B',
    ts: 16509600,
    pid: 1,
    tid: 'f788df6a-64f9-490f-b4cd-60fc1f187a92',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Persist::SessionStorage',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'B',
    ts: 16510198,
    pid: 1,
    tid: 'f788df6a-64f9-490f-b4cd-60fc1f187a92',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 16510877,
    pid: 1,
    tid: 'f788df6a-64f9-490f-b4cd-60fc1f187a92',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 16511276,
    pid: 1,
    tid: 'f788df6a-64f9-490f-b4cd-60fc1f187a92',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'B',
    ts: 16511396,
    pid: 1,
    tid: '93077326-676f-451e-b7ae-c4750b6efc37',
    args: {
      cell: 'pipeline-builder',
      behavior: '93077326-676f-451e-b7ae-c4750b6efc37',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'B',
    ts: 16511695,
    pid: 1,
    tid: '93077326-676f-451e-b7ae-c4750b6efc37',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'B',
    ts: 16511795,
    pid: 1,
    tid: '93077326-676f-451e-b7ae-c4750b6efc37',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Core::Value',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'B',
    ts: 16511995,
    pid: 1,
    tid: '93077326-676f-451e-b7ae-c4750b6efc37',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'B',
    ts: 16512494,
    pid: 1,
    tid: '93077326-676f-451e-b7ae-c4750b6efc37',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Persist::SessionStorage',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'B',
    ts: 16512893,
    pid: 1,
    tid: '93077326-676f-451e-b7ae-c4750b6efc37',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 16513272,
    pid: 1,
    tid: '93077326-676f-451e-b7ae-c4750b6efc37',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 16513372,
    pid: 1,
    tid: '93077326-676f-451e-b7ae-c4750b6efc37',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'B',
    ts: 17796392,
    pid: 1,
    tid: '6e42dd6e-5e52-4027-9b55-70aaa90f9083',
    args: {
      cell: 'pipeline-builder',
      behavior: '6e42dd6e-5e52-4027-9b55-70aaa90f9083',
      scheduler: 'delayed',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'B',
    ts: 17796791,
    pid: 1,
    tid: '6e42dd6e-5e52-4027-9b55-70aaa90f9083',
    args: {
      cell: 'pipeline-builder',
      behavior: '6e42dd6e-5e52-4027-9b55-70aaa90f9083',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'B',
    ts: 17797491,
    pid: 1,
    tid: 'e81746cd-7525-4bcd-9ef2-db931314a3a5',
    args: {
      cell: 'pipeline-builder',
      behavior: 'e81746cd-7525-4bcd-9ef2-db931314a3a5',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'B',
    ts: 17797491,
    pid: 1,
    tid: 'b14253ec-739f-47e5-b6a9-8dec26932779',
    args: {
      cell: 'pipeline-builder',
      behavior: 'b14253ec-739f-47e5-b6a9-8dec26932779',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'B',
    ts: 17797790,
    pid: 1,
    tid: '6e42dd6e-5e52-4027-9b55-70aaa90f9083',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'B',
    ts: 17797990,
    pid: 1,
    tid: '6e42dd6e-5e52-4027-9b55-70aaa90f9083',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Core::Value',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'B',
    ts: 17798189,
    pid: 1,
    tid: '6e42dd6e-5e52-4027-9b55-70aaa90f9083',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'B',
    ts: 17798888,
    pid: 1,
    tid: '6e42dd6e-5e52-4027-9b55-70aaa90f9083',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Persist::SessionStorage',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'B',
    ts: 17799487,
    pid: 1,
    tid: '6e42dd6e-5e52-4027-9b55-70aaa90f9083',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 17799866,
    pid: 1,
    tid: '6e42dd6e-5e52-4027-9b55-70aaa90f9083',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 17800165,
    pid: 1,
    tid: '6e42dd6e-5e52-4027-9b55-70aaa90f9083',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'B',
    ts: 17800885,
    pid: 1,
    tid: 'e81746cd-7525-4bcd-9ef2-db931314a3a5',
    args: {
      cell: 'pipeline-builder',
      behavior: 'e81746cd-7525-4bcd-9ef2-db931314a3a5',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'B',
    ts: 17801184,
    pid: 1,
    tid: 'e81746cd-7525-4bcd-9ef2-db931314a3a5',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'B',
    ts: 17801284,
    pid: 1,
    tid: 'e81746cd-7525-4bcd-9ef2-db931314a3a5',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Core::Value',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'B',
    ts: 17801484,
    pid: 1,
    tid: 'e81746cd-7525-4bcd-9ef2-db931314a3a5',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'B',
    ts: 17801983,
    pid: 1,
    tid: 'e81746cd-7525-4bcd-9ef2-db931314a3a5',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Persist::SessionStorage',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'B',
    ts: 17802482,
    pid: 1,
    tid: 'e81746cd-7525-4bcd-9ef2-db931314a3a5',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 17802761,
    pid: 1,
    tid: 'e81746cd-7525-4bcd-9ef2-db931314a3a5',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 17803061,
    pid: 1,
    tid: 'e81746cd-7525-4bcd-9ef2-db931314a3a5',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'B',
    ts: 17803081,
    pid: 1,
    tid: 'b14253ec-739f-47e5-b6a9-8dec26932779',
    args: {
      cell: 'pipeline-builder',
      behavior: 'b14253ec-739f-47e5-b6a9-8dec26932779',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'B',
    ts: 17803480,
    pid: 1,
    tid: 'b14253ec-739f-47e5-b6a9-8dec26932779',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'B',
    ts: 17803580,
    pid: 1,
    tid: 'b14253ec-739f-47e5-b6a9-8dec26932779',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Core::Value',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'B',
    ts: 17804079,
    pid: 1,
    tid: 'b14253ec-739f-47e5-b6a9-8dec26932779',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'B',
    ts: 17804677,
    pid: 1,
    tid: 'b14253ec-739f-47e5-b6a9-8dec26932779',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Persist::SessionStorage',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'B',
    ts: 17805276,
    pid: 1,
    tid: 'b14253ec-739f-47e5-b6a9-8dec26932779',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 17805556,
    pid: 1,
    tid: 'b14253ec-739f-47e5-b6a9-8dec26932779',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 17805855,
    pid: 1,
    tid: 'b14253ec-739f-47e5-b6a9-8dec26932779',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'B',
    ts: 19237174,
    pid: 1,
    tid: '2708bcec-7f5b-442b-8ff1-025e70a0b9d4',
    args: {
      cell: 'pipeline-builder',
      behavior: '2708bcec-7f5b-442b-8ff1-025e70a0b9d4',
      scheduler: 'delayed',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'B',
    ts: 19237474,
    pid: 1,
    tid: '2708bcec-7f5b-442b-8ff1-025e70a0b9d4',
    args: {
      cell: 'pipeline-builder',
      behavior: '2708bcec-7f5b-442b-8ff1-025e70a0b9d4',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'B',
    ts: 19238172,
    pid: 1,
    tid: '7d2e8190-3524-4709-9dd7-4618af3895a0',
    args: {
      cell: 'pipeline-builder',
      behavior: '7d2e8190-3524-4709-9dd7-4618af3895a0',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'B',
    ts: 19238472,
    pid: 1,
    tid: '2708bcec-7f5b-442b-8ff1-025e70a0b9d4',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'B',
    ts: 19238572,
    pid: 1,
    tid: '2708bcec-7f5b-442b-8ff1-025e70a0b9d4',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Core::Value',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'B',
    ts: 19238971,
    pid: 1,
    tid: '2708bcec-7f5b-442b-8ff1-025e70a0b9d4',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'B',
    ts: 19239670,
    pid: 1,
    tid: '2708bcec-7f5b-442b-8ff1-025e70a0b9d4',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Persist::SessionStorage',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'B',
    ts: 19240269,
    pid: 1,
    tid: '2708bcec-7f5b-442b-8ff1-025e70a0b9d4',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 19240648,
    pid: 1,
    tid: '2708bcec-7f5b-442b-8ff1-025e70a0b9d4',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 19241448,
    pid: 1,
    tid: '2708bcec-7f5b-442b-8ff1-025e70a0b9d4',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'B',
    ts: 19241667,
    pid: 1,
    tid: '7d2e8190-3524-4709-9dd7-4618af3895a0',
    args: {
      cell: 'pipeline-builder',
      behavior: '7d2e8190-3524-4709-9dd7-4618af3895a0',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'B',
    ts: 19242067,
    pid: 1,
    tid: '7d2e8190-3524-4709-9dd7-4618af3895a0',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'B',
    ts: 19242166,
    pid: 1,
    tid: '7d2e8190-3524-4709-9dd7-4618af3895a0',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Core::Value',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'B',
    ts: 19242366,
    pid: 1,
    tid: '7d2e8190-3524-4709-9dd7-4618af3895a0',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'B',
    ts: 19243066,
    pid: 1,
    tid: '7d2e8190-3524-4709-9dd7-4618af3895a0',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Persist::SessionStorage',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'B',
    ts: 19243565,
    pid: 1,
    tid: '7d2e8190-3524-4709-9dd7-4618af3895a0',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 19243844,
    pid: 1,
    tid: '7d2e8190-3524-4709-9dd7-4618af3895a0',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 19244044,
    pid: 1,
    tid: '7d2e8190-3524-4709-9dd7-4618af3895a0',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'B',
    ts: 20687064,
    pid: 1,
    tid: '8c276680-0931-40d4-8d74-da70881f4f38',
    args: {
      cell: 'pipeline-builder',
      behavior: '8c276680-0931-40d4-8d74-da70881f4f38',
      scheduler: 'delayed',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'B',
    ts: 20687463,
    pid: 1,
    tid: '8c276680-0931-40d4-8d74-da70881f4f38',
    args: {
      cell: 'pipeline-builder',
      behavior: '8c276680-0931-40d4-8d74-da70881f4f38',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'B',
    ts: 20687962,
    pid: 1,
    tid: 'f1ed0ba7-af11-42e5-9175-53a4fcdc5f64',
    args: {
      cell: 'pipeline-builder',
      behavior: 'f1ed0ba7-af11-42e5-9175-53a4fcdc5f64',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'B',
    ts: 20688261,
    pid: 1,
    tid: '8c276680-0931-40d4-8d74-da70881f4f38',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'B',
    ts: 20688361,
    pid: 1,
    tid: '8c276680-0931-40d4-8d74-da70881f4f38',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Core::Value',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'B',
    ts: 20688561,
    pid: 1,
    tid: '8c276680-0931-40d4-8d74-da70881f4f38',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'B',
    ts: 20689360,
    pid: 1,
    tid: '8c276680-0931-40d4-8d74-da70881f4f38',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Persist::SessionStorage',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'B',
    ts: 20689859,
    pid: 1,
    tid: '8c276680-0931-40d4-8d74-da70881f4f38',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 20690338,
    pid: 1,
    tid: '8c276680-0931-40d4-8d74-da70881f4f38',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 20691038,
    pid: 1,
    tid: '8c276680-0931-40d4-8d74-da70881f4f38',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'B',
    ts: 20691257,
    pid: 1,
    tid: 'f1ed0ba7-af11-42e5-9175-53a4fcdc5f64',
    args: {
      cell: 'pipeline-builder',
      behavior: 'f1ed0ba7-af11-42e5-9175-53a4fcdc5f64',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'B',
    ts: 20691656,
    pid: 1,
    tid: 'f1ed0ba7-af11-42e5-9175-53a4fcdc5f64',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'B',
    ts: 20691756,
    pid: 1,
    tid: 'f1ed0ba7-af11-42e5-9175-53a4fcdc5f64',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Core::Value',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'B',
    ts: 20691956,
    pid: 1,
    tid: 'f1ed0ba7-af11-42e5-9175-53a4fcdc5f64',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'B',
    ts: 20692555,
    pid: 1,
    tid: 'f1ed0ba7-af11-42e5-9175-53a4fcdc5f64',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Persist::SessionStorage',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'B',
    ts: 20693153,
    pid: 1,
    tid: 'f1ed0ba7-af11-42e5-9175-53a4fcdc5f64',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 20693533,
    pid: 1,
    tid: 'f1ed0ba7-af11-42e5-9175-53a4fcdc5f64',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 20693732,
    pid: 1,
    tid: 'f1ed0ba7-af11-42e5-9175-53a4fcdc5f64',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'B',
    ts: 22279651,
    pid: 1,
    tid: 'f64f32b8-01d1-4473-ba13-cb8cb9424963',
    args: {
      cell: 'pipeline-builder',
      behavior: 'f64f32b8-01d1-4473-ba13-cb8cb9424963',
      scheduler: 'delayed',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'B',
    ts: 22280051,
    pid: 1,
    tid: 'f64f32b8-01d1-4473-ba13-cb8cb9424963',
    args: {
      cell: 'pipeline-builder',
      behavior: 'f64f32b8-01d1-4473-ba13-cb8cb9424963',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'B',
    ts: 22280550,
    pid: 1,
    tid: '7518d1ae-e5ac-4a42-8a5e-8ba08632db82',
    args: {
      cell: 'pipeline-builder',
      behavior: '7518d1ae-e5ac-4a42-8a5e-8ba08632db82',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'B',
    ts: 22280649,
    pid: 1,
    tid: '7bc6222a-e631-40c1-83d9-df29cb1db7f1',
    args: {
      cell: 'pipeline-builder',
      behavior: '7bc6222a-e631-40c1-83d9-df29cb1db7f1',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'B',
    ts: 22280849,
    pid: 1,
    tid: 'f64f32b8-01d1-4473-ba13-cb8cb9424963',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'B',
    ts: 22281049,
    pid: 1,
    tid: 'f64f32b8-01d1-4473-ba13-cb8cb9424963',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Core::Value',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'B',
    ts: 22281248,
    pid: 1,
    tid: 'f64f32b8-01d1-4473-ba13-cb8cb9424963',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'B',
    ts: 22282048,
    pid: 1,
    tid: 'f64f32b8-01d1-4473-ba13-cb8cb9424963',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Persist::SessionStorage',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'B',
    ts: 22282646,
    pid: 1,
    tid: 'f64f32b8-01d1-4473-ba13-cb8cb9424963',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 22283526,
    pid: 1,
    tid: 'f64f32b8-01d1-4473-ba13-cb8cb9424963',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 22283925,
    pid: 1,
    tid: 'f64f32b8-01d1-4473-ba13-cb8cb9424963',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'B',
    ts: 22284045,
    pid: 1,
    tid: '7518d1ae-e5ac-4a42-8a5e-8ba08632db82',
    args: {
      cell: 'pipeline-builder',
      behavior: '7518d1ae-e5ac-4a42-8a5e-8ba08632db82',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'B',
    ts: 22284444,
    pid: 1,
    tid: '7518d1ae-e5ac-4a42-8a5e-8ba08632db82',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'B',
    ts: 22284544,
    pid: 1,
    tid: '7518d1ae-e5ac-4a42-8a5e-8ba08632db82',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Core::Value',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'B',
    ts: 22284843,
    pid: 1,
    tid: '7518d1ae-e5ac-4a42-8a5e-8ba08632db82',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'B',
    ts: 22285442,
    pid: 1,
    tid: '7518d1ae-e5ac-4a42-8a5e-8ba08632db82',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Persist::SessionStorage',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'B',
    ts: 22285941,
    pid: 1,
    tid: '7518d1ae-e5ac-4a42-8a5e-8ba08632db82',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 22286220,
    pid: 1,
    tid: '7518d1ae-e5ac-4a42-8a5e-8ba08632db82',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 22286920,
    pid: 1,
    tid: '7518d1ae-e5ac-4a42-8a5e-8ba08632db82',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'B',
    ts: 22287040,
    pid: 1,
    tid: '7bc6222a-e631-40c1-83d9-df29cb1db7f1',
    args: {
      cell: 'pipeline-builder',
      behavior: '7bc6222a-e631-40c1-83d9-df29cb1db7f1',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'B',
    ts: 22287339,
    pid: 1,
    tid: '7bc6222a-e631-40c1-83d9-df29cb1db7f1',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'B',
    ts: 22287539,
    pid: 1,
    tid: '7bc6222a-e631-40c1-83d9-df29cb1db7f1',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Core::Value',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'B',
    ts: 22287738,
    pid: 1,
    tid: '7bc6222a-e631-40c1-83d9-df29cb1db7f1',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'B',
    ts: 22288538,
    pid: 1,
    tid: '7bc6222a-e631-40c1-83d9-df29cb1db7f1',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Persist::SessionStorage',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'B',
    ts: 22289136,
    pid: 1,
    tid: '7bc6222a-e631-40c1-83d9-df29cb1db7f1',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 22289416,
    pid: 1,
    tid: '7bc6222a-e631-40c1-83d9-df29cb1db7f1',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 22289815,
    pid: 1,
    tid: '7bc6222a-e631-40c1-83d9-df29cb1db7f1',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'B',
    ts: 23703535,
    pid: 1,
    tid: 'd9395484-b9cb-49ca-8249-38171f2a78c1',
    args: {
      cell: 'pipeline-builder',
      behavior: 'd9395484-b9cb-49ca-8249-38171f2a78c1',
      scheduler: 'delayed',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'B',
    ts: 23703834,
    pid: 1,
    tid: 'd9395484-b9cb-49ca-8249-38171f2a78c1',
    args: {
      cell: 'pipeline-builder',
      behavior: 'd9395484-b9cb-49ca-8249-38171f2a78c1',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'B',
    ts: 23704433,
    pid: 1,
    tid: '173cf74a-492c-448d-b863-3c031a239e0b',
    args: {
      cell: 'pipeline-builder',
      behavior: '173cf74a-492c-448d-b863-3c031a239e0b',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'B',
    ts: 23704832,
    pid: 1,
    tid: '822299ae-933d-4275-90c1-2e6a0658173f',
    args: {
      cell: 'pipeline-builder',
      behavior: '822299ae-933d-4275-90c1-2e6a0658173f',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'B',
    ts: 23704932,
    pid: 1,
    tid: 'fb14b8d4-44f4-4fbf-84eb-0c56a21c14ad',
    args: {
      cell: 'pipeline-builder',
      behavior: 'fb14b8d4-44f4-4fbf-84eb-0c56a21c14ad',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'B',
    ts: 23705131,
    pid: 1,
    tid: 'd9395484-b9cb-49ca-8249-38171f2a78c1',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'B',
    ts: 23705331,
    pid: 1,
    tid: 'd9395484-b9cb-49ca-8249-38171f2a78c1',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Core::Value',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'B',
    ts: 23705730,
    pid: 1,
    tid: 'd9395484-b9cb-49ca-8249-38171f2a78c1',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'B',
    ts: 23706829,
    pid: 1,
    tid: 'd9395484-b9cb-49ca-8249-38171f2a78c1',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Persist::SessionStorage',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'B',
    ts: 23707428,
    pid: 1,
    tid: 'd9395484-b9cb-49ca-8249-38171f2a78c1',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 23707807,
    pid: 1,
    tid: 'd9395484-b9cb-49ca-8249-38171f2a78c1',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 23708007,
    pid: 1,
    tid: 'd9395484-b9cb-49ca-8249-38171f2a78c1',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'B',
    ts: 23708126,
    pid: 1,
    tid: '173cf74a-492c-448d-b863-3c031a239e0b',
    args: {
      cell: 'pipeline-builder',
      behavior: '173cf74a-492c-448d-b863-3c031a239e0b',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'B',
    ts: 23708426,
    pid: 1,
    tid: '173cf74a-492c-448d-b863-3c031a239e0b',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'B',
    ts: 23708625,
    pid: 1,
    tid: '173cf74a-492c-448d-b863-3c031a239e0b',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Core::Value',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'B',
    ts: 23708825,
    pid: 1,
    tid: '173cf74a-492c-448d-b863-3c031a239e0b',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'B',
    ts: 23709724,
    pid: 1,
    tid: '173cf74a-492c-448d-b863-3c031a239e0b',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Persist::SessionStorage',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'B',
    ts: 23710223,
    pid: 1,
    tid: '173cf74a-492c-448d-b863-3c031a239e0b',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 23710403,
    pid: 1,
    tid: '173cf74a-492c-448d-b863-3c031a239e0b',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 23710602,
    pid: 1,
    tid: '173cf74a-492c-448d-b863-3c031a239e0b',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'B',
    ts: 23710722,
    pid: 1,
    tid: '822299ae-933d-4275-90c1-2e6a0658173f',
    args: {
      cell: 'pipeline-builder',
      behavior: '822299ae-933d-4275-90c1-2e6a0658173f',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'B',
    ts: 23711022,
    pid: 1,
    tid: '822299ae-933d-4275-90c1-2e6a0658173f',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'B',
    ts: 23711221,
    pid: 1,
    tid: '822299ae-933d-4275-90c1-2e6a0658173f',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Core::Value',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'B',
    ts: 23711421,
    pid: 1,
    tid: '822299ae-933d-4275-90c1-2e6a0658173f',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'B',
    ts: 23712119,
    pid: 1,
    tid: '822299ae-933d-4275-90c1-2e6a0658173f',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Persist::SessionStorage',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'B',
    ts: 23712618,
    pid: 1,
    tid: '822299ae-933d-4275-90c1-2e6a0658173f',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 23712898,
    pid: 1,
    tid: '822299ae-933d-4275-90c1-2e6a0658173f',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 23713197,
    pid: 1,
    tid: '822299ae-933d-4275-90c1-2e6a0658173f',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'B',
    ts: 23713317,
    pid: 1,
    tid: 'fb14b8d4-44f4-4fbf-84eb-0c56a21c14ad',
    args: {
      cell: 'pipeline-builder',
      behavior: 'fb14b8d4-44f4-4fbf-84eb-0c56a21c14ad',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'B',
    ts: 23713616,
    pid: 1,
    tid: 'fb14b8d4-44f4-4fbf-84eb-0c56a21c14ad',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'B',
    ts: 23713816,
    pid: 1,
    tid: 'fb14b8d4-44f4-4fbf-84eb-0c56a21c14ad',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Core::Value',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'B',
    ts: 23714215,
    pid: 1,
    tid: 'fb14b8d4-44f4-4fbf-84eb-0c56a21c14ad',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'B',
    ts: 23715214,
    pid: 1,
    tid: 'fb14b8d4-44f4-4fbf-84eb-0c56a21c14ad',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Persist::SessionStorage',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'B',
    ts: 23715713,
    pid: 1,
    tid: 'fb14b8d4-44f4-4fbf-84eb-0c56a21c14ad',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 23715993,
    pid: 1,
    tid: 'fb14b8d4-44f4-4fbf-84eb-0c56a21c14ad',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 23716392,
    pid: 1,
    tid: 'fb14b8d4-44f4-4fbf-84eb-0c56a21c14ad',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'B',
    ts: 24737111,
    pid: 1,
    tid: 'd17eeacc-0d29-4c39-80c1-9f7e1ae111e5',
    args: {
      cell: 'pipeline-builder',
      behavior: 'd17eeacc-0d29-4c39-80c1-9f7e1ae111e5',
      scheduler: 'delayed',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'B',
    ts: 24737411,
    pid: 1,
    tid: 'd17eeacc-0d29-4c39-80c1-9f7e1ae111e5',
    args: {
      cell: 'pipeline-builder',
      behavior: 'd17eeacc-0d29-4c39-80c1-9f7e1ae111e5',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'B',
    ts: 24738109,
    pid: 1,
    tid: '4e49b3cb-aa28-4f7e-ae2d-9668c5a4dc6a',
    args: {
      cell: 'pipeline-builder',
      behavior: '4e49b3cb-aa28-4f7e-ae2d-9668c5a4dc6a',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'B',
    ts: 24738409,
    pid: 1,
    tid: 'd17eeacc-0d29-4c39-80c1-9f7e1ae111e5',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'B',
    ts: 24738608,
    pid: 1,
    tid: 'd17eeacc-0d29-4c39-80c1-9f7e1ae111e5',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Core::Value',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'B',
    ts: 24739008,
    pid: 1,
    tid: 'd17eeacc-0d29-4c39-80c1-9f7e1ae111e5',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'B',
    ts: 24739706,
    pid: 1,
    tid: 'd17eeacc-0d29-4c39-80c1-9f7e1ae111e5',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Persist::SessionStorage',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'B',
    ts: 24740406,
    pid: 1,
    tid: 'd17eeacc-0d29-4c39-80c1-9f7e1ae111e5',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 24740785,
    pid: 1,
    tid: 'd17eeacc-0d29-4c39-80c1-9f7e1ae111e5',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 24741184,
    pid: 1,
    tid: 'd17eeacc-0d29-4c39-80c1-9f7e1ae111e5',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'B',
    ts: 24741304,
    pid: 1,
    tid: '4e49b3cb-aa28-4f7e-ae2d-9668c5a4dc6a',
    args: {
      cell: 'pipeline-builder',
      behavior: '4e49b3cb-aa28-4f7e-ae2d-9668c5a4dc6a',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'B',
    ts: 24741803,
    pid: 1,
    tid: '4e49b3cb-aa28-4f7e-ae2d-9668c5a4dc6a',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'B',
    ts: 24741903,
    pid: 1,
    tid: '4e49b3cb-aa28-4f7e-ae2d-9668c5a4dc6a',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Core::Value',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'B',
    ts: 24742202,
    pid: 1,
    tid: '4e49b3cb-aa28-4f7e-ae2d-9668c5a4dc6a',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'B',
    ts: 24742801,
    pid: 1,
    tid: '4e49b3cb-aa28-4f7e-ae2d-9668c5a4dc6a',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Persist::SessionStorage',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'B',
    ts: 24744000,
    pid: 1,
    tid: '4e49b3cb-aa28-4f7e-ae2d-9668c5a4dc6a',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 24744379,
    pid: 1,
    tid: '4e49b3cb-aa28-4f7e-ae2d-9668c5a4dc6a',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 24744778,
    pid: 1,
    tid: '4e49b3cb-aa28-4f7e-ae2d-9668c5a4dc6a',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'B',
    ts: 25770597,
    pid: 1,
    tid: 'ac4ddc8a-daa0-447a-bf52-2288ffc6bfc5',
    args: {
      cell: 'pipeline-builder',
      behavior: 'ac4ddc8a-daa0-447a-bf52-2288ffc6bfc5',
      scheduler: 'delayed',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'B',
    ts: 25770897,
    pid: 1,
    tid: 'ac4ddc8a-daa0-447a-bf52-2288ffc6bfc5',
    args: {
      cell: 'pipeline-builder',
      behavior: 'ac4ddc8a-daa0-447a-bf52-2288ffc6bfc5',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'B',
    ts: 25771696,
    pid: 1,
    tid: '6e8876e7-1b85-4b4a-a748-28c4df1c903e',
    args: {
      cell: 'pipeline-builder',
      behavior: '6e8876e7-1b85-4b4a-a748-28c4df1c903e',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'B',
    ts: 25771796,
    pid: 1,
    tid: '948f31e6-87ed-480f-a368-eb542b70864c',
    args: {
      cell: 'pipeline-builder',
      behavior: '948f31e6-87ed-480f-a368-eb542b70864c',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'B',
    ts: 25772195,
    pid: 1,
    tid: 'ac4ddc8a-daa0-447a-bf52-2288ffc6bfc5',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'B',
    ts: 25772295,
    pid: 1,
    tid: 'ac4ddc8a-daa0-447a-bf52-2288ffc6bfc5',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Core::Value',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'B',
    ts: 25772694,
    pid: 1,
    tid: 'ac4ddc8a-daa0-447a-bf52-2288ffc6bfc5',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'B',
    ts: 25773494,
    pid: 1,
    tid: 'ac4ddc8a-daa0-447a-bf52-2288ffc6bfc5',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Persist::SessionStorage',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'B',
    ts: 25774293,
    pid: 1,
    tid: 'ac4ddc8a-daa0-447a-bf52-2288ffc6bfc5',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 25774672,
    pid: 1,
    tid: 'ac4ddc8a-daa0-447a-bf52-2288ffc6bfc5',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 25775071,
    pid: 1,
    tid: 'ac4ddc8a-daa0-447a-bf52-2288ffc6bfc5',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'B',
    ts: 25775191,
    pid: 1,
    tid: '6e8876e7-1b85-4b4a-a748-28c4df1c903e',
    args: {
      cell: 'pipeline-builder',
      behavior: '6e8876e7-1b85-4b4a-a748-28c4df1c903e',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'B',
    ts: 25776190,
    pid: 1,
    tid: '6e8876e7-1b85-4b4a-a748-28c4df1c903e',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'B',
    ts: 25776290,
    pid: 1,
    tid: '6e8876e7-1b85-4b4a-a748-28c4df1c903e',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Core::Value',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'B',
    ts: 25776589,
    pid: 1,
    tid: '6e8876e7-1b85-4b4a-a748-28c4df1c903e',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'B',
    ts: 25777088,
    pid: 1,
    tid: '6e8876e7-1b85-4b4a-a748-28c4df1c903e',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Persist::SessionStorage',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'B',
    ts: 25777587,
    pid: 1,
    tid: '6e8876e7-1b85-4b4a-a748-28c4df1c903e',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 25777867,
    pid: 1,
    tid: '6e8876e7-1b85-4b4a-a748-28c4df1c903e',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 25778166,
    pid: 1,
    tid: '6e8876e7-1b85-4b4a-a748-28c4df1c903e',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'B',
    ts: 25778486,
    pid: 1,
    tid: '948f31e6-87ed-480f-a368-eb542b70864c',
    args: {
      cell: 'pipeline-builder',
      behavior: '948f31e6-87ed-480f-a368-eb542b70864c',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'B',
    ts: 25778885,
    pid: 1,
    tid: '948f31e6-87ed-480f-a368-eb542b70864c',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'B',
    ts: 25779084,
    pid: 1,
    tid: '948f31e6-87ed-480f-a368-eb542b70864c',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Core::Value',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'B',
    ts: 25779284,
    pid: 1,
    tid: '948f31e6-87ed-480f-a368-eb542b70864c',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'B',
    ts: 25780384,
    pid: 1,
    tid: '948f31e6-87ed-480f-a368-eb542b70864c',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Persist::SessionStorage',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'B',
    ts: 25780883,
    pid: 1,
    tid: '948f31e6-87ed-480f-a368-eb542b70864c',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 25781262,
    pid: 1,
    tid: '948f31e6-87ed-480f-a368-eb542b70864c',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 25781761,
    pid: 1,
    tid: '948f31e6-87ed-480f-a368-eb542b70864c',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'B',
    ts: 27054381,
    pid: 1,
    tid: 'bfbc168a-c901-4f77-98b7-b79538441b2a',
    args: {
      cell: 'pipeline-builder',
      behavior: 'bfbc168a-c901-4f77-98b7-b79538441b2a',
      scheduler: 'delayed',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'B',
    ts: 27054580,
    pid: 1,
    tid: 'bfbc168a-c901-4f77-98b7-b79538441b2a',
    args: {
      cell: 'pipeline-builder',
      behavior: 'bfbc168a-c901-4f77-98b7-b79538441b2a',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'B',
    ts: 27055079,
    pid: 1,
    tid: '43698352-168b-4c02-9310-af259b5d2d3e',
    args: {
      cell: 'pipeline-builder',
      behavior: '43698352-168b-4c02-9310-af259b5d2d3e',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'B',
    ts: 27055379,
    pid: 1,
    tid: '88a931f7-5322-4c65-b4a2-516f614ef6e1',
    args: {
      cell: 'pipeline-builder',
      behavior: '88a931f7-5322-4c65-b4a2-516f614ef6e1',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'B',
    ts: 27055479,
    pid: 1,
    tid: '2ea01f86-938c-4566-af8c-b55f67bb04a3',
    args: {
      cell: 'pipeline-builder',
      behavior: '2ea01f86-938c-4566-af8c-b55f67bb04a3',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'B',
    ts: 27055678,
    pid: 1,
    tid: 'bfbc168a-c901-4f77-98b7-b79538441b2a',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'B',
    ts: 27055878,
    pid: 1,
    tid: 'bfbc168a-c901-4f77-98b7-b79538441b2a',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Core::Value',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'B',
    ts: 27056277,
    pid: 1,
    tid: 'bfbc168a-c901-4f77-98b7-b79538441b2a',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'B',
    ts: 27056977,
    pid: 1,
    tid: 'bfbc168a-c901-4f77-98b7-b79538441b2a',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Persist::SessionStorage',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'B',
    ts: 27057675,
    pid: 1,
    tid: 'bfbc168a-c901-4f77-98b7-b79538441b2a',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 27058054,
    pid: 1,
    tid: 'bfbc168a-c901-4f77-98b7-b79538441b2a',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 27058454,
    pid: 1,
    tid: 'bfbc168a-c901-4f77-98b7-b79538441b2a',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'B',
    ts: 27058573,
    pid: 1,
    tid: '43698352-168b-4c02-9310-af259b5d2d3e',
    args: {
      cell: 'pipeline-builder',
      behavior: '43698352-168b-4c02-9310-af259b5d2d3e',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'B',
    ts: 27059572,
    pid: 1,
    tid: '43698352-168b-4c02-9310-af259b5d2d3e',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'B',
    ts: 27059772,
    pid: 1,
    tid: '43698352-168b-4c02-9310-af259b5d2d3e',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Core::Value',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'B',
    ts: 27060071,
    pid: 1,
    tid: '43698352-168b-4c02-9310-af259b5d2d3e',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'B',
    ts: 27060771,
    pid: 1,
    tid: '43698352-168b-4c02-9310-af259b5d2d3e',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Persist::SessionStorage',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'B',
    ts: 27061370,
    pid: 1,
    tid: '43698352-168b-4c02-9310-af259b5d2d3e',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 27061849,
    pid: 1,
    tid: '43698352-168b-4c02-9310-af259b5d2d3e',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 27062048,
    pid: 1,
    tid: '43698352-168b-4c02-9310-af259b5d2d3e',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'B',
    ts: 27062168,
    pid: 1,
    tid: '88a931f7-5322-4c65-b4a2-516f614ef6e1',
    args: {
      cell: 'pipeline-builder',
      behavior: '88a931f7-5322-4c65-b4a2-516f614ef6e1',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'B',
    ts: 27062567,
    pid: 1,
    tid: '88a931f7-5322-4c65-b4a2-516f614ef6e1',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'B',
    ts: 27062667,
    pid: 1,
    tid: '88a931f7-5322-4c65-b4a2-516f614ef6e1',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Core::Value',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'B',
    ts: 27063066,
    pid: 1,
    tid: '88a931f7-5322-4c65-b4a2-516f614ef6e1',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'B',
    ts: 27063565,
    pid: 1,
    tid: '88a931f7-5322-4c65-b4a2-516f614ef6e1',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Persist::SessionStorage',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'B',
    ts: 27064164,
    pid: 1,
    tid: '88a931f7-5322-4c65-b4a2-516f614ef6e1',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 27064944,
    pid: 1,
    tid: '88a931f7-5322-4c65-b4a2-516f614ef6e1',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 27065243,
    pid: 1,
    tid: '88a931f7-5322-4c65-b4a2-516f614ef6e1',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'B',
    ts: 27065363,
    pid: 1,
    tid: '2ea01f86-938c-4566-af8c-b55f67bb04a3',
    args: {
      cell: 'pipeline-builder',
      behavior: '2ea01f86-938c-4566-af8c-b55f67bb04a3',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'B',
    ts: 27065762,
    pid: 1,
    tid: '2ea01f86-938c-4566-af8c-b55f67bb04a3',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'B',
    ts: 27065862,
    pid: 1,
    tid: '2ea01f86-938c-4566-af8c-b55f67bb04a3',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Core::Value',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'B',
    ts: 27066061,
    pid: 1,
    tid: '2ea01f86-938c-4566-af8c-b55f67bb04a3',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'B',
    ts: 27066660,
    pid: 1,
    tid: '2ea01f86-938c-4566-af8c-b55f67bb04a3',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Persist::SessionStorage',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'B',
    ts: 27067059,
    pid: 1,
    tid: '2ea01f86-938c-4566-af8c-b55f67bb04a3',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 27067538,
    pid: 1,
    tid: '2ea01f86-938c-4566-af8c-b55f67bb04a3',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 27067838,
    pid: 1,
    tid: '2ea01f86-938c-4566-af8c-b55f67bb04a3',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'B',
    ts: 28270257,
    pid: 1,
    tid: '4b941271-093b-4ad0-ad23-254d3ab075f6',
    args: {
      cell: 'pipeline-builder',
      behavior: '4b941271-093b-4ad0-ad23-254d3ab075f6',
      scheduler: 'delayed',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'B',
    ts: 28270656,
    pid: 1,
    tid: '4b941271-093b-4ad0-ad23-254d3ab075f6',
    args: {
      cell: 'pipeline-builder',
      behavior: '4b941271-093b-4ad0-ad23-254d3ab075f6',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'B',
    ts: 28271355,
    pid: 1,
    tid: 'e7383d61-8617-4c3c-a535-46b4eff294d1',
    args: {
      cell: 'pipeline-builder',
      behavior: 'e7383d61-8617-4c3c-a535-46b4eff294d1',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'B',
    ts: 28271554,
    pid: 1,
    tid: '4b941271-093b-4ad0-ad23-254d3ab075f6',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'B',
    ts: 28271854,
    pid: 1,
    tid: '4b941271-093b-4ad0-ad23-254d3ab075f6',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Core::Value',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'B',
    ts: 28272253,
    pid: 1,
    tid: '4b941271-093b-4ad0-ad23-254d3ab075f6',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'B',
    ts: 28273052,
    pid: 1,
    tid: '4b941271-093b-4ad0-ad23-254d3ab075f6',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Persist::SessionStorage',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'B',
    ts: 28273551,
    pid: 1,
    tid: '4b941271-093b-4ad0-ad23-254d3ab075f6',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 28274031,
    pid: 1,
    tid: '4b941271-093b-4ad0-ad23-254d3ab075f6',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 28274431,
    pid: 1,
    tid: '4b941271-093b-4ad0-ad23-254d3ab075f6',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'B',
    ts: 28274451,
    pid: 1,
    tid: 'e7383d61-8617-4c3c-a535-46b4eff294d1',
    args: {
      cell: 'pipeline-builder',
      behavior: 'e7383d61-8617-4c3c-a535-46b4eff294d1',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'B',
    ts: 28274950,
    pid: 1,
    tid: 'e7383d61-8617-4c3c-a535-46b4eff294d1',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'B',
    ts: 28275049,
    pid: 1,
    tid: 'e7383d61-8617-4c3c-a535-46b4eff294d1',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Core::Value',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'B',
    ts: 28275249,
    pid: 1,
    tid: 'e7383d61-8617-4c3c-a535-46b4eff294d1',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'B',
    ts: 28276349,
    pid: 1,
    tid: 'e7383d61-8617-4c3c-a535-46b4eff294d1',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Persist::SessionStorage',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'B',
    ts: 28276948,
    pid: 1,
    tid: 'e7383d61-8617-4c3c-a535-46b4eff294d1',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 28277227,
    pid: 1,
    tid: 'e7383d61-8617-4c3c-a535-46b4eff294d1',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 28277526,
    pid: 1,
    tid: 'e7383d61-8617-4c3c-a535-46b4eff294d1',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'B',
    ts: 32478546,
    pid: 1,
    tid: 'ec189f60-660f-4b2b-a0fb-0b587bf5caa2',
    args: {
      cell: 'pipeline-builder',
      behavior: 'ec189f60-660f-4b2b-a0fb-0b587bf5caa2',
      scheduler: 'delayed',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'B',
    ts: 32478946,
    pid: 1,
    tid: 'ec189f60-660f-4b2b-a0fb-0b587bf5caa2',
    args: {
      cell: 'pipeline-builder',
      behavior: 'ec189f60-660f-4b2b-a0fb-0b587bf5caa2',
      scheduler: 'microtask',
      source: 'ui',
      latency: 'pipeline'
    }
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'B',
    ts: 32479544,
    pid: 1,
    tid: 'ec189f60-660f-4b2b-a0fb-0b587bf5caa2',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'B',
    ts: 32479744,
    pid: 1,
    tid: 'ec189f60-660f-4b2b-a0fb-0b587bf5caa2',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Core::Value',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'B',
    ts: 32480043,
    pid: 1,
    tid: 'ec189f60-660f-4b2b-a0fb-0b587bf5caa2',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'B',
    ts: 32480743,
    pid: 1,
    tid: 'ec189f60-660f-4b2b-a0fb-0b587bf5caa2',
    args: {
      cell: 'pipeline-builder',
      behavior: 'SDUX::Behavior::Persist::SessionStorage',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'B',
    ts: 32481942,
    pid: 1,
    tid: 'ec189f60-660f-4b2b-a0fb-0b587bf5caa2',
    args: {
      cell: 'pipeline-builder',
      behavior: 'vault-orchestrator',
      scheduler: 'microtask',
      source: 'internal',
      latency: 'pipeline'
    }
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 32482520,
    pid: 1,
    tid: 'ec189f60-660f-4b2b-a0fb-0b587bf5caa2',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'B',
    ts: 32482820,
    pid: 1,
    tid: 'ec189f60-660f-4b2b-a0fb-0b587bf5caa2',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  }
];
