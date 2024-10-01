import {Request, Response} from "express"
import UserDataBase from "../model/user.model"
class UserController {
    async getUser(req:Request, res:Response){
        res.send("hello")
    }
}

export default new UserController();