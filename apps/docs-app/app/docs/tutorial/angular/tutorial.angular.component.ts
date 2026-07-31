import {
  Component,
  computed,
  effect,
  inject,
  signal,
  ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  BrandNameService,
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent,
  FeatureCellBrandNameComponent,
  PackageNameComponent,
  SDuXVideoComponent,
  VaultBrandNameComponent
} from '@sdux-vault/ui/web-components';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';
import { StackblitzLanguageExampleComponent } from '../../stack-blitz/example/stackblitz-language-example/stackblitz-language-example.component';
import { StackblitzExampleService } from '../../stack-blitz/services/stackblitz-example.service';
import { StackBlitzExampleLanguageShape } from '../../stack-blitz/shapes/stackblitz-example.language.shape';
import { StackBlitzExampleShape } from '../../stack-blitz/shapes/stackblitz-example.shape';
import { TutorialNavigationDirective } from '../directive/tutorial-navigation.directive';
import { ExampleFileService } from '../services/example-file.service';
import { TutorialGroupShape } from '../shape/tutorial-group.shape';
import { TutorialStepShape } from '../shape/tutorial-step.shape';
import { ExampleFileTypes } from '../types/example-file.type';
import { STAR_WARS_ADD_EDIT_CHARACTERS } from './generated/add-edit-characters.generated';
import { STAR_WARS_DISPLAY_CHARACTER } from './generated/display-character.generated';
import { STAR_WARS_DISPLAY_CHARACTERS } from './generated/display-characters.generated';
import { INITIAL_APP_CONFIG } from './generated/initial-app-config.generated';
import { INITIAL_SERVICE } from './generated/initial-service.generated';

