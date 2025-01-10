import mongoose, {Collection} from 'mongoose'
import { Leave } from './schemas/leave';

class LeaveDataBase {
    get leave(): Collection<Leave> {
        return mongoose.connection.collection('leave')
    }
}

export default new LeaveDataBase();