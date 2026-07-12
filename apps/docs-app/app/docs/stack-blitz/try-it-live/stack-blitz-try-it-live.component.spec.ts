import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { sduxTestingModule } from '../../../../../../libs/ui/web-components/src/public-api';
import { StackBlitzTryItLiveComponent } from './stack-blitz-try-it-live.component';

describe('Component: StackBlitz Try It Live', () => {
  let fixture: ComponentFixture<StackBlitzTryItLiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        sduxTestingModule,
        RouterModule.forRoot([]),
        StackBlitzTryItLiveComponent
      ],
      providers: [
        {
          provide: MatSnackBar,
          useValue: jasmine.createSpyObj('MatSnackBar', ['open'])
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StackBlitzTryItLiveComponent);
    fixture.componentRef.setInput('id', 'replace-state');
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the resolved example followed by the additional examples link', () => {
    const element = fixture.nativeElement as HTMLElement;
    const sectionBodies = element.querySelectorAll('.section-body');

    expect(sectionBodies.length).toBe(2);
    expect(sectionBodies[0].textContent).toContain('Demonstrates replaceState');
    expect(sectionBodies[1].textContent).toContain(
      'View additional StackBlitz examples'
    );
  });

  it('should link to the StackBlitz examples page', () => {
    const link = (fixture.nativeElement as HTMLElement).querySelector('a');

    expect(link?.getAttribute('href')).toBe('/docs/stackblitz');
  });

  it('should update the rendered example while preserving the page link', () => {
    fixture.componentRef.setInput('id', 'hydrate-state');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('a')?.getAttribute('href')).toBe(
      '/docs/stackblitz'
    );
    expect(element.textContent).toContain(
      'deferred factory that supplies the authoritative initial FeatureCell value'
    );
  });
});
