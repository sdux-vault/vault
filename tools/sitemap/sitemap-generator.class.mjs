import fs from 'node:fs';
import path from 'node:path';

/**
 * SitemapGenerator
 * ----------------
 * Generates a `sitemap.xml` file from a list of URL paths and a base URL.
 *
 * The generator produces a standard XML sitemap conforming to the
 * sitemap protocol (https://www.sitemaps.org/protocol.html).
 *
 * Each URL entry includes:
 * - `<loc>` — the fully qualified URL
 * - `<lastmod>` — included when a changed source file has a verified commit date
 */
export class SitemapGenerator {
  #baseUrl;
  #urls;

  /**
   * @param {{ baseUrl: string, urls: string[], lastmodByUrl?: Map<string, string> }} options
   */
  constructor({ baseUrl, urls, lastmodByUrl = new Map() }) {
    this.#baseUrl = baseUrl.replace(/\/$/, '');
    this.#urls = urls;
    this.#lastmodByUrl = lastmodByUrl;
  }

  #lastmodByUrl;

  /**
   * Validates the URL registry for common mistakes.
   * @returns {string[]} Array of validation error messages (empty if valid)
   */
  validate() {
    const errors = [];
    const seen = new Set();

    for (const url of this.#urls) {
      if (!url.startsWith('/')) {
        errors.push(`URL must start with "/": ${url}`);
      }

      if (url.length > 1 && url.endsWith('/')) {
        errors.push(`URL must not end with "/": ${url}`);
      }

      if (url.includes(':')) {
        errors.push(`URL contains a route parameter placeholder: ${url}`);
      }

      if (seen.has(url)) {
        errors.push(`Duplicate URL: ${url}`);
      }

      seen.add(url);
    }

    return errors;
  }

  /**
   * Generates the sitemap XML string.
   * @returns {string} The complete sitemap XML
   */
  generate() {
    const entries = this.#urls.map((urlPath) => {
      const loc =
        urlPath === '/' ? this.#baseUrl + '/' : `${this.#baseUrl}${urlPath}`;
      const priority = urlPath === '/' ? '1.0' : '0.8';
      const lastmod = this.#lastmodByUrl.get(urlPath);

      return [
        '  <url>',
        `    <loc>${this.#escapeXml(loc)}</loc>`,
        ...(lastmod
          ? [`    <lastmod>${this.#escapeXml(lastmod)}</lastmod>`]
          : []),
        '    <changefreq>weekly</changefreq>',
        `    <priority>${priority}</priority>`,
        '  </url>'
      ].join('\n');
    });

    return [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...entries,
      '</urlset>',
      ''
    ].join('\n');
  }

  /**
   * Generates the sitemap XML and writes it to the specified file path.
   * @param {string} outputPath — absolute path to write the sitemap
   */
  write(outputPath) {
    const errors = this.validate();

    if (errors.length > 0) {
      console.error('Sitemap validation failed:');
      errors.forEach((err) => console.error(`  - ${err}`));
      process.exit(1);
    }

    const xml = this.generate();

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, xml, 'utf-8');
    console.info(
      `Sitemap written to ${outputPath} (${this.#urls.length} URLs)`
    );
  }

  /**
   * Escapes XML special characters in a string.
   * @param {string} str
   * @returns {string}
   */
  #escapeXml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }
}
