
import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import Database from "../configs/db";
import {signToken, verifyToken} from "../securities/jwt";
import { error } from "console";
import { Users } from "../models/schemas/user";


export const authMiddleware = async(req:Request, res:Response, next: NextFunction) => {
    const token = req.headers["authorization"];
    if (!token) {
        throw new Error("Token is required");
    }
    try {

        const tokenData = await verifyToken({tokens: token});
        const email = tokenData.email;
        const user = await Database.users.findOne({ email: email});
        if(!user){
            return res.status(404).json({
                error: 1,
                message: 'User not found',
                data: null
            });
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