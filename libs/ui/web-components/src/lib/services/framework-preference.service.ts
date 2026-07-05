import { Injectable, signal } from '@angular/core';

/**
 * Stores the user's preferred framework for code examples.
 *
 * When a preference is set, all MultiFrameworkExampleComponent instances
 * auto-select the matching tab. The preference persists to localStorage
 * so it survives page reloads.
 */
@Injectable({
  providedIn: 'root'
})
export class FrameworkPreferenceService {
  /** localStorage key used to persist the framework preference. */
  static readonly STORAGE_KEY = 'sdux-framework-preference';

  /** The currently selected framework label, or null when no preference is set. */
  readonly preferred = signal<string | null>(this.#load());

  /**
   * Sets the preferred framework and persists to localStorage.
   *
   * @param label - The framework tab label (e.g., 'Angular', 'React').
   */
  set(label: string): void {
    this.preferred.set(label);
    this.#save(label);
  }

  /**
   * Clears the preference and removes it from localStorage.
   */
  reset(): void {
    this.preferred.set(null);
    localStorage.removeItem(FrameworkPreferenceService.STORAGE_KEY);
  }

  /**
   * Loads the persisted framework preference from localStorage.
   *
   * @returns The stored framework label, or null if none is persisted.
   */
  #load(): string | null {
    try {
      return localStorage.getItem(FrameworkPreferenceService.STORAGE_KEY);
    } catch {
      return null;
    }
  }

  /**
   * Persists the framework preference to localStorage.
   *
   * @param label - The framework label to store.
   */
  #save(label: string): void {
    try {
      localStorage.setItem(FrameworkPreferenceService.STORAGE_KEY, label);
    } catch {
      // localStorage unavailable (e.g., private browsing quota exceeded)
    }
  }
}
