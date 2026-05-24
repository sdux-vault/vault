import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { InfoDialogComponent } from './info-dialog.component';

describe('Component: InfoDialog', () => {
  let fixture: ComponentFixture<InfoDialogComponent>;
  let component: InfoDialogComponent;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<InfoDialogComponent>>;

  const mockData = {
    id: 1,
    name: 'Ada Lovelace',
    role: 'Mathematician',
    description: 'First computer programmer'
  };

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef<InfoDialogComponent>', [
      'close'
    ]);

    await TestBed.configureTestingModule({
      imports: [InfoDialogComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: MAT_DIALOG_DATA, useValue: mockData },
        { provide: MatDialogRef, useValue: dialogRefSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the provided name in the dialog title', () => {
    const titleEl = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(titleEl.textContent).toContain('Ada Lovelace');
  });

  it('should render the ID and JSON-like key/value pairs for the data', () => {
    const idParagraph = fixture.debugElement.query(
      By.css('mat-dialog-content p')
    ).nativeElement;
    expect(idParagraph.textContent).toContain('ID: 1');

    const preEl = fixture.debugElement.query(By.css('pre.data-json'))
      .nativeElement as HTMLElement;
    const text = preEl.textContent!.replace(/\s+/g, ' ');
    expect(text).toContain('"id": 1');
    expect(text).toContain('"name": "Ada Lovelace"');
    expect(text).toContain('"role": "Mathematician"');
    expect(text).toContain('"description": "First computer programmer"');
  });

  it('should close the dialog when close() is called', () => {
    component.close();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should close the dialog when the "Close" button is clicked', () => {
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
    expect(dialogRefSpy.close).toHaveBeenCalledTimes(1);
  });
});
