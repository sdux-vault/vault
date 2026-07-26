import { ComponentFixture, TestBed } from '@angular/core/testing';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { FrameworkComparisonPairShape } from '../shapes/framework-comparison-pair.shape';
import { FrameworkComparisonComponent } from './framework-comparison.component';

describe('Component: FrameworkComparisonComponent', () => {
  let fixture: ComponentFixture<FrameworkComparisonComponent>;

  const comparison: FrameworkComparisonPairShape = {
    id: 'angular',
    selectorLabel: 'Angular',
    sharedSetupFileNames: ['main.ts', 'app.config.ts'],
    displayCeremony: true,
    left: {
      frameworkLabel: 'Angular',
      libraryLabel: 'Redux',
      files: [
        {
          type: 'typescript',
          fileName: 'main.ts',
          source: 'angular-main',
          numberedSource: '1 | angular-main'
        },
        {
          type: 'typescript',
          fileName: 'app.config.ts',
          source: 'config',
          numberedSource: '1 | config'
        },
        {
          type: 'typescript',
          fileName: 'employee.facade.ts',
          source: 'facade',
          numberedSource: '1 | facade'
        }
      ]
    },
    right: {
      frameworkLabel: 'Angular',
      libraryLabel: 'SDuX',
      usesSduxBrandName: true,
      files: [
        {
          type: 'typescript',
          fileName: 'main.ts',
          source: 'angular-main',
          numberedSource: '1 | angular-main'
        },
        {
          type: 'typescript',
          fileName: 'app.config.ts',
          source: 'config',
          numberedSource: '1 | config'
        }
      ]
    }
  };

  const reactComparison: FrameworkComparisonPairShape = {
    id: 'react',
    selectorLabel: 'React',
    sharedSetupFileNames: ['main.tsx'],
    displayCeremony: true,
    left: {
      frameworkLabel: 'React',
      libraryLabel: 'Redux',
      files: [
        {
          type: 'typescript',
          fileName: 'main.tsx',
          source: 'react-main',
          numberedSource: '1 | react-main'
        },
        {
          type: 'typescript',
          fileName: 'useEmployeeFacade.ts',
          source: 'hook',
          numberedSource: '1 | hook'
        }
      ]
    },
    right: {
      frameworkLabel: 'React',
      libraryLabel: 'SDuX',
      usesSduxBrandName: true,
      files: [
        {
          type: 'typescript',
          fileName: 'main.tsx',
          source: 'react-main',
          numberedSource: '1 | react-main'
        },
        {
          type: 'typescript',
          fileName: 'employee.cell.ts',
          source: 'cell',
          numberedSource: '1 | cell'
        }
      ]
    }
  };

  const noBrandComparison: FrameworkComparisonPairShape = {
    id: 'vue',
    selectorLabel: 'Vue',
    displayCeremony: true,
    left: {
      frameworkLabel: 'Vue',
      libraryLabel: 'Pinia',
      files: [
        {
          type: 'typescript',
          fileName: 'main.ts',
          source: 'vue-main',
          numberedSource: '1 | vue-main'
        }
      ]
    },
    right: {
      frameworkLabel: 'Vue',
      libraryLabel: 'Pinia',
      files: [
        {
          type: 'vue',
          fileName: 'App.vue',
          source: '<template />',
          numberedSource: '1 | <template />'
        },
        {
          type: 'typescript',
          fileName: 'main.ts',
          source: 'vue-main',
          numberedSource: '1 | vue-main'
        }
      ]
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrameworkComparisonComponent, sduxTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(FrameworkComparisonComponent);
    fixture.componentRef.setInput('comparison', comparison);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render one comparison row per aligned file slot', () => {
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelectorAll('.comparison-row-grid').length).toBe(3);
    expect(element.querySelectorAll('.comparison-file-empty').length).toBe(1);
  });

  it('should render derived file counts and ceremony copy', () => {
    const element = fixture.nativeElement as HTMLElement;
    const countBadges = Array.from(
      element.querySelectorAll('.comparison-panel-count')
    ).map((node) => node.textContent?.trim());
    const notes = element.textContent ?? '';

    expect(countBadges).toEqual(['3 files', '2 files']);
    expect(notes).toContain('2 shared setup files');
    expect(notes).toContain('0 core feature files');
    expect(notes).toContain('1 extra Redux-only ceremony files');
    expect(notes).toContain('no extra ceremony files');
  });

  it('should update the rendered files when the comparison input changes', () => {
    fixture.componentRef.setInput('comparison', reactComparison);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;

    const fileNames = Array.from(
      element.querySelectorAll<HTMLElement>('.comparison-file-name')
    ).map((node) => node.textContent?.trim() ?? '');

    expect(fileNames).toContain('main.tsx');
    expect(fileNames).toContain('useEmployeeFacade.ts');
    expect(fileNames).toContain('employee.cell.ts');
    expect(fileNames).not.toContain('employee.facade.ts');

    const codeBlocks = Array.from(
      element.querySelectorAll<HTMLElement>('.comparison-file-source code')
    ).map((node) => node.textContent?.trim() ?? '');

    expect(codeBlocks).toContain('1 | react-main');
    expect(codeBlocks).not.toContain('1 | angular-main');
  });

  it('should use comparison-specific shared setup file names', () => {
    fixture.componentRef.setInput('comparison', reactComparison);
    fixture.detectChanges();

    const notes = fixture.nativeElement.textContent ?? '';

    expect(notes).toContain('1 shared setup files');
    expect(notes).toContain('1 core feature files');
  });

  it('should map html, svelte, and vue sources to Prism markup language', () => {
    const component = fixture.componentInstance as any;

    expect(component.getCodeLanguage('html')).toBe('language-markup');
    expect(component.getCodeLanguage('svelte')).toBe('language-markup');
    expect(component.getCodeLanguage('vue')).toBe('language-markup');
  });

  it('should render the right library label when sdux branding is disabled', () => {
    fixture.componentRef.setInput('comparison', noBrandComparison);
    fixture.detectChanges();

    const titles = Array.from<HTMLElement>(
      fixture.nativeElement.querySelectorAll('.comparison-panel-title')
    ).map((node) => node.textContent?.replace(/\s+/g, ' ').trim() ?? '');

    expect(titles).toContain('Pinia + Vue');
  });

  it('should fall back to default shared setup file names when none are provided', () => {
    fixture.componentRef.setInput('comparison', noBrandComparison);
    fixture.detectChanges();

    const notes = fixture.nativeElement.textContent ?? '';

    expect(notes).toContain('1 shared setup files');
    expect(notes).toContain('1 core feature files');
  });
});
