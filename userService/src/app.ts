// cors gives permissin to  "GET, POST, PUT, PATCH, DELETE, OPTIONS" capability
// mongoose makes schema possible in mongo DB
// bodyparser exposes the body portion of an incoming request on "req.body"

import cors from "cors";
import express from "express";

import { ConnectDB } from "./db/db";

import usersRoutes from "./routes/user.route";

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
app.use("/api/user", usersRoutes);
// app.use("/api/v1", caseRoutes);


export default app;
