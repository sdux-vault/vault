import { createExampleGroups } from './stackblitz-examples.constants';

describe('createExampleGroups', () => {
  const brandName = 'Mock BN';
  let exampleGroups: ReturnType<typeof createExampleGroups>;

  beforeEach(() => {
    exampleGroups = createExampleGroups(brandName);
  });

  describe('structure', () => {
    it('should return an array of groups', () => {
      expect(Array.isArray(exampleGroups)).toBe(true);
    });

    it('should have three groups', () => {
      expect(exampleGroups.length).toBe(3);
    });

    it('should have correct group headings', () => {
      expect(exampleGroups[0].heading).toBe('Getting Started');
      expect(exampleGroups[1].heading).toBe('Intermediate');
      expect(exampleGroups[2].heading).toBe('Advanced');
    });

    it('should have correct group ids', () => {
      expect(exampleGroups[0].id).toBe('getting-started');
      expect(exampleGroups[1].id).toBe('intermediate');
      expect(exampleGroups[2].id).toBe('advanced');
    });

    it('should have descriptions for all groups', () => {
      expect(exampleGroups[0].description.length).toBeGreaterThan(0);
      expect(exampleGroups[1].description.length).toBeGreaterThan(0);
      expect(exampleGroups[2].description.length).toBeGreaterThan(0);
    });
  });

  describe('Getting Started examples', () => {
    it('should have four examples', () => {
      expect(exampleGroups[0].examples.length).toBe(4);
    });

    it('should have Replace State example', () => {
      const example = exampleGroups[0].examples[0];
      expect(example.id).toBe('replace-state');
      expect(example.title).toBe('Replace State');
      expect(example.exampleName).toBe('replace-example');
      expect(example.languages.length).toBe(4);
    });

    it('should have Promise example', () => {
      const example = exampleGroups[0].examples[1];
      expect(example.id).toBe('promise');
      expect(example.title).toBe('Promise');
      expect(example.exampleName).toBe('promise-example');
    });

    it('should have Observable example', () => {
      const example = exampleGroups[0].examples[2];
      expect(example.id).toBe('observable');
      expect(example.title).toBe('Observable');
      expect(example.exampleName).toBe('observable-example');
    });

    it('should have HTTP Resource example', () => {
      const example = exampleGroups[0].examples[3];
      expect(example.id).toBe('http-resource');
      expect(example.title).toBe('HTTP Resource');
      expect(example.exampleName).toBe('http-resource-example');
      expect(example.languages.length).toBe(1);
      expect(example.languages[0].key).toBe('angular');
    });

    it('should include brandName in descriptions', () => {
      const gettingStarted = exampleGroups[0];
      // Check all examples except Replace State which doesn't include brandName
      gettingStarted.examples.forEach((example, index) => {
        if (index > 0) {
          // Promise, Observable, HTTP Resource include brandName
          expect(example.description).toContain(brandName);
        }
      });
    });
  });

  describe('Intermediate examples', () => {
    it('should have two examples', () => {
      expect(exampleGroups[1].examples.length).toBe(2);
    });

    it('should have Filter & Reducer Pipeline example', () => {
      const example = exampleGroups[1].examples[0];
      expect(example.id).toBe('basic-filter-reducer');
      expect(example.title).toBe('Filter & Reducer Pipeline');
      expect(example.exampleName).toBe('basic-filter-reducer-example');
    });

    it('should have Delay Interceptor Pipeline example', () => {
      const example = exampleGroups[1].examples[1];
      expect(example.id).toBe('interceptor-delay');
      expect(example.title).toBe('Delay Interceptor Pipeline');
      expect(example.exampleName).toBe('interceptor-delay-example');
    });

    it('should have 4 languages for all intermediate examples', () => {
      exampleGroups[1].examples.forEach((example) => {
        expect(example.languages.length).toBe(4);
      });
    });
  });

  describe('Advanced examples', () => {
    it('should have two examples', () => {
      expect(exampleGroups[2].examples.length).toBe(2);
    });

    it('should have Built-in Debugger example', () => {
      const example = exampleGroups[2].examples[0];
      expect(example.id).toBe('debugger');
      expect(example.title).toBe('Built-in Debugger');
      expect(example.exampleName).toBe('debugger-example');
    });

    it('should have Tab Sync example with notice', () => {
      const example = exampleGroups[2].examples[1];
      expect(example.id).toBe('tab-sync');
      expect(example.title).toBe('Tab Sync');
      expect(example.exampleName).toBe('tab-sync-example');
      expect((example as any)?.isVault).toBe(true);
      expect((example as any)?.notice).toBeDefined();
      expect((example as any)?.notice).toContain('same-origin');
    });

    it('Tab Sync notice should contain helpful instructions', () => {
      const example = exampleGroups[2].examples[1];
      const notice = (example as any)?.notice;
      expect(notice).toContain('clone');
      expect(notice).toContain('BroadcastChannel');
    });
  });

  describe('common properties', () => {
    it('all examples should have required properties', () => {
      exampleGroups.forEach((group) => {
        group.examples.forEach((example) => {
          expect('title' in example).toBe(true);
          expect('id' in example).toBe(true);
          expect('exampleName' in example).toBe(true);
          expect('description' in example).toBe(true);
          expect('languages' in example).toBe(true);
        });
      });
    });

    it('all examples should have non-empty descriptions', () => {
      exampleGroups.forEach((group) => {
        group.examples.forEach((example) => {
          expect(example.description.length).toBeGreaterThan(0);
        });
      });
    });

    it('all examples should have at least one language', () => {
      exampleGroups.forEach((group) => {
        group.examples.forEach((example) => {
          expect(example.languages.length).toBeGreaterThan(0);
        });
      });
    });

    it('all languages should have name and key', () => {
      exampleGroups.forEach((group) => {
        group.examples.forEach((example) => {
          example.languages.forEach((lang) => {
            expect('name' in lang).toBe(true);
            expect('key' in lang).toBe(true);
            expect(lang.name.length).toBeGreaterThan(0);
            expect(lang.key.length).toBeGreaterThan(0);
          });
        });
      });
    });
  });

  describe('brand name substitution', () => {
    it('should substitute brand name in descriptions', () => {
      const customBrandName = 'Custom Brand';
      const customGroups = createExampleGroups(customBrandName);
      let hasBrandName = false;
      customGroups.forEach((group) => {
        group.examples.forEach((example) => {
          if (example.description.includes(customBrandName)) {
            hasBrandName = true;
          }
        });
      });
      expect(hasBrandName).toBe(true);
    });
  });

  describe('total example count', () => {
    it('should have 8 total examples across all groups', () => {
      let totalCount = 0;
      exampleGroups.forEach((group) => {
        totalCount += group.examples.length;
      });
      expect(totalCount).toBe(8);
    });
  });
});
