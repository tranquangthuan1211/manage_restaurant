import { Request,Response } from "express";
import ComplaintDataBase from "../models/complaint-model";
import { ObjectId } from "mongodb";

class CompalaintController {
    

    async getComplaints(req: Request, res: Response) {
        try {
            const complaints = await ComplaintDataBase.complaint.find().toArray();
            res.status(200).json(complaints);
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

    async updateComplaint(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, email, complaint } = req.body;
            const updatedComplaint = await ComplaintDataBase.complaint.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { name, email, complaint } });
            res.status(200).json(updatedComplaint);
        } catch (error:any) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteComplaint(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const deletedComplaint = await ComplaintDataBase.complaint.findOneAndDelete({ _id: new ObjectId(id) });
            res.status(200).json(deletedComplaint);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new CompalaintController();