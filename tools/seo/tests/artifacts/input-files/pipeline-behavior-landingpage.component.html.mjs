export const PIPELINE_BEHAVIOR_LANDINGPAGE_HTML = `
@switch (category) {
  @case ('deprecated') {
    @switch (type) {
      @case ('dispatch') {
        <sdux-pipeline-dispatch-behavior />
      }
      @case ('selectors') {
        <sdux-pipeline-selectors-behavior />
      }
    }
  }

  <!-- Encrypt -->
  @case ('encrypt') {
    @switch (type) {
      @case ('with-aes256encrypt-behavior') {
        <sdux-pipeline-encrypt-aes-256-behavior />
      }

      @default {
        <sdux-pipeline-encrypt-behavior />
      }
    }
  }

  @case ('error') {
    @switch (type) {
      @case ('with-core-error-callback-behavior') {
        <sdux-pipeline-with-core-error-callback-behavior />
      }
      @case ('with-error-transform-behavior') {
        <sdux-pipeline-with-error-transform-behavior />
      }

      @default {
        <sdux-pipeline-core-error-behavior />
      }
    }
  }

  <!-- Filters -->
  @case ('filters') {
    <sdux-pipeline-filters-behavior />
  }

  <!-- Initialize -->
  @case ('initialize') {
    @switch (type) {
      @default {
        <sdux-pipeline-initialize-behavior />
      }
    }
  }

  <!-- Interceptros -->
  @case ('interceptors') {
    @switch (type) {
      @case ('rxjs') {
        <sdux-pipeline-interceptors-rxjs />
      }

      @case ('with-global-error-pause-behavior') {
        <sdux-pipeline-interceptors-with-global-error-pause-behavior />
      }

      @default {
        <sdux-pipeline-interceptors-behavior />
      }
    }
  }

  @case ('entity-access') {
    @switch (type) {
      @case ('with-lookup-behavior') {
        <sdux-pipeline-lookup-behavior />
      }

      @case ('with-query-behavior') {
        <sdux-pipeline-query-behavior />
      }

      @case ('with-state-cache-behavior') {
        <sdux-pipeline-state-cache-behavior />
      }

      @default {
        <sdux-pipeline-entity-access />
      }
    }
  }

  <!-- Merge-->
  @case ('merge') {
    @switch (type) {
      @case ('with-array-merge-behavior') {
        <sdux-pipeline-array-merge-behavior />
      }

      @case ('with-array-append-merge-behavior') {
        <sdux-pipeline-array-append-merge-behavior />
      }

      @case ('with-array-push-merge-behavior') {
        <sdux-pipeline-array-push-merge-behavior />
      }

      @case ('with-object-deep-merge-behavior') {
        <sdux-pipeline-object-deep-merge-behavior />
      }

      @case ('with-object-shallow-merge-behavior') {
        <sdux-pipeline-object-shallow-merge-behavior />
      }

      @default {
        <sdux-pipeline-merge-behavior />
      }
    }
  }

  <!-- Operators -->
  @case ('operators') {
    @switch (type) {
      @case ('with-distinct-until-changed') {
        <sdux-pipeline-operators-with-distinct-until-changed />
      }

      @default {
        <sdux-pipeline-operators />
      }
    }
  }

  @case ('persist') {
    @switch (type) {
      @case ('with-cookie-storage-persist-behavior') {
        <sdux-pipeline-cookie-storage-persist />
      }

      @case ('with-local-storage-persist-behavior') {
        <sdux-pipeline-local-storage-persist />
      }
      @case ('with-session-storage-persist-behavior') {
        <sdux-pipeline-session-storage-persist />
      }

      @default {
        <sdux-pipeline-persist />
      }
    }
  }

  @case ('reducers') {
    <sdux-pipeline-reducers-behavior />
  }

  <!-- Resolve -->
  @case ('resolve') {
    @switch (type) {
      @case ('with-core-promise-behavior') {
        <sdux-pipeline-core-promise-behavior />
      }

      @case ('with-core-from-deferred-behavior') {
        <sdux-pipeline-core-from-deferred-behavior />
      }

      @case ('with-core-from-promise-behavior') {
        <sdux-pipeline-core-from-promise-behavior />
      }

      @case ('with-core-observable-behavior') {
        <sdux-pipeline-core-observable-behavior />
      }

      @case ('with-core-from-observable-behavior') {
        <sdux-pipeline-core-from-observable-behavior />
      }

      @case ('with-core-value-behavior') {
        <sdux-pipeline-core-value-behavior />
      }

      @case ('with-http-resource-behavior') {
        <sdux-pipeline-http-resource-behavior />
      }

      @case ('with-core-from-stream-behavior') {
        <sdux-pipeline-core-from-stream-behavior />
      }

      @default {
        <sdux-pipeline-resolve />
      }
    }
  }

  @case ('state') {
    @switch (type) {
      @case ('updating') {
        <sdux-pipeline-updating-state-behavior />
      }

      @case ('with-core-emit-state-behavior') {
        <sdux-pipeline-with-core-emit-state-behavior />
      }

      @default {
        <sdux-pipeline-core-state-behavior />
      }
    }
  }

  <!-- Stepwise -->
  @case ('stepwise') {
    @switch (type) {
      @case ('with-stepwise-resolve-behavior') {
        <sdux-pipeline-stepwise-resolve-behavior />
      }

      @case ('with-stepwise-filter-behavior') {
        <sdux-pipeline-stepwise-filter-behavior />
      }
      @case ('with-stepwise-reducer-behavior') {
        <sdux-pipeline-stepwise-reducer-behavior />
      }

      @default {
        <sdux-pipeline-stepwise-behavior />
      }
    }
  }

  <!-- Tab Sync -->
  @case ('tab-sync') {
    <sdux-pipeline-tab-sync-behavior />
  }

  @case ('taps') {
    @switch (type) {
      @case ('with-core-before-tap-behavior') {
        <sdux-pipeline-before-tap-behavior />
      }

      @case ('with-core-after-tap-behavior') {
        <sdux-pipeline-after-tap-behavior />
      }

      @default {
        <sdux-pipeline-core-tap-behavior />
      }
    }
  }

  @default {
    <sdux-pipeline-what-is-a-behavior />
  }
}
`;
