import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { NotificationService } from 'src/app/components/notification/notification.service';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private API_URL = environment.API_URL;


  private walletBalanceUpdated = new Subject<number>();
  private bilingsUpdated = new Subject<{ billings: any[], totalBillings: number }>();


  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) { }


  createWallet() {

  }


  fundWallet(amount: number) {
    this.http
      .post<{ message: string }>(`${this.API_URL.payment}fund`, { amount })
      .subscribe(response => {
        this.notificationService.notify(response.message);
        setTimeout(() => {
          this.getWalletBalance();
          this.getBillings();
        }, 4500);

      });
  }


  transaferMoney(amount: number, accountNumber: string) {
    console.log(amount, accountNumber)
    this.http
      .post<{ message: string }>(`${this.API_URL.payment}transfer`, { amount, accountNumber })
      .subscribe(response => {
        this.notificationService.notify(response.message);
        setTimeout(() => {
          this.getWalletBalance();
          this.getBillings();
        }, 4500);
      });
  }


  getWalletBalanceUpdateListener() {
    return this.walletBalanceUpdated.asObservable();
  }

  getWalletBalance() {
    this.http.get<{ data: { balance: number } }>(`${this.API_URL.wallet}balance/get`)
      .subscribe(response => {
        this.walletBalanceUpdated.next(response.data.balance);
      }, error => {
      });
  }



  getBillingsUpdateListener() {
    return this.bilingsUpdated.asObservable();
  }

  getBillings() {
    this.http.get<{ data: { billings: any[], totalBillings: number }}>(`${this.API_URL.billing}/getAll`)
      .subscribe(response => {
        console.log(response)
        this.bilingsUpdated.next(response.data);
      }, error => {
      });
  }

}
