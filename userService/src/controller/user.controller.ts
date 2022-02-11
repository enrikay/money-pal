import express from "express";
import bcrypt from "bcryptjs";

import { IUser, LoginDto, RegisterDto } from "../model/user.interface";
import { User } from "../model/user.schema";
import { SignJWT, VerifyJWT } from "../util/jwt";
import { MessageBroker } from "../rabbit";
import { ConfirmatioMail, SignUpMail } from "../util/mail.templates";


export async function SignupUser(req: express.Request, res: express.Response, next: express.NextFunction) {

    try {
        const requestOrigin = req.headers.origin;

        const { firstName, surName, email, password }: RegisterDto = req.body;

        const user = await User.findOne({ email }).exec();
        if (user) {
            return res.status(401).json({
                message: "Email already registered!",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const token = await SignJWT({ email });

        const newUser = new User();
        newUser.firstName = firstName;
        newUser.surName = surName;
        newUser.email = email;
        newUser.registrationToken = token;
        newUser.password = hashedPassword;

        const result = await newUser.save();
        if (!result) {
            return res.status(401).json({
                message: 'Registration not successfull!'
            });
        }

        const confirmURL = `${requestOrigin}/confirm/${result.registrationToken}`

        const emailData = {
            to: result.email,
            subject: "Account verification instructions",
            html: SignUpMail(`${result.firstName} ${result.surName}`, confirmURL)
        };

        // then send to email queue here
        const broker = await MessageBroker.getInstance();
        await broker.send('email-queue', Buffer.from(JSON.stringify(emailData)));


        res.status(201).json({
            message: 'Registered successfully!'
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

}


export async function LoginUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const { email, password }: LoginDto = req.body;

        const user = await User.findOne({ email }).exec();
        if (!user) {
            return res.status(401).json({
                message: "Not a registered user!",
            });
        }

        if (!user.isVerified) {
            return res.status(401).json({
                message: 'User is not verified. Check email and retry',
                isSuccessful: false
            });
        }

        const hashResult = await bcrypt.compare(password, user.password);
        if (!hashResult) {
            return res.status(401).json({
                message: "Invalid username/password!",
            });
        }

        const token = await SignJWT({
            _id: user._id,
            isVerified: user.isVerified,
            email: user.email
        });

        res.status(200).json({
            // message: 'Welcome!!!',
            data: {
                token,
                user: {
                    _id: user._id,
                    firstName: user.firstName,
                    surName: user.surName,
                    email: user.email,
                    isVerified: user.isVerified
                }
            },
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }

}



export async function VerifyUser(req: express.Request, res: express.Response, next: express.NextFunction) {

    try {
        const registrationToken = req.params.registrationToken;

        const user = await User.findOne({ registrationToken }).exec();
        if (!user) {
            return res.status(401).json({
                message: 'Invalid verification code!',
            });
        }

        if (user.isVerified) {
            return res.status(401).json({
                message: 'User account already verified!',
            });
        }

        const { email } = await VerifyJWT(registrationToken) as IUser;

        const result = await User.updateOne(
            { _id: user._id },
            { $set: { isVerified: true } }
        );

        if (result.nModified <= 0) {
            return res.status(400).json({
                message: 'Verification not successful!',
            });
        }

        const emailData = {
            to: user.email,
            subject: "Account verified successfully",
            html: ConfirmatioMail(`${user.firstName} ${user.surName}`)
        };

        // then send to email queue here
        const broker = await MessageBroker.getInstance();
        await broker.send('email-queue', Buffer.from(JSON.stringify(emailData)));

        
        // will also send to wallet queue to create wallet
        await broker.send('create-wallet', Buffer.from(JSON.stringify({ userId: user._id })));


        res.status(200).json({
            message: 'User verification successful!',
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }

}