import { LicensableClassContext } from './licensable-class.context';

/** Runtime context supplied to controller class instances during pipeline execution. */
export interface ControllerClassContext extends LicensableClassContext {
  /** Unique key of the FeatureCell this controller is attached to. */
  featureCellKey: string;
  /** Requests a revote for the pipeline identified by the trace ID. */
  requestRevote: (traceId: string) => void;
  /** Requests an abort for the pipeline identified by the trace ID. */
  requestAbort: (traceId: string) => void;
  /** Signals that the license was denied for the given trace. */
  // Only availabile for the internal license controller
  licenseDenied?: (traceId: string) => void;
  /** Signals that the license was approved for the given trace. */
  // Only availabile for the internal license controller
  licenseApproved?: (traceId: string) => void;

  /** Optional configuration object for this controller. */
  readonly controllerConfig?: unknown;
  /** Optional license payload associated with this controller. */
  readonly licensePayload?: unknown;
}
