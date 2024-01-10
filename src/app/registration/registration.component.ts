import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { Login } from './models/login.model';
import { GenerateOtp } from './models/generate-otp.model';
import { ApiServiceService } from '../shared/services/api-service.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit, AfterViewInit {
  registrationData: Login = {
    name: '',
    email: '',
    mobile: '',
    pan: '',
    password: '',
    confirmPassword: '',
    captcha: ''
  };

  generateOtpData: GenerateOtp = {
    otp: undefined,
  };

  registrationForm!: FormGroup;
  users: any;
  formSubmitted = false;
  showOtpSection = false;

  otpForm: FormGroup = this.fb.group({
    otp: ['', Validators.required],
  });

  @ViewChild('captchaCanvas', { static: false }) captchaCanvas!: ElementRef<HTMLCanvasElement>;

  constructor(private fb: FormBuilder, private apiService: ApiServiceService) { } // Inject ApiServiceService

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

    this.otpForm = this.fb.group({
      otp: ['', Validators.required],
    });
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
    return true;
  }

  register(): void {
    console.log('Registration Form Data:', this.registrationForm.value);
    console.log('Before Update - Registration Data:', this.registrationData);
    debugger;

    if (this.registrationData.captcha.toUpperCase() === this.registrationForm.get('captcha')?.value.toUpperCase()) {
      // Update this.registrationData with form values
      this.registrationData.name = this.registrationForm.get('name')?.value || '';
      this.registrationData.email = this.registrationForm.get('email')?.value || '';
      this.registrationData.mobile = this.registrationForm.get('mobile')?.value || '';
      this.registrationData.pan = this.registrationForm.get('pan')?.value || '';
      this.registrationData.password = this.registrationForm.get('password')?.value || '';
      this.registrationData.confirmPassword = this.registrationForm.get('confirmPassword')?.value || '';

      // Create the user object
      const user: Login = {
        name: this.registrationData.name,
        email: this.registrationData.email,
        mobile: this.registrationData.mobile,
        pan: this.registrationData.pan,
        password: this.registrationData.password,
        confirmPassword: this.registrationData.confirmPassword,
        captcha: this.registrationData.captcha
      };

      console.log('After Update - Registration Data:', this.registrationData);

      this.apiService.registerAndGenerateOtp(user).subscribe(
        (response) => {
          console.log('Registration successful:', response);
          this.showOtpSection = true;
        },
        (error) => {
          console.error('Error in API request:', error);
          // Log the complete error response for further analysis
          if (error instanceof HttpErrorResponse) {
            console.error('Status:', error.status);
            console.error('Headers:', error.headers);
            console.error('Response:', error.error);

            // You might also want to handle specific error cases or show a user-friendly message
            if (error.status === 400) {
              console.log('Bad Request. Please check your form data.');
            } else if (error.status === 401) {
              console.log('Unauthorized. Please check your credentials.');
            } else {
              console.log('An unexpected error occurred. Please try again later.');
            }
          }
        }
      );
    } else {
      console.log('Invalid captcha. Registration failed.');
    }
    this.formSubmitted = true;
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

  // validateOtp(): void {
  //   debugger;
  //   const generateOtpData: GenerateOtp = {
  //     otp: this.otpForm.get('otp')?.value
  //   };

  //   console.log(generateOtpData.otp);

  //   this.apiService.verifyOtp(generateOtpData).subscribe(
  //     (isOtpValid) => {
  //       if (isOtpValid) {
  //         console.log('OTP verification successful');
  //       } else {
  //         console.log('Invalid OTP');
  //       }
  //     },
  //     (error) => {
  //       console.error('Error in OTP verification:', error);
  //     }
  //   );
  // }
}
