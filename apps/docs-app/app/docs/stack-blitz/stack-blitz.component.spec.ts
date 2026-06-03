import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
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
            description:
              'Demonstrates how Mock BN processes state through a pipeline: input data flows through filters and reducers before becoming the final FeatureCell state. Choose your framework and launch the example directly in StackBlitz.',
            languages
          },
          {
            title: 'Delay Interceptor Pipeline',
            id: 'interceptor-delay',
            exampleName: 'interceptor-delay-example',
            description:
              'Demonstrates how Mock BN processes state through a pipeline: input data flows through a delay interceptor before becoming the final FeatureCell state. Choose your framework and launch the example directly in StackBlitz.',
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
            description:
              'Demonstrates the Mock BN built-in debugger — a floating panel that captures pipeline execution traces. Record a session, trigger state changes, then export logs or generate an AI diagnostic report. Choose your framework and launch the example directly in StackBlitz.',
            languages
          }
        ]
      }
    ]);
  });

  describe('openStackBlitzExample', () => {
    it('should be a callable method', () => {
      expect(typeof component.openStackBlitzExample).toBe('function');
    });

    it('should reject with an error for an unknown language', async () => {
      await expectAsync(
        component.openStackBlitzExample('unknown', 'demo')
      ).toBeRejectedWithError('Unknown project: unknown/demo');
    });
  });
});
