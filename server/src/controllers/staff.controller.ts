import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import { StaffDetails } from "../models/schemas/staff";


class StaffController {
    async getStaffs(req: Request, res: Response) {
        try {
            res.status(200).json({ message: "Get Staffs" });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
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