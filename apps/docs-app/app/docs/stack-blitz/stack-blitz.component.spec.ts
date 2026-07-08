import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import StackBlitz from '@stackblitz/sdk';
import { sduxTestingModule } from '../../../../../libs/ui/web-components/src/public-api';
import { StackBlitzOverviewComponent } from './stack-blitz.component';

describe('Component: StackBlitz Overview', () => {
  let component: StackBlitzOverviewComponent;
  let fixture: ComponentFixture<StackBlitzOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        sduxTestingModule,
        CommonModule,
        RouterModule.forRoot([]),
        StackBlitzOverviewComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StackBlitzOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should define examples', () => {
    const languages = [
      { name: 'Angular', key: 'angular' },
      { name: 'React', key: 'react' },
      { name: 'Svelte', key: 'svelte' },
      { name: 'Vue', key: 'vue' }
    ];

    expect(component.exampleGroups).toEqual([
      {
        heading: 'Getting Started',
        id: 'getting-started',
        description:
          'Core pipeline concepts — filters, reducers, and FeatureCell state. Start here to understand how data flows through the pipeline.',
        examples: [
          {
            title: 'Replace State',
            id: 'replace-state',
            exampleName: 'replace-example',
            description:
              'Demonstrates replaceState — the simplest way to update a FeatureCell. The entire previous state is discarded and replaced with the new value in a single atomic operation. Choose your framework and launch the example directly in StackBlitz.',
            languages
          },
          {
            title: 'Promise',
            id: 'promise',
            exampleName: 'promise-example',
            description: jasmine.stringMatching(
              /Demonstrates replaceState with a deferred promise factory/
            ),
            languages
          },
          {
            title: 'Observable',
            id: 'observable',
            exampleName: 'observable-example',
            description: jasmine.stringMatching(
              /Demonstrates replaceState with an RxJS Observable/
            ),
            languages
          },
          {
            title: 'HTTP Resource',
            id: 'http-resource',
            exampleName: 'http-resource-example',
            description: jasmine.stringMatching(
              /Demonstrates replaceState with Angular's httpResource/
            ),
            languages: [{ name: 'Angular', key: 'angular' }]
          }
        ]
      },
      {
        heading: 'Intermediate',
        id: 'intermediate',
        description:
          'Pipeline controllers and interceptors — add timing, throttling, and orchestration to your state transitions.',
        examples: [
          {
            title: 'Filter & Reducer Pipeline',
            id: 'basic-filter-reducer',
            exampleName: 'basic-filter-reducer-example',
            description: jasmine.stringMatching(
              /Demonstrates how .* processes state through a pipeline.*filters and reducers/
            ),
            languages
          },
          {
            title: 'Delay Interceptor Pipeline',
            id: 'interceptor-delay',
            exampleName: 'interceptor-delay-example',
            description: jasmine.stringMatching(
              /Demonstrates how .* processes state through a pipeline.*delay interceptor/
            ),
            languages
          }
        ]
      },
      {
        heading: 'Advanced',
        id: 'advanced',
        description:
          'Developer tooling and diagnostics — record pipeline traces, export debug logs, and generate AI-powered diagnostic reports.',
        examples: [
          {
            title: 'Built-in Debugger',
            id: 'debugger',
            exampleName: 'debugger-example',
            description: jasmine.stringMatching(
              /Demonstrates the .* built-in debugger/
            ),
            languages
          },
          Object({
            title: 'Tab Sync',
            id: 'tab-sync',
            exampleName: 'tab-sync-example',
            isVault: true,
            description: jasmine.any(String),
            notice: jasmine.any(String),
            languages
          })
        ]
      }
    ]);
  });

  describe('openStackBlitzExample', () => {
    it('should be a callable method', () => {
      expect(typeof component.openStackBlitzExample).toBe('function');
    });

    it('should call openProject with the correct inline project', async () => {
      const spy = spyOn(StackBlitz, 'openProject');
      await component.openStackBlitzExample('angular', 'replace-state');
      expect(spy).toHaveBeenCalled();
      const callArgs = spy.calls.mostRecent().args;
      expect(callArgs[0]).toBeDefined();
      expect(callArgs[1]).toEqual({ openFile: 'src/app/example.component.ts' });
    });

    it('should reject with error if example not found', async () => {
      try {
        await component.openStackBlitzExample('angular', 'nonexistent');
        fail('Should have thrown an error');
      } catch (error) {
        expect((error as Error).message).toContain('Unknown project');
      }
    });

    it('should reject with error if language not found', async () => {
      try {
        await component.openStackBlitzExample('nonexistent', 'replace-state');
        fail('Should have thrown an error');
      } catch (error) {
        expect((error as Error).message).toContain('Unknown project');
      }
    });
  });

  describe('copyStackBlitzExample', () => {
    it('should copy URL to clipboard', () => {
      spyOn(navigator.clipboard, 'writeText').and.returnValue(
        Promise.resolve()
      );
      component.copyStackBlitzExample('angular', 'replace-state');
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        'https://stackblitz.com/github/sdux-vault/stackblitz-examples/tree/main/stackblitz/angular/replace-example'
      );
    });

    it('should set copySuccess signal for the correct key', () => {
      jasmine.clock().install();
      try {
        spyOn(navigator.clipboard, 'writeText').and.returnValue(
          Promise.resolve()
        );
        component.copyStackBlitzExample('angular', 'replace-state');
        expect(component.copySuccess()).toBe('angular/replace-state');
        jasmine.clock().tick(2000);
        expect(component.copySuccess()).toBeNull();
      } finally {
        jasmine.clock().uninstall();
      }
    });

    it('should not copy to clipboard if example not found', () => {
      spyOn(navigator.clipboard, 'writeText').and.returnValue(
        Promise.resolve()
      );
      component.copyStackBlitzExample('angular', 'nonexistent');
      expect(navigator.clipboard.writeText).not.toHaveBeenCalled();
    });
  });

  describe('frameworkIcons', () => {
    it('should have icons for all frameworks', () => {
      expect(component.frameworkIcons).toEqual({
        angular: 'assets/brand/angular/angular-icon.svg',
        react: 'assets/brand/react/react-icon.svg',
        svelte: 'assets/brand/svelte/svelte-icon.svg',
        vue: 'assets/brand/vue/vue-icon.svg'
      });
    });

    it('should contain correct icon paths', () => {
      expect(component.frameworkIcons['angular']).toContain('angular');
      expect(component.frameworkIcons['react']).toContain('react');
      expect(component.frameworkIcons['svelte']).toContain('svelte');
      expect(component.frameworkIcons['vue']).toContain('vue');
    });
  });

  describe('exampleGroups property', () => {
    it('should have three groups: Getting Started, Intermediate, Advanced', () => {
      expect(component.exampleGroups.length).toBe(3);
      expect(component.exampleGroups[0].id).toBe('getting-started');
      expect(component.exampleGroups[1].id).toBe('intermediate');
      expect(component.exampleGroups[2].id).toBe('advanced');
    });

    it('should have correct number of examples per group', () => {
      expect(component.exampleGroups[0].examples.length).toBe(4);
      expect(component.exampleGroups[1].examples.length).toBe(2);
      expect(component.exampleGroups[2].examples.length).toBe(2);
    });

    it('should have all required example properties', () => {
      const example = component.exampleGroups[0].examples[0];
      expect('title' in example).toBe(true);
      expect('id' in example).toBe(true);
      expect('exampleName' in example).toBe(true);
      expect('description' in example).toBe(true);
      expect('languages' in example).toBe(true);
    });
  });
});
