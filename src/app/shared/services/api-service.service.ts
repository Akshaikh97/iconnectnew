import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHandler } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Login } from '../../registration/models/login.model';
import { GenerateOtp } from '../../registration/models/generate-otp.model';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService extends HttpClient {
  private apiUrl = 'https://localhost:5001/api';

  constructor(handler: HttpHandler) {
    super(handler);
  }

  registerAndGenerateOtp(user: Login): Observable<Login> {
    return this.post<Login>(`${this.apiUrl}/registration/generate-otp`, user)
      .pipe(
        catchError((error) => this.handleError(error))
      );
  }

  verifyOtp(generateOtpData: GenerateOtp): Observable<GenerateOtp> {
    return this.post<GenerateOtp>(`${this.apiUrl}/registration/verify-otp`, generateOtpData)
      .pipe(
        catchError((error) => {
          console.error('Error in OTP verification:', error);
          return throwError('Error in OTP verification');
        })
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error in API request:', error);

    // Log the complete error response for further analysis
    if (error instanceof HttpErrorResponse) {
      console.error('Status:', error.status);
      console.error('Headers:', error.headers);
      console.error('Response:', error.error);
    }

    return throwError('Error in API request');
  }
}