
import 'dotenv/config'
import mongoose, {Collection} from 'mongoose'

class Database {
    constructor() {
        this.connect()
    }
    async connect() {
        try {
            const mongoUrl  = process.env.MONGO_URL as string;
            if(!mongoUrl) throw new Error('Mongo URL is not defined')
            await mongoose.connect(mongoUrl, {})
            console.log("connect successfully!!!")
        } catch (error) {
            console.log('Database connection failed')
        }
    }

}
export default new Database();