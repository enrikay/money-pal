import express from "express";

import { MakePayment, TransferFund } from "../controller/payment.controller";
import { AuthGuard } from "../middleware/auth.guard";


const router = express.Router();


router.post("/fund", AuthGuard, MakePayment)

router.post("/transfer", AuthGuard, TransferFund)

// router.get("/balance/get", AuthGuard, GetWalletBalance);


export const PaymentRoutes = router;
