/**
 * This is for version support in dev mode and tracking in the devtools
 */
import './lib/version/version.register';

export type { EventBusContract } from './lib/interfaces/event-bus.contract';
export { EventBus } from './lib/utils/event-bus';
export { initDevtoolsWidget } from './lib/widget';
export { exportTrace } from './lib/widget/downloads/debug-widget.trace';
