import express from 'express';
import MenuController from '../controllers/menu.controller';
import uploadCloud from '../configs/cloudinary';
import multer from 'multer';
import {managerMiddleware} from '../middlewares/manger.middileware';
const router = express.Router();
const upload = multer();
const useRouteMenu = () => {
    router.get('/', MenuController.getFoods);
    router.get('/:id', MenuController.getFood);
    // router.use(managerMiddleware);
    router.post('/', uploadCloud.single('image'),MenuController.createFood);
    router.put('/:id', MenuController.updateFood);
    router.delete('/:id', MenuController.deleteFood);
    return router;
}

export default useRouteMenu;