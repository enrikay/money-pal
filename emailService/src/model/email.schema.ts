// import { model, Schema } from 'mongoose';

// import { IWallet } from './email.interface';
// import { GenerateISODate } from '../util/date-time';

// const walletSchema: Schema<IWallet> = new Schema({
//     balance: { type: Number, required: true, default: 0 },
//     createdAtDate: { type: String, required: true, default: GenerateISODate },
//     userId: { type: Schema.Types.ObjectId, ref: `User`, required: true },
// });


// export const Wallet = model<IWallet>('Wallet', walletSchema);