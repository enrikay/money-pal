import { Injectable } from '@angular/core';

// import { IBranch } from '../pages/branch/branch.inteface';
// import { IUser, UserTypeEnum } from '../pages/user/user.interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  /** Saves authentication data into browser storage.
  
  Returns `Void` */
  saveAuthData(token: string, user: any, loggedUserType?: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    // localStorage.setItem('loggedUserType', JSON.stringify(loggedUserType));
  }

  saveBranchOBJ(branch: any) {
    localStorage.setItem('branch', JSON.stringify(branch));
  }

  optimiseUserOBJ(user: any) {
    localStorage.removeItem('user');
    localStorage.setItem('user', JSON.stringify(user));
  }


  /**
* gets logged user authentication data.
* 
* Returns `void`, if userOBJ and token are not awailable.
*/
  getAuthData() {
    // return new Promise<{ token: string, user: IUser, authenticatedUserType: UserTypeEnum }>((resolve, reject) => {
    const token = localStorage.getItem('token');
    const user: any = localStorage.getItem('loggedUser');
    const userType = localStorage.getItem('loggedUserType');

    const parsedUser: any = JSON.parse(user);

    //   if (user && token) {
    //     resolve({ token, user: parsedUser, authenticatedUserType: parsedLoggedUserType });
    //   }
    // });
    if (user && token) {
      return { token, user: parsedUser };
    }
    return;

  }


  getUserOBJ() {
    const user = localStorage.getItem('loggedUser');
    if (!user) {
      return null;
    }
    return JSON.parse(user);
  }

  getSelectedBranchOBJ(): any {
    const branch = localStorage.getItem('branch');
    if (!branch) {
      return null;
    }
    return JSON.parse(branch);
  }



  removeUserOBJ() {
    localStorage.removeItem('loggedUser');
  }


  /**
 * Clear authentication data from browser storage.
 * 
 * Returns `Void` 
 */
  removeAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('branch');
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('loggedUserType');
  }

}
