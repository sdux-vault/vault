import {
  getCurrentTestFileName,
  getCurrentTestName,
  isUpdateSnapshotsEnabled
} from '../../../testing/jasmine-setup';

const UNDEFINED = '__VAULT_UNDEFINED__';

// eslint-disable-next-line
function encodeUndefined(obj: any): any {
  if (Array.isArray(obj)) return obj.map(encodeUndefined);
  if (obj && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj)
        .filter(([, v]) => typeof v !== 'symbol')
        .map(([k, v]) => [k, v === undefined ? UNDEFINED : encodeUndefined(v)])
    );
  }
  return obj;
}

// eslint-disable-next-line
function decodeUndefined(obj: any): any {
  if (Array.isArray(obj)) return obj.map(decodeUndefined);
  if (obj && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [
        k,
        v === UNDEFINED ? undefined : decodeUndefined(v)
      ])
    );
  }
  return obj;
}

//eslint-disable-next-line
function stripSymbols(obj: any): any {
  if (Array.isArray(obj)) return obj.map(stripSymbols);
  if (obj && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj)
        .filter(([, v]) => typeof v !== 'symbol')
        .map(([k, v]) => [k, stripSymbols(v)])
    );
  }
  return obj;
}

//eslint-disable-next-line
export function expectMonitorSnapshot(actual: any[], expected: any[]) {
  // const normalized = normalizeMonitorEvents(actual);
  const normalized = stripSymbols(actual);
  const decodedExpected = decodeUndefined(expected);

  if (isUpdateSnapshotsEnabled()) {
    //eslint-disable-next-line
    (window as any).__SNAPSHOT_UPDATES__ ||= [];
    //eslint-disable-next-line
    (window as any).__SNAPSHOT_UPDATES__.push({
      testName: getCurrentTestName(),
      fileName: getCurrentTestFileName(),
      snapshot: encodeUndefined(normalized)
    });

    return;
  }

  expect(normalized).toEqual(decodedExpected);
}
