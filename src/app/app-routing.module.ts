import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCompanyComponent } from './add-company/add-company.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ServicerequestComponent } from './servicerequest/servicerequest.component';

const routes: Routes = [
  { path: "addCompany", component: AddCompanyComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: 'servicerequest', component: ServicerequestComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
