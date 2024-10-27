import express from 'express';
import CategoryController from '../controllers/category.controller';
import categoryModel from '../models/category-model';
import { managerMiddleware } from '../middlewares/manger.middileware';
const router = express.Router();

function useRouteCategory() {
    router.use(managerMiddleware)
    router.get('/', CategoryController.getCategories);
    router.post('/',CategoryController.createCategory);
    router.get('/:id', CategoryController.getCategory);
    router.patch("/:id", CategoryController.updateCategory);
    router.delete("/:id", CategoryController.deleteCategory);
    return router;
}
export default useRouteCategory;