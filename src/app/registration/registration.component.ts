// registration.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  name: string = '';
  email: string = '';
  mobile: string = '';
  pan: string = '';
  password: string = '';
  confirmPassword: string = '';
  captcha: string = '';

  registrationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.maxLength(10)]],
      pan: ['', [Validators.required, Validators.pattern(/[A-Z]{5}\d{4}[A-Z]{1}/)]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      captcha: ['', Validators.required],
    });
  }

  upper(value: string): void {
    // Your implementation here
  }

  register(): void {
    // Your registration logic here
    // Access form values using this.registrationForm.value
  }
}
