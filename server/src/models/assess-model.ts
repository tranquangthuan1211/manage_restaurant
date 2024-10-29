import mongoose, {Collection} from 'mongoose'
import { Assess } from './schemas/assess';

class AssessDataBase {
    get category(): Collection<Assess> {
        return mongoose.connection.collection('assess')
    }
}

export default new AssessDataBase();