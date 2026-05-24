/** Expected trace end events used in test assertions. */
export const END_EVENTS_EXPECTED = [
  {
    name: 'vote',
    cat: 'controller',
    ph: 'E',
    ts: 299,
    pid: 1,
    tid: '5ddc1e1c-4bd6-45d3-943e-75b69ef2dee5'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 798,
    pid: 1,
    tid: '5ddc1e1c-4bd6-45d3-943e-75b69ef2dee5'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 898,
    pid: 1,
    tid: '5ddc1e1c-4bd6-45d3-943e-75b69ef2dee5'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 1497,
    pid: 1,
    tid: '5ddc1e1c-4bd6-45d3-943e-75b69ef2dee5'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 1597,
    pid: 1,
    tid: '5ddc1e1c-4bd6-45d3-943e-75b69ef2dee5'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 1996,
    pid: 1,
    tid: '5ddc1e1c-4bd6-45d3-943e-75b69ef2dee5'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 1996,
    pid: 1,
    tid: '5ddc1e1c-4bd6-45d3-943e-75b69ef2dee5',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'E',
    ts: 1996,
    pid: 1,
    tid: '5ddc1e1c-4bd6-45d3-943e-75b69ef2dee5'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 2096,
    pid: 1,
    tid: '5ddc1e1c-4bd6-45d3-943e-75b69ef2dee5',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'E',
    ts: 2075994,
    pid: 1,
    tid: 'e27e81bf-37b7-40ad-98ba-7f0eb293a21e'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 2076993,
    pid: 1,
    tid: 'e27e81bf-37b7-40ad-98ba-7f0eb293a21e'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 2077392,
    pid: 1,
    tid: 'e27e81bf-37b7-40ad-98ba-7f0eb293a21e'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 2079791,
    pid: 1,
    tid: 'e27e81bf-37b7-40ad-98ba-7f0eb293a21e'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 2079791,
    pid: 1,
    tid: 'e27e81bf-37b7-40ad-98ba-7f0eb293a21e'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 2080390,
    pid: 1,
    tid: 'e27e81bf-37b7-40ad-98ba-7f0eb293a21e'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 2080490,
    pid: 1,
    tid: 'e27e81bf-37b7-40ad-98ba-7f0eb293a21e',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'E',
    ts: 2080590,
    pid: 1,
    tid: 'e27e81bf-37b7-40ad-98ba-7f0eb293a21e'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 2080690,
    pid: 1,
    tid: 'e27e81bf-37b7-40ad-98ba-7f0eb293a21e',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'E',
    ts: 2736988,
    pid: 1,
    tid: '54c6d994-1bcd-4043-a34e-fa32555301c3'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 2737987,
    pid: 1,
    tid: '54c6d994-1bcd-4043-a34e-fa32555301c3'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 2738386,
    pid: 1,
    tid: '54c6d994-1bcd-4043-a34e-fa32555301c3'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 2739985,
    pid: 1,
    tid: '54c6d994-1bcd-4043-a34e-fa32555301c3'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 2740185,
    pid: 1,
    tid: '54c6d994-1bcd-4043-a34e-fa32555301c3'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 2740784,
    pid: 1,
    tid: '54c6d994-1bcd-4043-a34e-fa32555301c3'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 2740884,
    pid: 1,
    tid: '54c6d994-1bcd-4043-a34e-fa32555301c3',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'E',
    ts: 2740884,
    pid: 1,
    tid: '54c6d994-1bcd-4043-a34e-fa32555301c3'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 2741084,
    pid: 1,
    tid: '54c6d994-1bcd-4043-a34e-fa32555301c3',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'E',
    ts: 3276982,
    pid: 1,
    tid: 'da5ac314-c0d5-4628-841f-2e7b5da3d8f7'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 3277981,
    pid: 1,
    tid: 'da5ac314-c0d5-4628-841f-2e7b5da3d8f7'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 3278380,
    pid: 1,
    tid: 'da5ac314-c0d5-4628-841f-2e7b5da3d8f7'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 3279880,
    pid: 1,
    tid: 'da5ac314-c0d5-4628-841f-2e7b5da3d8f7'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 3279880,
    pid: 1,
    tid: 'da5ac314-c0d5-4628-841f-2e7b5da3d8f7'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 3280480,
    pid: 1,
    tid: 'da5ac314-c0d5-4628-841f-2e7b5da3d8f7'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 3280580,
    pid: 1,
    tid: 'da5ac314-c0d5-4628-841f-2e7b5da3d8f7',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'E',
    ts: 3280680,
    pid: 1,
    tid: 'da5ac314-c0d5-4628-841f-2e7b5da3d8f7'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 3280779,
    pid: 1,
    tid: 'da5ac314-c0d5-4628-841f-2e7b5da3d8f7',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'E',
    ts: 4641679,
    pid: 1,
    tid: 'cb8c0bb8-9160-4c7a-8b58-33c1b4036fe3'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 4642578,
    pid: 1,
    tid: 'cb8c0bb8-9160-4c7a-8b58-33c1b4036fe3'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 4643077,
    pid: 1,
    tid: 'cb8c0bb8-9160-4c7a-8b58-33c1b4036fe3'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 4644775,
    pid: 1,
    tid: 'cb8c0bb8-9160-4c7a-8b58-33c1b4036fe3'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 4644875,
    pid: 1,
    tid: 'cb8c0bb8-9160-4c7a-8b58-33c1b4036fe3'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 4645774,
    pid: 1,
    tid: 'cb8c0bb8-9160-4c7a-8b58-33c1b4036fe3'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 4645974,
    pid: 1,
    tid: 'cb8c0bb8-9160-4c7a-8b58-33c1b4036fe3',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'E',
    ts: 4646074,
    pid: 1,
    tid: 'cb8c0bb8-9160-4c7a-8b58-33c1b4036fe3'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 4646273,
    pid: 1,
    tid: 'cb8c0bb8-9160-4c7a-8b58-33c1b4036fe3',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'E',
    ts: 5329172,
    pid: 1,
    tid: '6b7209f0-40dc-4b54-97ed-428b42bec195'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 5330171,
    pid: 1,
    tid: '6b7209f0-40dc-4b54-97ed-428b42bec195'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 5330570,
    pid: 1,
    tid: '6b7209f0-40dc-4b54-97ed-428b42bec195'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 5332369,
    pid: 1,
    tid: '6b7209f0-40dc-4b54-97ed-428b42bec195'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 5332369,
    pid: 1,
    tid: '6b7209f0-40dc-4b54-97ed-428b42bec195'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 5333368,
    pid: 1,
    tid: '6b7209f0-40dc-4b54-97ed-428b42bec195'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 5334068,
    pid: 1,
    tid: '6b7209f0-40dc-4b54-97ed-428b42bec195',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'E',
    ts: 5334267,
    pid: 1,
    tid: '6b7209f0-40dc-4b54-97ed-428b42bec195'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 5334467,
    pid: 1,
    tid: '6b7209f0-40dc-4b54-97ed-428b42bec195',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'E',
    ts: 5856965,
    pid: 1,
    tid: 'f75cf56f-9c31-4e8d-8a69-3b0ee6a4b75c'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 5857964,
    pid: 1,
    tid: 'f75cf56f-9c31-4e8d-8a69-3b0ee6a4b75c'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 5858363,
    pid: 1,
    tid: 'f75cf56f-9c31-4e8d-8a69-3b0ee6a4b75c'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 5859962,
    pid: 1,
    tid: 'f75cf56f-9c31-4e8d-8a69-3b0ee6a4b75c'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 5860062,
    pid: 1,
    tid: 'f75cf56f-9c31-4e8d-8a69-3b0ee6a4b75c'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 5860662,
    pid: 1,
    tid: 'f75cf56f-9c31-4e8d-8a69-3b0ee6a4b75c'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 5860662,
    pid: 1,
    tid: 'f75cf56f-9c31-4e8d-8a69-3b0ee6a4b75c',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'E',
    ts: 5860761,
    pid: 1,
    tid: 'f75cf56f-9c31-4e8d-8a69-3b0ee6a4b75c'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 5860961,
    pid: 1,
    tid: 'f75cf56f-9c31-4e8d-8a69-3b0ee6a4b75c',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'E',
    ts: 6830160,
    pid: 1,
    tid: '248ddbf8-899c-444f-8680-6c1844225302'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 6831358,
    pid: 1,
    tid: '248ddbf8-899c-444f-8680-6c1844225302'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 6831857,
    pid: 1,
    tid: '248ddbf8-899c-444f-8680-6c1844225302'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 6833057,
    pid: 1,
    tid: '248ddbf8-899c-444f-8680-6c1844225302'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 6833057,
    pid: 1,
    tid: '248ddbf8-899c-444f-8680-6c1844225302'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 6833657,
    pid: 1,
    tid: '248ddbf8-899c-444f-8680-6c1844225302'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 6833756,
    pid: 1,
    tid: '248ddbf8-899c-444f-8680-6c1844225302',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'E',
    ts: 6833856,
    pid: 1,
    tid: '248ddbf8-899c-444f-8680-6c1844225302'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 6833956,
    pid: 1,
    tid: '248ddbf8-899c-444f-8680-6c1844225302',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'E',
    ts: 7087954,
    pid: 1,
    tid: 'd5338aa4-41c4-42b7-918a-05e89bd986f2'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 7089252,
    pid: 1,
    tid: 'd5338aa4-41c4-42b7-918a-05e89bd986f2'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 7089751,
    pid: 1,
    tid: 'd5338aa4-41c4-42b7-918a-05e89bd986f2'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 7091051,
    pid: 1,
    tid: 'd5338aa4-41c4-42b7-918a-05e89bd986f2'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 7091151,
    pid: 1,
    tid: 'd5338aa4-41c4-42b7-918a-05e89bd986f2'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 7091750,
    pid: 1,
    tid: 'd5338aa4-41c4-42b7-918a-05e89bd986f2'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 7091750,
    pid: 1,
    tid: 'd5338aa4-41c4-42b7-918a-05e89bd986f2',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'E',
    ts: 7091850,
    pid: 1,
    tid: 'd5338aa4-41c4-42b7-918a-05e89bd986f2'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 7092050,
    pid: 1,
    tid: 'd5338aa4-41c4-42b7-918a-05e89bd986f2',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'E',
    ts: 7941549,
    pid: 1,
    tid: '9548dc76-91b2-43b5-abb8-3ce5269260f4'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 7942648,
    pid: 1,
    tid: '9548dc76-91b2-43b5-abb8-3ce5269260f4'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 7943147,
    pid: 1,
    tid: '9548dc76-91b2-43b5-abb8-3ce5269260f4'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 7944745,
    pid: 1,
    tid: '9548dc76-91b2-43b5-abb8-3ce5269260f4'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 7944845,
    pid: 1,
    tid: '9548dc76-91b2-43b5-abb8-3ce5269260f4'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 7945545,
    pid: 1,
    tid: '9548dc76-91b2-43b5-abb8-3ce5269260f4'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 7945645,
    pid: 1,
    tid: '9548dc76-91b2-43b5-abb8-3ce5269260f4',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'E',
    ts: 7945844,
    pid: 1,
    tid: '9548dc76-91b2-43b5-abb8-3ce5269260f4'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 7945944,
    pid: 1,
    tid: '9548dc76-91b2-43b5-abb8-3ce5269260f4',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'E',
    ts: 9615843,
    pid: 1,
    tid: '9c1c59df-84dd-43fb-ada4-650895040465'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 9616342,
    pid: 1,
    tid: '9c1c59df-84dd-43fb-ada4-650895040465'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 9616442,
    pid: 1,
    tid: '9c1c59df-84dd-43fb-ada4-650895040465'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 9617341,
    pid: 1,
    tid: '9c1c59df-84dd-43fb-ada4-650895040465'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 9617441,
    pid: 1,
    tid: '9c1c59df-84dd-43fb-ada4-650895040465'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 9617840,
    pid: 1,
    tid: '9c1c59df-84dd-43fb-ada4-650895040465'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 9617840,
    pid: 1,
    tid: '9c1c59df-84dd-43fb-ada4-650895040465',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'E',
    ts: 9617940,
    pid: 1,
    tid: '9c1c59df-84dd-43fb-ada4-650895040465'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 9618040,
    pid: 1,
    tid: '9c1c59df-84dd-43fb-ada4-650895040465',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'E',
    ts: 10741039,
    pid: 1,
    tid: 'c060efe9-9e02-48a8-a8b2-5bf5fd8e1380'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 10741488,
    pid: 1,
    tid: 'c060efe9-9e02-48a8-a8b2-5bf5fd8e1380'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 10741638,
    pid: 1,
    tid: 'c060efe9-9e02-48a8-a8b2-5bf5fd8e1380'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 10742137,
    pid: 1,
    tid: 'c060efe9-9e02-48a8-a8b2-5bf5fd8e1380'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 10742236,
    pid: 1,
    tid: 'c060efe9-9e02-48a8-a8b2-5bf5fd8e1380'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 10742536,
    pid: 1,
    tid: 'c060efe9-9e02-48a8-a8b2-5bf5fd8e1380'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 10742536,
    pid: 1,
    tid: 'c060efe9-9e02-48a8-a8b2-5bf5fd8e1380',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'E',
    ts: 10742536,
    pid: 1,
    tid: 'c060efe9-9e02-48a8-a8b2-5bf5fd8e1380'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 10742735,
    pid: 1,
    tid: 'c060efe9-9e02-48a8-a8b2-5bf5fd8e1380',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'E',
    ts: 12054534,
    pid: 1,
    tid: '611d04a0-6f1e-41fb-8d40-e8c2d8d27242'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 12055133,
    pid: 1,
    tid: '611d04a0-6f1e-41fb-8d40-e8c2d8d27242'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 12055332,
    pid: 1,
    tid: '611d04a0-6f1e-41fb-8d40-e8c2d8d27242'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 12056431,
    pid: 1,
    tid: '611d04a0-6f1e-41fb-8d40-e8c2d8d27242'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 12056531,
    pid: 1,
    tid: '611d04a0-6f1e-41fb-8d40-e8c2d8d27242'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 12056930,
    pid: 1,
    tid: '611d04a0-6f1e-41fb-8d40-e8c2d8d27242'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 12057130,
    pid: 1,
    tid: '611d04a0-6f1e-41fb-8d40-e8c2d8d27242',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'E',
    ts: 12057229,
    pid: 1,
    tid: '611d04a0-6f1e-41fb-8d40-e8c2d8d27242'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 12057329,
    pid: 1,
    tid: '611d04a0-6f1e-41fb-8d40-e8c2d8d27242',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'E',
    ts: 13904528,
    pid: 1,
    tid: '066886db-4022-44bb-9ae0-5f3e25243334'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 13905627,
    pid: 1,
    tid: '066886db-4022-44bb-9ae0-5f3e25243334'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 13905926,
    pid: 1,
    tid: '066886db-4022-44bb-9ae0-5f3e25243334'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 13906725,
    pid: 1,
    tid: '066886db-4022-44bb-9ae0-5f3e25243334'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 13906825,
    pid: 1,
    tid: '066886db-4022-44bb-9ae0-5f3e25243334'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 13907324,
    pid: 1,
    tid: '066886db-4022-44bb-9ae0-5f3e25243334'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 13907424,
    pid: 1,
    tid: '066886db-4022-44bb-9ae0-5f3e25243334',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'E',
    ts: 13907524,
    pid: 1,
    tid: '066886db-4022-44bb-9ae0-5f3e25243334'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 13907624,
    pid: 1,
    tid: '066886db-4022-44bb-9ae0-5f3e25243334',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'E',
    ts: 13907823,
    pid: 1,
    tid: '2c4a0ad0-e4da-4dc7-bed8-88989d8ee659'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 13908722,
    pid: 1,
    tid: '2c4a0ad0-e4da-4dc7-bed8-88989d8ee659'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 13908922,
    pid: 1,
    tid: '2c4a0ad0-e4da-4dc7-bed8-88989d8ee659'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 13909721,
    pid: 1,
    tid: '2c4a0ad0-e4da-4dc7-bed8-88989d8ee659'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 13909721,
    pid: 1,
    tid: '2c4a0ad0-e4da-4dc7-bed8-88989d8ee659'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 13910121,
    pid: 1,
    tid: '2c4a0ad0-e4da-4dc7-bed8-88989d8ee659'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 13910220,
    pid: 1,
    tid: '2c4a0ad0-e4da-4dc7-bed8-88989d8ee659',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'E',
    ts: 13910320,
    pid: 1,
    tid: '2c4a0ad0-e4da-4dc7-bed8-88989d8ee659'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 13910420,
    pid: 1,
    tid: '2c4a0ad0-e4da-4dc7-bed8-88989d8ee659',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'E',
    ts: 13910620,
    pid: 1,
    tid: '22f1190b-83c8-43f5-957e-3aee0f18cec7'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 13910969,
    pid: 1,
    tid: '22f1190b-83c8-43f5-957e-3aee0f18cec7'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 13911218,
    pid: 1,
    tid: '22f1190b-83c8-43f5-957e-3aee0f18cec7'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 13911917,
    pid: 1,
    tid: '22f1190b-83c8-43f5-957e-3aee0f18cec7'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 13912017,
    pid: 1,
    tid: '22f1190b-83c8-43f5-957e-3aee0f18cec7'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 13912416,
    pid: 1,
    tid: '22f1190b-83c8-43f5-957e-3aee0f18cec7'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 13912616,
    pid: 1,
    tid: '22f1190b-83c8-43f5-957e-3aee0f18cec7',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'E',
    ts: 13912815,
    pid: 1,
    tid: '22f1190b-83c8-43f5-957e-3aee0f18cec7'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 13913015,
    pid: 1,
    tid: '22f1190b-83c8-43f5-957e-3aee0f18cec7',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'E',
    ts: 15290213,
    pid: 1,
    tid: '84e44fe8-075f-4449-9f06-2c760c07065d'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 15291012,
    pid: 1,
    tid: '84e44fe8-075f-4449-9f06-2c760c07065d'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 15291211,
    pid: 1,
    tid: '84e44fe8-075f-4449-9f06-2c760c07065d'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 15292510,
    pid: 1,
    tid: '84e44fe8-075f-4449-9f06-2c760c07065d'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 15292610,
    pid: 1,
    tid: '84e44fe8-075f-4449-9f06-2c760c07065d'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 15293009,
    pid: 1,
    tid: '84e44fe8-075f-4449-9f06-2c760c07065d'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 15293109,
    pid: 1,
    tid: '84e44fe8-075f-4449-9f06-2c760c07065d',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'E',
    ts: 15293208,
    pid: 1,
    tid: '84e44fe8-075f-4449-9f06-2c760c07065d'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 15293408,
    pid: 1,
    tid: '84e44fe8-075f-4449-9f06-2c760c07065d',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'E',
    ts: 15293608,
    pid: 1,
    tid: '5402980a-a649-41e2-92da-c73354f1956e'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 15293957,
    pid: 1,
    tid: '5402980a-a649-41e2-92da-c73354f1956e'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 15294107,
    pid: 1,
    tid: '5402980a-a649-41e2-92da-c73354f1956e'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 15294906,
    pid: 1,
    tid: '5402980a-a649-41e2-92da-c73354f1956e'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 15294906,
    pid: 1,
    tid: '5402980a-a649-41e2-92da-c73354f1956e'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 15295305,
    pid: 1,
    tid: '5402980a-a649-41e2-92da-c73354f1956e'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 15295305,
    pid: 1,
    tid: '5402980a-a649-41e2-92da-c73354f1956e',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'E',
    ts: 15295405,
    pid: 1,
    tid: '5402980a-a649-41e2-92da-c73354f1956e'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 15295605,
    pid: 1,
    tid: '5402980a-a649-41e2-92da-c73354f1956e',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'E',
    ts: 16508003,
    pid: 1,
    tid: 'f788df6a-64f9-490f-b4cd-60fc1f187a92'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 16508801,
    pid: 1,
    tid: 'f788df6a-64f9-490f-b4cd-60fc1f187a92'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 16509200,
    pid: 1,
    tid: 'f788df6a-64f9-490f-b4cd-60fc1f187a92'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 16509999,
    pid: 1,
    tid: 'f788df6a-64f9-490f-b4cd-60fc1f187a92'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 16510099,
    pid: 1,
    tid: 'f788df6a-64f9-490f-b4cd-60fc1f187a92'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 16510498,
    pid: 1,
    tid: 'f788df6a-64f9-490f-b4cd-60fc1f187a92'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 16510897,
    pid: 1,
    tid: 'f788df6a-64f9-490f-b4cd-60fc1f187a92',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'E',
    ts: 16511097,
    pid: 1,
    tid: 'f788df6a-64f9-490f-b4cd-60fc1f187a92'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 16511296,
    pid: 1,
    tid: 'f788df6a-64f9-490f-b4cd-60fc1f187a92',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'E',
    ts: 16511496,
    pid: 1,
    tid: '93077326-676f-451e-b7ae-c4750b6efc37'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 16511995,
    pid: 1,
    tid: '93077326-676f-451e-b7ae-c4750b6efc37'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 16512194,
    pid: 1,
    tid: '93077326-676f-451e-b7ae-c4750b6efc37'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 16512793,
    pid: 1,
    tid: '93077326-676f-451e-b7ae-c4750b6efc37'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 16512793,
    pid: 1,
    tid: '93077326-676f-451e-b7ae-c4750b6efc37'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 16513192,
    pid: 1,
    tid: '93077326-676f-451e-b7ae-c4750b6efc37'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 16513292,
    pid: 1,
    tid: '93077326-676f-451e-b7ae-c4750b6efc37',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'E',
    ts: 16513292,
    pid: 1,
    tid: '93077326-676f-451e-b7ae-c4750b6efc37'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 16513392,
    pid: 1,
    tid: '93077326-676f-451e-b7ae-c4750b6efc37',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'E',
    ts: 17796991,
    pid: 1,
    tid: '6e42dd6e-5e52-4027-9b55-70aaa90f9083'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 17798189,
    pid: 1,
    tid: '6e42dd6e-5e52-4027-9b55-70aaa90f9083'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 17798489,
    pid: 1,
    tid: '6e42dd6e-5e52-4027-9b55-70aaa90f9083'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 17799287,
    pid: 1,
    tid: '6e42dd6e-5e52-4027-9b55-70aaa90f9083'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 17799387,
    pid: 1,
    tid: '6e42dd6e-5e52-4027-9b55-70aaa90f9083'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 17799786,
    pid: 1,
    tid: '6e42dd6e-5e52-4027-9b55-70aaa90f9083'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 17799886,
    pid: 1,
    tid: '6e42dd6e-5e52-4027-9b55-70aaa90f9083',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'E',
    ts: 17799986,
    pid: 1,
    tid: '6e42dd6e-5e52-4027-9b55-70aaa90f9083'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 17800185,
    pid: 1,
    tid: '6e42dd6e-5e52-4027-9b55-70aaa90f9083',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'E',
    ts: 17800935,
    pid: 1,
    tid: 'e81746cd-7525-4bcd-9ef2-db931314a3a5'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 17801384,
    pid: 1,
    tid: 'e81746cd-7525-4bcd-9ef2-db931314a3a5'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 17801683,
    pid: 1,
    tid: 'e81746cd-7525-4bcd-9ef2-db931314a3a5'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 17802282,
    pid: 1,
    tid: 'e81746cd-7525-4bcd-9ef2-db931314a3a5'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 17802382,
    pid: 1,
    tid: 'e81746cd-7525-4bcd-9ef2-db931314a3a5'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 17802681,
    pid: 1,
    tid: 'e81746cd-7525-4bcd-9ef2-db931314a3a5'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 17802781,
    pid: 1,
    tid: 'e81746cd-7525-4bcd-9ef2-db931314a3a5',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'E',
    ts: 17802881,
    pid: 1,
    tid: 'e81746cd-7525-4bcd-9ef2-db931314a3a5'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 17803081,
    pid: 1,
    tid: 'e81746cd-7525-4bcd-9ef2-db931314a3a5',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'E',
    ts: 17803180,
    pid: 1,
    tid: 'b14253ec-739f-47e5-b6a9-8dec26932779'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 17803679,
    pid: 1,
    tid: 'b14253ec-739f-47e5-b6a9-8dec26932779'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 17804378,
    pid: 1,
    tid: 'b14253ec-739f-47e5-b6a9-8dec26932779'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 17804977,
    pid: 1,
    tid: 'b14253ec-739f-47e5-b6a9-8dec26932779'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 17805176,
    pid: 1,
    tid: 'b14253ec-739f-47e5-b6a9-8dec26932779'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 17805476,
    pid: 1,
    tid: 'b14253ec-739f-47e5-b6a9-8dec26932779'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 17805576,
    pid: 1,
    tid: 'b14253ec-739f-47e5-b6a9-8dec26932779',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'E',
    ts: 17805675,
    pid: 1,
    tid: 'b14253ec-739f-47e5-b6a9-8dec26932779'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 17805875,
    pid: 1,
    tid: 'b14253ec-739f-47e5-b6a9-8dec26932779',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'E',
    ts: 19237873,
    pid: 1,
    tid: '2708bcec-7f5b-442b-8ff1-025e70a0b9d4'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 19238871,
    pid: 1,
    tid: '2708bcec-7f5b-442b-8ff1-025e70a0b9d4'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 19239170,
    pid: 1,
    tid: '2708bcec-7f5b-442b-8ff1-025e70a0b9d4'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 19240070,
    pid: 1,
    tid: '2708bcec-7f5b-442b-8ff1-025e70a0b9d4'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 19240169,
    pid: 1,
    tid: '2708bcec-7f5b-442b-8ff1-025e70a0b9d4'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 19240569,
    pid: 1,
    tid: '2708bcec-7f5b-442b-8ff1-025e70a0b9d4'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 19240668,
    pid: 1,
    tid: '2708bcec-7f5b-442b-8ff1-025e70a0b9d4',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'E',
    ts: 19241368,
    pid: 1,
    tid: '2708bcec-7f5b-442b-8ff1-025e70a0b9d4'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 19241468,
    pid: 1,
    tid: '2708bcec-7f5b-442b-8ff1-025e70a0b9d4',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'E',
    ts: 19241767,
    pid: 1,
    tid: '7d2e8190-3524-4709-9dd7-4618af3895a0'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 19242366,
    pid: 1,
    tid: '7d2e8190-3524-4709-9dd7-4618af3895a0'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 19242566,
    pid: 1,
    tid: '7d2e8190-3524-4709-9dd7-4618af3895a0'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 19243365,
    pid: 1,
    tid: '7d2e8190-3524-4709-9dd7-4618af3895a0'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 19243465,
    pid: 1,
    tid: '7d2e8190-3524-4709-9dd7-4618af3895a0'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 19243864,
    pid: 1,
    tid: '7d2e8190-3524-4709-9dd7-4618af3895a0'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 19243864,
    pid: 1,
    tid: '7d2e8190-3524-4709-9dd7-4618af3895a0',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'E',
    ts: 19243964,
    pid: 1,
    tid: '7d2e8190-3524-4709-9dd7-4618af3895a0'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 19244064,
    pid: 1,
    tid: '7d2e8190-3524-4709-9dd7-4618af3895a0',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'E',
    ts: 20687662,
    pid: 1,
    tid: '8c276680-0931-40d4-8d74-da70881f4f38'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 20688461,
    pid: 1,
    tid: '8c276680-0931-40d4-8d74-da70881f4f38'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 20688860,
    pid: 1,
    tid: '8c276680-0931-40d4-8d74-da70881f4f38'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 20689759,
    pid: 1,
    tid: '8c276680-0931-40d4-8d74-da70881f4f38'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 20689759,
    pid: 1,
    tid: '8c276680-0931-40d4-8d74-da70881f4f38'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 20690258,
    pid: 1,
    tid: '8c276680-0931-40d4-8d74-da70881f4f38'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 20690358,
    pid: 1,
    tid: '8c276680-0931-40d4-8d74-da70881f4f38',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'E',
    ts: 20690558,
    pid: 1,
    tid: '8c276680-0931-40d4-8d74-da70881f4f38'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 20691058,
    pid: 1,
    tid: '8c276680-0931-40d4-8d74-da70881f4f38',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'E',
    ts: 20691357,
    pid: 1,
    tid: 'f1ed0ba7-af11-42e5-9175-53a4fcdc5f64'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 20691856,
    pid: 1,
    tid: 'f1ed0ba7-af11-42e5-9175-53a4fcdc5f64'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 20692155,
    pid: 1,
    tid: 'f1ed0ba7-af11-42e5-9175-53a4fcdc5f64'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 20692954,
    pid: 1,
    tid: 'f1ed0ba7-af11-42e5-9175-53a4fcdc5f64'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 20693054,
    pid: 1,
    tid: 'f1ed0ba7-af11-42e5-9175-53a4fcdc5f64'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 20693453,
    pid: 1,
    tid: 'f1ed0ba7-af11-42e5-9175-53a4fcdc5f64'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 20693553,
    pid: 1,
    tid: 'f1ed0ba7-af11-42e5-9175-53a4fcdc5f64',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'E',
    ts: 20693652,
    pid: 1,
    tid: 'f1ed0ba7-af11-42e5-9175-53a4fcdc5f64'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 20693752,
    pid: 1,
    tid: 'f1ed0ba7-af11-42e5-9175-53a4fcdc5f64',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'E',
    ts: 22280150,
    pid: 1,
    tid: 'f64f32b8-01d1-4473-ba13-cb8cb9424963'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 22281148,
    pid: 1,
    tid: 'f64f32b8-01d1-4473-ba13-cb8cb9424963'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 22281548,
    pid: 1,
    tid: 'f64f32b8-01d1-4473-ba13-cb8cb9424963'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 22282447,
    pid: 1,
    tid: 'f64f32b8-01d1-4473-ba13-cb8cb9424963'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 22282547,
    pid: 1,
    tid: 'f64f32b8-01d1-4473-ba13-cb8cb9424963'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 22283346,
    pid: 1,
    tid: 'f64f32b8-01d1-4473-ba13-cb8cb9424963'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 22283546,
    pid: 1,
    tid: 'f64f32b8-01d1-4473-ba13-cb8cb9424963',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'E',
    ts: 22283745,
    pid: 1,
    tid: 'f64f32b8-01d1-4473-ba13-cb8cb9424963'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 22283945,
    pid: 1,
    tid: 'f64f32b8-01d1-4473-ba13-cb8cb9424963',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'E',
    ts: 22284095,
    pid: 1,
    tid: '7518d1ae-e5ac-4a42-8a5e-8ba08632db82'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 22284643,
    pid: 1,
    tid: '7518d1ae-e5ac-4a42-8a5e-8ba08632db82'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 22285043,
    pid: 1,
    tid: '7518d1ae-e5ac-4a42-8a5e-8ba08632db82'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 22285741,
    pid: 1,
    tid: '7518d1ae-e5ac-4a42-8a5e-8ba08632db82'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 22285841,
    pid: 1,
    tid: '7518d1ae-e5ac-4a42-8a5e-8ba08632db82'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 22286140,
    pid: 1,
    tid: '7518d1ae-e5ac-4a42-8a5e-8ba08632db82'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 22286240,
    pid: 1,
    tid: '7518d1ae-e5ac-4a42-8a5e-8ba08632db82',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'E',
    ts: 22286740,
    pid: 1,
    tid: '7518d1ae-e5ac-4a42-8a5e-8ba08632db82'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 22286940,
    pid: 1,
    tid: '7518d1ae-e5ac-4a42-8a5e-8ba08632db82',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'E',
    ts: 22287139,
    pid: 1,
    tid: '7bc6222a-e631-40c1-83d9-df29cb1db7f1'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 22287738,
    pid: 1,
    tid: '7bc6222a-e631-40c1-83d9-df29cb1db7f1'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 22287938,
    pid: 1,
    tid: '7bc6222a-e631-40c1-83d9-df29cb1db7f1'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 22288937,
    pid: 1,
    tid: '7bc6222a-e631-40c1-83d9-df29cb1db7f1'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 22288937,
    pid: 1,
    tid: '7bc6222a-e631-40c1-83d9-df29cb1db7f1'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 22289236,
    pid: 1,
    tid: '7bc6222a-e631-40c1-83d9-df29cb1db7f1'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 22289436,
    pid: 1,
    tid: '7bc6222a-e631-40c1-83d9-df29cb1db7f1',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'E',
    ts: 22289635,
    pid: 1,
    tid: '7bc6222a-e631-40c1-83d9-df29cb1db7f1'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 22289835,
    pid: 1,
    tid: '7bc6222a-e631-40c1-83d9-df29cb1db7f1',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'E',
    ts: 23704133,
    pid: 1,
    tid: 'd9395484-b9cb-49ca-8249-38171f2a78c1'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 23705630,
    pid: 1,
    tid: 'd9395484-b9cb-49ca-8249-38171f2a78c1'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 23706030,
    pid: 1,
    tid: 'd9395484-b9cb-49ca-8249-38171f2a78c1'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 23707128,
    pid: 1,
    tid: 'd9395484-b9cb-49ca-8249-38171f2a78c1'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 23707228,
    pid: 1,
    tid: 'd9395484-b9cb-49ca-8249-38171f2a78c1'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 23707627,
    pid: 1,
    tid: 'd9395484-b9cb-49ca-8249-38171f2a78c1'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 23707827,
    pid: 1,
    tid: 'd9395484-b9cb-49ca-8249-38171f2a78c1',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'E',
    ts: 23707927,
    pid: 1,
    tid: 'd9395484-b9cb-49ca-8249-38171f2a78c1'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 23708027,
    pid: 1,
    tid: 'd9395484-b9cb-49ca-8249-38171f2a78c1',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'E',
    ts: 23708226,
    pid: 1,
    tid: '173cf74a-492c-448d-b863-3c031a239e0b'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 23708725,
    pid: 1,
    tid: '173cf74a-492c-448d-b863-3c031a239e0b'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 23709224,
    pid: 1,
    tid: '173cf74a-492c-448d-b863-3c031a239e0b'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 23709924,
    pid: 1,
    tid: '173cf74a-492c-448d-b863-3c031a239e0b'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 23710123,
    pid: 1,
    tid: '173cf74a-492c-448d-b863-3c031a239e0b'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 23710323,
    pid: 1,
    tid: '173cf74a-492c-448d-b863-3c031a239e0b'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 23710423,
    pid: 1,
    tid: '173cf74a-492c-448d-b863-3c031a239e0b',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'E',
    ts: 23710523,
    pid: 1,
    tid: '173cf74a-492c-448d-b863-3c031a239e0b'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 23710622,
    pid: 1,
    tid: '173cf74a-492c-448d-b863-3c031a239e0b',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'E',
    ts: 23710822,
    pid: 1,
    tid: '822299ae-933d-4275-90c1-2e6a0658173f'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 23711421,
    pid: 1,
    tid: '822299ae-933d-4275-90c1-2e6a0658173f'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 23711720,
    pid: 1,
    tid: '822299ae-933d-4275-90c1-2e6a0658173f'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 23712319,
    pid: 1,
    tid: '822299ae-933d-4275-90c1-2e6a0658173f'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 23712519,
    pid: 1,
    tid: '822299ae-933d-4275-90c1-2e6a0658173f'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 23712818,
    pid: 1,
    tid: '822299ae-933d-4275-90c1-2e6a0658173f'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 23712918,
    pid: 1,
    tid: '822299ae-933d-4275-90c1-2e6a0658173f',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'E',
    ts: 23713117,
    pid: 1,
    tid: '822299ae-933d-4275-90c1-2e6a0658173f'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 23713217,
    pid: 1,
    tid: '822299ae-933d-4275-90c1-2e6a0658173f',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'E',
    ts: 23713517,
    pid: 1,
    tid: 'fb14b8d4-44f4-4fbf-84eb-0c56a21c14ad'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 23713916,
    pid: 1,
    tid: 'fb14b8d4-44f4-4fbf-84eb-0c56a21c14ad'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 23714815,
    pid: 1,
    tid: 'fb14b8d4-44f4-4fbf-84eb-0c56a21c14ad'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 23715613,
    pid: 1,
    tid: 'fb14b8d4-44f4-4fbf-84eb-0c56a21c14ad'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 23715713,
    pid: 1,
    tid: 'fb14b8d4-44f4-4fbf-84eb-0c56a21c14ad'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 23716013,
    pid: 1,
    tid: 'fb14b8d4-44f4-4fbf-84eb-0c56a21c14ad'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 23716013,
    pid: 1,
    tid: 'fb14b8d4-44f4-4fbf-84eb-0c56a21c14ad',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'E',
    ts: 23716212,
    pid: 1,
    tid: 'fb14b8d4-44f4-4fbf-84eb-0c56a21c14ad'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 23716412,
    pid: 1,
    tid: 'fb14b8d4-44f4-4fbf-84eb-0c56a21c14ad',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'E',
    ts: 24737710,
    pid: 1,
    tid: 'd17eeacc-0d29-4c39-80c1-9f7e1ae111e5'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 24738908,
    pid: 1,
    tid: 'd17eeacc-0d29-4c39-80c1-9f7e1ae111e5'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 24739307,
    pid: 1,
    tid: 'd17eeacc-0d29-4c39-80c1-9f7e1ae111e5'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 24740206,
    pid: 1,
    tid: 'd17eeacc-0d29-4c39-80c1-9f7e1ae111e5'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 24740306,
    pid: 1,
    tid: 'd17eeacc-0d29-4c39-80c1-9f7e1ae111e5'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 24740805,
    pid: 1,
    tid: 'd17eeacc-0d29-4c39-80c1-9f7e1ae111e5'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 24740805,
    pid: 1,
    tid: 'd17eeacc-0d29-4c39-80c1-9f7e1ae111e5',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'E',
    ts: 24741005,
    pid: 1,
    tid: 'd17eeacc-0d29-4c39-80c1-9f7e1ae111e5'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 24741204,
    pid: 1,
    tid: 'd17eeacc-0d29-4c39-80c1-9f7e1ae111e5',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'E',
    ts: 24741504,
    pid: 1,
    tid: '4e49b3cb-aa28-4f7e-ae2d-9668c5a4dc6a'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 24742102,
    pid: 1,
    tid: '4e49b3cb-aa28-4f7e-ae2d-9668c5a4dc6a'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 24742402,
    pid: 1,
    tid: '4e49b3cb-aa28-4f7e-ae2d-9668c5a4dc6a'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 24743100,
    pid: 1,
    tid: '4e49b3cb-aa28-4f7e-ae2d-9668c5a4dc6a'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 24743300,
    pid: 1,
    tid: '4e49b3cb-aa28-4f7e-ae2d-9668c5a4dc6a'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 24744299,
    pid: 1,
    tid: '4e49b3cb-aa28-4f7e-ae2d-9668c5a4dc6a'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 24744399,
    pid: 1,
    tid: '4e49b3cb-aa28-4f7e-ae2d-9668c5a4dc6a',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'E',
    ts: 24744598,
    pid: 1,
    tid: '4e49b3cb-aa28-4f7e-ae2d-9668c5a4dc6a'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 24744798,
    pid: 1,
    tid: '4e49b3cb-aa28-4f7e-ae2d-9668c5a4dc6a',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'E',
    ts: 25771096,
    pid: 1,
    tid: 'ac4ddc8a-daa0-447a-bf52-2288ffc6bfc5'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 25772495,
    pid: 1,
    tid: 'ac4ddc8a-daa0-447a-bf52-2288ffc6bfc5'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 25772994,
    pid: 1,
    tid: 'ac4ddc8a-daa0-447a-bf52-2288ffc6bfc5'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 25773994,
    pid: 1,
    tid: 'ac4ddc8a-daa0-447a-bf52-2288ffc6bfc5'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 25774093,
    pid: 1,
    tid: 'ac4ddc8a-daa0-447a-bf52-2288ffc6bfc5'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 25774592,
    pid: 1,
    tid: 'ac4ddc8a-daa0-447a-bf52-2288ffc6bfc5'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 25774692,
    pid: 1,
    tid: 'ac4ddc8a-daa0-447a-bf52-2288ffc6bfc5',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'E',
    ts: 25774892,
    pid: 1,
    tid: 'ac4ddc8a-daa0-447a-bf52-2288ffc6bfc5'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 25775091,
    pid: 1,
    tid: 'ac4ddc8a-daa0-447a-bf52-2288ffc6bfc5',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'E',
    ts: 25775391,
    pid: 1,
    tid: '6e8876e7-1b85-4b4a-a748-28c4df1c903e'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 25776490,
    pid: 1,
    tid: '6e8876e7-1b85-4b4a-a748-28c4df1c903e'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 25776789,
    pid: 1,
    tid: '6e8876e7-1b85-4b4a-a748-28c4df1c903e'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 25777388,
    pid: 1,
    tid: '6e8876e7-1b85-4b4a-a748-28c4df1c903e'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 25777488,
    pid: 1,
    tid: '6e8876e7-1b85-4b4a-a748-28c4df1c903e'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 25777787,
    pid: 1,
    tid: '6e8876e7-1b85-4b4a-a748-28c4df1c903e'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 25777887,
    pid: 1,
    tid: '6e8876e7-1b85-4b4a-a748-28c4df1c903e',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'E',
    ts: 25777987,
    pid: 1,
    tid: '6e8876e7-1b85-4b4a-a748-28c4df1c903e'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 25778186,
    pid: 1,
    tid: '6e8876e7-1b85-4b4a-a748-28c4df1c903e',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'E',
    ts: 25778585,
    pid: 1,
    tid: '948f31e6-87ed-480f-a368-eb542b70864c'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 25779184,
    pid: 1,
    tid: '948f31e6-87ed-480f-a368-eb542b70864c'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 25779384,
    pid: 1,
    tid: '948f31e6-87ed-480f-a368-eb542b70864c'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 25780683,
    pid: 1,
    tid: '948f31e6-87ed-480f-a368-eb542b70864c'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 25780883,
    pid: 1,
    tid: '948f31e6-87ed-480f-a368-eb542b70864c'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 25781182,
    pid: 1,
    tid: '948f31e6-87ed-480f-a368-eb542b70864c'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 25781282,
    pid: 1,
    tid: '948f31e6-87ed-480f-a368-eb542b70864c',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'E',
    ts: 25781382,
    pid: 1,
    tid: '948f31e6-87ed-480f-a368-eb542b70864c'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 25781781,
    pid: 1,
    tid: '948f31e6-87ed-480f-a368-eb542b70864c',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'E',
    ts: 27054880,
    pid: 1,
    tid: 'bfbc168a-c901-4f77-98b7-b79538441b2a'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 27056177,
    pid: 1,
    tid: 'bfbc168a-c901-4f77-98b7-b79538441b2a'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 27056477,
    pid: 1,
    tid: 'bfbc168a-c901-4f77-98b7-b79538441b2a'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 27057376,
    pid: 1,
    tid: 'bfbc168a-c901-4f77-98b7-b79538441b2a'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 27057575,
    pid: 1,
    tid: 'bfbc168a-c901-4f77-98b7-b79538441b2a'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 27057975,
    pid: 1,
    tid: 'bfbc168a-c901-4f77-98b7-b79538441b2a'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 27058074,
    pid: 1,
    tid: 'bfbc168a-c901-4f77-98b7-b79538441b2a',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'E',
    ts: 27058274,
    pid: 1,
    tid: 'bfbc168a-c901-4f77-98b7-b79538441b2a'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 27058474,
    pid: 1,
    tid: 'bfbc168a-c901-4f77-98b7-b79538441b2a',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'E',
    ts: 27058773,
    pid: 1,
    tid: '43698352-168b-4c02-9310-af259b5d2d3e'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 27059872,
    pid: 1,
    tid: '43698352-168b-4c02-9310-af259b5d2d3e'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 27060271,
    pid: 1,
    tid: '43698352-168b-4c02-9310-af259b5d2d3e'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 27061170,
    pid: 1,
    tid: '43698352-168b-4c02-9310-af259b5d2d3e'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 27061270,
    pid: 1,
    tid: '43698352-168b-4c02-9310-af259b5d2d3e'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 27061669,
    pid: 1,
    tid: '43698352-168b-4c02-9310-af259b5d2d3e'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 27061869,
    pid: 1,
    tid: '43698352-168b-4c02-9310-af259b5d2d3e',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'E',
    ts: 27061969,
    pid: 1,
    tid: '43698352-168b-4c02-9310-af259b5d2d3e'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 27062068,
    pid: 1,
    tid: '43698352-168b-4c02-9310-af259b5d2d3e',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'E',
    ts: 27062268,
    pid: 1,
    tid: '88a931f7-5322-4c65-b4a2-516f614ef6e1'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 27062967,
    pid: 1,
    tid: '88a931f7-5322-4c65-b4a2-516f614ef6e1'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 27063166,
    pid: 1,
    tid: '88a931f7-5322-4c65-b4a2-516f614ef6e1'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 27063965,
    pid: 1,
    tid: '88a931f7-5322-4c65-b4a2-516f614ef6e1'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 27064064,
    pid: 1,
    tid: '88a931f7-5322-4c65-b4a2-516f614ef6e1'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 27064764,
    pid: 1,
    tid: '88a931f7-5322-4c65-b4a2-516f614ef6e1'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 27064964,
    pid: 1,
    tid: '88a931f7-5322-4c65-b4a2-516f614ef6e1',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'E',
    ts: 27065063,
    pid: 1,
    tid: '88a931f7-5322-4c65-b4a2-516f614ef6e1'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 27065263,
    pid: 1,
    tid: '88a931f7-5322-4c65-b4a2-516f614ef6e1',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'E',
    ts: 27065463,
    pid: 1,
    tid: '2ea01f86-938c-4566-af8c-b55f67bb04a3'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 27065962,
    pid: 1,
    tid: '2ea01f86-938c-4566-af8c-b55f67bb04a3'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 27066261,
    pid: 1,
    tid: '2ea01f86-938c-4566-af8c-b55f67bb04a3'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 27066860,
    pid: 1,
    tid: '2ea01f86-938c-4566-af8c-b55f67bb04a3'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 27066960,
    pid: 1,
    tid: '2ea01f86-938c-4566-af8c-b55f67bb04a3'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 27067459,
    pid: 1,
    tid: '2ea01f86-938c-4566-af8c-b55f67bb04a3'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 27067558,
    pid: 1,
    tid: '2ea01f86-938c-4566-af8c-b55f67bb04a3',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'E',
    ts: 27067758,
    pid: 1,
    tid: '2ea01f86-938c-4566-af8c-b55f67bb04a3'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 27067858,
    pid: 1,
    tid: '2ea01f86-938c-4566-af8c-b55f67bb04a3',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'E',
    ts: 28270956,
    pid: 1,
    tid: '4b941271-093b-4ad0-ad23-254d3ab075f6'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 28272153,
    pid: 1,
    tid: '4b941271-093b-4ad0-ad23-254d3ab075f6'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 28272453,
    pid: 1,
    tid: '4b941271-093b-4ad0-ad23-254d3ab075f6'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 28273452,
    pid: 1,
    tid: '4b941271-093b-4ad0-ad23-254d3ab075f6'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 28273551,
    pid: 1,
    tid: '4b941271-093b-4ad0-ad23-254d3ab075f6'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 28274051,
    pid: 1,
    tid: '4b941271-093b-4ad0-ad23-254d3ab075f6'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 28274051,
    pid: 1,
    tid: '4b941271-093b-4ad0-ad23-254d3ab075f6',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'E',
    ts: 28274251,
    pid: 1,
    tid: '4b941271-093b-4ad0-ad23-254d3ab075f6'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 28274451,
    pid: 1,
    tid: '4b941271-093b-4ad0-ad23-254d3ab075f6',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'E',
    ts: 28274650,
    pid: 1,
    tid: 'e7383d61-8617-4c3c-a535-46b4eff294d1'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 28275149,
    pid: 1,
    tid: 'e7383d61-8617-4c3c-a535-46b4eff294d1'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 28275849,
    pid: 1,
    tid: 'e7383d61-8617-4c3c-a535-46b4eff294d1'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 28276648,
    pid: 1,
    tid: 'e7383d61-8617-4c3c-a535-46b4eff294d1'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 28276748,
    pid: 1,
    tid: 'e7383d61-8617-4c3c-a535-46b4eff294d1'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 28277147,
    pid: 1,
    tid: 'e7383d61-8617-4c3c-a535-46b4eff294d1'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 28277247,
    pid: 1,
    tid: 'e7383d61-8617-4c3c-a535-46b4eff294d1',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'E',
    ts: 28277447,
    pid: 1,
    tid: 'e7383d61-8617-4c3c-a535-46b4eff294d1'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 28277546,
    pid: 1,
    tid: 'e7383d61-8617-4c3c-a535-46b4eff294d1',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'vote',
    cat: 'controller',
    ph: 'E',
    ts: 32479145,
    pid: 1,
    tid: 'ec189f60-660f-4b2b-a0fb-0b587bf5caa2'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 32479944,
    pid: 1,
    tid: 'ec189f60-660f-4b2b-a0fb-0b587bf5caa2'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 32480243,
    pid: 1,
    tid: 'ec189f60-660f-4b2b-a0fb-0b587bf5caa2'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 32481142,
    pid: 1,
    tid: 'ec189f60-660f-4b2b-a0fb-0b587bf5caa2'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 32481342,
    pid: 1,
    tid: 'ec189f60-660f-4b2b-a0fb-0b587bf5caa2'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 32482341,
    pid: 1,
    tid: 'ec189f60-660f-4b2b-a0fb-0b587bf5caa2'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 32482540,
    pid: 1,
    tid: 'ec189f60-660f-4b2b-a0fb-0b587bf5caa2',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  },
  {
    name: 'attempt',
    cat: 'controller',
    ph: 'E',
    ts: 32482640,
    pid: 1,
    tid: 'ec189f60-660f-4b2b-a0fb-0b587bf5caa2'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 32482840,
    pid: 1,
    tid: 'ec189f60-660f-4b2b-a0fb-0b587bf5caa2',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  }
];
