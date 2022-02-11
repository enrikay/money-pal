import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Angular4PaystackModule } from 'angular4-paystack';

import { PaystackComponent } from './paystack.component';


@NgModule({
  declarations: [PaystackComponent],
  imports: [
    CommonModule,
    Angular4PaystackModule.forRoot('pk_test_86a34dfe9bb54afb6fd8d566918c1e83ed0c440e'),
  ],
  exports: [PaystackComponent],
})
export class PaystackModule { }
