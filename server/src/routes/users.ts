import express from 'express';
import UserController from '../controllers/users.controllers';
import {authMiddleware} from '../middlewares/auth.middileware';
import {managerMiddleware} from "../middlewares/manger.middileware"
const router = express.Router();
const useRouteUser = () => {
    router.post('/login', UserController.login);
    router.post('/register', UserController.createUser);
    router.use(authMiddleware);
    router.get('/', UserController.getUser);
    router.delete('/:id', UserController.deleteUser);
    // router.use(adminMiddleware);
    return router;
}

export default useRouteUser;