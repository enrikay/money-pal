import express from "express";

import { Wallet } from "../model/wallet.schema";
import { CreateWalletDto } from "../model/wallet.interface";



export async function CreateWallet(userId: string) {

    try {

        // const wallet = await Wallet.findOne({ userId }).exec();
        // if (wallet) {
        //     return res.status(404).json({
        //         message: "User already has a wallet!",
        //     });
        // }

        const newWallet = new Wallet();
        newWallet.userId = userId;

        const result = await newWallet.save();
        // if (!result) {
        //     return res.status(400).json({
        //         message: 'Creating wallet not successfull!'
        //     });
        // }

        // res.status(201).json({
        //     message: 'Wallet created successfully!'
        // });
        if (result) {
            console.log(`Wallet created for user!!!`)
        }

    } catch (error) {
        console.log(error)
        // res.status(500).json({
        //     message: error.message
        // });
    }

}



export async function FundWallet(userId: string, type: string, amount: number) {
    try {

        let balance: number;

        const wallet = await Wallet.findOne({ userId }).exec();
        if (!wallet) {
            // return res.status(404).json({
            //     message: "User does not have a wallet!",
            // });

            console.log("User does not have a wallet!")
        }

        if (type === `credit`) {
            balance = wallet.balance + amount;
        } else{
            balance = wallet.balance - amount;
        }

        const result = await Wallet.updateOne(
            { _id: wallet._id },
            { $set: { balance } }
        );

        if (result.nModified > 0) {
            console.log('Wallet funded succssfully!');
        }

        // res.status(200).json({ message: 'Funded succssfully!' });

    } catch (error) {
        console.log(error)
        // res.status(500).json({
        //     message: error.message,
        // });
    }

}



export async function GetWalletBalance(req: express.Request, res: express.Response, next: express.NextFunction) {

    try {
        const userId = req["user_id"] as string

        const wallet = await Wallet.findOne({ userId }).exec();
        if (!wallet) {
            return res.status(401).json({
                message: "User does not have a wallet!",
            });
        }

        res.status(200).json({
            data: { balance: wallet.balance }
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}