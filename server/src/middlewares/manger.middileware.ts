import { Request, Response, NextFunction } from 'express';
import {verifyToken } from '../securities/jwt';
import UsersDataBase from '../models/user-model';
export const managerMiddleware = async(req:Request, res:Response, next: NextFunction) => {
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
        if(user.role !== 'admin' && user.role !== 'manager'){
            throw new Error("You are not authorized to access this route");
        }
        next();
    } catch (error) {
        return res.status(400).json({ 
            error: 1,
            message: 'Invalid token',
            data: null
        });
    }
}