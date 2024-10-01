import express from "express"
import UserController from "../controller/user.controller"
const route = express.Router()

const useRouteUser = () => {
    route.get('/', UserController.getUser);
    
    return route
}

export default useRouteUser