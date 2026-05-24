// This file exists ONLY for side effects

// Register ALL behavior extensions
import * as observableExt from '../lib/behaviors/observable/interface/from-observable-behavior.interface';
import * as promiseExt from '../lib/behaviors/promise/interface/from-promise-behavior.interface';
import * as streamExt from '../lib/behaviors/resolve/from-stream/interface/from-stream-behavior.interface';

void observableExt;
void promiseExt;
void streamExt;

export * from '../lib/behaviors/observable/interface/from-observable-behavior.interface';
export * from '../lib/behaviors/promise/interface/from-promise-behavior.interface';
export * from '../lib/behaviors/resolve/from-stream/interface/from-stream-behavior.interface';

/** Side-effect anchor confirming all core behavior extensions are loaded. */
export const __core_extensions_loaded = true;
