import express from 'express';
import CategoryController from '../controllers/category.controller';
const router = express.Router();

function useRouteCategory() {
    router.get('/', CategoryController.getCategories);
    router.get('/:id', CategoryController.getCategory);
    return router;
}
export default useRouteCategory;