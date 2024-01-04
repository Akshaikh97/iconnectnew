import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { RegistrationInterface } from './models/registration.model';
import { LoginInterface } from './models/login.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit, AfterViewInit {
  registrationData: RegistrationInterface = {
    name: '',
    email: '',
    mobile: '',
    pan: '',
    password: '',
    confirmPassword: '',
    captcha: ''
  };

  registrationForm!: FormGroup;

  @ViewChild('captchaCanvas', { static: false }) captchaCanvas!: ElementRef<HTMLCanvasElement>;
  apiService: any;
  users: any;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.maxLength(10), this.onlyNumbers()]],
      pan: ['', [Validators.required, Validators.pattern(/[A-Z]{5}\d{4}[A-Z]{1}/)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      captcha: ['', Validators.required],
    }, { validators: this.passwordMismatchValidator });
    this.generateCaptcha();
  }

  ngAfterViewInit(): void {
    this.drawCaptcha();
  }

  get captchaControl(): FormControl {
    return this.registrationForm.get('captcha') as FormControl;
  }

  generateCaptcha(): void {
    this.registrationData.captcha = this.generateRandomString(6);
  }

  generateRandomString(length: number): string {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      result += charset[randomIndex];
    }
    return result;
  }

  refreshCaptcha(): void {
    this.generateCaptcha();
    this.drawCaptcha();
  }
  
  private isValidResponse(response: unknown): boolean {
    // Check if the response is not null or undefined
    if (response === null || response === undefined) {
      console.error('Invalid response: Response is null or undefined.');
      return false;
    }
  
    const responseIsValid: boolean = (response as any).status === 'success';
    if (responseIsValid) {
      return true;
    } else {
      console.error('Invalid response: Custom validation condition not met.');
      return false;
    }
  }
  
  register(): void {
    if (this.registrationData.captcha.toUpperCase() === this.registrationForm.get('captcha')?.value.toUpperCase()) {
      const user: LoginInterface = {
        name: this.registrationData.name,
        email: this.registrationData.email,
        mobile: this.registrationData.mobile,
        pan: this.registrationData.pan,
        password: this.registrationData.password
      };
  
      this.apiService.registerAndGenerateOtp(user).subscribe(
        (response: unknown) => {
          if (this.isValidResponse(response)) {
            console.log('User registered successfully:', response);
            // Assign the response to 'users' if needed
            this.users = response;
          } else {
            console.error('Invalid response:', response);
          }
        },
        (error: unknown) => {
          console.error('Registration failed:', error);
        },
        () => {
          console.log('Request has completed');
        }
      );
    } else {
      console.log('Invalid captcha. Registration failed.');
    }
  }

  drawCaptcha(): void {
    const canvas = this.captchaCanvas?.nativeElement;

    if (!canvas) {
      console.error('Canvas not found');
      return;
    }

    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error('Canvas context not available');
      return;
    }

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the new captcha
    ctx.font = '20px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.registrationData.captcha, canvas.width / 2, canvas.height / 2);
  }

  onlyNumbers(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;

      if (!value) {
        return null; // If no value is entered, validation passes
      }

      const valid = /^\d+$/.test(value); // Check if the value contains only numbers

      return valid ? null : { 'onlyNumbers': true };
    };
  }

  onPanBlur(): void {
    const panControl = this.registrationForm.get('pan');
    if (panControl) {
      panControl.setValue(panControl.value.toUpperCase());
    }
  }

  passwordMismatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { 'passwordMismatch': true };
  }
}
