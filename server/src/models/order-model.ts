import mongoose, {Collection} from 'mongoose'
import { Order } from "./schemas/order";

class OrderDataBase {
    get orders(): Collection<Order> {
        return mongoose.connection.collection('order')
    }
}

export default new OrderDataBase();