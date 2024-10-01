import mongoose, {Collection} from 'mongoose'
import { User } from './schema/user'

class UserDataBase {
    get users(): Collection<User> {
        return mongoose.connection.collection('user')
    }
}

export default new UserDataBase();