import CategoryDataBase from '../models/category-model';
import e, { Request, Response } from 'express';
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
    async createCategory(req: Request, res: Response) {
        try {
            const { name} = req.body;
            const category = await CategoryDataBase.category.insertOne({name});
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
    async updateCategory(req:Request, res:Response){
        try{
            const id = req.params.id;
            const result = CategoryDataBase.category.updateOne({ name: req.body.name}, { $set: req.body})
            return res.status(200).json({
                error: 0,
                message: "Category updated successfully",
                data: result
            })

        }
        catch(err:any){
            return res.status(400).json({
                error: 1,
                message: err?.message,
                data: null,
            });
        }
        
    }
    async deleteCategory(req:Request, res:Response){
        try{
            const id = req.params.id;
            const result = CategoryDataBase.category.deleteOne({_id: new ObjectId(id)});
            return res.status(200).json({
                error: 0,
                message: "Category deleted successfully",
                data: result
            })

        }
        catch(err:any){
            return res.status(400).json({
                error: 1,
                message: err?.message,
                data: null,
            });
        }
    }
}

export default new CategoryController();