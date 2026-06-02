import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../../');
const scriptPath = path.join(__dirname, '..', 'generate-prerender-routes.mjs');
const outputPath = path.join(
  projectRoot,
  'apps',
  'docs-app',
  'prerender-routes.txt'
);

describe('CLI: generate-prerender-routes', () => {
  let originalContent;
  let existed;
  let stdout;

  beforeAll(() => {
    existed = fs.existsSync(outputPath);
    if (existed) {
      originalContent = fs.readFileSync(outputPath, 'utf-8');
    }

    stdout = execFileSync('node', [scriptPath], {
      cwd: projectRoot,
      encoding: 'utf-8'
    });
  });

  afterAll(() => {
    if (existed) {
      fs.writeFileSync(outputPath, originalContent, 'utf-8');
    } else {
      fs.rmSync(outputPath, { force: true });
    }
  });

  it('should log the output path and route count', () => {
    expect(stdout).toContain('Prerender routes written to');
    expect(stdout).toMatch(/\d+ routes/);
  });

  it('should create prerender-routes.txt', () => {
    expect(fs.existsSync(outputPath)).toBeTrue();
  });

  it('should write one route per line', () => {
    const content = fs.readFileSync(outputPath, 'utf-8');
    const lines = content.split('\n').filter((l) => l.length > 0);

    expect(lines.length).toBeGreaterThan(0);
    lines.forEach((line) => {
      expect(line).toMatch(/^\//);
    });
  });

  it('should end with a trailing newline', () => {
    const content = fs.readFileSync(outputPath, 'utf-8');

    expect(content.endsWith('\n')).toBeTrue();
  });

  it('should contain the root route', () => {
    const content = fs.readFileSync(outputPath, 'utf-8');
    const lines = content.split('\n');

    expect(lines).toContain('/');
  });

  it('should not contain duplicate routes', () => {
    const content = fs.readFileSync(outputPath, 'utf-8');
    const lines = content.split('\n').filter((l) => l.length > 0);
    const unique = new Set(lines);

    expect(unique.size).toBe(lines.length);
  });
});
