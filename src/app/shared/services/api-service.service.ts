import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginInterface } from '../../registration/models/login.model';
import { GenerateOtpInterface } from '../../registration/models/generate-otp.model';

@Injectable({
  providedIn: 'root'
})

export class ApiServiceService {
  private apiUrl = 'your_api_base_url'; 
  constructor(private http: HttpClient) {}

  registerAndGenerateOtp(user: LoginInterface): Observable<GenerateOtpInterface> {
    return this.http.post<GenerateOtpInterface>(`${this.apiUrl}/register-and-generate-otp`, user);
  }
}
