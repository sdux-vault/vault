/*
 * Public API Surface of @sdux-vault/shared
 *
 * IMPORTANT:
 *  - JSDoc is preserved only when using named exports.
 *  - Avoid `export *` for public-facing interfaces, behaviors, and types.
 *  - Internal utilities may still use `export *`.
 */

/* -----------------------------------------------------------
 * INTENTIONAL SIDE EFFECTS
 * --------------------------------------------------------- */

/**
 * This is to handle fluent api requirements for behaviors and controllers
 */
import './typings/global';

/**
 * This is for version support in dev mode and tracking in the devtools
 */
import './lib/version/version.register';

/* -----------------------------------------------------------
 * DOMAIN EXPORTS
 * --------------------------------------------------------- */
export * from './lib/abstracts';
export * from './lib/config';
export * from './lib/constants';
export * from './lib/contexts';
export * from './lib/decorators';
export * from './lib/errors';
export * from './lib/interfaces';
export * from './lib/services';
export * from './lib/shapes';
export * from './lib/types';
export * from './lib/utils';
