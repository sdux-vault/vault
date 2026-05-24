import { DebugWidgetRecorder } from './debug-widget.recorder';
import {
  createDebugDump,
  downloadAiAssistFile,
  downloadDebugDump,
  downloadTraceDump,
  reportGithubIssue
} from './downloads/debug-widget.dump';
import { exportTrace } from './downloads/debug-widget.trace';

/** Custom element that renders the SDuX debug widget overlay in the browser. */
export class DebugWidget extends HTMLElement {
  /** Recorder instance that captures pipeline events. */
  private recorder = new DebugWidgetRecorder();
  /** Whether the recorder is currently active. */
  private recording = false;
  /** Whether the widget panel is minimized. */
  private minimized = true;
  /** Whether the export dropdown menu is open. */
  private exportMenuOpen = false;

  /** Horizontal offset from the pointer to the element edge during drag. */
  private dragOffsetX = 0;
  /** Vertical offset from the pointer to the element edge during drag. */
  private dragOffsetY = 0;
  /** Whether the widget is currently being dragged. */
  private dragging = false;
  /** AbortController used to batch-remove document-level event listeners on disconnect. */
  private abortController = new AbortController();

  /** Lifecycle callback invoked when the element is added to the DOM. */
  connectedCallback(): void {
    this.attachShadow({ mode: 'open' });

    // Default position
    this.style.position = 'fixed';
    this.style.top = '80px';
    this.style.right = '20px';
    this.style.zIndex = '999999';

    const saved = localStorage.getItem('sdux-debug-state');
    if (saved) {
      try {
        const { left, top, minimized } = JSON.parse(saved);

        if (left && top) {
          this.style.left = left;
          this.style.top = top;
          this.style.right = 'auto';
        }

        this.minimized = !!minimized;
      } catch {
        // ignore corrupted storage
      }
    }

    this.render();

    document.addEventListener(
      'sdux-license-resolved',
      () => {
        this.updateButtonState();
      },
      { signal: this.abortController.signal }
    );
  }

  /** Lifecycle callback invoked when the element is removed from the DOM. */
  disconnectedCallback(): void {
    this.abortController.abort();

    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }

