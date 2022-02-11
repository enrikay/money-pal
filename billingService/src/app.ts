// cors gives permissin to  "GET, POST, PUT, PATCH, DELETE, OPTIONS" capability
// mongoose makes schema possible in mongo DB
// bodyparser exposes the body portion of an incoming request on "req.body"

import cors from "cors";
import express from "express";
import { CreateBilling } from "./controller/billing.controller";

import { ConnectDB } from "./db/db";
import { CreateBillingDto } from "./model/billing.interface";
import { MessageBroker } from "./rabbit";

import BillingRoutes from "./routes/billing.route";

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
app.use("/api/billing", BillingRoutes);
// app.use("/api/v1", caseRoutes);

MessageBroker.getInstance()
    .then((broker) => {
        broker.subscribe('add-billing', (message: any, ack: any) => {
            const data = JSON.parse(message.content.toString()) as CreateBillingDto;
            console.log(data)
            CreateBilling(data);
            ack();
        })
    }).catch((error) => console.log({ error }));

export default app;
