import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  urlListener = new Subject<string>();

  constructor(
    private router: Router
  ) { }


  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }



  toggleSidenavSubject(url: string) {
    this.urlListener.next(url);
  }


}
