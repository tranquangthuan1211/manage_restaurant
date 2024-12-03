import mongoose, {Collection} from 'mongoose'
import { Complaint } from "./schemas/complaint";

class ComplaintDataBase {
    get complaint(): Collection<Complaint> {
        return mongoose.connection.collection('complaint')
    }
}

export default new ComplaintDataBase();