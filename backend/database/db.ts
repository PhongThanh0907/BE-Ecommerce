import mongoose from 'mongoose'
import { MONGO_URL } from '../utils/config'
import HttpException from '../utils/httpException';

export const connectDB = async () => {
    if(!MONGO_URL) {
        console.log("MONGO_URL is not defined in the env")
    }
    try {
        mongoose.set('strictQuery', true)
        await mongoose.connect(MONGO_URL)
        console.log("MongoDB connected")
    } catch (err) {
        console.log(err.message)
        process.exit(1)
    }
};

export const checkIsValidObjectId = (id: string) => {
    if(!mongoose.Types.ObjectId.isValid(id)) {
        throw new HttpException(`${id} is not valid`, 400)
    }
}