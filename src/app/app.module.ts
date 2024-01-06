// app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ServicerequestComponent } from './servicerequest/servicerequest.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { AddCompanyComponent } from './add-company/add-company.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

@NgModule({
  declarations: [
    AppComponent,
    ServicerequestComponent,
    SidenavComponent,
    AddCompanyComponent,
    DashboardComponent,
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule, // Include ReactiveFormsModule
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    SharedModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
