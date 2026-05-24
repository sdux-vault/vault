/** Shape representing browser navigation timing metrics. */
export interface DebugWidgetNavigationShape {
  /** Navigation type reported by the browser. */
  type: string;
  /** Time in milliseconds when the DOM was fully parsed. */
  domComplete: number;
  /** Time in milliseconds when the load event finished. */
  loadEventEnd: number;
}
