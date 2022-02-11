import express from "express";

import { CreateBilling, GetBillings } from "../controller/billing.controller";
import { AuthGuard } from "../middleware/auth.guard";


const router = express.Router();


router.post("/create", CreateBilling)

// router.post("/getAll", FundWallet)

router.get("/getAll", AuthGuard, GetBillings);


export default router;
