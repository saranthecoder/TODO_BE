import mongoose from "mongoose";

const connectToMongoDB = async()=>{
    try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("MongoDB Connected")        
    } catch (error) {
        console.log("Error in connecting DB",error.message)
    }
}

export default connectToMongoDB;