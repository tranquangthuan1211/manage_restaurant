import e, { Request, Response, NextFunction } from 'express';
import {verifyToken } from '../securities/jwt';
import UsersDataBase from '../models/user-model';
export const userMiddleware = async(req:Request, res:Response, next: NextFunction) => {
    const token = req.headers["authorization"];
    // console.log(token)
    if (!token) {
        throw new Error("Token is required");
    }
    try {
        const tokenData = await verifyToken({tokens: token});
        // console.log(tokenData)
        const email = tokenData.email;
        const user = await UsersDataBase.users.findOne({ email: email});
        if(!user){
            return res.status(404).json({
                error: 1,
                message: 'User not found mi',
                data: null
            });
        }
        console.log(`User role: ${user.role}`);
        if(user.role !== 'customer'){
            return res.status(403).json({
                error: 1,
                message: 'Permission denied',
                data: null
            });
        }
        next();
    } catch (error: any) {
        return res.status(400).json({ 
            error: 1,
            message: error.message,
            data: null
        });
    }
}