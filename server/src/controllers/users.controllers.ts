import 'dotenv/config';
import { Request, Response } from "express";
import Database from "../configs/db";
import UsersDataBase from "../models/user-model";
import {signToken, verifyToken} from "../securities/jwt";
import { hashPassword,comparePassword } from "../securities/pass";
import { ObjectId } from "mongodb";
import {Users,initialUser} from "../models/schemas/user"
import { access } from "fs";
import { checkInputError } from "../securities/check_input";
import rabbitMQ from "../configs/rabbit-mq";
import generateSixDigitCode from "../securities/random";
class UserController {

  async getUser(req: Request, res: Response) {
    try {
        if(!req.body.user) {
          throw new Error("User not found");
        }
        const user = req.body.user;
        return res.status(200).json({
          error: 0,
          message: "Get user successfully",
          data:user
        })
        
    }
    catch (error:any) {
      return res.status(400).json({
        error: 1,
        message: error?.message,
        data: null,
      });
    }
  }
  async createCodeNumber(req: Request, res: Response) {
    try {
      const email = req.body.email;
      console.log(email)
      const message = {
        to: email,
        subject: "Mã xác nhận",
        body: generateSixDigitCode()
      }
      const channel = await rabbitMQ.getChannel();
      channel.publish("emailExchange", "email.send", Buffer.from(JSON.stringify(message)));
      console.log('Message sent:', message);
      return res.status(200).json({
        error: 0,
        message: "Send code successfully",
        data: req.body,
      })
    }catch (error:any) {
      return res.status(400).json({
        error: 1,
        message: error?.message,
        data: null,
      })
    }
  }
  async createUser(req: Request, res: Response) {
    try {
      const check = checkInputError<Users>({
        ...req.body
      }, initialUser);
      if(check.errors.length > 0) {
        return res.status(400).json({
          error: 1,
          message: "Input is invalid",
          data: null,
        });
      }
      // console.log(check)
      const newUser = req.body as Users;
      if(!newUser.role){
        newUser.role = "user";
      }
      const user = await UsersDataBase.users.findOne({email: newUser.email});
      if(user) {
        throw new Error("Email is already exist");
      }
      newUser.password = await hashPassword(newUser.password as string);
      const {password, ...dataUser} = newUser; 
      const token = await signToken({payload: dataUser});
      const refreshToken = await signToken({payload: dataUser, secret: process.env.REFRESH_TOKEN_SECRET as string});
      const result = await UsersDataBase.users.insertOne(newUser);
      if(!result.acknowledged || !result.insertedId) {
        throw new Error("Can not create user");
      }
      res.status(200).json({
        error: 0,
        message: "User created successfully",
        access_token: token,
        refresh_token: refreshToken
      });
    } catch (error: any) {
      return res.status(400).json({
        error: 1,
        message: error?.message,
        data: null,
      });
    }
  }
  async login(req: Request, res: Response) {
    try {
      console.log(req.body)
      const {email, password} = req.body;
      const user = await UsersDataBase.users.findOne({email: req.body.email});
      if(!user) {
        return res.status(400).json({
          error: 1,
          message: "User not found",
          data: null,
        });
      }
      if(!await comparePassword(password, user.password as string)) {
        return res.status(400).json({
          error: 1,
          message: "Password is incorrect",
          data: null,
        });
      }
      const {password: _, ...dataUser} = user;
      const token = await signToken({payload: dataUser});
      const refreshToken = await signToken({payload: dataUser, secret: process.env.REFRESH_TOKEN_SECRET as string});
      console.log(user)
      return res.status(200).json({
        error: 0,
        message: "Login successfully",
        data:user,
        access_token: token,
        refresh_token: refreshToken
      });
    }
    catch (error:any) {
      return res.status(400).json({
        error: 1,
        message: error?.message,
        data: null,
      });
    }
  }
  async updateUser(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const {_id,...rest} = req.body ;
      const user = await UsersDataBase.users.findOne({_id: new ObjectId(id)});
      if(!user) {
        throw new Error("User not found");
      }
      const result = await UsersDataBase.users.updateOne({_id: new ObjectId(id)}, {$set: rest});
      if(!result.acknowledged) {
        throw new Error("Can not update user");
      }
      return res.status(200).json({
        error: 0,
        message: "Update user successfully",
        data: null,
      });
    }catch (error:any) {
      return res.status(400).json({
        error: 1,
        message: error?.message,
        data: null,
      });
    }
  }
  async deleteUser(req: Request, res: Response) {
    const id = req.params.id;
    const result = await UsersDataBase.users.deleteOne({_id: new ObjectId(id)});
    if(!result.acknowledged) {
      return res.status(400).json({
        error: 1,
        message: "Can not delete user",
        data: null,
      });
    }
    return res.status(200).json({
      error: 0,
      message: "Delete user successfully",
      data: null,
    });
  }
  async changePassword(req: Request, res: Response) {
    try {
      const {old_password, new_password} = req.body;
      const user = req.body.user;
      if(!await comparePassword(old_password, user.password as string)) {
        throw new Error("Old password is incorrect");
      }
      const result = await UsersDataBase.users.updateOne({_id: user._id}, {$set: {password: await hashPassword(new_password)}});
      if(!result.acknowledged) {
        throw new Error("Can not change password");
      }
      return res.status(200).json({
        error: 0,
        message: "Change password successfully",
        data: null,
      });
    } catch (error:any) {
      return res.status(400).json({
        error: 1,
        message: error?.message,
        data: null,
      });
    }
  }
}
export default new UserController();