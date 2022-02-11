import express from 'express';

import { VerifyJWT } from '../util/jwt';

export async function AuthGuard(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const authorization = req.headers.authorization || "";
        const token = authorization.split(" ")[1];
        const decodedToken = await VerifyJWT(token) as any;

        req["user_id"] = decodedToken._id;
        if (!decodedToken.isVerified) {
            res.status(401).json({
                message: 'User is not verified. Check email and retry!'
            })
        }
        next();
    } catch (error) {
        res.status(401).json({
            message: "You are not logged in!!!"
        })
    }
};