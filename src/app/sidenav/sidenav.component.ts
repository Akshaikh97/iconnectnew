import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements AfterViewInit {
  isToggled: boolean = false;

  @ViewChild('ddlCompany') ddlCompany!: NgModel;
  @ViewChild('ddServicerequest1') ddServicerequest1!: NgModel;

  ngAfterViewInit() {
    this.initializeSelect2();
  }

  toggleSidebar(event: Event) {
    event.preventDefault(); 
    this.isToggled = !this.isToggled;
  }

  private initializeSelect2() {
    if (this.ddlCompany) {
    }
    if (this.ddServicerequest1) {
    }
  }
}
