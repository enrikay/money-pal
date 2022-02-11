import mongoose from 'mongoose';


export interface LoginDto {
    email: string;
    password: string
}

export interface RegisterDto extends LoginDto {
    firstName: string;
    surName: string;
}


export interface IUser extends RegisterDto, mongoose.Document {
    _id: string;
    isVerified: boolean;
    registrationToken: string;
    registeredDate: string;
}
