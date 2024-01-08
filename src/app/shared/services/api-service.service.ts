import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Login } from '../../registration/models/login.model';
// import { GenerateOtpInterface } from '../../registration/models/generate-otp.model';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService extends HttpClient {
  private apiUrl = 'https://localhost:5001/api';

  constructor(handler: HttpHandler) {
    super(handler);
  }

  registerAndGenerateOtp(user: Login): Observable<Login> {
    return this.post<Login>(this.apiUrl + `/registration/generate-otp`, user)
      .pipe(
        catchError((error) => {
          const errorMessage = 'Error in API request';
          console.error(errorMessage, error);
          return throwError(errorMessage);
        })
      );
  }
}