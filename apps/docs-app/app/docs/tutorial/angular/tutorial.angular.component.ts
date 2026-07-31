import {
  Component,
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
  FeatureCellBrandNameComponent,
  SDuXVideoComponent
} from '@sdux-vault/ui/web-components';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';
import { TutorialNavigationDirective } from '../directive/tutorial-navigation.directive';
import { ChapterShape } from '../shape/chapter.shape';
import { AddEditCharactersChapterComponent } from './chapters/add-edit-characters/add-edit-characters.chapter.component';
import { AddEditCharactersService } from './chapters/add-edit-characters/services/add-edit-characters.service';
import { DisplayCharacterChapterComponent } from './chapters/display-character/display-character.chapter.component';
import { DisplayCharacterService } from './chapters/display-character/services/display-character.service';
import { DisplayCharactersChapterComponent } from './chapters/display-characters/display-characters.chapter.component';
import { DisplayCharactersService } from './chapters/display-characters/services/display-characters.service';

@Component({
  selector: 'sdux-angular-tutorial',
  standalone: true,
  imports: [
    MatIconModule,
    MatTooltipModule,
    RouterModule,
    BrandNameComponent,
    PipelineRelatedTopicComponent,
    SDuXVideoComponent,
    FeatureCellBrandNameComponent,
    DisplayCharactersChapterComponent,
    DisplayCharacterChapterComponent,
    AddEditCharactersChapterComponent
  ],
  templateUrl: './tutorial.angular.component.html',
  styleUrls: ['../../scss/documentation.scss', '../tutorial.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TutorialAngularComponent extends TutorialNavigationDirective {
  readonly #route = inject(ActivatedRoute);
  readonly #displayCharactersService = inject(DisplayCharactersService);
  readonly #displayCharacterService = inject(DisplayCharacterService);
  readonly #addEditCharactersService = inject(AddEditCharactersService);

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

  readonly addEditCharacterExample = this.#addEditCharactersService.stackblitz;

  protected readonly addEditAppConfigFile =
    this.#addEditCharactersService.appConfigFile;

  protected readonly addEditServiceFiles =
    this.#addEditCharactersService.serviceFiles;

  protected readonly addEditComponentFiles =
    this.#addEditCharactersService.componentFiles;

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
    this.#displayCharacterService.chapters(),
    this.#displayCharactersService.chapters(),
    this.#addEditCharactersService.chapters()
  ];
}
