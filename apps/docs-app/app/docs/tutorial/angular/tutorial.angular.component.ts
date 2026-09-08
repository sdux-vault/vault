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
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule
} from '@angular/router';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';
import { TutorialNavigationDirective } from '../directive/tutorial-navigation.directive';
import { ChapterShape } from '../shape/chapter.shape';
import { AngularWelcomeService } from './chapters/01-welcome/services/welcome.service';
import { DisplayCharacterService } from './chapters/02-display-character/services/display-character.service';
import { DisplayCharactersService } from './chapters/03-display-characters/services/display-characters.service';
import { AddEditCharactersService } from './chapters/04-add-edit-characters/services/add-edit-characters.service';
import { DeleteCharactersService } from './chapters/05-delete-characters/services/delete-characters.service';
import { LifecycleService } from './chapters/06-lifecycle/services/lifecycle.service';
import { FiltersAndReducersService } from './chapters/07-filters-and-reducers/services/filters-and-reducers.service';
import { ErrorsService } from './chapters/08-errors/services/errors.service';
import { AsyncInputService } from './chapters/09-async-input/services/async-input.service';
import { DelayService } from './chapters/delay/services/delay.service';
import { DistinctUntilChangedService } from './chapters/distinct-until-changed/services/distinct-until-changed.service';
import { EncryptAndPersistService } from './chapters/encrypt-and-persist/services/encrypt-and-persist.service';
import { StateIntrospectionService } from './chapters/state-introspection/services/state-introspection.service';
import { StepwiseService } from './chapters/stepwise/services/stepwise.service';
import { TabSyncService } from './chapters/tab-sync/services/tab-sync.service';

@Component({
  selector: 'sdux-angular-tutorial',
  standalone: true,
  imports: [
    MatIconModule,
    MatTooltipModule,
    RouterModule,
    PipelineRelatedTopicComponent
  ],
  templateUrl: './tutorial.angular.component.html',
  styleUrls: ['../../scss/documentation.scss', '../tutorial.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TutorialAngularComponent extends TutorialNavigationDirective {
  protected readonly verifiedEnvironment = {
    verifiedOn: '2026-08-06',
    verifiedOnLabel: 'August 6, 2026',
    node: '24 or newer',
    npm: '11 or newer',
    angular: '21',
    sduxAngular: 'latest',
    sduxAddons: 'latest'
  } as const;

  readonly #route = inject(ActivatedRoute);
  readonly #router = inject(Router);
  readonly #angularWelcomeService = inject(AngularWelcomeService);
  readonly #displayCharacterService = inject(DisplayCharacterService);
  readonly #displayCharactersService = inject(DisplayCharactersService);
  readonly #addEditCharactersService = inject(AddEditCharactersService);
  readonly #asyncInputService = inject(AsyncInputService);
  readonly #deleteCharactersService = inject(DeleteCharactersService);
  readonly #lifeCycleService = inject(LifecycleService);
  readonly #filtersAndReducersService = inject(FiltersAndReducersService);
  readonly #errorsService = inject(ErrorsService);
  readonly #delayService = inject(DelayService);
  readonly #encryptAndPersistService = inject(EncryptAndPersistService);
  readonly #stateIntrospectionService = inject(StateIntrospectionService);
  readonly #tabSyncService = inject(TabSyncService);
  readonly #distinctUntilChangedService = inject(DistinctUntilChangedService);
  readonly #stepwiseService = inject(StepwiseService);

  readonly #expandedChapterGroups = signal<Record<number, boolean>>({
    1: true,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
    11: false,
    12: false,
    13: false,
    14: false
  });

  readonly #expandedChapters = signal<Record<number, boolean>>({
    1: true,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
    11: false,
    12: false,
    13: false,
    14: false
  });

  readonly #activeRouteChapterId = signal<number | null>(null);

  readonly chapters = this.#getChapters();

  constructor() {
    super();

    effect(() => {
      const activeGroupId =
        this.#activeRouteChapterId() ??
        this.getTutorialGroupIdForStepId(this.activeStep());

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

    const updateExpandedChapterFromRoute = (): void => {
      const routePath = this.#route.firstChild?.snapshot?.url?.[0]?.path;
      const activeChapter = this.chapters.find(
        (chapter) => chapter.route === routePath
      );

      if (activeChapter) {
        this.#activeRouteChapterId.set(activeChapter.id);
      }
    };

    updateExpandedChapterFromRoute();

    this.#router.events.pipe(takeUntilDestroyed()).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        updateExpandedChapterFromRoute();
      }
    });
  }

  getStepId(chapterIndex: number, stepIndex: number): string {
    return `chapter-${chapterIndex + 1}-step-${stepIndex + 1}`;
  }

  getStepNumber(stepIndex: number): number {
    return stepIndex + 1;
  }

  getTutorialGroupAriaLabel(groupIndex: number, groupLabel: string): string {
    return `Go to Tutorial ${groupIndex + 1}: ${groupLabel}`;
  }

  getStepAriaLabel(
    groupIndex: number,
    stepIndex: number,
    stepLabel: string
  ): string {
    return `Go to Chapter ${groupIndex + 1}, Step ${stepIndex + 1}: ${stepLabel}`;
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

  selectTutorialChapter(groupId: number): void {
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

  private getTutorialGroupIdForStepId(stepId: string): number | null {
    const stepMatch = /^chapter-(\d+)-step-(\d+)$/.exec(stepId);

    return stepMatch ? Number(stepMatch[1]) : null;
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

    const chapterMatch = /^chapter-(\d+)(?:-content)?$/.exec(fragment);

    if (chapterMatch) {
      return Number(chapterMatch[1]);
    }

    return this.getTutorialGroupIdForStepId(fragment);
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

  #getChapters(): readonly ChapterShape[] {
    return [
      this.#angularWelcomeService.chapters(),
      this.#displayCharacterService.chapters(),
      this.#displayCharactersService.chapters(),
      this.#addEditCharactersService.chapters(),
      this.#deleteCharactersService.chapters(),
      this.#lifeCycleService.chapters(),
      this.#filtersAndReducersService.chapters(),
      this.#errorsService.chapters(),
      this.#asyncInputService.chapters(),
      this.#delayService.chapters(),
      this.#encryptAndPersistService.chapters(),
      this.#stateIntrospectionService.chapters(),
      this.#tabSyncService.chapters(),
      this.#distinctUntilChangedService.chapters(),
      this.#stepwiseService.chapters()
    ].map((chapter: ChapterShape, index: number) => {
      chapter.id = index + 1;
      return chapter;
    });
  }
}
