import LeaveDataBase from '../models/leave-model';

export async function handleGetLeaves() {
    try {
        let pipeline: any[] = [];

        pipeline = pipeline.concat([
            {
                $lookup: {
                    from: "users",
                    let: { user_id: { $toObjectId: "$user_id" } },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } }, 
                        { $project: { _id:1,name:1 } }
                    ],
                    as: "staff"
                }
            }
        ]);

        pipeline.push({
            $project: {
                _id:1,
                user_id: 1,
                from: 1,
                to:1,
                reason: 1,
                status: 1,
                user_name: { $arrayElemAt: ["$staff.name", 0] }
            }
        });

        const data = await LeaveDataBase.leave.aggregate(pipeline).toArray();
        return data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}