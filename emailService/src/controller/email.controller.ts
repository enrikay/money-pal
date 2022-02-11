import express from "express";
import nodemailer from "nodemailer";

import { SendEmailDto } from "../model/email.interface";
import { MAIL_USERNAME, MAIL_PASSWORD } from "../configuration/configuration";



// export async function SendEMail(req: express.Request, res: express.Response, next: express.NextFunction) {

//     try {

//         const { userId }: CreateWalletDto = req.body;

//         const wallet = await Wallet.findOne({ userId }).exec();
//         if (wallet) {
//             return res.status(404).json({
//                 message: "User already has a wallet!",
//             });
//         }

//         const newWallet = new Wallet();
//         newWallet.userId = userId;

//         const result = await newWallet.save();
//         if (!result) {
//             return res.status(400).json({
//                 message: 'Creating wallet not successfull!'
//             });
//         }

//         res.status(201).json({
//             message: 'Wallet created successfully!'
//         });

//     } catch (error) {
//         res.status(500).json({
//             message: error.message
//         });
//     }

// }



// export async function FundWallet(req: express.Request, res: express.Response, next: express.NextFunction) {
//     try {
//         const userId = req["user_id"] as string

//         const wallet = await Wallet.findOne({ userId }).exec();
//         if (!wallet) {
//             return res.status(404).json({
//                 message: "User does not have a wallet!",
//             });
//         }

//         const walletBalance = wallet.balance

//         // bus logic here

//         res.status(200).json({ message: 'Funded succssfully!' });

//     } catch (error) {
//         res.status(500).json({
//             message: error.message,
//         });
//     }

// }



// export async function GetWalletBalance(req: express.Request, res: express.Response, next: express.NextFunction) {

//     try {
//         const userId = req["user_id"] as string

//         const wallet = await Wallet.findOne({ userId }).exec();
//         if (!wallet) {
//             return res.status(401).json({
//                 message: "User does not have a wallet!",
//             });
//         }

//         res.status(200).json({
//             data: { balance: wallet.balance }
//         });

//     } catch (error) {
//         res.status(500).json({
//             message: error.message
//         });
//     }
// }


export async function SendMail(sendMailDto: SendEmailDto) {
    try {
        const transport = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: MAIL_USERNAME,
                pass: MAIL_PASSWORD,
            },
        });

        const result = await transport.sendMail({
            from: `MoneyPal <no_reply@moneypal.com>`,
            to: sendMailDto.to,
            subject: sendMailDto.subject,
            html: sendMailDto.html
        })

        console.log(result)
    } catch (error) {

    }

};