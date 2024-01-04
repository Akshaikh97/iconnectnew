import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { LoginInterface } from '../../registration/models/login.model';
import { GenerateOtpInterface } from '../../registration/models/generate-otp.model';

@Injectable({
  providedIn: 'root'
})

export class ApiServiceService {
  private apiUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) {}

  registerAndGenerateOtp(user: LoginInterface): Observable<GenerateOtpInterface> {
    // Validate input
    if (!user || !user.id) {
      // Handle validation error as per your application's requirements
      console.error('Invalid user object');
      return throwError('Invalid user object');
    }

    const userId = user.id;

    return this.http.post<GenerateOtpInterface>(`${this.apiUrl}/Registration/GenerateOtp/${userId}`, {})
      .pipe(
        catchError((error) => {
          // Handle HTTP errors here
          console.error('HTTP error occurred:', error);
          return throwError('Something went wrong');
        })
      );
  }
}
