import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GenerateOtp } from './models/generate-otp.model';
import { ApiServiceService } from '../shared/services/api-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})
export class OtpComponent {
  @Input() showOtpSection: boolean = false;
  @Output() docFormSubmitted = new EventEmitter<boolean>();
  otpForm: FormGroup;
  formSubmitted = false;

  constructor(private fb: FormBuilder, private apiService: ApiServiceService) {
    this.otpForm = this.fb.group({
      otp: ['', Validators.required],
    });
  }

  validateOtp(): void {
    debugger;
    const generateOtpData: GenerateOtp = {
      otp: this.otpForm.get('otp')?.value
    };
    console.log(generateOtpData.otp);

    this.apiService.verifyOtp(generateOtpData).subscribe(
      (isOtpValid) => {
        if (isOtpValid) {
          console.log('OTP verification successful');
          this.formSubmitted = true;
          // Emit an event to notify the parent component that docForm should be displayed
          this.docFormSubmitted.emit(true);
        } else {
          console.log('Invalid OTP');
        }
      },
      (error) => {
        console.error('Error in OTP verification:', error);
      }
    );
    this.formSubmitted = true;
  }
}
