import express from "express";

import { Wallet } from "../model/payment.schema";
import { CreateWalletDto } from "../model/payment.interface";
import { MessageBroker } from "../rabbit";
import { FundMail } from "../util/mail.templates";



// export async function CreateWallet(req: express.Request, res: express.Response, next: express.NextFunction) {

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



export async function MakePayment(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const userId = req["user_id"] as string;
        const email = req["email"] as string;

        const { amount }: { amount: number } = req.body;

        // make API call to paystack here

        const emailData = {
            to: email,
            subject: "Funded successfull!",
            html: FundMail(amount)
        };

        // // then send to email queue here
        const broker = await MessageBroker.getInstance();
        await broker.send('fund-wallet', Buffer.from(JSON.stringify({ userId, type: `credit`, amount })));

        await broker.send('add-billing', Buffer.from(JSON.stringify({ userId, type: `credit`, amount })));

        await broker.send('email-queue', Buffer.from(JSON.stringify(emailData)));

        res.status(200).json({ message: 'Funded successfully!' });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }

}


export async function TransferFund(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const userId = req["user_id"] as string;
        // const email = req["email"] as string;

        const { amount }: { amount: number } = req.body;

        // // then send to email queue here
        const broker = await MessageBroker.getInstance();
        await broker.send('fund-wallet', Buffer.from(JSON.stringify({ userId, type: `debit`, amount })));

        await broker.send('add-billing', Buffer.from(JSON.stringify({ userId, type: `debit`, amount })));

        res.status(200).json({ message: 'Funded succssfully!' });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }

}



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