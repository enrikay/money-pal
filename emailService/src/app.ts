import cors from "cors";
import express from "express";

import { ConnectDB } from "./db/db";
import walletRoutes from "./routes/email.route";
import { MessageBroker } from "./rabbit";
import { SendMail } from "./controller/email.controller";
import { SendEmailDto } from "./model/email.interface";


const app = express();

app.use(cors());
app.use(express.json());
// app.use(bodyParser.urlencoded({extended: true}));

// Connecting to mongoDB database
ConnectDB();

// permissions
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    next();
});

// For various routes
// app.use("/api/wallet", walletRoutes);
// app.use("/api/v1", caseRoutes);


// MessageBroker.getInstance()
// .then((broker) => {
//     broker.subscribe('credit-self', (message, ack) => {
//         console.log({ message })
//         const walletData = JSON.parse(message.content.toString())
//         console.log({ walletData })
//         // creditWallet(walletData)
//         ack();
//     })
// }).catch((error) => console.log({ error }));

MessageBroker.getInstance()
    .then((broker) => {
        broker.subscribe('email-queue', (message: any, ack: any) => {
            const emailData = JSON.parse(message.content.toString()) as SendEmailDto
            SendMail(emailData);
            ack();
        })
    }).catch((error) => console.log({ error }));


export default app;
