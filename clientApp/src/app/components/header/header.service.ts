import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';

// import { environment } from 'src/environments/environment';

// import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  // private API_URL = environment.API_URL;


  // constructor(
  //   private http: HttpClient,
  // ) { }



  // private notificationsUpdated = new Subject<{
  //   allNotifications: IUser[];
  //   totalNotifications: number;
  // }>();

  // getNotificationsUpdateListener() {
  //   return this.notificationsUpdated.asObservable();
  // }

  // getNotifications() {
  //   this.http
  //     .get<{ allNotifications: IUser[], totalNotifications: number }>(
  //       `${this.API_URL}admin/new/engineer_as_notifications`)
  //     .subscribe(notificationsData => {
  //       this.notificationzz = notificationsData.allNotifications;
  //       this.notificationsUpdated.next({
  //         allNotifications: [...this.notificationzz],
  //         totalNotifications: notificationsData.totalNotifications
  //       });
  //     });
  // }


}
