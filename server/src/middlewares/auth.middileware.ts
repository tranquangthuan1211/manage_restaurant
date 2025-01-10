
import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import Database from "../configs/db";
import {signToken, verifyToken} from "../securities/jwt";
import { error } from "console";
import { Users } from "../models/schemas/user";


export const authMiddleware = async(req:Request, res:Response, next: NextFunction) => {
    try {
        const token = req.headers["authorization"];
        console.log(req.headers);
        console.log(req.method);
        console.log(req.baseUrl + req.url);
        if (!token) {
            return res.status(401).json({ 
                error: 1,
                message: 'Unauthorized',
                data: null
            });
            //throw new Error("Token is required");
        }
        const tokenData = await verifyToken({tokens: token});
        const email = tokenData.email;
        const user = await Database.users.findOne({ email: email});
        if(!user){
            throw new Error("User not found");
        }
        req.body.user = user;
        next();
    } catch (error) {
        return res.status(400).json({ 
            error: 1,
            message: 'Invalid token',
            data: null
        });
    }
};