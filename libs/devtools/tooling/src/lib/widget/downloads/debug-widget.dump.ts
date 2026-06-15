import type { DebugWidgetDumpShape } from '../../shapes/debug-widget-dump.shape';
import { DebugWidgetEventShape } from '../../shapes/debug-widget-event.shape';
import { SDUX_DEBUG_WIDGET_AI_ASSIST_CONSTANT } from '../ai-assist/debug-widget.ai-assist.constant';
import { DebugWidgetEngine } from '../debug-widget.engine';

// ------------------------------------------------
// DOWNLOAD HELPERS
// ------------------------------------------------

/**
 * Downloads a debug dump as a JSON file.
 *
 * @param dump - The debug dump shape to serialize and download.
 */
export function downloadDebugDump(dump: DebugWidgetDumpShape): void {
  const blob = new Blob([JSON.stringify(dump, null, 2)], {
    type: 'application/json'
  });

  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `sdux-debug-${Date.now()}.json`;
  a.click();

  URL.revokeObjectURL(a.href);
}

/** Downloads the AI assist markdown file for diagnostic guidance. */
export function downloadAiAssistFile(): void {
  const now = Date.now();

  const content = SDUX_DEBUG_WIDGET_AI_ASSIST_CONSTANT;

  const blob = new Blob([content], { type: 'text/markdown' });

  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `sdux-debug-ai-assist-${now}.md`;
  a.click();

  URL.revokeObjectURL(a.href);
}

// ------------------------------------------------
// DUMP CREATION
// ------------------------------------------------

/**
 * Creates a comprehensive debug dump from the recorded events.
 *
 * @param events - The array of debug widget events to include.
 * @returns A fully populated debug dump shape.
 */
export function createDebugDump(
  events: DebugWidgetEventShape[]
): DebugWidgetDumpShape {
  const debugWidgetEngine = DebugWidgetEngine();
  const now = Date.now();
  const isoTime = new Date(now).toISOString();

  // istanbul ignore next line
  const monotonicNow =
    typeof performance !== 'undefined' && performance.now
      ? performance.now()
      : null;

  const navigationTiming =
    typeof performance !== 'undefined' && performance.getEntriesByType
      ? // eslint-disable-next-line
        (performance.getEntriesByType('navigation')[0] as any)
      : /* istanbul ignore next line */ null;

  let longTasks: { start: number; duration: number }[] | undefined;

  if (typeof performance !== 'undefined') {
    try {
      // eslint-disable-next-line
      const entries = performance.getEntriesByType('longtask') as any[];
      longTasks = entries?.map((e) => ({
        start: e.startTime,
        duration: e.duration
      }));
    } catch {
      // ignore
    }
  }

  const registry = debugWidgetEngine.serializeRegistry();
  const stats = debugWidgetEngine.buildEventStats(events, longTasks);

  return {
    timestamp: now,
    isoTime,

    highResolution: {
      monotonicNow,

      timeOrigin:
        typeof performance !== 'undefined'
          ? performance.timeOrigin
          : /* istanbul ignore next line */ null
    },

    runtime: {
      hardwareConcurrency:
        typeof navigator !== 'undefined'
          ? (navigator.hardwareConcurrency ?? /* istanbul ignore next */ null)
          : /* istanbul ignore next */ null,

      deviceMemory:
        typeof navigator !== 'undefined'
          ? // eslint-disable-next-line
            ((navigator as any).deviceMemory ?? /* istanbul ignore next */ null)
          : /* istanbul ignore next */ null,

      connectionType:
        typeof navigator !== 'undefined'
          ? // eslint-disable-next-line
            ((navigator as any).connection?.effectiveType ??
            /* istanbul ignore next */ null)
          : /* istanbul ignore next */ null
    },

    navigation: navigationTiming
      ? {
          type: navigationTiming.type,
          domComplete: navigationTiming.domComplete,
          loadEventEnd: navigationTiming.loadEventEnd
        }
      : // istanbul ignore next line
        undefined,

    environment: debugWidgetEngine.getEnvironmentInfo(),

    longTasks,
    events,
    stats,

    versions: globalThis?.sdux?.versions ?? {},
    registry
  };
}

/**
 * Creates a debug dump, downloads it, and opens a GitHub issue form.
 *
 * @param events - The array of debug widget events to report.
 */
export function reportGithubIssue(events: DebugWidgetEventShape[]): void {
  // dump
  const dump = createDebugDump(events);

  //  Download the dump JSON
  downloadDebugDump(dump);

  // Prepare issue body
  const issueBody = encodeURIComponent(
    `## Issue Summary
Describe the problem.

---

## What Happened?

Describe the behavior you observed.

---

## What Did You Expect to Happen?

Describe the expected behavior.

---

## Debug Dump

Attach the downloaded **sdux-debug-${dump.timestamp}.json** file.

The file was automatically downloaded when you clicked "Report Issue".
`
  );

  // 4️⃣ GitHub issue URL
  const githubRepo = 'https://github.com/sdux-vault/vault/issues/new';

  const url = `${githubRepo}?template=issue_report.md&body=${issueBody}`;

  // 5️⃣ Open GitHub
  window.open(url, '_blank');
}

/**
 * Downloads a trace dump as a JSON file.
 *
 * @param data - The serialized trace data string.
 * @param timeScale - The time scale multiplier applied to the trace.
 */
export function downloadTraceDump(data: string, timeScale = 1): void {
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `sdux-pipeline-trace-x${timeScale}-${Date.now()}.json`;
  a.click();

  URL.revokeObjectURL(url);
}
