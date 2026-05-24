let CURRENT_TEST_NAME: string | undefined;
let CURRENT_TEST_FILE_NAME: string | undefined;

export function getCurrentTestName() {
  return CURRENT_TEST_NAME;
}

export function getCurrentTestFileName() {
  return CURRENT_TEST_FILE_NAME;
}

const originalConsoleInfo = console.info.bind(console);
console.info = (...args: unknown[]) => {
  const first = args[0];
  if (typeof first === 'string' && first.startsWith('[vault] License')) {
    return;
  }
  originalConsoleInfo(...args);
};

const originalConsoleError = console.error.bind(console);
console.error = (...args: unknown[]) => {
  const first = args[0];
  if (
    typeof first === 'string' &&
    (first.startsWith('[vault] License') || first.includes('License Denied'))
  ) {
    return;
  }
  originalConsoleError(...args);
};

const originalConsoleWarn = console.warn.bind(console);
console.warn = (...args: unknown[]) => {
  const first = args[0];
  if (typeof first === 'string' && first.startsWith('[vault] License')) {
    return;
  }
  originalConsoleWarn(...args);
};

jasmine.getEnv().addReporter({
  specStarted(result) {
    CURRENT_TEST_NAME = result.fullName;
    CURRENT_TEST_FILE_NAME = result.filename;
  },
  jasmineDone() {
    outputSnapshots();
  }
});

function outputSnapshots(): void {
  //eslint-disable-next-line
  const updates = (globalThis as any).__SNAPSHOT_UPDATES__;
  if (!updates?.length) return;

  //eslint-disable-next-line
  console.info(
    `SNAPSHOT_UPDATE_PAYLOAD_START::${JSON.stringify(updates, null, 2)}::SNAPSHOT_UPDATE_PAYLOAD_END`
  );
}

export function isUpdateSnapshotsEnabled(): boolean {
  //eslint-disable-next-line
  return Boolean(
    (window as any).__karma__?.config?.jasmine?.__UPDATE_SNAPSHOTS__
  );
}
