import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavStateService {
  private isSidenavFadedOutSubject = new BehaviorSubject<boolean>(false);
  isSidenavFadedOut$ = this.isSidenavFadedOutSubject.asObservable();

  private activePageSubject = new BehaviorSubject<string>('dashboard');
  activePage$ = this.activePageSubject.asObservable();

  constructor() { }

  setSidenavFadedOut(fadedOut: boolean): void {
    this.isSidenavFadedOutSubject.next(fadedOut);
  }

  setActivePage(page: string): void {
    this.activePageSubject.next(page);
  }
}
