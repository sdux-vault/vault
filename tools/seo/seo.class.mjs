import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

/**
 * SEO auditor for SDuX Vault documentation pages.
 *
 * Uses landing page templates as the source of truth for docs routes.
 * Validates that every template-derived route has a corresponding registry
 * entry and that all registry entries contain title and description metadata.
 */
export class SeoAuditor {
  /**
   * Path to the related-topic constants directory.
   *
   * @type {string}
   */
  #registryDir;

  /**
   * Landing page template definitions.
   * Each entry maps a template file to its route prefixes and switch structure.
   *
   * @type {Array<{ templateFile: string, routePrefixes: string[], switchOn: 'category-type' | 'type-only', categoryFromData?: string }>}
   */
  #templates;

  /**
   * UI routes that intentionally reuse metadata from another registry route.
   *
   * @type {Map<string, string>}
   */
  #routeAliases;

  /**
   * Registry files discovered in the constants directory.
   *
   * @type {string[]}
   */
  #registryFiles = [];

  /**
   * Parsed registry data keyed by file name.
   *
   * @type {Map<string, { baseRoute: string, baseDisplay: string, title?: string, description?: string, items: Array<{ link: string, display: string, title?: string, description?: string }> }>}
   */
  #registries = new Map();

  /**
   * Groups of equivalent docs routes derived from landing page templates.
   * A group contains the same logical route under each supported prefix.
   *
   * @type {string[][]}
   */
  #docsRouteGroups = [];

  /**
   * @param {{ registryDir: string, templates: Array<{ templateFile: string, routePrefixes: string[], switchOn: 'category-type' | 'type-only', categoryFromData?: string }>, routeAliases?: Record<string, string> }} config
   */
  constructor(config) {
    this.#registryDir = config.registryDir;
    this.#templates = config.templates;
    this.#routeAliases = new Map(Object.entries(config.routeAliases ?? {}));
  }

  /**
   * Runs the full SEO audit.
   *
   * @returns {{ missingRoutes: string[], missingCategoryMeta: Array<{ file: string, hasTitle: boolean, hasDescription: boolean }>, missingItemMeta: Array<{ file: string, display: string, hasTitle: boolean, hasDescription: boolean }>, hasErrors: boolean, errorCount: number, indexedCount: number }}
   */
  audit() {
    this.#loadRegistries();
    this.#loadDocsRoutes();

    const missingRoutes = this.#findMissingRoutes();
    const missingCategoryMeta = this.#findMissingCategoryMeta();
    const missingItemMeta = this.#findMissingItemMeta();

    const errorCount =
      missingRoutes.length +
      missingCategoryMeta.length +
      missingItemMeta.length;

    return {
      missingRoutes,
      missingCategoryMeta,
      missingItemMeta,
      hasErrors: errorCount > 0,
      errorCount,
      indexedCount: this.#countIndexedPages()
    };
  }

