import e, { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import AppointmentDataBase from '../models/appointment-model';
import { AppointmentDetails } from '../models/schemas/appointment';
import RedisService from '../services/redis';
async function getAppointments(): Promise<AppointmentDetails[]> {
    try {
        let pipeline: any[] = []
        pipeline = pipeline.concat([
            {
                $lookup: {
                    from: "users",
                    let: { customerId: { $toObjectId: "$id_customer" } },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$customerId"] } } },
                        { $project: { name: 1, price: 1, _id: 1 } }
                    ],
                    as: "customer"
                }
            }
        ])
        pipeline.push({
            $project: {
                _id: 1,
                customer_name: { $arrayElemAt: ["$customer.name", 0] },
                table_number: 1,
                date: 1,
                hours:1,
                status: 1,        
                created_at: 1,
                updated_at: 1
            }
        })
        const data = await AppointmentDataBase.appointment.aggregate(pipeline).toArray() as AppointmentDetails[]
        return data
    }
    catch (error: any) {
        throw new Error(error.message)
    }
}
async function getAppointmentUser(id: string): Promise<AppointmentDetails[]> {
    try {
        let pipeline: any[] = []
        pipeline = pipeline.concat([
            {
                $match: { id_customer: id }
            },
            {
                $lookup: {
                    from: "users",
                    let: { customerId: { $toObjectId: "$id_customer" } },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$customerId"] } } },
                        { $project: { name: 1, price: 1, _id: 1 } }
                    ],
                    as: "customer"
                }
            }
        ])
        pipeline.push({
            $project: {
                _id: 1,
                customer_name: { $arrayElemAt: ["$customer.name", 0] },
                table_number: 1,
                date: 1,
                hours:1,
                status: 1,        
                created_at: 1,
                updated_at: 1
            }
        })
        const data = await AppointmentDataBase.appointment.aggregate(pipeline).toArray() as AppointmentDetails[]
        return data
    }
    catch (error: any) {
        throw new Error(error.message)
    }
}
class AppointmentController {
    async getAppointments(req: Request, res: Response) {
        try {
            const data = await getAppointments()
            const value = await RedisService.REDIS_GET("tableBooking1") 
            
            return res.status(200).json({
                error: 0,
                message:"Success",
                data: data,
                value: value as number
            });
        } catch (error: any) {
            return res.status(500).json({ 
                error: 1,
                message: error.message,
                data: null
            });
        }
    }
    async getAppointmentUser(req: Request, res: Response) {
        try {
            const data = await getAppointmentUser(req.params.id)
            return res.status(200).json({
                error: 0,
                message:"Success",
                data: data
            });
        } catch (error: any) {
            return res.status(500).json({
                error: 1,
                message: error.message,
                data: null
             });
        }
    }
    
    async createAppointment(req: Request, res: Response) {
        try {
            let tableBooking = await RedisService.REDIS_GET("tableBooking1")

            if (!tableBooking) {
                await RedisService.SET_NX("tableBooking1", "0")
            }
            const table = await RedisService.REDIS_INCR("tableBooking1")
            if(table > 1){
                console.log("table is booked")
                throw new Error("Table is booked")
            }
            const data = await AppointmentDataBase.appointment.insertOne(req.body)
            return res.status(200).json({
                error: 0,
                message:"Created successfully",
                data: data
            });
        } catch (error: any) {
            await RedisService.REDIS_DECR("tableBooking1");
            return res.status(500).json({ 
                error: 1,
                message: error.message,
                data: null
             });
        }
    }
    async updateAppointment(req: Request, res: Response) {
        try {
            const data = await AppointmentDataBase.appointment.updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body })
            return res.status(200).json({
                error: 0,
                message:"Updated successfully",
                data: data
            });
        } catch (error: any) {
            return res.status(500).json({ 
                error: 1,
                message: error.message,
                data: null
             });
        }
    }
    async deleteAppointment(req: Request, res: Response) {
        try {
            const data = await AppointmentDataBase.appointment.deleteOne({ _id: new ObjectId(req.params.id) })
            return res.status(200).json({
                error: 0,
                message:"Deleted successfully",
                data: data
            });
        } catch (error: any) {
            return res.status(500).json({ 
                error: 1,
                message: error.message,
                data: null
             });
        }
    }
}

export default new AppointmentController();