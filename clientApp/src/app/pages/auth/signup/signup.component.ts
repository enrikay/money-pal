import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavigationService } from '../../../service/navigation.service';

import { AuthService } from '../auth.service';
import { UserSignUpDto } from '../user.dto';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  passwordInputType = 'password';
  isPasswordMatch = true;
  isAuthenticated = true;

  constructor(
    private authService: AuthService,
    private navigationService: NavigationService
  ) { }


  onRegisterUser(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const registrationData: UserSignUpDto = {
      firstName: form.value.inputFirstName,
      surName: form.value.inputSurName,
      username: form.value.inputEmail,
      password: form.value.inputPassword1
    }

    this.authService.registerUser(registrationData);
  }


  onTogglePasswordDisplay() {
    if (this.passwordInputType === 'password') {
      return this.passwordInputType = 'text'
    }
    if (this.passwordInputType === 'text') {
      return this.passwordInputType = 'password'
    }
    return;
  }


  onMatchPassword(form: NgForm) {
    console.log(form.value)
    const firstPassword = form.value.inputPassword1;
    const secontPassword = form.value.inputPassword2;
    if (firstPassword !== secontPassword) {
      this.isPasswordMatch = false;
      return;
    }
    this.isPasswordMatch = true;
  }


  initContent() {
    const isAuth = this.authService.getIsAuthenticated();

    if (isAuth) {
      // this.navigationService.goto();
    }
  }



  ngOnInit(): void {
    this.initContent();
  }


}
