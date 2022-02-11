import { model, Schema } from 'mongoose';

import { GenerateISODate } from '../util/date-time';
import { IBilling } from './billing.interface';

const walletSchema: Schema<IBilling> = new Schema({
    amount: { type: Number, min: 50, max: 50000000, required: true },
    invoiceNo: { type: String, required: true },
    createdAtDate: { type: String, required: true, default: Date.now },
    type: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: `User`, required: true },
});


export const Billing = model<IBilling>('Billing', walletSchema);