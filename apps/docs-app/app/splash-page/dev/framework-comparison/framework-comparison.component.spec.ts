import { ComponentFixture, TestBed } from '@angular/core/testing';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { FrameworkComparisonComponent } from './framework-comparison.component';
import { FrameworkComparisonPair } from './framework-comparison.types';

describe('Component: FrameworkComparisonComponent', () => {
  let fixture: ComponentFixture<FrameworkComparisonComponent>;

  const comparison: FrameworkComparisonPair = {
    id: 'angular',
    selectorLabel: 'Angular',
    sharedSetupFileNames: ['main.ts', 'app.config.ts'],
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

  const reactComparison: FrameworkComparisonPair = {
    id: 'react',
    selectorLabel: 'React',
    sharedSetupFileNames: ['main.tsx'],
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
});
