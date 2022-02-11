import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaystackOptions } from 'angular4-paystack';
import { NotificationService } from '../notification/notification.service';

@Component({
  selector: 'app-paystack',
  templateUrl: './paystack.component.html',
  styleUrls: ['./paystack.component.scss']
})
export class PaystackComponent implements OnInit {
  @Input() amount = 2000;
  @Input() email = 'cornelius.okeke@exquisappfactory.com';

  @Output() paymentSuccess = new EventEmitter<number>();

  reference = '';

  options!: PaystackOptions;

  constructor(
    private notificationService: NotificationService
  ) { }


  paymentInit() {
    console.log('Payment initialized');
  }

  get amountt() {
    return this.amount;
  }
  get emaill() {
    return this.email;
  }

  paymentDone(response: any) {
    console.log(response)
    this.notificationService.notify(response.message);

    this.paymentSuccess.emit(this.amount);
  }


  paymentCancel() {
    console.log('payment failed');
  }

  ngOnInit() {
    this.reference = `ref-${Math.ceil(Math.random() * 10e13)}`;

    this.options = {
      amount: this.amount,
      email: this.email,
      ref: this.reference
    }

  }

}
