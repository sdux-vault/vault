import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ContactInquiryService } from './service/contact-inquiry.service';

@Component({
  selector: 'sdux-contact-template-page',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './contact-template.component.html',
  styleUrls: ['../../../scss/example.scss', './contact-template.component.scss']
})
export class ContactTemplateComponent {
  #contactService = inject(ContactInquiryService);

  protected submitted = false;
  protected submitError = false;
  readonly #formBuilder: FormBuilder = inject(FormBuilder);

  protected readonly contactForm;

  public constructor() {
    this.contactForm = this.#formBuilder.nonNullable.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(200)
        ]
      ],
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(255)]
      ],
      message: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10000)
        ]
      ]
    });
  }

  protected onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.submitError = false;

    this.#contactService
      .submitContact({
        source: 'sdux-vault',
        name: this.contactForm.value.name!,
        email: this.contactForm.value.email!,
        message: this.contactForm.value.message!
      })
      .subscribe({
        next: () => {
          this.submitted = true;
          this.contactForm.reset();
        },
        error: () => {
          this.submitError = true;
        }
      });
  }
}