  /**
   * Discovers and parses all registry files from the constants directory.
   */
  #loadRegistries() {
    this.#registryFiles = readdirSync(this.#registryDir).filter(
      (f) => f.startsWith('related-topics.') && f.endsWith('.registry.ts')
    );

    for (const file of this.#registryFiles) {
      const content = readFileSync(join(this.#registryDir, file), 'utf-8');
      const registry = this.#parseRegistry(content, file);
      if (registry) {
        this.#registries.set(file, registry);
      }
    }
  }

  /**
   * Parses a single registry file to extract metadata.
   *
   * @param {string} content - Raw file content.
   * @param {string} _fileName - Name of the registry file (unused, reserved for diagnostics).
   * @returns {{ baseRoute: string, baseDisplay: string, title?: string, description?: string, items: Array<{ link: string, display: string, title?: string, description?: string }> } | null}
   */
  #parseRegistry(content, _fileName) {
    const baseRouteMatch = content.match(/baseRoute:\s*'([^']+)'/);
    const baseDisplayMatch = content.match(/baseDisplay:\s*'([^']+)'/);

    if (!baseRouteMatch || !baseDisplayMatch) {
      return null;
    }

    const titleMatch = content.match(
      /(?<!items[\s\S]*?)(?:^|\n)\s*title:\s*'([^']+)'/
    );
    const descriptionMatch = content.match(
      /(?<!items[\s\S]*?)(?:^|\n)\s*description:\s*'([^']+)'/
    );

    const items = this.#parseItems(content);

    return {
      baseRoute: baseRouteMatch[1],
      baseDisplay: baseDisplayMatch[1],
      title: titleMatch ? titleMatch[1] : undefined,
      description: descriptionMatch ? descriptionMatch[1] : undefined,
      items
    };
  }

  /**
   * Parses individual items from a registry file's items array.
   *
   * @param {string} content - Raw file content.
   * @returns {Array<{ link: string, display: string, title?: string, description?: string }>}
   */
  #parseItems(content) {
    const items = [];
    const itemsMatch = content.match(/items:\s*\[([\s\S]*?)\]\s*[,}]/);

    if (!itemsMatch) {
      return items;
    }

    const itemsBlock = itemsMatch[1];
    const itemBlocks = itemsBlock
      .split(/\}\s*,/)
      .filter((b) => b.includes('link:'));

    for (const block of itemBlocks) {
      const linkMatch = block.match(/link:\s*'([^']+)'/);
      const displayMatch = block.match(/display:\s*'([^']+)'/);
      const titleMatch = block.match(/title:\s*'([^']+)'/);
      const descriptionMatch = block.match(/description:\s*'([^']+)'/);

      if (linkMatch && displayMatch) {
        items.push({
          link: linkMatch[1],
          display: displayMatch[1],
          title: titleMatch ? titleMatch[1] : undefined,
          description: descriptionMatch ? descriptionMatch[1] : undefined
        });
      }
    }

    return items;
  }

  /**
   * Builds equivalent docs route groups by parsing landing page templates.
   *
   * For templates with `switchOn: 'category-type'`, extracts nested
   * `@switch(category)` → `@switch(type)` pairs to produce routes
   * like `prefix/category` and `prefix/category/type`.
   *
   * For templates with `switchOn: 'type-only'`, extracts `@case` values
   * under a single `@switch(type)` to produce `prefix/type` routes.
   */
  #loadDocsRoutes() {
    this.#docsRouteGroups = [];

    for (const template of this.#templates) {
      const content = readFileSync(template.templateFile, 'utf-8');
      const routeGroups = this.#parseTemplate(content, template);

      for (const routeGroup of routeGroups) {
        this.#docsRouteGroups.push(routeGroup);
      }
    }
  }

  /**
   * Parses a landing page template to extract routes from `@switch`/`@case` blocks.
   *
   * @param {string} content - Template HTML content.
   * @param {{ routePrefixes: string[], switchOn: 'category-type' | 'type-only', categoryFromData?: string }} template - Template config.
   * @returns {string[][]}
   */
  #parseTemplate(content, template) {
    const routeGroups = [];

    if (template.switchOn === 'category-type') {
      const pairs = this.#extractCategoryTypePairs(content);

      for (const { category, types } of pairs) {
        routeGroups.push(
          template.routePrefixes.map((prefix) => `${prefix}/${category}`)
        );

        for (const type of types) {
          routeGroups.push(
            template.routePrefixes.map(
              (prefix) => `${prefix}/${category}/${type}`
            )
          );
        }
      }
    } else {
      const types = this.#extractTypeCases(content);

      for (const type of types) {
        routeGroups.push(
          template.routePrefixes.map((prefix) => `${prefix}/${type}`)
        );
      }
    }

    return routeGroups;
  }

  /**
   * Extracts nested category → type pairs from a template with
   * `@switch(category)` containing nested `@switch(type)` blocks.
   *
   * @param {string} content - Template HTML content.
   * @returns {Array<{ category: string, types: string[] }>}
   */
  #extractCategoryTypePairs(content) {
    const pairs = [];
    const lines = content.split('\n');

    let currentCategory = null;
    let currentTypes = [];
    let depth = 0;
    let categorySwitchDepth = null;
    let typeSwitchDepth = null;

    for (const line of lines) {
      const trimmed = line.trim();
      const depthBeforeLine = depth;

      if (trimmed === '@switch (category) {') {
        categorySwitchDepth = depthBeforeLine;
      } else if (categorySwitchDepth !== null) {
        const caseMatch = trimmed.match(/^@case \('([^']+)'\)\s*\{/);

        if (
          caseMatch &&
          typeSwitchDepth === null &&
          depthBeforeLine === categorySwitchDepth + 1
        ) {
          if (currentCategory) {
            pairs.push({ category: currentCategory, types: currentTypes });
          }

          currentCategory = caseMatch[1];
          currentTypes = [];
        } else if (
          currentCategory &&
          trimmed === '@switch (type) {' &&
          depthBeforeLine === categorySwitchDepth + 2
        ) {
          typeSwitchDepth = depthBeforeLine;
        } else if (
          caseMatch &&
          typeSwitchDepth !== null &&
          depthBeforeLine === typeSwitchDepth + 1
        ) {
          currentTypes.push(caseMatch[1]);
        }
      }

      const openingBraces = (line.match(/\{/g) ?? []).length;
      const closingBraces = (line.match(/\}/g) ?? []).length;
      depth += openingBraces - closingBraces;

      if (typeSwitchDepth !== null && depth <= typeSwitchDepth) {
        typeSwitchDepth = null;
      }

      if (categorySwitchDepth !== null && depth <= categorySwitchDepth) {
        if (currentCategory) {
          pairs.push({ category: currentCategory, types: currentTypes });
        }
        break;
      }
    }

    return pairs;
  }

  /**
   * Extracts type values from a template with a single `@switch(type)`.
   *
   * @param {string} content - Template HTML content.
   * @returns {string[]}
   */
  #extractTypeCases(content) {
    const types = [];
    const casePattern = /@case \('([^']+)'\)/g;
    let match;

    while ((match = casePattern.exec(content)) !== null) {
      if (!types.includes(match[1])) {
        types.push(match[1]);
      }
    }

    return types;
  }

  /**
   * Finds docs routes that have no corresponding registry item.
   *
   * @returns {string[]}
   */
  #findMissingRoutes() {
    const allRegistryLinks = new Set();

    for (const registry of this.#registries.values()) {
      allRegistryLinks.add(registry.baseRoute);
      for (const item of registry.items) {
        allRegistryLinks.add(item.link);
      }
    }

    // Also extract link values from registry files that use a different shape
    // (e.g. related-topics.registry.ts has globals/categories instead of items).
    for (const file of this.#registryFiles) {
      const content = readFileSync(join(this.#registryDir, file), 'utf-8');
      const linkPattern = /link:\s*'([^']+)'/g;
      let match;
      while ((match = linkPattern.exec(content)) !== null) {
        allRegistryLinks.add(match[1]);
      }
    }

    const missing = [];

    for (const routeGroup of this.#docsRouteGroups) {
      const routes = routeGroup.filter(
        (route) => !route.includes('/deprecated')
      );

      if (routes.length === 0) continue;

      const hasRegistryEntry = routes.some((route) => {
        const canonicalRoute = this.#routeAliases.get(route) ?? route;
        return allRegistryLinks.has(canonicalRoute);
      });

      if (!hasRegistryEntry) missing.push(routes[0]);
    }

    return missing.sort();
  }

  /**
   * Finds registry files missing category-level title or description.
   *
   * @returns {Array<{ file: string, hasTitle: boolean, hasDescription: boolean }>}
   */
  #findMissingCategoryMeta() {
    const missing = [];

    for (const [file, registry] of this.#registries) {
      if (!registry.title || !registry.description) {
        missing.push({
          file,
          hasTitle: Boolean(registry.title),
          hasDescription: Boolean(registry.description)
        });
      }
    }

    return missing;
  }

  /**
   * Finds registry items missing item-level title or description.
   *
   * @returns {Array<{ file: string, display: string, hasTitle: boolean, hasDescription: boolean }>}
   */
  #findMissingItemMeta() {
    const missing = [];

    for (const [file, registry] of this.#registries) {
      for (const item of registry.items) {
        if (!item.title || !item.description) {
          missing.push({
            file,
            display: item.display,
            hasTitle: Boolean(item.title),
            hasDescription: Boolean(item.description)
          });
        }
      }
    }

    return missing;
  }

  /**
   * Counts the total number of indexed docs pages across all registries.
   *
   * @returns {number}
   */
  #countIndexedPages() {
    let count = 0;

    for (const registry of this.#registries.values()) {
      count += 1;
      count += registry.items.length;
    }

    return count;
  }
}
