import { computed, Injectable } from '@angular/core';
import { FileBuilderExampleTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-example.type';
import { FileBuilderTemplateTokenTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-template-token.type';
import { GeneratedFileShape } from '../../shapes/file-builder/generated-file.shape';
import { FileBuilderTargetTypes } from '../../types/file-builder/file-builder-target.type';
import { FileTypes } from '../../types/file-builder/file.type';
import { StateFrameworkTypes } from '../../types/state-framework.type';
import { StateInitialValueTypes } from '../../types/state-initial-value.type';
import { PipelineFileBuilderAngularService } from './pipeline-file-builder-angular.service';
import { PipelineFileBuilderReactService } from './pipeline-file-builder-react.service';
import { PipelineFileBuilderSvelteService } from './pipeline-file-builder-svelte.service';
import { PipelineFileBuilderVueService } from './pipeline-file-builder-vue.service';
import { PipelineFileBuilderAbstract } from './pipeline-file-builder.abstract';

@Injectable({ providedIn: 'root' })
export class PipelineFileBuilderService extends PipelineFileBuilderAbstract {
  readonly generatedFiles = computed<GeneratedFileShape[]>(() => {
    const framework = this.pipelineBuilderService.getStateFramework();
    const rawShape = this.pipelineBuilderService.getShapeName();
    const pascalShape = this.toPascalCase(rawShape || 'YourShape');
    const initialValue = this.pipelineBuilderService.getInitialValue();

    const initialValueDisplay =
      initialValue === StateInitialValueTypes.Deferred
        ? undefined
        : initialValue || 'yourInitialValue';

    const serviceVaultName = '#vault';
    const serviceName = 'ExampleService';
    const instantiatedServiceName = '#exampleService';
    const featureCellKey = 'example-feature-cell-key';
    const inputVariable = 'input';

    const allBehaviors = this.allBehaviors();
    const type = this.buildType(
      pascalShape,
      this.pipelineBuilderService.getStatePrimitive()
    );
    const featureCellImports = this.buildPrettyImports(
      allBehaviors,
      FileBuilderTargetTypes.FeatureCell
    );
    const vaultImports = this.buildPrettyImports(
      allBehaviors,
      FileBuilderTargetTypes.Vault
    );
    const featureCellBehaviorArray = this.getFeatureCellBehaviorArray();
    const featureCellControllerArray = this.getFeatureCellControllerArray();
    const vaultChain = this.buildVaultFluentChain(
      allBehaviors,
      serviceVaultName
    );
    const npm = this.buildNpmInstallCommand(
      allBehaviors,
      this.pipelineBuilderService.getStateFramework()
    );
    const aiAssist = this.buildAiAssistFile(allBehaviors);
    const coreBehaviorNotes = this.buildAggregatedNotes(allBehaviors);
    const interfaceDefinition = this.buildInterfaceDefinition(
      pascalShape,
      this.pipelineBuilderService.getStatePrimitive()
    );
    const exampleLiteral = this.buildExampleLiteral();

    const targetKeys = {
      [FileBuilderTemplateTokenTypes.ExampleLiteral]: exampleLiteral,
      [FileBuilderTemplateTokenTypes.Input]: inputVariable,
      [FileBuilderTemplateTokenTypes.Type]: type,
      [FileBuilderTemplateTokenTypes.Vault]: serviceVaultName,
      [FileBuilderTemplateTokenTypes.InstantiatedServiceName]:
        instantiatedServiceName,
      [FileBuilderTemplateTokenTypes.Key]: featureCellKey
    };

    const serviceExamples = this.buildExamplesByTarget(
      allBehaviors,
      this.pipelineBuilderService.getStateFramework(),
      FileBuilderExampleTypes.Service,
      targetKeys
    );

    const componentExamples = this.buildExamplesByTarget(
      allBehaviors,
      this.pipelineBuilderService.getStateFramework(),
      FileBuilderExampleTypes.Component,
      targetKeys
    );

    switch (framework) {
      case StateFrameworkTypes.Angular:
        const angularFileGenerator = new PipelineFileBuilderAngularService();
        return angularFileGenerator.generatedAngularFiles({
          serviceVaultName,
          featureCellImports,
          serviceName,
          featureCellKey,
          initialValueDisplay,
          featureCellBehaviorArray,
          featureCellControllerArray,
          vaultImports,
          type,
          vaultChain,
          npm,
          aiAssist,
          coreBehaviorNotes,
          serviceExamples,
          componentExamples,
          instantiatedServiceName,
          interfaceDefinition
        });

      // leave other frameworks unchanged for now (unless you want vault chaining there too)
      case StateFrameworkTypes.React: {
        const reactFileGenerator = new PipelineFileBuilderReactService();
        return reactFileGenerator.generatedReactFiles({
          serviceVaultName,
          featureCellImports,
          serviceName,
          featureCellKey,
          initialValueDisplay,
          featureCellBehaviorArray,
          featureCellControllerArray,
          vaultImports,
          type,
          vaultChain,
          npm,
          aiAssist,
          coreBehaviorNotes,
          serviceExamples,
          componentExamples,
          instantiatedServiceName,
          interfaceDefinition
        });
      }

      case StateFrameworkTypes.Svelte: {
        const svelteFileGenerator = new PipelineFileBuilderSvelteService();
        return svelteFileGenerator.generatedSvelteFiles({
          serviceVaultName,
          featureCellImports,
          serviceName,
          featureCellKey,
          initialValueDisplay,
          featureCellBehaviorArray,
          featureCellControllerArray,
          vaultImports,
          type,
          vaultChain,
          npm,
          aiAssist,
          coreBehaviorNotes,
          serviceExamples,
          componentExamples,
          instantiatedServiceName,
          interfaceDefinition
        });
      }

      case StateFrameworkTypes.Vue: {
        const vueFileGenerator = new PipelineFileBuilderVueService();
        return vueFileGenerator.generatedVueFiles({
          serviceVaultName,
          featureCellImports,
          serviceName,
          featureCellKey,
          initialValueDisplay,
          featureCellBehaviorArray,
          featureCellControllerArray,
          vaultImports,
          type,
          vaultChain,
          npm,
          aiAssist,
          coreBehaviorNotes,
          serviceExamples,
          componentExamples,
          instantiatedServiceName,
          interfaceDefinition
        });
      }

      default:
        let id = 200;
        return [
          {
            id: `${id++}`,
            name: 'vault.ts',
            type: FileTypes.Simple,
            contents: `export const ${pascalShape}Cell = provideFeatureCell<${type}>(
  {
    key: '${pascalShape}',
    initialState: ${initialValueDisplay},
  },
  ${featureCellBehaviorArray},
  ${featureCellControllerArray}
);

${pascalShape}Cell.initialize();`
          }
        ];
    }
  });
}
