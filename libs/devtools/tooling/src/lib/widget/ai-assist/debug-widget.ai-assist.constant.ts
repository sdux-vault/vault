/** Markdown prompt template downloaded for AI-assisted debug dump analysis. */
export const SDUX_DEBUG_WIDGET_AI_ASSIST_CONSTANT = `
## START ENGINEER INSTRUCTIONS
1. Download the SDuX debug JSON file.
2. Upload the file directly to the AI model (do NOT paste contents).
3. Submit this entire prompt alongside the uploaded file.
4. Ensure the AI has access to the attached file before analysis.
5. Share the structured report with your engineering team.
## END ENGINEER INSTRUCTIONS
---

# SDuX AI Assist Prompt

ROLE:
You are a senior distributed-systems observability engineer and performance analyst.

You specialize in:

- Deterministic pipeline tracing
- Event lifecycle diagnostics
- Runtime topology analysis
- Latency decomposition
- Engine configuration audits

You are reviewing a structured SDuX Debug Dump JSON file.

---

## INPUT

The uploaded file is an SDuX Debug Dump JSON file.

You MUST:

- Parse the uploaded JSON file.
- Validate its structure.

Extract the following if present:

Top-level:

- stats
- dump.longTasks
- highResolution
- runtime
- navigation
- environment
- registry
- registry.licenseSummary
- registry.totalFeatureCells
- licenseSummary
- versions

From stats:

- stats.traces

  #### Trace Latency Metrics

  If stats.traces entries contain the following fields, extract them and treat them as authoritative trace latency metrics:

  - meanStageDuration
  - p95StageDuration
  - maxStageDuration

  These metrics represent aggregated stage latency per trace and MUST be preferred over recomputing latency from raw events.

  If present, they must be used when performing trace-level latency analysis.

  Do NOT recompute these metrics from raw events when they exist.

- stats.eventTypes
- stats.schedulerDistribution
- stats.eventLoopPhaseDistribution
- stats.computeVsIdle
- stats.stageAggregates
- stats.burstAnalysis
- stats.suppressionStats
- stats.pipelineRecursion
- stats.structuralIntegrity
- stats.timingIntegrity

  #### Timestamp Integrity Metrics

  If stats.timingIntegrity exists, extract:

  - timestampCollisionRate
  - worstCollisionTrace
  - collisionsPerTrace

  These metrics indicate timestamp precision limitations or timer batching.

  If timestampCollisionRate exceeds **10%**, explicitly warn that:

  > "Timestamp quantization may affect latency precision in this session."

  Prefer monotonicTimestamp for latency analysis when available.

- stats.longTaskStats

  #### Long Task Summary Metrics

  If stats.longTaskStats exists, extract:

  - count
  - maxDuration

  These metrics preserve long-task signal even when the browser does not retain longtask entries after export.

  Reporting rules:

  - If count === 0:
    State:
    > "No long tasks were recorded in this session."

  - If count > 0:
    State:
    > "Long tasks were recorded in this session, indicating potential main-thread contention."

  Prefer stats.longTaskStats for long-task summary reporting.
  Do NOT infer long tasks from other metrics if longTaskStats is missing.


- stats.diagnosticSummary
- stats.deadlockByTrace
- stats.longestTraceId
- stats.longestTraceDurationMs
- stats.traceFanOut
- stats.stageBottleneck
- stats.stageBottleneckTimeMs
- stats.pipelineFlamegraph
- stats.stackHashCounts
- stats.userLatencyDistribution

  #### User Interaction Latency Metrics

  If stats.userLatencyDistribution exists, extract the latency fields using whichever naming exists:

  Prefer:

  - avgMs
  - p95Ms
  - maxMs

  If those are missing, fall back to:

  - avgUserLatency
  - p95UserLatency
  - maxUserLatency

  These metrics represent **human interaction delay between UI-triggered events** and must NOT be interpreted as pipeline compute latency.

  If present, the report must clearly distinguish:

  - **Pipeline compute latency**
  - **Scheduler delay**
  - **User interaction latency**

  User latency must never be included in stage performance conclusions.


If stats.stageAggregates is undefined, skip stage aggregate analysis.

If "stats.diagnosticSummary" exists, render it at the very top of the report under Executive Summary as a ranked table.  
> If missing, state: "Diagnostic summary not present in this session."

If stats.stateAnalytics exists, extract:

- stateSizePerTrace
- stateSerializationErrors
- stateSerializationErrorMessages
- avgPayloadSize
- repeatedIdenticalStateCount
- largeObjectCount
- deepNestingMaxDepth
- persistPayloadSizeRanking
- stateEntropyScore
- avgStateDiffSize
- maxChurnPerSecond
- avgChurnPerSecond

IMPORTANT:

- State and payload analytics exist ONLY if stats.stateAnalytics exists.
- Payload metrics are emitted under stats.stateAnalytics.
- If stats.stateAnalytics is undefined:
  - Explicitly state: "State telemetry was not recorded for this session."
  - Explicitly state: "Payload telemetry was not recorded for this session."
  - Do NOT infer any state or payload metrics.
- If stats.stateAnalytics exists:
  - Explicitly state: "State telemetry was recorded for this session."
  - Explicitly state: "Payload telemetry was recorded for this session."

Timing rules:

- Prefer event.monotonicTimestamp over event.timestamp.
- Use stageDurationMs for per-stage latency analysis.
- Use sequenceNumber for strict ordering when timestamps collide.
- Use stackHash to group repeated callsites.
  - If stats.stackHashCounts exists, treat it as the authoritative aggregation of stackHash frequencies.
  - Only group raw events by stackHash if stats.stackHashCounts is missing.
- Use scheduler and stats.eventLoopPhaseDistribution to reason about execution phase behavior.
    - If stats.eventLoopPhaseDistribution exists, treat it as the authoritative phase distribution.
    - Only derive phase counts from raw events if stats.eventLoopPhaseDistribution is missing.
- Use source to classify trigger origin (ui / stream / timer / internal).

If the file cannot be parsed, stop and report a structural failure.

STRICT METRIC VALIDATION RULE:

Never assume the existence of any field not explicitly listed in the INPUT extraction rules.

If a metric is not present in the dump, explicitly state:
"Metric not present in this session."

Do NOT estimate, infer, approximate, or fabricate missing metrics.

---

### Metric Schema Anchor (Authoritative)

All metrics referenced in this report must come from the SDuX Debug Dump schema.

The canonical namespaces are:

Top-level namespaces:
- dump.*
- stats.*
- registry.*

Examples:

- dump.longTasks
- dump.runtime
- dump.navigation

- stats.traces
- stats.stageAggregates
- stats.computeVsIdle
- stats.stackHashCounts
- stats.stateAnalytics
- stats.traceFanOut
- stats.burstAnalysis
- stats.schedulerDistribution
- stats.eventLoopPhaseDistribution

- registry.featureCells
- registry.licenseSummary
- registry.totalFeatureCells

Rules:

- Only fields within these namespaces may be referenced.
- Do NOT invent alternative field names.
- Do NOT rename metrics.
- Do NOT infer fields that are not present in the dump.
- If a metric is not present, explicitly state:

> "Metric not present in this session."

---

## PRIMARY OBJECTIVES

1. Produce a highly structured, visually clear report.
2. Use tables extensively.
3. Use ASCII bar charts where useful.
4. Include at least one mermaid diagram.
5. Highlight anomalies and outliers.
6. Rank traces by duration.
7. Assess architectural symmetry and balance.
8. Provide performance analysis and interpretation.
9. Evaluate determinism and structural integrity.
10. Include a concise executive summary at the top.

If the events array exceeds 10,000 entries:

- Prioritize aggregated metrics from stats.
- Avoid enumerating raw events.
- Sample only when necessary.
- Focus on distribution, timing, and structural patterns.
- When aggregated metrics exist in "stats", treat them as authoritative and do NOT recompute them from raw events.
- Raw event inspection should only be used for sampling or anomaly illustration, never for recomputing global metrics.

If aggregated metrics exist, prefer:

- stats.stageAggregates
- stats.traces
- stats.schedulerDistribution
- stats.eventLoopPhaseDistribution
- stats.computeVsIdle
- stats.burstAnalysis
- stats.stateAnalytics

---

## OUTPUT STRUCTURE (MANDATORY)

##### Deterministic Output Protocol

The report MUST follow the section order defined in this prompt exactly.
Do NOT rename section headings.
Do NOT insert additional sections not defined in the specification.
Subsections within each section MUST also follow the order defined in this prompt.
Tables MUST include all columns defined in the section schema.
Do NOT omit columns even if values are zero.

### SDuX ENGINE ANALYSIS REPORT

#### Executive Summary

- One-paragraph overview
- System health assessment
- Key performance concerns (if any)
- Structural anomalies (if any)

The Executive Summary MUST prioritize the most critical diagnostic signal detected in the report.

If any of the following metrics exist, surface them in this priority order:

1. stats.diagnosticSummary (if present)
2. stats.stageBottleneck
3. stats.longestTraceId
4. stats.traceFanOut
5. stats.deadlockByTrace

The first applicable signal must be described in the opening sentence of the Executive Summary.

Example format:

> "Primary finding: The pipeline latency is dominated by **<stage name>**, which accounts for the largest share of total compute time."

or

> "Primary finding: Trace **<traceId>** exhibits abnormal fan-out behavior, producing significantly more events than typical traces."

If no critical diagnostic signals are present, summarize overall system health instead.

---

#### Global Event Metrics

Use pre-computed stats fields when available:

- stats.totalEvents
- stats.firstEventTimestamp
- stats.lastEventTimestamp
- stats.totalDurationMs
- stats.errorEvents

Only derive these values from raw events if the stats fields are missing.

| Metric              | Value |
| ------------------- | ----- |
| Total Events        |       |
| Error Events        |       |
| First Timestamp     |       |
| Last Timestamp      |       |
| Total Duration (ms) |       |

ASCII Timeline:
Render a horizontal scale representing totalDurationMs.

---

#### High-Resolution Timing & Timestamp Quantization

##### Timing Sources

| Source                           | Present | Notes                     |
| -------------------------------- | ------- | ------------------------- |
| event.monotonicTimestamp         |         | Preferred for timing math |
| event.timestamp                  |         | Wall-clock; may coalesce  |
| dump.highResolution.timeOrigin   |         |                           |
| dump.highResolution.monotonicNow |         |                           |

##### Quantization / Coalescing Detection

If stats.timingIntegrity exists, treat it as the authoritative source for timestamp collision metrics and do NOT recompute collisions from raw events.

Compute and report:

- % of events that share the same timestamp
- % of events that share the same monotonicTimestamp (if present)
- Number of timestamp collisions per trace
- Worst collision trace ID

| Metric                    | Value |
| ------------------------- | ----- |
| Timestamp collision rate  |       |
| Worst collision trace     |       |
| Collisions in worst trace |       |

Conclusion:

- Timing fidelity: HIGH / MED / LOW
- If LOW: explicitly warn that stage durations may be under-resolved.

---

#### Event Type Distribution

Table sorted by frequency (descending).

Include ALL event types unless there are more than 25 types.
If more than 25 exist, display the top 25 and summarize the remainder.


| Event Type | Count | % of Total |
| ---------- | ----- | ---------- |

ASCII Bar Chart (proportional to count):

controller:start:attempt ██████████  
...

Highlight:

- Symmetry across lifecycle stages
- Missing expected stages
- Irregular or skewed distribution

---

#### Stage Aggregates (Per-Event stageDurationMs)

If events include latencyCategory fields:

- Only stages where latencyCategory = "pipeline" should contribute to stage performance analysis.
- latencyCategory = "user" must be interpreted as human interaction delay.
- latencyCategory = "scheduler" represents event loop scheduling delay.

Note:
The SDuX recorder uses **"pipeline"** as the compute-stage label.
Any references to **"compute"** should be interpreted as **"pipeline"**.

User latency must never be interpreted as pipeline compute time.

Use stats.stageAggregates.  
If stats.stageAggregates is undefined, skip this section.

Table sorted by Avg (descending):

| Stage (event.type) | Count | Avg (ms) | P95 (ms) | Max (ms) | Min (ms) | Total (ms) |
| ------------------ | ----- | -------- | -------- | -------- | -------- | ---------- |

If P95 is not provided in stats.stageAggregates and raw events are available, compute it from stageDurationMs grouped by event.type.

ASCII Bars (Avg duration):

stage:start:persist ███████████  
stage:start:compute-merge ███████ 
...

Highlight:

- Top 5 most expensive stages
- Stages with high variance (Max ≫ Avg)
- Stages with frequent Min = 0 (possible timestamp quantization)

###### Latency Root-Cause Detection (Required)

Using stats.stageAggregates, determine whether a small number of stages dominate total compute time.

Compute:

- Percentage of total stage time contributed by the top 3 stages.
- Whether the top stage exceeds 30–40% of total stage time.

If a small number of stages dominate:

State:

> "Pipeline latency is dominated by a small number of stages."

Then explicitly identify:

- The dominant stage(s)
- Their average and P95 durations
- Their contribution to total stage time

If stage durations are evenly distributed:

State:

> "Pipeline latency appears evenly distributed across stages."

Do NOT infer bottlenecks without supporting aggregate metrics.

---

#### Pipeline Flamegraph (Trace Stage Composition)

Render only if stats.pipelineFlamegraph exists.

Use:

stats.pipelineFlamegraph

Each entry represents the aggregated stage timing breakdown for a trace.

Render table:

| Trace ID | Stage | Duration (ms) |

Expand each trace into multiple rows.

Example structure:

| Trace ID | Stage | Duration (ms) |
|---------|------|---------------|
| T1 | controller:start | 12 |
| T1 | state:update | 8 |
| T1 | persist | 20 |

###### Interpretation

- Identify which stages dominate execution within each trace.
- Compare slow traces against faster traces to identify stage imbalance.
- Use stage duration composition to identify architectural hotspots.

Do NOT recompute flamegraph data if the aggregated metric is present.

---

#### Flamegraph Latency Decomposition (Required)

Render this section only if:

stats.pipelineFlamegraph exists.

Use:

stats.pipelineFlamegraph

Each entry represents the **aggregated stage duration breakdown for a single trace**.

---

##### Per-Trace Stage Composition

For each trace:

Compute:

| Trace ID | Total Stage Time | Dominant Stage | Dominant Stage % |

Rules:

- Total Stage Time = sum(stage.durationMs)
- Dominant Stage = stage with the largest duration
- Dominant Stage % = (stage.durationMs / totalTraceStageTime) × 100

Sort traces by **Total Stage Time (descending)**.

---

##### Stage Dominance Analysis

Determine whether latency is concentrated in specific stages.

Compute across all traces:

| Stage | Total Time | % of Total Pipeline Time |

Rules:

- Total Time = sum(durationMs across all traces)
- % = stageTotal / sum(all stage durations)

Sort by **Total Time descending**.

---

##### Latency Dominance Classification

Based on the stage dominance distribution classify the pipeline:

| Condition | Interpretation |
|----------|---------------|
| One stage > 50% | Severe stage bottleneck |
| Top 2 stages > 70% | Concentrated latency |
| Top 3 stages > 80% | Moderate stage concentration |
| Even distribution | Balanced pipeline |

---

##### Trace Imbalance Detection

Identify traces where:

Dominant Stage % > 60%

Render table:

| Trace ID | Dominant Stage | Dominant % | Total Stage Time |

These traces indicate **stage imbalance** where a single stage dominates execution.

---

##### Engineering Interpretation

Explain:

- Which stage contributes the largest share of total pipeline latency.
- Whether the dominant stage appears consistently across traces.
- Whether slow traces share the same dominant stage.
- Whether slow traces are caused by:
  - pipeline stages
  - persistence stages
  - controller emissions
  - merge or reconciliation stages

---

##### Architectural Insight

Evaluate whether latency arises from:

| Cause | Evidence |
|------|---------|
| Single-stage bottleneck | dominant stage > 50% |
| Cross-stage pipeline overhead | evenly distributed latency |
| Persistence pressure | persist-related stages dominate |
| Controller emission pressure | controller stages dominate |

---

##### Output Summary

Explicitly state:

> "Pipeline latency is primarily driven by: **<stage name>**"

or

> "Pipeline latency is evenly distributed across stages."

Do NOT infer stage-level causality without supporting stage duration metrics.

---


#### State Analytics & Integrity

##### Availability (MANDATORY)

If stats.stateAnalytics is undefined:

State:

> "State telemetry was not recorded for this session."
> "Payload telemetry was not recorded for this session."

Do NOT render any additional state or payload analysis sections.  
Stop this entire section.

If stats.stateAnalytics exists, continue.

---

##### State Volume & Size

| Metric                  | Value                                 |
| ----------------------- | ------------------------------------- |
| Trace Count With State  | count(keys(stateSizePerTrace))        |
| Avg Payload Size        | stats.stateAnalytics.avgPayloadSize   |
| Avg State Diff Size     | stats.stateAnalytics.avgStateDiffSize |
| Persist Payload Entries | length of persistPayloadSizeRanking   |

Interpretation:

- High Avg State Diff Size → possible large merges or inefficient updates.
- Large Persist Payload Entries → potential storage bottleneck.
- If Avg Payload Size = 0 AND persistPayloadSizeRanking is empty:

State:

> "Payload analytics appear empty or not captured in this session."

Do NOT conclude payloads are small without explicit evidence.

---

##### State Churn & Mutation Velocity

| Metric               | Value                                  |
| -------------------- | -------------------------------------- |
| Max Churn Per Second | stats.stateAnalytics.maxChurnPerSecond |
| Avg Churn Per Second | stats.stateAnalytics.avgChurnPerSecond |

###### Interpretation

- High max churn → burst mutation pattern.
- High sustained avg churn → potential render pressure.
- Correlate with trace durations and blocked eventLoopPhase if relevant.

---

##### State Structure Quality

| Metric                    | Value                                            |
| ------------------------- | ------------------------------------------------ |
| Deepest Nesting Depth     | stats.stateAnalytics.deepNestingMaxDepth         |
| Large Object Count        | stats.stateAnalytics.largeObjectCount            |
| Repeated Identical States | stats.stateAnalytics.repeatedIdenticalStateCount |
| Entropy Score             | stats.stateAnalytics.stateEntropyScore           |

###### Interpretation

- Nesting depth > 6–8 → likely normalization concern.
- largeObjectCount > 0 → potential memory or serialization cost risk.
- High repeatedIdenticalStateCount → wasted updates.
- High entropy → inconsistent state shape across traces.

###### Do NOT

- Inspect raw state objects.
- Output serialized state.
- Infer structure beyond aggregate metrics.

---

##### State Serialization Failures (Critical)

If stats.stateAnalytics.stateSerializationErrors === 0:

State:

> "No state serialization failures detected."

Stop this section.
Do NOT render any tables.

If stats.stateAnalytics.stateSerializationErrors > 0:

Render the serialization summary and error breakdown tables.

---

###### Summary

| Metric                     | Value                                                             |
| -------------------------- | ----------------------------------------------------------------- |
| Total Serialization Errors | stats.stateAnalytics.stateSerializationErrors                     |
| Unique Error Messages      | count(keys(stats.stateAnalytics.stateSerializationErrorMessages)) |

---

##### Error Message Breakdown

Use:

stats.stateAnalytics.stateSerializationErrorMessages

Render a table sorted by count (descending):

| Error Message | Count | % of Total Errors |

Percentage rule:

- % = (Count / stats.stateAnalytics.stateSerializationErrors) × 100
- If stats.stateAnalytics.stateSerializationErrors === 0, omit the % column entirely.

---

##### Interpretation (Required)

After the table, analyze:

- Whether a single error message dominates.
- Whether multiple distinct failure types are present.
- Whether the pattern suggests structural state design issues.

Likely root causes may include:

- Circular references
- BigInt values
- Functions stored inside state
- DOM nodes in state
- Class instances with cyclic graphs
- Reactive objects (Subjects, Observables, Subscriptions)
- Extremely deep object graphs

###### Do NOT

- Attempt per-event attribution.
- Attempt trace-level attribution.
- Infer correlations not explicitly derivable from aggregate metrics.
- Fabricate relationships not present in the dump.

---

##### State Per Trace Distribution

Use:

stats.stateAnalytics.stateSizePerTrace

Render a table sorted by total state size (descending):

| Trace ID | Total State Size | % of Total State Volume |

Percentage rule:

- Total State Volume = sum(stats.stateAnalytics.stateSizePerTrace values).
- % = (Trace State Size / sum(all stateSizePerTrace values)) × 100
- If total state volume is 0, omit the % column.

---

###### Interpretation

- Determine whether a small number of traces dominate total state volume.
- Identify any trace contributing disproportionate mutation volume.
- Assess whether state mutation is evenly distributed across traces.

---

###### Explicit Guardrails

- Do NOT print raw state objects.
- Do NOT infer missing metrics.
- Do NOT assume payload/state presence unless confirmed.
- Do NOT fabricate trace-level serialization mapping.
- Only use aggregate metrics available in stats.stateAnalytics.

---

#### Payload Analytics & Volume Impact

##### Availability

If stats.stateAnalytics is undefined:

State:

> "Payload telemetry was not recorded for this session."

Do NOT render any additional payload subsections.
Stop this entire section.

If stats.stateAnalytics exists, continue.

---

##### Payload Volume Overview

Use:

stats.stateAnalytics

| Metric                  | Value                                                    |
| ----------------------- | -------------------------------------------------------- |
| Avg Payload Size        | stats.stateAnalytics.avgPayloadSize                      |
| Large Object Count      | stats.stateAnalytics.largeObjectCount                    |
| Persist Payload Entries | length of stats.stateAnalytics.persistPayloadSizeRanking |

###### Interpretation

- Assess whether avgPayloadSize indicates consistently small or materially large payloads.
- Evaluate whether largeObjectCount suggests serialization or memory pressure risk.
- Determine whether persistPayloadSizeRanking implies concentration of payload volume in specific traces.
- Do NOT infer event-level payload distribution unless directly derivable from raw events.

---

##### Persist Payload Ranking (Top 5)

Use:

stats.stateAnalytics.persistPayloadSizeRanking

Render table sorted by size (descending):

| Trace ID | Payload Size |

Do NOT fabricate event types if not directly present in the ranking data.

###### Interpretation

- Determine whether large persists cluster around specific traces.
- Assess correlation between large payload traces and long trace durations.
- Evaluate whether persistence may be a bottleneck.

---

##### Payload Distribution Pattern

Perform this analysis only if payload data can be directly derived.

1. Identify event types carrying payloads only if raw events allow counting where:
   "'payload' in event"

2. Compute approximate percentage of events containing payload only if derivable from raw events.

If stats.stateAnalytics is undefined:

State:

> "Payload telemetry was not recorded for this session."

If stats.stateAnalytics is present BUT:

- stats.stateAnalytics.avgPayloadSize === 0
- stats.stateAnalytics.persistPayloadSizeRanking is empty

State:

> "Payload analytics appear empty or not captured in this session."

Do NOT conclude payloads are small without explicit evidence.

3. Correlate large payload traces (if present) with:

- Long stageDurationMs
- Blocked eventLoopPhase
- High p95 stages

Only use aggregate metrics or directly derivable values.

Render table if derivable:

| Event Type | Count with Payload | Avg Payload Size |

---

##### Large Payload Risk Detection

If stats.stateAnalytics.largeObjectCount > 0:

Analyze using aggregate metrics only.

Assess whether large payloads are likely associated with:

- Persist-related stages
- Merge/compute stages
- Controller emissions
- Error-handling paths

Do NOT fabricate per-event attribution unless directly derivable from raw events.

###### Likely Causes

- Emitting full state instead of diffs
- Unnormalized nested structures
- Redundant array/object copies
- Large collections repeatedly emitted

###### Engineering Recommendations (3–5)

- Emit diffs instead of full state objects
- Normalize large collections into ID maps
- Avoid re-emitting unchanged data
- Persist only deltas where possible
- Consider compression for large persistence payloads (if persistence-bound)

If stats.stateAnalytics.largeObjectCount === 0:

State:

> "No large payload anomalies detected."

---

##### Payload vs State Comparison

Only render if stats.stateAnalytics exists.

###### Analysis

Evaluate:

- Whether avgPayloadSize is proportional to avgStateDiffSize
- Whether payload sizes exceed resulting state changes
- Whether state mutation is small but payload size is large (anti-pattern)

If payload telemetry exists but state telemetry does not:
Limit analysis strictly to payload-level metrics.

If stats.stateAnalytics is undefined:

State:

> "State and payload telemetry were not recorded for this session."

---

#### Scheduler & Event Loop Phase (Microtask / Macrotask / Delayed)

Render this section only if scheduling data exists.

Use:

- stats.schedulerDistribution
- stats.eventLoopPhaseDistribution
- event.scheduler (raw events only if aggregated metrics are missing)

Priority Rules:

1. If stats.eventLoopPhaseDistribution exists, treat it as authoritative.
2. Only derive phase counts from raw events if the aggregated metric is missing.
3. Never overwrite aggregated metrics with recomputed values.

---

##### Scheduler Distribution

Use stats.schedulerDistribution.

| Scheduler | Count | % |

Compute % relative to total scheduled events.

---

##### Event Loop Phase Distribution

Prefer stats.eventLoopPhaseDistribution if present.

If stats.eventLoopPhaseDistribution exists, render the table using that data.

Only compute phase counts from raw events if the aggregated metric is missing.

| Phase | Count | % |

Compute % relative to total events containing eventLoopPhase.

---
##### Scheduler × Phase Cross-Tab (Optional)

Only render if both scheduler and eventLoopPhase are derivable.

| Scheduler \ Phase | synchronous | microtask | macrotask | delayed | blocked |

Do NOT fabricate phases that do not appear in the dump.

---

###### Interpretation

- Assess evidence of microtask batching.
- Evaluate macrotask alignment with frame boundaries.
- Identify blocked phases indicating potential main-thread contention.
- If blocked phases exceed 5–10% of events, flag potential main-thread contention.

---

#### User Interaction Latency

Render this section only if stats.userLatencyDistribution exists.

Use:

stats.userLatencyDistribution

| Metric | Value |
|------|------|
| Avg User Latency | stats.userLatencyDistribution.avgMs OR stats.userLatencyDistribution.avgUserLatency |
| P95 User Latency | stats.userLatencyDistribution.p95Ms OR stats.userLatencyDistribution.p95UserLatency |
| Max User Latency | stats.userLatencyDistribution.maxMs OR stats.userLatencyDistribution.maxUserLatency |

###### Interpretation

User latency represents **human interaction delay between UI-triggered events**.

Examples include:

- time between button clicks
- time spent reading UI before the next action
- developer pause during debugging sessions

This latency **must not be interpreted as pipeline performance cost**.

If user latency significantly exceeds pipeline compute latency:

State:

> "Observed latency is primarily driven by user interaction delays rather than pipeline execution."

---

#### Burst & Frame Pressure (Burst Analysis)

Render only if stats.burstAnalysis exists.

Use:

stats.burstAnalysis.maxEventsPerFrame

| Metric                             | Value                                 |
| ---------------------------------- | ------------------------------------- |
| Max Events Per Frame (16ms bucket) | stats.burstAnalysis.maxEventsPerFrame |

---

##### Frame Window Reconstruction (Optional)

If timestamps are available:

- Bucket events into 16ms windows (prefer monotonicTimestamp).
- Identify top 10 busiest windows.

| Frame Window (start–end ms) | Event Count | Top Trace IDs | Top Event Types |

Do NOT fabricate window boundaries if timestamps are unavailable.

---

###### Conclusion

Classify frame pressure risk:

- LOW
- MED
- HIGH

Justify classification using observed burst metrics.

---

#### Trace Fan-Out Detection

Render only if stats.traceFanOut exists.

Use:

stats.traceFanOut

Fan-out threshold definition:

A trace is considered a fan-out explosion when it produces an unusually large number of events relative to typical traces.

Render table:

| Trace ID | Event Count |

Sort by Event Count (descending).

If stats.traceFanOut is empty:

State:

> "No trace fan-out anomalies detected."

###### Interpretation

Fan-out explosions may indicate:

- runaway observable pipelines
- recursive event emissions
- feedback loops between behaviors/controllers
- excessive branching inside event handlers

Cross-reference these traces with:

- longestTraceDurationMs
- burstAnalysis.maxEventsPerFrame
- blocked eventLoopPhase

---

#### Pipeline Cycle Detection (Feedback Loop Analysis)

This section attempts to detect **pipeline feedback loops**, where stages repeatedly trigger each other and produce runaway event chains.

Render only if the following metrics exist:

- stats.traceFanOut
- stats.traces
- stats.eventTypes

---

##### Cycle Detection Signals

Evaluate the following indicators:

| Signal | Evidence |
|------|---------|
| Fan-out explosion | traceFanOut contains entries |
| High event counts per trace | traces[traceId].eventCount unusually large |
| Burst pressure | burstAnalysis.maxEventsPerFrame unusually high |
| Repeating event types | eventTypes distribution dominated by small subset |
| Recursion pattern detected | stats.pipelineRecursion.detected |

If **two or more signals occur simultaneously**, flag a **potential pipeline cycle**.

---

If stats.pipelineRecursion.detected is true:

Render:

| Trace ID | Repeating Stage Pattern | Repetition Count |
|----------|------------------------|------------------|
| stats.pipelineRecursion.traceId | stats.pipelineRecursion.repeatingPattern | stats.pipelineRecursion.repetitionCount |

Interpretation:

A repeating stage pattern indicates **pipeline recursion**, where stages repeatedly trigger each other.

This is commonly caused by:

- controller self-triggering
- observable loops
- state feedback cycles
- missing termination conditions

This condition often produces:

- trace fan-out explosions
- repeated stage sequences
- runaway pipelines.

---

##### Candidate Cycle Traces

Use:

stats.traceFanOut

Render table:

| Trace ID | Event Count | Duration (ms) |

Sort by Event Count (descending).

These traces may represent **feedback loops** or **runaway pipelines**.

---

##### Repeating Stage Pattern Detection

Use:

stats.eventTypes

Identify whether a small number of event types dominate the distribution.

If the **top 3 event types exceed 60% of total events**, state:

> "Event distribution suggests a repeating stage pattern, which may indicate a pipeline cycle."

---

##### Cycle Risk Classification

Classify risk level using the following rules:

| Condition | Risk |
|----------|------|
| Fan-out traces exist + high burstAnalysis.maxEventsPerFrame | HIGH |
| Fan-out traces exist | MED |
| Repeating stage dominance only | LOW |
| No indicators | NONE |

---

##### Interpretation

Pipeline cycles typically arise from:

- controller emissions triggering themselves
- observable chains re-emitting upstream events
- recursive pipeline stage transitions
- missing termination conditions

These conditions can cause:

- runaway event counts
- frame pressure
- state churn
- UI lockups.

Do NOT declare a confirmed cycle unless **multiple independent signals** support the conclusion.

Instead use language such as:

> "Metrics suggest a possible pipeline feedback loop."

or

> "No pipeline cycle indicators detected."

---

#### Jank & Long Task Correlation

Render only if dump.longTasks exists and contains entries.

| # | Start (ms) | Duration (ms) | Over 50ms? |

If stats.longTaskStats exists, always render a short summary table before any correlation logic:

If stats.longTaskStats exists, render:

| Metric | Value |
| ------ | ----- |
| Long Task Count | stats.longTaskStats.count |
| Max Long Task (ms) | stats.longTaskStats.maxDuration |

This summary must be rendered even if dump.longTasks entries are empty or unavailable.
Do NOT infer long tasks if stats.longTaskStats is missing.

---

##### Correlation Analysis (Aggregate Only)

If monotonic timestamps are available:

- Identify traces overlapping long task windows.
- Rank top 3 correlated traces by overlap duration.

Do NOT infer correlation if timestamps are insufficient.

If dump.longTasks is empty or unavailable:

State:

> "Long Task API not available or no long tasks detected in this session."

---

#### Trace Analysis

Use stats.traces.

##### Trace Latency Ranking (P95 Analysis)

If the following metrics exist within stats.traces entries:

- meanStageDuration
- p95StageDuration
- maxStageDuration

Render the table:

| Rank | Trace ID | Event Count | Duration (ms) | Mean Stage (ms) | P95 Stage (ms) | Max Stage (ms) |

Sort the table by **P95 Stage (ms) descending**.

Interpretation rules:

- The trace with the highest **P95 Stage Duration** should be considered the most unstable pipeline execution.
- High **Mean Stage Duration** indicates consistently slow stages.
- High **P95 Stage Duration** indicates latency spikes inside a trace.
- High **Max Stage Duration** indicates a single stage outlier or blocking operation.

If these metrics exist, **do NOT recompute stage latency from raw events**.  
Treat the aggregated trace metrics as authoritative.

Render table sorted by duration (descending):

| Trace ID | Event Count | Duration (ms) |

---

##### Trace Latency Metrics (If Present)

If stats.traces entries include the following fields:

- meanStageDuration
- p95StageDuration
- maxStageDuration

Render the table:

| Trace ID | Event Count | Duration (ms) | Mean Stage (ms) | P95 Stage (ms) | Max Stage (ms) |

Sort by **Duration (ms)** descending.

Interpretation:

- High **Mean Stage Duration** indicates consistently slow pipeline stages.
- High **P95 Stage Duration** indicates latency spikes within traces.
- High **Max Stage Duration** indicates single-stage outliers or blocking operations.

###### Small Trace Guardrail

If a trace contains fewer than **3 stage durations**, treat the trace as **statistically insufficient for latency distribution analysis**.

In this case:

- Do NOT interpret meanStageDuration or p95StageDuration.
- Only report durationMs and eventCount.

State:

> "Trace contains too few stage samples for reliable latency distribution analysis."

If these metrics exist, prefer them over recomputing stage latency from raw events.

---

##### Longest Trace (Aggregate)

Render only if stats.longestTraceId exists.

| Metric | Value |
|------|------|
| Longest Trace ID | stats.longestTraceId |
| Duration (ms) | stats.longestTraceDurationMs |

Interpretation:

- This trace represents the longest pipeline execution in the session.
- Compare its duration against median and cluster distribution.
- If the longest trace exceeds 2× median duration, flag as a potential outlier.

Do NOT recompute this value if the metric already exists in stats.

---

##### Per-Trace Metrics (If Derivable)

If stageDurationMs exists:

| Trace ID | Duration | Mean stageDuration | P95 stageDuration | Max stageDuration | Timestamp Collisions | Out-of-Order Count |

Compute values only if derivable from dump data.

---

##### Ordering Rules

- Order events within a trace by sequenceNumber if present.
- Otherwise order by (monotonicTimestamp, timestamp).
- Detect out-of-order events using monotonic deltas.
- Use stats.structuralIntegrity if available.

---

##### Slowest Trace Breakdown

Explain:

- Relative duration vs median trace.
- Variance from cluster average.
- Potential architectural or scheduling causes.

Do NOT fabricate causal explanations not supported by metrics.

---

#### Trace Duration Visualization

Render only if trace duration data is available.

Produce an ASCII bar graph sorted by duration (descending):

Trace ID Duration
ABC123 ███████
DEF456 ████
...

Scale bars proportionally relative to the longest trace.

---

##### Mermaid Visualization

Render this section only if trace duration data is available.

The Mermaid chart MUST be wrapped in a fenced code block exactly as shown below.

Required format:

\`\`\`mermaid
bar
title Trace Duration Comparison
x-axis Trace ID
y-axis Duration (ms)
<TRACE_ID>: <DURATION>
\`\`\`

Rules:

- Replace placeholders with actual trace IDs and corresponding duration values from the dump.
- Do NOT fabricate sample IDs or durations.
- If fewer than two traces exist, omit the Mermaid chart.
- Use the exact \`\`\`mermaid fence (no quotes, no alternative fencing).
- Do NOT omit the \`\`\`mermaid code fence.
- Do NOT include explanatory text inside the Mermaid block.

---

#### Error Analysis

Use stats.errorEvents if available.

If stats.errorEvents === 0:

State:

> "No error stage transitions detected."

Stop this section.

---

If stats.errorEvents > 0:

##### Error Distribution by Trace

Group errors by trace using aggregate data only.

| Trace ID | Error Count | First Error Timestamp |

- Identify the earliest error timestamp (prefer monotonicTimestamp).
- Do NOT fabricate per-event details not derivable from the dump.

###### Interpretation

- Determine whether errors cluster within specific traces.
- Assess whether errors occur early (initialization) or late (persistence/cleanup).
- Avoid causal speculation unless supported by metrics.

---

#### Registry Analysis

If registry is undefined:

State:

> "Registry snapshot was not included in this dump."

Stop this section.

---

If registry exists:

##### Feature Cell Overview

Use:

registry.featureCells

| Feature Cell | Behaviors Count | Controllers Count |

- Feature Cell = featureCells[i].key (or best identifier present)
- Behaviors Count = length of featureCells[i].behaviors (if present)
- Controllers Count = length of featureCells[i].controllers (if present)

Do NOT assume license or critical flags unless explicitly present.

###### Interpretation

- Identify unusually high behavior/controller counts.
- Detect missing expected registrations.
- Highlight configuration drift only if directly observable.

---

##### Behavior Breakdown

Render only if behaviors exist within:

registry.featureCells[].behaviors

| Behavior Key | Type | Additional Flags (if present) |

Rules:

- Behavior Key = behavior.key (or best identifier available).
- Type = behavior.type if present.
- Additional Flags = include only fields that explicitly exist in the dump.
- Do NOT assume "critical", "license", or other flags unless present.

Do NOT fabricate missing fields.

---

##### Controller Breakdown

Render only if controllers exist within:

registry.featureCells[].controllers

| Controller Key | Type | Additional Flags (if present) |

Rules:

- Controller Key = controller.key (or best identifier available).
- Type = controller.type if present.
- Additional Flags = include only fields explicitly present.
- Do NOT assume "critical", "license", or other metadata unless present.

Do NOT fabricate missing fields.

---

###### Interpretation

Assess:

- Whether any feature cell has unusually high behavior or controller counts.
- Whether expected behaviors/controllers appear absent.
- Whether configuration drift is observable from registration imbalance.
- Licensing signals only if explicitly present in the dump.

Do NOT infer licensing state, criticality, or enforcement rules unless directly derivable from registry data.

---

#### License Summary

Render only if licensing information is explicitly present in the dump.

Canonical licensing field:

- registry.licenseSummary

This field represents the aggregated licensing status for the session.
If registry.licenseSummary exists, use it as the authoritative licensing metric.

If registry.licenseSummary is undefined:

State:

> "No licensing data was included in this dump."

Stop this section.

---

If licensing data exists:

| License State | Count |

Only use license states explicitly present in the dump.
Do NOT infer licensing status.

###### Commentary

Assess:

- Whether all components appear fully licensed.
- Whether any license states indicate pending or revoked conditions.
- Whether any licensing state suggests potential runtime risk.

Do NOT speculate beyond explicit license fields.

---

#### Determinism & Structural Integrity Analysis

Use stats.structuralIntegrity if present.

Evaluate:

- Consistent event counts per trace.
- Symmetric lifecycle transitions.
- Missing expected transitions.
- Duplicate stage occurrences.
- Cross-trace bleed indicators.
- Out-of-order timestamps.

###### Trace Structural Symmetry Check

Evaluate whether traces exhibit consistent stage lifecycles.

Indicators of structural imbalance:

- Missing expected terminal stages
- Traces with unusually short event counts
- Traces with unusually long event counts
- Repeated stage sequences within a trace

If a small subset of traces deviates significantly from the typical stage lifecycle, state:

> "Trace lifecycle asymmetry detected. Some traces exhibit structural deviations from the typical pipeline flow."

###### Nondeterminism Detection (Required)

Use the following signals:

- stats.structuralIntegrity.duplicateTraceCount
- stats.structuralIntegrity.outOfOrderCount
- sequenceNumber ordering
- monotonicTimestamp ordering

If duplicateTraceCount > 0:

State:

> "Duplicate trace identifiers detected. This may indicate cross-trace bleed or reused trace IDs."

If outOfOrderCount > 0:

State:

> "Out-of-order event timestamps detected. This may indicate race conditions or asynchronous reordering."

If both duplicateTraceCount === 0 AND outOfOrderCount === 0:

State:

> "No nondeterministic execution indicators detected."

Do NOT infer nondeterminism unless these signals are present.

If stats.structuralIntegrity exists:

- duplicateTraceCount
- outOfOrderCount

Also evaluate if derivable:

- Timestamp collisions per trace.
- Idle gaps inside traces using monotonic deltas.
- stageDurationMs outliers (spikes relative to average).

---

###### Deterministic Integrity Rating

Explicitly state one of:

- PASS
- WARN
- FAIL

Justify rating strictly using observable metrics.
Do NOT speculate beyond measurable indicators.

---

#### Pipeline Deadlock Detection

Render only if stats.deadlockByTrace exists.

Use:

stats.deadlockByTrace

Deadlock heuristic definition:

A trace may be considered deadlocked when:

- trace.durationMs exceeds 2000 ms
- AND trace.eventCount < 3
- indicating stalled or incomplete pipeline execution.

Render table:

| Trace ID | Deadlock Suspected |
|----------|--------------------|

Include only traces where value = true.

If none are true:

State:

> "No potential pipeline deadlocks detected."

###### Interpretation

Deadlocks may indicate:

- incomplete stage transitions
- aborted pipelines
- missing terminal events
- external cancellation
- scheduler starvation

---

#### Latency Observations

Use stats.traces, stats.computeVsIdle, and stats.maxIdleGapMs if present.

If stats.maxIdleGapMs exists:

| Metric              | Value                  |
| ------------------- | ---------------------- |
| Max Idle Gap (ms)    | stats.maxIdleGapMs     |

Use this metric to assess whether large gaps between traces indicate user interaction pauses or scheduling delays.

If stats.computeVsIdle is undefined:

State:

> "Compute vs idle telemetry was not recorded for this session."

Do NOT estimate compute ratios without explicit metrics.

Evaluate:

- Fastest trace duration.
- Slowest trace duration.
- Median trace duration.
- Standard deviation estimate (if derivable).
- Whether trace durations are tightly clustered or widely dispersed.

If stats.computeVsIdle exists:

| Metric                   | Value                                 |
| ------------------------ | ------------------------------------- |
| Total Compute Time (ms)  | stats.computeVsIdle.totalComputeTime  |
| Estimated Idle Time (ms) | stats.computeVsIdle.estimatedIdleTime |
| Compute Ratio            | stats.computeVsIdle.computeRatio      |

##### Trace Latency Hotspot Detection

If trace latency metrics exist:

Use:

- stats.traces[*].meanStageDuration
- stats.traces[*].p95StageDuration
- stats.traces[*].maxStageDuration

Identify traces where:

- p95StageDuration is significantly larger than meanStageDuration
- maxStageDuration is an outlier relative to other traces

Render table:

| Trace ID | Mean Stage | P95 Stage | Max Stage | Duration |

These traces indicate **latency hotspots** where individual stages may be blocking or performing expensive operations.

Interpretation:

- Mean ≈ P95 → stable stage performance
- P95 ≫ Mean → intermittent latency spikes
- Max ≫ P95 → single-stage outlier

###### User Interaction Dominated Traces

If stats.userLatencyDistribution exists, evaluate whether slow traces may be dominated by **user interaction delay rather than pipeline execution**.

Heuristic:

If:

- trace.durationMs is significantly larger than meanStageDuration × eventCount
- AND (stats.userLatencyDistribution.avgMs OR stats.userLatencyDistribution.avgUserLatency) 
is high relative to stage durations

Then interpret the trace as **user interaction dominated latency**.

State:

> "Trace latency appears dominated by user interaction delay rather than pipeline execution."

In this case:

- Do NOT classify the trace as a performance bottleneck.
- Do NOT attribute the latency to slow pipeline stages.

Instead classify the trace as **UI interaction latency**.

This commonly occurs during development sessions where engineers pause between actions.

---

###### Compute vs Idle Interpretation

Using stats.computeVsIdle.computeRatio classify the pipeline workload:

| Compute Ratio | Interpretation |
|---------------|---------------|
| > 0.80 | CPU-bound pipeline |
| 0.40–0.80 | Mixed compute + scheduling |
| < 0.40 | Scheduling / IO bound |
| ~1.0 | Continuous compute workload |

Also evaluate:

- Whether estimatedIdleTimeMs indicates burst workloads.
- Whether high compute ratios correlate with slow stages.

###### Excellent Pipeline Performance Detection

If the following conditions are true:

- stats.computeVsIdle.computeRatio < 0.30
- Average stageDurationMs from stats.stageAggregates is < 5ms
- No stage dominates more than 40% of total stage time

Then explicitly state:

> "Pipeline execution performance appears excellent. Observed latency is likely caused by external factors such as user interaction delays, rendering, network activity, or debugging pauses rather than SDuX pipeline execution."

---

#### Primary Performance Bottleneck Detection (Required)

Determine the single most significant performance bottleneck using the following priority order:

1. Highest Avg stageDurationMs from stats.stageAggregates
2. Highest P95 stageDurationMs from stats.stageAggregates
3. Longest trace duration from stats.traces
4. Evidence of blocked eventLoopPhase
5. Highest burstAnalysis.maxEventsPerFrame
6. Long Task overlap if dump.longTasks exists

Use whichever signal provides the strongest evidence.

Additional Bottleneck Signal:

If stats.traces[*].p95StageDuration exists, treat the trace with the highest p95StageDuration as a potential bottleneck candidate.

---

##### Bottleneck Candidate Table

| Candidate Type | Identifier | Evidence |
|----------------|-----------|----------|
| Slowest Stage  |           | Avg / P95 duration |
| Slowest Trace  |           | Duration (ms) |
| Frame Pressure |           | Max events per frame |
| Main Thread Block |       | eventLoopPhase = blocked |
| Long Task |                | Duration |

Populate only rows that are supported by dump metrics.

If stats.stageBottleneck exists:

Use it as the primary bottleneck candidate.

| Candidate Type | Identifier | Evidence |
|----------------|-----------|----------|
| Stage Bottleneck | stats.stageBottleneck | Total stage compute time = stats.stageBottleneckTimeMs |

This metric represents the stage responsible for the largest share of total pipeline compute time.

Prefer this metric over recomputed bottleneck inference when available.

---

##### Final Bottleneck Determination

Explicitly declare:

> **Primary Bottleneck: <stage / trace / scheduling / frame pressure / long task>**

Then explain **why it dominates system latency** using the observed metrics.

If no strong bottleneck signal exists:

State:

> "No dominant performance bottleneck detected. Latency appears evenly distributed."

Do NOT fabricate bottlenecks that are not supported by metrics.

---

###### Interpretation

Assess:

- Whether the session is dominated by idle gaps between traces.
- Whether compute is tightly clustered but bursty.
- Whether behavior appears CPU-bound or IO-bound (only if supported by metrics).

Do NOT infer bottlenecks without supporting data.

---

#### Bottleneck Fix Strategy

Generate a short engineering strategy to address the detected bottleneck.

Use the previously determined **Primary Bottleneck**.

Render:

| Bottleneck Type | Likely Cause | Recommended Fix |
|-----------------|-------------|----------------|
| Stage Bottleneck | compute-heavy stage | reduce stage complexity or split stage |
| Persistence Bottleneck | large payload or persistence latency | persist deltas instead of full state |
| Scheduling Bottleneck | heavy microtask/macrotask churn | debounce or batch event emissions |
| Fan-Out Explosion | recursive emissions | add termination guards or deduplicate events |
| Deadlock | stalled pipeline | verify terminal stage execution |

If the primary bottleneck was determined earlier, provide **2–4 concrete engineering actions**.

Example:

- Split "state:update" into smaller stages.
- Emit diffs instead of full state payloads.
- Introduce event deduplication for repeated controller emissions.
- Batch observable emissions using scheduler control.

If no bottleneck was detected:

State:

> "No clear remediation strategy required; pipeline latency appears evenly distributed."

---

#### Architectural Observations

Provide analysis based strictly on observable metrics.

Assess:

- Pipeline symmetry across traces.
- Stage ordering consistency.
- Controller execution patterns.
- Core state lifecycle cadence.
- Architectural anti-patterns only if directly supported by data.

Do NOT speculate beyond measurable evidence.

---

#### StackHash Hotspots (Repeated Callsite Patterns)

Render only if stackHash data exists.

Preferred source:

stats.stackHashCounts

If stats.stackHashCounts exists:

- Use it as the authoritative aggregation of stackHash frequencies.
- Do NOT recompute counts from raw events.

If stats.stackHashCounts is missing:

Group events by:

event.stackHash

Ignore:

stackHash === "h0" (fallback hash).

---

##### Hotspot Table (Top 10 by Count)

| StackHash | Count | Top Event Types | Top Traces | Avg stageDuration |

If stats.stackHashCounts only provides frequency counts:

- Populate the StackHash and Count columns.
- Leave other columns blank unless derivable from raw events.

Rules:

- Compute Avg stageDuration only if stageDurationMs exists.
- Use aggregate counts only.
- Do NOT fabricate missing stackHash values.

---

###### Interpretation

Assess:

- Whether slow stages concentrate in 1–2 callsites.
- Whether error events cluster under specific stackHash values.
- Whether hotspots indicate architectural imbalance.

Avoid causal speculation unless supported by metrics.

---

#### Runtime & Navigation Context

Render only if runtime or navigation fields exist.

##### Runtime Context

Use dump.runtime.

| Field               | Value                       |
| ------------------- | --------------------------- |
| hardwareConcurrency | runtime.hardwareConcurrency |
| deviceMemory        | runtime.deviceMemory        |
| connectionType      | runtime.connectionType      |

Only display fields that exist.

---

##### Navigation Timing (If Present)

Use dump.navigation.

| Metric          | Value                   |
| --------------- | ----------------------- |
| navigation.type | navigation.type         |
| domComplete     | navigation.domComplete  |
| loadEventEnd    | navigation.loadEventEnd |

Do NOT fabricate timing fields.

---

###### Commentary

Assess whether hardware or network constraints could plausibly explain:

- Jank
- Scheduling delays
- Long task clustering

Only draw conclusions if supported by observed metrics.

---

#### Actionable Recommendations

Provide **3–7 engineering recommendations** derived strictly from the metrics observed in the dump.

Recommendations MUST be supported by at least one of the following signals:

- stats.stageBottleneck or stats.stageAggregates
- stats.traces latency metrics (meanStageDuration / p95StageDuration / maxStageDuration)
- stats.computeVsIdle
- stats.burstAnalysis
- stats.traceFanOut
- stats.stackHashCounts
- stats.stateAnalytics
- stats.longTaskStats
- stats.schedulerDistribution or stats.eventLoopPhaseDistribution
- stats.structuralIntegrity
- registry.licenseSummary (if licensing signals exist)

Recommendations may address:

- Performance tuning
- Stage complexity reduction
- Persistence optimization
- Observability enhancements
- Stage timing instrumentation
- Scheduler or batching improvements
- Event deduplication or fan-out control
- StackHash hotspot mitigation
- State structure normalization
- License enforcement monitoring
- Trace correlation improvements

Rules:

- Each recommendation must reference the metric or signal that triggered it.
- Do NOT invent recommendations unrelated to observed metrics.
- Avoid generic advice unless a corresponding signal exists.
- Prioritize fixes addressing the **Primary Bottleneck** if one was identified.

If no actionable signals are present, state:

> "No concrete remediation actions are suggested based on the metrics available in this session."

---

#### Final System Health Score

Provide:

Overall Score: X / 10

Justify the score concisely using:

- Performance metrics
- Structural integrity indicators
- Error presence
- Determinism assessment
- Architectural balance

The score must be evidence-based and derived strictly from observable metrics.

---

#### Visual Requirements

The report MUST:

- Use tables where metrics are presented.
- Include ASCII bar graphs for at least one comparative metric.
- Include at least one Mermaid diagram (correct fenced syntax).
- Separate sections clearly.
- Prioritize readability and structured formatting.
- Avoid markdown clutter.
- Synthesize insight rather than restating raw metrics.

---

#### Critical Rules

- Do NOT rewrite the JSON.
- Do NOT output explanations of analysis steps.
- Do NOT print raw state objects.
- When referencing problematic state events, show only metadata:
  (traceId, event.type, sequenceNumber).
- Never output full serialized state.
- Do NOT include disclaimers.
- Do NOT summarize the JSON itself.
- Do NOT output raw event lists (max 10 rows only if sampling is necessary).
- Produce only the structured analysis report.
- Be authoritative, precise, analytical, and visually structured.

---

#### File Handling Rules

- The debug dump will be provided as an uploaded file.
- Do NOT request the JSON inline.
- Do NOT echo the entire JSON.
- Reference only extracted metrics.
- If the file exceeds context limits, analyze using progressive summarization.

Prioritization order when constrained:

1. stats.computeVsIdle, stats.stageAggregates
2. stats.traces (duration, p95, stageDuration collisions)
3. stats.schedulerDistribution, eventLoopPhase, stats.burstAnalysis
4. dump.longTasks correlation
5. registry and license summary
6. stats.eventTypes distribution

`;
