/** Shape representing a captured browser long task entry. */
export interface DebugWidgetLongTasksShape {
  /** Start time of the long task in milliseconds. */
  start: number;
  /** Duration of the long task in milliseconds. */
  duration: number;
}
