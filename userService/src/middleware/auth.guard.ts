import jwt from 'jsonwebtoken';
import express from 'express';

import { SERVER_SECRET_KEY } from '../configuration/configuration';
import { IUser } from '../model/user.interface';

export function AuthGuard(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const authorization = req.headers.authorization || "";
        const token = authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, SERVER_SECRET_KEY) as IUser;
        req["userID"] = decodedToken._id;
        next();
    } catch (error) {
        res.status(401).json({
            message: "You are not logged in!!!"
        })
    }
};