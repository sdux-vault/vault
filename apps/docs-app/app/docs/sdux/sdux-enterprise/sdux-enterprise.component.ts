import { Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  VaultBrandNameComponent
} from '@sdux-vault/ui/web-components';
import { PipelineRoutingDirective } from 'apps/docs-app/app/docs/pipeline/directives/pipeline-routing.directive';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';
import { EnterpriseContactService } from './service/enterprise-contact.service';
import { EnterpriseContactShape } from './shape/enterprise-contact.shape';

/**
 * The sdux-enterprise documentation
 */
@Component({
  selector: 'sdux-enterprise-overview',
  standalone: true,
  imports: [
    PipelineRelatedTopicComponent,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    RouterModule,
    VaultBrandNameComponent,
    BrandNameComponent
  ],
  templateUrl: './sdux-enterprise.component.html',
  styleUrls: ['../../scss/documentation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SDuXEnterpriseOverviewComponent extends PipelineRoutingDirective {
  #fb = inject(FormBuilder);
  #contactService = inject(EnterpriseContactService);

  readonly submitted = signal(false);
  readonly submitError = signal<string | null>(null);

  readonly contactForm = this.#fb.nonNullable.group({
    firstName: ['', [Validators.required, Validators.maxLength(100)]],
    lastName: ['', [Validators.required, Validators.maxLength(100)]],
    email: [
      '',
      [Validators.required, Validators.email, Validators.maxLength(255)]
    ],
    company: ['', [Validators.required, Validators.maxLength(200)]],
    jobTitle: ['', [Validators.maxLength(150)]],
    teamSize: [''],
    message: ['', [Validators.required, Validators.maxLength(2000)]]
  });

  readonly formStatus = toSignal(this.contactForm.statusChanges, {
    initialValue: this.contactForm.status
  });

  submitContact(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    const payload: EnterpriseContactShape = this.contactForm.getRawValue();

    this.submitError.set(null);

    this.#contactService.submitContact(payload).subscribe({
      next: () => {
        this.submitted.set(true);
      },
      error: () => {
        this.submitError.set(
          'Unable to submit your inquiry. Please try again.'
        );
      }
    });
  }
}
