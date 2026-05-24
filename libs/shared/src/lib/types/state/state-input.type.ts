import { Observable } from 'rxjs';
import { HttpResourceRefShape } from '../../shapes/http-resource-ref-shape.shape';
import { StateInputShape } from '../../shapes/state/state-input.shape';
import { DeferredFactory } from './deferred-factory.type';
import { DeferredType } from './deferred.type';

/** Union of all accepted state input forms for pipeline ingestion. */
export type StateInputType<T> =
  | T
  | StateInputShape<T>
  | DeferredFactory<T>
  | DeferredType<T>
  | HttpResourceRefShape<T>
  | Observable<T>
  | undefined
  | null;
