export class Registration {
    name: string = '';
    email: string = '';
    mobile: string = '';
    pan: string = '';
    password: string = '';
    confirmPassword: string = '';
    captcha: string = '';
  }
  
  export interface RegistrationInterface {
    name: string;
    email: string;
    mobile: string;
    pan: string;
    password: string;
    confirmPassword: string;
    captcha: string;
  }
  