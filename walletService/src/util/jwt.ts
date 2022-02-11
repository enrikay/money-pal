import jwt from "jsonwebtoken";

import { SERVER_SECRET_KEY } from "../configuration/configuration";


export async function VerifyJWT(token: string) {
    return jwt.verify(token, SERVER_SECRET_KEY);
}


export async function SignJWT(payload: any) {
    return jwt.sign({
        _id: payload._id,
        isVerified: payload.isVerified
    }, SERVER_SECRET_KEY);
}

