import { Component } from '@angular/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = "";
  password: string = "";
  captcha: string = "";
  rememberMe!: boolean;

  constructor() {}

  login() {
    // Handle login logic here
  }
}
