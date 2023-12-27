import { Component, AfterViewInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements AfterViewInit {
  name: string = '';
  email: string = '';
  mobile: string = '';
  pan: string = '';
  password: string = '';
  confirmPassword: string = '';
  captcha: string = '';
  userEnteredCaptcha: string = '';
  registrationForm: FormGroup;

  @ViewChild('captchaCanvas', { static: false }) captchaCanvas!: ElementRef<HTMLCanvasElement>;

  constructor(private fb: FormBuilder, private renderer: Renderer2) {
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
    this.captcha = this.generateRandomString(6);
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
    this.userEnteredCaptcha = '';
    this.drawCaptcha();
  }

  upper(value: string): void {
    // Your implementation here
  }

  register(): void {
    if (this.userEnteredCaptcha.toUpperCase() === this.captcha.toUpperCase()) {
      console.log('Captcha matched. Proceed with registration.');
    } else {
      console.log('Invalid captcha. Registration failed.');
    }
  }

  drawCaptcha(): void {
    const canvas = this.captchaCanvas.nativeElement;
    const ctx = canvas.getContext('2d');

    console.log(canvas); // Check if the canvas is found
    console.log(ctx);    // Check if the context is available
    
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = '20px Arial';
      ctx.fillStyle = 'black';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(this.captcha, canvas.width / 2, canvas.height / 2);
    } else {
      console.error('Canvas context not available');
    }
  }
}
