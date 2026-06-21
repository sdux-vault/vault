#!/usr/bin/env node
import fs from 'node:fs';

/**
 * BlogIndexGenerator
 * ------------------
 * Parses blog.routes.ts and corresponding HTML templates to produce a
 * search-index-compatible document array for blog posts. Each document
 * is tagged with kind "blog" so the search UI can display a "Blog" pill.
 *
 * Extraction strategy:
 * - Route path and data.type from blog.routes.ts
 * - Title from the `<sdux-blog-layout title="...">` attribute in HTML
 * - H2/H3 headings from HTML as keyword content
 * - Pillar code from the `pillar="..."` attribute
 */
export class BlogIndexGenerator {
  /**
   * @param {string} routesPath - Path to blog.routes.ts
   * @param {string} postsDir - Path to the posts directory
   * @param {string} outputPath - Path to write blog-search-index.json
   */
  constructor(routesPath, postsDir, outputPath) {
    this.routesPath = routesPath;
    this.postsDir = postsDir;
    this.outputPath = outputPath;
  }

  /**
   * Reads and parses blog.routes.ts to extract route metadata.
   * @returns {Array<{path: string, type: string, importPath: string}>}
   */
  parseRoutes() {
    if (!fs.existsSync(this.routesPath)) {
      throw new Error(`Blog routes file not found: "${this.routesPath}".`);
    }

    const content = fs.readFileSync(this.routesPath, 'utf8');
    const routes = [];

    const routeRegex =
      /path:\s*'([^']+)'[\s\S]*?type:\s*'([^']+)'[\s\S]*?import\(['"]([^'"]+)['"]\)/g;
    let match;

    while ((match = routeRegex.exec(content)) !== null) {
      const [, routePath, type, importPath] = match;
      routes.push({ path: routePath, type, importPath });
    }

    return routes;
  }

  /**
   * Extracts metadata from a blog post component file.
   * Supports both inline template (new pattern) and external templateUrl (old pattern).
   * @param {string} componentPath - Path to the .component.ts file.
   * @returns {{title: string, pillar: string, headings: string[]}}
   */
  extractTemplateMetadata(componentPath) {
    if (!fs.existsSync(componentPath)) {
      return { title: '', pillar: '', headings: [] };
    }

    let html = fs.readFileSync(componentPath, 'utf8');

    // If it's a .ts file with inline template, extract the template content
    if (componentPath.endsWith('.ts')) {
      const templateMatch = html.match(/template:\s*`([\s\S]*?)`/);
      if (templateMatch) {
        html = templateMatch[1];
      } else {
        // Check for templateUrl and try to read the HTML file
        const urlMatch = html.match(/templateUrl:\s*['"]([^'"]+)['"]/);
        if (urlMatch) {
          const dir = componentPath.replace(/\/[^/]+$/, '');
          const htmlPath = `${dir}/${urlMatch[1].replace(/^\.\//, '')}`;
          if (fs.existsSync(htmlPath)) {
            html = fs.readFileSync(htmlPath, 'utf8');
          } else {
            return { title: '', pillar: '', headings: [] };
          }
        } else {
          return { title: '', pillar: '', headings: [] };
        }
      }
    }

    const titleMatch = html.match(/title="([^"]+)"/);
    const pillarMatch = html.match(/pillar="([^"]+)"/);

    const headings = [];
    const headingRegex = /<h[23][^>]*>([^<]+)<\/h[23]>/g;
    let headingMatch;
    while ((headingMatch = headingRegex.exec(html)) !== null) {
      headings.push(headingMatch[1].trim());
    }

    return {
      title: titleMatch ? titleMatch[1] : '',
      pillar: pillarMatch ? pillarMatch[1] : '',
      headings
    };
  }

  /**
   * Resolves the component file path from an import path.
   * @param {string} importPath - Relative import path from the route definition.
   * @returns {string}
   */
  resolveTemplatePath(importPath) {
    const componentDir = importPath.replace(/\/[^/]+$/, '');
    const componentFile = importPath.split('/').pop();
    const tsFile = `${componentFile}.ts`;
    const fullDir = `${this.postsDir}/${componentDir.replace(/^\.\/posts\//, '')}`;
    return `${fullDir}/${tsFile}`;
  }

  /**
   * Builds the search index documents for all blog posts.
   * @returns {{documents: Array}}
   */
  buildDocuments() {
    const routes = this.parseRoutes();
    const documents = [];

    for (const route of routes) {
      const templatePath = this.resolveTemplatePath(route.importPath);
      const meta = this.extractTemplateMetadata(templatePath);

      const title = meta.title || route.type.replace(/-/g, ' ');
      const contentParts = [title, ...meta.headings, route.type, meta.pillar]
        .filter(Boolean)
        .join(' ');

      documents.push({
        id: `blog:${route.type}`,
        title,
        kind: 'blog',
        project: 'blog',
        docLink: 'blog',
        url: `/blog/${route.path}`,
        symbols: [route.type],
        content: contentParts
      });
    }

    return { documents };
  }

  /**
   * Writes the blog search index JSON to disk.
   * @param {object} indexObject - The document index to serialize.
   */
  writeOutput(indexObject) {
    fs.writeFileSync(
      this.outputPath,
      JSON.stringify(indexObject, null, 2) + '\n',
      'utf8'
    );
    console.warn(`Blog search index written to "${this.outputPath}"`);
  }

  /**
   * Main execution pipeline.
   */
  run() {
    const indexObject = this.buildDocuments();
    this.writeOutput(indexObject);
  }
}
