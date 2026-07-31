import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { sduxTestingModule } from '../../../../../libs/ui/web-components/src/public-api';
import { StackBlitzOverviewComponent } from './stackblitz.component';

describe('Component: StackBlitz Overview', () => {
  let component: StackBlitzOverviewComponent;
  let fixture: ComponentFixture<StackBlitzOverviewComponent>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    await TestBed.configureTestingModule({
      imports: [
        sduxTestingModule,
        CommonModule,
        RouterModule.forRoot([]),
        StackBlitzOverviewComponent
      ],
      providers: [{ provide: MatSnackBar, useValue: snackBarSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(StackBlitzOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should define examples', () => {
    const groups = component.exampleGroups;
    expect(groups.length).toBeGreaterThanOrEqual(3);

    const gettingStarted = groups.find((g) => g.id === 'getting-started');
    const intermediate = groups.find((g) => g.id === 'intermediate');
    const advanced = groups.find((g) => g.id === 'advanced');

    expect(gettingStarted).toBeDefined();
    expect(intermediate).toBeDefined();
    expect(advanced).toBeDefined();

    const requiredGettingStarted = ['replace-state'];
    const actualGettingStartedIds = gettingStarted!.examples.map(
      (e: { id: string }) => e.id
    );
    requiredGettingStarted.forEach((id) =>
      expect(actualGettingStartedIds).toContain(id)
    );

    const requiredIntermediate = ['basic-filter-reducer', 'interceptor-delay'];
    const actualIntermediateIds = intermediate!.examples.map(
      (e: { id: string }) => e.id
    );
    requiredIntermediate.forEach((id) =>
      expect(actualIntermediateIds).toContain(id)
    );

    const requiredAdvanced = ['debugger', 'tab-sync'];
    const actualAdvancedIds = advanced!.examples.map(
      (e: { id: string }) => e.id
    );
    requiredAdvanced.forEach((id) => expect(actualAdvancedIds).toContain(id));
  });

  it('should expose languageSections', () => {
    expect(component.languageSections.length).toBeGreaterThanOrEqual(1);
    const bun = component.languageSections.find((s) => s.id === 'bun');
    expect(bun).toBeDefined();
    expect(bun!.examples.length).toBeGreaterThanOrEqual(1);
  });

  describe('frameworkIcons', () => {
    it('should have icons for all frameworks', () => {
      const icons = component.frameworkIcons;
      expect(icons['angular']).toBeDefined();
      expect(icons['react']).toBeDefined();
      expect(icons['svelte']).toBeDefined();
      expect(icons['vue']).toBeDefined();
    });

    it('should contain correct icon paths', () => {
      expect(component.frameworkIcons['angular']).toContain('angular');
      expect(component.frameworkIcons['react']).toContain('react');
      expect(component.frameworkIcons['svelte']).toContain('svelte');
      expect(component.frameworkIcons['vue']).toContain('vue');
    });
  });

  describe('exampleGroups property', () => {
    it('should have four groups: Getting Started, Core Patterns, Intermediate, Advanced', () => {
      expect(component.exampleGroups.length).toBe(5);
      expect(component.exampleGroups[0].id).toBe('getting-started');
      expect(component.exampleGroups[1].id).toBe('core-patterns');
      expect(component.exampleGroups[2].id).toBe('intermediate');
      expect(component.exampleGroups[3].id).toBe('advanced');
      expect(component.exampleGroups[4].id).toBe('tutorial');
    });

    it('should have correct number of examples per group', () => {
      expect(component.exampleGroups[0].examples.length).toBeGreaterThanOrEqual(
        1
      );
      expect(component.exampleGroups[1].examples.length).toBeGreaterThanOrEqual(
        3
      );
      expect(component.exampleGroups[2].examples.length).toBeGreaterThanOrEqual(
        2
      );
      expect(component.exampleGroups[3].examples.length).toBeGreaterThanOrEqual(
        2
      );
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
