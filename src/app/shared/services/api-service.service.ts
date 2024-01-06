import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Login } from '../../registration/models/login.model';
import { GenerateOtpInterface } from '../../registration/models/generate-otp.model';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService  extends HttpClient {
  private apiUrl = 'https://localhost:5001/api';

  constructor(handler: HttpHandler) {
    super(handler);
  }

  registerAndGenerateOtp(user: Login): Observable<GenerateOtpInterface> {
    console.log('User in registerAndGenerateOtp:', user); 
    debugger;
    if (!user || !user.id) {
      const errorMessage = 'Invalid user object';
      console.error(errorMessage);
      return throwError(errorMessage);
    }
    const userId = user.id;

    return this.post<GenerateOtpInterface>(`${this.apiUrl}/registration/generate-otp/${userId}`, {})
      .pipe(
        catchError((error) => {
          const errorMessage = 'Error in API request';
          console.error(errorMessage, error);
          return throwError(errorMessage);
        })
      );
  }
}