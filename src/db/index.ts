import mongoose from "mongoose";
import { DB_NAME } from "../utils/constants";

export const connectDB = async () => {
    try {
        const response = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log(`database connected to ${response.connection.host}`);
    } catch (error) {
        console.log("error while connecting to the databse", error);
        process.exit(1);
    }
};
