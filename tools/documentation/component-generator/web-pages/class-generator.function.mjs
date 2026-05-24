import { formatPlainTextToHtml } from '../utils/format-plain-text-to-html.util.mjs';

import {
  sanitizeHtml,
  sanitizeParameters
} from '../utils/sanitize-html.util.mjs';

export const MODIFIERS = {
  STATIC: 126,
  READONLY: 148,
  PRIVATE: 123,
  ASYNC: 134,
  PROTECTED: 124,
  ABSTRACT: 128
};

function renderTypeAliasSection(name, documentation) {
  // Compodoc does not expose RHS for complex type aliases
  const hasExplicitType =
    documentation.rawtype && documentation.rawtype !== 'unknown';

  // Case 1: Simple alias (rare, but possible)
  if (hasExplicitType) {
    return `<section class="section">
        <div class="section-title">Type Definition</div>
        <div class="section-body">
          <pre class="code-inline"><code class="language-ts">
type ${sanitizeHtml(name)} = ${sanitizeHtml(documentation.rawtype)};
          </code></pre>
        </div>
      </section>`;
  }

  // Case 2: Derived / inferred alias (your case)
  return `<section class="section">
      <div class="section-title">Type Definition</div>
      <div class="section-body">
        <p>
          <strong>${sanitizeHtml(name)}</strong> is a derived type alias.
        </p>
        <p>
          Its definition is inferred from another symbol at compile time and
          cannot be expanded into a concrete union at runtime.
        </p>
        <p>
          See the description above for details on how this type is constructed.
        </p>
      </div>
    </section>`;
}

function renderObjectApiRow(member) {
  const args = member.args || [];

  const inputsHtml = args.length
    ? `<p>inputs:</p>
      <ul>
        ${args.map((a) => `<li>${sanitizeHtml(a.name)}: ${sanitizeHtml(a.type || 'unknown')}</li>`).join('')}
      </ul>`
    : '';

  const returnType = sanitizeParameters(member.returnType || 'void');

  return `<tr>
      <td>
        <p><strong>${sanitizeHtml(member.name)}(${args.map((a) => a.name).join(', ')})</strong></p>
        ${inputsHtml}
        <p>returns:</p>
        <ul>
          <li>${returnType}</li>
        </ul>
      </td>
      <td>
        <p>Part of the singleton API.</p>
      </td>
    </tr>`;
}

