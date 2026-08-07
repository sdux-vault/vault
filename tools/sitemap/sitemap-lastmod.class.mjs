import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

/**
 * Resolves route source files and adds last-modified dates only for files
 * changed on the current branch after it diverged from main.
 */
export class SitemapLastmodResolver {
  #projectRoot;
  #appDir;
  #routeFile;
  #mainBranch;
  #git;
  #selectorFiles;

  /**
   * @param {{ projectRoot: string, appDir: string, routeFile: string, mainBranch?: string, git?: object }} options
   */
  constructor({ projectRoot, appDir, routeFile, mainBranch = 'main', git }) {
    this.#projectRoot = projectRoot;
    this.#appDir = appDir;
    this.#routeFile = routeFile;
    this.#mainBranch = mainBranch;
    this.#git = git ?? {
      run: (args) =>
        execFileSync('git', args, {
          cwd: this.#projectRoot,
          encoding: 'utf8'
        })
    };
  }

  /**
   * Returns existing sitemap dates, then replaces only dates associated with
   * source files changed on the branch.
   *
   * @param {string[]} urls
   * @param {string} existingSitemap
   * @returns {Map<string, string>}
   */
  resolve(urls, existingSitemap = '') {
    const existing = this.#parseExistingDates(existingSitemap);
    const changedFiles = this.#changedFiles();
    const routeFiles = this.#routeFiles(urls);
    const dates = new Map(existing);

    for (const url of urls) {
      const sourceFiles = routeFiles.get(url) ?? [];
      const relevant = sourceFiles.filter((file) => changedFiles.has(file));

      if (relevant.length === 0) {
        continue;
      }

      const date = relevant
        .map((file) => this.#latestCommitDate(file))
        .filter(Boolean)
        .sort()
        .at(-1);

      if (date) {
        dates.set(url, date);
      }
    }

    return new Map([...dates].filter(([url]) => urls.includes(url)));
  }

  #changedFiles() {
    const mergeBase = this.#git
      .run(['merge-base', this.#mainBranch, 'HEAD'])
      .trim();
    const output = this.#git
      .run([
        'diff',
        '--name-only',
        mergeBase,
        'HEAD',
        '--',
        'apps/docs-app/app'
      ])
      .trim();

    return new Set(
      output ? output.split('\n').map((file) => path.normalize(file)) : []
    );
  }

  #latestCommitDate(relativeFile) {
    const output = this.#git
      .run([
        'log',
        '--format=%cs',
        `${this.#mainBranch}..HEAD`,
        '--',
        relativeFile
      ])
      .trim();

    return output ? output.split('\n').sort().at(-1) : undefined;
  }

  #parseExistingDates(xml) {
    const dates = new Map();
    const entryPattern =
      /<url>[\s\S]*?<loc>([^<]+)<\/loc>[\s\S]*?(?:<lastmod>([^<]+)<\/lastmod>)?[\s\S]*?<\/url>/g;
    let match;

    while ((match = entryPattern.exec(xml)) !== null) {
      if (match[2]) {
        const url = new URL(match[1]).pathname;
        dates.set(url, match[2]);
      }
    }

    return dates;
  }

  #routeFiles(urls) {
    const sourceMap = new Map(urls.map((url) => [url, new Set()]));
    this.#selectorFiles = this.#buildSelectorIndex();
    this.#visitRoutes(this.#routeFile, '', urls, sourceMap, new Set());
    return new Map([...sourceMap].map(([url, files]) => [url, [...files]]));
  }

  #visitRoutes(routeFile, parentPath, urls, sourceMap, visited) {
    const absoluteRouteFile = path.resolve(routeFile);
    if (visited.has(absoluteRouteFile)) return;
    visited.add(absoluteRouteFile);

    const sourceFile = ts.createSourceFile(
      absoluteRouteFile,
      fs.readFileSync(absoluteRouteFile, 'utf8'),
      ts.ScriptTarget.Latest,
      true
    );
    const arrays = [];

    sourceFile.forEachChild((node) => {
      if (!ts.isVariableStatement(node)) return;
      for (const declaration of node.declarationList.declarations) {
        if (
          declaration.initializer &&
          ts.isArrayLiteralExpression(declaration.initializer)
        ) {
          arrays.push(declaration.initializer);
        }
      }
    });

    for (const array of arrays) {
      for (const element of array.elements) {
        if (!ts.isObjectLiteralExpression(element)) continue;
        const routePath = this.#propertyString(element, 'path');
        if (routePath === undefined) continue;
        const routePattern = [parentPath, routePath].filter(Boolean).join('/');
        const componentImport = this.#importPath(element, 'loadComponent');
        if (componentImport) {
          const componentFile = this.#relativeSource(
            absoluteRouteFile,
            componentImport
          );
          for (const url of urls.filter((candidate) =>
            this.#matchesPattern(candidate, routePattern)
          )) {
            this.#addComponentDependencies(
              sourceMap.get(url),
              componentFile,
              url
            );
          }
        }

        const children = this.#propertyArray(element, 'children');
        if (children) {
          this.#visitRouteArray(
            children,
            absoluteRouteFile,
            routePattern,
            urls,
            sourceMap,
            visited
          );
        }

        const childImport = this.#importPath(element, 'loadChildren');
        if (childImport) {
          this.#visitRoutes(
            this.#relativeSource(absoluteRouteFile, childImport),
            routePattern,
            urls,
            sourceMap,
            visited
          );
        }
      }
    }
  }

  #visitRouteArray(array, routeFile, parentPath, urls, sourceMap, visited) {
    for (const element of array.elements) {
      if (!ts.isObjectLiteralExpression(element)) continue;
      const routePath = this.#propertyString(element, 'path');
      if (routePath === undefined) continue;
      const routePattern = [parentPath, routePath].filter(Boolean).join('/');
      const componentImport = this.#importPath(element, 'loadComponent');
      if (componentImport) {
        const componentFile = this.#relativeSource(routeFile, componentImport);
        for (const url of urls.filter((candidate) =>
          this.#matchesPattern(candidate, routePattern)
        )) {
          this.#addComponentDependencies(
            sourceMap.get(url),
            componentFile,
            url
          );
        }
      }
      const children = this.#propertyArray(element, 'children');
      if (children) {
        this.#visitRouteArray(
          children,
          routeFile,
          routePattern,
          urls,
          sourceMap,
          visited
        );
      }
    }
  }

  #property(node, name) {
    return node.properties.find(
      (property) =>
        ts.isPropertyAssignment(property) &&
        ts.isIdentifier(property.name) &&
        property.name.text === name
    );
  }

  #propertyString(node, name) {
    const property = this.#property(node, name);
    return property && ts.isStringLiteral(property.initializer)
      ? property.initializer.text
      : undefined;
  }

  #propertyArray(node, name) {
    const property = this.#property(node, name);
    return property && ts.isArrayLiteralExpression(property.initializer)
      ? property.initializer
      : undefined;
  }

  #importPath(node, name) {
    const property = this.#property(node, name);
    if (!property) return undefined;
    let importPath;
    const visit = (child) => {
      if (
        ts.isCallExpression(child) &&
        child.expression.kind === ts.SyntaxKind.ImportKeyword &&
        child.arguments[0] &&
        ts.isStringLiteral(child.arguments[0])
      ) {
        importPath = child.arguments[0].text;
      }
      child.forEachChild(visit);
    };
    visit(property.initializer);
    return importPath;
  }

  #matchesPattern(url, pattern) {
    const parts = pattern.split('/').filter(Boolean);
    const urlParts = url.split('/').filter(Boolean);
    if (parts.length !== urlParts.length) return false;
    return parts.every(
      (part, index) => part.startsWith(':') || part === urlParts[index]
    );
  }

  #relativeSource(routeFile, importPath) {
    const absolute = path.resolve(path.dirname(routeFile), `${importPath}.ts`);
    return path.relative(this.#projectRoot, absolute);
  }

  #addComponentDependencies(files, componentFile, url) {
    if (!files) return;
    const absoluteComponentFile = path.resolve(
      this.#projectRoot,
      componentFile
    );
    if (!fs.existsSync(absoluteComponentFile)) return;
    files.add(componentFile);
    const source = fs.readFileSync(absoluteComponentFile, 'utf8');
    const template = source.match(/templateUrl:\s*['"]([^'"]+)['"]/);
    if (template) {
      const templateFile = path.relative(
        this.#projectRoot,
        path.resolve(path.dirname(absoluteComponentFile), template[1])
      );
      files.add(templateFile);
      this.#addTemplateComponents(files, templateFile, url);
    }
  }

  #addTemplateComponents(files, templateFile, url) {
    const template = fs.readFileSync(
      path.resolve(this.#projectRoot, templateFile),
      'utf8'
    );
    const lastSegment = url.split('/').filter(Boolean).at(-1);
    const cases = [
      ...template.matchAll(/@case\s*\(['"]([^'"]+)['"]\)\s*\{([\s\S]*?)\}/g)
    ];
    const selected = cases.length
      ? cases
          .filter(([, value]) => value === lastSegment)
          .map(([, , body]) => body)
          .join('\n')
      : template;
    for (const selector of selected.matchAll(/<((?:sdux|app)-[a-z0-9-]+)/g)) {
      const componentFile = this.#selectorFiles.get(selector[1]);
      if (componentFile && !files.has(componentFile)) {
        this.#addComponentDependencies(files, componentFile, url);
      }
    }
  }

  #buildSelectorIndex() {
    const selectors = new Map();
    const visit = (directory) => {
      for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
        const fullPath = path.join(directory, entry.name);
        if (entry.isDirectory()) visit(fullPath);
        if (!entry.name.endsWith('.ts')) continue;
        const source = fs.readFileSync(fullPath, 'utf8');
        const selector = source.match(/selector:\s*['"]([^'"]+)['"]/);
        if (selector) {
          selectors.set(
            selector[1],
            path.relative(this.#projectRoot, fullPath)
          );
        }
      }
    };
    visit(this.#appDir);
    return selectors;
  }
}
