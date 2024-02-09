import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    messages: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
})

// get the users model if it not there create a users model and return a reference to it
const Post = mongoose.models.posts || mongoose.model("posts",postSchema);

export default Post;