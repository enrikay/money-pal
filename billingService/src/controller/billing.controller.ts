import express from "express";

import { CreateBillingDto } from "../model/billing.interface";
import { Billing } from "../model/billing.schema";
import { GenerateCustomID } from "../util/custom-id";




export async function CreateBilling(newBillData: CreateBillingDto) {

    try {

        // const { amount, userId }: CreateBillingDto = req.body;

        const newBilling = new Billing();
        newBilling.userId = newBillData.userId;
        newBilling.type = newBillData.type;
        newBilling.amount = newBillData.amount;
        newBilling.invoiceNo = await GenerateCustomID(10);


        const result = await newBilling.save();
        if (!result) {
            console.log(`billing not completed`)
        }

        console.log(`billing successfull!`)

    } catch (error) {
        console.log(error)
    }

}



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



export async function GetBillings(req: express.Request, res: express.Response, next: express.NextFunction) {

    try {
        const userId = req["user_id"] as string

        const totalBillings = await Billing.countDocuments({ userId }).exec();
        const billings = await Billing.find({ userId }).exec();

        res.status(200).json({
            data: {
                totalBillings,
                billings
            }
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}