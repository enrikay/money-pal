import mongoose from 'mongoose';


export interface CreateWalletDto {
  userId: string;
}

export interface FundWalletDto extends CreateWalletDto {
  balance: number;
}


export interface IWallet extends CreateWalletDto,FundWalletDto, mongoose.Document {
  _id: string;
  createdAtDate: string;
}
