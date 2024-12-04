import ComplaintDataBase from "../models/complaint-model";
import { ComplaintDetails } from "../models/schemas/complaint";
export async function getComplaints(): Promise<ComplaintDetails[]> {
    try {
        let pipeline: any[] = []
        pipeline = pipeline.concat([
            {
                $lookup: {
                    from: "users",
                    let: { customerId: { $toObjectId: "$user_id" } },
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
                user_name: { $arrayElemAt: ["$customer.name", 0] },
                title: 1,
                description: 1, 
                status: 1,       
                createdAt: 1,
                updatedAt: 1,
                deletedAt:1
            }
        })
        const data = await ComplaintDataBase.complaint.aggregate(pipeline).toArray() as ComplaintDetails[]
        return data
    }
    catch (error: any) {
        throw new Error(error.message)
    }
}