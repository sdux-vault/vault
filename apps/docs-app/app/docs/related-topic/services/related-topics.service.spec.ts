import { TestBed } from '@angular/core/testing';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { RELATED_TOPICS_REGISTRY } from '../constants/related-topics.registry';
import { RelatedTopicsService } from './related-topics.service';

describe('Service: RelatedTopics', () => {
  let service: RelatedTopicsService;
  let originalRegistry: any;

  const TEST_REGISTRY = {
    globals: {
      core: [{ link: '/core', display: 'Core' }],
      behavior: [{ link: '/behavior', display: 'Behavior' }],
      controller: [{ link: '/controller', display: 'Controller' }]
    },
    categories: {
      stepwise: {
        baseRoute: '/stepwise',
        baseDisplay: 'Stepwise',
        globals: ['core'],
        globalCross: ['behavior', 'controller'],
        cross: ['controller-page'],
        items: [
          { link: '/stepwise/a', display: 'A' },
          { link: '/stepwise/a', display: 'C' },
          { link: '/stepwise/b', display: 'B' },
          { link: '/stepwise/d', display: 'd', fragment: 'small-d' },
          { link: '/stepwise/d', display: 'D', fragment: 'big-D' }
        ]
      },
      'controller-page': {
        baseRoute: '/controller-page',
        baseDisplay: 'Controller Page',
        globals: ['core'],
        items: [{ link: '/controller-page/x', display: 'X' }]
      }
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [sduxTestingModule],
      providers: [RelatedTopicsService]
    });

    service = TestBed.inject(RelatedTopicsService);

    // Snapshot real registry
    originalRegistry = structuredClone(RELATED_TOPICS_REGISTRY);

    // Replace with test registry
    Object.assign(RELATED_TOPICS_REGISTRY, TEST_REGISTRY);
  });

  afterEach(() => {
    // Restore real registry
    Object.assign(RELATED_TOPICS_REGISTRY, originalRegistry);
  });

  it('returns empty array when category does not exist', () => {
    expect(service.resolve({ category: 'missing' })).toEqual(
      Object({
        links: [],
        crossLinks: [],
        globalLinks: [],
        globalCrossLinks: []
      })
    );
  });

  it('includes category-specific globals in order', () => {
    const result = service.resolve({ category: 'stepwise' });

    expect(result).toEqual(
      Object({
        links: [
          Object({ id: 1, link: '/stepwise/a', display: 'A' }),
          Object({ id: 2, link: '/stepwise/b', display: 'B' }),
          Object({
            id: 3,
            link: '/stepwise/d',
            display: 'd',
            fragment: 'small-d'
          }),
          Object({
            id: 4,
            link: '/stepwise/d',
            display: 'D',
            fragment: 'big-D'
          })
        ],
        crossLinks: [
          Object({
            id: 5,
            link: '/controller-page',
            display: 'Controller Page'
          }),
          Object({ id: 6, link: '/controller-page/x', display: 'X' })
        ],
        globalLinks: [Object({ id: 7, link: '/core', display: 'Core' })],
        globalCrossLinks: [
          Object({ id: 8, link: '/behavior', display: 'Behavior' }),
          Object({ id: 9, link: '/controller', display: 'Controller' })
        ]
      })
    );
  });

  it('ignores unknown global groups safely', () => {
    TEST_REGISTRY.categories.stepwise.globals.push('unknown');

    const result = service.resolve({ category: 'stepwise' });

    expect(result).toEqual(
      Object({
        links: [
          Object({ id: 1, link: '/stepwise/a', display: 'A' }),
          Object({ id: 2, link: '/stepwise/b', display: 'B' }),
          Object({
            id: 3,
            link: '/stepwise/d',
            display: 'd',
            fragment: 'small-d'
          }),
          Object({
            id: 4,
            link: '/stepwise/d',
            display: 'D',
            fragment: 'big-D'
          })
        ],
        crossLinks: [
          Object({
            id: 5,
            link: '/controller-page',
            display: 'Controller Page'
          }),
          Object({ id: 6, link: '/controller-page/x', display: 'X' })
        ],
        globalLinks: [Object({ id: 7, link: '/core', display: 'Core' })],
        globalCrossLinks: [
          Object({ id: 8, link: '/behavior', display: 'Behavior' }),
          Object({ id: 9, link: '/controller', display: 'Controller' })
        ]
      })
    );
  });

  it('does NOT include base route when type is undefined', () => {
    const result = service.resolve({ category: 'stepwise' });

    expect(result).toEqual(
      Object({
        links: [
          Object({ id: 1, link: '/stepwise/a', display: 'A' }),
          Object({ id: 2, link: '/stepwise/b', display: 'B' }),
          Object({
            id: 3,
            link: '/stepwise/d',
            display: 'd',
            fragment: 'small-d'
          }),
          Object({
            id: 4,
            link: '/stepwise/d',
            display: 'D',
            fragment: 'big-D'
          })
        ],
        crossLinks: [
          Object({
            id: 5,
            link: '/controller-page',
            display: 'Controller Page'
          }),
          Object({ id: 6, link: '/controller-page/x', display: 'X' })
        ],
        globalLinks: [Object({ id: 7, link: '/core', display: 'Core' })],
        globalCrossLinks: [
          Object({ id: 8, link: '/behavior', display: 'Behavior' }),
          Object({ id: 9, link: '/controller', display: 'Controller' })
        ]
      })
    );
  });

  it('includes base route when type is provided', () => {
    const result = service.resolve({
      category: 'stepwise',
      type: 'a'
    });

    expect(result).toEqual(
      Object({
        links: [
          Object({ id: 1, link: '/stepwise/b', display: 'B' }),
          Object({
            id: 2,
            link: '/stepwise/d',
            display: 'd',
            fragment: 'small-d'
          }),
          Object({
            id: 3,
            link: '/stepwise/d',
            display: 'D',
            fragment: 'big-D'
          }),
          Object({ link: '/stepwise', display: 'Stepwise', id: 9 })
        ],
        crossLinks: [
          Object({
            id: 4,
            link: '/controller-page',
            display: 'Controller Page'
          }),
          Object({ id: 5, link: '/controller-page/x', display: 'X' })
        ],
        globalLinks: [Object({ id: 6, link: '/core', display: 'Core' })],
        globalCrossLinks: [
          Object({ id: 7, link: '/behavior', display: 'Behavior' }),
          Object({ id: 8, link: '/controller', display: 'Controller' })
        ]
      })
    );
  });

  it('does NOT include base route when baseDisplay is empty', () => {
    // Arrange: empty baseDisplay
    TEST_REGISTRY.categories.stepwise.baseDisplay = '';

    const result = service.resolve({
      category: 'stepwise',
      type: 'a'
    });

    // Assert: base route should NOT be added
    expect(result).toEqual(
      Object({
        links: [
          Object({ id: 1, link: '/stepwise/b', display: 'B' }),
          Object({
            id: 2,
            link: '/stepwise/d',
            display: 'd',
            fragment: 'small-d'
          }),
          Object({
            id: 3,
            link: '/stepwise/d',
            display: 'D',
            fragment: 'big-D'
          })
        ],
        crossLinks: [
          Object({
            id: 4,
            link: '/controller-page',
            display: 'Controller Page'
          }),
          Object({ id: 5, link: '/controller-page/x', display: 'X' })
        ],
        globalLinks: [Object({ id: 6, link: '/core', display: 'Core' })],
        globalCrossLinks: [
          Object({ id: 7, link: '/behavior', display: 'Behavior' }),
          Object({ id: 8, link: '/controller', display: 'Controller' })
        ]
      })
    );
  });

  it('does NOT include base route when baseDisplay is undefined', () => {
    TEST_REGISTRY.categories.stepwise.baseDisplay = undefined as any;

    const result = service.resolve({
      category: 'stepwise',
      type: 'a'
    });

    expect(result).toEqual(
      Object({
        links: [
          Object({ id: 1, link: '/stepwise/b', display: 'B' }),
          Object({
            id: 2,
            link: '/stepwise/d',
            display: 'd',
            fragment: 'small-d'
          }),
          Object({
            id: 3,
            link: '/stepwise/d',
            display: 'D',
            fragment: 'big-D'
          })
        ],
        crossLinks: [
          Object({
            id: 4,
            link: '/controller-page',
            display: 'Controller Page'
          }),
          Object({ id: 5, link: '/controller-page/x', display: 'X' })
        ],
        globalLinks: [Object({ id: 6, link: '/core', display: 'Core' })],
        globalCrossLinks: [
          Object({ id: 7, link: '/behavior', display: 'Behavior' }),
          Object({ id: 8, link: '/controller', display: 'Controller' })
        ]
      })
    );
  });

  it('includes all items when no type is provided', () => {
    const result = service.resolve({ category: 'stepwise' });

    expect(result).toEqual(
      Object({
        links: [
          Object({ id: 1, link: '/stepwise/a', display: 'A' }),
          Object({ id: 2, link: '/stepwise/b', display: 'B' }),
          Object({
            id: 3,
            link: '/stepwise/d',
            display: 'd',
            fragment: 'small-d'
          }),
          Object({
            id: 4,
            link: '/stepwise/d',
            display: 'D',
            fragment: 'big-D'
          })
        ],
        crossLinks: [
          Object({
            id: 5,
            link: '/controller-page',
            display: 'Controller Page'
          }),
          Object({ id: 6, link: '/controller-page/x', display: 'X' })
        ],
        globalLinks: [Object({ id: 7, link: '/core', display: 'Core' })],
        globalCrossLinks: [
          Object({ id: 8, link: '/behavior', display: 'Behavior' }),
          Object({ id: 9, link: '/controller', display: 'Controller' })
        ]
      })
    );
  });

  it('excludes self item when type matches', () => {
    const result = service.resolve({
      category: 'stepwise',
      type: 'a'
    });

    expect(result).toEqual(
      Object({
        links: [
          Object({ id: 1, link: '/stepwise/b', display: 'B' }),
          Object({
            id: 2,
            link: '/stepwise/d',
            display: 'd',
            fragment: 'small-d'
          }),
          Object({
            id: 3,
            link: '/stepwise/d',
            display: 'D',
            fragment: 'big-D'
          })
        ],
        crossLinks: [
          Object({
            id: 4,
            link: '/controller-page',
            display: 'Controller Page'
          }),
          Object({ id: 5, link: '/controller-page/x', display: 'X' })
        ],
        globalLinks: [Object({ id: 6, link: '/core', display: 'Core' })],
        globalCrossLinks: [
          Object({ id: 7, link: '/behavior', display: 'Behavior' }),
          Object({ id: 8, link: '/controller', display: 'Controller' })
        ]
      })
    );
  });

  it('includes cross-category base and items', () => {
    const result = service.resolve({ category: 'stepwise' });

    expect(result).toEqual(
      Object({
        links: [
          Object({ id: 1, link: '/stepwise/a', display: 'A' }),
          Object({ id: 2, link: '/stepwise/b', display: 'B' }),
          Object({
            id: 3,
            link: '/stepwise/d',
            display: 'd',
            fragment: 'small-d'
          }),
          Object({
            id: 4,
            link: '/stepwise/d',
            display: 'D',
            fragment: 'big-D'
          })
        ],
        crossLinks: [
          Object({
            id: 5,
            link: '/controller-page',
            display: 'Controller Page'
          }),
          Object({ id: 6, link: '/controller-page/x', display: 'X' })
        ],
        globalLinks: [Object({ id: 7, link: '/core', display: 'Core' })],
        globalCrossLinks: [
          Object({ id: 8, link: '/behavior', display: 'Behavior' }),
          Object({ id: 9, link: '/controller', display: 'Controller' })
        ]
      })
    );
  });

  it('does not include cross-category when cross references itself', () => {
    TEST_REGISTRY.categories.stepwise.cross = ['stepwise'];

    const result = service.resolve({ category: 'stepwise' });

    expect(result).toEqual(
      Object({
        links: [
          Object({ id: 1, link: '/stepwise/a', display: 'A' }),
          Object({ id: 2, link: '/stepwise/b', display: 'B' }),
          Object({
            id: 3,
            link: '/stepwise/d',
            display: 'd',
            fragment: 'small-d'
          }),
          Object({
            id: 4,
            link: '/stepwise/d',
            display: 'D',
            fragment: 'big-D'
          })
        ],
        crossLinks: [],
        globalLinks: [Object({ id: 5, link: '/core', display: 'Core' })],
        globalCrossLinks: [
          Object({ id: 6, link: '/behavior', display: 'Behavior' }),
          Object({ id: 7, link: '/controller', display: 'Controller' })
        ]
      })
    );
  });

  it('ignores missing cross categories safely', () => {
    TEST_REGISTRY.categories.stepwise.cross = ['missing'];

    const result = service.resolve({ category: 'stepwise' });

    expect(result).toEqual(
      Object({
        links: [
          Object({ id: 1, link: '/stepwise/a', display: 'A' }),
          Object({ id: 2, link: '/stepwise/b', display: 'B' }),
          Object({
            id: 3,
            link: '/stepwise/d',
            display: 'd',
            fragment: 'small-d'
          }),
          Object({
            id: 4,
            link: '/stepwise/d',
            display: 'D',
            fragment: 'big-D'
          })
        ],
        crossLinks: [],
        globalLinks: [Object({ id: 5, link: '/core', display: 'Core' })],
        globalCrossLinks: [
          Object({ id: 6, link: '/behavior', display: 'Behavior' }),
          Object({ id: 7, link: '/controller', display: 'Controller' })
        ]
      })
    );
  });

  it('deduplicates links by link value', () => {
    const result = service.resolve({
      category: 'controller-page',
      type: 'x'
    });

    expect(result).toEqual(
      Object({
        links: [
          Object({
            link: '/controller-page',
            display: 'Controller Page',
            id: 2
          })
        ],
        crossLinks: [],
        globalLinks: [Object({ id: 1, link: '/core', display: 'Core' })],
        globalCrossLinks: []
      })
    );
  });

  it('preserves insertion order', () => {
    const result = service.resolve({ category: 'stepwise' });
    expect(result).toEqual(
      Object({
        links: [
          Object({ id: 1, link: '/stepwise/a', display: 'A' }),
          Object({ id: 2, link: '/stepwise/b', display: 'B' }),
          Object({
            id: 3,
            link: '/stepwise/d',
            display: 'd',
            fragment: 'small-d'
          }),
          Object({
            id: 4,
            link: '/stepwise/d',
            display: 'D',
            fragment: 'big-D'
          })
        ],
        crossLinks: [],
        globalLinks: [Object({ id: 5, link: '/core', display: 'Core' })],
        globalCrossLinks: [
          Object({ id: 6, link: '/behavior', display: 'Behavior' }),
          Object({ id: 7, link: '/controller', display: 'Controller' })
        ]
      })
    );
  });

  it('resolves aliased category through #findAlias', () => {
    (TEST_REGISTRY.categories as any)['provide-vault'] = {
      baseRoute: '/provide-vault',
      baseDisplay: 'Provide Vault',
      items: [{ link: '/provide-vault/setup', display: 'Setup' }]
    };

    const result = service.resolve({ category: 'at-feature-cell' });

    expect(result.links.length).toBe(0);
    // expect(result.links[0].display).toBe('');
  });

  it('returns empty when category is unknown and has no alias', () => {
    const result = service.resolve({ category: 'no-alias-exists' });

    expect(result).toEqual(
      Object({
        links: [],
        crossLinks: [],
        globalLinks: [],
        globalCrossLinks: []
      })
    );
  });
});
