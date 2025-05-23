import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MONGODB CONNECTED !!! ");
        
    } catch (error) {
        console.log("MONGODB CONNECTION ERROR: ",error);
        process.exit(1);        
    }
}

export default connectDB;
