// This file exists ONLY for side effects

// Register ALL behavior extensions
import * as stateCacheExt from '../lib/behaviors/entity-access/cache/state-cache/interfaces/state-cache-behavior.interface';
import * as LookupExt from '../lib/behaviors/entity-access/lookup/interfaces/lookup-behavior.interface';
import * as queryExt from '../lib/behaviors/entity-access/query/interfaces/query-behavior.interface';
import * as stepwiseExt from '../lib/behaviors/stepwise/symbols/interfaces/stepwise-behavior.interface';
import * as aes256Ext from '../lib/vault/encrypt/behaviors/aes256/interface/aes256-behavior.interface';

void LookupExt;
void aes256Ext;
void queryExt;
void stateCacheExt;
void stepwiseExt;

export * from '../lib/behaviors/entity-access/cache/state-cache/interfaces/state-cache-behavior.interface';
export * from '../lib/behaviors/entity-access/lookup/interfaces/lookup-behavior.interface';
export * from '../lib/behaviors/entity-access/query/interfaces/query-behavior.interface';
export * from '../lib/behaviors/stepwise/symbols/interfaces/stepwise-behavior.interface';
export * from '../lib/vault/encrypt/behaviors/aes256/interface/aes256-behavior.interface';

// Register ALL controller extensions
import * as withDelayExt from '../lib/controllers/with-delay/interfaces/extend-with-delay.interface';
import * as withMaxFailureExt from '../lib/controllers/with-max-failures/interfaces/extend-with-max-failure.interface';
import * as withThrottleExt from '../lib/controllers/with-throttle/interfaces/extend-with-throttle.interface';

void withDelayExt;
void withMaxFailureExt;
void withThrottleExt;

export * from '../lib/controllers/with-delay/interfaces/extend-with-delay.interface';
export * from '../lib/controllers/with-max-failures/interfaces/extend-with-max-failure.interface';
export * from '../lib/controllers/with-throttle/interfaces/extend-with-throttle.interface';

/** Side-effect anchor confirming all addon behavior and controller extensions are loaded. */
export const __addon_extensions_loaded = true;
