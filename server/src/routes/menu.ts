import express from 'express';
import MenuController from '../controllers/menu.controller';
import uploadCloud from '../configs/cloudinary';
import multer from 'multer';
const router = express.Router();
const upload = multer();
// uploadCloud.single('image')
const useRouteMenu = () => {
    router.get('/', MenuController.getFoods);
    router.post('/', uploadCloud.single('image'),MenuController.createFood);
    router.get('/:id', MenuController.getFood);
    router.put('/:id', MenuController.updateFood);
    router.delete('/:id', MenuController.deleteFood);
    return router;
}

export default useRouteMenu;