import { EventBus } from '@sdux-vault/devtools';

// eslint-disable-next-line
export const createTestInsightListener = (emitted: any[]) => {
  let eventBus = EventBus();

  // eslint-disable-next-line
  const sub = eventBus.pipeline$().subscribe((event: any) => {
    event.id = 'id-removed';
    event.timestamp = 'ts-removed';
    if (event.traceId !== undefined) {
      event.traceId = 'trace-id-removed';
    }

    if (event.state && event.state.error) {
      if (event.state.error.raw) {
        event.state.error.raw = 'raw-removed';
      }
      if (event.state.error.details) {
        event.state.error.details = 'raw-removed';
      }
    }

    if (event.payload) {
      if (event.payload.traceId) {
        event.payload.traceId = 'trace-id-removed';
      }

      if (event.payload.timestamp) {
        event.payload.timestamp = 'ts-removed';
      }

      if (event.payload.details) {
        event.payload.details = 'details-removed';
      }

      if (event.payload.raw) {
        event.payload.raw = 'raw-removed';
      }
    }

    if (event.behaviorKey.length === 5 || event.behaviorKey.length === 36) {
      event.behaviorKey = 'key-removed';
    }

    if (event.error) {
      if (event.error.details) {
        event.error.details = 'details-removed';
      }
      if (event.error.raw) {
        event.error.raw = 'raw-removed';
      }
      if (event.error.timestamp) {
        event.error.timestamp = 'ts-removed';
      }
    }

    emitted.push(event);
  });

  return () => sub.unsubscribe();
};
