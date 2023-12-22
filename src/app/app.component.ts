import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  isSidenavFadedOut = false;

  constructor(private renderer: Renderer2,
    private el: ElementRef
  ) { }

  ngOnInit(): void {
  }
}
