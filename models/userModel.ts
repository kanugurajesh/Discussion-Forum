import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    profile: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    }
})

// get the users model if it not there create a users model and return a reference to it
const User = mongoose.models.users || mongoose.model("users",userSchema);

export default User;