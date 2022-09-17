import mongoose from "mongoose";

const connectDatabase = () => {
    mongoose.connect(process.env.MONGO_URI);
    mongoose.connection.once("open", ()=> console.log("Database connected"));
    mongoose.connection.on("error", (error)=> console.log("Database connection error " + error))
}

export default connectDatabase;