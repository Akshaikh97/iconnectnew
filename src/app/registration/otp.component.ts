import { Component, Input } from '@angular/core';
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
  otpForm: FormGroup;

  constructor(private fb: FormBuilder,  private apiService: ApiServiceService) {
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
        } else {
          console.log('Invalid OTP');
        }
      },
      (error) => {
        console.error('Error in OTP verification:', error);
      }
    );
  }
}
