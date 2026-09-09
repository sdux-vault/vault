/**
 * Framework-independent elapsed timer used to visualize the Delay Controller's
 * hold interval. A callback bridges animation-frame timing into Angular signals
 * without coupling this utility to the component or FeatureCell.
 */
export class ElapsedTimer {
  /** Timestamp from which the current elapsed interval is measured. */
  #startTime = 0;

  /** Accumulated elapsed milliseconds since the latest reset. */
  #elapsed = 0;

  /** Prevents duplicate animation loops when start is requested repeatedly. */
  #running = false;

  /** Active animation-frame handle used for deterministic cleanup. */
  #frameId = 0;

  /** Publishes elapsed values into the consuming framework's reactive state. */
  readonly #onChange: (milliseconds: number) => void;

  /**
   * Creates a timer that publishes its elapsed duration after every frame.
   * @param onChange - Consumer callback receiving elapsed milliseconds.
   */
  constructor(onChange: (milliseconds: number) => void) {
    this.#onChange = onChange;
  }

  /** Current elapsed duration in milliseconds. */
  get elapsed(): number {
    return this.#elapsed;
  }

  /** Whether an animation-frame timing loop is currently active. */
  get running(): boolean {
    return this.#running;
  }

  /**
   * Starts or resumes elapsed-time measurement without creating duplicate loops.
   * @returns Nothing; elapsed values are published through the callback.
   */
  start(): void {
    if (this.#running) {
      return;
    }

    this.#running = true;
    this.#startTime = performance.now() - this.#elapsed;
    this.#tick();
  }

  /**
   * Stops measurement, clears elapsed time, and publishes the zero value.
   * @returns Nothing; the timer is ready for a fresh pipeline attempt.
   */
  reset(): void {
    this.stop();
    this.#elapsed = 0;
    this.#onChange(0);
  }

  stop(): void {
    this.#running = false;
    cancelAnimationFrame(this.#frameId);
  }

  /**
   * Cancels future animation frames while retaining the latest elapsed value.
   * @returns Nothing; no further callback values are produced.
   */
  destroy(): void {
    this.stop();
  }

  /** Publishes the current duration and schedules the next animation frame. */
  #tick(): void {
    if (!this.#running) {
      return;
    }

    this.#elapsed = performance.now() - this.#startTime;
    this.#onChange(this.#elapsed);
    this.#frameId = requestAnimationFrame(() => this.#tick());
  }
}
