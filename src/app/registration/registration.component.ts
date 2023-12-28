import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RegistrationInterface } from './models/registration.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements AfterViewInit {
  registrationData: RegistrationInterface = {
    name: '',
    email: '',
    mobile: '',
    pan: '',
    password: '',
    confirmPassword: '',
    captcha: ''
  };

  registrationForm: FormGroup;

  @ViewChild('captchaCanvas', { static: false }) captchaCanvas!: ElementRef<HTMLCanvasElement>;

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

  register(): void {
    if (this.registrationData.captcha.toUpperCase() === this.registrationForm.get('captcha')?.value.toUpperCase()) {
      console.log('Captcha matched. Proceed with registration.');
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
}
