import { Component, AfterViewInit, Renderer2, ElementRef } from '@angular/core';
import { SidenavStateService } from '../shared/services/sidenav-state.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent implements AfterViewInit{
  isSidenavOpen = true;
  constructor(private renderer: Renderer2,
    private el: ElementRef,
    private sidenavStateService: SidenavStateService
  ) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.handleWindowLoad();
    }, 100);
  }

  handleWindowLoad(): void {
    const preloader = this.el.nativeElement.querySelector('.preloader') as HTMLElement;

    if (preloader) {
      // Hide preloader
      this.renderer.setStyle(preloader, 'display', 'none');

      // Additional setTimeout logic (if needed)
      setTimeout(() => {
        this.renderer.setStyle(preloader, 'display', 'none');
      }, 1500);
    } else {
      console.error('Preloader element not found');
    }
  }

  toggleSidenav(): void {
    this.isSidenavOpen = !this.isSidenavOpen;
    this.setSidenavState();
  }
  
  setSidenavState(): void {
    this.sidenavStateService.activePage$.subscribe(activePage => {
      const fadedOut = this.isSidenavOpen && activePage !== 'dashboard';
      this.sidenavStateService.setSidenavFadedOut(fadedOut);
    });
  }
  
  setActivePage(page: string): void {
    this.sidenavStateService.setActivePage(page);
  }
}
