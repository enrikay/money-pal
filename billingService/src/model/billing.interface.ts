import mongoose from 'mongoose';

export interface CreateBillingDto {
  userId: string;
  type: `debit` | `credit`;
  amount: number
}

export interface IBilling extends CreateBillingDto, mongoose.Document {
  _id: string;
  status: string;
  invoiceNo: string;
  createdAtDate: string;
}
