
import express from "express";

import { LoginUser, SignupUser, VerifyUser } from "../controller/user.controller";



const router = express.Router();


router.post("/signup", SignupUser)

router.post("/login", LoginUser)

router.get("/confirm/:registrationToken", VerifyUser);


export default router;
