import { ComponentFixture, TestBed } from '@angular/core/testing';
import { sduxTestingModule } from '../../testing-module/sdux.testing.module';
import { CatchPhraseComponent } from './catch-phrase.component';

describe('Component: CatchPhrase', () => {
  let fixture: ComponentFixture<CatchPhraseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatchPhraseComponent, sduxTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CatchPhraseComponent);
    fixture.detectChanges();
  });

  it('should render the injected catch phrase', () => {
    const span = fixture.nativeElement.querySelector('.catch-phrase');
    expect(span.textContent).toContain('Mock CP');
  });

  it('should render trademark by default', () => {
    const sup = fixture.nativeElement.querySelector('.trademark');

    expect(sup).toBeNull();

    const span = fixture.nativeElement.querySelector('.catch-phrase');
    expect(span.textContent.replace(/\s+/g, '')).toBe('MockCP');
  });

  it('should not render trademark when trademark input is false', () => {
    fixture.componentRef.setInput('tm', false);
    fixture.detectChanges();

    const sup = fixture.nativeElement.querySelector('.trademark');
    expect(sup).toBeNull();

    const span = fixture.nativeElement.querySelector('.catch-phrase');
    expect(span.textContent.trim()).toBe('Mock CP');
  });

  it('should render trademark when trademark input is set to true explicitly', () => {
    fixture.componentRef.setInput('tm', true);
    fixture.detectChanges();

    const sup = fixture.nativeElement.querySelector('.trademark');
    expect(sup).toBeTruthy();
    expect(sup.textContent).toBe('™');

    const span = fixture.nativeElement.querySelector('.catch-phrase');
    expect(span.textContent.replace(/\s+/g, '')).toBe('MockCP™');
  });
});
