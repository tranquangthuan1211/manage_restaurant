import e, { Request,Response } from "express";
import ComplaintDataBase from "../models/complaint-model";
import { ObjectId } from "mongodb";
import {getComplaints} from "../services/complaint"

class CompalaintController {

    async getComplaints(req: Request, res: Response) {
        try {
            const complaints = await getComplaints();
            res.status(200).json({
                error: 0,
                message:"Success",
                data: complaints
            });
        } catch (error:any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getComplaint(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const complaint = await ComplaintDataBase.complaint.findOne({ _id: new ObjectId(id) });
            res.status(200).json(complaint);
        } catch (error:any) {
            res.status(500).json({ message: error.message });
        }
    }
    async createComplaint(req: Request, res: Response) {
        try {
            const complaint = req.body;
            const newComplaint = await ComplaintDataBase.complaint.insertOne(complaint);
            if (!newComplaint) {
                throw new Error("Complaint not created");
            }
            res.status(201).json({
                error: 0,
                message:"Success",
            });
        } catch (error:any) {
            res.status(500).json({ 
                error: 1,
                message: error.message 
            });
        }
    }
    async updateComplaint(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, email, complaint } = req.body;
            const updatedComplaint = await ComplaintDataBase.complaint.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { name, email, complaint } });
            if (!updatedComplaint) {
                throw new Error("Complaint not updated");  
            }
            res.status(200).json({
                error: 0,
                message:"Success",
                data: updatedComplaint
            });
        } catch (error:any) {
            res.status(500).json({ 
                error: 1,
                message: error.message 
            });
        }
    }

    async deleteComplaint(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const deletedComplaint = await ComplaintDataBase.complaint.findOneAndDelete({ _id: new ObjectId(id) });
            res.status(200).json({
                error: 0,
                message:"Success",
                data: deletedComplaint
            });
        } catch (error: any) {
            res.status(500).json({ 
                error: 1,
                message: error.message,
                data: null

            });
        }
    }
}

export default new CompalaintController();