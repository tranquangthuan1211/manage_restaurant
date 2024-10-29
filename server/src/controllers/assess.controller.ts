import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import AssessDataBase from '../models/assess-model';
import { AssessDetails } from '../models/schemas/assess';

class AssessController {
    async getAssess(req: Request, res: Response) {
        try {
            const data = await AssessDataBase.category.find()
            res.status(200).json(data)
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    }

    async createAssess(req: Request, res: Response) {
        try {
            const data = req.body as AssessDetails
            await AssessDataBase.category.insertOne(data)
            res.status(201).json({ message: 'Assess created' })
        } catch (error:any) {
            res.status(500).json({ message: error.message })
        }
    }

    async updateAssess(req: Request, res: Response) {
        try {
            const id = req.params.id
            const data = req.body as AssessDetails
            await AssessDataBase.category.updateOne({ _id: new ObjectId(id) }, { $set: data })
            res.status(200).json({ message: 'Assess updated' })
        } catch (error:any) {
            res.status(500).json({ message: error.message })
        }
    }

    async deleteAssess(req: Request, res: Response) {
        try {
            const id = req.params.id
            await AssessDataBase.category.deleteOne({ _id: new ObjectId(id)})
            res.status(200).json({ message: 'Assess deleted' })
        } catch (error:any) {
            res.status(500).json({ message: error.message })
        }
    }
}

export default new AssessController();
