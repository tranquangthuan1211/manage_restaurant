import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { StaffDetails } from "../models/schemas/staff";
import { handleGetStaff } from "../services/staff";
import UsersDataBase  from "../models/user-model";
import ScheduleDataBase from "../models/schedule-model";


class StaffController {
    async getStaffs(req: Request, res: Response) {
        try {
            const staffs = await handleGetStaff();
            res.status(200).json({
                error: 0,
                message: "Get Staffs",
                data: staffs
            });
        } catch (error: any) {
            res.status(500).json({ 
                error: 1,
                message: error.message
             });
        }
    }
    async getStaff(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const staff = await UsersDataBase.users.findOne({_id: new ObjectId(id)});
            if(!staff) {
                throw new Error("Staff not found");
            }
            res.status(200).json({
                error: 0,
                message: "Get Staff",
                data: staff
            });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
    async createStaff(req: Request, res: Response) {
        try {
            const newStaff = req.body ;
            newStaff.role = "staff";
            const result = await UsersDataBase.users.insertOne(newStaff);
            if(!result.acknowledged) {
                throw new Error("Can not create staff");
            }
            return res.status(200).json({
                error: 0,
                message: "Staff created successfully",
                data: null,
            });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
    async updateStaff(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const { _id, ...rest } = req.body;
            const result = await UsersDataBase.users.updateOne({_id: new ObjectId(id)}, {$set: rest});
            if(!result.acknowledged) {
                throw new Error("Can not update food");
            }
            return res.status(200).json({
                error: 0,
                message: "Food updated successfully",
                data: null,
            });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
    async deleteStaff(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const result = await UsersDataBase.users.deleteOne({_id: new ObjectId(id)});
            if(!result.acknowledged) {
                throw new Error("Can not delete staff");
            }
            return res.status(200).json({
                error: 0,
                message: "Staff deleted successfully",
                data: null,
            });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new StaffController();