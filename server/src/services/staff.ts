import UsersDataBase from "../models/user-model";
import { StaffDetails } from "../models/schemas/staff";
import ScheduleDataBase from "../models/schedule-model";
import { scheduler } from "timers/promises";

export async function handleGetStaff() {
    try {
        let pipeline: any[] = [];

        pipeline = pipeline.concat([
            {
                $match: {
                    role: "staff"
                }
            },
            {
                $lookup: {
                    from: "schedule",
                    let: { schedule_id: { $toObjectId: "$schedule_id" } },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$schedule_id"] } } }, 
                        { $project: { _id:1,date:1,time:1 } }
                    ],
                    as: "schedule"
                }
            }
        ]);

        pipeline.push({
            $project: {
                _id: 1,
                name: 1,
                phone: 1,
                birthdate: 1,
                gender:1,
                address:1,
                schedule_date: { $arrayElemAt: ["$schedule.date", 0] },
                schedule_time: { $arrayElemAt: ["$schedule.time", 0] }
            }
        });

        const data = await UsersDataBase.users.aggregate(pipeline).toArray();
        return data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

