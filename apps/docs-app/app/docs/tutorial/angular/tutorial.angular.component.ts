import {
  Component,
  computed,
  effect,
  inject,
  signal,
  untracked,
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
import { ChapterStepShape } from '../shape/chapter-step.shape';
import { ChapterShape } from '../shape/chapter.shape';
import { ExampleFileTypes } from '../types/example-file.type';
import { DisplayCharactersChapterComponent } from './chapters/display-characters/display-characters.chapter.component';
import { DisplayCharactersService } from './chapters/display-characters/services/display-characters.service';
import { STAR_WARS_ADD_EDIT_CHARACTERS } from './generated/add-edit-characters.generated';
import { STAR_WARS_DISPLAY_CHARACTER } from './generated/display-character.generated';
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
    StackblitzLanguageExampleComponent,
    DisplayCharactersChapterComponent
  ],
  templateUrl: './tutorial.angular.component.html',
  styleUrls: ['../../scss/documentation.scss', '../tutorial.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TutorialAngularComponent extends TutorialNavigationDirective {
  readonly #brandName = inject(BrandNameService);
  readonly #exampleFileService = inject(ExampleFileService);
  readonly #route = inject(ActivatedRoute);
  readonly #selectCharactersService = inject(DisplayCharactersService);
  readonly #stackblitzService = inject(StackblitzExampleService);

  readonly #expandedChapterGroups = signal<Record<number, boolean>>({
    1: true,
    2: false,
    3: false
  });

  readonly #expandedChapters = signal<Record<number, boolean>>({
    1: true,
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

      untracked(() => {
        this.setExpandedTutorialGroups(activeGroupId);
        this.setExpandedChapters(activeGroupId);
      });
    });

    this.#route.fragment.pipe(takeUntilDestroyed()).subscribe((fragment) => {
      const targetGroupId = this.getTutorialGroupIdForFragment(fragment);

      if (targetGroupId === null) {
        return;
      }

      this.setExpandedTutorialGroups(targetGroupId);
      this.setExpandedChapters(targetGroupId);
    });
  }

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

  readonly displayCharactersExample =
    this.#selectCharactersService.displayCharactersStackblitz;

  readonly addEditExample = computed<StackBlitzExampleShape>(
    () =>
      this.#stackblitzService.getExample('add-edit-characters') ??
      ({} as StackBlitzExampleShape)
  );

  readonly addEditLang = computed<StackBlitzExampleLanguageShape>(
    () =>
      this.addEditExample()?.languages?.find(
        (lang) => lang.key === 'angular'
      ) ?? ({} as StackBlitzExampleLanguageShape)
  );

  protected readonly displayCharacterSource = STAR_WARS_DISPLAY_CHARACTER;

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

  protected readonly displayCharactersFiles =
    this.#selectCharactersService.displayCharactersFiles;

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
    const completedSteps = this.chapters
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
    return this.#expandedChapterGroups()[groupId] ?? false;
  }

  toggleTutorialGroup(groupId: number): void {
    this.#expandedChapterGroups.update((expandedGroups) => ({
      ...expandedGroups,
      [groupId]: !expandedGroups[groupId]
    }));
  }

  isChapterExpanded(groupId: number): boolean {
    return this.#expandedChapters()[groupId] ?? false;
  }

  toggleTutorialChapter(groupId: number): void {
    if (this.isChapterExpanded(groupId)) {
      this.setExpandedChapters(null);

      return;
    }

    this.setExpandedTutorialGroups(groupId);
    this.setExpandedChapters(groupId);
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

    for (const group of this.chapters) {
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

    if (fragment === 'chapter-1' || fragment === 'chapter-1-content') {
      return 1;
    }

    if (fragment === 'chapter-2' || fragment === 'chapter-2-content') {
      return 2;
    }

    if (fragment === 'chapter-3' || fragment === 'chapter-3-content') {
      return 3;
    }

    const stepMatch = /^step-(\d+)$/.exec(fragment);

    return stepMatch
      ? this.getTutorialGroupIdForStepId(Number(stepMatch[1]))
      : null;
  }

  private setExpandedTutorialGroups(activeGroupId: number): void {
    const nextExpandedGroups = Object.fromEntries(
      this.chapters.map((tutorialGroup) => [
        tutorialGroup.id,
        tutorialGroup.id === activeGroupId
      ])
    ) as Record<number, boolean>;

    if (
      this.chapters.some(
        (tutorialGroup) =>
          this.isTutorialGroupExpanded(tutorialGroup.id) !==
          nextExpandedGroups[tutorialGroup.id]
      )
    ) {
      this.#expandedChapterGroups.set(nextExpandedGroups);
    }
  }

  private setExpandedChapters(activeGroupId: number | null): void {
    const nextExpandedChapters = Object.fromEntries(
      this.chapters.map((tutorialGroup) => [
        tutorialGroup.id,
        tutorialGroup.id === activeGroupId
      ])
    ) as Record<number, boolean>;

    if (
      this.chapters.some(
        (tutorialGroup) =>
          this.isChapterExpanded(tutorialGroup.id) !==
          nextExpandedChapters[tutorialGroup.id]
      )
    ) {
      this.#expandedChapters.set(nextExpandedChapters);
    }
  }

  readonly chapters: readonly ChapterShape[] = [
    {
      id: 1,
      label: 'Foundation Chapter',
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
      ] satisfies ChapterStepShape[]
    },
    this.#selectCharactersService.getChapter(),
    {
      id: 3,
      label: 'Add/Edit Chapter',
      fragment: 'chapter-3',
      steps: [
        { id: 1, label: 'Configure Merge Behavior' },
        { id: 2, label: 'Add/Edit Capabilities' },
        { id: 3, label: 'Complete Add/Edit Tutorial' }
      ] satisfies ChapterStepShape[]
    }
  ];
}