@Component({
  selector: 'sdux-angular-tutorial',
  standalone: true,
  imports: [
    MatIconModule,
    MatTooltipModule,
    RouterModule,
    BrandNameComponent,
    PipelineRelatedTopicComponent,
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    SDuXVideoComponent,
    PackageNameComponent,
    FeatureCellBrandNameComponent,
    VaultBrandNameComponent,
    StackblitzLanguageExampleComponent
  ],
  templateUrl: './tutorial.angular.component.html',
  styleUrls: ['../../scss/documentation.scss', '../tutorial.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TutorialAngularComponent extends TutorialNavigationDirective {
  #brandName = inject(BrandNameService);
  #exampleFileService = inject(ExampleFileService);
  #route = inject(ActivatedRoute);

  readonly #expandedTutorialGroups = signal<Record<number, boolean>>({
    1: true,
    2: false,
    3: false
  });

  readonly #expandedTutorialChapters = signal<Record<number, boolean>>({
    2: false,
    3: false
  });

  constructor() {
    super();

    effect(() => {
      const activeStepMatch = /^step-(\d+)$/.exec(this.activeStep());
      const activeStepId = activeStepMatch
        ? Number(activeStepMatch[1])
        : Number.NaN;

      if (Number.isNaN(activeStepId)) {
        return;
      }

      const activeGroupId = this.getTutorialGroupIdForStepId(activeStepId);

      if (activeGroupId === null) {
        return;
      }

      this.setExpandedTutorialGroups(activeGroupId);
      this.setExpandedTutorialChapters(
        activeGroupId >= 2 ? activeGroupId : null
      );
    });

    this.#route.fragment.pipe(takeUntilDestroyed()).subscribe((fragment) => {
      const targetGroupId = this.getTutorialGroupIdForFragment(fragment);

      if (targetGroupId === null) {
        return;
      }

      this.setExpandedTutorialGroups(targetGroupId);
      this.setExpandedTutorialChapters(
        targetGroupId >= 2 ? targetGroupId : null
      );
    });
  }

  readonly #stackblitzService = inject(StackblitzExampleService);

  readonly initialTutorialExample = computed<StackBlitzExampleShape>(
    () =>
      this.#stackblitzService.getExample('display-character') ??
      ({} as StackBlitzExampleShape)
  );

  readonly initialTutorialLang = computed<StackBlitzExampleLanguageShape>(
    () =>
      this.initialTutorialExample()?.languages?.find(
        (lang) => lang.key === 'angular'
      ) ?? ({} as StackBlitzExampleLanguageShape)
  );

  readonly dropdownTutorialExample = computed<StackBlitzExampleShape>(
    () =>
      this.#stackblitzService.getExample('display-characters') ??
      ({} as StackBlitzExampleShape)
  );

  readonly dropdownTutorialLang = computed<StackBlitzExampleLanguageShape>(
    () =>
      this.dropdownTutorialExample()?.languages?.find(
        (lang) => lang.key === 'angular'
      ) ?? ({} as StackBlitzExampleLanguageShape)
  );

  readonly addEditTutorialExample = computed<StackBlitzExampleShape>(
    () =>
      this.#stackblitzService.getExample('add-edit-characters') ??
      ({} as StackBlitzExampleShape)
  );

  readonly addEditTutorialLang = computed<StackBlitzExampleLanguageShape>(
    () =>
      this.addEditTutorialExample()?.languages?.find(
        (lang) => lang.key === 'angular'
      ) ?? ({} as StackBlitzExampleLanguageShape)
  );

  protected readonly displayCharacterSource = STAR_WARS_DISPLAY_CHARACTER;

  protected readonly displayCharactersSource = STAR_WARS_DISPLAY_CHARACTERS;

  protected readonly addEditCharactersSource = STAR_WARS_ADD_EDIT_CHARACTERS;

  protected readonly initialServiceSource = INITIAL_SERVICE;

  protected readonly initialAppConfigSource = INITIAL_APP_CONFIG;

  protected readonly registeredAppConfigSource = [
    this.#exampleFileService.getFile(
      this.displayCharacterSource,
      ExampleFileTypes.AppConfig
    ),
    this.#exampleFileService.getFile(
      this.displayCharacterSource,
      ExampleFileTypes.Constant
    )
  ];

  protected readonly mainSource = this.#exampleFileService.getFile(
    this.displayCharacterSource,
    ExampleFileTypes.Main
  );

  protected readonly starWarsCharacterStateSource =
    this.#exampleFileService.getFile(
      this.displayCharacterSource,
      ExampleFileTypes.Shape
    );

  protected readonly registeredFeatureCellService =
    this.#exampleFileService.getFile(
      this.displayCharacterSource,
      ExampleFileTypes.Service
    );

  protected readonly initialComponentAndHtmlFiles = [
    this.#exampleFileService.getFile(
      this.displayCharacterSource,
      ExampleFileTypes.Component
    ),
    this.#exampleFileService.getFile(
      this.displayCharacterSource,
      ExampleFileTypes.Html
    ),
    this.#exampleFileService.getFile(
      this.displayCharacterSource,
      ExampleFileTypes.Scss
    )
  ];

  protected readonly dropdownStepFiles = [
    this.#exampleFileService.getFile(
      this.displayCharactersSource,
      ExampleFileTypes.Component
    ),
    this.#exampleFileService.getFile(
      this.displayCharactersSource,
      ExampleFileTypes.Html
    ),
    this.#exampleFileService.getFile(
      this.displayCharactersSource,
      ExampleFileTypes.ComponentSpec
    )
  ];

  protected readonly addEditServiceFiles = [
    this.#exampleFileService.getFile(
      this.addEditCharactersSource,
      ExampleFileTypes.AppConfig
    ),
    this.#exampleFileService.getFile(
      this.addEditCharactersSource,
      ExampleFileTypes.Service
    ),
    this.#exampleFileService.getFile(
      this.addEditCharactersSource,
      ExampleFileTypes.ServiceSpec
    ),
    this.#exampleFileService.getFile(
      this.addEditCharactersSource,
      ExampleFileTypes.CharacterDomain
    ),
    this.#exampleFileService.getFile(
      this.addEditCharactersSource,
      ExampleFileTypes.CharacterDomainSpec
    )
  ];

  protected readonly addEditComponentFiles = [
    this.#exampleFileService.getFile(
      this.addEditCharactersSource,
      ExampleFileTypes.Component
    ),
    this.#exampleFileService.getFile(
      this.addEditCharactersSource,
      ExampleFileTypes.ComponentSpec
    ),
    this.#exampleFileService.getFile(
      this.addEditCharactersSource,
      ExampleFileTypes.Html
    ),
    this.#exampleFileService.getFile(
      this.addEditCharactersSource,
      ExampleFileTypes.CharacterEditor
    ),
    this.#exampleFileService.getFile(
      this.addEditCharactersSource,
      ExampleFileTypes.CharacterEditorSpec
    )
  ];

  getStepId(groupIndex: number, stepIndex: number): number {
    const completedSteps = this.tutorialGroups
      .slice(0, groupIndex)
      .reduce((count, group) => count + group.steps.length, 0);

    return completedSteps + stepIndex + 1;
  }

  getTutorialGroupAriaLabel(groupIndex: number, groupLabel: string): string {
    return `Go to Tutorial ${groupIndex + 1}: ${groupLabel}`;
  }

  getStepAriaLabel(
    groupIndex: number,
    stepIndex: number,
    stepLabel: string
  ): string {
    return `Go to Step ${this.getStepId(groupIndex, stepIndex)}: ${stepLabel}`;
  }

  isTutorialGroupExpanded(groupId: number): boolean {
    return this.#expandedTutorialGroups()[groupId] ?? false;
  }

  toggleTutorialGroup(groupId: number): void {
    this.#expandedTutorialGroups.update((expandedGroups) => ({
      ...expandedGroups,
      [groupId]: !expandedGroups[groupId]
    }));
  }

  isTutorialChapterExpanded(groupId: number): boolean {
    return this.#expandedTutorialChapters()[groupId] ?? false;
  }

  toggleTutorialChapter(groupId: number): void {
    if (this.isTutorialChapterExpanded(groupId)) {
      this.setExpandedTutorialChapters(null);

      return;
    }

    this.setExpandedTutorialGroups(groupId);
    this.setExpandedTutorialChapters(groupId);
  }

  getTutorialGroupToggleAriaLabel(
    groupLabel: string,
    isExpanded: boolean
  ): string {
    return `${isExpanded ? 'Collapse' : 'Expand'} ${groupLabel} steps`;
  }

  getTutorialChapterToggleAriaLabel(
    tutorialTitle: string,
    isExpanded: boolean
  ): string {
    return `${isExpanded ? 'Collapse' : 'Expand'} ${tutorialTitle}`;
  }

  private getTutorialGroupIdForStepId(stepId: number): number | null {
    let completedSteps = 0;

    for (const group of this.tutorialGroups) {
      completedSteps += group.steps.length;

      if (stepId <= completedSteps) {
        return group.id;
      }
    }

    return null;
  }

  private getTutorialGroupIdForFragment(
    fragment: string | null
  ): number | null {
    if (!fragment) {
      return null;
    }

    if (fragment === 'top') {
      return 1;
    }

    if (fragment === 'tutorial-2' || fragment === 'tutorial-2-content') {
      return 2;
    }

    if (fragment === 'tutorial-3' || fragment === 'tutorial-3-content') {
      return 3;
    }

    const stepMatch = /^step-(\d+)$/.exec(fragment);

    return stepMatch
      ? this.getTutorialGroupIdForStepId(Number(stepMatch[1]))
      : null;
  }

  private setExpandedTutorialGroups(activeGroupId: number): void {
    const nextExpandedGroups = Object.fromEntries(
      this.tutorialGroups.map((tutorialGroup) => [
        tutorialGroup.id,
        tutorialGroup.id === activeGroupId
      ])
    ) as Record<number, boolean>;

    if (
      this.tutorialGroups.some(
        (tutorialGroup) =>
          this.isTutorialGroupExpanded(tutorialGroup.id) !==
          nextExpandedGroups[tutorialGroup.id]
      )
    ) {
      this.#expandedTutorialGroups.set(nextExpandedGroups);
    }
  }

  private setExpandedTutorialChapters(activeGroupId: number | null): void {
    const nextExpandedChapters = {
      2: activeGroupId === 2,
      3: activeGroupId === 3
    } satisfies Record<number, boolean>;

    if (
      this.isTutorialChapterExpanded(2) !== nextExpandedChapters[2] ||
      this.isTutorialChapterExpanded(3) !== nextExpandedChapters[3]
    ) {
      this.#expandedTutorialChapters.set(nextExpandedChapters);
    }
  }

  readonly tutorialGroups: readonly TutorialGroupShape[] = [
    {
      id: 1,
      label: 'Foundation Steps',
      fragment: 'top',
      steps: [
        { id: 1, label: 'Project Set-up' },
        { id: 2, label: `Install ${this.#brandName.value}` },
        { id: 3, label: 'Define Feature State' },
        { id: 4, label: 'Build the Service' },
        { id: 5, label: `Initialize the ${this.#brandName.vaultValue}` },
        { id: 6, label: `Register the ${this.#brandName.featureCellValue}` },
        { id: 7, label: `Connect the service to ${this.#brandName.value}` },
        { id: 8, label: 'Display Character State' },
        { id: 9, label: 'Start the Application' },
        { id: 10, label: 'Complete Initial Tutorial' }
      ] satisfies TutorialStepShape[]
    },
    {
      id: 2,
      label: 'Multi-select Steps',
      fragment: 'tutorial-2',
      steps: [
        { id: 1, label: 'Add a Dropdown' },
        { id: 2, label: 'Complete Dropdown Tutorial' }
      ] satisfies TutorialStepShape[]
    },
    {
      id: 3,
      label: 'Add/Edit Steps',
      fragment: 'tutorial-3',
      steps: [
        { id: 1, label: 'Configure Merge Behavior' },
        { id: 2, label: 'Add/Edit Capabilities' },
        { id: 3, label: 'Complete Add/Edit Tutorial' }
      ] satisfies TutorialStepShape[]
    }
  ];
}
