import { Request, Response } from 'express';
import LeaveDataBase from '../models/leave-model';
import {handleGetLeaves} from '../services/leave';
import { ObjectId } from 'mongodb';

class LeaveController {
    async getLeaves(req: Request, res: Response) {
        try {
            const leaves = await handleGetLeaves();
            res.status(200).json({
                error: 0,
                message: "Success",
                data: leaves,
            });
        } catch (error:any) {
            res.status(500).json({ message: error.message });
        }
    }
    async createLeave(req: Request, res: Response) {
        try {
            const leave = req.body;
            const newLeave = await LeaveDataBase.leave.insertOne(leave);
            res.status(201).json(newLeave);
        } catch (error:any) {
            res.status(500).json({ message: error.message });
        }
    }
    async updateLeave(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { user_id, from, to, reason, status } = req.body;
            const updatedLeave = { user_id, from, to, reason, status };
            await LeaveDataBase.leave.updateOne({ _id: new ObjectId(id) }, { $set: updatedLeave });
            res.status(200).json(updatedLeave);
        } catch (error:any) {
            res.status(500).json({ message: error.message });
        }
    }
    async deleteLeave(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await LeaveDataBase.leave.deleteOne({ _id: new ObjectId(id) });
            res.status(200).json("Leave has been deleted");
        } catch (error:any) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new LeaveController();