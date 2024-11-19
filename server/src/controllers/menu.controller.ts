import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import MenuDataBase from '../models/menu-model'
import {handleGetFood} from '../services/menu'

class MenuController {
    async getFood(req: Request, res: Response) {
        try {
            const id = req.params.id as string;
            const food = await MenuDataBase.menu.findOne({_id: new ObjectId(id)});
            return res.status(200).json({
                data: food
            })
        } catch (error: any) {
            return res.status(400).json({
                error: 1,
                message: error?.message,
                data: null,
            });
        }
    }
    async getFoods(req: Request, res: Response) {
        try {
            const foods = await handleGetFood();
            return res.status(200).json({
                data: foods
            })
        } catch (error: any) {
            return res.status(400).json({
                error: 1,
                message: error?.message,
                data: null,
            });
        }
    }
    async createFood(req: Request, res: Response) {
        try{
            console.log(req.body)
            if (!req.file) {
                console.log("ko có file")
                return res.status(400).json({ error: 'No file uploaded' });
            }
            const fileData = req.file;
            req.body.image = fileData?.path;
            const result = await MenuDataBase.menu.insertOne(req.body);
            if(!result.acknowledged || !result.insertedId) {
                throw new Error("Can not create food");
            }
            return res.status(200).json({
                error: 0,
                message: "Food created successfully",
                data: null,
            });
        } catch(error: any) {
            return res.status(400).json({
                error: 1,
                message: error?.message,
                data: null,
            });
        }
    }
    async updateFood(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const result = await MenuDataBase.menu.updateOne({_id: new ObjectId(id)}, {$set: req.body});
            if(!result.acknowledged) {
                throw new Error("Can not update food");
            }
            return res.status(200).json({
                error: 0,
                message: "Food updated successfully",
                data: null,
            });
        } catch (error: any) {
            return res.status(400).json({
                error: 1,
                message: error?.message,
                data: null,
            });
        }
    }

    async deleteFood(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const result = await MenuDataBase.menu.deleteOne({_id: new ObjectId(id)});
            if(!result.acknowledged) {
                throw new Error("Can not delete food");
            }
            return res.status(200).json({
                error: 0,
                message: "Food deleted successfully",
                data: null,
            });
        } catch (error: any) {
            return res.status(400).json({
                error: 1,
                message: error?.message,
                data: null,
            });
        }
    }
}

export default new MenuController();