```

┌──────────────────────┐
│  StageDefinitions    │  (static metadata)
│  BehaviorDefinitions │
│  ParameterDefinitions│
└─────────┬────────────┘
          │  drives UI + validation
          ▼
┌──────────────────────────────┐
│   PipelineBuilderState       │  ← SINGLE SOURCE OF TRUTH
│ ─────────────────────────── │
│ step                         │
│ selectedStageIds             │
│ stages[StageId]              │
│  └─ behaviors[BehaviorId]    │
│ activeStageId                │
│ activeDocTopicId             │
└─────────┬───────────┬────────┘
          │           │
          │           │
          ▼           ▼
┌─────────────────┐   ┌────────────────────────┐
│ Wizard UI       │   │ Docs Router / Outlet   │
│ (Step 1 / 2)    │   │ (DocTopicId → Route)   │
└─────────────────┘   └────────────────────────┘
          │
          │ derives
          ▼
┌──────────────────────────────┐
│  Derived Projections         │
│ ─────────────────────────── │
│ • PipelineVisualization     │
│ • PipelineSourceOutput      │
│ • ValidationState           │
└──────────────────────────────┘
```