    this.recorder.stop();
    this.recording = false;
  }

  /** Renders the shadow DOM template and attaches event listeners. */
  private render(): void {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          font-family: 'Inter', system-ui, sans-serif;
        }

        .panel {
          background: #e2e8f0;
          border: 1px solid #63a4ff;
          color: #000000;
          padding: 10px 12px;
          border-radius: 8px;
          box-shadow: 0 0 8px rgba(25,118,210,0.4);
          display: flex;
          flex-direction: column;
          gap: 10px;
          cursor: move;
          min-width: 260px;

          &.minimized {
            flex: 1;
            min-width: 0;
          }
        }

        /* HEADER */

        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .title-container {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .sdux-brand {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: #1976d2;

          display: flex;
          align-items: center;
        }

        .session-timer {
          font-size: 10px;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;

          color: #64748b;
          font-variant-numeric: tabular-nums;

          height: 13px;      /* locks visual center */

        }

        .record-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #d32f2f;

          position: relative;
          top: 0.5px; /* micro optical correction */

          animation: recordBlink 1.4s infinite;
        }

        .header-actions {
          display: flex;
          gap: 6px;
        }

        /* ROW 2: SESSION CONTROLS */

        .controls {
          display: flex;
          justify-content: space-between;
          gap: 6px;
        }
        
        .button-container,
        .event-container {
          display: flex;
          gap: 6px;
        }

        /* ROW 3: EXPORT */

        .export-row {
          display: flex;
          gap: 6px;
          align-items: center;
          justify-content: flex-end;
        }

        .event-error-count,
        .event-count {
          width: 48px;             
          font-size: 11px;
          font-weight: 600;
          padding: 4px 6px;

          display: inline-flex;
          align-items: center;
          justify-content: center;

          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .event-count {
          background: #f1f5f9;
          border: 1px solid #63a4ff;
          color: #000000;
        }

        .event-error-count {
          background: #fff5f5;  /* very soft red tint */
          border: 1px solid #d32f2f;
          color: #b71c1c;
        }

        /* BUTTON BASE */

        button {
          display: flex;
          justify-content: center;
          align-items: center;

          font-family: 'Inter', system-ui, sans-serif;
          font-size: 11px;
          font-weight: 600;

          padding: 4px 8px;
          gap: 4px;

          border-radius: 5px;
          cursor: pointer;

          transition:
            transform 0.15s ease,
            box-shadow 0.15s ease,
            background-color 0.2s ease,
            color 0.2s ease;

          background-color: #1976d2;
          color: #ffffff;
          border: 1px solid #1976d2;
        }

        button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 2px 6px rgba(0,0,0,0.35);
          background-color: #63a4ff;
          border-color: #63a4ff;
        }

        button:active:not(:disabled) {
          transform: scale(0.97);
          box-shadow: 0 3px 10px rgba(0,0,0,0.45);
        }

        button:disabled {
          transform: none !important;
          box-shadow: none !important;
          opacity: 0.65;
          cursor: not-allowed;
          pointer-events: none;
        }

        /* SEMANTIC VARIANTS */

        button.stop {
          width: 56px;
          background: #d32f2f;
          border-color: #d32f2f;
        }

        button.stop:hover:not(:disabled) {
          background: #ef5350;
          border-color: #ef5350;
        }

        button.clear {
          background-color: #2c3a4f;
          border-color: #63a4ff;
          color: #e2e8f0;
        }

        button.clear:hover:not(:disabled) {
          background-color: #1f2a3a;
        }

        button.download {
          background: #388e3c;
          border-color: #388e3c;
        }

        button.download:hover:not(:disabled) {
          background: #81c784;
          border-color: #81c784;
        }

        button.issue {
          background: #1976d2;
          border-color: #1976d2;
        }

        button.issue:hover:not(:disabled) {
          background: #63a4ff;
          border-color: #63a4ff;
        }

        button.minimize,
        button.close {
          background: transparent;
          padding: 2px 6px;
          font-size: 10px;
        }

        button.minimize {
          border-color: #94a3b8;
          color: #94a3b8;
        }

        button.close {
          border-color: #d32f2f;
          color: #d32f2f;
        }

        button.help {
          background: transparent;
          border: 1px solid #94a3b8;
          color: #94a3b8;
          min-width: 26px;
        }

        button.help:hover:not(:disabled) {
          background: rgba(0,0,0,0.06);
        }

        button.ai-assist {
          background: #004ba0;       /* primary dark */
          border-color: #004ba0;
          color: #ffffff;
        }

        button.ai-assist:hover:not(:disabled) {
          background: #1976d2;       /* return to primary base on hover */
          border-color: #1976d2;
        }

        button.ai-assist:active:not(:disabled) {
          background: #003b82;
        }

        @keyframes errorPulse {
          0%   { transform: scale(1); }
          50%  { transform: scale(1.08); }
          100% { transform: scale(1); }
        }

        .event-error-count.bump {
          animation: errorPulse 0.25s ease;
        }

        .export-container {
          position: relative;

          .export-menu {
            position: absolute;
            left: 0;
            top: 100%;
            margin-top: 4px;

            display: flex;
            flex-direction: column;

            background: #e2e8f0;
            border: 1px solid #63a4ff;
            border-radius: 6px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.2);

            min-width: 150px;
            z-index: 10;

            opacity: 0;
            transform: translateY(-6px) scale(0.96);
            pointer-events: none;

            transition:
              opacity 120ms ease,
              transform 120ms ease;
          }

          .export-menu.open {
            opacity: 1;
            transform: translateY(0) scale(1);
            pointer-events: auto;
          }

          .export-menu button {
            background: transparent;
            border: none;
            color: #000;
            padding: 6px 10px;
            text-align: left;
            cursor: pointer;
          }

          .export-menu button:hover {
            background: rgba(0,0,0,0.06);
          }
        }
      }

        @keyframes recordBlink {
          0%   { opacity: 1; }
          50%  { opacity: 0.35; }
          100% { opacity: 1; }
        }

      </style>

      <div class="panel ${this.minimized ? 'minimized' : ''}" id="panel" role="region" aria-label="SDuX Debug Widget">

        <!-- ROW 1 (always visible) -->
        <div class="header">
        <div class="title-container">
          <div class="sdux-brand">SDuX DEBUGGER</div>
          ${this.recording ? '<div class="record-dot"></div>' : ''}
          <div id="sessionTimer" class="session-timer">
            ${this.recording ? this.getSessionTime() : ''}
          </div>
        </div>

          <div class="header-actions">
            <button type="button" id="minimize" class="minimize" aria-label="${this.minimized ? 'Expand widget' : 'Minimize widget'}">
              ${this.minimized ? '▢' : '_'}
            </button>
            <button type="button" id="close" class="close" aria-label="Close debug widget">X</button>
          </div>
        </div>

      ${
        this.minimized
          ? ''
          : `
        <!-- ROW 2 -->
        <div class="controls">
          <div class="event-container">
            [ <div class="event-count" id="eventCount" aria-label="Event count" aria-live="polite">0</div> |
              <div class="event-error-count" id="eventErrorCount" aria-label="Error count" aria-live="polite">0</div> ]
          </div>
          <div class="button-container">
          <button type="button" id="recordToggle" class="stop">
            ${this.recording ? 'Stop' : 'Record'}
          </button>
          <button type="button" id="clear" class="clear">Clear</button>
          </div>
        </div>

        <!-- ROW 3 -->
        <div class="export-row">
          <div class="export-container">
            <button type="button" id="export" class="download" aria-expanded="${this.exportMenuOpen}">Export ▾</button>

            <div class="export-menu" id="exportMenu" role="menu">
              <button type="button" id="downloadDump" role="menuitem">Debug Dump</button>
              <button type="button" id="downloadTrace" role="menuitem">Trace Timeline</button>
              <button type="button" id="downloadTrace1000" role="menuitem">Trace Timeline (x1000)</button>
            </div>
          </div>
          <button type="button" id="aiAssist" class="ai-assist"> AI Assist </button>
          <button type="button" id="createIssue" class="issue">Create Issue</button>
          <button type="button" id="help" class="help" aria-label="Help">?</button>
        </div>
      `
      }

    </div>
  `;

    const aiAssistBtn = this.shadowRoot?.getElementById('aiAssist');

    aiAssistBtn?.addEventListener('click', () => {
      downloadAiAssistFile();
    });

    const exportBtn = this.shadowRoot.getElementById('export');
    const exportMenu = this.shadowRoot.getElementById('exportMenu');

    exportBtn?.addEventListener('click', (e) => {
      e.stopPropagation();

      this.exportMenuOpen = !this.exportMenuOpen;
      exportMenu?.classList.toggle('open', this.exportMenuOpen);
    });

    this.shadowRoot.getElementById('close')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.remove();
    });

    // Sync button state with recording flag
    this.updateButtonState();

    this.shadowRoot.getElementById('help')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.openHelp();
    });

    this.shadowRoot
      .getElementById('recordToggle')
      ?.addEventListener('click', (e) => {
        e.stopPropagation();

        if (this.recording) {
          this.stop();
        } else {
          this.start();
        }

        this.updateRecordingUI();
      });

    const panel = this.shadowRoot.getElementById('panel');
    panel?.addEventListener('pointerdown', (e) => this.startDrag(e));

    this.shadowRoot
      .getElementById('downloadDump')
      ?.addEventListener('click', (e) => {
        e.stopPropagation();
        closeExportMenu();
        this.downloadDebugDump();
      });

    this.shadowRoot
      .getElementById('downloadTrace')
      ?.addEventListener('click', (e) => {
        e.stopPropagation();
        closeExportMenu();
        this.downloadTraceDump();
      });

    this.shadowRoot
      .getElementById('downloadTrace1000')
      ?.addEventListener('click', (e) => {
        e.stopPropagation();
        closeExportMenu();
        this.downloadTraceDump(1000);
      });

    this.shadowRoot.getElementById('clear')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.clear();
    });

    this.shadowRoot
      .getElementById('minimize')
      ?.addEventListener('click', this.toggleMinimize);

    this.shadowRoot
      .getElementById('createIssue')
      ?.addEventListener('click', (e) => {
        e.stopPropagation();
        this.createIssue();
      });

    const signal = this.abortController.signal;
    document.addEventListener('pointermove', this.onDrag, { signal });
    document.addEventListener('pointerup', this.stopDrag, { signal });

    document.addEventListener(
      'pointerdown',
      (e) => {
        if (!this.exportMenuOpen) return;

        const path = e.composedPath();

        if (exportMenu && !path.includes(exportMenu)) {
          closeExportMenu();
        }
      },
      { signal }
    );

    const closeExportMenu = () => {
      exportMenu?.classList.remove('open');
      this.exportMenuOpen = false;
    };
  }

  /** Updates the event and error count displays in the widget. */
  private updateEventCount(): void {
    /* istanbul ignore next -- defensive invariant, unrealistic in compliant runtimes */
    if (!this.shadowRoot) return;

    const totalEl = this.shadowRoot.getElementById('eventCount');
    const errorEl = this.shadowRoot.getElementById('eventErrorCount');

    const total = this.recorder.getEvents().length;
    const currentErrors = this.recorder.getErrorCount();

    // Update total count
    if (totalEl) {
      totalEl.textContent = String(total);
    }

    // Update error count + pulse if increased
    if (errorEl) {
      /* istanbul ignore next -- DOM textContent is never null in practice */
      const prev = Number(errorEl.textContent ?? '0');

      if (currentErrors > prev) {
        errorEl.classList.remove('bump');
        void errorEl.offsetWidth; // force reflow
        errorEl.classList.add('bump');
      }

      errorEl.textContent = String(currentErrors);
    }
  }

  /** Synchronizes the recording indicator and timer UI with the current state. */
  private updateRecordingUI(): void {
    /* istanbul ignore next -- defensive invariant, unrealistic in compliant runtimes */
    if (!this.shadowRoot) return;

    const btn = this.shadowRoot.getElementById('recordToggle');
    const dot = this.shadowRoot.querySelector('.record-dot');
    const timer = this.shadowRoot.getElementById('sessionTimer');
    const container = this.shadowRoot.querySelector('.title-container');

    if (btn) {
      btn.textContent = this.recording ? 'Stop' : 'Record';
    }

    // remove recording indicators
    if (!this.recording) {
      if (dot) dot.remove();
      if (timer) timer.textContent = '';
      return;
    }

    // add recording dot if missing
    if (!dot && container) {
      const newDot = document.createElement('div');
      newDot.className = 'record-dot';
      container.insertBefore(newDot, container.children[1]);
    }

    // initialize timer immediately
    if (timer) {
      timer.textContent = this.getSessionTime();
    }
  }

  // -----------------------------
  // Drag logic
  // -----------------------------

  /** Timestamp when the current recording session started. */
  private sessionStartTime: number | null = null;
  /** Interval ID for the session timer tick. */
  private timerInterval: number | null = null;
  /** Accumulated paused duration in milliseconds. */
  private pausedDuration = 0;
  /** Timestamp when the current pause started. */
  private pauseStart: number | null = null;

  /**
   * Initiates a drag operation on the widget panel.
   *
   * @param e - The pointer event that started the drag.
   */
  private startDrag(e: PointerEvent): void {
    this.dragging = true;
    this.dragOffsetX = e.clientX - this.offsetLeft;
    this.dragOffsetY = e.clientY - this.offsetTop;
  }

  /** Handles pointer movement during a drag operation. */
  private onDrag = (e: PointerEvent): void => {
    if (!this.dragging) return;

    this.style.left = `${e.clientX - this.dragOffsetX}px`;
    this.style.top = `${e.clientY - this.dragOffsetY}px`;
    this.style.right = 'auto';
  };

  /** Ends the drag operation and persists the widget position. */
  private stopDrag = (): void => {
    this.dragging = false;
    this.persistState();
  };

  /**
   * Toggles the minimized state of the widget panel.
   *
   * @param e - The click event.
   */
  private toggleMinimize = (e: Event): void => {
    e.stopPropagation();

    this.minimized = !this.minimized;
    this.persistState();
    this.render();
  };
  /** Persists the widget position and minimized state to localStorage. */
  private persistState(): void {
    localStorage.setItem(
      'sdux-debug-state',
      JSON.stringify({
        left: this.style.left,
        top: this.style.top,
        minimized: this.minimized
      })
    );
  }
  // -----------------------------
  // Button state logic
  // -----------------------------

  /** Enables or disables action buttons based on recording and event state. */
  private updateButtonState(): void {
    /* istanbul ignore next -- defensive invariant, unrealistic in compliant runtimes */
    if (!this.shadowRoot) return;

    const recordToggleBtn = this.shadowRoot.getElementById(
      'recordToggle'
    ) as HTMLButtonElement | null;

    const exportBtn = this.shadowRoot.getElementById(
      'export'
    ) as HTMLButtonElement | null;
    const clearBtn = this.shadowRoot.getElementById(
      'clear'
    ) as HTMLButtonElement | null;
    const issueBtn = this.shadowRoot.getElementById(
      'createIssue'
    ) as HTMLButtonElement | null;
    const aiAssistBtn = this.shadowRoot.getElementById(
      'aiAssist'
    ) as HTMLButtonElement | null;

    const hasEvents = this.recorder.getEvents().length > 0;
    const aiAssistLicensed = !!globalThis.sdux?.debugWidget?.aiAssistEnabled;

    if (recordToggleBtn) recordToggleBtn.disabled = false;

    const isDisabled = !hasEvents || this.recording;
    if (exportBtn) exportBtn.disabled = isDisabled;
    if (issueBtn) issueBtn.disabled = isDisabled;
    if (clearBtn) clearBtn.disabled = isDisabled;
    if (aiAssistBtn) aiAssistBtn.disabled = isDisabled || !aiAssistLicensed;
  }

  /** Starts the recording session and subscribes to pipeline events. */
  private start(): void {
    if (this.recording) return;

    const now = Date.now();

    if (!this.sessionStartTime) {
      this.sessionStartTime = now;
    }

    if (this.pauseStart) {
      this.pausedDuration += now - this.pauseStart;
      this.pauseStart = null;
    }

    this.timerInterval = window.setInterval(() => {
      const el = this.shadowRoot?.getElementById('sessionTimer');
      if (el) el.textContent = this.getSessionTime();
    }, 1000);

    this.recorder.start(() => {
      this.updateEventCount();
      this.updateButtonState();
    });

    this.recording = true;
    this.updateRecordingUI();

    this.updateButtonState(); // only needed once here

    // eslint-disable-next-line
    console.info('[SDUX] Recording started');
  }

  /**
   * Returns the formatted elapsed session time.
   *
   * @returns A string in m:ss format.
   */
  private getSessionTime(): string {
    if (!this.sessionStartTime) return '';

    const elapsed = Date.now() - this.sessionStartTime - this.pausedDuration;

    const seconds = Math.floor(elapsed / 1000);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  /** Stops the recording session and pauses the timer. */
  private stop(): void {
    if (!this.recording) return;

    this.recorder.stop();
    this.recording = false;

    this.pauseStart = Date.now();

    this.updateRecordingUI();

    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }

    this.updateButtonState();

    // eslint-disable-next-line
    console.info('[SDUX] Recording stopped');
  }

  /** Creates and downloads a debug dump from the recorded events. */
  private downloadDebugDump(): void {
    const dump = createDebugDump(this.recorder.getEvents());
    downloadDebugDump(dump);
    // eslint-disable-next-line
    console.info('[SDUX] Logging dump generated');
  }

  /**
   * Creates and downloads a trace timeline from the recorded events.
   *
   * @param timeScale - The time scale multiplier for trace timestamps.
   */
  private downloadTraceDump(timeScale: number = 1): void {
    const trace = exportTrace(this.recorder.getEvents(), timeScale);
    downloadTraceDump(trace, timeScale);
    // eslint-disable-next-line
    console.info('[SDUX] Trace dump generated');
  }

  /** Downloads a debug dump and opens a prefilled GitHub issue form. */
  private createIssue(): void {
    // For now, identical to download logs
    reportGithubIssue(this.recorder.getEvents());
    // eslint-disable-next-line
    console.info('[SDUX] Issue dump generated and redirected');
  }

  /** Clears all recorded events and resets the session timer. */
  private clear(): void {
    if (!this.recorder.getEvents().length) return;

    if (!confirm('Clear all recorded events?')) return;

    this.recorder.clear();

    this.sessionStartTime = null;
    this.pausedDuration = 0;
    this.pauseStart = null;

    const timer = this.shadowRoot?.getElementById('sessionTimer');
    if (timer) timer.textContent = '';

    this.updateEventCount();
    this.updateButtonState();
    // eslint-disable-next-line
    console.info('[SDUX] Events cleared');
  }

  /** Opens the debugger help documentation in a new browser tab. */
  private openHelp(): void {
    const HELP_URL = '/docs/dev-tools/built-in-debugger'; // ← replace later

    window.open(HELP_URL, '_blank', 'noopener,noreferrer');
  }
}
