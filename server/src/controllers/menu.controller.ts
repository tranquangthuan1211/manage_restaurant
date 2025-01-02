import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import MenuDataBase from '../models/menu-model'
import { error } from 'console';

// 2/1/2025: Modified by HP
async function handleGetFood(page: number = 1, limit: number = 10, categoryName: string = "all") {
    try {
        // Helper function to create the $lookup stage
        const createLookupStage = () => ({
            $lookup: {
                from: "category",
                let: { categoryId: { $toObjectId: "$category" } },
                pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$categoryId"] } } },
                    { $project: { name: 1, _id: 1 } }
                ],
                as: "category"
            }
        });

        // Helper function to create the $match stage for filtering by category name
        const createCategoryFilterStage = (categoryName: string) => ({
            $match: { "category.name": categoryName }
        });

        // Base pipeline
        let pipeline: any[] = [createLookupStage()];

        // Add filtering stage if categoryName is provided
        if (categoryName !== "all") {
            pipeline.push(createCategoryFilterStage(categoryName));
        }

        // Add projection stage
        pipeline.push({
            $project: {
                _id: 1,
                name: 1,
                price: 1,
                image: 1,
                description: 1,
                category: { $arrayElemAt: ["$category.name", 0] }
            }
        });

        // Add pagination stages
        const skip = (page - 1) * limit;
        pipeline.push({ $skip: skip }, { $limit: limit });

        // Execute the main query
        const items = await MenuDataBase.menu.aggregate(pipeline).toArray();

        // Create total items pipeline
        let totalItemsPipeline: any[] = [createLookupStage()];
        if (categoryName !== "all") {
            totalItemsPipeline.push(createCategoryFilterStage(categoryName));
        }
        totalItemsPipeline.push({ $count: "totalItems" });

        // Execute the count query
        const totalItemsResult = await MenuDataBase.menu.aggregate(totalItemsPipeline).toArray();
        const totalItemsCount = totalItemsResult.length > 0 ? totalItemsResult[0].totalItems : 0;

        // Calculate total pages
        const totalPages = Math.ceil(totalItemsCount / limit);

        return {
            items: items,
            pagination: {
                page: page,
                totalItems: totalItemsCount,
                totalPages: totalPages,
                limit: limit
            }
        };
    } catch (error: any) {
        throw new Error(error.message);
    }
}



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
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const categoryName = req.query.category as string | "all";
            const foods = await handleGetFood(page, limit, categoryName);
            return res.status(200).json({
                // Added by HP
                error: 0,
                message: "OK",
                // 
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
            if (!req.file) {
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