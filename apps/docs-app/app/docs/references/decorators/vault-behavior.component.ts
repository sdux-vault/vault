/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: <a href="/docs/references/decorators/vault-behavior">VaultBehavior</a>
 */

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sdux-vault-behavior',
  standalone: true,
  template: `<div class="docs-container">
      <div class="header">
        <h3>VaultBehavior</h3>
      </div>
      <header class="docs-header">
        <div class="lead">Decorator that registers a class as an Vault behavior.
The <a href="/docs/references/decorators/vault-behavior">VaultBehavior</a> decorator attaches the provided BehaviorMeta
definition to the target constructor, making the behavior discoverable by
the orchestrator during pipeline initialization. Metadata fields such as
type, key, and critical are also mirrored onto static properties of
the decorated class to support lightweight runtime introspection.
This decorator does not modify method logic or structure; it only assigns
metadata required for orchestrator classification and behavior lifecycle
management.<br/><br/></div>
        
      </header>
      <section class="section">
      <div class="section-title">Installation</div>
      <div class="section-body">
         Part of the <strong>@sdux-vault/shared</strong> project.

        <pre class="code-inline"><code class="language-ts">npm install @sdux-vault/shared</code></pre>
      </div>
    </section>
<section class="section">
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
            <tr>
      <td>
        <p><strong><a href="/docs/references/decorators/vault-behavior">VaultBehavior</a>(meta)</strong></p>
        <p>inputs:</p>
      <ul>
        <li>meta: <a href="/docs/references/shapes/behavior-meta-shape">BehaviorMetaShape</a></li>
      </ul>
        <p>returns:</p>
        <ul>
          <li>void</li>
        </ul>
      </td>
      <td>
        Decorator that registers a class as an Vault behavior.
The <a href="/docs/references/decorators/vault-behavior">VaultBehavior</a> decorator attaches the provided BehaviorMeta
definition to the target constructor, making the behavior discoverable by
the orchestrator during pipeline initialization. Metadata fields such as
type, key, and critical are also mirrored onto static properties of
the decorated class to support lightweight runtime introspection.
This decorator does not modify method logic or structure; it only assigns
metadata required for orchestrator classification and behavior lifecycle
management.<br/><br/>
      </td>
    </tr>
          </tbody>
        </table>
      </div>
    </section>
      <section class="section">
        <div class="section-title">Documentation Generation Notes</div>
        <div class="section-body">
          <p>
            This reference API documentation is generated from @jsdoc-annotated source code using
            @compodoc, with AI-assisted comments reviewed by a human prior to publication.
          </p>
        </div>
      </section>
    </div>`,
  styleUrl: '../../scss/example.scss',
  encapsulation: ViewEncapsulation.None
})
export class VaultBehaviorComponent {}
