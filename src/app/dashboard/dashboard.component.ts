import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicerequestComponent } from '../servicerequest/servicerequest.component';

const routes: Routes = [
  { path: 'servicerequest', component: ServicerequestComponent },
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'] 
})
export class DashboardComponent {

}
