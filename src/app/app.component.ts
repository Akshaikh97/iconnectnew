import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { SidenavStateService } from './shared/services/sidenav-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  isSidenavFadedOut = false;

  constructor(private renderer: Renderer2,
    private el: ElementRef,
    private sidenavStateService: SidenavStateService
  ) { }

  ngOnInit(): void {
    this.handleWindowLoad();

    // Subscribe to the sidenav state observable
    this.sidenavStateService.isSidenavFadedOut$.subscribe((fadedOut) => {
      this.isSidenavFadedOut = fadedOut;
    });
  }

  handleWindowLoad(): void {
    const preloader = this.el.nativeElement.querySelector('.preloader') as HTMLElement;

    // Hide preloader
    if (preloader) {
      this.renderer.setStyle(preloader, 'display', 'none');

      // Additional setTimeout logic (if needed)
      setTimeout(() => {
        this.renderer.setStyle(preloader, 'display', 'none');
      }, 1500);
    } else {
      console.error('Preloader element not found');
    }
  }
}
