import { Component, provideZonelessChangeDetection, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DocumentationDialogComponent } from './documentation-dialog.component';

/**
 * Simple mock component to project via ngComponentOutlet
 */
@Component({
  standalone: true,
  template: `<p class="mock-doc">Mock Documentation Content</p>`
})
class MockDocComponent {}

/**
 * Mock MatDialogRef
 */
class MockDialogRef {
  close = jasmine.createSpy('close');
}

describe('Component: DocumentationDialog', () => {
  let fixture: ComponentFixture<DocumentationDialogComponent>;
  let component: DocumentationDialogComponent;
  let dialogRef: MockDialogRef;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentationDialogComponent, MockDocComponent],
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: MAT_DIALOG_DATA,
          useValue: MockDocComponent as Type<any>
        },
        {
          provide: MatDialogRef,
          useClass: MockDialogRef
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentationDialogComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(MatDialogRef) as unknown as MockDialogRef;

    fixture.detectChanges();
  });

  it('should receive injected component via MAT_DIALOG_DATA', () => {
    expect(component.component).toBe(MockDocComponent);
  });

  it('should render the projected documentation component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const content = compiled.querySelector('.mock-doc');

    expect(content).toBeTruthy();
    expect(content?.textContent).toContain('Mock Documentation Content');
  });

  it('should contain wrapper element', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const wrapper = compiled.querySelector('.documentation-dialog');

    expect(wrapper).toBeTruthy();
  });

  it('should render close button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button.close-button');

    expect(button).toBeTruthy();
  });

  it('should call dialogRef.close when close() is invoked', () => {
    component.close();
    expect(dialogRef.close).toHaveBeenCalledTimes(1);
  });

  it('should call dialogRef.close when close button is clicked', () => {
    const button = fixture.nativeElement.querySelector('button.close-button');
    button.click();

    expect(dialogRef.close).toHaveBeenCalledTimes(1);
  });
});
