import CategoryDataBase from '../models/category-model';
import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

class CategoryController {
    async getCategories(req: Request, res: Response) {
        try {
            const categories = await CategoryDataBase.category.find().toArray();
            return res.status(200).json({
                data: categories
            })
        } catch (error: any) {
            return res.status(400).json({
                error: 1,
                message: error?.message,
                data: null,
            });
        }
    }
    async getCategory(req: Request, res: Response) {
        try {
            const id = req.params.id as string;
            const category = await CategoryDataBase.category.findOne({_id: new ObjectId(id)});
            return res.status(200).json({
                data: category
            })
        } catch (error: any) {
            return res.status(400).json({
                error: 1,
                message: error?.message,
                data: null,
            });
        }
    }
}

export default new CategoryController();