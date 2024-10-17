import mongoose, {Collection} from 'mongoose'
import { Category } from './schemas/category';

class CategoryDataBase {
    get category(): Collection<Category> {
        return mongoose.connection.collection('category')
    }
}

export default new CategoryDataBase();