import mongoose, {Collection} from 'mongoose'
import { Schedule } from './schemas/schedule'

class ScheduleDataBase {
    get schedule(): Collection<Schedule > {
        return mongoose.connection.collection('schedule')
    }
}

export default new ScheduleDataBase();