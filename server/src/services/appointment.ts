import { AppointmentDetails } from '../models/schemas/appointment';
import AppointmentDataBase from '../models/appointment-model';
export async function getAppointments(): Promise<AppointmentDetails[]> {
    try {
        let pipeline: any[] = []
        pipeline = pipeline.concat([
            {
                $lookup: {
                    from: "users",
                    let: { customerId: { $toObjectId: "$id_customer" } },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$customerId"] } } },
                        { $project: { name: 1, price: 1, _id: 1,phone:1,email:1 } }
                    ],
                    as: "customer"
                }
            }
        ])
        pipeline.push({
            $project: {
                _id: 1,
                customer_name: { $arrayElemAt: ["$customer.name", 0] },
                phone: { $arrayElemAt: ["$customer.phone", 0] },
                email: { $arrayElemAt: ["$customer.email", 0] },
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
export async function getAppointmentUser(id: string): Promise<AppointmentDetails[]> {
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