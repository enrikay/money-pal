import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
// import Swal from 'sweetalert2';

import { INotification } from './notification.interface';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private timeOut: any;
  private notifications: INotification[] = [];

  private notificationUpdated = new Subject<{
    notifications: INotification[]
  }>();

  constructor() { }


  getNotificationsUpdateListener() {
    return this.notificationUpdated.asObservable();
  }

  notify(message: string, type = 'success') {
    if (this.timeOut) {
      clearTimeout(this.timeOut);
    }

    const notificationOBJ: INotification = {
      id: this.notifications.length + 1,
      type,
      icon: this.setIconType(type),
      message,
      startDate: this.getDate().startDate,
      endDate: this.getDate().endDate
    }

    this.notifications.push(notificationOBJ);

    this.notificationUpdated.next({
      notifications: [...this.notifications]
    });

    this.getTimeOut()
  }


  // error(message: string) {
  //   Swal.fire({
  //     // title: 'Error',
  //     // icon: 'error',
  //     titleText: 'Error!',
  //     text: message,
  //     showClass: {
  //       popup: 'animate__animated animate__zoomIn'
  //     },
  //     hideClass: {
  //       popup: 'animate__animated animate__zoomOut'
  //     }
  //   })
  // }



  deleteNotification(notificationId: number) {
    const notifi = this.notifications.filter(item => item.id !== notificationId);
    this.notifications = notifi;
    // if (this.timeOut) {
    //   clearTimeout(this.timeOut);
    //   this.timeOut = setTimeout(() => {
    this.notificationUpdated.next({ notifications: [...this.notifications] });
    // }
  }

  private getTimeOut() {
    this.timeOut = setTimeout(() => {
      this.notificationUpdated.next({
        notifications: this.notifications = []
      });

    }, 8000);

  }

  private getTimeOutTime(arrayLength: number) {
    let timeOutTime = 5000;
    if (arrayLength > 0) {
      return timeOutTime * arrayLength;
    }
    return timeOutTime;
  }


  private getDate() {
    const startDate = Date.now();
    const d = startDate / 1000;
    const c = d + 5;
    const endDate = c * 1000;
    return { startDate, endDate };
  }

  private setIconType(type: string) {
    if (type === 'success') {
      return 'check-circle-fill';
    }
    if (type === 'info') {
      return 'info-circle-fill';
    }
    if (type === 'warn') {
      return 'exclamation-circle-fill';
    }
    if (type === 'error') {
      return 'x-circle-fill';
    }
    return `info-circle-fill`;
  }

}
