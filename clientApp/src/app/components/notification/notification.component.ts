import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { UtilityService } from '../../service/utility.service';
import { INotification } from './notification.interface';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnDestroy {
  notifications: INotification[] = [];
  isOnline = false;
  internetSub: Subscription;

  constructor(
    private utilityService: UtilityService,
    private notificationService: NotificationService
  ) {
    this.notificationService.getNotificationsUpdateListener()
      .subscribe(result => {
        this.notifications = result.notifications
      });

    this.internetSub = this.utilityService.observeInternetConnection()
      .subscribe(isOnline => this.isOnline = isOnline);

  }


  onRemoveNotification(id: number) {
    this.notificationService.deleteNotification(id);
  }

  ngOnDestroy() {
    if (this.internetSub) {
      this.internetSub.unsubscribe();
    }
  }

}
