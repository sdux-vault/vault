/** Expected trace meta events used in test assertions. */
export const META_EVENTS_EXPECTED = [
  {
    name: 'process_name',
    ph: 'M',
    pid: 1,
    args: {
      name: 'SDUX Pipeline Debugger'
    }
  },
  {
    name: 'trace_scale',
    ph: 'M',
    pid: 1,
    args: {
      scale: 1
    }
  },
  {
    name: 'thread_name',
    ph: 'M',
    pid: 1,
    tid: '5ddc1e1c-4bd6-45d3-943e-75b69ef2dee5',
    args: {
      name: 'Pipeline 5ddc1e1c'
    }
  },
  {
    name: 'thread_sort_index',
    ph: 'M',
    pid: 1,
    tid: '5ddc1e1c-4bd6-45d3-943e-75b69ef2dee5',
    args: {
      sort_index: 0
    }
  },
  {
    name: 'thread_name',
    ph: 'M',
    pid: 1,
    tid: 'e27e81bf-37b7-40ad-98ba-7f0eb293a21e',
    args: {
      name: 'Pipeline e27e81bf'
    }
  },
  {
    name: 'thread_sort_index',
    ph: 'M',
    pid: 1,
    tid: 'e27e81bf-37b7-40ad-98ba-7f0eb293a21e',
    args: {
      sort_index: 1
    }
  },
  {
    name: 'thread_name',
    ph: 'M',
    pid: 1,
    tid: '54c6d994-1bcd-4043-a34e-fa32555301c3',
    args: {
      name: 'Pipeline 54c6d994'
    }
  },
  {
    name: 'thread_sort_index',
    ph: 'M',
    pid: 1,
    tid: '54c6d994-1bcd-4043-a34e-fa32555301c3',
    args: {
      sort_index: 2
    }
  },
  {
    name: 'thread_name',
    ph: 'M',
    pid: 1,
    tid: 'da5ac314-c0d5-4628-841f-2e7b5da3d8f7',
    args: {
      name: 'Pipeline da5ac314'
    }
  },
  {
    name: 'thread_sort_index',
    ph: 'M',
    pid: 1,
    tid: 'da5ac314-c0d5-4628-841f-2e7b5da3d8f7',
    args: {
      sort_index: 3
    }
  },
  {
    name: 'thread_name',
    ph: 'M',
    pid: 1,
    tid: 'cb8c0bb8-9160-4c7a-8b58-33c1b4036fe3',
    args: {
      name: 'Pipeline cb8c0bb8'
    }
  },
  {
    name: 'thread_sort_index',
    ph: 'M',
    pid: 1,
    tid: 'cb8c0bb8-9160-4c7a-8b58-33c1b4036fe3',
    args: {
      sort_index: 4
    }
  },
  {
    name: 'thread_name',
    ph: 'M',
    pid: 1,
    tid: '6b7209f0-40dc-4b54-97ed-428b42bec195',
    args: {
      name: 'Pipeline 6b7209f0'
    }
  },
  {
    name: 'thread_sort_index',
    ph: 'M',
    pid: 1,
    tid: '6b7209f0-40dc-4b54-97ed-428b42bec195',
    args: {
      sort_index: 5
    }
  },
  {
    name: 'thread_name',
    ph: 'M',
    pid: 1,
    tid: 'f75cf56f-9c31-4e8d-8a69-3b0ee6a4b75c',
    args: {
      name: 'Pipeline f75cf56f'
    }
  },
  {
    name: 'thread_sort_index',
    ph: 'M',
    pid: 1,
    tid: 'f75cf56f-9c31-4e8d-8a69-3b0ee6a4b75c',
    args: {
      sort_index: 6
    }
  },
  {
    name: 'thread_name',
    ph: 'M',
    pid: 1,
    tid: '248ddbf8-899c-444f-8680-6c1844225302',
    args: {
      name: 'Pipeline 248ddbf8'
    }
  },
  {
    name: 'thread_sort_index',
    ph: 'M',
    pid: 1,
    tid: '248ddbf8-899c-444f-8680-6c1844225302',
    args: {
      sort_index: 7
    }
  },
  {
    name: 'thread_name',
    ph: 'M',
    pid: 1,
    tid: 'd5338aa4-41c4-42b7-918a-05e89bd986f2',
    args: {
      name: 'Pipeline d5338aa4'
    }
  },
  {
    name: 'thread_sort_index',
    ph: 'M',
    pid: 1,
    tid: 'd5338aa4-41c4-42b7-918a-05e89bd986f2',
    args: {
      sort_index: 8
    }
  },
  {
    name: 'thread_name',
    ph: 'M',
    pid: 1,
    tid: '9548dc76-91b2-43b5-abb8-3ce5269260f4',
    args: {
      name: 'Pipeline 9548dc76'
    }
  },
  {
    name: 'thread_sort_index',
    ph: 'M',
    pid: 1,
    tid: '9548dc76-91b2-43b5-abb8-3ce5269260f4',
    args: {
      sort_index: 9
    }
  },
  {
    name: 'thread_name',
    ph: 'M',
    pid: 1,
    tid: '9c1c59df-84dd-43fb-ada4-650895040465',
    args: {
      name: 'Pipeline 9c1c59df'
    }
  },
  {
    name: 'thread_sort_index',
    ph: 'M',
    pid: 1,
    tid: '9c1c59df-84dd-43fb-ada4-650895040465',
    args: {
      sort_index: 10
    }
  },
  {
    name: 'thread_name',
    ph: 'M',
    pid: 1,
    tid: 'c060efe9-9e02-48a8-a8b2-5bf5fd8e1380',
    args: {
      name: 'Pipeline c060efe9'
    }
  },
  {
    name: 'thread_sort_index',
    ph: 'M',
    pid: 1,
    tid: 'c060efe9-9e02-48a8-a8b2-5bf5fd8e1380',
    args: {
      sort_index: 11
    }
  },
  {
    name: 'thread_name',
    ph: 'M',
    pid: 1,
    tid: '611d04a0-6f1e-41fb-8d40-e8c2d8d27242',
    args: {
      name: 'Pipeline 611d04a0'
    }
  },
  {
    name: 'thread_sort_index',
    ph: 'M',
    pid: 1,
    tid: '611d04a0-6f1e-41fb-8d40-e8c2d8d27242',
    args: {
      sort_index: 12
    }
  },
  {
    name: 'thread_name',
    ph: 'M',
    pid: 1,
    tid: '066886db-4022-44bb-9ae0-5f3e25243334',
    args: {
      name: 'Pipeline 066886db'
    }
  },
  {
    name: 'thread_sort_index',
    ph: 'M',
    pid: 1,
    tid: '066886db-4022-44bb-9ae0-5f3e25243334',
    args: {
      sort_index: 13
    }
  },
  {
    name: 'thread_name',
    ph: 'M',
    pid: 1,
    tid: '2c4a0ad0-e4da-4dc7-bed8-88989d8ee659',
    args: {
      name: 'Pipeline 2c4a0ad0'
    }
  },
  {
    name: 'thread_sort_index',
    ph: 'M',
    pid: 1,
    tid: '2c4a0ad0-e4da-4dc7-bed8-88989d8ee659',
    args: {
      sort_index: 14
    }
  },
  {
    name: 'thread_name',
    ph: 'M',
    pid: 1,
    tid: '22f1190b-83c8-43f5-957e-3aee0f18cec7',
    args: {
      name: 'Pipeline 22f1190b'
    }
  },
  {
    name: 'thread_sort_index',
    ph: 'M',
    pid: 1,
    tid: '22f1190b-83c8-43f5-957e-3aee0f18cec7',
    args: {
      sort_index: 15
    }
  },
  {
    name: 'thread_name',
    ph: 'M',
    pid: 1,
    tid: '84e44fe8-075f-4449-9f06-2c760c07065d',
    args: {
      name: 'Pipeline 84e44fe8'
    }
  },
  {
    name: 'thread_sort_index',
    ph: 'M',
    pid: 1,
    tid: '84e44fe8-075f-4449-9f06-2c760c07065d',
    args: {
      sort_index: 16
    }
  },
  {
    name: 'thread_name',
    ph: 'M',
    pid: 1,
    tid: '5402980a-a649-41e2-92da-c73354f1956e',
    args: {
      name: 'Pipeline 5402980a'
    }
  },
  {
    name: 'thread_sort_index',
    ph: 'M',
    pid: 1,
    tid: '5402980a-a649-41e2-92da-c73354f1956e',
    args: {
      sort_index: 17
    }
  },
  {
    name: 'thread_name',
    ph: 'M',
    pid: 1,
    tid: 'f788df6a-64f9-490f-b4cd-60fc1f187a92',
    args: {
      name: 'Pipeline f788df6a'
    }
  },
  {
    name: 'thread_sort_index',
    ph: 'M',
    pid: 1,
    tid: 'f788df6a-64f9-490f-b4cd-60fc1f187a92',
    args: {
      sort_index: 18
    }
  },
  {
    name: 'thread_name',
    ph: 'M',
    pid: 1,
    tid: '93077326-676f-451e-b7ae-c4750b6efc37',
    args: {
      name: 'Pipeline 93077326'
    }
  },
  {
    name: 'thread_sort_index',
    ph: 'M',
    pid: 1,
    tid: '93077326-676f-451e-b7ae-c4750b6efc37',
    args: {
      sort_index: 19
    }
  },
  {
    name: 'thread_name',
    ph: 'M',
    pid: 1,
    tid: '6e42dd6e-5e52-4027-9b55-70aaa90f9083',
    args: {
      name: 'Pipeline 6e42dd6e'
    }
  },
  {
    name: 'thread_sort_index',
    ph: 'M',
    pid: 1,
    tid: '6e42dd6e-5e52-4027-9b55-70aaa90f9083',
    args: {
      sort_index: 20
    }
  },
  {
    name: 'thread_name',
    ph: 'M',
    pid: 1,
    tid: 'e81746cd-7525-4bcd-9ef2-db931314a3a5',
    args: {
      name: 'Pipeline e81746cd'
    }
  },
  {
    name: 'thread_sort_index',
    ph: 'M',
    pid: 1,
    tid: 'e81746cd-7525-4bcd-9ef2-db931314a3a5',
    args: {
      sort_index: 21
    }
  },
  {
    name: 'thread_name',
    ph: 'M',
    pid: 1,
    tid: 'b14253ec-739f-47e5-b6a9-8dec26932779',
    args: {
      name: 'Pipeline b14253ec'
    }
  },
  {
    name: 'thread_sort_index',
    ph: 'M',
    pid: 1,
    tid: 'b14253ec-739f-47e5-b6a9-8dec26932779',
    args: {
      sort_index: 22
    }
  },
  {
    name: 'thread_name',
    ph: 'M',
    pid: 1,
    tid: '2708bcec-7f5b-442b-8ff1-025e70a0b9d4',
    args: {
      name: 'Pipeline 2708bcec'
    }
  },
  {
    name: 'thread_sort_index',
    ph: 'M',
    pid: 1,
    tid: '2708bcec-7f5b-442b-8ff1-025e70a0b9d4',
    args: {
      sort_index: 23
    }
  },
  {
    name: 'thread_name',
    ph: 'M',
    pid: 1,
    tid: '7d2e8190-3524-4709-9dd7-4618af3895a0',
    args: {
      name: 'Pipeline 7d2e8190'
    }
  },
  {
    name: 'thread_sort_index',
    ph: 'M',
    pid: 1,
    tid: '7d2e8190-3524-4709-9dd7-4618af3895a0',
    args: {
      sort_index: 24
    }
  },
  {
    name: 'thread_name',
    ph: 'M',
    pid: 1,
    tid: '8c276680-0931-40d4-8d74-da70881f4f38',
    args: {
      name: 'Pipeline 8c276680'
    }
  },
  {
    name: 'thread_sort_index',
    ph: 'M',
    pid: 1,
    tid: '8c276680-0931-40d4-8d74-da70881f4f38',
    args: {
      sort_index: 25
    }
  },
  {
    name: 'thread_name',
    ph: 'M',
    pid: 1,
    tid: 'f1ed0ba7-af11-42e5-9175-53a4fcdc5f64',
    args: {
      name: 'Pipeline f1ed0ba7'
    }
  },
  {
    name: 'thread_sort_index',
    ph: 'M',
    pid: 1,
    tid: 'f1ed0ba7-af11-42e5-9175-53a4fcdc5f64',
    args: {
      sort_index: 26
    }
  },
  {
    name: 'thread_name',
    ph: 'M',
    pid: 1,
    tid: 'f64f32b8-01d1-4473-ba13-cb8cb9424963',
    args: {
      name: 'Pipeline f64f32b8'
    }
  },
  {
    name: 'thread_sort_index',
    ph: 'M',
    pid: 1,
    tid: 'f64f32b8-01d1-4473-ba13-cb8cb9424963',
    args: {
      sort_index: 27
    }
  },
  {
    name: 'thread_name',
    ph: 'M',
    pid: 1,
    tid: '7518d1ae-e5ac-4a42-8a5e-8ba08632db82',
    args: {
      name: 'Pipeline 7518d1ae'
    }
  },
  {
    name: 'thread_sort_index',
    ph: 'M',
    pid: 1,
    tid: '7518d1ae-e5ac-4a42-8a5e-8ba08632db82',
    args: {
      sort_index: 28
    }
  },
  {
    name: 'thread_name',
    ph: 'M',
    pid: 1,
    tid: '7bc6222a-e631-40c1-83d9-df29cb1db7f1',
    args: {
      name: 'Pipeline 7bc6222a'
    }
  },
  {
    name: 'thread_sort_index',
    ph: 'M',
    pid: 1,
    tid: '7bc6222a-e631-40c1-83d9-df29cb1db7f1',
    args: {
      sort_index: 29
    }
  },
  {
    name: 'thread_name',
    ph: 'M',
    pid: 1,
    tid: 'd9395484-b9cb-49ca-8249-38171f2a78c1',
    args: {
      name: 'Pipeline d9395484'
    }
  },
  {
    name: 'thread_sort_index',
    ph: 'M',
    pid: 1,
    tid: 'd9395484-b9cb-49ca-8249-38171f2a78c1',
    args: {
      sort_index: 30
    }
  },
  {
    name: 'thread_name',
    ph: 'M',
    pid: 1,
    tid: '173cf74a-492c-448d-b863-3c031a239e0b',
    args: {
      name: 'Pipeline 173cf74a'
    }
  },
  {
    name: 'thread_sort_index',
    ph: 'M',
    pid: 1,
    tid: '173cf74a-492c-448d-b863-3c031a239e0b',
    args: {
      sort_index: 31
    }
  },
  {
    name: 'thread_name',
    ph: 'M',
    pid: 1,
    tid: '822299ae-933d-4275-90c1-2e6a0658173f',
    args: {
      name: 'Pipeline 822299ae'
    }
  },
  {
    name: 'thread_sort_index',
    ph: 'M',
    pid: 1,
    tid: '822299ae-933d-4275-90c1-2e6a0658173f',
    args: {
      sort_index: 32
    }
  },
  {
    name: 'thread_name',
    ph: 'M',
    pid: 1,
    tid: 'fb14b8d4-44f4-4fbf-84eb-0c56a21c14ad',
    args: {
      name: 'Pipeline fb14b8d4'
    }
  },
  {
    name: 'thread_sort_index',
    ph: 'M',
    pid: 1,
    tid: 'fb14b8d4-44f4-4fbf-84eb-0c56a21c14ad',
    args: {
      sort_index: 33
    }
  },
  {
    name: 'thread_name',
    ph: 'M',
    pid: 1,
    tid: 'd17eeacc-0d29-4c39-80c1-9f7e1ae111e5',
    args: {
      name: 'Pipeline d17eeacc'
    }
  },
  {
    name: 'thread_sort_index',
    ph: 'M',
    pid: 1,
    tid: 'd17eeacc-0d29-4c39-80c1-9f7e1ae111e5',
    args: {
      sort_index: 34
    }
  },
  {
    name: 'thread_name',
    ph: 'M',
    pid: 1,
    tid: '4e49b3cb-aa28-4f7e-ae2d-9668c5a4dc6a',
    args: {
      name: 'Pipeline 4e49b3cb'
    }
  },
  {
    name: 'thread_sort_index',
    ph: 'M',
    pid: 1,
    tid: '4e49b3cb-aa28-4f7e-ae2d-9668c5a4dc6a',
    args: {
      sort_index: 35
    }
  },
  {
    name: 'thread_name',
    ph: 'M',
    pid: 1,
    tid: 'ac4ddc8a-daa0-447a-bf52-2288ffc6bfc5',
    args: {
      name: 'Pipeline ac4ddc8a'
    }
  },
  {
    name: 'thread_sort_index',
    ph: 'M',
    pid: 1,
    tid: 'ac4ddc8a-daa0-447a-bf52-2288ffc6bfc5',
    args: {
      sort_index: 36
    }
  },
  {
    name: 'thread_name',
    ph: 'M',
    pid: 1,
    tid: '6e8876e7-1b85-4b4a-a748-28c4df1c903e',
    args: {
      name: 'Pipeline 6e8876e7'
    }
  },
  {
    name: 'thread_sort_index',
    ph: 'M',
    pid: 1,
    tid: '6e8876e7-1b85-4b4a-a748-28c4df1c903e',
    args: {
      sort_index: 37
    }
  },
  {
    name: 'thread_name',
    ph: 'M',
    pid: 1,
    tid: '948f31e6-87ed-480f-a368-eb542b70864c',
    args: {
      name: 'Pipeline 948f31e6'
    }
  },
  {
    name: 'thread_sort_index',
    ph: 'M',
    pid: 1,
    tid: '948f31e6-87ed-480f-a368-eb542b70864c',
    args: {
      sort_index: 38
    }
  },
  {
    name: 'thread_name',
    ph: 'M',
    pid: 1,
    tid: 'bfbc168a-c901-4f77-98b7-b79538441b2a',
    args: {
      name: 'Pipeline bfbc168a'
    }
  },
  {
    name: 'thread_sort_index',
    ph: 'M',
    pid: 1,
    tid: 'bfbc168a-c901-4f77-98b7-b79538441b2a',
    args: {
      sort_index: 39
    }
  },
  {
    name: 'thread_name',
    ph: 'M',
    pid: 1,
    tid: '43698352-168b-4c02-9310-af259b5d2d3e',
    args: {
      name: 'Pipeline 43698352'
    }
  },
  {
    name: 'thread_sort_index',
    ph: 'M',
    pid: 1,
    tid: '43698352-168b-4c02-9310-af259b5d2d3e',
    args: {
      sort_index: 40
    }
  },
  {
    name: 'thread_name',
    ph: 'M',
    pid: 1,
    tid: '88a931f7-5322-4c65-b4a2-516f614ef6e1',
    args: {
      name: 'Pipeline 88a931f7'
    }
  },
  {
    name: 'thread_sort_index',
    ph: 'M',
    pid: 1,
    tid: '88a931f7-5322-4c65-b4a2-516f614ef6e1',
    args: {
      sort_index: 41
    }
  },
  {
    name: 'thread_name',
    ph: 'M',
    pid: 1,
    tid: '2ea01f86-938c-4566-af8c-b55f67bb04a3',
    args: {
      name: 'Pipeline 2ea01f86'
    }
  },
  {
    name: 'thread_sort_index',
    ph: 'M',
    pid: 1,
    tid: '2ea01f86-938c-4566-af8c-b55f67bb04a3',
    args: {
      sort_index: 42
    }
  },
  {
    name: 'thread_name',
    ph: 'M',
    pid: 1,
    tid: '4b941271-093b-4ad0-ad23-254d3ab075f6',
    args: {
      name: 'Pipeline 4b941271'
    }
  },
  {
    name: 'thread_sort_index',
    ph: 'M',
    pid: 1,
    tid: '4b941271-093b-4ad0-ad23-254d3ab075f6',
    args: {
      sort_index: 43
    }
  },
  {
    name: 'thread_name',
    ph: 'M',
    pid: 1,
    tid: 'e7383d61-8617-4c3c-a535-46b4eff294d1',
    args: {
      name: 'Pipeline e7383d61'
    }
  },
  {
    name: 'thread_sort_index',
    ph: 'M',
    pid: 1,
    tid: 'e7383d61-8617-4c3c-a535-46b4eff294d1',
    args: {
      sort_index: 44
    }
  },
  {
    name: 'thread_name',
    ph: 'M',
    pid: 1,
    tid: 'ec189f60-660f-4b2b-a0fb-0b587bf5caa2',
    args: {
      name: 'Pipeline ec189f60'
    }
  },
  {
    name: 'thread_sort_index',
    ph: 'M',
    pid: 1,
    tid: 'ec189f60-660f-4b2b-a0fb-0b587bf5caa2',
    args: {
      sort_index: 45
    }
  }
];
