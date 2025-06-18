import mongoose from "mongoose"
export const connectDb=async ()=>{
    try {
       await mongoose.connect(process.env.MONGO_URI)
       console.log("Connected to DATABASE")
        
    } catch (error) {
        console.log("Error connecting to the database")
        process.exit(1)  // 1 is status code for failure
    } 

}