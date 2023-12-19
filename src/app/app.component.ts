import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedServiceType: string = ''; // Add this property to track the selected service type

  confirmTrack() {
    // Implement your logic for confirmTrack
    throw new Error('Method not implemented.');
  }

  verifyCaptcha() {
    // Implement your logic for verifyCaptcha
    throw new Error('Method not implemented.');
  }

  title = 'client';
}
