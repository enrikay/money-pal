import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { StorageService } from 'src/app/service/storage.service';
import { UtilityService } from 'src/app/service/utility.service';
import { WalletService } from './wallet.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  totalBillings = 0;
  billings: any[] = []

  walletBalance = 0;
  user: any;

  inputedAmount = 2000;

  bilingPerPage = 8;
  currentPage = 1;

  walletSub: Subscription | undefined;

  constructor(
    private utilityService: UtilityService,
    private storageService: StorageService,
    private walletService: WalletService
  ) { }


  onInputPrice(event: Event) {
    const value = (event.target as HTMLInputElement).value as unknown as number;
    if (value <= 0) {
      return;
    }
  }


  onSubmitAmount(form: NgForm) {
    const amount = form.value.inputAmount;

    this.walletService.fundWallet(amount);
  }


  onSubmitTransfer(form: NgForm) {
    const amount = form.value.inputAmount;
    const accountNumber = form.value.inputAccount;

    this.walletService.transaferMoney(amount, accountNumber);
  }



  initContents() {

    this.walletService.getWalletBalance();
    this.walletService.getBillings();

    this.walletSub = this.walletService.getWalletBalanceUpdateListener()
      .subscribe(walletData => {
        this.walletBalance = walletData
      });


    this.walletSub = this.walletService.getBillingsUpdateListener()
      .subscribe(data => {
        this.billings = data.billings
      });


    this.utilityService.setPageTitle('Wallet');
  }

  ngOnInit() {
    this.initContents();
  }



}
