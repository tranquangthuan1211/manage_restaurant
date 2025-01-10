import express from 'express';
import UserController from '../controllers/users.controllers';
import {authMiddleware} from '../middlewares/auth.middileware';
import {managerMiddleware} from "../middlewares/manger.middileware"
const router = express.Router();
const useRouteUser = () => {
    router.post('/login', UserController.login);
    router.post('/register', UserController.createUser);
    router.post('/check-email', UserController.createCodeNumber);
    router.use(authMiddleware);
    router.get('/', UserController.getUser);
    router.patch('/:id', UserController.updateUser);
    router.patch("/change-password",UserController.changePassword);
    router.delete('/:id', UserController.deleteUser);
    return router;
}

export default useRouteUser;