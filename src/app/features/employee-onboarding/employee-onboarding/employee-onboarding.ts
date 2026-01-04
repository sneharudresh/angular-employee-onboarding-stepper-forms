import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../../core/services/employee.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-employee-onboarding',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule
  ],
  templateUrl: './employee-onboarding.html',
  styleUrl: './employee-onboarding.scss',
})
export class EmployeeOnboarding {

  private fb = inject(FormBuilder);
  private service = inject(EmployeeService);

  selectedFile!: File;
  isSubmitted = false; // ⭐ NEW FLAG

  personalForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]]
  });

  jobForm = this.fb.group({
    role: ['', Validators.required],
    experience: ['', Validators.required]
  });

  documentForm = this.fb.group({
    resume: this.fb.control<File | null>(null, Validators.required)
  });

  onFileSelect(event: any) {
    const file: File = event.target.files[0];
    if (!file) return;

    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (!allowedTypes.includes(file.type)) {
      alert('Only PDF or DOC files are allowed');
      event.target.value = '';
      return;
    }

    this.selectedFile = file;
    this.documentForm.patchValue({ resume: file });
    this.documentForm.markAsTouched();
  }

  submit() {
    if (
      this.personalForm.invalid ||
      this.jobForm.invalid ||
      this.documentForm.invalid
    ) {
      this.personalForm.markAllAsTouched();
      this.jobForm.markAllAsTouched();
      this.documentForm.markAllAsTouched();
      return;
    }

    const payload = {
      ...this.personalForm.value,
      ...this.jobForm.value,
      resume: this.selectedFile?.name
    };

    this.service.submitEmployee(payload).subscribe(() => {
      this.isSubmitted = true; // ⭐ SHOW SUCCESS SCREEN
    });
  }

  resetPortal() {
    this.isSubmitted = false;

    this.personalForm.reset();
    this.jobForm.reset();
    this.documentForm.reset();
    this.selectedFile = undefined!;
  }
}
