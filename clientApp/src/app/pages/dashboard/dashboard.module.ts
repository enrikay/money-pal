import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AvatarModule } from 'src/app/components/avatar/avatar.module';
import { PaystackModule } from 'src/app/components/paystack/paystack.module';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,

    AvatarModule,
    PaystackModule
  ]
})
export class DashboardModule { }
