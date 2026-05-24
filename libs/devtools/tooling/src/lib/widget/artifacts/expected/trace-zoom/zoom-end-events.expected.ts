/** Expected zoomed trace end events used in test assertions. */
export const ZOOM_END_EVENTS_EXPECTED = [
  {
    name: 'vote',
    cat: 'controller',
    ph: 'E',
    ts: 299999,
    pid: 1,
    tid: '5ddc1e1c-4bd6-45d3-943e-75b69ef2dee5'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 799998,
    pid: 1,
    tid: '5ddc1e1c-4bd6-45d3-943e-75b69ef2dee5'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 899998,
    pid: 1,
    tid: '5ddc1e1c-4bd6-45d3-943e-75b69ef2dee5'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 1499997,
    pid: 1,
    tid: '5ddc1e1c-4bd6-45d3-943e-75b69ef2dee5'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 1599997,
    pid: 1,
    tid: '5ddc1e1c-4bd6-45d3-943e-75b69ef2dee5'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 1999996,
    pid: 1,
    tid: '5ddc1e1c-4bd6-45d3-943e-75b69ef2dee5'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 1999996,
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
    ts: 1999996,
    pid: 1,
    tid: '5ddc1e1c-4bd6-45d3-943e-75b69ef2dee5'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 2099996,
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
    ts: 2800995,
    pid: 1,
    tid: 'e27e81bf-37b7-40ad-98ba-7f0eb293a21e'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 3800994,
    pid: 1,
    tid: 'e27e81bf-37b7-40ad-98ba-7f0eb293a21e'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 4200993,
    pid: 1,
    tid: 'e27e81bf-37b7-40ad-98ba-7f0eb293a21e'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 6600992,
    pid: 1,
    tid: 'e27e81bf-37b7-40ad-98ba-7f0eb293a21e'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 6600992,
    pid: 1,
    tid: 'e27e81bf-37b7-40ad-98ba-7f0eb293a21e'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 7200991,
    pid: 1,
    tid: 'e27e81bf-37b7-40ad-98ba-7f0eb293a21e'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 7300991,
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
    ts: 7400991,
    pid: 1,
    tid: 'e27e81bf-37b7-40ad-98ba-7f0eb293a21e'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 7500991,
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
    ts: 8201990,
    pid: 1,
    tid: '54c6d994-1bcd-4043-a34e-fa32555301c3'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 9201989,
    pid: 1,
    tid: '54c6d994-1bcd-4043-a34e-fa32555301c3'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 9601988,
    pid: 1,
    tid: '54c6d994-1bcd-4043-a34e-fa32555301c3'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 11201987,
    pid: 1,
    tid: '54c6d994-1bcd-4043-a34e-fa32555301c3'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 11401987,
    pid: 1,
    tid: '54c6d994-1bcd-4043-a34e-fa32555301c3'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 12001986,
    pid: 1,
    tid: '54c6d994-1bcd-4043-a34e-fa32555301c3'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 12101986,
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
    ts: 12101986,
    pid: 1,
    tid: '54c6d994-1bcd-4043-a34e-fa32555301c3'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 12301986,
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
    ts: 13102984,
    pid: 1,
    tid: 'da5ac314-c0d5-4628-841f-2e7b5da3d8f7'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 14102983,
    pid: 1,
    tid: 'da5ac314-c0d5-4628-841f-2e7b5da3d8f7'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 14502982,
    pid: 1,
    tid: 'da5ac314-c0d5-4628-841f-2e7b5da3d8f7'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 16002982,
    pid: 1,
    tid: 'da5ac314-c0d5-4628-841f-2e7b5da3d8f7'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 16002982,
    pid: 1,
    tid: 'da5ac314-c0d5-4628-841f-2e7b5da3d8f7'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 16602982,
    pid: 1,
    tid: 'da5ac314-c0d5-4628-841f-2e7b5da3d8f7'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 16702982,
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
    ts: 16802982,
    pid: 1,
    tid: 'da5ac314-c0d5-4628-841f-2e7b5da3d8f7'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 16902981,
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
    ts: 17803981,
    pid: 1,
    tid: 'cb8c0bb8-9160-4c7a-8b58-33c1b4036fe3'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 18703980,
    pid: 1,
    tid: 'cb8c0bb8-9160-4c7a-8b58-33c1b4036fe3'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 19203979,
    pid: 1,
    tid: 'cb8c0bb8-9160-4c7a-8b58-33c1b4036fe3'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 20903977,
    pid: 1,
    tid: 'cb8c0bb8-9160-4c7a-8b58-33c1b4036fe3'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 21003977,
    pid: 1,
    tid: 'cb8c0bb8-9160-4c7a-8b58-33c1b4036fe3'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 21903976,
    pid: 1,
    tid: 'cb8c0bb8-9160-4c7a-8b58-33c1b4036fe3'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 22103976,
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
    ts: 22203976,
    pid: 1,
    tid: 'cb8c0bb8-9160-4c7a-8b58-33c1b4036fe3'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 22403975,
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
    ts: 23204974,
    pid: 1,
    tid: '6b7209f0-40dc-4b54-97ed-428b42bec195'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 24204973,
    pid: 1,
    tid: '6b7209f0-40dc-4b54-97ed-428b42bec195'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 24604972,
    pid: 1,
    tid: '6b7209f0-40dc-4b54-97ed-428b42bec195'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 26404971,
    pid: 1,
    tid: '6b7209f0-40dc-4b54-97ed-428b42bec195'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 26404971,
    pid: 1,
    tid: '6b7209f0-40dc-4b54-97ed-428b42bec195'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 27404970,
    pid: 1,
    tid: '6b7209f0-40dc-4b54-97ed-428b42bec195'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 28104970,
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
    ts: 28304969,
    pid: 1,
    tid: '6b7209f0-40dc-4b54-97ed-428b42bec195'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 28504969,
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
    ts: 29305967,
    pid: 1,
    tid: 'f75cf56f-9c31-4e8d-8a69-3b0ee6a4b75c'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 30305966,
    pid: 1,
    tid: 'f75cf56f-9c31-4e8d-8a69-3b0ee6a4b75c'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 30705965,
    pid: 1,
    tid: 'f75cf56f-9c31-4e8d-8a69-3b0ee6a4b75c'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 32305964,
    pid: 1,
    tid: 'f75cf56f-9c31-4e8d-8a69-3b0ee6a4b75c'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 32405964,
    pid: 1,
    tid: 'f75cf56f-9c31-4e8d-8a69-3b0ee6a4b75c'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 33005964,
    pid: 1,
    tid: 'f75cf56f-9c31-4e8d-8a69-3b0ee6a4b75c'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 33005964,
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
    ts: 33105963,
    pid: 1,
    tid: 'f75cf56f-9c31-4e8d-8a69-3b0ee6a4b75c'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 33305963,
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
    ts: 34106963,
    pid: 1,
    tid: '248ddbf8-899c-444f-8680-6c1844225302'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 35306961,
    pid: 1,
    tid: '248ddbf8-899c-444f-8680-6c1844225302'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 35806960,
    pid: 1,
    tid: '248ddbf8-899c-444f-8680-6c1844225302'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 37006960,
    pid: 1,
    tid: '248ddbf8-899c-444f-8680-6c1844225302'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 37006960,
    pid: 1,
    tid: '248ddbf8-899c-444f-8680-6c1844225302'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 37606960,
    pid: 1,
    tid: '248ddbf8-899c-444f-8680-6c1844225302'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 37706959,
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
    ts: 37806959,
    pid: 1,
    tid: '248ddbf8-899c-444f-8680-6c1844225302'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 37906959,
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
    ts: 38707957,
    pid: 1,
    tid: 'd5338aa4-41c4-42b7-918a-05e89bd986f2'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 40007955,
    pid: 1,
    tid: 'd5338aa4-41c4-42b7-918a-05e89bd986f2'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 40507954,
    pid: 1,
    tid: 'd5338aa4-41c4-42b7-918a-05e89bd986f2'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 41807954,
    pid: 1,
    tid: 'd5338aa4-41c4-42b7-918a-05e89bd986f2'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 41907954,
    pid: 1,
    tid: 'd5338aa4-41c4-42b7-918a-05e89bd986f2'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 42507953,
    pid: 1,
    tid: 'd5338aa4-41c4-42b7-918a-05e89bd986f2'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 42507953,
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
    ts: 42607953,
    pid: 1,
    tid: 'd5338aa4-41c4-42b7-918a-05e89bd986f2'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 42807953,
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
    ts: 43708952,
    pid: 1,
    tid: '9548dc76-91b2-43b5-abb8-3ce5269260f4'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 44808951,
    pid: 1,
    tid: '9548dc76-91b2-43b5-abb8-3ce5269260f4'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 45308950,
    pid: 1,
    tid: '9548dc76-91b2-43b5-abb8-3ce5269260f4'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 46908948,
    pid: 1,
    tid: '9548dc76-91b2-43b5-abb8-3ce5269260f4'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 47008948,
    pid: 1,
    tid: '9548dc76-91b2-43b5-abb8-3ce5269260f4'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 47708948,
    pid: 1,
    tid: '9548dc76-91b2-43b5-abb8-3ce5269260f4'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 47808948,
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
    ts: 48008947,
    pid: 1,
    tid: '9548dc76-91b2-43b5-abb8-3ce5269260f4'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 48108947,
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
    ts: 48509946,
    pid: 1,
    tid: '9c1c59df-84dd-43fb-ada4-650895040465'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 49009945,
    pid: 1,
    tid: '9c1c59df-84dd-43fb-ada4-650895040465'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 49109945,
    pid: 1,
    tid: '9c1c59df-84dd-43fb-ada4-650895040465'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 50009944,
    pid: 1,
    tid: '9c1c59df-84dd-43fb-ada4-650895040465'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 50109944,
    pid: 1,
    tid: '9c1c59df-84dd-43fb-ada4-650895040465'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 50509943,
    pid: 1,
    tid: '9c1c59df-84dd-43fb-ada4-650895040465'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 50509943,
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
    ts: 50609943,
    pid: 1,
    tid: '9c1c59df-84dd-43fb-ada4-650895040465'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 50709943,
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
    ts: 51010943,
    pid: 1,
    tid: 'c060efe9-9e02-48a8-a8b2-5bf5fd8e1380'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 51410992,
    pid: 1,
    tid: 'c060efe9-9e02-48a8-a8b2-5bf5fd8e1380'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 51610942,
    pid: 1,
    tid: 'c060efe9-9e02-48a8-a8b2-5bf5fd8e1380'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 52110941,
    pid: 1,
    tid: 'c060efe9-9e02-48a8-a8b2-5bf5fd8e1380'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 52210940,
    pid: 1,
    tid: 'c060efe9-9e02-48a8-a8b2-5bf5fd8e1380'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 52510940,
    pid: 1,
    tid: 'c060efe9-9e02-48a8-a8b2-5bf5fd8e1380'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 52510940,
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
    ts: 52510940,
    pid: 1,
    tid: 'c060efe9-9e02-48a8-a8b2-5bf5fd8e1380'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 52710939,
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
    ts: 53311938,
    pid: 1,
    tid: '611d04a0-6f1e-41fb-8d40-e8c2d8d27242'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 53911937,
    pid: 1,
    tid: '611d04a0-6f1e-41fb-8d40-e8c2d8d27242'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 54111936,
    pid: 1,
    tid: '611d04a0-6f1e-41fb-8d40-e8c2d8d27242'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 55211935,
    pid: 1,
    tid: '611d04a0-6f1e-41fb-8d40-e8c2d8d27242'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 55311935,
    pid: 1,
    tid: '611d04a0-6f1e-41fb-8d40-e8c2d8d27242'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 55711934,
    pid: 1,
    tid: '611d04a0-6f1e-41fb-8d40-e8c2d8d27242'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 55911934,
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
    ts: 56011933,
    pid: 1,
    tid: '611d04a0-6f1e-41fb-8d40-e8c2d8d27242'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 56111933,
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
    ts: 56612932,
    pid: 1,
    tid: '066886db-4022-44bb-9ae0-5f3e25243334'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 57712931,
    pid: 1,
    tid: '066886db-4022-44bb-9ae0-5f3e25243334'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 58012930,
    pid: 1,
    tid: '066886db-4022-44bb-9ae0-5f3e25243334'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 58812929,
    pid: 1,
    tid: '066886db-4022-44bb-9ae0-5f3e25243334'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 58912929,
    pid: 1,
    tid: '066886db-4022-44bb-9ae0-5f3e25243334'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 59412928,
    pid: 1,
    tid: '066886db-4022-44bb-9ae0-5f3e25243334'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 59512928,
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
    ts: 59612928,
    pid: 1,
    tid: '066886db-4022-44bb-9ae0-5f3e25243334'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 59712928,
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
    ts: 59912927,
    pid: 1,
    tid: '2c4a0ad0-e4da-4dc7-bed8-88989d8ee659'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 60812926,
    pid: 1,
    tid: '2c4a0ad0-e4da-4dc7-bed8-88989d8ee659'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 61012926,
    pid: 1,
    tid: '2c4a0ad0-e4da-4dc7-bed8-88989d8ee659'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 61812925,
    pid: 1,
    tid: '2c4a0ad0-e4da-4dc7-bed8-88989d8ee659'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 61812925,
    pid: 1,
    tid: '2c4a0ad0-e4da-4dc7-bed8-88989d8ee659'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 62212925,
    pid: 1,
    tid: '2c4a0ad0-e4da-4dc7-bed8-88989d8ee659'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 62312924,
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
    ts: 62412924,
    pid: 1,
    tid: '2c4a0ad0-e4da-4dc7-bed8-88989d8ee659'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 62512924,
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
    ts: 62712924,
    pid: 1,
    tid: '22f1190b-83c8-43f5-957e-3aee0f18cec7'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 63012973,
    pid: 1,
    tid: '22f1190b-83c8-43f5-957e-3aee0f18cec7'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 63312922,
    pid: 1,
    tid: '22f1190b-83c8-43f5-957e-3aee0f18cec7'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 64012921,
    pid: 1,
    tid: '22f1190b-83c8-43f5-957e-3aee0f18cec7'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 64112921,
    pid: 1,
    tid: '22f1190b-83c8-43f5-957e-3aee0f18cec7'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 64512920,
    pid: 1,
    tid: '22f1190b-83c8-43f5-957e-3aee0f18cec7'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 64712920,
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
    ts: 64912919,
    pid: 1,
    tid: '22f1190b-83c8-43f5-957e-3aee0f18cec7'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 65112919,
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
    ts: 65613918,
    pid: 1,
    tid: '84e44fe8-075f-4449-9f06-2c760c07065d'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 66413917,
    pid: 1,
    tid: '84e44fe8-075f-4449-9f06-2c760c07065d'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 66613916,
    pid: 1,
    tid: '84e44fe8-075f-4449-9f06-2c760c07065d'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 67913915,
    pid: 1,
    tid: '84e44fe8-075f-4449-9f06-2c760c07065d'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 68013915,
    pid: 1,
    tid: '84e44fe8-075f-4449-9f06-2c760c07065d'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 68413914,
    pid: 1,
    tid: '84e44fe8-075f-4449-9f06-2c760c07065d'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 68513914,
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
    ts: 68613913,
    pid: 1,
    tid: '84e44fe8-075f-4449-9f06-2c760c07065d'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 68813913,
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
    ts: 69013913,
    pid: 1,
    tid: '5402980a-a649-41e2-92da-c73354f1956e'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 69313962,
    pid: 1,
    tid: '5402980a-a649-41e2-92da-c73354f1956e'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 69513912,
    pid: 1,
    tid: '5402980a-a649-41e2-92da-c73354f1956e'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 70313911,
    pid: 1,
    tid: '5402980a-a649-41e2-92da-c73354f1956e'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 70313911,
    pid: 1,
    tid: '5402980a-a649-41e2-92da-c73354f1956e'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 70713910,
    pid: 1,
    tid: '5402980a-a649-41e2-92da-c73354f1956e'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 70713910,
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
    ts: 70813910,
    pid: 1,
    tid: '5402980a-a649-41e2-92da-c73354f1956e'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 71013910,
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
    ts: 71514909,
    pid: 1,
    tid: 'f788df6a-64f9-490f-b4cd-60fc1f187a92'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 72314907,
    pid: 1,
    tid: 'f788df6a-64f9-490f-b4cd-60fc1f187a92'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 72714906,
    pid: 1,
    tid: 'f788df6a-64f9-490f-b4cd-60fc1f187a92'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 73514905,
    pid: 1,
    tid: 'f788df6a-64f9-490f-b4cd-60fc1f187a92'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 73614905,
    pid: 1,
    tid: 'f788df6a-64f9-490f-b4cd-60fc1f187a92'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 74014904,
    pid: 1,
    tid: 'f788df6a-64f9-490f-b4cd-60fc1f187a92'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 74414903,
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
    ts: 74614903,
    pid: 1,
    tid: 'f788df6a-64f9-490f-b4cd-60fc1f187a92'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 74814902,
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
    ts: 75014902,
    pid: 1,
    tid: '93077326-676f-451e-b7ae-c4750b6efc37'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 75514901,
    pid: 1,
    tid: '93077326-676f-451e-b7ae-c4750b6efc37'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 75714900,
    pid: 1,
    tid: '93077326-676f-451e-b7ae-c4750b6efc37'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 76314899,
    pid: 1,
    tid: '93077326-676f-451e-b7ae-c4750b6efc37'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 76314899,
    pid: 1,
    tid: '93077326-676f-451e-b7ae-c4750b6efc37'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 76714898,
    pid: 1,
    tid: '93077326-676f-451e-b7ae-c4750b6efc37'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 76814898,
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
    ts: 76814898,
    pid: 1,
    tid: '93077326-676f-451e-b7ae-c4750b6efc37'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 76914898,
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
    ts: 77515897,
    pid: 1,
    tid: '6e42dd6e-5e52-4027-9b55-70aaa90f9083'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 78715895,
    pid: 1,
    tid: '6e42dd6e-5e52-4027-9b55-70aaa90f9083'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 79015895,
    pid: 1,
    tid: '6e42dd6e-5e52-4027-9b55-70aaa90f9083'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 79815893,
    pid: 1,
    tid: '6e42dd6e-5e52-4027-9b55-70aaa90f9083'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 79915893,
    pid: 1,
    tid: '6e42dd6e-5e52-4027-9b55-70aaa90f9083'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 80315892,
    pid: 1,
    tid: '6e42dd6e-5e52-4027-9b55-70aaa90f9083'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 80415892,
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
    ts: 80515892,
    pid: 1,
    tid: '6e42dd6e-5e52-4027-9b55-70aaa90f9083'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 80715891,
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
    ts: 81415941,
    pid: 1,
    tid: 'e81746cd-7525-4bcd-9ef2-db931314a3a5'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 81915890,
    pid: 1,
    tid: 'e81746cd-7525-4bcd-9ef2-db931314a3a5'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 82215889,
    pid: 1,
    tid: 'e81746cd-7525-4bcd-9ef2-db931314a3a5'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 82815888,
    pid: 1,
    tid: 'e81746cd-7525-4bcd-9ef2-db931314a3a5'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 82915888,
    pid: 1,
    tid: 'e81746cd-7525-4bcd-9ef2-db931314a3a5'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 83215887,
    pid: 1,
    tid: 'e81746cd-7525-4bcd-9ef2-db931314a3a5'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 83315887,
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
    ts: 83415887,
    pid: 1,
    tid: 'e81746cd-7525-4bcd-9ef2-db931314a3a5'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 83615887,
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
    ts: 83715886,
    pid: 1,
    tid: 'b14253ec-739f-47e5-b6a9-8dec26932779'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 84215885,
    pid: 1,
    tid: 'b14253ec-739f-47e5-b6a9-8dec26932779'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 84915884,
    pid: 1,
    tid: 'b14253ec-739f-47e5-b6a9-8dec26932779'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 85515883,
    pid: 1,
    tid: 'b14253ec-739f-47e5-b6a9-8dec26932779'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 85715882,
    pid: 1,
    tid: 'b14253ec-739f-47e5-b6a9-8dec26932779'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 86015882,
    pid: 1,
    tid: 'b14253ec-739f-47e5-b6a9-8dec26932779'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 86115882,
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
    ts: 86215881,
    pid: 1,
    tid: 'b14253ec-739f-47e5-b6a9-8dec26932779'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 86415881,
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
    ts: 87116880,
    pid: 1,
    tid: '2708bcec-7f5b-442b-8ff1-025e70a0b9d4'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 88116878,
    pid: 1,
    tid: '2708bcec-7f5b-442b-8ff1-025e70a0b9d4'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 88416877,
    pid: 1,
    tid: '2708bcec-7f5b-442b-8ff1-025e70a0b9d4'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 89316877,
    pid: 1,
    tid: '2708bcec-7f5b-442b-8ff1-025e70a0b9d4'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 89416876,
    pid: 1,
    tid: '2708bcec-7f5b-442b-8ff1-025e70a0b9d4'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 89816876,
    pid: 1,
    tid: '2708bcec-7f5b-442b-8ff1-025e70a0b9d4'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 89916875,
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
    ts: 90616875,
    pid: 1,
    tid: '2708bcec-7f5b-442b-8ff1-025e70a0b9d4'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 90716875,
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
    ts: 91016874,
    pid: 1,
    tid: '7d2e8190-3524-4709-9dd7-4618af3895a0'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 91616873,
    pid: 1,
    tid: '7d2e8190-3524-4709-9dd7-4618af3895a0'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 91816873,
    pid: 1,
    tid: '7d2e8190-3524-4709-9dd7-4618af3895a0'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 92616872,
    pid: 1,
    tid: '7d2e8190-3524-4709-9dd7-4618af3895a0'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 92716872,
    pid: 1,
    tid: '7d2e8190-3524-4709-9dd7-4618af3895a0'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 93116871,
    pid: 1,
    tid: '7d2e8190-3524-4709-9dd7-4618af3895a0'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 93116871,
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
    ts: 93216871,
    pid: 1,
    tid: '7d2e8190-3524-4709-9dd7-4618af3895a0'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 93316871,
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
    ts: 93917869,
    pid: 1,
    tid: '8c276680-0931-40d4-8d74-da70881f4f38'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 94717868,
    pid: 1,
    tid: '8c276680-0931-40d4-8d74-da70881f4f38'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 95117867,
    pid: 1,
    tid: '8c276680-0931-40d4-8d74-da70881f4f38'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 96017866,
    pid: 1,
    tid: '8c276680-0931-40d4-8d74-da70881f4f38'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 96017866,
    pid: 1,
    tid: '8c276680-0931-40d4-8d74-da70881f4f38'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 96517865,
    pid: 1,
    tid: '8c276680-0931-40d4-8d74-da70881f4f38'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 96617865,
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
    ts: 96817865,
    pid: 1,
    tid: '8c276680-0931-40d4-8d74-da70881f4f38'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 97317865,
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
    ts: 97617864,
    pid: 1,
    tid: 'f1ed0ba7-af11-42e5-9175-53a4fcdc5f64'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 98117863,
    pid: 1,
    tid: 'f1ed0ba7-af11-42e5-9175-53a4fcdc5f64'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 98417862,
    pid: 1,
    tid: 'f1ed0ba7-af11-42e5-9175-53a4fcdc5f64'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 99217861,
    pid: 1,
    tid: 'f1ed0ba7-af11-42e5-9175-53a4fcdc5f64'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 99317861,
    pid: 1,
    tid: 'f1ed0ba7-af11-42e5-9175-53a4fcdc5f64'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 99717860,
    pid: 1,
    tid: 'f1ed0ba7-af11-42e5-9175-53a4fcdc5f64'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 99817860,
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
    ts: 99917859,
    pid: 1,
    tid: 'f1ed0ba7-af11-42e5-9175-53a4fcdc5f64'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 100017859,
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
    ts: 100518858,
    pid: 1,
    tid: 'f64f32b8-01d1-4473-ba13-cb8cb9424963'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 101518856,
    pid: 1,
    tid: 'f64f32b8-01d1-4473-ba13-cb8cb9424963'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 101918856,
    pid: 1,
    tid: 'f64f32b8-01d1-4473-ba13-cb8cb9424963'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 102818855,
    pid: 1,
    tid: 'f64f32b8-01d1-4473-ba13-cb8cb9424963'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 102918855,
    pid: 1,
    tid: 'f64f32b8-01d1-4473-ba13-cb8cb9424963'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 103718854,
    pid: 1,
    tid: 'f64f32b8-01d1-4473-ba13-cb8cb9424963'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 103918854,
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
    ts: 104118853,
    pid: 1,
    tid: 'f64f32b8-01d1-4473-ba13-cb8cb9424963'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 104318853,
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
    ts: 104418903,
    pid: 1,
    tid: '7518d1ae-e5ac-4a42-8a5e-8ba08632db82'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 105018851,
    pid: 1,
    tid: '7518d1ae-e5ac-4a42-8a5e-8ba08632db82'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 105418851,
    pid: 1,
    tid: '7518d1ae-e5ac-4a42-8a5e-8ba08632db82'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 106118849,
    pid: 1,
    tid: '7518d1ae-e5ac-4a42-8a5e-8ba08632db82'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 106218849,
    pid: 1,
    tid: '7518d1ae-e5ac-4a42-8a5e-8ba08632db82'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 106518848,
    pid: 1,
    tid: '7518d1ae-e5ac-4a42-8a5e-8ba08632db82'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 106618848,
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
    ts: 107118848,
    pid: 1,
    tid: '7518d1ae-e5ac-4a42-8a5e-8ba08632db82'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 107318848,
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
    ts: 107518847,
    pid: 1,
    tid: '7bc6222a-e631-40c1-83d9-df29cb1db7f1'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 108118846,
    pid: 1,
    tid: '7bc6222a-e631-40c1-83d9-df29cb1db7f1'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 108318846,
    pid: 1,
    tid: '7bc6222a-e631-40c1-83d9-df29cb1db7f1'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 109318845,
    pid: 1,
    tid: '7bc6222a-e631-40c1-83d9-df29cb1db7f1'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 109318845,
    pid: 1,
    tid: '7bc6222a-e631-40c1-83d9-df29cb1db7f1'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 109618844,
    pid: 1,
    tid: '7bc6222a-e631-40c1-83d9-df29cb1db7f1'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 109818844,
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
    ts: 110018843,
    pid: 1,
    tid: '7bc6222a-e631-40c1-83d9-df29cb1db7f1'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 110218843,
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
    ts: 110819841,
    pid: 1,
    tid: 'd9395484-b9cb-49ca-8249-38171f2a78c1'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 112319838,
    pid: 1,
    tid: 'd9395484-b9cb-49ca-8249-38171f2a78c1'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 112719838,
    pid: 1,
    tid: 'd9395484-b9cb-49ca-8249-38171f2a78c1'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 113819836,
    pid: 1,
    tid: 'd9395484-b9cb-49ca-8249-38171f2a78c1'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 113919836,
    pid: 1,
    tid: 'd9395484-b9cb-49ca-8249-38171f2a78c1'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 114319835,
    pid: 1,
    tid: 'd9395484-b9cb-49ca-8249-38171f2a78c1'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 114519835,
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
    ts: 114619835,
    pid: 1,
    tid: 'd9395484-b9cb-49ca-8249-38171f2a78c1'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 114719835,
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
    ts: 114919834,
    pid: 1,
    tid: '173cf74a-492c-448d-b863-3c031a239e0b'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 115419833,
    pid: 1,
    tid: '173cf74a-492c-448d-b863-3c031a239e0b'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 115919832,
    pid: 1,
    tid: '173cf74a-492c-448d-b863-3c031a239e0b'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 116619832,
    pid: 1,
    tid: '173cf74a-492c-448d-b863-3c031a239e0b'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 116819831,
    pid: 1,
    tid: '173cf74a-492c-448d-b863-3c031a239e0b'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 117019831,
    pid: 1,
    tid: '173cf74a-492c-448d-b863-3c031a239e0b'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 117119831,
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
    ts: 117219831,
    pid: 1,
    tid: '173cf74a-492c-448d-b863-3c031a239e0b'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 117319830,
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
    ts: 117519830,
    pid: 1,
    tid: '822299ae-933d-4275-90c1-2e6a0658173f'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 118119829,
    pid: 1,
    tid: '822299ae-933d-4275-90c1-2e6a0658173f'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 118419828,
    pid: 1,
    tid: '822299ae-933d-4275-90c1-2e6a0658173f'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 119019827,
    pid: 1,
    tid: '822299ae-933d-4275-90c1-2e6a0658173f'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 119219827,
    pid: 1,
    tid: '822299ae-933d-4275-90c1-2e6a0658173f'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 119519826,
    pid: 1,
    tid: '822299ae-933d-4275-90c1-2e6a0658173f'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 119619826,
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
    ts: 119819825,
    pid: 1,
    tid: '822299ae-933d-4275-90c1-2e6a0658173f'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 119919825,
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
    ts: 120219825,
    pid: 1,
    tid: 'fb14b8d4-44f4-4fbf-84eb-0c56a21c14ad'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 120619824,
    pid: 1,
    tid: 'fb14b8d4-44f4-4fbf-84eb-0c56a21c14ad'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 121519823,
    pid: 1,
    tid: 'fb14b8d4-44f4-4fbf-84eb-0c56a21c14ad'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 122319821,
    pid: 1,
    tid: 'fb14b8d4-44f4-4fbf-84eb-0c56a21c14ad'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 122419821,
    pid: 1,
    tid: 'fb14b8d4-44f4-4fbf-84eb-0c56a21c14ad'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 122719821,
    pid: 1,
    tid: 'fb14b8d4-44f4-4fbf-84eb-0c56a21c14ad'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 122719821,
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
    ts: 122919820,
    pid: 1,
    tid: 'fb14b8d4-44f4-4fbf-84eb-0c56a21c14ad'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 123119820,
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
    ts: 123720819,
    pid: 1,
    tid: 'd17eeacc-0d29-4c39-80c1-9f7e1ae111e5'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 124920817,
    pid: 1,
    tid: 'd17eeacc-0d29-4c39-80c1-9f7e1ae111e5'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 125320816,
    pid: 1,
    tid: 'd17eeacc-0d29-4c39-80c1-9f7e1ae111e5'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 126220815,
    pid: 1,
    tid: 'd17eeacc-0d29-4c39-80c1-9f7e1ae111e5'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 126320815,
    pid: 1,
    tid: 'd17eeacc-0d29-4c39-80c1-9f7e1ae111e5'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 126820814,
    pid: 1,
    tid: 'd17eeacc-0d29-4c39-80c1-9f7e1ae111e5'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 126820814,
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
    ts: 127020814,
    pid: 1,
    tid: 'd17eeacc-0d29-4c39-80c1-9f7e1ae111e5'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 127220813,
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
    ts: 127520813,
    pid: 1,
    tid: '4e49b3cb-aa28-4f7e-ae2d-9668c5a4dc6a'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 128120811,
    pid: 1,
    tid: '4e49b3cb-aa28-4f7e-ae2d-9668c5a4dc6a'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 128420811,
    pid: 1,
    tid: '4e49b3cb-aa28-4f7e-ae2d-9668c5a4dc6a'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 129120809,
    pid: 1,
    tid: '4e49b3cb-aa28-4f7e-ae2d-9668c5a4dc6a'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 129320809,
    pid: 1,
    tid: '4e49b3cb-aa28-4f7e-ae2d-9668c5a4dc6a'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 130320808,
    pid: 1,
    tid: '4e49b3cb-aa28-4f7e-ae2d-9668c5a4dc6a'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 130420808,
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
    ts: 130620807,
    pid: 1,
    tid: '4e49b3cb-aa28-4f7e-ae2d-9668c5a4dc6a'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 130820807,
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
    ts: 131321806,
    pid: 1,
    tid: 'ac4ddc8a-daa0-447a-bf52-2288ffc6bfc5'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 132721805,
    pid: 1,
    tid: 'ac4ddc8a-daa0-447a-bf52-2288ffc6bfc5'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 133221804,
    pid: 1,
    tid: 'ac4ddc8a-daa0-447a-bf52-2288ffc6bfc5'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 134221804,
    pid: 1,
    tid: 'ac4ddc8a-daa0-447a-bf52-2288ffc6bfc5'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 134321803,
    pid: 1,
    tid: 'ac4ddc8a-daa0-447a-bf52-2288ffc6bfc5'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 134821802,
    pid: 1,
    tid: 'ac4ddc8a-daa0-447a-bf52-2288ffc6bfc5'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 134921802,
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
    ts: 135121802,
    pid: 1,
    tid: 'ac4ddc8a-daa0-447a-bf52-2288ffc6bfc5'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 135321801,
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
    ts: 135621801,
    pid: 1,
    tid: '6e8876e7-1b85-4b4a-a748-28c4df1c903e'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 136721800,
    pid: 1,
    tid: '6e8876e7-1b85-4b4a-a748-28c4df1c903e'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 137021799,
    pid: 1,
    tid: '6e8876e7-1b85-4b4a-a748-28c4df1c903e'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 137621798,
    pid: 1,
    tid: '6e8876e7-1b85-4b4a-a748-28c4df1c903e'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 137721798,
    pid: 1,
    tid: '6e8876e7-1b85-4b4a-a748-28c4df1c903e'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 138021797,
    pid: 1,
    tid: '6e8876e7-1b85-4b4a-a748-28c4df1c903e'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 138121797,
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
    ts: 138221797,
    pid: 1,
    tid: '6e8876e7-1b85-4b4a-a748-28c4df1c903e'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 138421796,
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
    ts: 138821795,
    pid: 1,
    tid: '948f31e6-87ed-480f-a368-eb542b70864c'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 139421794,
    pid: 1,
    tid: '948f31e6-87ed-480f-a368-eb542b70864c'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 139621794,
    pid: 1,
    tid: '948f31e6-87ed-480f-a368-eb542b70864c'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 140921793,
    pid: 1,
    tid: '948f31e6-87ed-480f-a368-eb542b70864c'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 141121793,
    pid: 1,
    tid: '948f31e6-87ed-480f-a368-eb542b70864c'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 141421792,
    pid: 1,
    tid: '948f31e6-87ed-480f-a368-eb542b70864c'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 141521792,
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
    ts: 141621792,
    pid: 1,
    tid: '948f31e6-87ed-480f-a368-eb542b70864c'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 142021791,
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
    ts: 142522790,
    pid: 1,
    tid: 'bfbc168a-c901-4f77-98b7-b79538441b2a'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 143822787,
    pid: 1,
    tid: 'bfbc168a-c901-4f77-98b7-b79538441b2a'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 144122787,
    pid: 1,
    tid: 'bfbc168a-c901-4f77-98b7-b79538441b2a'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 145022786,
    pid: 1,
    tid: 'bfbc168a-c901-4f77-98b7-b79538441b2a'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 145222785,
    pid: 1,
    tid: 'bfbc168a-c901-4f77-98b7-b79538441b2a'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 145622785,
    pid: 1,
    tid: 'bfbc168a-c901-4f77-98b7-b79538441b2a'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 145722784,
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
    ts: 145922784,
    pid: 1,
    tid: 'bfbc168a-c901-4f77-98b7-b79538441b2a'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 146122784,
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
    ts: 146422783,
    pid: 1,
    tid: '43698352-168b-4c02-9310-af259b5d2d3e'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 147522782,
    pid: 1,
    tid: '43698352-168b-4c02-9310-af259b5d2d3e'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 147922781,
    pid: 1,
    tid: '43698352-168b-4c02-9310-af259b5d2d3e'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 148822780,
    pid: 1,
    tid: '43698352-168b-4c02-9310-af259b5d2d3e'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 148922780,
    pid: 1,
    tid: '43698352-168b-4c02-9310-af259b5d2d3e'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 149322779,
    pid: 1,
    tid: '43698352-168b-4c02-9310-af259b5d2d3e'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 149522779,
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
    ts: 149622779,
    pid: 1,
    tid: '43698352-168b-4c02-9310-af259b5d2d3e'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 149722778,
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
    ts: 149922778,
    pid: 1,
    tid: '88a931f7-5322-4c65-b4a2-516f614ef6e1'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 150622777,
    pid: 1,
    tid: '88a931f7-5322-4c65-b4a2-516f614ef6e1'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 150822776,
    pid: 1,
    tid: '88a931f7-5322-4c65-b4a2-516f614ef6e1'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 151622775,
    pid: 1,
    tid: '88a931f7-5322-4c65-b4a2-516f614ef6e1'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 151722774,
    pid: 1,
    tid: '88a931f7-5322-4c65-b4a2-516f614ef6e1'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 152422774,
    pid: 1,
    tid: '88a931f7-5322-4c65-b4a2-516f614ef6e1'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 152622774,
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
    ts: 152722773,
    pid: 1,
    tid: '88a931f7-5322-4c65-b4a2-516f614ef6e1'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 152922773,
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
    ts: 153122773,
    pid: 1,
    tid: '2ea01f86-938c-4566-af8c-b55f67bb04a3'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 153622772,
    pid: 1,
    tid: '2ea01f86-938c-4566-af8c-b55f67bb04a3'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 153922771,
    pid: 1,
    tid: '2ea01f86-938c-4566-af8c-b55f67bb04a3'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 154522770,
    pid: 1,
    tid: '2ea01f86-938c-4566-af8c-b55f67bb04a3'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 154622770,
    pid: 1,
    tid: '2ea01f86-938c-4566-af8c-b55f67bb04a3'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 155122769,
    pid: 1,
    tid: '2ea01f86-938c-4566-af8c-b55f67bb04a3'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 155222768,
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
    ts: 155422768,
    pid: 1,
    tid: '2ea01f86-938c-4566-af8c-b55f67bb04a3'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 155522768,
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
    ts: 156223767,
    pid: 1,
    tid: '4b941271-093b-4ad0-ad23-254d3ab075f6'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 157423764,
    pid: 1,
    tid: '4b941271-093b-4ad0-ad23-254d3ab075f6'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 157723764,
    pid: 1,
    tid: '4b941271-093b-4ad0-ad23-254d3ab075f6'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 158723763,
    pid: 1,
    tid: '4b941271-093b-4ad0-ad23-254d3ab075f6'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 158823762,
    pid: 1,
    tid: '4b941271-093b-4ad0-ad23-254d3ab075f6'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 159323762,
    pid: 1,
    tid: '4b941271-093b-4ad0-ad23-254d3ab075f6'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 159323762,
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
    ts: 159523762,
    pid: 1,
    tid: '4b941271-093b-4ad0-ad23-254d3ab075f6'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 159723762,
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
    ts: 159923761,
    pid: 1,
    tid: 'e7383d61-8617-4c3c-a535-46b4eff294d1'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 160423760,
    pid: 1,
    tid: 'e7383d61-8617-4c3c-a535-46b4eff294d1'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 161123760,
    pid: 1,
    tid: 'e7383d61-8617-4c3c-a535-46b4eff294d1'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 161923759,
    pid: 1,
    tid: 'e7383d61-8617-4c3c-a535-46b4eff294d1'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 162023759,
    pid: 1,
    tid: 'e7383d61-8617-4c3c-a535-46b4eff294d1'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 162423758,
    pid: 1,
    tid: 'e7383d61-8617-4c3c-a535-46b4eff294d1'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 162523758,
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
    ts: 162723758,
    pid: 1,
    tid: 'e7383d61-8617-4c3c-a535-46b4eff294d1'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 162823757,
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
    ts: 163424756,
    pid: 1,
    tid: 'ec189f60-660f-4b2b-a0fb-0b587bf5caa2'
  },
  {
    name: 'resolve',
    cat: 'stage',
    ph: 'E',
    ts: 164224755,
    pid: 1,
    tid: 'ec189f60-660f-4b2b-a0fb-0b587bf5caa2'
  },
  {
    name: 'compute-merge',
    cat: 'stage',
    ph: 'E',
    ts: 164524754,
    pid: 1,
    tid: 'ec189f60-660f-4b2b-a0fb-0b587bf5caa2'
  },
  {
    name: 'persist',
    cat: 'stage',
    ph: 'E',
    ts: 165424753,
    pid: 1,
    tid: 'ec189f60-660f-4b2b-a0fb-0b587bf5caa2'
  },
  {
    name: 'merge',
    cat: 'lifecycle',
    ph: 'E',
    ts: 165624753,
    pid: 1,
    tid: 'ec189f60-660f-4b2b-a0fb-0b587bf5caa2'
  },
  {
    name: 'core-state',
    cat: 'stage',
    ph: 'E',
    ts: 166624752,
    pid: 1,
    tid: 'ec189f60-660f-4b2b-a0fb-0b587bf5caa2'
  },
  {
    name: 'success:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 166824751,
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
    ts: 166924751,
    pid: 1,
    tid: 'ec189f60-660f-4b2b-a0fb-0b587bf5caa2'
  },
  {
    name: 'finalize:notification (synthetic)',
    cat: 'lifecycle',
    ph: 'E',
    ts: 167124751,
    pid: 1,
    tid: 'ec189f60-660f-4b2b-a0fb-0b587bf5caa2',
    args: {
      synthetic: true,
      actualDurationMs: 0,
      note: 'Synthetic time span added for visualization'
    }
  }
];
