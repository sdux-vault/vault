// --- AI Model File Path (DO NOT DELETE) ---
// eslint.config.cjs

const tseslint = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const eslintPluginPrettier = require('eslint-plugin-prettier');
const angular = require('@angular-eslint/eslint-plugin');
const angularTemplate = require('@angular-eslint/eslint-plugin-template');
const angularTemplateParser = require('@angular-eslint/template-parser');

module.exports = [
  {
    ignores: [
      '**/.angular/**',
      '**/coverage/*',
      '**/libs/testing/**',
      '**/app/docs/references/**',
      '**/dist/**',
      '**/out-tsc/**',
      '**/documentation/**',
      '**/tools/sitemap/sitemap-urls.mjs'
    ]
  },

  {
    files: ['libs/addons/**/*.ts', 'libs/addons/**/*.spec.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: ['@sdux-vault/addons', '@sdux-vault/addons/*']
        }
      ]
    }
  },
  {
    files: [
      'libs/core-extensions/angular/**/*.ts',
      'libs/core-extensions/angular/**/*.spec.ts'
    ],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: ['@sdux-vault/angular', '@sdux-vault/angular/*']
        }
      ]
    }
  },
  {
    files: ['libs/core/**/*.ts', 'libs/core/**/*.spec.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: ['@sdux-vault/core', '@sdux-vault/core/*']
        }
      ]
    }
  },
  {
    files: [
      'libs/devtools/tooling/**/*.ts',
      'libs/devtools/tooling/**/*.spec.ts'
    ],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: ['@sdux-vault/devtools', '@sdux-vault/devtools/*']
        }
      ]
    }
  },
  {
    files: ['apps/devtools-ui/**/*.ts', 'apps/devtools-ui/**/*.spec.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: ['@sdux-vault/devtools-ui', '@sdux-vault/devtools-ui/*']
        }
      ]
    }
  },
  {
    files: ['projects/engine/**/*.ts', 'projects/engine/**/*.spec.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: ['@sdux-vault/engine', '@sdux-vault/engine/*']
        }
      ]
    }
  },
  {
    files: [
      'libs/testing/integration/**/*.ts',
      'libs/testing/integration/**/*.spec.ts'
    ],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: ['@sdux-vault/integration', '@sdux-vault/integration/*']
        }
      ]
    }
  },

  {
    files: ['libs/shared/**/*.ts', 'libs/shared/**/*.spec.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: ['@sdux-vault/shared', '@sdux-vault/shared/*']
        }
      ]
    }
  },

  {
    files: [
      'libs/ui/web-components/**/*.ts',
      'libs/ui/web-components/**/*.spec.ts'
    ],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            '@sdux-vault/web-components',
            '@sdux-vault/web-components/*'
          ]
        }
      ]
    }
  },

  {
    files: ['./projects/**/*.ts', './libs/**/*.ts', './apps/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.eslint.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
        ecmaVersion: 'latest'
      }
    },
    plugins: {
      '@typescript-eslint': tseslint,
      '@angular-eslint': angular,
      prettier: eslintPluginPrettier
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      'no-console': 2,
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          prefix: 'sdux',
          style: 'kebab-case',
          type: 'element'
        }
      ],
      '@angular-eslint/directive-selector': [
        'error',
        {
          prefix: 'sdux',
          style: 'camelCase',
          type: 'attribute'
        }
      ]
    }
  },
  {
    files: ['./projects/**/*.ts'],
    rules: {
      'no-console': 0,
      '@angular-eslint/component-selector': [
        'error',
        {
          prefix: 'example',
          style: 'kebab-case',
          type: 'element'
        }
      ],
      '@angular-eslint/directive-selector': [
        'error',
        {
          prefix: 'example',
          style: 'camelCase',
          type: 'attribute'
        }
      ]
    }
  },

  {
    files: ['**/*.spec.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off'
    }
  },

  {
    files: ['**/*.html'],
    languageOptions: {
      parser: angularTemplateParser
    },
    plugins: {
      '@angular-eslint/template': angularTemplate
    },
    rules: {
      '@angular-eslint/template/alt-text': 'error',
      '@angular-eslint/template/button-has-type': 'error',
      '@angular-eslint/template/click-events-have-key-events': 'error',
      '@angular-eslint/template/elements-content': 'error',
      '@angular-eslint/template/interactive-supports-focus': 'error',
      '@angular-eslint/template/label-has-associated-control': 'error',
      '@angular-eslint/template/mouse-events-have-key-events': 'error',
      '@angular-eslint/template/no-autofocus': 'error',
      '@angular-eslint/template/no-distracting-elements': 'error',
      '@angular-eslint/template/no-duplicate-attributes': 'error',
      '@angular-eslint/template/no-inline-styles': [
        'error',
        { allowBindToStyle: true }
      ],
      '@angular-eslint/template/no-positive-tabindex': 'error',
      '@angular-eslint/template/role-has-required-aria': 'error',
      '@angular-eslint/template/table-scope': 'error',
      '@angular-eslint/template/valid-aria': 'error'
    }
  }
];
