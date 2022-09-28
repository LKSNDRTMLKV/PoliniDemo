import mongoose from "mongoose";
import validator from "validator";

const SubscribersSchema = new mongoose.Schema({
    email: {
        type:String,
        required:true,
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email"]
    }
})
const SubscriberModel = mongoose.model("Subscriber", SubscribersSchema);

export default SubscriberModel;