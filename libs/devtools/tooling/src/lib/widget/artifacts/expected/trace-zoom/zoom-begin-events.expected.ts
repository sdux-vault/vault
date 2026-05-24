/** Expected zoomed trace begin events used in test assertions. */
export const ZOOM_BEGIN_EVENTS_EXPECTED = [
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
    ts: 200000,
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
    ts: 499999,
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
    ts: 699999,
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
    ts: 799998,
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
    ts: 1199998,
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
    ts: 1599997,
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
    ts: 1979996,
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
    ts: 2079996,
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
    ts: 2100996,
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
    ts: 2500996,
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
    ts: 3300995,
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
    ts: 3600994,
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
    ts: 3900994,
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
    ts: 5000993,
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
    ts: 6800992,
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
    ts: 7280991,
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
    ts: 7480991,
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
    ts: 7501991,
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
    ts: 7901991,
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
    ts: 8801990,
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
    ts: 9001989,
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
    ts: 9301989,
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
    ts: 10501987,
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
    ts: 11401987,
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
    ts: 12081986,
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
    ts: 12281986,
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
    ts: 12302986,
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
    ts: 12702985,
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
    ts: 13602984,
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
    ts: 13902983,
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
    ts: 14202983,
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
    ts: 15502982,
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
    ts: 16102982,
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
    ts: 16682982,
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
    ts: 16882981,
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
    ts: 16903981,
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
    ts: 17403981,
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
    ts: 18303981,
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
    ts: 18503980,
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
    ts: 18903979,
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
    ts: 20103978,
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
    ts: 21203977,
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
    ts: 22083976,
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
    ts: 22383975,
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
    ts: 22404975,
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
    ts: 22804974,
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
    ts: 23804973,
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
    ts: 24004973,
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
    ts: 24304972,
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
    ts: 25604972,
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
    ts: 26604971,
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
    ts: 28084970,
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
    ts: 28484969,
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
    ts: 28505969,
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
    ts: 28905968,
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
    ts: 29905967,
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
    ts: 30105966,
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
    ts: 30405966,
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
    ts: 31605964,
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
    ts: 32405964,
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
    ts: 32985964,
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
    ts: 33285963,
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
    ts: 33306963,
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
    ts: 33806963,
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
    ts: 34806962,
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
    ts: 35106962,
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
    ts: 35406961,
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
    ts: 36506960,
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
    ts: 37106960,
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
    ts: 37686959,
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
    ts: 37886959,
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
    ts: 37907959,
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
    ts: 38307958,
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
    ts: 39607956,
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
    ts: 39807956,
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
    ts: 40207955,
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
    ts: 41007954,
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
    ts: 42007953,
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
    ts: 42487953,
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
    ts: 42787953,
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
    ts: 42808953,
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
    ts: 43308953,
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
    ts: 44308952,
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
    ts: 44508951,
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
    ts: 45008950,
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
    ts: 46208949,
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
    ts: 47108948,
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
    ts: 47788948,
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
    ts: 48088947,
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
    ts: 48109947,
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
    ts: 48309947,
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
    ts: 48709946,
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
    ts: 48809946,
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
    ts: 49009945,
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
    ts: 49609945,
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
    ts: 50109944,
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
    ts: 50489943,
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
    ts: 50689943,
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
    ts: 50710943,
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
    ts: 50910943,
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
    ts: 51310942,
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
    ts: 51410942,
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
    ts: 51410942,
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
    ts: 51910941,
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
    ts: 52210940,
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
    ts: 52490940,
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
    ts: 52690939,
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
    ts: 52711939,
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
    ts: 53111938,
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
    ts: 53611937,
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
    ts: 53811937,
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
    ts: 54011936,
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
    ts: 54811936,
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
    ts: 55411935,
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
    ts: 55891934,
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
    ts: 56091933,
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
    ts: 56112933,
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
    ts: 56512932,
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
    ts: 57112932,
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
    ts: 57212932,
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
    ts: 57412931,
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
    ts: 57612931,
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
    ts: 57812930,
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
    ts: 58512930,
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
    ts: 59012929,
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
    ts: 59492928,
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
    ts: 59692928,
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
    ts: 59812927,
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
    ts: 60112927,
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
    ts: 60212927,
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
    ts: 60912926,
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
    ts: 61512926,
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
    ts: 61912925,
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
    ts: 62292924,
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
    ts: 62492924,
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
    ts: 62512924,
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
    ts: 62912923,
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
    ts: 63012923,
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
    ts: 63212923,
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
    ts: 63712922,
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
    ts: 64112921,
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
    ts: 64692920,
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
    ts: 65092919,
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
    ts: 65113919,
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
    ts: 65413919,
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
    ts: 65913918,
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
    ts: 66013918,
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
    ts: 66213917,
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
    ts: 66513917,
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
    ts: 67013916,
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
    ts: 68113914,
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
    ts: 68493914,
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
    ts: 68793913,
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
    ts: 68813913,
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
    ts: 69213912,
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
    ts: 69313912,
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
    ts: 69413912,
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
    ts: 70013912,
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
    ts: 70513911,
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
    ts: 70693910,
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
    ts: 70993910,
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
    ts: 71014910,
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
    ts: 71314909,
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
    ts: 71814908,
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
    ts: 72114908,
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
    ts: 72214907,
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
    ts: 72514907,
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
    ts: 73114906,
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
    ts: 73714904,
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
    ts: 74394903,
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
    ts: 74794902,
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
    ts: 74914902,
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
    ts: 75214901,
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
    ts: 75314901,
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
    ts: 75514901,
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
    ts: 76014900,
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
    ts: 76414899,
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
    ts: 76794898,
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
    ts: 76894898,
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
    ts: 76915898,
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
    ts: 77315897,
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
    ts: 78015897,
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
    ts: 78015897,
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
    ts: 78315896,
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
    ts: 78515896,
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
    ts: 78715895,
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
    ts: 79415894,
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
    ts: 80015893,
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
    ts: 80395892,
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
    ts: 80695891,
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
    ts: 81415891,
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
    ts: 81715890,
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
    ts: 81815890,
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
    ts: 82015890,
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
    ts: 82515889,
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
    ts: 83015888,
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
    ts: 83295887,
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
    ts: 83595887,
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
    ts: 83615887,
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
    ts: 84015886,
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
    ts: 84115886,
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
    ts: 84615885,
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
    ts: 85215883,
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
    ts: 85815882,
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
    ts: 86095882,
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
    ts: 86395881,
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
    ts: 86416881,
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
    ts: 86716881,
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
    ts: 87416879,
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
    ts: 87716879,
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
    ts: 87816879,
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
    ts: 88216878,
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
    ts: 88916877,
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
    ts: 89516876,
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
    ts: 89896875,
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
    ts: 90696875,
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
    ts: 90916874,
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
    ts: 91316874,
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
    ts: 91416873,
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
    ts: 91616873,
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
    ts: 92316873,
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
    ts: 92816872,
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
    ts: 93096871,
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
    ts: 93296871,
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
    ts: 93317871,
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
    ts: 93717870,
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
    ts: 94217869,
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
    ts: 94517868,
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
    ts: 94617868,
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
    ts: 94817868,
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
    ts: 95617867,
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
    ts: 96117866,
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
    ts: 96597865,
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
    ts: 97297865,
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
    ts: 97517864,
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
    ts: 97917863,
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
    ts: 98017863,
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
    ts: 98217863,
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
    ts: 98817862,
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
    ts: 99417860,
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
    ts: 99797860,
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
    ts: 99997859,
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
    ts: 100018859,
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
    ts: 100418859,
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
    ts: 100918858,
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
    ts: 101018857,
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
    ts: 101218857,
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
    ts: 101418857,
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
    ts: 101618856,
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
    ts: 102418856,
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
    ts: 103018854,
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
    ts: 103898854,
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
    ts: 104298853,
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
    ts: 104418853,
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
    ts: 104818852,
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
    ts: 104918852,
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
    ts: 105218851,
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
    ts: 105818850,
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
    ts: 106318849,
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
    ts: 106598848,
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
    ts: 107298848,
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
    ts: 107418848,
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
    ts: 107718847,
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
    ts: 107918847,
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
    ts: 108118846,
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
    ts: 108918846,
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
    ts: 109518844,
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
    ts: 109798844,
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
    ts: 110198843,
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
    ts: 110219843,
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
    ts: 110519842,
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
    ts: 111119841,
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
    ts: 111519840,
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
    ts: 111619840,
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
    ts: 111819839,
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
    ts: 112019839,
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
    ts: 112419838,
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
    ts: 113519837,
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
    ts: 114119836,
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
    ts: 114499835,
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
    ts: 114699835,
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
    ts: 114819834,
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
    ts: 115119834,
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
    ts: 115319833,
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
    ts: 115519833,
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
    ts: 116419832,
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
    ts: 116919831,
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
    ts: 117099831,
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
    ts: 117299830,
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
    ts: 117419830,
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
    ts: 117719830,
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
    ts: 117919829,
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
    ts: 118119829,
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
    ts: 118819827,
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
    ts: 119319826,
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
    ts: 119599826,
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
    ts: 119899825,
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
    ts: 120019825,
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
    ts: 120319824,
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
    ts: 120519824,
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
    ts: 120919823,
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
    ts: 121919822,
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
    ts: 122419821,
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
    ts: 122699821,
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
    ts: 123099820,
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
    ts: 123120820,
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
    ts: 123420820,
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
    ts: 124120818,
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
    ts: 124420818,
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
    ts: 124620817,
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
    ts: 125020817,
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
    ts: 125720815,
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
    ts: 126420815,
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
    ts: 126800814,
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
    ts: 127200813,
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
    ts: 127320813,
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
    ts: 127820812,
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
    ts: 127920812,
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
    ts: 128220811,
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
    ts: 128820810,
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
    ts: 130020809,
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
    ts: 130400808,
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
    ts: 130800807,
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
    ts: 130821807,
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
    ts: 131121807,
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
    ts: 131921806,
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
    ts: 132021806,
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
    ts: 132421805,
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
    ts: 132521805,
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
    ts: 132921804,
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
    ts: 133721804,
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
    ts: 134521803,
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
    ts: 134901802,
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
    ts: 135301801,
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
    ts: 135421801,
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
    ts: 136421800,
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
    ts: 136521800,
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
    ts: 136821799,
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
    ts: 137321798,
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
    ts: 137821797,
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
    ts: 138101797,
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
    ts: 138401796,
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
    ts: 138721796,
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
    ts: 139121795,
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
    ts: 139321794,
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
    ts: 139521794,
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
    ts: 140621794,
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
    ts: 141121793,
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
    ts: 141501792,
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
    ts: 142001791,
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
    ts: 142022791,
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
    ts: 142222790,
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
    ts: 142722789,
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
    ts: 143022789,
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
    ts: 143122789,
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
    ts: 143322788,
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
    ts: 143522788,
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
    ts: 143922787,
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
    ts: 144622787,
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
    ts: 145322785,
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
    ts: 145702784,
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
    ts: 146102784,
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
    ts: 146222783,
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
    ts: 147222782,
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
    ts: 147422782,
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
    ts: 147722781,
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
    ts: 148422781,
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
    ts: 149022780,
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
    ts: 149502779,
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
    ts: 149702778,
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
    ts: 149822778,
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
    ts: 150222777,
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
    ts: 150322777,
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
    ts: 150722776,
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
    ts: 151222775,
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
    ts: 151822774,
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
    ts: 152602774,
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
    ts: 152902773,
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
    ts: 153022773,
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
    ts: 153422772,
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
    ts: 153522772,
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
    ts: 153722771,
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
    ts: 154322770,
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
    ts: 154722769,
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
    ts: 155202768,
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
    ts: 155502768,
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
    ts: 155523768,
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
    ts: 155923767,
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
    ts: 156623766,
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
    ts: 156823765,
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
    ts: 157123765,
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
    ts: 157523764,
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
    ts: 158323763,
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
    ts: 158823762,
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
    ts: 159303762,
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
    ts: 159703762,
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
    ts: 159723762,
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
    ts: 160223761,
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
    ts: 160323760,
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
    ts: 160523760,
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
    ts: 161623760,
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
    ts: 162223759,
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
    ts: 162503758,
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
    ts: 162803757,
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
    ts: 162824757,
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
    ts: 163224757,
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
    ts: 163824755,
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
    ts: 164024755,
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
    ts: 164324754,
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
    ts: 165024754,
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
    ts: 166224753,
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
    ts: 166804751,
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
    ts: 167104751,
    pid: 1,
    tid: 'ec189f60-660f-4b2b-a0fb-0b587bf5caa2',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic span time added for visualization'
    }
  }
];
