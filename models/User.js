import mongoose from "mongoose";

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    toys: [
        {
            type: Schema.Types.ObjectId, ref:"Toy"
        }
    ]
})

const User = mongoose.model("User", userSchema);

export default User;