import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from './pages/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  userIsAuthenticated = false;

  authStatusListenerSub: Subscription | undefined;

  constructor(
    private authService: AuthService
  ) { }


  private initContents() {

    this.authService.automaticAuthenticateUser();

    this.authStatusListenerSub = this.authService.authenticationStatusListener
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });

  }


  ngOnInit() {
    this.initContents();
  }


}
