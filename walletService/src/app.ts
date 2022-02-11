// cors gives permissin to  "GET, POST, PUT, PATCH, DELETE, OPTIONS" capability
// mongoose makes schema possible in mongo DB
// bodyparser exposes the body portion of an incoming request on "req.body"

import cors from "cors";
import express from "express";
import { CreateWallet, FundWallet } from "./controller/wallet.controller";

import { ConnectDB } from "./db/db";
import { MessageBroker } from "./rabbit";

import walletRoutes from "./routes/wallet.route";

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
app.use("/api/wallet", walletRoutes);
// app.use("/api/v1", caseRoutes);

MessageBroker.getInstance()
    .then(broker => {
        broker.subscribe('fund-wallet', (message: any, ack: any) => {
            const result = JSON.parse(message.content.toString());
            console.log(result)
            FundWallet(result.userId, result.type, result.amount);
            ack();
        })
    }).catch((error) => console.log({ error }));

    
MessageBroker.getInstance()
    .then((broker) => {
        broker.subscribe('create-wallet', (message: any, ack: any) => {
            const { userId } = JSON.parse(message.content.toString()) as { userId: string };
            CreateWallet(userId);
            ack();
        })
    }).catch((error) => console.log({ error }));


export default app;
