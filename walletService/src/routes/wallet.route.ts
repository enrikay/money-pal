import express from "express";

import { CreateWallet, FundWallet, GetWalletBalance } from "../controller/wallet.controller";
import { AuthGuard } from "../middleware/auth.guard";


const router = express.Router();


// router.post("/create", CreateWallet)

// router.post("/fund", FundWallet)

router.get("/balance/get", AuthGuard, GetWalletBalance);


export default router;
