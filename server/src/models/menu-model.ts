import mongoose, {Collection} from 'mongoose'
import { Food } from './schemas/menu' 

class MenuDataBase {
    get menu(): Collection<Food> {
        return mongoose.connection.collection('menu')
    }
}

export default new MenuDataBase();