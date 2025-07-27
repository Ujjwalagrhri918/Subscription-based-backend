import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";


//if(!DB_URI) throw new Error("Unable to find the DB URI");

const connectToDB = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log(`Connected to database in ${NODE_ENV} mode`);
        
    } catch (error) {

        console.log("Error Conneccting to the database: ",error);
        process.exit(1);
    }
}

export default connectToDB;
