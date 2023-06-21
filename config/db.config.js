import mongoose from "mongoose";
import { MONGO_URI } from "./constants.config.js";

let connection = {};

const connectDB = async () => {
    try { 
        connection = await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log('MongoDB Connected...')
    } catch (error) {
        console.error('DB Connection failed...');
        console.error(error.message);
        process.exit(1); 
    }
}

export default {connectDB, connection};
