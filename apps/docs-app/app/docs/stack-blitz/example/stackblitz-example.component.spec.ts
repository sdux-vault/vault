import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  AnalyticsService,
  sduxTestingModule
} from '@sdux-vault/ui/web-components';
import { StackblitzExampleService } from '../services/stackblitz-example.service';
import type { StackBlitzExampleShape } from '../shapes/stackblitz-example.shape';
import { StackBlitzExampleComponent } from './stackblitz-example.component';

describe('Component: StackBlitz Example', () => {
  let component: StackBlitzExampleComponent;
  let fixture: ComponentFixture<StackBlitzExampleComponent>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;
  let analyticsSpy: jasmine.SpyObj<AnalyticsService>;
  let serviceSpy: StackblitzExampleService;

  const example: StackBlitzExampleShape = {
    title: 'Replace State',
    id: 'replace-state',
    exampleName: 'replace-example',
    description: 'Replaces the complete FeatureCell state.',
    languages: [{ name: 'Angular', key: 'angular' }]
  };

  beforeEach(async () => {
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    analyticsSpy = jasmine.createSpyObj('AnalyticsService', [
      'trackStackblitzInteraction'
    ]);

    await TestBed.configureTestingModule({
      imports: [sduxTestingModule, StackBlitzExampleComponent],
      providers: [
        { provide: MatSnackBar, useValue: snackBarSpy },
        { provide: AnalyticsService, useValue: analyticsSpy }
      ]
    }).compileComponents();

    serviceSpy = TestBed.inject(StackblitzExampleService);
    spyOn(serviceSpy, 'launchStackblitzExample').and.resolveTo();

    fixture = TestBed.createComponent(StackBlitzExampleComponent);
    fixture.componentRef.setInput('example', example);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the description and framework controls', () => {
    const element = fixture.nativeElement as HTMLElement;

    expect(element.textContent).toContain(example.description);
    expect(element.querySelector('.framework-icon-button')).not.toBeNull();
    expect(element.querySelector('.share-link-button')).not.toBeNull();
    expect(
      element.querySelector('[role="group"]')?.getAttribute('aria-label')
    ).toBe('Replace State framework options');
  });

  it('should resolve and render an example by ID', () => {
    const idFixture = TestBed.createComponent(StackBlitzExampleComponent);
    idFixture.componentRef.setInput('id', 'hydrate-state');
    idFixture.detectChanges();

    const resolved = idFixture.componentInstance.resolvedExample();
    expect(resolved?.exampleName).toBe('hydrate-state-example');
    expect(idFixture.nativeElement.textContent).toContain(
      'deferred factory that supplies the authoritative initial FeatureCell value'
    );
  });

  it('should prefer a directly supplied example when an ID is also provided', () => {
    fixture.componentRef.setInput('id', 'hydrate-state');
    fixture.detectChanges();

    expect(component.resolvedExample()).toBe(example);
    expect(fixture.nativeElement.textContent).toContain(example.description);
  });

  it('should render nothing when neither input is supplied', () => {
    const emptyFixture = TestBed.createComponent(StackBlitzExampleComponent);
    emptyFixture.detectChanges();

    expect(emptyFixture.componentInstance.resolvedExample()).toBeUndefined();
    expect((emptyFixture.nativeElement as HTMLElement).children.length).toBe(0);
  });

  it('should render nothing when the requested ID is unknown', () => {
    const missingFixture = TestBed.createComponent(StackBlitzExampleComponent);
    missingFixture.componentRef.setInput('id', 'missing-example');
    missingFixture.detectChanges();

    expect(missingFixture.componentInstance.resolvedExample()).toBeUndefined();
    expect((missingFixture.nativeElement as HTMLElement).children.length).toBe(
      0
    );
  });

  it('should render local-only options without launch or share buttons', () => {
    fixture.componentRef.setInput('example', {
      ...example,
      localOnly: true,
      notice: '<p>Run this example locally.</p>'
    });
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('button')).toBeNull();
    expect(element.textContent).toContain('StackBlitz Limitation');
    expect(element.textContent).toContain('Run this example locally.');
  });
});
