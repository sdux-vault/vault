import { computed, Injectable, signal } from '@angular/core';
import { STEP_INSTRUCTIONS } from '../constants/builder/steps.constant';
import {
  FileBuilderModeType,
  FileBuilderModeTypes
} from '../types/file-builder/file-builder-mode.type';

@Injectable({ providedIn: 'root' })
export class PipelineStepService {
  #stepInstructions: string[] = structuredClone(STEP_INSTRUCTIONS);
  readonly #isExpanded = signal<boolean>(true);
  readonly #builderMode = signal<FileBuilderModeType>(
    FileBuilderModeTypes.Basic
  );
  readonly #displayStartButton = signal<boolean>(true);

  readonly isExpanded = computed(() => {
    return this.#isExpanded();
  });

  readonly displayStartButton = computed(() => {
    return this.#displayStartButton();
  });

  readonly builderMode = computed(() => {
    return this.#builderMode();
  });

  toggleInstructions(): void {
    this.#isExpanded.update((value) => !value);
  }

  setBuilderMode(mode: FileBuilderModeType): void {
    this.#builderMode.set(mode);
  }

  start(): void {
    this.#isExpanded.set(false);
    this.#displayStartButton.set(false);
  }

  get stepInstructions(): string[] {
    return [...this.#stepInstructions];
  }

  getStepInstruction(stepNumber: number): string {
    return `Step ${stepNumber}: ${this.#stepInstructions[stepNumber - 1]}`;
  }

  isEndStep(stepNumber: number): boolean {
    return this.#stepInstructions.length - 1 <= stepNumber;
  }
}
