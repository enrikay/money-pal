import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StorageService } from 'src/app/service/storage.service';

import { UtilityService } from 'src/app/service/utility.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  totalBillings = 0;
  walletBalance = 0;
  wallets: any[] = [];
  user: any;

  inputedAmount = 2000;

  bilingPerPage = 8;
  currentPage = 1;

  constructor(
    private utilityService: UtilityService,
    private storageService: StorageService
  ) { }


  onInputPrice(event: Event) {
    const value = (event.target as HTMLInputElement).value as unknown as number;
    if (value <= 0) {
      return;
    }
  }

  onSuccessWallet(e: number) {
    this.walletBalance = this.walletBalance + e;
  }


  initContents() {
    this.utilityService.setPageTitle('Dashboard');

    this.user = this.storageService.getUserOBJ()
  }

  ngOnInit() {
    this.initContents();
  }

}
