import mongoose, {Collection} from 'mongoose'
import { Review } from "./schemas/review";

class ReviewDataBase {
    get reviews(): Collection<Review> {
        return mongoose.connection.collection('reviews')
    }
}

export default new ReviewDataBase();