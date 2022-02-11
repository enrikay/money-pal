// Engineer schema

//@ts-check
import { model, Schema } from 'mongoose';

import { IUser } from './user.interface';
import { GenerateISODate } from '../util/date-time';

const userShema: Schema<IUser> = new Schema({
    firstName: { type: String, required: true, minLength: 3, lowercase: true, trim: true },
    surName: { type: String, required: true, minLength: 3, lowercase: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    isVerified: { type: Boolean, required: true, default: false },
    registrationToken: { type: String, required: true },
    registeredDate: { type: String, required: true, default: GenerateISODate },
    password: { type: String, required: true, trim: true },
});


export const User = model<IUser>('User', userShema);