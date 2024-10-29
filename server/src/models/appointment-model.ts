import mongoose, {Collection} from 'mongoose'
import { Appointment } from './schemas/appointment';

class AppointmentDataBase {
    get appointment(): Collection<Appointment> {
        return mongoose.connection.collection('appointment')
    }
}

export default new AppointmentDataBase();