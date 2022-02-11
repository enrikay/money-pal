import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import { BehaviorSubject, Subject } from 'rxjs';

import { StorageService } from '../../service/storage.service';
import { NavigationService } from '../../service/navigation.service';
import { NotificationService } from '../../components/notification/notification.service';
import { UserSignUpDto } from './user.dto';
// import { UserSignUpDto, UserSignInDto } from '../user/user.dto';
// import { IUser, UserTypeEnum } from '../user/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = environment.API_URL;

  private userIsAuthenticated = false;
  private token?: string;
  private userId?: string;


  authenticationStatusListener = new Subject<boolean>();


  constructor(
    private http: HttpClient,
    private navigationService: NavigationService,
    private notificationsService: NotificationService,
    private storageService: StorageService,
  ) { }


  /** returns user authentication token string */
  getToken() {
    return this.token;
  }


  /** returns user ID */
  getUserID() {
    return this.userId;
  }


  /**
* Gets user authentication status 
*
* Returns `true` if user is logged in and `false` if otherwise.
*/
  getIsAuthenticated() {
    return this.userIsAuthenticated;
  }


  /**
  * User signup
  */
  registerUser(userSignUpDto: UserSignUpDto) {
    this.http.post<{ message: string, isSuccessful: boolean }>(`${this.API_URL.user}api/auth/register`, userSignUpDto)
      .subscribe(response => {

        if (!response.isSuccessful) {
          return this.notificationsService.notify(response.message);
        }

        this.notificationsService.notify(response.message);

        this.navigationService.goToLogin();
      }, error => {
        this.authenticationStatusListener.next(false);
        // this.notificationsService.notify(error.message, `error`);
      });
  }


  /**
  * User Login.
  */
  loginUser(userSignInDto: any) {

    if (this.userIsAuthenticated) {
      return this.notificationsService.notify('A user already Authenticated', 'info');
    }

    this.http.post<{ message: string, isSuccessful: boolean, data: any }>(`${this.API_URL.user}api/auth/login`, userSignInDto)
      .subscribe(response => {

        const token = response.data.token;
        this.token = token;
        this.userId = response.data.id;
        const user = response.data;

        if (!response.isSuccessful) {
          return this.notificationsService.notify(response.message);
        }

        this.notificationsService.notify(response.message);
        this.userIsAuthenticated = true;
        this.saveAuthenticationData(token, user);
        this.authenticationStatusListener.next(true);
        this.navigationService.goToDashboard();
      }, error => {
        this.authenticationStatusListener.next(false);
      });
  }



  verifyUser(token: string) {
    this.http.get<{ message: string, isSuccessful: boolean, data: any }>(`${this.API_URL.user}api/auth/confirm/${token}`)
      .subscribe(response => {

        if (!response.isSuccessful) {
          return this.notificationsService.notify(response.message);
        }

        this.notificationsService.notify(response.message);
        this.storageService.optimiseUserOBJ(response.data);
      }, error => {
        this.authenticationStatusListener.next(false);
      });
  }


  /**
*  Logging user out
*/
  logout() {
    this.token = ``;
    this.userId = ``;
    this.userIsAuthenticated = false;
    this.authenticationStatusListener.next(false);
    this.clearAuthenticationData();
    this.navigationService.goToLogin();
  }


  /**
*  calls function that stores the authentication datas to the browser local storage
*/
  private saveAuthenticationData(token: string, user: any) {
    this.storageService.saveAuthData(token, user);
  }


  /**
  *  Persists user authentication status
  * 
  * This is called at application first initialization.
  * 
  * ==> Does not excute if no user is logged in
  */
  async automaticAuthenticateUser() {
    const authenticationInformation = await this.getAuthenticationData();
    if (!authenticationInformation) {
      return;
    }

    this.token = authenticationInformation.token;

    this.userIsAuthenticated = true;
    this.authenticationStatusListener.next(true);
  }


  /**
  this gets the user authentication data from browser local starage
  */
  private async getAuthenticationData() {
    const authData = this.storageService.getAuthData();
    if (!authData) {
      return;
      // execution ends here if there is no saved auth data.
    }
    const token = authData.token;
    const user = authData.user;
    return { token, user };
  }


  /**
    Removes authentication data from the browser.

    It is called during logout
*/
  private clearAuthenticationData() {
    this.storageService.removeAuthData();
    // location.reload();
  }

}
