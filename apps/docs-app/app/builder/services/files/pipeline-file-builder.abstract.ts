import { computed, inject } from '@angular/core';
import { PipelineStepService } from 'apps/docs-app/app/builder/services/pipeline-step.service';
import { FileBuilderExampleType } from 'apps/docs-app/app/builder/types/file-builder/file-builder-example.type';
import { FileBuilderModeTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-mode.type';
import {
  FileBuilderNoteType,
  FileBuilderNoteTypes
} from 'apps/docs-app/app/builder/types/file-builder/file-builder-note.type';
import { FileBuilderTemplateTokenType } from 'apps/docs-app/app/builder/types/file-builder/file-builder-template-token.type';
import { FileBuilderUpdateStrategyType } from 'apps/docs-app/app/builder/types/file-builder/file-builder-update-strategy.type';
import { BehaviorIdTypes } from 'apps/docs-app/app/builder/types/id/behavior-id.type';
import {
  StateFrameworkType,
  StateFrameworkTypes
} from 'apps/docs-app/app/builder/types/state-framework.type';
import { FileBuilderVaultApiComments } from '../../constants/builder/fluent-api-comments.constant';
import { BehaviorDefinitionShape } from '../../shapes/behavior-definition.shape';
import { StageDefinitionShape } from '../../shapes/stage-definition.shape';
import {
  FileBuilderApiType,
  FileBuilderApiTypes,
  FileBuilderVaultApiOrder
} from '../../types/file-builder/file-builder-api.type';
import { FileBuilderEmitTypes } from '../../types/file-builder/file-builder-emit.type';
import {
  FileBuilderTargetType,
  FileBuilderTargetTypes
} from '../../types/file-builder/file-builder-target.type';
import { StateInitialValueTypes } from '../../types/state-initial-value.type';
import {
  StatePrimitiveType,
  StatePrimitiveTypes
} from '../../types/state-primitive.type';
import { PipelineBuilderService } from '../pipeline-builder.service';

export abstract class PipelineFileBuilderAbstract {
  protected pipelineBuilderService = inject(PipelineBuilderService);
  #pipelineStepService = inject(PipelineStepService);

  #spacer = '  ';
  #featureCellArrayTabSpacer = `\t${this.#spacer}`;
  #behaviorTabSpacer = '\t\t';

  #importTabSpacer = this.#spacer;
  #vaultFluentTabSpacer = `\t${this.#spacer}`;
  #vaultArrayTabSpacer = `${this.#vaultFluentTabSpacer}\t`;
  #vaultFluentValueTabSpacer = `${this.#vaultArrayTabSpacer}${this.#spacer}`;

  #vaultParenthesisTabSpacer = this.#vaultFluentTabSpacer;

  protected toPascalCase(value: string | null | undefined): string {
    if (!value) return '';

    return (
      value
        // Replace separators with spaces
        .replace(/[_\-]+/g, ' ')
        // Remove non-alphanumeric characters
        .replace(/[^\w\s]/g, '')
        // Split into words
        .split(' ')
        .filter(Boolean)
        // Capitalize each word
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join('')
    );
  }

  protected buildType(
    shape: string,
    primitive: StatePrimitiveType | null
  ): string {
    if (!primitive) return shape;

    switch (primitive) {
      case StatePrimitiveTypes.Array:
        return `${shape}[]`;
      case StatePrimitiveTypes.Object:
        return shape;
      case StatePrimitiveTypes.String:
      case StatePrimitiveTypes.Number:
      case StatePrimitiveTypes.Boolean:
        return primitive;
    }
  }

  protected buildPrettyImports(
    behaviors: BehaviorDefinitionShape[],
    target: FileBuilderTargetType
  ): string {
    const importsBySource = new Map<string, Set<string>>();

    for (const behavior of behaviors) {
      const codes = behavior.code ?? [];

      for (const code of codes) {
        if (!code.import || code.target !== target) continue;

        if (!importsBySource.has(code.import)) {
          importsBySource.set(code.import, new Set());
        }

        importsBySource.get(code.import)!.add(code.symbol);
      }
    }

    if (importsBySource.size === 0) return '';

    return Array.from(importsBySource.entries())
      .map(([source, symbols]) => {
        const sorted = Array.from(symbols).sort();

        return `import {
${sorted.map((importName: string) => `${this.#importTabSpacer}${importName}`).join(',\n')}
} from '${source}';`;
      })
      .join('\n\n');
  }

  protected buildBehaviorEmits(
    behaviors: BehaviorDefinitionShape[],
    api: FileBuilderApiType,
    target: FileBuilderTargetType
  ): string[] {
    return behaviors
      .flatMap((behavior) =>
        (behavior.code ?? [])
          .filter((code) => code.api === api && code.target === target)
          .map((code) => ({ behavior, code }))
      )
      .sort((a, b) => (a.code.order ?? 0) - (b.code.order ?? 0))
      .map(({ behavior, code }) => {
        if (code.emit === FileBuilderEmitTypes.Reference) {
          return code.symbol;
        }

        const params = this.pipelineBuilderService.getBehaviorInstance(
          behavior.id
        )?.params;

        const args = params ? Object.values(params).join(', ') : '';

        return `${code.symbol}(${args})`;
      });
  }

  protected buildFeatureCellArray(
    items: string[],
    isBehavior: boolean,
    emptyComment: string
  ): string {
    if (!items.length) {
      return `[
${this.#behaviorTabSpacer}// ${emptyComment}
${this.#featureCellArrayTabSpacer}]`;
    }

    return `[
${this.#behaviorTabSpacer}// Definition-time ${isBehavior ? 'behaviors' : 'controllers'} (structural)
${this.#behaviorTabSpacer}${items.join(`,\n${this.#behaviorTabSpacer}`)}
${this.#featureCellArrayTabSpacer}]`;
  }

  protected buildVaultBehaviorMap(
    behaviors: BehaviorDefinitionShape[]
  ): Map<FileBuilderApiType, string[]> {
    const map = new Map<
      FileBuilderApiType,
      { emit: string; order: number }[]
    >();

    for (const behavior of behaviors) {
      const codes = behavior.code ?? [];

      for (const code of codes) {
        if (code.target !== FileBuilderTargetTypes.Vault) continue;

        const params = this.pipelineBuilderService.getBehaviorInstance(
          behavior.id
        )?.params;

        const args = params ? Object.values(params).join(', ') : '';

        const emit =
          code.emit === FileBuilderEmitTypes.Reference
            ? code.symbol
            : `${code.symbol}(${args})`;

        const list = map.get(code.api) ?? [];
        list.push({
          emit,
          order: code.order ?? 0
        });

        map.set(code.api, list);
      }
    }

    // Apply ordering per API group
    const orderedMap = new Map<FileBuilderApiType, string[]>();

    for (const [api, items] of map.entries()) {
      orderedMap.set(
        api,
        items.sort((a, b) => a.order - b.order).map((i) => i.emit)
      );
    }

    return orderedMap;
  }

  protected buildVaultFluentChain(
    behaviors: BehaviorDefinitionShape[],
    serviceVaultName: string
  ): string {
    const initialValue = this.pipelineBuilderService.getInitialValue();

    const lines: string[] = [`this.${serviceVaultName}`];

    if (initialValue === StateInitialValueTypes.Deferred) {
      lines.push(
        `${this.#vaultFluentTabSpacer}// Deferred initialization`,
        `${this.#vaultFluentTabSpacer}.hydrate( () => Promise.resolve(${this.buildExampleLiteral(true)}) )`
      );
    }

    // Flatten all Vault-targeted code entries
    const vaultEntries = behaviors
      .flatMap((behavior) =>
        (behavior.code ?? [])
          .filter((code) => code.target === FileBuilderTargetTypes.Vault)
          .map((code) => ({ behavior, code }))
      )
      .sort((a, b) => (a.code.order ?? 0) - (b.code.order ?? 0));

    if (!vaultEntries.length) {
      lines.push(`${this.#vaultFluentTabSpacer}.initialize();`);
      return lines.join('\n');
    }

    // Grouped APIs (interceptors, filters, operators, etc.)
    const groupedMap = new Map<FileBuilderApiType, string[]>();

    for (const { behavior, code } of vaultEntries) {
      const params = this.pipelineBuilderService.getBehaviorInstance(
        behavior.id
      )?.params;

      let emit: string;

      if (code.emit === FileBuilderEmitTypes.Reference) {
        emit = code.symbol;
      } else if (code.emit === FileBuilderEmitTypes.Raw) {
        const value = Object.values(params ?? {}).filter(
          (v) => v !== null && v !== undefined && v !== ''
        )[0];

        emit = typeof value === 'string' ? value : '';
      } else {
        // ─────────────────────────────
        // Positional arg style (e.g. distinct)
        // ─────────────────────────────
        // eslint-disable-next-line
        if ((code as any).argStyle === 'positional') {
          const value = Object.values(params ?? {}).filter(
            (v) => v !== null && v !== undefined && v !== ''
          )[0];

          emit = value ? `${code.symbol}(${value})` : `${code.symbol}()`;
        }

        // ─────────────────────────────
        // Object arg style (default)
        // ─────────────────────────────
        else {
          const filteredEntries = Object.entries(params ?? {}).filter(
            ([_, v]) => v !== null && v !== undefined && v !== ''
          );

          const argsObject =
            filteredEntries.length > 0
              ? `\n${this.#vaultArrayTabSpacer}{${filteredEntries
                  .map(([k, v]) =>
                    typeof v === 'string' && v.trim().startsWith('(')
                      ? `\n${this.#vaultFluentValueTabSpacer}${k}: ${v}` // raw function string
                      : `\n${this.#vaultFluentValueTabSpacer}${k}: ${JSON.stringify(v)}`
                  )
                  .join(', ')}\n${this.#vaultArrayTabSpacer}}`
              : '';

          emit = argsObject
            ? `${code.symbol}(${argsObject}\n${this.#vaultFluentTabSpacer})`
            : `${code.symbol}()`;
        }
      }

      // ─────────────────────────────
      // Fluent-style APIs (rare)
      // ─────────────────────────────
      if (code.callStyle === 'fluent') {
        lines.push(
          `${this.#vaultFluentTabSpacer}// ${FileBuilderVaultApiComments[code.api] ?? ''}
${this.#vaultFluentTabSpacer}.${emit}`
        );
        continue;
      }

      // ─────────────────────────────
      // Grouped APIs (operators, filters, etc.)
      // ─────────────────────────────
      const list = groupedMap.get(code.api) ?? [];
      list.push(emit);
      groupedMap.set(code.api, list);
    }

    // Emit grouped APIs in declared order
    for (const api of FileBuilderVaultApiOrder) {
      const items = groupedMap.get(api);
      if (!items?.length) continue;

      const comment = FileBuilderVaultApiComments[api];

      lines.push(
        `${this.#vaultFluentTabSpacer}// ${comment}
${this.#vaultFluentTabSpacer}.${api}(
${this.#vaultArrayTabSpacer}[
${this.#vaultFluentValueTabSpacer}${items.join(`,\n${this.#vaultFluentValueTabSpacer}`)}
${this.#vaultArrayTabSpacer}]
${this.#vaultParenthesisTabSpacer})`
      );
    }

    lines.push(
      `${this.#vaultFluentTabSpacer}// Finalizes configuration and activates the FeatureCell pipeline.`
    );
    lines.push(`${this.#vaultFluentTabSpacer}//`);
    lines.push(`${this.#vaultFluentTabSpacer}// After initialize() is called:`);
    lines.push(`${this.#vaultFluentTabSpacer}//`);
    lines.push(
      `${this.#vaultFluentTabSpacer}// - The pipeline structure becomes immutable`
    );
    lines.push(
      `${this.#vaultFluentTabSpacer}// - No additional behaviors or operators may be registered`
    );
    lines.push(
      `${this.#vaultFluentTabSpacer}// - All subsequent state updates flow through the configured pipeline`
    );
    lines.push(`${this.#vaultFluentTabSpacer}//`);
    lines.push(
      `${this.#vaultFluentTabSpacer}// No state updates will be processed before initialize() is called.`
    );

    lines.push(`${this.#vaultFluentTabSpacer}.initialize();`);

    return lines.join('\n');
  }

  protected readonly allBehaviors = computed<BehaviorDefinitionShape[]>(() => {
    return this.pipelineBuilderService
      .stageQuestions()
      .flatMap((stage: StageDefinitionShape) =>
        this.pipelineBuilderService.getBehaviorDefinitionsForStage(stage.id)
      )
      .filter((behavior: BehaviorDefinitionShape) => {
        const instance = this.pipelineBuilderService.getBehaviorInstance(
          behavior.id
        );
        return instance?.selected === true;
      });
  });

  #getFeatureCellBehaviors(
    allBehaviors: BehaviorDefinitionShape[],
    type: FileBuilderApiType
  ): string[] {
    return this.buildBehaviorEmits(
      allBehaviors,
      type,
      FileBuilderTargetTypes.FeatureCell
    );
  }

  protected getFeatureCellBehaviorArray = computed<string>(() => {
    const allBehaviors = this.allBehaviors();
    return this.buildFeatureCellArray(
      this.#getFeatureCellBehaviors(
        allBehaviors,
        FileBuilderApiTypes.Behaviors
      ),
      true,
      '--> Register add-on behaviors here <--'
    );
  });

  protected readonly getFeatureCellControllerArray = computed<string>(() => {
    const allBehaviors = this.allBehaviors();
    return this.buildFeatureCellArray(
      this.#getFeatureCellBehaviors(
        allBehaviors,
        FileBuilderApiTypes.Controllers
      ),
      false,
      '--> Register add-on controllers here <--'
    );
  });

  protected buildNpmInstallCommand(
    behaviors: BehaviorDefinitionShape[],
    framework: StateFrameworkType | null
  ): string {
    const packages = new Set<string>();

    if (framework === StateFrameworkTypes.Angular) {
      packages.add('@sdux-vault/angular');
    } else if (framework === StateFrameworkTypes.React) {
      packages.add('@sdux-vault/react');
    } else {
      // Core package is always required unless angular is installed
      packages.add('@sdux-vault/core');
    }

    for (const behavior of behaviors) {
      const codes = behavior.code ?? [];

      for (const code of codes) {
        if (!code.import || code.api === FileBuilderApiTypes.None) continue;

        packages.add(code.import);
      }
    }

    return `npm install ${Array.from(packages).join(' ')};`;
  }

  private getFluentApiNamesForNotes(
    behaviors: BehaviorDefinitionShape[],
    noteType: FileBuilderNoteType
  ): string[] {
    const apis = new Set<string>();

    for (const behavior of behaviors) {
      if (behavior.note !== noteType) continue;

      for (const code of behavior.code ?? []) {
        if (code.target !== FileBuilderTargetTypes.Vault) continue;

        // We want the fluent API name, not the symbol
        if (code.api) {
          apis.add(
            `${behavior.id} (Fluent Api: ${code.api}()) (${behavior.label})`
          );
        }
      }
    }

    return Array.from(apis).sort();
  }

  protected buildAggregatedNotes(behaviors: BehaviorDefinitionShape[]): string {
    if (this.#pipelineStepService.builderMode() === FileBuilderModeTypes.Basic)
      return '';

    const withFluentApis = this.getFluentApiNamesForNotes(
      behaviors,
      FileBuilderNoteTypes.CoreBehaviorWithFluentApi
    );

    const withoutFluent = behaviors
      .filter(
        (behavior: BehaviorDefinitionShape) =>
          behavior.note === FileBuilderNoteTypes.CoreBehaviorWithoutFluentApi
      )
      .map((behavior: BehaviorDefinitionShape) => behavior)
      .sort();

    if (!withFluentApis.length && !withoutFluent.length) return '';

    const spacer = `\t`;
    const lines: string[] = [];

    lines.push(
      `${spacer}// ==================================================`
    );
    lines.push(`${spacer}// Important Notes`);
    lines.push(
      `${spacer}// ==================================================`
    );
    lines.push(`${spacer}//`);
    lines.push(
      `${spacer}// The following core behaviors are automatically installed by the FeatureCell runtime.`
    );
    lines.push(`${spacer}//`);

    if (withFluentApis.length) {
      lines.push(
        `${spacer}// Core behaviors that require configuration via the Vault fluent API:`
      );
      for (const api of withFluentApis) {
        lines.push(`${spacer}//   • ${api}`);
      }
      lines.push(`${spacer}//`);
    }

    if (withoutFluent.length) {
      lines.push(
        `${spacer}// Core behaviors that require no registration or fluent configuration:`
      );
      for (const behavior of withoutFluent) {
        lines.push(`${spacer}//   • ${behavior.id} (${behavior.label})`);
      }
      lines.push(`${spacer}//`);
    }

    return lines.join('\n');
  }

  protected buildAiAssistFile(behaviors: BehaviorDefinitionShape[]): string {
    const sections: string[] = [];

    for (const behavior of behaviors) {
      if (!behavior.aiAssist?.trim()) continue;

      sections.push(
        `// =============================================\n` +
          `// START ${behavior.label.toUpperCase()}\n` +
          `// =============================================\n\n` +
          behavior.aiAssist.trim() +
          `\n\n// =============================================\n` +
          `// END ${behavior.label.toUpperCase()}\n` +
          `// =============================================\n\n`
      );
    }

    if (!sections.length) {
      return '// No AI snippets were generated for the selected pipeline configuration.';
    }

    return sections.join('\n\n\n');
  }

  private getSelectedUpdateStrategy(
    behaviors: BehaviorDefinitionShape[]
  ): FileBuilderUpdateStrategyType | null {
    if (
      this.#pipelineStepService.builderMode() === FileBuilderModeTypes.Advanced
    )
      return null;

    const selectedIds = new Set(behaviors.map((b) => b.id));

    if (selectedIds.has(BehaviorIdTypes.WithReplaceStateBehavior)) {
      return FileBuilderUpdateStrategyType.Replace;
    }

    if (selectedIds.has(BehaviorIdTypes.WithMergeStateBehavior)) {
      return FileBuilderUpdateStrategyType.Merge;
    }

    return null;
  }

  protected buildInterfaceDefinition(
    shapeName: string | null,
    primitive: StatePrimitiveType | null
  ): string {
    if (!shapeName || !primitive) return '';

    const shouldGenerate =
      primitive === StatePrimitiveTypes.Object ||
      primitive === StatePrimitiveTypes.Array;

    if (!shouldGenerate) return '';

    return `\nexport interface ${shapeName} {
  // example attributes
  id: number,
  name: string
  // TODO: define additional properties
}`;
  }

  protected buildExamplesByTarget(
    behaviors: BehaviorDefinitionShape[],
    framework: StateFrameworkType | null,
    target: FileBuilderExampleType,
    tokenMap: Record<FileBuilderTemplateTokenType, string>
  ): string {
    const selectedStrategy = this.getSelectedUpdateStrategy(behaviors);

    const baseIndent = this.#spacer;
    const exampleBlocks: string[][] = [];

    for (const behavior of behaviors) {
      if (!behavior.example?.length) continue;

      for (const example of behavior.example) {
        if (example.target !== target) continue;

        if (example.framework && example.framework !== framework) continue;

        if (
          !(
            example.updateStrategy === selectedStrategy ||
            selectedStrategy === null
          )
        ) {
          continue;
        }

        exampleBlocks.push(example.template);
      }
    }

    if (!exampleBlocks.length) return '';

    const lines: string[] = [];

    for (const block of exampleBlocks) {
      lines.push('');

      for (const rawLine of block) {
        let line = rawLine;

        for (const [token, value] of Object.entries(tokenMap)) {
          line = line.replaceAll(token, value);
        }

        lines.push(`${baseIndent}${line}`);
      }
    }

    return lines.join('\n');
  }

  protected buildExampleLiteral(isDeferred = false): string {
    const primitive = this.pipelineBuilderService.getStatePrimitive();
    // If deferred or somehow missing, generate something visible
    switch (primitive) {
      case StatePrimitiveTypes.Array:
        return isDeferred
          ? '[]'
          : `[ { id: 11, name: "Luke" }, { id: 38, name: "Leia" } ]`;

      case StatePrimitiveTypes.Object:
        return isDeferred ? '{}' : `{ id: 11, name: "Han" }`;

      case StatePrimitiveTypes.String:
        return `'string'`;

      case StatePrimitiveTypes.Number:
        return `1`;

      case StatePrimitiveTypes.Boolean:
        return `true`;

      default:
        return `undefined`;
    }
  }
}
