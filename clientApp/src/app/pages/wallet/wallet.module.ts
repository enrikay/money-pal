import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletRoutingModule } from './wallet-routing.module';
import { WalletComponent } from './wallet.component';
import { AvatarModule } from 'src/app/components/avatar/avatar.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    WalletComponent
  ],
  imports: [
    CommonModule,
    WalletRoutingModule,
    FormsModule,

    AvatarModule
  ]
})
export class WalletModule { }