function parseObjectApiMembers(defaultValue) {
  if (typeof defaultValue !== 'string') return [];

  const members = [];
  const seen = new Set();

  // getter: get foo(): type { ... }
  const getterRegex =
    /get\s+([A-Za-z0-9_]+)\s*\(\)\s*:\s*([A-Za-z0-9_<>,\s]+)\s*\{/g;

  // method: foo(bar: type): returnType { ... }
  const methodRegex =
    /([A-Za-z0-9_]+)\s*\(([^)]*)\)\s*:\s*([A-Za-z0-9_<>,\s]+)\s*\{/g;

  let match;

  // ---- GETTERS ----
  while ((match = getterRegex.exec(defaultValue))) {
    const name = match[1];
    if (seen.has(name)) continue;

    seen.add(name);
    members.push({
      name,
      args: [],
      returnType: match[2],
      kind: 'getter'
    });
  }

  // ---- METHODS ----
  while ((match = methodRegex.exec(defaultValue))) {
    const name = match[1];

    // 🔑 THIS IS THE FIX
    if (seen.has(name)) continue;

    seen.add(name);

    members.push({
      name,
      args: match[2]
        .split(',')
        .map((a) => a.trim())
        .filter(Boolean)
        .map((a) => {
          const [argName, type] = a.split(':').map((s) => s.trim());
          return { name: argName, type };
        }),
      returnType: match[3],
      kind: 'method'
    });
  }

  return members;
}

function renderFunctionRow(entry, documentation) {
  const args = Array.isArray(documentation.args) ? documentation.args : [];

  const inputsHtml = args.length
    ? `<p>inputs:</p>
      <ul>
        ${args.map((a) => `<li>${sanitizeHtml(a.name)}: ${sanitizeHtml(a.type || 'unknown')}</li>`).join('')}
      </ul>`
    : '';

  const returnType = documentation.returnType
    ? sanitizeParameters(documentation.returnType)
    : 'void';

  return `<tr>
      <td>
        <p><strong>${sanitizeHtml(entry.name)}(${args.map((a) => a.name).join(', ')})</strong></p>
        ${inputsHtml}
        <p>returns:</p>
        <ul>
          <li>${returnType}</li>
        </ul>
      </td>
      <td>
        ${formatPlainTextToHtml(documentation.rawdescription || documentation.description || '')}
      </td>
    </tr>`;
}

function parseConstObject(value) {
  try {
    // Strip "as const" and evaluate safely
    const cleaned = value.replace(/\sas const$/, '');
    const obj = Function(`"use strict"; return (${cleaned});`)();
    return Object.entries(obj);
  } catch {
    return [];
  }
}

function isSymbolValue(value) {
  return typeof value === 'string' && value.trim().startsWith('Symbol(');
}

function renderDefinitionSection(defaultValue, docKind) {
  if (!defaultValue) return '';

  // Symbol
  if (isSymbolValue(defaultValue)) {
    return `<section class="section">
        <div class="section-title">Definition</div>
        <div class="section-body">
          <pre class="code-inline"><code class="language-ts">const ${sanitizeHtml(defaultValue)}</code></pre>
        </div>
      </section>`;
  }

  // Object literal (as const)
  const entries = parseConstObject(defaultValue);
  if (entries.length) {
    return `<section class="section">
        <div class="section-title">Values</div>
        <div class="section-body">
          <table aria-label="Values">
            <thead>
              <tr>
                <th scope="col" class="column-300">Key</th>
                <th scope="col" class="column-auto">Value</th>
              </tr>
            </thead>
            <tbody>
              ${entries
                .map(
                  ([key, value]) => `<tr>
                    <td><strong>${sanitizeHtml(key)}</strong></td>
                    <td><code>${sanitizeHtml(String(value))}</code></td>
                  </tr>`
                )
                .join('')}
            </tbody>
          </table>
        </div>
      </section>`;
  }
}

function hasModifier(p, modifier) {
  return Array.isArray(p.modifierKind) && p.modifierKind.includes(modifier);
}

/**
 * Render documentation HTML for a Compodoc "class" entry.
 *
 * Produces:
 * - Header
 * - Overview (from JSDoc description)
 * - API Summary (methods + properties)
 * - Optional: Deprecated section
 */
export async function renderClassDocumentation(entry, documentation) {
  if (!documentation) {
    return `<div class="docs-container">
        <div class="header">
          <h3>${sanitizeHtml(entry.name)}</h3>
        </div>

        <p>No documentation found in Compodocs for this ${entry.kind}.</p>
      </div>`;
  }

  // Use plain text → format to HTML → sanitize
  const sourceDescription =
    documentation.rawdescription || documentation.description || '';

  const description = formatPlainTextToHtml(
    sourceDescription || 'No description available.'
  );

  // ---------- DEPRECATED SECTION ----------
  let deprecatedSection = '';
  if (documentation.deprecated) {
    const deprecatedMsg = formatPlainTextToHtml(
      documentation.deprecationMessage || 'This API is deprecated.'
    );

    deprecatedSection = `<section class="section">
        <div class="section-title">⚠️ Deprecated</div>
        <div class="section-body">
          ${deprecatedMsg}
        </div>
      </section>`;
  }

  // ---------- CONSTRUCTOR ----------
  let constructorSection = '';
  if (documentation.constructorObj) {
    const c = documentation.constructorObj;
    const args = Array.isArray(c.args) ? c.args : [];

    const inputsHtml = args.length
      ? `<p>inputs:</p>
        <ul>
        ${args
          .map((p) => {
            const optional = p.optional ? '?' : '';
            return `<li>${sanitizeHtml(p.name)}${optional}: ${sanitizeHtml(p.type || 'unknown')}</li>`;
          })
          .join('')}
        </ul>`
      : '';

    const extendsHtml =
      Array.isArray(documentation.extends) && documentation.extends.length
        ? `<p>extends:</p>
        <ul>
          ${documentation.extends.map((e) => `<li>${sanitizeHtml(e)}</li>`).join('')}
        </ul>`
        : '';

    const implementsHtml =
      Array.isArray(documentation.implements) && documentation.implements.length
        ? `<p>implements:</p>
        <ul>
          ${documentation.implements.map((i) => `<li>${sanitizeHtml(i)}</li>`).join('')}
        </ul>`
        : '';

    constructorSection = `<section class="section">
        <div class="section-title">Constructor</div>
        <div class="section-body">
          <table aria-label="Constructor">
            <thead>
              <tr>
                <th scope="col" class="column-300">Signature</th>
                <th scope="col" class="column-auto">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                   <strong>constructor</strong>
                  ${inputsHtml}
                  ${extendsHtml}
                  ${implementsHtml}
                </td>
                <td>
                  ${formatPlainTextToHtml(c.rawdescription || c.description || '')}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>`;
  }

  // ---------- METHODS ----------
  let methodRows = '';
  if (
    Array.isArray(documentation.methods) &&
    documentation.methods.length > 0
  ) {
    methodRows = documentation.methods
      .map((m) => {
        const args = Array.isArray(m.args) ? m.args : [];

        const modifiers = [];

        if (hasModifier(m, MODIFIERS.STATIC)) modifiers.push('static');
        if (hasModifier(m, MODIFIERS.READONLY)) modifiers.push('readonly');
        if (hasModifier(m, MODIFIERS.ASYNC)) modifiers.push('async');
        if (hasModifier(m, MODIFIERS.PRIVATE)) modifiers.push('#private');
        if (hasModifier(m, MODIFIERS.PROTECTED)) modifiers.push('protected');

        const modifierMarkup = modifiers.length
          ? `<p class="modifiers">${modifiers.join(', ')}</p>`
          : '';

        const inputsHtml = args.length
          ? `<p>inputs:</p>
          <ul>
           ${args
             .map((p) => {
               const optional = p.optional ? '?' : '';
               return `<li>${sanitizeHtml(p.name)}${optional}: ${sanitizeHtml(p.type || 'unknown')}</li>`;
             })
             .join('')}
          </ul>`
          : '';

        const returnType = sanitizeParameters(m.returnType || 'void');

        return `<tr>
          <td>
            <strong>${sanitizeHtml(m.name)}</strong>
            ${modifierMarkup}
            ${inputsHtml}
            <p>returns: ${returnType}</p>
          </td>
          <td>
            ${formatPlainTextToHtml(m.rawdescription || m.description || '')}
          </td>
        </tr>`;
      })
      .join('');
  }

  const methodsSection = methodRows
    ? `<section class="section">
        <div class="section-title">Methods</div>
        <div class="section-body">
          <table aria-label="Methods">
            <thead>
              <tr>
                <th scope="col" class="column-300">Method</th>
                <th scope="col" class="column-auto">Description</th>
              </tr>
            </thead>
            <tbody>
              ${methodRows}
            </tbody>
          </table>
        </div>
      </section>`
    : '';

  let typeAliasSection = '';

  if (documentation.subtype === 'typealias') {
    typeAliasSection = renderTypeAliasSection(entry.name, documentation);
  }

  let constObjectSection = '';

  const isConstObject =
    documentation.ctype === 'miscellaneous' &&
    documentation.subtype === 'variable' &&
    documentation.type === 'object' &&
    typeof documentation.defaultValue === 'string' &&
    documentation.defaultValue.includes('{');

  if (isConstObject) {
    const members = parseObjectApiMembers(documentation.defaultValue);

    if (members.length) {
      constObjectSection = `<section class="section">
        <div class="section-title">API</div>
        <div class="section-body">
          <table aria-label="API">
            <thead>
              <tr>
                <th scope="col" class="column-300">API</th>
                <th scope="col" class="column-auto">Description</th>
              </tr>
            </thead>
            <tbody>
              ${members.map(renderObjectApiRow).join('')}
            </tbody>
          </table>
        </div>
      </section>`;
    }
  }

  let propertyRows = '';

  // 1️⃣ Normal class / interface properties
  if (
    Array.isArray(documentation.properties) &&
    documentation.properties.length > 0
  ) {
    propertyRows = documentation.properties
      .map((p) => {
        const isStatic = hasModifier(p, MODIFIERS.STATIC);
        const isReadonly = hasModifier(p, MODIFIERS.READONLY);

        const modifiers = [
          isStatic ? 'static' : null,
          isReadonly ? 'readonly' : null
        ].filter(Boolean);

        const modifierMarkup = modifiers.length
          ? `<p class="modifiers">${modifiers.join(', ')}</p>`
          : '';

        const optional = p.optional ? '?' : '';
        const type =
          p.type && p.type !== 'unknown' ? sanitizeHtml(p.type) : 'unknown';

        const defaultValue = p.defaultValue
          ? `<p class="default">default: ${sanitizeHtml(p.defaultValue)}</p>`
          : '';

        return `<tr>
          <td class="column-300">
            <strong>${sanitizeHtml(p.name)}${optional}</strong>
            ${modifierMarkup}
            <p class="type">type: ${type}</p>
            ${defaultValue}
          </td>
          <td class="column-auto">
            ${formatPlainTextToHtml(p.rawdescription || p.description || '')}
          </td>
        </tr>`;
      })
      .join('');
  }

  if (!propertyRows && documentation.defaultValue) {
    const entries = parseConstObject(documentation.defaultValue);

    if (entries.length) {
      propertyRows = entries
        .map(
          ([key, value]) => `<tr>
          <td class="column-300">
            <strong>${sanitizeHtml(key)}</strong>
          </td>
          <td class="column-auto">
            <code>${sanitizeHtml(String(value))}</code>
          </td>
        </tr>`
        )
        .join('');
    }
  }

  let functionSection = '';

  if (entry.docKind === 'function' || entry.docKind === 'decorator') {
    functionSection = `<section class="section">
      <div class="section-title">API</div>
      <div class="section-body">
        <table aria-label="API">
          <thead>
            <tr>
              <th scope="col" class="column-300">API</th>
              <th scope="col" class="column-auto">Description</th>
            </tr>
          </thead>
          <tbody>
            ${renderFunctionRow(entry, documentation)}
          </tbody>
        </table>
      </div>
    </section>`;
  }

  const definitionSection =
    documentation.defaultValue &&
    documentation.defaultValue.trim().startsWith('Symbol(')
      ? renderDefinitionSection(documentation.defaultValue, entry.docKind)
      : '';

  const propertiesSection = propertyRows
    ? `<section class="section">
        <div class="section-title">Properties</div>
        <div class="section-body">
          <table aria-label="Properties">
            <thead>
              <tr>
                <th scope="col" class="column-300">Property</th>
                <th scope="col" class="column-auto">Description</th>
              </tr>
            </thead>
            <tbody>
              ${propertyRows}
            </tbody>
          </table>
        </div>
      </section>`
    : '';

  const installation = `<section class="section">
      <div class="section-title">Installation</div>
      <div class="section-body">
         Part of the <strong>@sdux-vault/${sanitizeHtml(entry.project)}</strong> project.

        <pre class="code-inline"><code class="language-ts">npm install @sdux-vault/${sanitizeHtml(entry.project)}</code></pre>
      </div>
    </section>`;

  // ---------- CLASS METADATA ----------
  // ---- CLASS META BADGES ----
  const classBadges = [];

  // Angular DI
  if (documentation.type === 'injectable') {
    classBadges.push({ label: 'Injectable', css: 'meta-injectable' });
  }

  // Deprecated at class level
  if (documentation.deprecated) {
    classBadges.push({ label: 'Deprecated', css: 'meta-deprecated' });
  }

  const classMetaSection = classBadges.length
    ? `<div class="class-meta">
      ${classBadges
        .map(
          (b) => `<span class="meta-badge ${b.css}">
          ${b.label}
        </span>`
        )
        .join('')}
    </div>`
    : '';

  const finalizeOutput = [
    installation,
    deprecatedSection,
    constructorSection,
    methodsSection,
    propertiesSection,
    definitionSection,
    constObjectSection,
    functionSection,
    typeAliasSection
  ]
    .filter(Boolean)
    .join('\n');

  // ---------- FINAL HTML ----------
  return `<div class="docs-container">
      <div class="header">
        <h3>${sanitizeHtml(entry.name)}</h3>
      </div>
      <header class="docs-header">
        <div class="lead">${description}</div>
        ${classMetaSection}
      </header>
      ${finalizeOutput}
      <section class="section">
        <div class="section-title">Documentation Generation Notes</div>
        <div class="section-body">
          <p>
            This reference API documentation is generated from @jsdoc-annotated source code using
            @compodoc, with AI-assisted comments reviewed by a human prior to publication.
          </p>
        </div>
      </section>
    </div>`;
}
