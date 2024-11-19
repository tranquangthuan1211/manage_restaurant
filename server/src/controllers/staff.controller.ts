import e, { Request, Response } from "express";
import { ObjectId } from "mongoose";
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
            res.status(200).json({ message: "Get Staff" });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
    async createStaff(req: Request, res: Response) {
        try {
            res.status(200).json({ message: "Create Staff" });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
    async updateStaff(req: Request, res: Response) {
        try {
            res.status(200).json({ message: "Update Staff" });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
    async deleteStaff(req: Request, res: Response) {
        try {
            res.status(200).json({ message: "Delete Staff" });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new StaffController();